const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const { v4: uuidv4 } = require('uuid');

const STORAGE_BASE_URL = `${supabaseUrl}/storage/v1/object/public/assessment-images`;

async function seed() {
  console.log('Reading JSON...');
  const data = JSON.parse(fs.readFileSync('questions-8-10.json', 'utf8'));
  const testId = '8-10';
  
  await supabase.from('tests').upsert({ id: testId, name: data.test_name });
  await supabase.from('questions').delete().eq('test_id', testId);

  let allQuestions = [];
  let allMappings = [];

  const addQuestion = (type, qObj) => {
    const qId = uuidv4();
    let options = [];
    let mappings = [];
    let correctAnswer = null;
    let imageUrl = qObj.image_url ? `${STORAGE_BASE_URL}/${qObj.image_url}` : null;

    if (type === 'meta') {
      if (qObj.question.includes('career do you want') || qObj.question.includes('parents want') || qObj.question.includes('parent\'s occupation')) {
        options = [
          { id: 'opt_1', text: 'Engineering / IT', value: 0, textValue: 'Engineering' },
          { id: 'opt_2', text: 'Medical / Healthcare', value: 0, textValue: 'Medical' },
          { id: 'opt_3', text: 'Business / Commerce', value: 0, textValue: 'Business' },
          { id: 'opt_4', text: 'Arts / Humanities', value: 0, textValue: 'Arts' },
          { id: 'opt_5', text: 'Undecided', value: 0, textValue: 'Undecided' }
        ];
        if (qObj.question.includes('career do you want')) {
          mappings.push({ question_id: qId, trait: 'career_choice', weight: 1 });
        } else if (qObj.question.includes('parents want')) {
          mappings.push({ question_id: qId, trait: 'parent_choice', weight: 1 });
        } else {
          mappings.push({ question_id: qId, trait: 'profiling_score', weight: 0 }); // ignorable for profiling numeric sum
        }
      } else {
        options = [
          { id: 'opt_5', text: 'Strongly Agree', value: 5 },
          { id: 'opt_4', text: 'Agree', value: 4 },
          { id: 'opt_3', text: 'Neutral', value: 3 },
          { id: 'opt_2', text: 'Disagree', value: 2 },
          { id: 'opt_1', text: 'Strongly Disagree', value: 1 }
        ];
        mappings.push({ question_id: qId, trait: 'profiling_score', weight: 1 });
      }
    } else if (type === 'psychometric') {
      options = [
        { id: 'opt_y', text: 'Yes', value: 3 },
        { id: 'opt_ns', text: 'Not Sure', value: 2 },
        { id: 'opt_n', text: 'No', value: 1 }
      ];
      mappings.push({ question_id: qId, trait: qObj.trait, weight: 1 });
    } else if (type === 'aptitude') {
      options = qObj.options.map((optText, idx) => ({
        id: `opt_${idx}`, text: optText, value: 0
      }));
      const correctIdx = qObj.options.findIndex(o => o === qObj.correct);
      correctAnswer = `opt_${correctIdx}`;
      mappings.push({ question_id: qId, trait: qObj.category, weight: 10 });
    }

    allQuestions.push({
      id: qId,
      test_id: testId,
      question_text: qObj.question || qObj.q,
      type: type,
      options: options,
      correct_answer: correctAnswer,
      image_url: imageUrl
    });

    mappings.forEach(m => {
      allMappings.push({
        id: uuidv4(),
        question_id: m.question_id,
        trait: m.trait,
        weight: m.weight
      });
    });
  };

  data.meta_questions.forEach(q => addQuestion('meta', q));
  data.psychometric_questions.forEach(q => addQuestion('psychometric', q));
  data.aptitude_questions.forEach(q => addQuestion('aptitude', q));

  console.log(`Inserting ${allQuestions.length} questions...`);
  const chunkSize = 50;
  for (let i = 0; i < allQuestions.length; i += chunkSize) {
    const chunk = allQuestions.slice(i, i + chunkSize);
    const { error } = await supabase.from('questions').insert(chunk);
    if (error) { console.error('Error inserting questions:', error); return; }
  }

  console.log(`Inserting ${allMappings.length} mappings...`);
  for (let i = 0; i < allMappings.length; i += chunkSize) {
    const chunk = allMappings.slice(i, i + chunkSize);
    const { error } = await supabase.from('question_mappings').insert(chunk);
    if (error) { console.error('Error inserting mappings:', error); return; }
  }

  console.log('Seeding complete! Data is now live in Supabase.');
}

seed().catch(console.error);
