// ─── Domain Mapping ────────────────────────────────────────────────────────────
//
// domain_score = Σ (construct_score × weight)
//
// Implemented as weighted sum, then normalized to 0–100.
// Both psychometric and aptitude use the same 6 career domains.

import { PsychConstructScore, PsychDomainScore, AptConstructScore, AptDomainScore, Cohort, AptDecision, AptGapSeverity } from './types';

// ─── Career Domain Definitions ────────────────────────────────────────────────

interface DomainDefinition {
  domain: string;
  psychWeights: Partial<Record<string, number>>;
  aptWeights: Partial<Record<string, number>>;
  aptRequirements?: Partial<Record<string, number>>;
  explanation: string;
}

const DOMAINS: DomainDefinition[] = [
  {
    domain: 'Engineering & Technology',
    psychWeights: {
      analytical_curiosity: 0.30,
      practical_orientation: 0.25,
      persistence_discipline: 0.20,
      investigative: 0.15,
      realistic: 0.10,
    },
    aptWeights: {
      logical_reasoning: 0.35,
      numerical_reasoning: 0.30,
      analytical_reasoning: 0.35,
    },
    aptRequirements: {
      logical_reasoning: 70,
      analytical_reasoning: 70,
      numerical_reasoning: 65,
    },
    explanation: 'high scores in analytical curiosity, practical orientation, and investigative interests, indicating preference for technical problem-solving',
  },
  {
    domain: 'Data Science & Analytics',
    psychWeights: {
      analytical_curiosity: 0.35,
      investigative: 0.30,
      persistence_discipline: 0.20,
      structure_preference: 0.15,
    },
    aptWeights: {
      analytical_reasoning: 0.40,
      numerical_reasoning: 0.30,
      logical_reasoning: 0.30,
    },
    aptRequirements: {
      analytical_reasoning: 70,
      numerical_reasoning: 65,
      logical_reasoning: 65,
    },
    explanation: 'strong analytical curiosity and investigative interest, supported by structured and detail-focused working style',
  },
  {
    domain: 'Design & Creative',
    psychWeights: {
      creativity_innovation: 0.40,
      artistic: 0.30,
      risk_exploration: 0.20,
      social_orientation: 0.10,
    },
    aptWeights: {
      spatial_visual_reasoning: 0.50,
      logical_reasoning: 0.30,
      analytical_reasoning: 0.20,
    },
    aptRequirements: {
      spatial_visual_reasoning: 65,
    },
    explanation: 'high creativity and innovation preference along with strong artistic interest',
  },
  {
    domain: 'Business & Management',
    psychWeights: {
      leadership_initiative: 0.30,
      enterprising: 0.30,
      social_orientation: 0.20,
      risk_exploration: 0.20,
    },
    aptWeights: {
      logical_reasoning: 0.30,
      analytical_reasoning: 0.30,
      numerical_reasoning: 0.20,
      spatial_visual_reasoning: 0.20,
    },
    aptRequirements: {
      logical_reasoning: 60,
      analytical_reasoning: 60,
    },
    explanation: 'leadership initiative, enterprising interest, and risk tolerance aligned with business environments',
  },
  {
    domain: 'Social & Helping Professions',
    psychWeights: {
      social_orientation: 0.35,
      social: 0.35,
      persistence_discipline: 0.20,
      conventional: 0.10,
    },
    aptWeights: {
      analytical_reasoning: 0.40,
      logical_reasoning: 0.35,
      numerical_reasoning: 0.25,
    },
    aptRequirements: {
      analytical_reasoning: 55,
      logical_reasoning: 55,
    },
    explanation: 'strong social orientation and helping-oriented interests indicating preference for human-centered work',
  },
  {
    domain: 'Operations & Administration',
    psychWeights: {
      structure_preference: 0.35,
      conventional: 0.30,
      persistence_discipline: 0.25,
      practical_orientation: 0.10,
    },
    aptWeights: {
      numerical_reasoning: 0.40,
      analytical_reasoning: 0.35,
      logical_reasoning: 0.25,
    },
    aptRequirements: {
      numerical_reasoning: 60,
      analytical_reasoning: 60,
    },
    explanation: 'high structure preference and conventional interest indicating alignment with organized, system-driven roles',
  },
];

// ─── Fit Label ────────────────────────────────────────────────────────────────

function getFitLabel(score: number): 'Strong Fit' | 'Good Fit' | 'Moderate Fit' | 'Low Fit' {
  if (score >= 75) return 'Strong Fit';
  if (score >= 60) return 'Good Fit';
  if (score >= 50) return 'Moderate Fit';
  return 'Low Fit';
}

