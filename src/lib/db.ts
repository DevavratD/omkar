import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import type { Question, TestResult, Cohort, AptitudeCategory, Difficulty } from '@/types';

// ─── Supabase Client ────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// ─── Cohort helpers ──────────────────────────────────────────────────────────

export const VALID_CATEGORIES: AptitudeCategory[] = [
  'logical',
  'analytical',
  'numerical',
  'spatial',
  'verbal',
  'mechanical',
  'psychological'
];

export const VALID_DIFFICULTY: Difficulty[] = ['easy', 'medium', 'hard'];

/** Map legacy test_id values to the canonical cohort identifier. */
export const TEST_ID_TO_COHORT: Record<string, Cohort> = {
  '2-4':          'grade_2_4',
  '5-7':          'grade_5_7',
  '8-10':         'grade_8_10',
  '11-12':        'grade_11_12',
  'professional': 'professional',
};

/**
 * Derive a coarse AptitudeCategory from the mapped trait name stored in
 * the questions.mappings JSON column. Returns null for psychometric /
 * meta questions so the column stays NULL for those rows.
 */
function traitToCategory(trait: string, questionType: string): AptitudeCategory | null {
  if (questionType !== 'aptitude') return null;
  const map: Record<string, AptitudeCategory> = {
    numerical_reasoning: 'numerical',
    numerical:           'numerical',
    logical_reasoning:   'logical',
    logical:             'logical',
    verbal_reasoning:    'verbal',
    verbal:              'verbal',
    spatial_visual_reasoning: 'spatial',
    spatial:             'spatial',
    analytical_reasoning:'analytical',
    analytical:          'analytical',
    mechanical_reasoning:'mechanical',
    mechanical:          'mechanical',
  };
  return map[trait] ?? null;
}

// ─── DB path at project root ────────────────────────────────────────────────
const DB_PATH = path.join(process.cwd(), 'database.db');

// Singleton pattern — reuse the same connection per process
let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  initSchema(_db);
  migrateData(_db);       // idempotent: only back-fills NULLs
  seedQuestionsIfEmpty(_db);
  return _db;
}

