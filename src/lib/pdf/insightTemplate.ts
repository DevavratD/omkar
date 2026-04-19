// ─── Insight Summary PDF Template (1 Page) ───────────────────────────────────

import { PDF_CSS } from './styles';
import type { GapEntry, PsychDomainScore, AptDomainScore } from '@/lib/scoring/types';

function formatText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\n/g, '<br/>');
}

function gapTypeStyle(type: string): { card: string; badge: string } {
  switch (type) {
    case 'aligned':
      return {
        card:  'border:1.5px solid #6ee7b7;background:#f0fdf4;',
        badge: 'background:#d1fae5;color:#065f46;',
      };
    case 'interest_high_ability_low':
      return {
        card:  'border:1.5px solid #f59e0b;background:#fffbeb;',
        badge: 'background:#fef3c7;color:#92400e;',
      };
    case 'ability_high_interest_low':
      return {
        card:  'border:1.5px solid #93c5fd;background:#eff6ff;',
        badge: 'background:#dbeafe;color:#1e40af;',
      };
    default:
      return {
        card:  'border:1.5px solid #cbd5e1;background:#f8fafc;',
        badge: 'background:#f1f5f9;color:#475569;',
      };
  }
}

function gapTypeLabel(type: string): string {
  switch (type) {
    case 'aligned':                  return '✓ Aligned';
    case 'interest_high_ability_low': return '↑ Develop Ability';
    case 'ability_high_interest_low': return '→ Explore Interest';
    default:                          return '— Low Fit';
  }
}

export interface InsightSummaryInput {
  candidateName: string;
  date: string;
  primaryGapInsight: string | null;
  contradictionNote: string | null;
  gapAnalysis: GapEntry[];
  psychDomains: PsychDomainScore[];
  aptDomains: AptDomainScore[];
  cohort?: string;
}

