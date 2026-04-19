// ─── Aptitude Scoring Engine ─────────────────────────────────────────────────
//
// Implements the spec exactly:
//  1. correct_count per construct
//  2. normalized = (correct / total) * 100
//  3. Band assignment
//  4. Domain mapping via weights

import { AptConstructScore, AptBand, AptitudeResult } from './types';
import { computeAptDomains } from './domainMapping';
import { Question } from '@/types';

// ─── Band Assignment ──────────────────────────────────────────────────────────

function getAptBand(normalized: number): AptBand {
  if (normalized < 40) return 'Needs Development';
  if (normalized < 60) return 'Emerging';
  if (normalized < 75) return 'Strong';
  return 'Very Strong';
}

// ─── Improvement Suggestions per construct ────────────────────────────────────

const IMPROVEMENT_SUGGESTIONS: Record<string, string> = {
  logical_reasoning:
    'Practice number/letter series, coding-decoding, and abstract pattern puzzles. Aim for 15–20 minutes daily.',
  analytical_reasoning:
    'Work on data interpretation problems, arrangement puzzles, and conditional logic exercises.',
  numerical_reasoning:
    'Strengthen mental math with percentages, ratios, and speed/time/work problems.',
  spatial_visual_reasoning:
    'Practice mirror images, rotation puzzles, and cube/net-based reasoning problems.',
};

const STRENGTH_EXPLANATIONS: Record<string, string> = {
  logical_reasoning:
    'Shows strong pattern recognition and rule-based abstract reasoning.',
  analytical_reasoning:
    'Demonstrates structured multi-step interpretation and conditional logic ability.',
  numerical_reasoning:
    'Indicates solid applied quantitative reasoning and practical number handling.',
  spatial_visual_reasoning:
    'Reflects effective mental transformation and visual-structural reasoning.',
};

function getStrengthsWeaknesses(scores: Record<string, { normalized: number }>) {
  const entries = Object.entries(scores).map(([k, v]) => [k, v.normalized] as [string, number]);

  const strengths = entries
    .filter(([_, score]) => score >= 60)
    .sort((a, b) => b[1] - a[1]);

  const weaknesses = entries
    .filter(([_, score]) => score < 40)
    .sort((a, b) => a[1] - b[1]);

  return {
    strengths: strengths.length ? strengths.slice(0, 3).map(([c]) => c) : [],
    weaknesses: weaknesses.length ? weaknesses.slice(0, 3).map(([c]) => c) : []
  };
}

// ─── Main Scoring Function ────────────────────────────────────────────────────

export interface AptAnswerInput {
  question_id: string;
  selected_option_id: string;
}

export function scoreAptitude(
  questions: Question[],
  answers: AptAnswerInput[]
): AptitudeResult {
  // Build answer map
  const answerMap = new Map<string, string>(answers.map(a => [a.question_id, a.selected_option_id]));

  // Count correct and total per construct
  const correctByConstruct: Record<string, number> = {};
  const totalByConstruct: Record<string, number> = {};

  for (const q of questions) {
    if (q.type !== 'aptitude') continue;

    const construct = q.mappings[0]?.trait as string;
    if (!construct) continue;

    totalByConstruct[construct] = (totalByConstruct[construct] || 0) + 1;

    const selectedId = answerMap.get(q.id);
    if (selectedId && selectedId === q.correct_answer) {
      correctByConstruct[construct] = (correctByConstruct[construct] || 0) + 1;
    }
  }

  // Build construct scores
  const constructScores: Record<string, AptConstructScore> = {};

  for (const [construct, total] of Object.entries(totalByConstruct)) {
    const correct = correctByConstruct[construct] || 0;
    const normalized = Math.round((correct / total) * 100);

    constructScores[construct] = {
      construct: construct as any,
      correct,
      total,
      normalized,
      band: getAptBand(normalized),
    };
  }

  // Rank constructs
  const { strengths, weaknesses } = getStrengthsWeaknesses(constructScores);
  const improvement_areas = weaknesses;

  // Domain mapping
  const domainScores = computeAptDomains(constructScores);

  return {
    construct_scores: constructScores,
    domain_scores: domainScores,
    top_domains: domainScores.slice(0, 3),
    strengths,
    improvement_areas,
  };
}