// ─── Core Skill Matrix ────────────────────────────────────────────────────────

const CORE_SKILLS: Record<string, string[]> = {
  "Engineering & Technology": ["analytical_curiosity", "investigative"],
  "Business & Management": ["enterprising", "leadership_initiative"],
  "Design & Creative": ["artistic", "creativity_innovation"]
};

// ─── Cohort Penalty Multipliers ───────────────────────────────────────────────

const COHORT_PENALTY_MULTIPLIER: Record<Cohort, number> = {
  grade_8_10: 0.6,    // Lenient — developing baseline
  grade_11_12: 1.0,   // Standard
  professional: 1.2,  // Strict — professional-level expectations
};

function calculateDomainScore(
  domain: string,
  scores: Record<string, { normalized: number }>,
  weights: Partial<Record<string, number>>,
  applyPenalty: boolean = false,
  cohort: Cohort = 'grade_11_12'
): number {
  let total = 0;
  let weightSum = 0;

  for (const [construct, weight] of Object.entries(weights)) {
    if (!weight) continue;
    const score = scores[construct]?.normalized || 0;
    total += score * weight;
    weightSum += weight;
  }

  if (weightSum === 0) return 0;
  let score = Math.round(total / weightSum);

  // Clamp
  score = Math.max(0, Math.min(100, score));

  if (applyPenalty) {
    // 🚨 SCALED CORE SKILL PENALTY — proportional to how far below 40 the skill is
    const coreSkills = CORE_SKILLS[domain] || [];
    const multiplier = COHORT_PENALTY_MULTIPLIER[cohort];

    coreSkills.forEach(skill => {
      const constructScore = scores[skill]?.normalized || 0;
      if (constructScore < 40) {
        const penalty = (40 - constructScore) * 0.6 * multiplier;
        score -= penalty;
      }
    });
  }

  return Math.max(0, Math.round(score));
}

// ─── Domain Key Constructs ────────────────────────────────────────────────────

const DOMAIN_KEY_CONSTRUCTS: Record<string, string[]> = {
  "Engineering & Technology": ["analytical_curiosity", "investigative"],
  "Business & Management": ["leadership_initiative", "enterprising"],
  "Design & Creative": ["creativity_innovation", "artistic"],
  "Data Science & Analytics": ["analytical_curiosity", "persistence_discipline"]
};

// Domain-specific sentence 2: why those traits matter for that field
const DOMAIN_WHY: Record<string, string> = {
  "Engineering & Technology":
    "In Engineering and Technology, these traits directly support the systematic curiosity and problem-decomposition mindset required for design, debugging, and applied research.",
  "Business & Management":
    "In Business and Management, leadership drive and enterprising orientation are foundational — roles in this domain require influencing others, taking initiative, and navigating uncertainty.",
  "Design & Creative":
    "In Design and Creative, originality and artistic engagement are the core currency — environments here reward those who find conventional approaches limiting and seek their own expression.",
  "Data Science & Analytics":
    "In Data Science and Analytics, sustained analytical curiosity and persistence are the primary career enablers — the work demands comfort with complexity, ambiguity, and long-cycle inquiry."
};

function explainDomain(
  domain: string,
  score: number,
  constructScores: Record<string, { normalized: number }>
): string {
  const keyConstructs = DOMAIN_KEY_CONSTRUCTS[domain] || [];

  // Build score-citing sentence 1
  const scoreRefs = keyConstructs
    .map(c => {
      const s = constructScores[c]?.normalized;
      if (s === undefined) return null;
      const label = c.replace(/_/g, ' ');
      return `${label} scored ${s}`;
    })
    .filter(Boolean) as string[];

  const sentence1 = scoreRefs.length > 0
    ? `${scoreRefs.join(' and ')}, ${score >= 65 ? 'both within the productive range for this domain' : score >= 50 ? 'indicating some alignment with this domain' : 'indicating limited current alignment with this domain'}.`
    : `The domain score of ${score} reflects the overall profile pattern.`;

  const sentence2 = DOMAIN_WHY[domain] ?? `This domain requires a combination of the constructs measured, and the candidate's profile shows ${score >= 65 ? 'meaningful' : score >= 50 ? 'moderate' : 'limited'} alignment.`;

  return `${sentence1} ${sentence2}`;
}

// ─── Contradiction Detection ──────────────────────────────────────────────────