// ─── Schema ─────────────────────────────────────────────────────────────────
function initSchema(db: Database.Database) {
  // Core tables (unchanged structure)
  db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id            TEXT PRIMARY KEY,
      test_id       TEXT NOT NULL,
      type          TEXT NOT NULL,
      question_text TEXT NOT NULL,
      options       TEXT NOT NULL,   -- JSON
      correct_answer TEXT,
      image_url     TEXT,
      mappings      TEXT NOT NULL    -- JSON
    );

    CREATE TABLE IF NOT EXISTS results (
      id                TEXT PRIMARY KEY,
      test_id           TEXT NOT NULL,
      test_type         TEXT DEFAULT 'combined',
      answers           TEXT NOT NULL,   -- JSON
      scores            TEXT NOT NULL,   -- JSON
      normalized_scores TEXT NOT NULL,  -- JSON
      meta_data         TEXT,            -- JSON
      report            TEXT,            -- JSON
      created_at        TEXT NOT NULL
    );
  `);

  // ── Backward-compat column additions (silent no-op if already present) ────
  const alterStatements = [
    "ALTER TABLE results    ADD COLUMN test_type  TEXT DEFAULT 'combined';",
    // ── Cohort-based architecture additions ──
    "ALTER TABLE questions  ADD COLUMN cohort     TEXT;",
    "ALTER TABLE questions  ADD COLUMN category   TEXT;",
    "ALTER TABLE questions  ADD COLUMN difficulty TEXT DEFAULT 'medium';",
  ];
  for (const sql of alterStatements) {
    try { db.exec(sql); } catch { /* column already exists — safe to ignore */ }
  }
}

// ─── One-shot data migration ─────────────────────────────────────────────────
/**
 * Back-fills cohort, category, and difficulty on rows that were inserted
 * before these columns existed.  Safe to run on every startup because it
 * only touches rows where cohort IS NULL.
 */
function migrateData(db: Database.Database) {
  // 1. Derive cohort from test_id for all legacy rows
  for (const [testId, cohort] of Object.entries(TEST_ID_TO_COHORT)) {
    db.prepare(
      `UPDATE questions SET cohort = ? WHERE test_id = ? AND cohort IS NULL`
    ).run(cohort, testId);
  }

  // 2. Derive category from the first trait stored in the mappings JSON
  //    (applies only to aptitude questions)
  const unCategorised = db
    .prepare(`SELECT id, type, mappings FROM questions WHERE category IS NULL AND type = 'aptitude'`)
    .all() as { id: string; type: string; mappings: string }[];

  const setCat = db.prepare(`UPDATE questions SET category = ? WHERE id = ?`);
  const setCatMany = db.transaction((rows: typeof unCategorised) => {
    for (const row of rows) {
      try {
        const mappings: { trait: string }[] = JSON.parse(row.mappings);
        const cat = traitToCategory(mappings[0]?.trait ?? '', row.type);
        if (cat) setCat.run(cat, row.id);
      } catch { /* malformed JSON — skip */ }
    }
  });
  setCatMany(unCategorised);

  // 3. Default difficulty to 'medium' for any rows still NULL
  db.prepare(`UPDATE questions SET difficulty = 'medium' WHERE difficulty IS NULL`).run();
}

// ─── Seeding ─────────────────────────────────────────────────────────────────
function seedQuestionsIfEmpty(db: Database.Database) {
  const count = (db.prepare('SELECT COUNT(*) as c FROM questions').get() as any).c;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT OR IGNORE INTO questions
      (id, test_id, type, question_text, options, correct_answer, image_url, mappings, cohort, category, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((rows: any[]) => {
    for (const r of rows) insert.run(...r);
  });

  // ── 8-10 ──────────────────────────────────────────────────────────────────
  const raw8_10Path = path.join(process.cwd(), 'questions-8-10.json');
  if (fs.existsSync(raw8_10Path)) {
    const raw = JSON.parse(fs.readFileSync(raw8_10Path, 'utf-8'));
    const rows: any[] = [];

    // Meta questions
    if (raw.meta_questions) {
      for (const q of raw.meta_questions) {
        rows.push([
          `meta-8-10-${q.id}`,
          '8-10',
          'meta',
          q.q,
          JSON.stringify(q.options.map((o: string, i: number) => ({ id: `meta-8-10-${q.id}-opt${i}`, text: o, value: 0 }))),
          null,
          null,
          JSON.stringify([{ trait: q.trait || 'profiling_score', weight: 1 }]),
          'grade_8_10',   // cohort
          null,           // category (n/a for meta)
          'medium',       // difficulty
        ]);
      }
    }

    // Psychometric questions — 1 to 5 points
    const psychOpts = [
      { id: 'sd', text: 'Strongly Disagree', value: 1 },
      { id: 'd', text: 'Disagree', value: 2 },
      { id: 'n', text: 'Not Sure', value: 3 },
      { id: 'a', text: 'Agree', value: 4 },
      { id: 'sa', text: 'Strongly Agree', value: 5 },
    ];
    for (const q of raw.psychometric_questions) {
      rows.push([
        `psych-8-10-${q.id}`,
        '8-10',
        'psychometric',
        q.q,
        JSON.stringify(psychOpts.map(o => ({ ...o, id: `psych-8-10-${q.id}-${o.id}` }))),
        null,
        null,
        JSON.stringify([{ trait: q.trait, weight: 1, direction: q.direction }]),
        'grade_8_10',       // cohort
        'psychological',    // category
        'medium',           // difficulty
      ]);
    }

    // Aptitude questions
    for (const q of raw.aptitude_questions) {
      const options = q.options.map((opt: string, i: number) => ({
        id: `apt-8-10-${q.id}-opt${i}`,
        text: opt,
        value: 0,
      }));
      const correctOpt = options.find((o: any) => o.text === q.correct);
      const correctId = correctOpt ? correctOpt.id : null;

      // Determine trait from category (supports both short and long-form names)
      const categoryToTrait: Record<string, string> = {
        // short-form (legacy)
        numerical: 'numerical_reasoning',
        logical: 'logical_reasoning',
        verbal: 'verbal_reasoning',
        spatial: 'spatial_visual_reasoning',
        mechanical: 'mechanical_reasoning',
        analytical: 'analytical_reasoning',
        // long-form (new banks)
        numerical_reasoning: 'numerical_reasoning',
        logical_reasoning: 'logical_reasoning',
        verbal_reasoning: 'verbal_reasoning',
        spatial_visual_reasoning: 'spatial_visual_reasoning',
        analytical_reasoning: 'analytical_reasoning',
      };
      const trait = categoryToTrait[q.category] || 'logical_reasoning';

      rows.push([
        `apt-8-10-${q.id}`,
        '8-10',
        'aptitude',
        q.question,
        JSON.stringify(options),
        correctId,
        q.image_url || null,
        JSON.stringify([{ trait, weight: 1 }]),
        'grade_8_10',                   // cohort
        traitToCategory(trait, 'aptitude'), // category
        'medium',                       // difficulty
      ]);
    }

    insertMany(rows);
    console.log(`[db] Seeded ${rows.length} questions for test 8-10`);
  }

  // ── 11-12 ─────────────────────────────────────────────────────────────────
  const raw11_12Path = path.join(process.cwd(), 'questions-11-12.json');
  if (fs.existsSync(raw11_12Path)) {
    const raw = JSON.parse(fs.readFileSync(raw11_12Path, 'utf-8'));
    const rows: any[] = [];

    // Meta questions
    if (raw.meta_questions) {
      for (const q of raw.meta_questions) {
        rows.push([
          `meta-11-12-${q.id}`,
          '11-12',
          'meta',
          q.q,
          JSON.stringify(q.options.map((o: string, i: number) => ({ id: `meta-11-12-${q.id}-opt${i}`, text: o, value: 0 }))),
          null,
          null,
          JSON.stringify([{ trait: q.trait, weight: 1 }]),
          'grade_11_12',  // cohort
          null,           // category
          'medium',       // difficulty
        ]);
      }
    }

    // Psychometric
    const psychOpts = [
      { id: 'sd', text: 'Strongly Disagree', value: 1 },
      { id: 'd', text: 'Disagree', value: 2 },
      { id: 'n', text: 'Not Sure', value: 3 },
      { id: 'a', text: 'Agree', value: 4 },
      { id: 'sa', text: 'Strongly Agree', value: 5 },
    ];
    for (const q of raw.psychometric_questions) {
      rows.push([
        `psych-11-12-${q.id}`,
        '11-12',
        'psychometric',
        q.q,
        JSON.stringify(psychOpts.map(o => ({ ...o, id: `psych-11-12-${q.id}-${o.id}` }))),
        null,
        null,
        JSON.stringify([{ trait: q.trait, weight: 1, direction: q.direction }]),
        'grade_11_12',      // cohort
        'psychological',    // category
        'medium',           // difficulty
      ]);
    }

    // Aptitude
    if (raw.aptitude_questions) {
      for (const q of raw.aptitude_questions) {
        const categoryToTrait: Record<string, string> = {
          // short-form (legacy)
          numerical: 'numerical_reasoning',
          logical: 'logical_reasoning',
          verbal: 'verbal_reasoning',
          spatial: 'spatial_visual_reasoning',
          analytical: 'analytical_reasoning',
          // long-form (new banks)
          numerical_reasoning: 'numerical_reasoning',
          logical_reasoning: 'logical_reasoning',
          verbal_reasoning: 'verbal_reasoning',
          spatial_visual_reasoning: 'spatial_visual_reasoning',
          analytical_reasoning: 'analytical_reasoning',
        };
        const trait = categoryToTrait[q.category] || 'logical_reasoning';

        const options = q.options.map((opt: string, i: number) => ({
          id: `apt-11-12-${q.id}-opt${i}`,
          text: opt,
          value: 0,
        }));
        const correctOpt = options.find((o: any) => o.text === q.correct);
        const correctId = correctOpt ? correctOpt.id : null;

        rows.push([
          `apt-11-12-${q.id}`,
          '11-12',
          'aptitude',
          q.question,
          JSON.stringify(options),
          correctId,
          q.image_url || null,
          JSON.stringify([{ trait, weight: 1 }]),
          'grade_11_12',                  // cohort
          traitToCategory(trait, 'aptitude'), // category
          'medium',                       // difficulty
        ]);
      }
    }

    insertMany(rows);
    console.log(`[db] Seeded ${rows.length} questions for test 11-12`);
  }

  // ── Professional ──────────────────────────────────────────────────────────
  const rawProfPath = path.join(process.cwd(), 'questions-professional.json');
  if (fs.existsSync(rawProfPath)) {
    const raw = JSON.parse(fs.readFileSync(rawProfPath, 'utf-8'));
    const rows: any[] = [];

    // Meta questions
    if (raw.meta_questions) {
      for (const q of raw.meta_questions) {
        rows.push([
          `meta-prof-${q.id}`,
          'professional',
          'meta',
          q.q,
          JSON.stringify(q.options.map((o: string, i: number) => ({ id: `meta-prof-${q.id}-opt${i}`, text: o, value: 0 }))),
          null,
          null,
          JSON.stringify([{ trait: q.trait, weight: 1 }]),
          'professional', // cohort
          null,           // category
          'medium',       // difficulty
        ]);
      }
    }

    const psychOpts = [
      { id: 'sd', text: 'Strongly Disagree', value: 1 },
      { id: 'd', text: 'Disagree', value: 2 },
      { id: 'n', text: 'Not Sure', value: 3 },
      { id: 'a', text: 'Agree', value: 4 },
      { id: 'sa', text: 'Strongly Agree', value: 5 },
    ];
    for (const q of raw.psychometric_questions) {
      rows.push([
        `psych-prof-${q.id}`,
        'professional',
        'psychometric',
        q.q,
        JSON.stringify(psychOpts.map(o => ({ ...o, id: `psych-prof-${q.id}-${o.id}` }))),
        null,
        null,
        JSON.stringify([{ trait: q.trait, weight: 1, direction: q.direction }]),
        'professional',     // cohort
        'psychological',    // category
        'medium',           // difficulty
      ]);
    }

    // Aptitude placeholder loop, handles safely if it exists
    if (raw.aptitude_questions) {
        for (const q of raw.aptitude_questions) {
          const options = q.options.map((opt: string, i: number) => ({
            id: `apt-prof-${q.id}-opt${i}`,
            text: opt,
            value: 0,
          }));
          const correctOpt = options.find((o: any) => o.text === q.correct);
          const correctId = correctOpt ? correctOpt.id : null;
          const aptTrait = q.category || 'logical_reasoning';
          rows.push([
            `apt-prof-${q.id}`,
            'professional',
            'aptitude',
            q.question,
            JSON.stringify(options),
            correctId,
            q.image_url || null,
            JSON.stringify([{ trait: aptTrait, weight: 1 }]),
            'professional',                         // cohort
            traitToCategory(aptTrait, 'aptitude'),  // category
            'medium',                               // difficulty
          ]);
        }
    }

    insertMany(rows);
    console.log(`[db] Seeded ${rows.length} questions for test professional`);
  }
}

// ─── Shared Row Mapper ────────────────────────────────────────────────────────
function mapQuestionRow(row: any): Question {
  // 1. Mandatory constraints
  if (!row.cohort) {
    throw new Error(`Invalid question ${row.id}: missing cohort`);
  }
  
  if (row.test_id && TEST_ID_TO_COHORT[row.test_id]) {
    if (TEST_ID_TO_COHORT[row.test_id] !== row.cohort) {
      console.warn(`Data inconsistency warning: Question ${row.id} has test_id=${row.test_id} but cohort=${row.cohort}`);
    }
  }

  // 2. Strict Enums validation
  let categoryStr = row.category;
  if (categoryStr && !(VALID_CATEGORIES as string[]).includes(categoryStr)) {
    console.warn(`Invalid category ${categoryStr} on question ${row.id}`);
    categoryStr = null; // fallback or handle gracefully
  }

  let difficultyStr = row.difficulty ?? 'medium';
  if (!(VALID_DIFFICULTY as string[]).includes(difficultyStr)) {
    difficultyStr = 'medium';
  }

  return {
    id: row.id,
    test_id: row.test_id,
    type: row.type as any,
    question_text: row.question_text,
    options: JSON.parse(row.options),
    correct_answer: row.correct_answer ?? undefined,
    image_url: row.image_url ?? null,
    mappings: JSON.parse(row.mappings),
    // Extended fields properly typed
    cohort: row.cohort as Cohort,
    category: categoryStr as AptitudeCategory | null,
    difficulty: difficultyStr as Difficulty,
  };
}

// ─── Public helpers ───────────────────────────────────────────────────────────

export async function getQuestionsForTest(testId: string): Promise<Question[]> {
  const cohort = TEST_ID_TO_COHORT[testId];
  if (cohort) {
    // Transparently route legacy calls to the new balanced fetching engine!
    return getQuestionsForCohort(cohort);
  }

  if (supabase) {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('test_id', testId)
      .order('type', { ascending: true }); // A bit simplistic without typeOrder but fallback OK
    if (error) {
      console.error('Supabase query error:', error);
      return [];
    }
    // ensure strict mapping, though jsonb are already parsed by supabase!
    return data.map(mapSupabaseQuestionRow);
  }

  const db = getDb();
  const rows: any[] = db
    .prepare('SELECT * FROM questions WHERE test_id = ? ORDER BY type ASC')
    .all(testId);

  const typeOrder: Record<string, number> = { meta: 1, psychometric: 2, aptitude: 3 };

  return rows
    .map(mapQuestionRow)
    .sort((a, b) => (typeOrder[a.type] || 9) - (typeOrder[b.type] || 9));
}

/**
 * 🚀 QUESTION SELECTION ENGINE
 *
 * Implements balanced fetching. For aptitude tests, ensures proportional
 * representation across categories. For psychometric/meta, fetches all schema.
 */
export async function getQuestionsForCohort(
  cohort: Cohort,
  questionType?: 'psychometric' | 'aptitude' | 'meta'
): Promise<Question[]> {
  const typeOrder: Record<string, number> = { meta: 1, psychometric: 2, aptitude: 3 };
  let allRows: any[] = [];

  const typesToFetch = questionType ? [questionType] : ['meta', 'psychometric', 'aptitude'];

  if (supabase) {
    for (const t of typesToFetch) {
      if (t === 'aptitude') {
        const targetCategories = ['logical', 'analytical', 'numerical', 'spatial', 'verbal', 'mechanical'];
        // Supabase doesn't have a simple random limit directly in JS without an RPC, 
        // so we fetch all and randomize in memory. In a real highly-scaled app, use an RPC `ORDER BY random()`.
        for (const cat of targetCategories) {
          const { data } = await supabase.from('questions').select('*').eq('cohort', cohort).eq('type', 'aptitude').eq('category', cat);
          if (data && data.length > 0) {
            allRows.push(...data.sort(() => 0.5 - Math.random()).slice(0, 10));
          }
        }
        // Uncategorized
        const { data: uncatData } = await supabase.from('questions').select('*').eq('cohort', cohort).eq('type', 'aptitude');
        if (uncatData) {
          const actuallyUncat = uncatData.filter(d => !d.category || !targetCategories.includes(d.category as any));
          allRows.push(...actuallyUncat.sort(() => 0.5 - Math.random()).slice(0, 5));
        }
      } else {
        const { data } = await supabase.from('questions').select('*').eq('cohort', cohort).eq('type', t);
        if (data) allRows.push(...data);
      }
    }
    return allRows.map(mapSupabaseQuestionRow).sort((a, b) => (typeOrder[a.type] || 9) - (typeOrder[b.type] || 9));
  }

  const db = getDb();

  for (const t of typesToFetch) {
    if (t === 'aptitude') {
      // 🎯 BALANCED FETCH ALGORITHM FOR APTITUDE
      const targetCategories = ['logical', 'analytical', 'numerical', 'spatial', 'verbal', 'mechanical'];
      
      for (const cat of targetCategories) {
        // Fetch up to 10 random questions per category
        const rows = db.prepare(`
          SELECT * FROM questions 
          WHERE cohort = ? 
            AND type = 'aptitude' 
            AND category = ? 
          ORDER BY RANDOM() 
          LIMIT 10
        `).all(cohort, cat);
        allRows.push(...rows);
      }

      // Fill in any aptitude questions that lack a proper category just in case
      const uncategorizedRows = db.prepare(`
        SELECT * FROM questions 
        WHERE cohort = ? 
          AND type = 'aptitude' 
          AND (category IS NULL OR category NOT IN (${targetCategories.map(c=>`'${c}'`).join(',')}))
        ORDER BY RANDOM()
        LIMIT 5
      `).all(cohort);
      allRows.push(...uncategorizedRows);

    } else {
      // For meta and psychometric, we need all required schema mappings
      // Assuming psychometric requires the full set to score 50+ traits properly
      const rows = db.prepare(`
        SELECT * FROM questions 
        WHERE cohort = ? AND type = ?
      `).all(cohort, t);
      allRows.push(...rows);
    }
  }

  return allRows
    .map(mapQuestionRow)
    .sort((a, b) => (typeOrder[a.type] || 9) - (typeOrder[b.type] || 9));
}

export async function insertResult(result: TestResult): Promise<void> {
  if (supabase) {
    await supabase.from('results').insert({
      id: result.id,
      test_id: result.test_id,
      test_type: result.test_type,
      answers: result.answers,
      scores: result.scores,
      normalized_scores: result.normalized_scores,
      meta_data: result.meta_data,
      report: result.report,
      created_at: result.created_at,
    });
    return;
  }

  const db = getDb();
  db.prepare(`
    INSERT INTO results (id, test_id, test_type, answers, scores, normalized_scores, meta_data, report, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    result.id,
    result.test_id,
    result.test_type,
    JSON.stringify(result.answers),
    JSON.stringify(result.scores),
    JSON.stringify(result.normalized_scores),
    JSON.stringify(result.meta_data ?? null),
    JSON.stringify(result.report ?? null),
    result.created_at,
  );
}

