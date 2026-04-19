// ─── Scoring Engine Types ─────────────────────────────────────────────────────

export type Cohort = 'grade_8_10' | 'grade_11_12' | 'professional';

// Maps to the test_id strings used in the DB ('8-10', '11-12', 'professional')
export function cohortFromTestId(testId: string): Cohort {
  if (testId === '8-10') return 'grade_8_10';
  if (testId === '11-12') return 'grade_11_12';
  return 'professional';
}

// ─── Psychometric ─────────────────────────────────────────────────────────────

export type PsychConstruct =
  | 'social_orientation'
  | 'structure_preference'
  | 'creativity_innovation'
  | 'analytical_curiosity'
  | 'leadership_initiative'
  | 'practical_orientation'
  | 'risk_exploration'
  | 'persistence_discipline'
  | 'realistic'
  | 'investigative'
  | 'artistic'
  | 'social'
  | 'enterprising'
  | 'conventional'
  | 'attention_check';

export type PsychBand = 'Lower Preference' | 'Balanced' | 'Clear Preference' | 'Strong Preference';
export type ConfidenceLevel = 'Low' | 'Moderate' | 'High';

export interface PsychConstructScore {
  construct: PsychConstruct;
  raw: number;
  normalized: number;
  count: number;
  band: PsychBand;
}

export interface PsychDomainScore {
  domain: string;
  score: number;
  fit: 'Strong Fit' | 'Good Fit' | 'Moderate Fit' | 'Low Fit';
  explanation: string;
}

export interface PsychometricResult {
  construct_scores: Record<string, PsychConstructScore>;
  domain_scores: PsychDomainScore[];
  top_domains: PsychDomainScore[];
  reliability_flag: 'OK' | 'LOW';
  riasec_top3: string[];
  work_style_summary: string[];
  midpoint_bias: boolean;
}

// ─── Aptitude ─────────────────────────────────────────────────────────────────

export type AptConstruct =
  | 'logical_reasoning'
  | 'analytical_reasoning'
  | 'numerical_reasoning'
  | 'spatial_visual_reasoning';

export type AptBand = 'Needs Development' | 'Emerging' | 'Strong' | 'Very Strong';

export interface AptConstructScore {
  construct: AptConstruct;
  correct: number;
  total: number;
  normalized: number;
  band: AptBand;
}

export interface AptGapSeverity {
  skill: string;
  diff: number;
  severity: 'minor' | 'moderate' | 'critical';
}

export interface AptDecision {
  domain: string;
  readiness: 'STRONG_FIT' | 'RISKY_FIT' | 'CONDITIONAL_FIT' | 'EXPLORATORY_STAGE';
  score: number;
  reason: string;
  risk: string;
  action: string;
  relatedRoles?: string[];
}

export interface AptDomainScore {
  domain: string;
  score: number;
  fit: 'STRONG_FIT' | 'RISKY_FIT' | 'CONDITIONAL_FIT' | 'EXPLORATORY_STAGE';
  explanation: string;
  gaps?: AptGapSeverity[];
  decision?: AptDecision;
  relatedRoles?: string[];
}

export interface AptitudeResult {
  construct_scores: Record<string, AptConstructScore>;
  domain_scores: AptDomainScore[];
  top_domains: AptDomainScore[];
  strengths: string[];
  improvement_areas: string[];
  archetype?: string;
  cognitive_pattern?: string;
  meta_insight?: string;
}

export type AlignmentType = 
  | 'ALIGNED_STRONG'
  | 'ABILITY_HIGH_INTEREST_LOW'
  | 'INTEREST_HIGH_ABILITY_LOW'
  | 'LOW_ALIGNMENT'
  | 'PARTIAL_ALIGNMENT';

export interface AlignmentResult {
  domain: string;
  alignment_type: AlignmentType;
  aptitude_fit: string;
  psychometric_fit: string;
  message: string;
  implication: string;
}

export interface AlignmentEngineOutput {
  summary: string;
  guidance: string;
  alignments: AlignmentResult[];
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export interface PsychometricReport {
  candidate_info: Record<string, string>;
  career_orientation_summary: string;
  work_style_profile: Array<{ construct: string; band: PsychBand; normalized: number }>;
  interest_profile: Record<string, number>;
  top_career_domains: PsychDomainScore[];
  work_environment_fit: string;
  development_suggestions: string[];
  reliability_flag: 'OK' | 'LOW';
  confidence_level: ConfidenceLevel;
  primary_gap_insight: string | null;
  contradiction_note: string | null;
  holland_code: string;
  holland_description: string;
  midpoint_bias: boolean;
}

export interface AptitudeReport {
  candidate_info: Record<string, string>;
  aptitude_summary: string;
  primary_aptitude_insight: string | null;
  ability_scores: Array<{ construct: string; band: AptBand; normalized: number; interpretation: string; correct: number; total: number }>;
  strengths: Array<{ construct: string; explanation: string }>;
  improvement_areas: Array<{ construct: string; suggestion: string }>;
  aptitude_aligned_domains: AptDomainScore[];
  development_plan: {
    short_term: string;
    mid_term: string;
    long_term: string;
  };
  learning_strategy: string;
  reliability_flag: 'OK' | 'LOW' | null;
  confidence_level: ConfidenceLevel | null;
  archetype?: string;
  cognitive_pattern?: string;
  meta_insight?: string;
  decision_framework?: AptDecision[];
}

export interface FullScoringOutput {
  candidate: Record<string, string>;
  psychometric: PsychometricResult;
  aptitude: AptitudeResult;
  gap_analysis: GapEntry[];
  reports: {
    psychometric_report: PsychometricReport;
    aptitude_report: AptitudeReport;
  };
}
