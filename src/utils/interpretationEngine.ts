// src/utils/interpretationEngine.ts

type Block = {
  observation: string;
  interpretation: string;
  impact: string;
  action: string;
};

export function buildOIIA(block: Block) {
  return `
${block.observation}

${block.interpretation}

${block.impact}

${block.action}
`.trim();
}

export function personalityInterpretation(p: any) {
  const observation =
    Math.abs((p.introvert || 0) - (p.extrovert || 0)) < 10
      ? "Based on your responses, you are highly adaptable, drawing energy from both independent focus and social interaction depending on the context."
      : (p.introvert || 0) > (p.extrovert || 0)
      ? "Based on your responses, you prefer an introspective working style, finding focus in independent environments over highly chaotic spaces."
      : "Based on your responses, you thrive in highly interactive environments, drawing energy from constant external engagement and collaboration.";

  const interpretation =
    (p.thinking || 0) > (p.feeling || 0)
      ? "This pattern indicates a reliance on logical reasoning. When making decisions, you value objective truth and efficiency over emotional consensus."
      : "This reveals a focus on interpersonal harmony. You naturally integrate human elements, empathy, and holistic context into your decisions.";

  const impact =
    "In the workplace, these traits dictate how you recharge, how you handle stress, and what type of organizational culture fits you best.";

  const action =
    "To maximize long-term satisfaction, target roles and companies that offer environments matching this natural rhythm. Build your career around how you naturally operate.";

  return buildOIIA({ observation, interpretation, impact, action });
}

export function interestInterpretation(interests: any) {
  const sorted = Object.entries(interests as Record<string, number>).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 3).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

  const observation = `Your strongest vocational interests cluster around the ${top.join(" and ")} areas.`;

  const interpretation =
    "This is highly significant. It reveals a genuine psychological preference for tasks heavily invested in these themes. People with this profile find deep fulfillment when they engage in these specific areas.";

  const impact =
    "When your career aligns with these core interests, you are far more likely to experience high productivity and engagement. Forcing yourself into misaligned fields often leads to burnout and dissatisfaction.";

  const action =
    "Your immediate priority should be filtering potential careers through these dominant traits. Choose organizations and specialties that reward your natural gravitation toward these domains.";

  return buildOIIA({ observation, interpretation, impact, action });
}

export function skillInterpretation(skills: any) {
  const entries = Object.entries(skills as Record<string, number>).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 3).map(([k]) => k.replace("_", " "));
  const bottom = entries.slice(-3).map(([k]) => k.replace("_", " "));

  const observation = `Your cognitive results show clear strengths in ${top.join(" and ")}, counterbalanced by weaker scores in ${bottom.join(" and ")}.`;

  const interpretation =
    "This represents a completely normal, uneven skill distribution. Your peak abilities serve as your primary strengths—the traits that make you valuable in the right role. Your weaker areas represent domains needing deliberate practice.";

  const impact =
    "Relying solely on your strengths is rarely enough. If your chosen career deeply demands any of your weaker traits, those areas will act as invisible bottlenecks, arbitrarily capping your performance regardless of how hard you work.";

  const action =
    `Your advancement strategy must be twofold: First, target roles that monetize your strengths in ${top.join(", ")}. Secondly, implement an immediate practice routine to elevate your baselines in ${bottom.join(", ")} so they no longer limit you.`;

  return buildOIIA({ observation, interpretation, impact, action });
}

export function crossInterpretation(data: any) {
  let insights: string[] = [];

  const p = data.personality?.breakdown || {};
  const s = data.skills?.scores || {};
  const i = data.interest?.scores || {};

  if ((s.logical || 0) > 60 && (i.investigative || 0) > 50) {
    insights.push("Your high logical capacity perfectly intersects with your investigative interests. This suggests you are uniquely built to untangle highly complex, analytical problems.");
  }

  if ((s.verbal || 0) < 40) {
    insights.push("Because your verbal reasoning currently lags behind your other traits, you may find yourself struggling to articulate ideas to stakeholders, limiting your effectiveness in communication-heavy leadership roles until this is actively trained.");
  }

  if ((p.extrovert || 0) > 60 && (s.social_skill || 0) < 50) {
    insights.push("Interestingly, despite your natural extroversion and desire for a social environment, your actual social-tactical skills need refinement. You have the energy for leadership, but you must actively train the execution.");
  }

  return insights.join("\n\n");
}