export async function getAllResults(): Promise<TestResult[]> {
  if (supabase) {
    const { data } = await supabase.from('results').select('*').order('created_at', { ascending: false });
    if (data) return data.map(mapSupabaseResultRow);
    return [];
  }
  const db = getDb();
  const rows: any[] = db
    .prepare('SELECT * FROM results ORDER BY created_at DESC')
    .all();
  return rows.map(parseResult);
}

export async function getResultById(id: string): Promise<TestResult | null> {
  if (supabase) {
    const { data } = await supabase.from('results').select('*').eq('id', id).single();
    if (data) return mapSupabaseResultRow(data);
    return null;
  }
  const db = getDb();
  const row = db.prepare('SELECT * FROM results WHERE id = ?').get(id) as any;
  if (!row) return null;
  return parseResult(row);
}

// Supabase returns parsed JSONs already for JSONB columns
function mapSupabaseQuestionRow(row: any): Question {
  return {
    ...row,
    options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
    mappings: typeof row.mappings === 'string' ? JSON.parse(row.mappings) : row.mappings,
  };
}

function mapSupabaseResultRow(row: any): TestResult {
  return {
    ...row,
    answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers,
    scores: typeof row.scores === 'string' ? JSON.parse(row.scores) : row.scores,
    normalized_scores: typeof row.normalized_scores === 'string' ? JSON.parse(row.normalized_scores) : row.normalized_scores,
    meta_data: typeof row.meta_data === 'string' ? JSON.parse(row.meta_data) : row.meta_data,
    report: typeof row.report === 'string' ? JSON.parse(row.report) : row.report,
  };
}

function parseResult(row: any): TestResult {
  return {
    id: row.id,
    test_id: row.test_id,
    test_type: row.test_type || 'combined',
    answers: JSON.parse(row.answers),
    scores: JSON.parse(row.scores),
    normalized_scores: JSON.parse(row.normalized_scores),
    meta_data: row.meta_data ? JSON.parse(row.meta_data) : undefined,
    report: row.report ? JSON.parse(row.report) : undefined,
    created_at: row.created_at,
  };
}
