// ─── Psychometric Scoring Engine ─────────────────────────────────────────────
//
// Implements the spec exactly:
//  1. Direction-aware score conversion
//  2. Raw aggregation per construct
//  3. Normalization based on question count
//  4. Band assignment
//  5. Attention check validation
//
// Input: answers (question_id → selected option value (1–5)) + question metadata
// from DB (which stores direction via mappings.direction field)

import {
  PsychConstructScore,
  PsychBand,
  PsychometricResult,
  PsychDomainScore,
  Cohort,
} from './types';
import { computePsychDomains } from './domainMapping';
import { Question } from '@/types';

// ─── Constants ───────────────────────────────────────────────────────────────

// Work-style constructs have 4 questions each
const FOUR_ITEM_CONSTRUCTS = new Set([
  'social_orientation',
  'structure_preference',
  'creativity_innovation',
  'analytical_curiosity',
  'leadership_initiative',
  'practical_orientation',
  'risk_exploration',
  'persistence_discipline',
]);

// RIASEC constructs have 3 questions each
const THREE_ITEM_CONSTRUCTS = new Set([
  'realistic',
  'investigative',
  'artistic',
  'social',
  'enterprising',
  'conventional',
]);

// ─── Band Assignment ──────────────────────────────────────────────────────────

function getPsychBand(normalized: number): PsychBand {
  if (normalized < 40) return 'Lower Preference';
  if (normalized < 60) return 'Balanced';
  if (normalized < 75) return 'Clear Preference';
  return 'Strong Preference';
}

// ─── Attention Check ──────────────────────────────────────────────────────────
//
// Question 51 (ends with _051): user must choose Agree (4 or 5)
// Question 52 (ends with _052): user must choose Disagree (1 or 2)
//
// We detect these by checking question_text for the instruction keyword.

function checkReliability(ans1: number, ans2: number) {
  const cond1 = ans1 >= 4; // agree
  const cond2 = ans2 <= 2; // disagree

  return (cond1 && cond2) ? "OK" : "LOW";
}

function checkAttention(
  questions: Question[],
  answerMap: Map<string, number>
): 'OK' | 'LOW' {
  const attnQs = questions.filter(q => q.type === 'psychometric' &&
    q.mappings.some(m => (m.trait as string) === 'attention_check'));

  if (attnQs.length < 2) return 'OK'; // Default pass if missing

  let agreeVal = 3;
  let disagreeVal = 3;

  for (const q of attnQs) {
    const val = answerMap.get(q.id);
    if (val === undefined) continue;

    const lowerText = q.question_text.toLowerCase();
    if (lowerText.includes('choose agree') || lowerText.includes('select agree')) {
      agreeVal = val;
    }
    if (lowerText.includes('choose disagree') || lowerText.includes('select disagree')) {
      disagreeVal = val;
    }
  }

  return checkReliability(agreeVal, disagreeVal);
}

// ─── Main Scoring Function ────────────────────────────────────────────────────

export interface PsychAnswerInput {
  question_id: string;
  // The raw 1–5 Likert value chosen by the user
  value: number;
}

export function scorePsychometric(
  questions: Question[],
  answers: PsychAnswerInput[],
  cohort: Cohort = 'grade_11_12'
): PsychometricResult {
  // Build a map of question_id → raw value (1–5)
  const answerMap = new Map<string, number>(answers.map(a => [a.question_id, a.value]));

  // Step 1 & 2: Direction-aware scoring, grouped by construct
  const rawByConstruct: Record<string, number> = {};
  const countByConstruct: Record<string, number> = {};

  for (const q of questions) {
    if (q.type !== 'psychometric') continue;

    const val = answerMap.get(q.id);
    if (val === undefined) continue;

    for (const mapping of q.mappings) {
      const construct = mapping.trait as string;

      // Skip attention_check — handled separately
      if ((construct as string) === 'attention_check') continue;

      // Direction is stored in the JSON but the DB doesn't store it in mappings.
      // We read it from the question's extra field or infer from context.
      // The DB stores mappings as [{ trait, weight, direction }] (set during seeding).
      const direction = (mapping as any).direction as string | undefined;
      const score = direction === 'reverse' ? (6 - val) : val;

      rawByConstruct[construct] = (rawByConstruct[construct] || 0) + score;
      countByConstruct[construct] = (countByConstruct[construct] || 0) + 1;
    }
  }

  // Step 3: Normalize
  const constructScores: Record<string, PsychConstructScore> = {};

  for (const [construct, raw] of Object.entries(rawByConstruct)) {
    const count = countByConstruct[construct];
    let normalized: number;

    if (FOUR_ITEM_CONSTRUCTS.has(construct)) {
      // Range: 4 (min) to 20 (max)
      normalized = Math.round(((raw - 4) / 16) * 100);
    } else if (THREE_ITEM_CONSTRUCTS.has(construct)) {
      // Range: 3 (min) to 15 (max)
      normalized = Math.round(((raw - 3) / 12) * 100);
    } else {
      // Fallback: simple percentage based on actual count
      const min = count;
      const max = count * 5;
      normalized = Math.round(((raw - min) / (max - min)) * 100);
    }

    // Clamp 0–100
    normalized = Math.max(0, Math.min(100, normalized));

    constructScores[construct] = {
      construct: construct as any,
      raw,
      normalized,
      count,
      band: getPsychBand(normalized),
    };
  }

  // Step 4: Attention check
  const reliabilityFlag = checkAttention(questions, answerMap);

  // Step 5: Midpoint bias detection
  // If >55% of psychometric answers are "3" (Not Sure), the data quality is suspect
  const psychAnswers = answers.filter(a => {
    const q = questions.find(q => q.id === a.question_id);
    return q?.type === 'psychometric';
  });
  const midpointCount = psychAnswers.filter(a => a.value === 3).length;
  const midpointBias = psychAnswers.length > 0
    ? midpointCount / psychAnswers.length > 0.55
    : false;

  // Step 6: RIASEC top 3
  const riasecConstructs = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
  const riasecTop3 = riasecConstructs
    .filter(c => constructScores[c])
    .sort((a, b) => constructScores[b].normalized - constructScores[a].normalized)
    .slice(0, 3);

  // Step 7: Work-style summary (top 3 work-style constructs)
  const workStyleConstructs = Array.from(FOUR_ITEM_CONSTRUCTS);
  const workStyleSummary = workStyleConstructs
    .filter(c => constructScores[c])
    .sort((a, b) => constructScores[b].normalized - constructScores[a].normalized)
    .slice(0, 3)
    .map(c => `${c.replace(/_/g, ' ')} (${constructScores[c].band})`);

  // Step 8: Domain mapping
  const domainScores = computePsychDomains(constructScores, cohort);
  const topDomains = domainScores.slice(0, 3);

  return {
    construct_scores: constructScores,
    domain_scores: domainScores,
    top_domains: topDomains,
    reliability_flag: reliabilityFlag,
    riasec_top3: riasecTop3,
    work_style_summary: workStyleSummary,
    midpoint_bias: midpointBias,
  };
}
