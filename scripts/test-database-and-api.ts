import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import Database from 'better-sqlite3';
import { getQuestionsForCohort, getResultById, insertResult } from '../src/lib/db';
import { scoreAptitude, scorePsychometric, generateAptitudeReport, generatePsychometricReport } from '../src/lib/scoring';
import { Cohort, UserAnswer, TestResult } from '../src/types';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function testDatabase() {
  console.log('--- DATABASE CONNECTIVITY TEST ---');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log(`Supabase Key Status: ${supabaseKey ? 'PRESENT' : 'MISSING'}`);

  // Test local SQLite
  const localDbPath = path.join(__dirname, '../database.db');
  console.log(`Checking local SQLite database.db at: ${localDbPath}`);
  try {
    const db = new Database(localDbPath);
    const result = db.prepare("SELECT COUNT(*) as count FROM questions").get() as { count: number };
    console.log(`✅ SQLite Questions Count: ${result.count}`);
    const resultsCount = db.prepare("SELECT COUNT(*) as count FROM results").get() as { count: number };
    console.log(`✅ SQLite Results Count: ${resultsCount.count}`);
  } catch (err: any) {
    console.error('❌ Local SQLite error:', err.message);
  }

  // Test Supabase
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
      const { data: qData, error: qErr } = await supabase.from('questions').select('id', { count: 'exact', head: true });
      if (qErr) {
        console.error('❌ Supabase Questions query error:', qErr.message);
      } else {
        console.log(`✅ Supabase Connection Successful. Questions Count: ${qData ? qData.length : 'unknown'}`);
      }

      const { data: rData, error: rErr } = await supabase.from('results').select('id', { count: 'exact', head: true });
      if (rErr) {
        console.error('❌ Supabase Results query error:', rErr.message);
      } else {
        console.log(`✅ Supabase Results Count: ${rData ? rData.length : 'unknown'}`);
      }
    } catch (err: any) {
      console.error('❌ Supabase client error:', err.message);
    }
  } else {
    console.log('⚠️ Supabase config is incomplete in .env.local. Skipping Supabase connectivity check.');
  }
}

async function checkQuestionsData() {
  console.log('\n--- QUESTIONS CHECK PER SECTION & COHORT ---');
  const cohorts: Cohort[] = ['grade_2_4', 'grade_5_7', 'grade_8_10', 'grade_11_12', 'professional'];
  
  for (const cohort of cohorts) {
    console.log(`\nCohort: [${cohort}]`);
    
    // Fetch via our DB wrapper helper (which handles Supabase fallback or SQLite)
    const allQuestions = await getQuestionsForCohort(cohort);
    console.log(`Total fetched (balanced set): ${allQuestions.length}`);

    const metaQs = allQuestions.filter(q => q.type === 'meta');
    const psychQs = allQuestions.filter(q => q.type === 'psychometric');
    const aptQs = allQuestions.filter(q => q.type === 'aptitude');

    console.log(`  - Meta Questions: ${metaQs.length}`);
    console.log(`  - Psychometric Questions: ${psychQs.length}`);
    console.log(`  - Aptitude Questions: ${aptQs.length}`);

    // Verify option structures
    let optionErrors = 0;
    for (const q of allQuestions) {
      if (!Array.isArray(q.options) || q.options.length === 0) {
        optionErrors++;
      }
    }
    if (optionErrors > 0) {
      console.error(`  ❌ WARNING: ${optionErrors} questions have missing/invalid options structure!`);
    } else {
      console.log(`  ✅ All options structures are valid.`);
    }

    // Verify mappings
    let mappingErrors = 0;
    for (const q of allQuestions) {
      if (!Array.isArray(q.mappings) || q.mappings.length === 0) {
        mappingErrors++;
      }
    }
    if (mappingErrors > 0) {
      console.error(`  ❌ WARNING: ${mappingErrors} questions have missing/invalid mappings structure!`);
    } else {
      console.log(`  ✅ All mappings structures are valid.`);
    }
  }
}

