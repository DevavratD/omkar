import { PDF_CSS } from './styles';
import {
  buildHorizontalBarChart,
  buildVerticalBarChart,
  scoreColors,
  PALETTE,
} from './chartBuilder';
import type { AptitudeReport } from '@/lib/scoring/types';

function formatText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\n/g, '<br/>');
}

function fitClass(fit: string): string {
  if (fit === 'STRONG_FIT')   return 'fit-strong';
  if (fit === 'RISKY_FIT')     return 'fit-possible'; // using orange style
  if (fit === 'CONDITIONAL_FIT') return 'fit-good'; // using blue style 
  return 'fit-low';
}

function bandStyle(band: string): string {
  switch (band) {
    case 'Very Strong':       return 'background:#d1fae5;color:#065f46;';
    case 'Strong':            return 'background:#dbeafe;color:#1e40af;';
    case 'Emerging':          return 'background:#fef3c7;color:#92400e;';
    case 'Needs Development': return 'background:#fee2e2;color:#991b1b;';
    default:                  return 'background:#f1f5f9;color:#475569;';
  }
}

function scoreBar(score: number): string {
  if (score >= 75) return '#16a34a';
  if (score >= 55) return '#2563eb';
  if (score >= 40) return '#f59e0b';
  return '#dc2626';
}

function confidencePill(level: string | null): string {
  if (!level) return 'background:#f1f5f9;color:#475569;';
  if (level === 'High')     return 'background:#d1fae5;color:#065f46;';
  if (level === 'Moderate') return 'background:#fef3c7;color:#92400e;';
  return 'background:#fee2e2;color:#991b1b;';
}

