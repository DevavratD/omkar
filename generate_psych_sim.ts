import { computePsychDomains } from './src/lib/scoring/domainMapping';
import { generatePsychometricReport } from './src/lib/scoring/reportGenerator';
import { PsychometricResult, PsychConstructScore, PsychBand, PsychConstruct } from './src/lib/scoring/types';

async function main() {
  const getBand = (score: number): PsychBand => {
    if(score >= 75) return 'Strong Preference';
    if(score >= 55) return 'Clear Preference';
    if(score >= 40) return 'Balanced';
    return 'Lower Preference';
  };

  const createScore = (construct: PsychConstruct, score: number): PsychConstructScore => ({
    construct, raw: Math.floor(score/3.33), count: 6, normalized: score, band: getBand(score)
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
    construct_scores,
    domain_scores: top_domains,
    top_domains,
    reliability_flag: 'OK',
    riasec_top3: ['Investigative', 'Realistic', 'Artistic'],
    work_style_summary: ['Analytical', 'Persistent'],
    midpoint_bias: false,
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