async function testScoringAndSubmission() {
  console.log('\n--- SIMULATED SUBMISSION & SCORING TEST (grade_8_10) ---');
  const cohort: Cohort = 'grade_8_10';
  
  // Get questions for grade_8_10
  const questions = await getQuestionsForCohort(cohort);
  
  // Create mock answers
  const answers: UserAnswer[] = [];
  
  // 1. Fill meta answers
  const metaQs = questions.filter(q => q.type === 'meta');
  for (const q of metaQs) {
    answers.push({
      question_id: q.id,
      selected_option_id: q.options[0]?.id || ''
    });
  }

  // 2. Fill psychometric answers (all "Agree" or "Strongly Agree" to ensure high scores)
  const psychQs = questions.filter(q => q.type === 'psychometric');
  for (const q of psychQs) {
    const optAgree = q.options.find(o => o.text.includes('Agree'));
    answers.push({
      question_id: q.id,
      selected_option_id: optAgree?.id || q.options[3]?.id || q.options[0]?.id || ''
    });
  }

  // 3. Fill aptitude answers (make some correct, some wrong)
  const aptQs = questions.filter(q => q.type === 'aptitude');
  let correctCount = 0;
  for (let i = 0; i < aptQs.length; i++) {
    const q = aptQs[i];
    // Correct answer is mapped to options in db
    const selectedOption = (i % 3 === 0) ? q.correct_answer : q.options[0]?.id;
    if (selectedOption === q.correct_answer) {
      correctCount++;
    }
    answers.push({
      question_id: q.id,
      selected_option_id: selectedOption || ''
    });
  }
  
  console.log(`Simulated answers generated: Total: ${answers.length}, Aptitude Correct: ${correctCount}/${aptQs.length}`);

  // Test Aptitude Scoring
  const aptAnswers = answers
    .filter(a => questions.find(q => q.id === a.question_id)?.type === 'aptitude')
    .map(a => ({
      question_id: a.question_id,
      selected_option_id: a.selected_option_id,
    }));
  
  try {
    const aptResult = scoreAptitude(questions, aptAnswers);
    console.log('✅ scoreAptitude executed successfully.');
    console.log('Construct scores:', Object.keys(aptResult.construct_scores).map(k => `${k}: ${aptResult.construct_scores[k].normalized}% (${aptResult.construct_scores[k].band})`));

    const candidateInfo = { name: 'Automated Test API Candidate', cohort: '8-10' };
    const aptReport = generateAptitudeReport(aptResult, candidateInfo);
    console.log('✅ generateAptitudeReport executed successfully.');
    console.log(`  Top career domains:`, aptReport.aptitude_summary);
  } catch (err: any) {
    console.error('❌ Aptitude Scoring failed:', err);
  }

  // Test Psychometric Scoring
  const psychAnswers = answers
    .filter(a => questions.find(q => q.id === a.question_id)?.type === 'psychometric')
    .map(a => {
      const q = questions.find(q => q.id === a.question_id)!;
      const opt = q.options.find(o => o.id === a.selected_option_id);
      return {
        question_id: a.question_id,
        value: opt?.value ?? 3,
      };
    });

  try {
    const psychResult = scorePsychometric(questions, psychAnswers);
    console.log('✅ scorePsychometric executed successfully.');
    console.log('RIASEC Top 3:', psychResult.riasec_top3);

    const candidateInfo = { name: 'Automated Test API Candidate', cohort: '8-10' };
    const psychReport = generatePsychometricReport(psychResult, candidateInfo);
    console.log('✅ generatePsychometricReport executed successfully.');
    console.log(`  Holland Code:`, psychReport.holland_code);
    console.log(`  Reliability check:`, psychReport.reliability_flag);
  } catch (err: any) {
    console.error('❌ Psychometric Scoring failed:', err);
  }
}

async function run() {
  await testDatabase();
  await checkQuestionsData();
  await testScoringAndSubmission();
  console.log('\n--- TESTS COMPLETED ---');
}

run().catch(console.error);
