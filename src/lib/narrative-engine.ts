// src/lib/narrative-engine.ts

export const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const pickTop = (obj: Record<string, number>, n = 3) =>
  Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k.replace('_', ' '));

export const pickBottom = (obj: Record<string, number>, n = 3) =>
  Object.entries(obj)
    .sort((a, b) => a[1] - b[1])
    .slice(0, n)
    .map(([k]) => k.replace('_', ' '));

export function personalityNarrative(p: any) {
  let parts: string[] = [];

  // Energy
  parts.push(
    p.introvert > p.extrovert
      ? rand([
          "You naturally prefer focused, independent environments.",
          "You tend to operate best in introspective and controlled settings."
        ])
      : rand([
          "You thrive in dynamic, social environments.",
          "You gain energy through interaction and external engagement."
        ])
  );

  // Decision
  parts.push(
    p.thinking > p.feeling
      ? "Your decisions are driven by logic and structured reasoning."
      : "You incorporate emotional awareness and empathy in decision-making."
  );

  // Contradiction handling
  if (p.thinking > 55 && p.feeling > 55) {
    parts.push("You balance logic and empathy effectively, adapting based on context.");
  }

  // Processing
  parts.push(
    p.intuition > p.sensing
      ? "You are comfortable with abstract thinking and future possibilities."
      : "You prefer concrete, practical, and experience-based information."
  );

  return parts.join(" ");
}

const interestMeaning: Record<string, string> = {
  realistic: "practical execution",
  investigative: "analytical problem-solving",
  artistic: "creative expression",
  social: "human interaction",
  enterprising: "leadership and influence",
  conventional: "structured systems"
};

export function interestNarrative(interactions: any) {
  const top = pickTop(interactions, 3);
  const mapped = top.map(t => interestMeaning[t.toLowerCase()] || t);

  return rand([
    `Your interest pattern is strongly defined by ${top.join(" and ")}, suggesting alignment with ${mapped.join(" and ")}.`,
    `A dominant combination of ${top.join(", ")} indicates you prefer environments involving ${mapped.join(", ")}.`,
    `Your behavioral inclination toward ${top.join(" and ")} highlights a preference for ${mapped.join(" and ")}.`
  ]);
}

export function skillNarrative(skills: any) {
  const top = pickTop(skills, 3);
  const bottom = pickBottom(skills, 3);

  return `Your strongest capabilities lie in ${top.join(", ")}, which give you a natural advantage in roles requiring these abilities. However, ${bottom.join(" and ")} may act as limiting factors in high-performance or competitive environments if not actively improved.`;
}

export function crossAnalysis(personality: any, skills: any, interests: any) {
  let text = "";

  if (personality.introvert > 55 && (skills.verbal || 0) < 40) {
    text += "Your introverted nature combined with lower verbal ability may limit effectiveness in communication-heavy roles. ";
  }

  if ((interests.enterprising || 0) > 55 && (skills.leadership || 0) < 50) {
    text += "While you show interest in leadership roles, your current leadership skills need strengthening to support this direction. ";
  }

  if ((skills.logical || 0) > 60 && (interests.investigative || 0) > 50) {
    text += "Your strong logical ability aligns well with analytical and investigative career paths. ";
  }

  return text.trim();
}

export function careerNarrative(career: string, topSkills: string[], topInterests: string[]) {
  return rand([
    `${career} is strongly aligned with your profile, particularly your strengths in ${topSkills.join(", ")} and interests in ${topInterests.join(", ")}.`,
    `Based on your overall profile, ${career} emerges as a highly compatible path due to your alignment in ${topSkills.join(", ")} and ${topInterests.join(", ")}.`,
    `Your combined traits and abilities suggest that ${career} offers a strong fit, especially considering your strengths in ${topSkills.join(", ")}.`
  ]);
}

const gapMap: Record<string, string> = {
  logical: "impacts structured problem-solving",
  verbal: "affects communication and expression",
  spatial: "limits structural and abstract visual mapping",
  numerical: "reduces efficiency in data-driven and quantitative environments",
  leadership: "limits ability to manage and influence others",
  social: "reduces emotional translation and team cohesion bandwidth",
  mechanical: "limits physical engineering or operational execution",
  administrative: "affects organizational alignment and structural adherence"
};

export function gapNarrative(gapsObj: Record<string, number>, career: string) {
  // gapsObj maps the trait name to the deficit amount (how far below optimal)
  const gaps = Object.keys(gapsObj)
    .map(k => ({ trait: k, diff: gapsObj[k] }))
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 3);

  if (gaps.length === 0) return [`You possess a highly optimized competency baseline for ${career}. Protect this advantage.`];

  return gaps.map(g =>
    `${g.trait.charAt(0).toUpperCase() + g.trait.slice(1)} is below the expected level for ${career}, which ${gapMap[g.trait] || "affects performance"}. Improving this will significantly enhance your success in this path.`
  );
}

export function finalSummary(topCluster: string, topInterests: string[], topSkills: string[], topGaps: string[]) {
  return `Your overall profile indicates strong alignment with ${topCluster} domains.\n\nYou are naturally inclined toward ${topInterests.join(", ")} environments and demonstrate strength in ${topSkills.join(", ")}.\n\nHowever, addressing gaps in ${topGaps.join(" and ")} is critical to unlocking your full potential.\n\nYour trajectory is highly viable — but consistent improvement and execution over the next cycle will determine your ultimate outcome.`;
}

export function generateFullNarrative(report: any) {
  const p = report.personality?.breakdown || {};
  const s = report.skills?.scores || {};
  const i = report.interest?.scores || {};
  const topC = report.career_paths?.[0]?.name || 'Management';
  const topSkills = pickTop(s, 3);
  const topInterests = pickTop(i, 3);
  // Extract global weak points
  const globalGaps = pickBottom(s, 3);
  
  // Extract specific gaps for top career from gap_analysis matrix
  const topCareerGapsList = report.gap_analysis?.find((g: any) => g.career === topC)?.gaps || [];
  // Parse legacy string ("Logical: -20. ...") into object map for narrative engine handling
  const gapDiffs: Record<string, number> = {};
  topCareerGapsList.forEach((gapStr: string) => {
    const parts = gapStr.split(':');
    if (parts.length > 1) {
      gapDiffs[parts[0].toLowerCase().trim()] = 10; // dummy difference just to map traits
    }
  });

  return {
    personality: personalityNarrative(p),
    interest: interestNarrative(i),
    skills: skillNarrative(s),
    cross: crossAnalysis(p, s, i),
    career: careerNarrative(topC, topSkills, topInterests),
    gaps: gapNarrative(gapDiffs, topC),
    summary: finalSummary(report.career_clusters?.[0]?.name || topC, topInterests, topSkills, globalGaps)
  };
}
