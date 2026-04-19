import { computePsychDomains } from './src/lib/scoring/domainMapping';
import { generatePsychometricReport } from './src/lib/scoring/reportGenerator';
import { PsychometricResult, PsychConstructScore, PsychBand } from './src/lib/scoring/types';

async function main() {
  const getBand = (score: number): PsychBand => {
    if(score >= 75) return 'Very High';
    if(score >= 55) return 'High';
    if(score >= 40) return 'Moderate';
    return 'Low';
  };

  const createScore = (construct: string, score: number): PsychConstructScore => ({
    construct, correct: Math.floor(score/10), total: 10, normalized: score, band: getBand(score)
  });

  const construct_scores: Record<string, PsychConstructScore> = {
    'analytical_curiosity': { construct: 'analytical_curiosity', raw: 28, normalized: 85, count: 6, band: 'Strong Preference' },
    'persistence_discipline': { construct: 'persistence_discipline', raw: 25, normalized: 75, count: 6, band: 'Clear Preference' },
    'creativity_innovation': { construct: 'creativity_innovation', raw: 18, normalized: 55, count: 6, band: 'Balanced' },
    'social_orientation': { construct: 'social_orientation', raw: 12, normalized: 35, count: 6, band: 'Lower Preference' },
    'structure_preference': { construct: 'structure_preference', raw: 20, normalized: 60, count: 6, band: 'Balanced' },
    'enterprising': { construct: 'enterprising', raw: 10, normalized: 30, count: 6, band: 'Lower Preference' }
  };

  const top_domains = computePsychDomains(construct_scores);

  const mockResult: PsychometricResult = {
    cohort: 'grade_11_12',
    total_score: 65,
    construct_scores,
    top_domains,
    raw_responses: [4,5,4,5,4,5,4,5], // varies enough to avoid straight-lining penalty
    has_midpoint_bias: false,
    gaps: []
  };

  const candidateInfo = { name: "Investigative Thinker" };

  const report = generatePsychometricReport(mockResult, candidateInfo, [], [4,5,4,5,4,5]);

  console.log(`\n===========================================`);
  console.log(`🧠 PSYCHOMETRIC PROFILE: ${candidateInfo.name}`);
  console.log(`   Holland Code: ${report.holland_code}`);
  console.log(`   Description:  ${report.holland_description}`);
  
  console.log(`\n🎯 TOP DOMAINS:`);
  report.top_career_domains.slice(0, 3).forEach((d: any) => {
    console.log(`   [${d.fit}] ${d.domain} (Score: ${d.score})`);
    console.log(`     - Explanation: ${d.explanation}`);
  });
  
  console.log(`\n🔍 META INSIGHT:`);
  console.log(`   Primary Gap: ${report.primary_gap_insight || "None"}`);
  console.log(`   Contradiction: ${report.contradiction_note || "None"}`);
  console.log(`   Work Style: ${report.work_environment_fit}`);
  
  console.log(`\n💡 DEVELOPMENT SUGGESTIONS:`);
  report.development_suggestions.slice(0, 3).forEach(s => console.log(`   - ${s}`));
  
  console.log(`===========================================\n`);
}

main().catch(console.error);
