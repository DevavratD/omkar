const fs = require('fs');
const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, '../database.db');
const db = new Database(DB_PATH);

// Ensure columns exist (for safe-running)
try { db.exec("ALTER TABLE questions ADD COLUMN cohort TEXT;"); } catch {}
try { db.exec("ALTER TABLE questions ADD COLUMN category TEXT;"); } catch {}
try { db.exec("ALTER TABLE questions ADD COLUMN difficulty TEXT DEFAULT 'medium';"); } catch {}

const fileData = fs.readFileSync(path.join(__dirname, '../visual-seeds.json'), 'utf-8');
const visualQuestions = JSON.parse(fileData);

const insert = db.prepare(`
  INSERT OR IGNORE INTO questions
    (id, test_id, type, question_text, options, correct_answer, image_url, mappings, cohort, category, difficulty)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const q of visualQuestions) {
    // Map test_id based on cohort
    let testId = '8-10';
    if (q.cohort === 'grade_2_4') testId = '2-4';
    if (q.cohort === 'grade_5_7') testId = '5-7';
    if (q.cohort === 'grade_11_12') testId = '11-12';
    if (q.cohort === 'professional') testId = 'professional';

    const mappings = [{
      trait: q.category, 
      weight: 1
    }];

    insert.run(
      q.id || uuidv4(),
      testId,
      q.type, // 'aptitude'
      q.question_text,
      JSON.stringify(q.options),
      q.correct_answer,
      q.image_url,
      JSON.stringify(mappings),
      q.cohort,
      q.category, // 'spatial'
      'hard' // Let's mark visual logic as hard for balanced distribution
    );
  }
})();

console.log(`Successfully seeded ${visualQuestions.length} Visual Reasoning questions into the spatial category!`);