export function careerInterpretation(careerFit: any, careerName: string, data: any) {
  const isConditional = careerFit === "Conditional Fit";

  const observation = `When we map your entire psychological footprint against the industry matrix, ${careerName} emerges as a primary career path.`;

  const interpretation = isConditional 
    ? `However, this recommendation is strictly conditional. While it fits your overall interests and clusters, you currently have specific skill gaps that fall below the expected threshold for this role.`
    : `This recommendation is the direct result of aligning your highest aptitude scores, your dominant vocational interests, and your underlying personality structures into a single cohesive direction.`;

  const impact = isConditional
    ? `If you attempt to enter this field without addressing these precise gaps, you will struggle significantly to compete against your peers on a day-to-day basis.`
    : `Pursuing this precise career track offers the highest statistical probability of achieving long-term job satisfaction and sustained performance, because it works with your natural wiring instead of against it.`;

  const action = isConditional
    ? `Your immediate next step is to initiate a hardcore upskilling roadmap. You must aggressively train your weakest required skills before committing entirely to this path.`
    : `Begin executing active research into the daily realities, required qualifications, and entry vectors for this specific field immediately. While this path aligns with your natural strengths, you must secure the specific technical frameworks demanded by the industry to compete.`;

  return buildOIIA({ observation, interpretation, impact, action });
}

export function gapInterpretation(skills: any, career: string) {
  const sorted = Object.entries(skills as Record<string, number>).sort((a, b) => a[1] - b[1]);
  const gaps = sorted.slice(0, 3).map(([k]) => k.replace("_", " "));
  const lowestScore = sorted[0][1];

  if (lowestScore >= 60) {
    return buildOIIA({
      observation: "Our deep analysis indicates you do not possess any critical functional deficits impacting this career path at this time.",
      interpretation: "Your proficiency across all assessed domains meets or exceeds the competitive threshold expected for peak performance in this specific role.",
      impact: "This means you will not face significant friction regarding your baseline capabilities, allowing you to focus entirely on advanced domain specialization.",
      action: "Protect this highly optimized advantage through continuous practice, and begin pivoting your focus entirely toward mastering the specific, niche tools required by your industry."
    });
  }

  const observation = `While your overall profile is capable, our analysis identifies critical functional deficits specifically in ${gaps.join(" and ")}.`;

  const interpretation =
    `Every career path demands a minimum baseline across various domains. Currently, your proficiency in these identified areas falls notably below the competitive threshold expected for peak performance in ${career}.`;

  const impact =
    "If left unaddressed, these specific gaps will significantly restrict your execution speed, decision-making quality, and overall effectiveness. They will serve as persistent friction points that make your daily work feel disproportionately exhausting compared to your peers.";

  const action =
    `Treat these gaps as your highest priority intervention targets. You must develop a structured, long-term learning plan specifically aimed at elevating ${gaps.join(", ")}. Consistent, focused practice over the next 12 to 24 months is mandatory to unlock your full potential.`;

  return buildOIIA({ observation, interpretation, impact, action });
}

export function subjectInterpretation(stream: string) {
  return `
Based on a comprehensive synthesis of your cognitive aptitudes and vocational interests, the optimal academic foundational stream for you is ${stream}.

This recommendation is strategically chosen to provide the precise academic scaffolding required to support your highest-matching, long-term career trajectories.

Committing decisively to this stream will position you to excel, as it utilizes your pre-existing strengths while building the exact technical prerequisites demanded by your future sector.
`.trim();
}

export function finalInterpretation(data: any) {
  const topCluster = data.career_clusters?.[0]?.name || 'Management';
  return `
Your comprehensive psychometric profile demonstrates a natural alignment with ${topCluster} domains.

Your cognitive strengths and behavioral tendencies form a powerful engine for success—provided they are directed toward the right environments that leverage your natural inclinations.

However, raw potential is never enough. The critical differentiator between average outcomes and lasting success will be your willingness to confront and systematically eliminate your identified skill gaps.

You have the psychological architecture required to excel deeply. Your ultimate trajectory is now entirely dependent on your disciplined execution, targeted skill development, and strategic career positioning moving forward.
`.trim();
}

export function generateInterpretation(report: any) {
  const topCareer = report.career_paths?.[0] || { name: 'Management', fit: 'Explore' };
  const topSubject = report.subject_recommendation?.[0]?.stream || 'General Studies';

  return {
    personality: personalityInterpretation(report.personality?.breakdown || {}),
    interest: interestInterpretation(report.interest?.scores || {}),
    skills: skillInterpretation(report.skills?.scores || {}),
    cross: crossInterpretation(report),
    career: careerInterpretation(topCareer.fit, topCareer.name, report),
    gap: gapInterpretation(report.skills?.scores || {}, topCareer.name),
    subject: subjectInterpretation(topSubject),
    summary: finalInterpretation(report)
  };
}