export function detectContradictions(
  scores: Record<string, { normalized: number }>
): string | null {
  const c = (k: string) => scores[k]?.normalized ?? 0;

  if (c('creativity_innovation') >= 65 && c('structure_preference') >= 65) {
    return "There is an interesting combination of high structure preference and high creativity — this person may work best in environments that are organised but leave room for original thinking, such as product design, architecture, or research-led innovation. Worth exploring in your session.";
  }

  if (c('leadership_initiative') >= 65 && c('practical_orientation') >= 65) {
    return "There is a notable combination of strong leadership orientation and hands-on practical preference — this person may be drawn to roles where they directly own and execute, such as project management, applied engineering leadership, or operations leadership.";
  }

  if (c('risk_exploration') >= 65 && c('persistence_discipline') >= 65) {
    return "There is a rare blend of risk appetite and persistent follow-through — this person is comfortable exploring new directions and disciplined enough to see them through. Entrepreneurial and research-driven environments tend to suit this profile well.";
  }

  if (c('social_orientation') >= 65 && c('analytical_curiosity') >= 65) {
    return "There is an interesting combination of high social orientation and strong analytical curiosity — this person is drawn to both people and ideas. Roles bridging the two, such as organisational psychology, research in social domains, or science communication, may be worth discussing.";
  }

  return null;
}

// ─── Public: Psychometric Domain Scoring ─────────────────────────────────────

export function computePsychDomains(
  constructScores: Record<string, PsychConstructScore>,
  cohort: Cohort = 'grade_11_12'
): PsychDomainScore[] {
  const ALLOWED_PSYCH_DOMAINS = [
    "Engineering & Technology",
    "Data Science & Analytics",
    "Business & Management",
    "Design & Creative"
  ];

  return DOMAINS
    .filter(def => ALLOWED_PSYCH_DOMAINS.includes(def.domain))
    .map(def => {
      const score = calculateDomainScore(def.domain, constructScores, def.psychWeights, true, cohort);
      return {
        domain: def.domain,
        score,
        fit: getFitLabel(score),
        explanation: explainDomain(def.domain, score, constructScores),
      };
    })
    .sort((a, b) => b.score - a.score);
}

// ─── System 3: Alignment Engine Hook ──────────────────────────────────────────

export function compareAptitudePsychometric(
  aptDomains: AptDomainScore[],
  psychDomains: PsychDomainScore[]
): import('./types').AlignmentEngineOutput {
  
  // 1. Normalize Fit Levels
  const APT_MAP: Record<string, number> = {
    'STRONG_FIT': 3,
    'CONDITIONAL_FIT': 2,
    'RISKY_FIT': 2, // Map risky to conditional equivalent
    'EXPLORATORY_STAGE': 1
  };

  const PSYCH_MAP: Record<string, number> = {
    'Strong Fit': 3,
    'Good Fit': 2,
    'Moderate Fit': 2,
    'Low Fit': 1
  };

  // 2. Priority Selection (Top 2 from each)
  const topApt = aptDomains.slice(0, 2).map(d => d.domain);
  const topPsych = psychDomains.slice(0, 2).map(d => d.domain);
  const unionDomains = Array.from(new Set([...topApt, ...topPsych]));

  // 3. Process Alignments
  const alignments: import('./types').AlignmentResult[] = unionDomains.map(domain => {
    const apt = aptDomains.find(d => d.domain === domain);
    const psych = psychDomains.find(d => d.domain === domain);

    const aptScore = apt ? APT_MAP[apt.decision?.readiness || apt.fit] || 1 : 1;
    const psychScore = psych ? PSYCH_MAP[psych.fit] || 1 : 1;

    let type: import('./types').AlignmentType = 'PARTIAL_ALIGNMENT';
    let message = "This domain shows moderate alignment between your ability and preferences.";
    let implication = "This can be explored further based on exposure and development.";

    if (aptScore >= 2 && psychScore >= 2) {
      type = 'ALIGNED_STRONG';
      message = "This domain shows strong alignment between your ability and natural preferences.";
      implication = "You are both capable of and likely to enjoy working in this area.";
    } else if (aptScore >= 2 && psychScore === 1) {
      type = 'ABILITY_HIGH_INTEREST_LOW';
      message = "You have strong ability in this domain, but it may not align with your natural preferences.";
      implication = "You may perform well, but long-term satisfaction could be lower.";
    } else if (aptScore === 1 && psychScore >= 2) {
      type = 'INTEREST_HIGH_ABILITY_LOW';
      message = "You show strong interest in this domain, but current ability levels may limit performance.";
      implication = "This path is viable with focused skill development.";
    } else if (aptScore === 1 && psychScore === 1) {
      type = 'LOW_ALIGNMENT';
      message = "This domain currently shows low alignment in both ability and preference.";
      implication = "This may not be a strong direction without significant changes.";
    }

    return {
      domain,
      alignment_type: type,
      aptitude_fit: apt ? (apt.decision?.readiness || apt.fit) : 'EXPLORATORY_STAGE',
      psychometric_fit: psych ? psych.fit : 'Low Fit',
      message,
      implication
    };
  });

  // 4. Edge Case Handling
  let summary = "";
  let guidance = "";

  const allAptLow = !aptDomains.some(d => APT_MAP[d.decision?.readiness || d.fit] >= 2);
  const allPsychLow = !psychDomains.some(d => PSYCH_MAP[d.fit] >= 2);
  const allAptHigh = aptDomains.filter(d => APT_MAP[d.decision?.readiness || d.fit] >= 2).length >= 3;
  const allPsychHigh = psychDomains.filter(d => PSYCH_MAP[d.fit] >= 2).length >= 3;

  const overlap = topApt.filter(d => topPsych.includes(d));

  if (allAptLow && allPsychLow) {
    summary = "Your current profile does not show strong alignment in any specific domain.";
    guidance = "Focus on foundational skill development and broader exploration before making decisions.";
  } else if (allAptHigh && allPsychHigh) {
    summary = "You show broad capability and flexibility across multiple domains.";
    guidance = "Decision can be guided more by interest, exposure, and long-term goals.";
  } else if (overlap.length === 0) {
    summary = "Your abilities and preferences currently point toward different directions.";
    guidance = "You may need to choose between what you are good at and what you enjoy, or explore ways to bridge both.";
  } else {
    summary = "Your profile shows clear areas where cognitive ability safely supports your natural preferences.";
    guidance = "Focus on the strongly aligned paths, but remain open to developing abilities in your high-interest areas.";
  }

  return { summary, guidance, alignments };
}

