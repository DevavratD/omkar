import { Trait } from '@/types';

export type SkillScores = Record<string, number>;

export function generateAptitudeReport(normalizedSkills: SkillScores) {
  const sortedSkills = Object.entries(normalizedSkills).sort((a, b) => b[1] - a[1]);
  
  const strengths = sortedSkills.slice(0, 3).map(s => s[0]);
  const weaknesses = sortedSkills.slice(-3).map(s => s[0]);

  const allCareers = getCognitiveCareers(normalizedSkills);

  return {
    module: 'Aptitude Assessment',
    summary: 'This report evaluates innate cognitive abilities such as logic, numerical reasoning, spatial awareness, and analytical thinking.',
    strengths,
    weaknesses,
    recommended_domains: allCareers.slice(0, 3), // Top 3 Matches
    improvement_suggestions: generateImprovement(weaknesses),
    skills_breakdown: normalizedSkills
  };
}

function getCognitiveCareers(skills: SkillScores) {
  const paths = [
    { name: 'Software/Data Science', req: ['logical', 'numerical', 'analytical'] },
    { name: 'Architecture/Design', req: ['spatial', 'logical'] },
    { name: 'Engineering', req: ['mechanical', 'spatial', 'numerical'] },
    { name: 'Business Analysis', req: ['logical', 'verbal'] },
    { name: 'Healthcare/Medical', req: ['logical', 'analytical'] },
  ];

  return paths.map(p => {
    let score = 0;
    p.req.forEach(skill => score += (skills[skill] || 0));
    return {
      name: p.name,
      matchScore: Math.round(score / p.req.length)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

function generateImprovement(weaknesses: string[]) {
  if (weaknesses.length === 0) return "Maintain balanced cognitive practices.";
  return `To broaden your aptitude range, practice exercises specifically targeting: ${weaknesses.join(', ')}. Logic puzzles, spatial reasoning blocks, and timed mental math are strong starting points.`;
}