export async function buildAptitudeTemplate(
  report: AptitudeReport,
  candidateName: string,
  date: string
): Promise<string> {
  const abilityItems = report.ability_scores || [];
  const abilityChart = abilityItems.length
    ? buildHorizontalBarChart(
        abilityItems.map(i => i.construct),
        abilityItems.map(i => i.normalized),
        scoreColors(abilityItems.map(i => i.normalized))
      )
    : null;

  const validDomains = report.aptitude_aligned_domains || [];
  const domainsToDisplay = validDomains.slice(0, 3);
  
  const domainChart = domainsToDisplay.length
    ? buildVerticalBarChart(
        domainsToDisplay.map(d => d.domain.split(' ')[0]),
        domainsToDisplay.map(d => d.score),
        scoreColors(domainsToDisplay.map(d => d.score))
      )
    : null;

  const hasStrengths = (report.strengths || []).filter(s => s.construct !== 'None').length > 0;
  const hasImprovements = (report.improvement_areas || []).filter(i => i.construct !== 'None').length > 0;
  
  const averageScore = abilityItems.length 
    ? abilityItems.reduce((acc, curr) => acc + curr.normalized, 0) / abilityItems.length 
    : 0;

  const gapInterpretation = report.meta_insight || 'Current cognitive scores indicate a developing level...';

  const disclaimer = `This aptitude report is produced by an automated reasoning assessment engine. Scores reflect performance on specific question types and should be considered alongside other evaluation criteria. Interpret in consultation with a qualified career counsellor.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Aptitude Assessment Report — ${candidateName}</title>
  <style>${PDF_CSS}</style>
</head>
<body>

<!-- 📄 PAGE 1 — COVER PAGE -->
<div class="page cover" style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);justify-content:center;align-items:center;text-align:center;">
  <div style="margin-bottom:60px;">
    <div class="cover-logo" style="margin-bottom:24px;">Omkar Career Counseling</div>
    <div class="cover-title" style="font-size:42px;margin-bottom:16px;">Aptitude<br/>Assessment Report</div>
    <div class="cover-sub" style="font-size:18px;">Cognitive Ability &amp; Reasoning Analysis</div>
  </div>
  
  <div style="margin-bottom:60px;">
    <span class="cover-badge">Logical</span>
    <span class="cover-badge">Analytical</span>
    <span class="cover-badge">Numerical</span>
    <span class="cover-badge">Spatial</span>
  </div>
  
  <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;width:100%;max-width:300px;">
    <div class="cover-name">${candidateName}</div>
    <div class="cover-date">Generated: ${date}</div>
  </div>
</div>

<!-- 📄 PAGE 2 — EXECUTIVE SUMMARY -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 2</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#2563eb;"></div>
    <span class="section-title">Executive Summary</span>
  </div>

  <!-- Key Findings at a Glance -->
  <div class="glance-box">
    <div class="glance-header">
      <div class="glance-header-dot"></div>
      <span class="glance-header-title">Key Findings at a Glance</span>
    </div>
    <div class="glance-body">
      ${abilityItems.length > 0 ? `
      <div class="glance-item"><span class="glance-bullet">1</span><span><strong>Strongest ability:</strong> ${abilityItems[0].construct} — ${abilityItems[0].normalized}% (${abilityItems[0].band})</span></div>
      <div class="glance-item"><span class="glance-bullet">2</span><span><strong>Weakest ability:</strong> ${abilityItems[abilityItems.length - 1].construct} — ${abilityItems[abilityItems.length - 1].normalized}% (${abilityItems[abilityItems.length - 1].band})</span></div>
      ${domainsToDisplay[0] ? `<div class="glance-item"><span class="glance-bullet">3</span><span><strong>Top aptitude-aligned domain:</strong> ${domainsToDisplay[0].domain} (${domainsToDisplay[0].fit})</span></div>` : ''}
      <div class="glance-item"><span class="glance-bullet">4</span><span><strong>Overall aptitude tier:</strong> ${averageScore >= 65 ? 'Strong — ready for domain-specific application' : averageScore >= 40 ? 'Emerging — targeted practice will improve readiness' : 'Developing — foundational work required before specialisation'}</span></div>
      ` : '<div class="glance-item">No ability data available.</div>'}
    </div>
  </div>

  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px;">Cognitive Identity &amp; Archetype</h3>
    <div style="margin-bottom:12px;background:#f3f4f6;padding:12px;border-left:4px solid #4f46e5;border-radius:4px;">
      <div style="font-size:15px;font-weight:900;color:#4f46e5;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">${formatText(report.archetype || 'General Profile')}</div>
      <div style="font-size:12.5px;color:#334155;">${formatText(report.cognitive_pattern || 'Balanced interactions.')}</div>
    </div>
    <h3 style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px;">Cognitive Overview</h3>
    <p style="font-size:12.5px;color:#475569;line-height:1.75;">${formatText(report.aptitude_summary) || 'The candidate has completed the cognitive reasoning assessment.'}</p>
  </div>

  ${report.primary_aptitude_insight ? `
  <div class="insight-box" style="margin-bottom:24px;border-color:#ef4444;background:#fef2f2;">
    <div class="insight-label" style="color:#b91c1c;">🔴 Key Observation</div>
    <div class="insight-text" style="color:#7f1d1d;font-size:13.5px;">${formatText(report.primary_aptitude_insight)}</div>
  </div>` : ''}

  <!-- Score Legend -->
  <div style="margin-bottom:8px;font-size:9px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;">Score Scale</div>
  <div class="score-legend">
    <div class="legend-item"><div class="legend-swatch" style="background:#dc2626;"></div> Development Opportunity (<40%)</div>
    <div class="legend-item"><div class="legend-swatch" style="background:#f59e0b;"></div> Emerging (40–54%)</div>
    <div class="legend-item"><div class="legend-swatch" style="background:#2563eb;"></div> Strong (55–74%)</div>
    <div class="legend-item"><div class="legend-swatch" style="background:#16a34a;"></div> Very Strong (75%+)</div>
  </div>

  <div class="section-header" style="margin-top:20px;">
    <div class="section-dot" style="background:#64748b;"></div>
    <span class="section-title">Assessment Reliability</span>
  </div>
  
  <div class="grid-2">
    <div class="stat-box">
      <div class="stat-label">Confidence Level</div>
      <div style="margin-top:6px;">
        <span class="pill" style="${confidencePill(report.confidence_level)}">${report.confidence_level || 'Not Evaluated'}</span>
      </div>
      <div class="stat-desc">Statistical variance check</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Reliability Flag</div>
      <div style="margin-top:6px;">
        <span class="pill" style="${report.reliability_flag === 'OK' ? 'background:#d1fae5;color:#065f46;' : report.reliability_flag === 'LOW' ? 'background:#fee2e2;color:#991b1b;' : 'background:#f1f5f9;color:#475569;'}">${report.reliability_flag === 'OK' ? '✓ Verified' : report.reliability_flag === 'LOW' ? '⚠ Low' : '—'}</span>
      </div>
      <div class="stat-desc">Response pattern integrity</div>
    </div>
  </div>
</div>

<!-- 📄 PAGE 3 — DETAILED ABILITY PROFILE -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 3</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#16a34a;"></div>
    <span class="section-title">Detailed Ability Profile</span>
    <span class="section-subtitle">Cognitive Dimensions</span>
  </div>

  <p class="plain-intro">The following profiles show how ${candidateName} performed across each cognitive dimension. Scores reflect the percentage of questions answered correctly in that area, normalised to a 0–100 range.</p>

  <div style="display:flex;flex-direction:column;gap:18px;">
    ${abilityItems.map(item => `
    <div class="card" style="padding:20px;border-left:4px solid ${scoreBar(item.normalized)};">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3 style="font-size:16px;font-weight:900;color:#0f172a;">${item.construct}</h3>
        <div style="text-align:right;">
          <span style="font-size:24px;font-weight:900;color:${scoreBar(item.normalized)};">${item.normalized}%</span>
          <div style="font-size:11px;color:#64748b;margin-top:1px;">${typeof item.correct === 'number' ? `${item.correct} of ${item.total} correct` : ''}</div>
          <div style="margin-top:4px;"><span class="pill" style="${bandStyle(item.band)}">${item.band}</span></div>
        </div>
      </div>
      <div style="background:#f8fafc;padding:12px;border-radius:8px;">
        <p style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Interpretation</p>
        <p style="font-size:12.5px;color:#334155;line-height:1.6;">${formatText(item.interpretation)}</p>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- 📄 PAGE 4 — VISUAL ANALYSIS -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 4</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#8b5cf6;"></div>
    <span class="section-title">Visual Analysis</span>
    <span class="section-subtitle">Score Distribution</span>
  </div>

  <div style="display:flex;flex-direction:column;align-items:center;margin-top:40px;">
    ${abilityChart 
      ? `<img class="chart-img" style="width:100%;max-width:500px;" src="${abilityChart}" />`
      : `<p>No visual data available.</p>`}
    
    <div class="card" style="margin-top:40px;width:100%;text-align:center;background:#f8fafc;">
      <p style="font-size:13px;color:#475569;line-height:1.7;">
        ${averageScore < 40 ? 'The chart shows a noticeable need for comprehensive development across multiple reasoning domains before specialization.' : abilityItems.length > 0 ? `The chart shows a noticeable variance in abilities, with ${abilityItems[0].construct} leading the profile.` : 'Profile distribution is currently under review.'}
      </p>
    </div>
  </div>
</div>

<!-- 📄 PAGE 5 — STRENGTHS & DEVELOPMENT OPPORTUNITIES -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 5</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#22c55e;"></div>
    <span class="section-title">Cognitive Strengths</span>
  </div>
  
  <div style="margin-bottom:32px;">
    ${hasStrengths 
      ? report.strengths.filter(s => s.construct !== 'None').map(s => `
      <div style="margin-bottom:16px;">
        <h4 style="font-size:14px;font-weight:800;color:#065f46;margin-bottom:4px;">${formatText(s.construct)}</h4>
        <p style="font-size:12.5px;color:#334155;line-height:1.6;">${formatText(s.explanation)}</p>
      </div>
      `).join('')
      : `<p style="font-size:13px;color:#475569;">No strong cognitive dominance observed yet. This suggests a balanced baseline with potential for development through targeted practice.</p>`}
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#f59e0b;"></div>
    <span class="section-title">Development Opportunities</span>
  </div>

  <p class="plain-intro">The following areas scored below the strong threshold. With focused, consistent practice, these represent meaningful opportunities for cognitive growth.</p>

  <div>
    ${hasImprovements
      ? report.improvement_areas.filter(i => i.construct !== 'None').map(i => `
      <div style="margin-bottom:16px;background:#fffbeb;padding:16px;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">
        <h4 style="font-size:14px;font-weight:800;color:#92400e;margin-bottom:6px;">${formatText(i.construct)}</h4>
        <p style="font-size:12.5px;color:#78350f;line-height:1.6;">${formatText(i.suggestion)}</p>
      </div>
      `).join('')
      : `<p style="font-size:13px;color:#16a34a;font-weight:600;">✓ No critical cognitive gaps identified. All assessed constructs currently meet or exceed expected baseline thresholds.</p>`}
  </div>
</div>

<!-- 📄 PAGE 6 — DOMAIN ANALYSIS -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 6</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#0ea5e9;"></div>
    <span class="section-title">Domain Analysis</span>
    <span class="section-subtitle">Aptitude Applicability</span>
  </div>

  ${domainsToDisplay.length > 0 ? `
    ${domainChart ? `<div style="display:flex;justify-content:center;margin-bottom:24px;"><img class="chart-img" style="max-height:220px;" src="${domainChart}" /></div>` : ''}
    
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${domainsToDisplay.map((d, i) => `
      <div class="domain-card ${fitClass(d.fit)}">
        <div style="flex:1;">
          <div class="domain-name" style="font-size:14px;">#${i + 1} ${d.domain}</div>
          <div class="domain-expl" style="font-size:11.5px;margin-top:4px;">${formatText(d.decision?.reason || d.explanation)}</div>
          
          <div style="margin-top: 10px; padding-left: 8px; border-left: 2px solid #ef4444;">
            <div style="font-size:10px;font-weight:bold;color:#b91c1c;margin-bottom:3px;text-transform:uppercase;">Identified Risks & Gaps</div>
            <div style="font-size:11px;color:#7f1d1d;">${formatText(d.decision?.risk || 'No critical gaps')}</div>
          </div>

          <div style="margin-top: 8px; padding-left: 8px; border-left: 2px solid #3b82f6;">
            <div style="font-size:10px;font-weight:bold;color:#1d4ed8;margin-bottom:3px;text-transform:uppercase;">Recommended Action</div>
            <div style="font-size:11px;color:#1e3a8a;">${formatText(d.decision?.action || 'Maintain current baseline.')}</div>
          </div>

          <div style="margin-top: 12px; padding: 12px; border-radius: 6px; background: rgba(0,0,0,0.02); border: 1px solid #e2e8f0;">
            <div style="font-size:11px;font-weight:bold;color:#334155;margin-bottom:6px;">Related Career Paths</div>
            <ul style="font-size:11px;color:#475569;margin:0;padding-left:16px;">
              ${(d.decision?.relatedRoles || []).map(r => `<li style="margin-bottom:3px;">${r}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-top:12px;"><span class="pill ${fitClass(d.fit)}" style="font-size:10px;">${d.fit.replace('_', ' ')}</span></div>
        </div>
        <div class="domain-score" style="font-size:28px;">${d.score}</div>
      </div>`).join('')}
    </div>
  ` : `
    <div class="card" style="padding:30px;text-align:center;background:#f8fafc;border:1px dashed #cbd5e1;">
      <div style="width:48px;height:48px;background:#e2e8f0;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
        <span style="font-size:20px;">ℹ️</span>
      </div>
      <h3 style="font-size:16px;font-weight:800;color:#334155;margin-bottom:8px;">Insufficient Domain Alignment</h3>
      <p style="font-size:13px;color:#64748b;line-height:1.6;max-width:400px;margin:0 auto;">No domain currently shows strong alignment based strictly on cognitive ability. It is highly recommended to focus on foundational skill development before making definitive career specialization decisions.</p>
    </div>
  `}
</div>

<!-- 📄 PAGE 7 — GAP-READY INTERPRETATION -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 7</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#f59e0b;"></div>
    <span class="section-title">Meta-Behavioral Insight</span>
    <span class="section-subtitle">Real-World Application Context</span>
  </div>

  <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:24px;margin-top:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#92400e;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Current vs. Expected Level</h3>
    <p style="font-size:13.5px;color:#78350f;line-height:1.8;">
      ${gapInterpretation}
    </p>
  </div>
</div>

<!-- 📄 PAGE 8 — DEVELOPMENT PLAN -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 8</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#3b82f6;"></div>
    <span class="section-title">Development Plan</span>
    <span class="section-subtitle">Cognitive Growth Roadmap</span>
  </div>

  <div style="margin-top:20px;">
    <div class="phase-block">
      <div class="phase-heading">Short-Term (0–3 Months)</div>
      <div class="phase-content">${formatText(report.development_plan?.short_term) || 'Establish daily micro-practice routines focusing on fundamental logic problems.'}</div>
    </div>

    <div class="phase-block mid">
      <div class="phase-heading">Mid-Term (3–6 Months)</div>
      <div class="phase-content">${formatText(report.development_plan?.mid_term) || 'Introduce timed tests and structured multi-step problem solving.'}</div>
    </div>

    <div class="phase-block long">
      <div class="phase-heading">Long-Term (6+ Months)</div>
      <div class="phase-content">${formatText(report.development_plan?.long_term) || 'Transition to domain-specific application and advanced abstract logic scenarios.'}</div>
    </div>
  </div>

  <div class="discussion-box">
    <div class="discussion-label">For Counsellor Reference — Session Discussion Prompts</div>
    <div class="discussion-item"><strong>1.</strong> What practice habits does this student already have, and how realistic is daily 15-minute dedicated practice for them?</div>
    <div class="discussion-item"><strong>2.</strong> Are there external constraints (coaching, school load) that would affect the short-term plan? Adjust timelines accordingly.</div>
    <div class="discussion-item"><strong>3.</strong> Which of the three phases would benefit most from structured accountability — a check-in, a resource list, or a follow-up assessment?</div>
  </div>
</div>

<!-- 📄 PAGE 9 — LEARNING STRATEGY -->
<div class="page">
  <div class="page-header">
    <span class="page-org">Omkar Career Counseling</span>
    <span class="page-type">Aptitude Report — Page 9</span>
  </div>

  <div class="section-header">
    <div class="section-dot" style="background:#ec4899;"></div>
    <span class="section-title">Applied Learning Strategy</span>
    <span class="section-subtitle">Meta-Cognitive Approach</span>
  </div>

  <div style="margin-top:20px;">
    <p style="font-size:14px;color:#334155;line-height:1.8;margin-bottom:24px;">
      Cognitive ability is not fixed. How you approach learning fundamentally alters how quickly you improve. Based on your profile, we recommend the following strategic approach to acquiring new skills:
    </p>

    <div class="card" style="background:linear-gradient(135deg,#fdf2f8 0%,#fce7f3 100%);border-color:#fbcfe8;padding:24px;">
      <h3 style="font-size:16px;font-weight:900;color:#be185d;margin-bottom:12px;">Strategy Directive</h3>
      <p style="font-size:13.5px;color:#9f1239;line-height:1.7;font-weight:500;">
        ${formatText(report.learning_strategy) || 'Prioritize consistency over volume. Rather than cramming large volumes of practice, engage in 15-20 minutes of daily deliberate practice. When an error occurs, spend twice as long reviewing the underlying logic as you did attempting the problem.'}
      </p>
    </div>
    
    <div style="margin-top:32px;">
      <h4 style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #e2e8f0;padding-bottom:8px;margin-bottom:16px;">Core Principles</h4>
      <ul style="padding-left:20px;font-size:13px;color:#475569;line-height:1.8;">
        <li><strong>Spaced Repetition:</strong> Revisit complex problems across multiple days to reinforce neural pathways.</li>
        <li><strong>Error Analysis:</strong> Do not just mark answers wrong. Maintain an error log and document <em>why</em> the logic failed.</li>
        <li><strong>Progressive Overload:</strong> Gradually increase difficulty only when current tier accuracy exceeds 80%.</li>
      </ul>
    </div>
  </div>
</div>

<!-- 📄 PAGE 10 — FINAL NOTE + DISCLAIMER -->
<div class="page" style="display:flex;flex-direction:column;justify-content:center;text-align:center;">
  <div style="max-width:500px;margin:0 auto;">
    <div style="width:64px;height:64px;background:#f1f5f9;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
      <span style="font-size:28px;">🎓</span>
    </div>
    
    <h2 style="font-size:24px;font-weight:900;color:#0f172a;margin-bottom:16px;">End of Report</h2>
    <p style="font-size:14px;color:#475569;line-height:1.7;margin-bottom:28px;">
      This concludes ${candidateName}'s Aptitude Assessment. The insights provided here serve as a roadmap for cognitive development and career alignment.
    </p>

    <div class="discussion-box" style="text-align:left;">
      <div class="discussion-label">Suggested Session Questions — For Counsellor Use</div>
      <div class="discussion-item"><strong>1.</strong> &ldquo;Looking at these results, which area surprised you most — positively or negatively?&rdquo;</div>
      <div class="discussion-item"><strong>2.</strong> &ldquo;Have you had any experience with tasks that require this kind of reasoning — in school, hobbies, or elsewhere?&rdquo;</div>
      <div class="discussion-item"><strong>3.</strong> &ldquo;Is there a career field you were already considering where these results feel relevant or surprising?&rdquo;</div>
    </div>

    <div style="border-top:1px solid #e2e8f0;padding-top:24px;margin-top:20px;">
      <p style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">Counselling Disclaimer</p>
      <p style="font-size:10.5px;color:#94a3b8;line-height:1.6;text-align:justify;">
        ${disclaimer} This document is confidential and intended solely for the use of the individual to whom it is addressed. The scoring and interpretations utilise standardised normative mapping techniques but acknowledge individual variance and contextual circumstances not captured strictly by the test environment.
      </p>
    </div>
  </div>
</div>

</body>
</html>`;
}
