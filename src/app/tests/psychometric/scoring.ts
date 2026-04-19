export type TraitScores = Record<string, number>;

export function generatePsychometricReport(normalizedTraits: TraitScores) {
  const mbti = calculateMBTI(normalizedTraits);
  const riasec = calculateRIASEC(normalizedTraits);

  const dominantTraits = Object.entries(normalizedTraits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(t => t[0]);

  return {
    module: 'Psychometric Assessment',
    summary: 'This report evaluates core behavioral traits, working preferences, and psychological profiles to map professional alignment.',
    mbti_profile: mbti,
    riasec_profile: riasec,
    dominant_traits: dominantTraits,
    recommended_environments: getEnvironments(riasec),
    traits_breakdown: normalizedTraits
  };
}

function calculateMBTI(t: TraitScores): string {
  const pick = (a: number, b: number, A: string, B: string) => {
    if (Math.abs(a - b) < 10) return "X"; 
    return a > b ? A : B;
  };
  const type =
    pick(t.introvert || 0, t.extrovert || 0, "I", "E") +
    pick(t.intuitive || 0, t.sensing || 0, "N", "S") +
    pick(t.thinking || 0, t.feeling || 0, "T", "F") +
    pick(t.judging || 0, t.perceiving || 0, "J", "P");

  return type.includes("X") ? "Balanced Personality" : type;
}

function calculateRIASEC(t: TraitScores): string[] {
  return ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional']
    .map(x => [x, t[x] ?? 50] as const)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(x => x[0] as string);
}

function getEnvironments(topRiasec: string[]) {
  const map: Record<string, string> = {
    realistic: 'Hands-on, practical environments (e.g. Engineering, Mechanics, Agriculture)',
    investigative: 'Analytical and research-driven environments (e.g. Labs, Data Centers, Academia)',
    artistic: 'Creative and unstructured environments (e.g. Studios, Design Agencies, Theatre)',
    social: 'Collaborative and supportive environments (e.g. Schools, Hospitals, NGOs)',
    enterprising: 'Competitive, fast-paced business environments (e.g. Corporate, Startups, Sales)',
    conventional: 'Structured, organized, and detail-oriented environments (e.g. Accounting, Admin, Finance)'
  };
  return topRiasec.map(r => map[r]).filter(Boolean);
}
