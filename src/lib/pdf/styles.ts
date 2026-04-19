// ─── Shared PDF CSS ───────────────────────────────────────────────────────────

export const PDF_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 12px;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ─── Page ────────────────────────────────────────────────── */
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 16mm 18mm;
    background: #ffffff;
    page-break-after: always;
    position: relative;
  }
  .page:last-child { page-break-after: auto; }

  /* ─── Cover ────────────────────────────────────────────────── */
  .cover {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%);
    color: #fff;
    padding: 20mm 18mm;
    min-height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover-logo {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #93c5fd;
    margin-bottom: 48px;
  }
  .cover-title {
    font-size: 38px;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 12px;
  }
  .cover-sub {
    font-size: 16px;
    font-weight: 400;
    color: #94a3b8;
    margin-bottom: 48px;
  }
  .cover-badge {
    display: inline-block;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 11px;
    font-weight: 600;
    color: #bfdbfe;
    margin-bottom: 8px;
    margin-right: 6px;
  }
  .cover-footer {
    border-top: 1px solid rgba(255,255,255,0.15);
    padding-top: 20px;
    font-size: 10px;
    color: #64748b;
  }
  .cover-name { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .cover-date { font-size: 11px; color: #94a3b8; }

  /* ─── Section Header ───────────────────────────────────────── */
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e2e8f0;
  }
  .section-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-right: 10px;
    flex-shrink: 0;
  }
  .section-title {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.01em;
  }
  .section-subtitle {
    font-size: 10px;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-left: auto;
  }

  /* ─── Cards ────────────────────────────────────────────────── */
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 14px;
  }
  .card-highlight {
    background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%);
    border-radius: 12px;
    padding: 20px 22px;
    color: #fff;
    margin-bottom: 16px;
  }
  .card-highlight p {
    font-size: 13px;
    font-weight: 400;
    color: #dbeafe;
    line-height: 1.7;
  }
  .card-green {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
    border-radius: 12px;
    padding: 20px 22px;
    color: #fff;
    margin-bottom: 16px;
  }

  /* ─── Bar Charts ───────────────────────────────────────────── */
  .bar-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    gap: 10px;
  }
  .bar-label {
    width: 150px;
    font-size: 10.5px;
    font-weight: 600;
    color: #374151;
    flex-shrink: 0;
  }
  .bar-track {
    flex: 1;
    height: 10px;
    background: #f1f5f9;
    border-radius: 99px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    border-radius: 99px;
  }
  .bar-value {
    width: 36px;
    font-size: 10px;
    font-weight: 700;
    color: #374151;
    text-align: right;
    flex-shrink: 0;
  }
  .bar-band {
    width: 110px;
    font-size: 9px;
    font-weight: 600;
    text-align: center;
    border-radius: 99px;
    padding: 2px 6px;
    flex-shrink: 0;
  }

  /* ─── Fit Badges ───────────────────────────────────────────── */
  .fit-strong  { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
  .fit-good    { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
  .fit-possible{ background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
  .fit-low     { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }

  /* ─── Domain Cards ─────────────────────────────────────────── */
  .domain-card {
    border-radius: 10px;
    padding: 12px 14px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .domain-name { font-size: 12px; font-weight: 700; margin-bottom: 3px; }
  .domain-expl { font-size: 10px; line-height: 1.5; opacity: 0.85; }
  .domain-score { font-size: 22px; font-weight: 900; opacity: 0.9; }
  .domain-fit {
    font-size: 9px; font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 99px;
    padding: 2px 8px;
    margin-top: 4px;
    display: inline-block;
    border: 1px solid currentColor;
  }

  /* ─── Grid ─────────────────────────────────────────────────── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .stat-box {
    border-radius: 10px;
    padding: 12px;
    text-align: center;
    border: 1px solid #e2e8f0;
  }
  .stat-label { font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .stat-value { font-size: 20px; font-weight: 900; color: #0f172a; }
  .stat-desc   { font-size: 10px; color: #64748b; margin-top: 2px; }

  /* ─── Insight Box ──────────────────────────────────────────── */
  .insight-box {
    background: #fff7ed;
    border: 2px solid #f59e0b;
    border-radius: 12px;
    padding: 16px 18px;
    margin-bottom: 14px;
  }
  .insight-label {
    font-size: 9px; font-weight: 800; color: #b45309;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;
  }
  .insight-text { font-size: 12px; font-weight: 600; color: #78350f; line-height: 1.6; }

  /* ─── Page Header/Footer ───────────────────────────────────── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f5f9;
  }
  .page-org { font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.12em; }
  .page-type { font-size: 10px; font-weight: 600; color: #2563eb; }
  .page-footer {
    position: absolute;
    bottom: 12mm;
    left: 18mm;
    right: 18mm;
    border-top: 1px solid #f1f5f9;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: #94a3b8;
  }

  /* ─── Tags / Pills ─────────────────────────────────────────── */
  .pill { display: inline-block; border-radius: 99px; padding: 3px 10px; font-size: 10px; font-weight: 600; margin: 2px; }
  .pill-blue   { background: #dbeafe; color: #1e40af; }
  .pill-green  { background: #d1fae5; color: #065f46; }
  .pill-orange { background: #fef3c7; color: #92400e; }
  .pill-grey   { background: #f1f5f9; color: #475569; }

  /* ─── Contradiction / Conflict ─────────────────────────────── */
  .conflict-box {
    background: #f5f3ff;
    border: 1px solid #ddd6fe;
    border-radius: 10px;
    padding: 12px 14px;
    margin-bottom: 12px;
  }
  .conflict-label { font-size: 9px; font-weight: 800; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }

  /* ─── Disclaimer ───────────────────────────────────────────── */
  .disclaimer {
    font-size: 8.5px;
    color: #94a3b8;
    line-height: 1.6;
    border-top: 1px solid #f1f5f9;
    padding-top: 10px;
    margin-top: 16px;
  }

  /* ─── Chart Image ──────────────────────────────────────────── */
  .chart-img { max-width: 100%; height: auto; margin: 8px 0; }

  /* ─── Key Findings at a Glance ─────────────────────────────── */
  .glance-box { border-radius: 12px; overflow: hidden; margin-bottom: 16px; border: 1px solid #0f766e; }
  .glance-header { background: #0f172a; padding: 10px 16px; display: flex; align-items: center; gap: 8px; }
  .glance-header-dot { width: 6px; height: 6px; background: #2dd4bf; border-radius: 50%; }
  .glance-header-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #2dd4bf; }
  .glance-body { background: #f0fdfa; padding: 14px 18px; }
  .glance-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 11.5px; color: #134e4a; line-height: 1.5; }
  .glance-item:last-child { margin-bottom: 0; }
  .glance-bullet { width: 16px; height: 16px; background: #0f766e; color: #fff; border-radius: 50%; font-size: 8px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }

  /* ─── Counsellor Discussion Box ─────────────────────────────── */
  .discussion-box { background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 12px; padding: 14px 18px; margin-top: 14px; }
  .discussion-label { font-size: 8.5px; font-weight: 800; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
  .discussion-item { font-size: 11px; color: #4c1d95; line-height: 1.6; margin-bottom: 6px; }
  .discussion-item:last-child { margin-bottom: 0; }

  /* ─── Score Legend ───────────────────────────────────────────── */
  .score-legend { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 9.5px; color: #374151; font-weight: 500; }
  .legend-swatch { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }

  /* ─── Plain Intro ────────────────────────────────────────────── */
  .plain-intro { font-size: 11px; font-style: italic; color: #64748b; line-height: 1.6; margin-bottom: 12px; }

  /* ─── Phase Block ────────────────────────────────────────────── */
  .phase-block { border-left: 3px solid #3b82f6; padding: 12px 16px; background: #f8fafc; border-radius: 0 8px 8px 0; margin-bottom: 18px; }
  .phase-block.mid { border-left-color: #8b5cf6; }
  .phase-block.long { border-left-color: #10b981; }
  .phase-heading { font-size: 12px; font-weight: 800; color: #1e293b; margin-bottom: 6px; }
  .phase-content { font-size: 11.5px; color: #475569; line-height: 1.65; white-space: pre-line; }
`;