// ─── Layer 3/4/5/6: Aptitude Severe Gap & Decision Engine ──────────────────

function getAptGapAnalysis(
  scores: Record<string, { normalized: number }>,
  requirements?: Partial<Record<string, number>>
): AptGapSeverity[] {
  if (!requirements) return [];
  const gaps: AptGapSeverity[] = [];

  for (const [skill, required] of Object.entries(requirements)) {
    if (required === undefined) continue;
    const actual = scores[skill]?.normalized || 0;
    if (actual < required) {
      const diff = required - actual;
      let severity: 'minor' | 'moderate' | 'critical' = 'minor';
      if (diff > 15) severity = 'critical';
      else if (diff > 5) severity = 'moderate';
      
      gaps.push({ skill, diff, severity });
    }
  }
  return gaps;
}

function resolveAptFit(
  finalScore: number,
  gaps: AptGapSeverity[]
): 'STRONG_FIT' | 'RISKY_FIT' | 'CONDITIONAL_FIT' | 'EXPLORATORY_STAGE' {
  const hasCritical = gaps.some(g => g.severity === 'critical');
  const hasModerate = gaps.some(g => g.severity === 'moderate');

  if (finalScore >= 70 && !hasCritical && !hasModerate) return 'STRONG_FIT';
  if (finalScore >= 70 && hasCritical) return 'RISKY_FIT';
  if (finalScore >= 70 && hasModerate) return 'CONDITIONAL_FIT';
  if (finalScore >= 60) return 'CONDITIONAL_FIT';
  return 'EXPLORATORY_STAGE';
}

function topSkills(scores: Record<string, { normalized: number }>): string[] {
  return Object.entries(scores)
    .sort((a, b) => b[1].normalized - a[1].normalized)
    .slice(0, 2)
    .map(([k]) => k.replace(/_/g, ' '));
}

function domainSpecificFunction(domain: string): string {
  if (domain === 'Engineering & Technology') return 'structured problem-solving and multi-step reasoning tasks';
  if (domain === 'Data Science & Analytics') return 'complex data handling, algorithmic modelling, and statistical interpretation';
  if (domain === 'Business & Management') return 'strategic decision making, operational logic, and quantitative planning';
  if (domain === 'Design & Creative') return 'visual translation, spatial modelling, and structural design synthesis';
  return 'structured analytical assessment and operational tracking';
}