export function buildInsightSummaryTemplate(input: InsightSummaryInput): string {
  const {
    candidateName, date, primaryGapInsight, contradictionNote,
    gapAnalysis, psychDomains, aptDomains, cohort,
  } = input;

  // Categorize domains
  const alignedDomains  = gapAnalysis.filter(g => g.type === 'aligned');
  const growthDomains   = gapAnalysis.filter(g => g.type === 'interest_high_ability_low');
  const latentDomains   = gapAnalysis.filter(g => g.type === 'ability_high_interest_low');
  const lowDomains      = gapAnalysis.filter(g => g.type === 'low_fit');

  // Safe path = aligned + high aptitude
  const safePaths = [
    ...alignedDomains.map(d => d.domain),
    ...latentDomains.map(d => d.domain),
  ].slice(0, 3);

  // Growth path = interest > ability
  const growthPaths = growthDomains.map(d => d.domain).slice(0, 3);

  const topPsych = psychDomains.slice(0, 3);
  const topApt   = aptDomains.slice(0, 3);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Career Insight Summary — ${candidateName}</title>
  <style>
    ${PDF_CSS}

    /* Single-page override */
    body { font-size: 11px; }
    .summary-page {
      width: 210mm;
      min-height: 297mm;
      max-height: 297mm;
      overflow: hidden;
      padding: 13mm 16mm;
      background: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 10px;
      border-bottom: 2px solid #2563eb;
      margin-bottom: 4px;
    }
    .summary-title {
      font-size: 22px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .summary-meta {
      text-align: right;
      font-size: 10px;
      color: #64748b;
      line-height: 1.6;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .three-col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }
    .mini-domain {
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 10px;
    }
    .mini-domain-name { font-weight: 700; margin-bottom: 2px; }
    .mini-domain-scores { color: #64748b; font-size: 9.5px; }
    .path-box {
      border-radius: 10px;
      padding: 10px 12px;
    }
    .path-label {
      font-size: 9px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.1em;
      margin-bottom: 6px;
    }
    .path-item {
      font-size: 10.5px; font-weight: 600;
      padding: 3px 0;
      display: flex; align-items: center; gap: 6px;
    }
    .path-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  </style>
</head>
<body>
<div class="summary-page">

  <!-- ── Header ── -->
  <div class="summary-header">
    <div>
      <div style="font-size:9px;font-weight:700;color:#2563eb;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">
        Omkar Career Counseling
      </div>
      <div class="summary-title">Career Insight Summary</div>
      <div style="font-size:10px;color:#64748b;margin-top:3px;">
        Integrated Psychometric × Aptitude Analysis
        ${cohort ? `&nbsp;·&nbsp;${cohort.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}` : ''}
      </div>
    </div>
    <div class="summary-meta">
      <div style="font-weight:700;color:#0f172a;font-size:13px;">${candidateName}</div>
      <div>${date}</div>
    </div>
  </div>

  <!-- ── Primary Insight ── -->
  ${primaryGapInsight ? `
  <div style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8);border-radius:12px;padding:14px 16px;color:#fff;">
    <div style="font-size:8.5px;font-weight:800;color:#93c5fd;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:5px;">
      ⚡ Primary Insight
    </div>
    <p style="font-size:12.5px;font-weight:500;line-height:1.65;color:#dbeafe;">${formatText(primaryGapInsight)}</p>
  </div>` : ''}

  <!-- ── Contradiction Note ── -->
  ${contradictionNote ? `
  <div style="background:#f5f3ff;border:1.5px solid #ddd6fe;border-radius:10px;padding:10px 12px;">
    <div style="font-size:8.5px;font-weight:800;color:#6d28d9;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">🔀 Behavioral Note</div>
    <p style="font-size:11px;color:#3730a3;font-weight:500;line-height:1.6;">${formatText(contradictionNote)}</p>
  </div>` : ''}

  <!-- ── Domain Alignment Grid ── -->
  <div>
    <div style="font-size:10px;font-weight:800;color:#0f172a;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">
      Domain Alignment Map
    </div>
    <div class="three-col">
      ${gapAnalysis.slice(0, 6).map(g => {
        const s = gapTypeStyle(g.type);
        return `
      <div class="mini-domain" style="${s.card}">
        <div class="mini-domain-name">${g.domain.split(' ').slice(0, 2).join(' ')}</div>
        <div class="mini-domain-scores">Interest: ${g.psychometric} &nbsp;|&nbsp; Ability: ${g.aptitude}</div>
        <div style="margin-top:4px;">
          <span style="font-size:8.5px;font-weight:700;border-radius:99px;padding:2px 7px;${s.badge}">${gapTypeLabel(g.type)}</span>
        </div>
      </div>`;
      }).join('')}
    </div>
  </div>

  <!-- ── Career Path Recommendations ── -->
  <div class="two-col">
    <!-- Safe Path -->
    <div class="path-box" style="background:#f0fdf4;border:1.5px solid #6ee7b7;">
      <div class="path-label" style="color:#065f46;">🎯 Recommended Path</div>
      <div style="font-size:9px;color:#64748b;margin-bottom:6px;">Aligned interest + ability</div>
      ${safePaths.length > 0
        ? safePaths.map(d => `
      <div class="path-item">
        <div class="path-dot" style="background:#16a34a;"></div>
        ${d}
      </div>`).join('')
        : `<div style="font-size:10px;color:#6b7280;">Strengthen foundational skills to build alignment.</div>`}
    </div>

    <!-- Growth Path -->
    <div class="path-box" style="background:#fffbeb;border:1.5px solid #f59e0b;">
      <div class="path-label" style="color:#92400e;">📈 Growth Path</div>
      <div style="font-size:9px;color:#64748b;margin-bottom:6px;">Strong interest — develop ability</div>
      ${growthPaths.length > 0
        ? growthPaths.map(d => `
      <div class="path-item">
        <div class="path-dot" style="background:#f59e0b;"></div>
        ${d}
      </div>`).join('')
        : `<div style="font-size:10px;color:#6b7280;">No significant interest-ability gap detected.</div>`}
    </div>
  </div>

  <!-- ── Top Domain Snapshot ── -->
  <div class="two-col">
    <div>
      <div style="font-size:9px;font-weight:700;color:#2563eb;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
        Top Psychometric Domains
      </div>
      ${topPsych.map((d, i) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
        <div style="width:20px;height:20px;border-radius:50%;background:#2563eb;color:#fff;font-size:8px;font-weight:900;display:flex;align-items:center;justify-content:center;">${i + 1}</div>
        <div>
          <div style="font-weight:700;font-size:10px;">${d.domain}</div>
          <div style="font-size:9px;color:#64748b;">${d.score}/100 &nbsp;·&nbsp; ${d.fit}</div>
        </div>
      </div>`).join('')}
    </div>
    <div>
      <div style="font-size:9px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
        Top Aptitude Domains
      </div>
      ${topApt.map((d, i) => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
        <div style="width:20px;height:20px;border-radius:50%;background:#16a34a;color:#fff;font-size:8px;font-weight:900;display:flex;align-items:center;justify-content:center;">${i + 1}</div>
        <div>
          <div style="font-weight:700;font-size:10px;">${d.domain}</div>
          <div style="font-size:9px;color:#64748b;">${d.score}/100 &nbsp;·&nbsp; ${d.fit}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ── Footer ── -->
  <div style="margin-top:auto;border-top:1px solid #e2e8f0;padding-top:8px;display:flex;justify-content:space-between;font-size:8.5px;color:#94a3b8;">
    <span>This summary integrates psychometric and aptitude data at the interpretation level only. Scores are not combined.</span>
    <span>Omkar Career Counseling · ${date}</span>
  </div>

</div>
</body>
</html>`;
}
