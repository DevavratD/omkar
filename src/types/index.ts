export type Trait =
  // Psychometric (MBTI)
  | 'introvert' | 'extrovert'
  | 'intuitive' | 'sensing'
  | 'thinking' | 'feeling'
  | 'judging' | 'perceiving'
  // Psychometric (RIASEC)
  | 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional'
  // Motivators
  | 'independence' | 'high_paced' | 'creativity' | 'continuous_learning' | 'structure' | 'adventure' | 'social_service'
  // Learning style
  | 'auditory' | 'visual' | 'kinesthetic' | 'read_write'
  // Aptitude
  | 'numerical' | 'logical' | 'verbal' | 'spatial' | 'mechanical' | 'leadership' | 'social_skill' | 'administrative'
  // Early Education Psychometric
  | 'social_orientation' | 'structure_preference' | 'creativity_innovation' | 'analytical_curiosity' | 'leadership_initiative' | 'persistence_discipline' | 'risk_exploration' | 'practical_orientation' | 'attention_check'
  // Meta markers
  | 'profiling_score' | 'career_choice' | 'parent_choice';

export type QuestionType = 'psychometric' | 'aptitude' | 'meta';

export interface Option {
  id: string;
  text: string;
  value: number; // For math inputs, ranking, or scoring value
  textValue?: string; // For things like matching strings ("Software Engineer")
}

export interface QuestionMapping {
  trait: Trait;
  weight: number;
}

export type Cohort = 'grade_2_4' | 'grade_5_7' | 'grade_8_10' | 'grade_11_12' | 'professional';

export type AptitudeCategory = 'logical' | 'analytical' | 'numerical' | 'spatial' | 'verbal' | 'mechanical' | 'psychological';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  test_id: string;
  question_text: string;
  type: QuestionType;
  options: Option[];
  mappings: QuestionMapping[];
  correct_answer?: string; // option id for aptitude
  image_url?: string | null;
  // ── Extended cohort fields (nullable for backward compat) ──────────────
  cohort?: Cohort | null;
  category?: AptitudeCategory | null;
  difficulty?: Difficulty | null;
}

export interface Test {
  id: string;
  name: string;
}

export interface UserAnswer {
  question_id: string;
  selected_option_id: string;
  time_taken_ms?: number;
}

export interface TestResult {
  id: string;
  test_id: string;
  test_type: 'aptitude' | 'psychometric' | 'combined'; // 'combined' for backwards compat of old results
  answers: UserAnswer[];
  scores: Record<Trait, number>;
  normalized_scores: Record<Trait, number>;
  created_at: string;
  meta_data?: any;
  report?: any;
}
