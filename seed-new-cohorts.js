const fs = require('fs');
const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(process.cwd(), 'database.db');
const db = new Database(DB_PATH);

try { db.exec("ALTER TABLE questions ADD COLUMN cohort TEXT;"); } catch {}
try { db.exec("ALTER TABLE questions ADD COLUMN category TEXT;"); } catch {}
try { db.exec("ALTER TABLE questions ADD COLUMN difficulty TEXT DEFAULT 'medium';"); } catch {}

const aptitudeFile = fs.readFileSync('aptitude_2to4_5to7.md', 'utf-8');
const psychFile = fs.readFileSync('psycometry_2to4_5to7.md', 'utf-8');

function extractJsonArrays(text) {
  const arrays = [];
  const regex = /\[\s*\{[\s\S]*?\}\s*\]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    try {
      arrays.push(JSON.parse(match[0]));
    } catch (e) {
      console.warn("Failed to parse a JSON block", e.message);
    }
  }
  return arrays;
}

const allAptitude = extractJsonArrays(aptitudeFile).flat();
const allPsych = extractJsonArrays(psychFile).flat();

console.log(`Found ${allAptitude.length} aptitude questions and ${allPsych.length} psychometric questions.`);

const insert = db.prepare(`
  INSERT OR IGNORE INTO questions
    (id, test_id, type, question_text, options, correct_answer, image_url, mappings, cohort, category, difficulty)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  // Process Psychometric
  for (const q of allPsych) {
    const isReverse = q.is_reverse === true;
    let optionsJSON = [];
    if (q.category === 'attention_check') {
        optionsJSON = [
            { id: 'opt_1', text: 'Strongly Disagree', value: 1 },
            { id: 'opt_2', text: 'Disagree', value: 2 },
            { id: 'opt_3', text: 'Neutral', value: 3 },
            { id: 'opt_4', text: 'Agree', value: 4 },
            { id: 'opt_5', text: 'Strongly Agree', value: 5 }
        ];
    } else {
        optionsJSON = [
            { id: 'opt_1', text: 'Strongly Disagree', value: 1 },
            { id: 'opt_2', text: 'Disagree', value: 2 },
            { id: 'opt_3', text: 'Not Sure', value: 3 },
            { id: 'opt_4', text: 'Agree', value: 4 },
            { id: 'opt_5', text: 'Strongly Agree', value: 5 }
        ];
    }

    const testId = q.cohort === 'grade_2_4' ? '2-4' : '5-7';
    const mappings = [{
      trait: q.category,
      weight: 1,
      direction: isReverse ? -1 : 1
    }];

    let correctAnswerId = null;
    if (q.correct_answer) {
       correctAnswerId = 'opt_' + q.correct_answer;
    }

    insert.run(
      q.id || uuidv4(),
      testId,
      'psychometric',
      q.question_text,
      JSON.stringify(optionsJSON),
      correctAnswerId,
      null, // image_url
      JSON.stringify(mappings),
      q.cohort,
      'psychological',
      'medium' // difficulty
    );
  }

  // Process Aptitude
  for (const q of allAptitude) {
    const rawOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    const mappedOptions = rawOptions.map((opt, idx) => ({
      id: `opt_${idx}`,
      text: String(opt),
      value: 0
    }));

    const correctOpt = mappedOptions.find(o => o.text === String(q.correct_answer));
    const correctId = correctOpt ? correctOpt.id : null;

    const testId = q.cohort === 'grade_2_4' ? '2-4' : '5-7';
    const mappings = [{
      trait: q.category,
      weight: 1
    }];

    insert.run(
      q.id || uuidv4(),
      testId,
      'aptitude',
      q.question_text,
      JSON.stringify(mappedOptions),
      correctId,
      null, // image_url
      JSON.stringify(mappings),
      q.cohort,
      q.category, // e.g. logical, numerical
      'medium' // difficulty
    );
  }
})();

console.log('Successfully seeded new 2-4 and 5-7 questions into database.db!');
