import { getQuestionsForTest, insertResult } from '../src/lib/db';
import { scoreAptitude, generateAptitudeReport } from '../src/lib/scoring';
import { UserAnswer, TestResult } from '../src/types';

const testId = '5-7';

async function run() {
  const liveQuestions = getQuestionsForTest(testId);
  if (!liveQuestions || liveQuestions.length === 0) {
    throw new Error('Could not fetch test schema for mapping.');
  }

  console.log(`Found ${liveQuestions.length} questions for cohort ${testId}`);

  // Create answers 
  // For aptitude, we want to get a mix of correct and incorrect. Let's aim for 70% accuracy.
  const answers: UserAnswer[] = [];

  for (const q of liveQuestions) {
    if (q.type === 'meta') {
       answers.push({
           question_id: q.id,
           selected_option_id: q.options[0].id
       });
    } else if (q.type === 'aptitude') {
       // Is it correct? 
       const isCorrect = Math.random() > 0.3; // 70% correct
       if (isCorrect && q.correct_answer) {
           answers.push({
               question_id: q.id,
               selected_option_id: q.correct_answer
           });
       } else {
           // pick random wrong option
           const wrongOpts = q.options.filter(o => o.id !== q.correct_answer);
           if (wrongOpts.length > 0) {
               const randOpt = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
               answers.push({
                   question_id: q.id,
                   selected_option_id: randOpt.id
               });
           }
       }
    }
  }

  // Profile data
  const profileData = {
      name: "Demo Student",
      age: "11",
      school: "Springfield Elementary"
  };

  // Process like actions.ts
  const aptAnswers = answers
    .filter(a => liveQuestions.find(q => q.id === a.question_id)?.type === 'aptitude')
    .map(a => ({
      question_id: a.question_id,
      selected_option_id: a.selected_option_id,
    }));

  const aptResult = scoreAptitude(liveQuestions, aptAnswers);

  const normalizedScores: Record<string, number> = {};
  for (const [key, val] of Object.entries(aptResult.construct_scores)) {
    normalizedScores[key] = val.normalized;
  }

  const candidateInfo = {
    ...profileData,
    cohort: testId,
  };

  const report = generateAptitudeReport(aptResult, candidateInfo);

  const resultId = 'APT-DEMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const newResult: TestResult = {
    id: resultId,
    test_id: testId,
    test_type: 'aptitude',
    answers,
    scores: normalizedScores as any,
    normalized_scores: normalizedScores as any,
    created_at: new Date().toISOString(),
    meta_data: { aptResult },
    report,
  };

  insertResult(newResult);

  console.log(`\n✅ DEMO REPORT GENERATED SUCCESSFULLY!`);
  console.log(`REPORT ID: ${resultId}`);
  console.log(`VIEW REPORT AT: http://localhost:3000/report/${resultId}`);
}

run().catch(console.error);
