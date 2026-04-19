-- Run this in your Supabase SQL Editor to mirror the existing SQLite structure

CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  type TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT,
  image_url TEXT,
  mappings JSONB NOT NULL,
  cohort TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'medium'
);

CREATE TABLE results (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  test_type TEXT DEFAULT 'combined',
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  normalized_scores JSONB NOT NULL,
  meta_data JSONB,
  report JSONB,
  created_at TEXT NOT NULL
);
