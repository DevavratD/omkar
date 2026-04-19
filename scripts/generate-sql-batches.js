const fs = require('fs');

const data = JSON.parse(fs.readFileSync('questions_data.json', 'utf8'));

function escape(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

const batches = [];
const batchSize = 50;

for (let i = 0; i < data.length; i += batchSize) {
  const batch = data.slice(i, i + batchSize);
  let sql = 'INSERT INTO questions (id, test_id, type, question_text, options, correct_answer, image_url, mappings, cohort, category, difficulty) VALUES \n';
  
  const values = batch.map(row => {
    return '(' + [
      escape(row.id),
      escape(row.test_id),
      escape(row.type),
      escape(row.question_text),
      escape(row.options),
      escape(row.correct_answer),
      escape(row.image_url),
      escape(row.mappings),
      escape(row.cohort),
      escape(row.category),
      escape(row.difficulty)
    ].join(', ') + ')';
  });
  
  sql += values.join(',\n') + ' ON CONFLICT (id) DO UPDATE SET \n' +
    'test_id = EXCLUDED.test_id, type = EXCLUDED.type, question_text = EXCLUDED.question_text, ' +
    'options = EXCLUDED.options, correct_answer = EXCLUDED.correct_answer, image_url = EXCLUDED.image_url, ' +
    'mappings = EXCLUDED.mappings, cohort = EXCLUDED.cohort, category = EXCLUDED.category, difficulty = EXCLUDED.difficulty;';
  
  batches.push(sql);
}

fs.writeFileSync('insert_batches.json', JSON.stringify(batches));
console.log(`Generated ${batches.length} batches.`);
