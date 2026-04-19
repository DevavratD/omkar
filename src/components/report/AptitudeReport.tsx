'use client';

import { CheckCircle, AlertTriangle, Target, BrainCircuit, BarChart3 } from 'lucide-react';

interface AptitudeReportProps {
  report: any;
}

// ─── Band Color ───────────────────────────────────────────────────────────────

function bandColor(band: string): string {
  switch (band) {
    case 'Very Strong': return 'bg-emerald-600 text-white';
    case 'Strong': return 'bg-emerald-100 text-emerald-800';
    case 'Emerging': return 'bg-blue-100 text-blue-800';
    case 'Needs Development': return 'bg-amber-100 text-amber-800';
    default: return 'bg-slate-100 text-slate-500';
  }
}

function fitColor(fit: string): string {
  switch (fit) {
    case 'Strong Fit': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Good Fit': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Possible Fit': return 'bg-amber-100 text-amber-800 border-amber-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AptitudeReport({ report }: AptitudeReportProps) {
  // ── New engine format ──
  const isNewFormat = 'aptitude_summary' in report;

  if (isNewFormat) {
    const r = report as any;
    return (
      <div className="space-y-8">
        {/* Aptitude Summary */}
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <BrainCircuit className="w-5 h-5 text-emerald-300 mr-3" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-300">Cognitive Profile</h2>
            </div>
            <p className="text-lg font-medium text-slate-100 leading-relaxed">{r.aptitude_summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" /> Strengths
            </h3>
            <ul className="space-y-4">
              {(r.strengths || []).map((s: any) => (
                <li key={s.construct} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="font-bold text-slate-800 mb-1">{s.construct}</p>
                  <p className="text-sm text-slate-600">{s.explanation}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvement Areas */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 mr-3" /> Focus Areas
            </h3>
            <ul className="space-y-4">
              {(r.improvement_areas || []).map((i: any) => (
                <li key={i.construct} className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <p className="font-bold text-amber-900 mb-1">{i.construct}</p>
                  <p className="text-sm text-amber-800">{i.suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ability Scores */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
            <BarChart3 className="w-5 h-5 text-indigo-500 mr-3" /> Detailed Abilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(r.ability_scores || []).map((item: any) => (
              <div key={item.construct} className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.construct}</p>
                  <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-2">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${item.normalized}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ml-4 ${bandColor(item.band)}`}>
                  {item.band}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Aptitude-Aligned Domains */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
            <Target className="w-5 h-5 text-purple-500 mr-3" /> Aptitude-Aligned Domains
          </h3>
          <div className="space-y-4">
            {(r.aptitude_aligned_domains || []).map((d: any, i: number) => (
              <div key={d.domain} className={`border rounded-2xl p-5 ${fitColor(d.fit)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-black opacity-50">#{i + 1}</span>
                    <span className="font-bold text-base">{d.domain}</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border bg-white/50">{d.fit}</span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">{d.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Legacy format fallback ──
  if (!report || report.module !== 'Aptitude Assessment') {
    return <div className="p-8 text-center text-red-500">Invalid Aptitude Report Format.</div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-3xl font-black text-slate-900">{report.module}</h2>
        <p className="text-slate-500 mt-2">{report.summary}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Top Strengths</h3>
        <ul className="list-disc pl-5 mb-8">
          {(report.strengths || []).map((s: string) => <li key={s} className="capitalize">{s.replace(/_/g, ' ')}</li>)}
        </ul>
      </div>
    </div>
  );
}
