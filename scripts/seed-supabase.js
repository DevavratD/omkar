const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const dbPath = path.join(__dirname, '../database.db');
const db = new Database(dbPath);

async function seedSupabase() {
  console.log('🚀 Starting Supabase migration...');

  // 1. Migrate Questions
  const questions = db.prepare('SELECT * FROM questions').all();
  console.log(`Found ${questions.length} questions in SQLite.`);

  if (questions.length > 0) {
    // Process JSON fields
    const formattedQuestions = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options),
      mappings: JSON.parse(q.mappings),
    }));

    // Upsert to Supabase
    const { error: qError } = await supabase
      .from('questions')
      .upsert(formattedQuestions, { onConflict: 'id' });

    if (qError) {
      console.error('Error migrating questions:', qError.message);
    } else {
      console.log('Successfully migrated questions.');
    }
  }

  // 2. Migrate Results
  const results = db.prepare('SELECT * FROM results').all();
  console.log(`Found ${results.length} results in SQLite.`);

  if (results.length > 0) {
    // Process JSON fields
    const formattedResults = results.map(r => ({
      ...r,
      answers: JSON.parse(r.answers),
      scores: JSON.parse(r.scores),
      normalized_scores: JSON.parse(r.normalized_scores),
      meta_data: r.meta_data ? JSON.parse(r.meta_data) : null,
      report: r.report ? JSON.parse(r.report) : null,
    }));

    // Upsert to Supabase
    const { error: rError } = await supabase
      .from('results')
      .upsert(formattedResults, { onConflict: 'id' });

    if (rError) {
      console.error('Error migrating results:', rError.message);
    } else {
      console.log('Successfully migrated results.');
    }
  }

  console.log('✅ Migration complete!');
}

seedSupabase().catch(err => {
  console.error('Migration failed:', err);
});
