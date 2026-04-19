import { computeAptDomains } from './src/lib/scoring/domainMapping';
import { AptConstructScore, AptBand } from './src/lib/scoring/types';

function createProfile(name: string, ana: number, log: number, num: number, spa: number) {
  const getBand = (score: number): AptBand => {
    if(score >= 75) return 'Very Strong';
    if(score >= 55) return 'Strong';
    if(score >= 40) return 'Emerging';
    return 'Needs Development';
  };

  const scores: Record<string, AptConstructScore> = {
    analytical_reasoning: { construct: 'analytical_reasoning', correct: 10, total: 10, normalized: ana, band: getBand(ana) },
    logical_reasoning: { construct: 'logical_reasoning', correct: 10, total: 10, normalized: log, band: getBand(log) },
    numerical_reasoning: { construct: 'numerical_reasoning', correct: 10, total: 10, normalized: num, band: getBand(num) },
    spatial_visual_reasoning: { construct: 'spatial_visual_reasoning', correct: 10, total: 10, normalized: spa, band: getBand(spa) },
  };

  return { name, scores };
}

// 1. Strong Profile: "System Thinker"
const strong = createProfile('Strong System Thinker', 85, 80, 78, 65);

// 2. Mixed Profile: "Quantitative Operator" with an Analytical limitation
const mixed = createProfile('Mixed Quantitative Operator', 55, 65, 80, 60);

// 3. Weak Profile: "General Cognitive Profile" dropping heavily into penalties
const weak = createProfile('Weak General Tracker', 35, 45, 30, 40);

const profiles = [strong, mixed, weak];

profiles.forEach(p => {
  console.log(`\n===========================================`);
  console.log(`🧠 PROFILE: ${p.name}`);
  console.log(`   Scores: Ana (${p.scores.analytical_reasoning.normalized}) | Log (${p.scores.logical_reasoning.normalized}) | Num (${p.scores.numerical_reasoning.normalized}) | Spa (${p.scores.spatial_visual_reasoning.normalized})`);
  
  const domains = computeAptDomains(p.scores);
  
  console.log(`\n🎯 TOP DECISION OUTPUTS:`);
  domains.slice(0, 3).forEach(d => {
    console.log(`   [${d.decision?.readiness}] ${d.domain} (Score: ${d.score})`);
    console.log(`     - Roles:  ${d.decision?.relatedRoles?.join(', ')}`);
    console.log(`     - Reason: ${d.decision?.reason}`);
    console.log(`     - Risk:   ${d.decision?.risk}`);
    console.log(`     - Action: ${d.decision?.action}`);
  });
});
