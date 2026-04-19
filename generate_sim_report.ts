import fs from 'fs';
import { computeAptDomains } from './src/lib/scoring/domainMapping';
import { generateAptitudeReport } from './src/lib/scoring/reportGenerator';
import { buildAptitudeTemplate } from './src/lib/pdf/aptitudeTemplate';
import { AptConstructScore, AptitudeResult, AptBand } from './src/lib/scoring/types';

async function main() {
  const getBand = (score: number): AptBand => {
    if(score >= 75) return 'Very Strong';
    if(score >= 55) return 'Strong';
    if(score >= 40) return 'Emerging';
    return 'Needs Development';
  };

  const ana = 55, log = 65, num = 80, spa = 60;

  const construct_scores: Record<string, AptConstructScore> = {
    analytical_reasoning: { construct: 'analytical_reasoning', correct: 5, total: 10, normalized: ana, band: getBand(ana) },
    logical_reasoning: { construct: 'logical_reasoning', correct: 6, total: 10, normalized: log, band: getBand(log) },
    numerical_reasoning: { construct: 'numerical_reasoning', correct: 8, total: 10, normalized: num, band: getBand(num) },
    spatial_visual_reasoning: { construct: 'spatial_visual_reasoning', correct: 6, total: 10, normalized: spa, band: getBand(spa) },
  };

  const top_domains = computeAptDomains(construct_scores);

  const mockResult: AptitudeResult = {
    candidate_id: 'test-123',
    cohort: 'grade_11_12',
    total_score: 65,
    construct_scores,
    top_domains,
    strengths: ['numerical_reasoning'],
    improvement_areas: ['analytical_reasoning', 'spatial_visual_reasoning']
  };

  const candidateInfo = { name: "Mixed Profile Candidate" };

  // Generate Report Object
  const report = generateAptitudeReport(mockResult, candidateInfo, 'OK', 'Moderate');

  // Build HTML Template
  const html = await buildAptitudeTemplate(report, candidateInfo.name, new Date().toLocaleDateString());

  // Write to disk
  fs.writeFileSync('./simulated_report.html', html);
  console.log("SUCCESS: Wrote simulated HTML report to ./simulated_report.html");
}

main().catch(console.error);