function generateReason(
  domain: string,
  scores: Record<string, { normalized: number }>,
  fit: string,
  requirements?: Partial<Record<string, number>>
): string {
  const reqKeys = Object.keys(requirements || {});
  // Fallback to all skills if no explicit requirements provided
  const relevantSkills = reqKeys.length > 0 ? reqKeys : Object.keys(scores);

  const strong = relevantSkills
    .filter(skill => scores[skill] && scores[skill].normalized >= 60)
    .sort((a, b) => scores[b].normalized - scores[a].normalized)
    .map(k => k.replace(/_/g, ' '))
    .slice(0, 2);

  const missing = relevantSkills
    .filter(skill => scores[skill] && scores[skill].normalized < 60)
    .map(k => k.replace(/_/g, ' '));

  if (fit === "EXPLORATORY_STAGE") {
    const needed = (missing.length ? missing : relevantSkills.map(k => k.replace(/_/g, ' '))).slice(0, 2);
    return `${domain} currently shows low alignment due to insufficient ${needed.join(" and ")} capability required for core task execution.`;
  }

  if (fit === "CONDITIONAL_FIT") {
    const supports = strong.length ? strong.join(" and ") : "foundational ability";
    const limits = missing.length ? missing.slice(0, 2).join(" and ") : "some core skills";
    return `${domain} shows partial alignment supported by ${supports}, but key skills like ${limits} may limit performance.`;
  }

  const enablers = strong.length ? strong.join(" and ") : "foundational capability";
  return `${domain} alignment is supported by strong ${enablers}, enabling effective performance in ${domainSpecificFunction(domain)}.`;
}

function generateAction(gaps: AptGapSeverity[]): string {
  if (!gaps.length) return "Maintain current cognitive skill levels; you exceed required baselines.";
  return gaps.map(g => {
    let rec = "Minor refinement needed (improve speed and consistency)";
    if (g.severity === 'critical') rec = "Immediate structured training required (focus on foundational concepts and guided problem-solving)";
    else if (g.severity === 'moderate') rec = "Focused practice recommended (introduce multi-step reasoning exercises)";
    return `${g.skill.replace(/_/g, ' ')}: ${rec}`;
  }).join("; ");
}

// ─── Public: Aptitude Domain Scoring ─────────────────────────────────────────

export function computeAptDomains(
  constructScores: Record<string, AptConstructScore>
): AptDomainScore[] {
  const ALLOWED_APTITUDE_DOMAINS = [
    "Engineering & Technology",
    "Data Science & Analytics",
    "Business & Management",
    "Design & Creative"
  ];
  
  const DOMAIN_TO_ROLES: Record<string, string[]> = {
    "Data Science & Analytics": [
      "Data Analyst",
      "Business Analyst",
      "AI Engineer",
      "Finance Analyst"
    ],
    "Business & Management": [
      "Marketing & Sales",
      "Financial Operations",
      "Core Operations",
      "Entrepreneurship & Consulting"
    ],
    "Engineering & Technology": [
      "Software Engineer",
      "Mechanical Engineer",
      "Electronics & Systems",
      "Robotics"
    ],
    "Design & Creative": [
      "UI/UX Design",
      "Graphic Design",
      "Animation",
      "Architecture"
    ]
  };

  const results = DOMAINS.filter(def => ALLOWED_APTITUDE_DOMAINS.includes(def.domain)).map(def => {
    const rawDomainScore = calculateDomainScore(def.domain, constructScores, def.aptWeights, false);
    
    // Layer 5: Gap Severity
    const gaps = getAptGapAnalysis(constructScores, def.aptRequirements);
    
    // Severity-weighted penalty
    const penalty = gaps.reduce((sum, g) => {
      if (g.severity === 'minor') return sum + 2;
      if (g.severity === 'moderate') return sum + 5;
      return sum + 10;
    }, 0);
    
    const finalScore = Math.max(0, rawDomainScore - penalty);

    // Layer 6: Conflict Resolution
    const fit = resolveAptFit(finalScore, gaps);

    // Layer 7: Decision Engines
    const decision: AptDecision = {
      domain: def.domain,
      readiness: fit,
      score: finalScore,
      reason: generateReason(def.domain, constructScores, fit, def.aptRequirements),
      risk: gaps.length ? gaps.map(g => `${g.skill.replace(/_/g, ' ')} (${g.severity})`).join(', ') : 'No critical gaps',
      action: generateAction(gaps),
      relatedRoles: DOMAIN_TO_ROLES[def.domain] || []
    };

    return {
      domain: def.domain,
      score: finalScore,
      fit,
      explanation: explainDomain(def.domain, finalScore, {}), // kept for backwards compat
      gaps,
      decision,
      relatedRoles: DOMAIN_TO_ROLES[def.domain] || []
    };
  });

  // Strict sorting by penalized score, keeping all results mapped.
  return results.sort((a, b) => (b.decision?.score || 0) - (a.decision?.score || 0));
}
