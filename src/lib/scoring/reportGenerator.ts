// ─── Report Generator ─────────────────────────────────────────────────────────
//
// Generates TWO fully separate structured reports:
//   1. Psychometric Report
//   2. Aptitude Report
//
// Tone rules (spec-exact):
//   - NO absolute statements
//   - NO "perfect career"
//   - Use: "aligned with", "shows preference toward", "indicates tendency"

import {
  PsychometricResult,
  AptitudeResult,
  PsychometricReport,
  AptitudeReport,
  PsychBand,
  AptBand,
  ConfidenceLevel,
  GapEntry,
  AptDecision,
} from './types';
import { detectContradictions } from './domainMapping';

// ─── Construct Label Formatting ───────────────────────────────────────────────

function label(construct: string): string {
  return construct.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Work Environment Inference ───────────────────────────────────────────────

function inferWorkEnvironment(result: PsychometricResult): string {
  const structureScore = result.construct_scores['structure_preference']?.normalized ?? 50;
  const socialScore = result.construct_scores['social_orientation']?.normalized ?? 50;
  const creativityScore = result.construct_scores['creativity_innovation']?.normalized ?? 50;

  const struct = structureScore >= 65 ? "highly structured, systematic environments" 
                 : (creativityScore >= 65 ? "flexible environments with high creative autonomy" : "moderately structured environments with flexibility for independent work");
                 
  const team = socialScore >= 65 ? "thrives in highly collaborative, people-driven settings"
               : (socialScore <= 35 ? "prefers independent tasks and deep-focus analytical work over constant team interaction" : "is comfortable in small collaborative settings but does not require highly people-driven roles");

  return `Prefers ${struct}. The candidate ${team}.`;
}

// ─── Development Suggestions (from low constructs) ────────────────────────────

const DEVELOPMENT_TEXT: Record<string, string> = {
  social_orientation:
    'Seeking group activities, collaborative tasks, or community involvement can help build social engagement.',
  structure_preference:
    'Building routines and using planning tools may strengthen comfort with organized workflows.',
  creativity_innovation:
    'Exploring creative hobbies, design thinking exercises, or open-ended problem-solving can nurture originality.',
  analytical_curiosity:
    'Reading about systems, science, or asking "why" regularly can sharpen investigative tendencies.',
  leadership_initiative:
    'Taking small leadership roles in familiar settings can build confidence in initiating and directing.',
  practical_orientation:
    'Hands-on projects or applied skill-building activities can develop practical engagement.',
  risk_exploration:
    'Gradually taking on low-stakes new challenges can build comfort with uncertainty.',
  persistence_discipline:
    'Setting small daily goals and tracking completion can develop follow-through habits.',
};

function getDevelopmentSuggestions(result: PsychometricResult): string[] {
  const workStyleConstructs = [
    'social_orientation', 'structure_preference', 'creativity_innovation',
    'analytical_curiosity', 'leadership_initiative', 'practical_orientation',
    'risk_exploration', 'persistence_discipline',
  ];

  return workStyleConstructs
    .filter(c => (result.construct_scores[c]?.normalized ?? 100) < 40)
    .map(c => DEVELOPMENT_TEXT[c])
    .filter(Boolean);
}

// RIASEC summary phrases for narrative paragraph 1
const RIASEC_SUMMARY: Record<string, string> = {
  realistic:      'a preference for hands-on, practical work involving tools, systems, and physical environments',
  investigative:  'strong interest in analysis, research, and understanding how things work at a deeper level',
  artistic:       'a clear orientation toward creative expression, originality, and non-routine thinking',
  social:         'a people-centred orientation, with clear interest in helping, supporting, and engaging with others',
  enterprising:   'a tendency toward leadership, influence, and building or driving outcomes through others',
  conventional:   'a preference for structured, organised work with clear systems, rules, and expectations',
};

function buildPsychSummary(
  result: PsychometricResult,
  candidateName: string,
  primaryGap: string | null
): string {
  const s = result.construct_scores;
  const n = (k: string) => s[k]?.normalized ?? 0;
  const name = candidateName && candidateName !== 'Candidate Profile' ? candidateName : 'This candidate';

  // Paragraph 1: RIASEC top orientation with actual scores
  const riasecKeys = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
  const topRiasec = riasecKeys
    .filter(k => s[k])
    .sort((a, b) => n(b) - n(a))
    .slice(0, 2);

  let para1: string;
  if (topRiasec.length >= 2) {
    const r1 = topRiasec[0]; const r2 = topRiasec[1];
    para1 = `${name}'s career interest profile is led by ${label(r1)} (${n(r1)}%) and ${label(r2)} (${n(r2)}%), `
      + `suggesting ${RIASEC_SUMMARY[r1] ?? r1.replace(/_/g,' ')} `
      + `alongside ${RIASEC_SUMMARY[r2] ?? r2.replace(/_/g,' ')}. `
      + `This combination is consistent with career environments that value `
      + (r1 === 'investigative' || r2 === 'investigative' ? 'applied problem-solving, research, and analytical depth.' :
         r1 === 'artistic' ? 'originality, expression, and creative latitude.' :
         r1 === 'social' ? 'human-centred work, mentoring, and collaborative support roles.' :
         r1 === 'enterprising' ? 'leadership, persuasion, and building outcomes through others.' :
         'structured analysis and organised execution.');
  } else {
    para1 = `${name}'s career interest profile does not show a strong directional preference in any single RIASEC dimension, suggesting a broadly exploratory phase that warrants further discussion in the counselling session.`;
  }

  // Paragraph 2: top 2 work-style traits with scores
  const workStyleKeys = ['social_orientation','structure_preference','creativity_innovation','analytical_curiosity','leadership_initiative','practical_orientation','risk_exploration','persistence_discipline'];
  const topWS = workStyleKeys
    .filter(k => s[k])
    .sort((a, b) => n(b) - n(a))
    .slice(0, 2);

  let para2: string;
  if (topWS.length >= 2) {
    const w1 = topWS[0]; const w2 = topWS[1];
    const w1Phrase =
      w1 === 'analytical_curiosity' ? 'investigating systems and asking deeper questions' :
      w1 === 'leadership_initiative' ? 'stepping forward and directing outcomes' :
      w1 === 'creativity_innovation' ? 'generating original ideas and non-routine approaches' :
      w1 === 'structure_preference' ? 'organised, planned, and process-driven work' :
      w1 === 'social_orientation' ? 'collaborative and communicative environments' :
      w1 === 'practical_orientation' ? 'concrete, applied, and hands-on tasks' :
      w1 === 'risk_exploration' ? 'trying new approaches and tolerating uncertainty' :
      'sustained effort and follow-through';
    const w2Phrase =
      w2 === 'persistence_discipline' ? 'strong follow-through and consistency' :
      w2 === 'social_orientation' ? 'engagement with people and collaborative dynamics' :
      w2 === 'structure_preference' ? 'preference for clear expectations and defined processes' :
      label(w2).toLowerCase();
    para2 = `In terms of work style, ${name} shows the strongest tendencies toward ${label(w1)} (${n(w1)}%) and ${label(w2)} (${n(w2)}%). `
      + `This suggests a working approach that favours ${w1Phrase} alongside ${w2Phrase}.`;
  } else {
    para2 = `${name}'s work-style profile does not show a dominant pattern, indicating a balanced or still-forming set of working preferences.`;
  }

  // Paragraph 3: synthesis with gap and reliability note
  const topDomainName = result.top_domains[0]?.domain ?? 'the most aligned career domain';
  let para3 = `Taken together, this profile suggests ${name} may thrive in roles that align with ${topDomainName}. `
    + (primaryGap ? primaryGap + ' ' : '')
    + (result.reliability_flag === 'LOW' ? 'Note: response consistency was flagged as low — results should be discussed directly with the candidate before drawing firm conclusions.' : '');

  return [para1, para2, para3].join('\n\n');
}

// ─── Aptitude Summary ─────────────────────────────────────────────────────────

const APT_STRENGTH_EXPLANATIONS: Record<string, string> = {
  logical_reasoning: 'strong pattern recognition and rule-based abstract reasoning',
  analytical_reasoning: 'structured multi-step interpretation and conditional logic ability',
  numerical_reasoning: 'applied quantitative reasoning and practical number handling',
  spatial_visual_reasoning: 'mental transformation and visual-structural reasoning',
};

const APT_IMPROVEMENT_TEXT: Record<string, string> = {
  logical_reasoning:
    'Practice number/letter series, coding-decoding, and abstract pattern puzzles regularly.',
  analytical_reasoning:
    'Work on data interpretation, arrangement puzzles, and conditional logic exercises.',
  numerical_reasoning:
    'Strengthen mental math with percentages, ratios, and speed/time/work problems.',
  spatial_visual_reasoning:
    'Practice mirror images, rotation puzzles, and cube/net-based reasoning problems.',
};

function buildAptSummary(result: AptitudeResult, candidateName?: string): string {
  const name = candidateName && candidateName !== 'Candidate Profile' ? candidateName : 'The candidate';
  const entries = Object.entries(result.construct_scores)
    .sort(([, a], [, b]) => b.normalized - a.normalized);
  const strongest = entries[0];
  const weakest = entries[entries.length - 1];
  const topDomain = result.top_domains[0];

  // Paragraph 1: overall cognitive picture with specific scores
  let para1: string;
  if (strongest && weakest && strongest[0] !== weakest[0]) {
    para1 = `${name}'s cognitive profile shows the clearest strength in ${label(strongest[0])} (${strongest[1].normalized}%), `
      + `indicating ${APT_STRENGTH_EXPLANATIONS[strongest[0]] ?? 'well-developed reasoning in this area'}. `
      + `The relative weaker area is ${label(weakest[0])} (${weakest[1].normalized}%), `
      + `which scores in the ${weakest[1].band.toLowerCase()} range and represents the primary opportunity for focused practice.`;
  } else if (strongest) {
    para1 = `${name}'s cognitive profile shows strongest performance in ${label(strongest[0])} (${strongest[1].normalized}%), `
      + `indicating ${APT_STRENGTH_EXPLANATIONS[strongest[0]] ?? 'well-developed reasoning in this area'}.`;
  } else {
    para1 = `${name}'s cognitive profile has been assessed across four reasoning dimensions. No single area shows strong dominance at this stage.`;
  }

  // Paragraph 2: career readiness for top domain
  let para2: string;
  if (topDomain) {
    const tier = topDomain.score >= 65 ? 'strong' : topDomain.score >= 50 ? 'moderate' : 'developing';
    para2 = `Based on the overall cognitive profile, ${name}'s abilities show ${tier} alignment toward ${topDomain.domain}. `
      + `This reflects the pattern of reasoning strengths most relevant to that domain's typical demands. `
      + (topDomain.score < 50 ? 'Continued cognitive development, particularly in the weaker constructs, would meaningfully improve this alignment.' :
         'This provides a reasonable foundation for exploring career paths within this field.');
  } else {
    para2 = `No single career domain shows strong alignment based on cognitive scores alone. Focused development across the weaker constructs is recommended before career specialisation.`;
  }

  return [para1, para2].join('\n\n');
}

// ─── Dynamic Development Plan ─────────────────────────────────────────────────
// Construct-specific, max 2 bullets per phase, max 2 lines each.
// Only as specific as the data supports.

const CONSTRUCT_DEV_PLANS: Record<string, { short_term: string; mid_term: string; long_term: string }> = {
  logical_reasoning: {
    short_term:
      '• Practice letter/number series and coding-decoding puzzles (10–15 min/day).\n'
      + '• Use free apps like Lumosity or puzzle books focused on abstract patterns.',
    mid_term:
      '• Attempt IQ-style reasoning sets under timed conditions (20 min/session, twice a week).\n'
      + '• Review all mistakes by tracing the underlying rule — not just the answer.',
    long_term:
      '• Engage with real-world logic applications: programming basics, chess, or strategic games.\n'
      + '• Track improvement monthly — measurable consistency matters more than intensity.',
  },
  numerical_reasoning: {
    short_term:
      '• Revise percentage, ratio, and proportion problems from class 8–10 level upward.\n'
      + '• Practice 5–10 mental math calculations daily without a calculator.',
    mid_term:
      '• Work through timed numerical sets (data tables, speed/distance/time problems).\n'
      + '• Attempt one unfamiliar problem type per week to broaden exposure.',
    long_term:
      '• Apply numerical thinking to real contexts: budgeting, reading data reports, or statistics basics.\n'
      + '• Consistent practice over 6+ months meaningfully improves this construct.',
  },
  analytical_reasoning: {
    short_term:
      '• Practice arrangement and seating puzzles, blood-relation, and directional-sense problems.\n'
      + '• Start with guided solutions — understand the method before attempting independently.',
    mid_term:
      '• Attempt data interpretation sets (bar charts, line graphs) under time pressure.\n'
      + '• Work through conditional logic exercises: if-then, syllogism problems.',
    long_term:
      '• Transfer analytical skills into real decisions — comparing options systematically.\n'
      + '• Structured reading (case studies, articles with arguments) builds this naturally.',
  },
  spatial_visual_reasoning: {
    short_term:
      '• Practice mirror images, rotation puzzles, and paper-folding/cut-out problems daily.\n'
      + '• Use free tools like Tangram apps or cube-net identification exercises.',
    mid_term:
      '• Attempt architectural/engineering drawing sketches, even basic 2D floor plans.\n'
      + '• Try free 3D modelling tools (Tinkercad) to build spatial intuition.',
    long_term:
      '• Engage with fields that use spatial thinking naturally: design, maps, technical drawings.\n'
      + '• This construct responds well to consistent visual–physical practice over time.',
  },
};

const GENERIC_DEV_PLAN = {
  short_term:
    '• Begin with foundational reasoning exercises across logical and numerical domains (10 min/day).\n'
    + '• Identify the one area that feels most unfamiliar and start there.',
  mid_term:
    '• Introduce timed practice sets twice a week to build both accuracy and speed.\n'
    + '• Review errors methodically — the reasoning process matters more than the answer.',
  long_term:
    '• Apply cognitive skills in real contexts: analysing data, making structured decisions.\n'
    + '• Track progress at monthly intervals; consistency is the primary driver of improvement.',
};

function getDynamicDevelopmentPlan(
  result: AptitudeResult
): { short_term: string; mid_term: string; long_term: string } {
  const weakest = result.improvement_areas[0];
  // improvement_areas stores the raw construct key (e.g. 'logical_reasoning')
  // but label() was applied — convert back
  const rawKey = weakest
    ? Object.keys(result.construct_scores).find(
        k => k.toLowerCase().replace(/ /g, '_') === weakest.toLowerCase().replace(/ /g, '_')
          || weakest.toLowerCase().replace(/ /g, '_') === k
      )
    : undefined;

  if (rawKey && CONSTRUCT_DEV_PLANS[rawKey]) return CONSTRUCT_DEV_PLANS[rawKey];

  // Try matching via improvement_areas construct labels
  const labelToKey: Record<string, string> = {
    'Logical Reasoning': 'logical_reasoning',
    'Numerical Reasoning': 'numerical_reasoning',
    'Analytical Reasoning': 'analytical_reasoning',
    'Spatial Visual Reasoning': 'spatial_visual_reasoning',
  };
  const mappedKey = weakest ? labelToKey[weakest] : undefined;
  if (mappedKey && CONSTRUCT_DEV_PLANS[mappedKey]) return CONSTRUCT_DEV_PLANS[mappedKey];

  return GENERIC_DEV_PLAN;
}

// ─── Confidence Score (with Response Pattern Check) ──────────────────────────

function calculateVariance(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
}

function getConfidence(
  reliability: 'OK' | 'LOW',
  scores: Record<string, { normalized: number }>,
  rawAnswers: number[] = [],
  midpointBias: boolean = false
): ConfidenceLevel {
  if (reliability === 'LOW') return 'Low';
  if (midpointBias) return 'Moderate';

  // FIX 3: Detect straight-lining / lazy answering via unique response count
  if (rawAnswers.length > 0) {
    const uniqueAnswers = new Set(rawAnswers).size;
    if (uniqueAnswers <= 2) return 'Low';
  }

  const values = Object.values(scores).map(s => s.normalized);
  const variance = calculateVariance(values);

  if (variance < 5) return 'Low';      // Extreme flat scores
  if (variance < 10) return 'Moderate';
  return 'High';
}

// ─── Primary Gap Insight ────────────────────────────────────────────────────

function getPsychometricInsight(result: PsychometricResult): string | null {
  const sorted = Object.values(result.construct_scores)
    .filter(s => s.construct !== 'attention_check')
    .sort((a, b) => b.normalized - a.normalized);
    
  if (sorted.length < 2) return null;
  
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  
  if (top.normalized >= 65 && bottom.normalized <= 45) {
     return `Strength Bias: Profile shows strong ${label(top.construct).toLowerCase()} with lower emphasis on ${label(bottom.construct).toLowerCase()}.`;
  }
  
  if (bottom.normalized < 40) {
    return `Potential Limitation: Low ${label(bottom.construct).toLowerCase()} may reduce preference for roles heavily reliant on this function.`;
  }
  
  return null;
}

// ─── Holland Code ─────────────────────────────────────────────────────────────
// Derives the 2-letter RIASEC Holland Code from top 2 RIASEC scores.
// Descriptions are the standard career guidance definitions.

const RIASEC_LABELS: Record<string, string> = {
  realistic:     'Realistic',
  investigative: 'Investigative',
  artistic:      'Artistic',
  social:        'Social',
  enterprising:  'Enterprising',
  conventional:  'Conventional',
};

const RIASEC_SHORT: Record<string, string> = {
  realistic:     'R',
  investigative: 'I',
  artistic:      'A',
  social:        'S',
  enterprising:  'E',
  conventional:  'C',
};

const HOLLAND_DESCRIPTIONS: Record<string, string> = {
  RI: 'Suggests a preference for technically demanding, hands-on problem-solving with a scientific or mechanical dimension.',
  RA: 'Indicates interest in creating or building things with both practical and aesthetic consideration.',
  RS: 'Reflects a practical, grounded nature with genuine interest in helping others in concrete ways.',
  RE: 'Points toward hands-on leadership — managing projects, teams, or technical operations.',
  RC: 'Suggests comfort in structured, practical environments requiring attention to detail.',
  IR: 'Combines analytical depth with hands-on application — well-suited for applied sciences and engineering.',
  IA: 'Reflects strong intellectual curiosity with creative expression — research, writing, or design fields.',
  IS: 'Indicates analytical thinking applied to people-focused domains — counselling, medicine, psychology.',
  IE: 'Suggests analytical problem-solving combined with leadership or business-oriented ambition.',
  IC: 'Reflects a methodical, research-oriented mindset comfortable with data, systems, and precision.',
  AI: 'Combines creativity with intellectual curiosity — architecture, design research, or content creation.',
  AR: 'Practical creativity — building, crafting, or applied design work.',
  AS: 'Creative with strong people orientation — performing arts, teaching arts, or community-centred creative roles.',
  AE: 'Entrepreneurial creativity — marketing, media, or creative business leadership.',
  AC: 'Structured creativity — editorial work, graphic standards, or design within defined systems.',
  SI: 'People-first with analytical depth — well-suited to counselling, healthcare, or social research.',
  SR: 'Helping orientation with practical grounding — nursing, therapy, or applied social services.',
  SA: 'Expressive and people-centred — teaching, performing, or community arts.',
  SE: 'Social leadership — well-suited for management in education, HR, or non-profits.',
  SC: 'Supportive and organised — administration, coordination, or community services.',
  EI: 'Business-minded with analytical depth — finance, strategy, or management consulting.',
  ER: 'Entrepreneurial and practical — operations, logistics, or technical business management.',
  EA: 'Creative leadership — media, advertising, or entrepreneurial ventures.',
  ES: 'Leadership with people focus — management, sales, HR, or public service.',
  EC: 'Structured business leadership — management, administration, or operations.',
  CI: 'Detail-oriented and analytical — accounting, data analysis, or research administration.',
  CR: 'Structured and practical — quality control, technical administration, or skilled trades.',
  CA: 'Organised with creative capacity — editorial, design systems, or communications.',
  CS: 'Supportive and structured — administration, coordination, or public service.',
  CE: 'Organised business support — office management, compliance, or financial administration.',
};

function computeHollandCode(
  constructScores: Record<string, { normalized: number }>
): { code: string; description: string } {
  const riasecKeys = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
  const sorted = riasecKeys
    .filter(k => constructScores[k] !== undefined)
    .sort((a, b) => (constructScores[b]?.normalized ?? 0) - (constructScores[a]?.normalized ?? 0));

  const top2 = sorted.slice(0, 2);
  if (top2.length < 2) {
    const code = top2.map(k => RIASEC_SHORT[k] ?? k[0].toUpperCase()).join('');
    return { code, description: 'Insufficient RIASEC data to generate a full Holland Code description.' };
  }

  const code = top2.map(k => RIASEC_SHORT[k]).join('');
  const description = HOLLAND_DESCRIPTIONS[code]
    ?? HOLLAND_DESCRIPTIONS[top2.map(k => RIASEC_SHORT[k]).reverse().join('')]
    ?? `Reflects dominant interests in ${top2.map(k => RIASEC_LABELS[k]).join(' and ')} domains.`;

  return {
    code: `${code} (${top2.map(k => RIASEC_LABELS[k]).join(' – ')})`,
    description,
  };
}

export function generatePsychometricReport(
  result: PsychometricResult,
  candidateInfo: Record<string, string>,
  gapAnalysis: GapEntry[] = [],
  rawAnswers: number[] = []
): PsychometricReport {
  const riasecConstructs = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
  const interestProfile: Record<string, number> = {};
  for (const c of riasecConstructs) {
    interestProfile[label(c)] = result.construct_scores[c]?.normalized ?? 0;
  }

  const workStyleProfile = Object.entries(result.construct_scores)
    .filter(([c]) => !riasecConstructs.includes(c) && c !== 'attention_check')
    .map(([c, s]) => ({
      construct: label(c),
      band: s.band,
      normalized: s.normalized,
    }))
    .sort((a, b) => b.normalized - a.normalized);

  const primaryGapInsight = getPsychometricInsight(result);
  const contradictionNote = detectContradictions(result.construct_scores);
  const { code: holland_code, description: holland_description } = computeHollandCode(result.construct_scores);

  return {
    candidate_info: candidateInfo,
    career_orientation_summary: buildPsychSummary(result, candidateInfo.name ?? '', primaryGapInsight),
    work_style_profile: workStyleProfile,
    interest_profile: interestProfile,
    top_career_domains: result.top_domains,
    work_environment_fit: inferWorkEnvironment(result),
    development_suggestions: getDevelopmentSuggestions(result),
    reliability_flag: result.reliability_flag,
    confidence_level: getConfidence(result.reliability_flag, result.construct_scores, rawAnswers, result.midpoint_bias),
    primary_gap_insight: primaryGapInsight,
    contradiction_note: contradictionNote,
    holland_code,
    holland_description,
    midpoint_bias: result.midpoint_bias,
  };
}

// ─── Layer 8: Archetype Classification (Strict Priority) ───────────────

function getArchetype(scores: Record<string, { normalized: number }>): string {
  const ana = scores['analytical_reasoning']?.normalized || 0;
  const log = scores['logical_reasoning']?.normalized || 0;
  const num = scores['numerical_reasoning']?.normalized || 0;
  const spa = scores['spatial_visual_reasoning']?.normalized || 0;

  if (ana >= 70 && log >= 70) return "System Thinker";
  
  if (
    Math.abs(log - ana) < 10 &&
    Math.abs(ana - num) < 10 &&
    log >= 60 && ana >= 60 && num >= 60
  ) return "Balanced Reasoner";

  if (num >= 70 && log >= 60 && ana < 65) return "Quantitative Operator";

  if (spa >= 70 && num < 60) return "Visual Processor";

  return "General Cognitive Profile";
}

// ─── Layer 9: Cross-Construct Pattern Engine ───────────────────────────

function getPattern(scores: Record<string, { normalized: number }>): string {
  const ana = scores['analytical_reasoning']?.normalized || 0;
  const log = scores['logical_reasoning']?.normalized || 0;
  const num = scores['numerical_reasoning']?.normalized || 0;
  const spa = scores['spatial_visual_reasoning']?.normalized || 0;

  if (num >= 75 && ana < 65) return "Quantitative strength with structural reasoning limitation.";
  if (log >= 70 && ana >= 70) return "Strong multi-step reasoning capability.";
  if (spa >= 70 && log < 60) return "Visual dominance with lower structured reasoning.";
  return "Balanced cognitive interaction pattern.";
}

// ─── Layer 10: Meta-Behavioral Insight ─────────────────────────────────

function getMetaInsight(scores: Record<string, { normalized: number }>): string {
  const ana = scores['analytical_reasoning']?.normalized || 0;
  const log = scores['logical_reasoning']?.normalized || 0;
  const num = scores['numerical_reasoning']?.normalized || 0;

  if (num >= 75 && log >= 60) return "Performs well in structured, data-driven environments requiring accuracy and consistency.";
  if (ana >= 70 && log >= 70) return "Capable of handling complex, multi-layered problem-solving tasks.";
  
  return "Best suited for environments with moderate structure and guided problem-solving.";
}

const APT_INTERPRETATION_TEXT: Record<string, Record<string, string>> = {
  logical_reasoning: {
    high: 'Performance in logical reasoning is strong, suggesting well-developed capacity for recognising patterns, working through abstract sequences, and identifying rules in novel situations. This is a core capability for fields requiring systematic problem-solving such as engineering, technology, and law.',
    mid:  'Logical reasoning is in an emerging range. The candidate can work through moderately complex patterns but may need more time or structured approaches in highly abstract or multi-step reasoning tasks. Targeted practice can meaningfully improve this construct.',
    low:  'Logical reasoning currently scores in the developing range. This reflects difficulty with complex abstract patterns at this stage — not a fixed ceiling, but an area where foundational practice with sequences, series, and pattern puzzles would directly benefit the candidate\'s cognitive readiness.',
  },
  analytical_reasoning: {
    high: 'Analytical reasoning scores are strong, reflecting the capacity to interpret structured information, work through multi-step conditions, and draw valid inferences. This construct is particularly valuable in research, data analysis, management consulting, and fields requiring structured decision-making.',
    mid:  'Analytical reasoning is at an emerging level. The candidate shows some capacity to interpret data and follow structured logic, but may find complex multi-layered problems challenging. Practice with data sets, conditional logic exercises, and arrangement problems would be beneficial.',
    low:  'Analytical reasoning currently scores in the developing range. Working through structured interpretation tasks with guidance — starting from simple data comparisons and building up — would be the recommended approach before approaching complex career specialisation.',
  },
  numerical_reasoning: {
    high: 'Numerical reasoning performance is strong, indicating fluency with quantitative relationships, speed in mental calculation, and ability to navigate applied number problems. This is a foundational asset for domains involving finance, engineering, data science, and commerce.',
    mid:  'Numerical reasoning is at a developing-to-capable level. Basic arithmetic and proportional reasoning are likely accessible, but multi-step problems or those requiring speed under pressure may be inconsistent. Targeted practice on percentages, ratios, and applied maths will consolidate this.',
    low:  'Numerical reasoning currently scores in the developing range. This suggests difficulty with applied quantitative tasks at this stage. Returning to foundational concepts — fractions, percentages, and basic proportional reasoning — and building upward through regular practice is the advised path.',
  },
  spatial_visual_reasoning: {
    high: 'Spatial and visual reasoning performance is strong, indicating solid capacity for mentally rotating shapes, interpreting structural layouts, and recognising patterns in 2D/3D environments. This construct is particularly relevant for careers in design, architecture, engineering, and any visually-led technical field.',
    mid:  'Spatial reasoning is at an emerging level. The candidate can handle straightforward visual tasks but may find more complex rotations or multi-step structural reasoning challenging. Practice with mirror image, folding, and cube-net problems will help develop this further.',
    low:  'Spatial reasoning currently scores in the developing range. This reflects current difficulty with mentally manipulating shapes and visualising structural transformations. Regular engagement with physical puzzles, tangrams, or 3D modelling tools can build this capacity over time.',
  },
};

function getAptInterpretation(c: string, normalized: number): string {
    const txt = APT_INTERPRETATION_TEXT[c];
    if (!txt) return 'Assessment complete.';
    if (normalized >= 60) return txt.high;
    if (normalized >= 40) return txt.mid;
    return txt.low;
}

export function generateAptitudeReport(
  result: AptitudeResult,
  candidateInfo: Record<string, string>,
  reliability: 'OK' | 'LOW' | null = null,
  confidence: ConfidenceLevel | null = null
): AptitudeReport {
  const abilityScores = Object.entries(result.construct_scores)
    .map(([c, s]) => ({
      construct: label(c),
      band: s.band,
      normalized: s.normalized,
      correct: s.correct,
      total: s.total,
      interpretation: getAptInterpretation(c, s.normalized)
    }))
    .sort((a, b) => b.normalized - a.normalized);

  const averageScore = Object.values(result.construct_scores).reduce((acc, s) => acc + s.normalized, 0) / Math.max(1, Object.keys(result.construct_scores).length);

  let primaryInsight = "Cognitive scores show healthy alignment with expected baselines, allowing for specialization in aligned domains.";
  if (averageScore < 40) {
    primaryInsight = "A key observation is that overall cognitive scores are below the strong threshold, indicating that focused skill development is required before domain specialization.";
  } else if (result.improvement_areas.length > 0) {
    primaryInsight = `A key observation is that while some abilities are strong, ${label(result.improvement_areas[0])} requires focused development to prevent bottlenecks in complex tasks.`;
  }

  const strengths = result.strengths.length > 0 
    ? result.strengths.map(c => ({
        construct: label(c),
        explanation: `This is based on your score in ${label(c)}, which indicates ${APT_STRENGTH_EXPLANATIONS[c] ?? 'strong performance in this area'}.`,
      }))
    : [{ construct: 'None', explanation: 'No strong cognitive dominance observed yet. This suggests a balanced baseline with potential for development.' }];

  const improvementAreas = result.improvement_areas.length > 0
    ? result.improvement_areas.map(c => ({
        construct: label(c),
        suggestion: `${label(c)}: ${APT_IMPROVEMENT_TEXT[c] ?? 'Focus on targeted practice.'}`,
      }))
    : [{ construct: 'None', suggestion: 'No critical cognitive gaps identified. All constructs are above threshold.' }];

  const development_plan = getDynamicDevelopmentPlan(result);

  const avg = Object.values(result.construct_scores).reduce((acc, s) => acc + s.normalized, 0)
    / Math.max(1, Object.keys(result.construct_scores).length);
  const learning_strategy =
    avg >= 65
      ? 'Your cognitive scores show a strong baseline. Focus on deepening speed and accuracy at higher difficulty levels — timed practice under exam-like conditions will consolidate your advantage.'
      : avg >= 40
      ? `Your profile shows an emerging cognitive baseline. Prioritise targeted practice on ${result.improvement_areas[0] ? label(result.improvement_areas[0]) : 'your weaker constructs'} using spaced repetition — short daily sessions outperform infrequent long ones.`
      : `Building a reliable foundational skill base is the priority before domain specialisation. Focus on the most fundamental exercises in ${result.improvement_areas[0] ? label(result.improvement_areas[0]) : 'your weakest area'} and track weekly improvement.`;

  // 10-Layer System Integrations
  const archetype = getArchetype(result.construct_scores);
  const cognitive_pattern = getPattern(result.construct_scores);
  const meta_insight = getMetaInsight(result.construct_scores);
  
  // Extract decisions directly from top_domains array mapped in domainMapping
  const decision_framework = result.top_domains
    .map(d => d.decision)
    .filter(Boolean) as AptDecision[];

  return {
    candidate_info: candidateInfo,
    aptitude_summary: buildAptSummary(result, candidateInfo.name),
    primary_aptitude_insight: primaryInsight,
    ability_scores: abilityScores,
    strengths,
    improvement_areas: improvementAreas,
    aptitude_aligned_domains: result.top_domains,
    development_plan,
    learning_strategy,
    reliability_flag: reliability,
    confidence_level: confidence,
    archetype,
    cognitive_pattern,
    meta_insight,
    decision_framework
  };
}
