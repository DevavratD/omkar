'use client';

import { ActivitySquare, Fingerprint, Layers, Compass, ShieldCheck, ShieldAlert, TrendingUp } from 'lucide-react';

interface PsychometricReportProps {
  report: any;
}

// ─── Band Color ───────────────────────────────────────────────────────────────

function bandColor(band: string): string {
  switch (band) {
    case 'Strong Preference': return 'bg-indigo-600 text-white';
    case 'Clear Preference': return 'bg-indigo-100 text-indigo-800';
    case 'Balanced': return 'bg-slate-100 text-slate-700';
    default: return 'bg-slate-50 text-slate-500';
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

export default function PsychometricReport({ report }: PsychometricReportProps) {
  // ── New engine format ──
  const isNewFormat = 'career_orientation_summary' in report;

  if (isNewFormat) {
    const r = report as any;
    return (
      <div className="space-y-8">

        {/* Reliability Flag */}
        {r.reliability_flag === 'LOW' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center space-x-4">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
            <p className="text-amber-800 font-semibold text-sm">
              Response consistency was flagged as low. Results should be interpreted with caution.
            </p>
          </div>
        )}
        {r.reliability_flag === 'OK' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-emerald-800 font-medium text-sm">Response consistency: Verified ✓</p>
          </div>
        )}

        {/* Career Orientation Summary */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <ActivitySquare className="w-5 h-5 text-indigo-300 mr-3" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-300">Career Orientation</h2>
            </div>
            <p className="text-lg font-medium text-slate-100 leading-relaxed">{r.career_orientation_summary}</p>
          </div>
        </div>

        {/* Work Style Profile */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
            <Layers className="w-5 h-5 text-indigo-500 mr-3" /> Work-Style Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(r.work_style_profile || []).map((item: any) => (
              <div key={item.construct} className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{item.construct}</p>
                  <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-2">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
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

        {/* Interest Profile (RIASEC) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
            <Fingerprint className="w-5 h-5 text-purple-500 mr-3" /> Interest Profile (RIASEC)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(r.interest_profile || {}).map(([name, score]: [string, any]) => (
              <div key={name} className="bg-slate-50 rounded-2xl border border-slate-100 p-4 text-center">
                <p className="text-2xl font-black text-indigo-600">{score}%</p>
                <p className="text-xs font-bold text-slate-600 mt-1">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Career Domains */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
            <Compass className="w-5 h-5 text-emerald-500 mr-3" /> Top Career Domains
          </h3>
          <div className="space-y-4">
            {(r.top_career_domains || []).map((d: any, i: number) => (
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

        {/* Work Environment Fit */}
        {r.work_environment_fit && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Work Environment Fit</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Structure</p>
                <p className="text-xl font-black text-indigo-800">{r.work_environment_fit.structure}</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Team Style</p>
                <p className="text-xl font-black text-indigo-800">{r.work_environment_fit.team}</p>
              </div>
            </div>
          </div>
        )}

        {/* Development Suggestions */}
        {r.development_suggestions?.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center mb-6 border-b border-slate-100 pb-4">
              <TrendingUp className="w-5 h-5 text-amber-500 mr-3" /> Development Suggestions
            </h3>
            <ul className="space-y-3">
              {r.development_suggestions.map((s: string, i: number) => (
                <li key={i} className="flex items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-1.5 shrink-0" />
                  <p className="text-sm text-amber-900 font-medium">{s}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // ── Legacy format fallback ──
  if (!report || report.module !== 'Psychometric Assessment') {
    return <div className="p-8 text-center text-red-500">Invalid Psychometric Report Format.</div>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-3xl font-black text-slate-900">{report.module}</h2>
        <p className="text-slate-500 mt-2">{report.summary}</p>
      </div>
      <div className="space-y-4">
        {(report.dominant_traits || []).map((trait: string) => (
          <div key={trait} className="bg-slate-50 rounded-xl p-4 flex justify-between">
            <span className="font-bold text-slate-700 capitalize">{trait.replace(/_/g, ' ')}</span>
            <span className="text-indigo-600 font-black">{report.traits_breakdown?.[trait] ?? 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
