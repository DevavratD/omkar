// ─── Scoring Engine — Public Entry Point ─────────────────────────────────────
//
// This is the ONLY file that should be imported by server actions.
// It wires together: scoring → domain mapping → gap analysis → report generation.
//
// Usage:
//   import { runPsychometricScoring, runAptitudeScoring } from '@/lib/scoring';

export { scorePsychometric } from './psychometricEngine';
export { scoreAptitude } from './aptitudeEngine';
export { generateGapAnalysis } from './gapAnalysis';
export { generatePsychometricReport, generateAptitudeReport } from './reportGenerator';
export type {
  PsychAnswerInput,
} from './psychometricEngine';
export type {
  AptAnswerInput,
} from './aptitudeEngine';
export type {
  PsychometricResult,
  AptitudeResult,
  PsychometricReport,
  AptitudeReport,
  GapEntry,
  FullScoringOutput,
  Cohort,
} from './types';
