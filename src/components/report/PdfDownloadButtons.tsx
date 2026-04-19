'use client';

import { useState } from 'react';
import { Download, Loader2, FileText, Brain, Lightbulb } from 'lucide-react';

interface PdfDownloadButtonsProps {
  resultId: string;
  reportType: 'psychometric' | 'aptitude' | 'both';
  candidateName?: string;
}

type PdfType = 'psychometric' | 'aptitude' | 'insight';

interface ButtonState {
  loading: boolean;
  error: string | null;
}

export default function PdfDownloadButtons({
  resultId,
  reportType,
  candidateName = 'Candidate',
}: PdfDownloadButtonsProps) {
  const [states, setStates] = useState<Record<PdfType, ButtonState>>({
    psychometric: { loading: false, error: null },
    aptitude:     { loading: false, error: null },
    insight:      { loading: false, error: null },
  });

  const download = async (type: PdfType) => {
    setStates(prev => ({
      ...prev,
      [type]: { loading: true, error: null },
    }));

    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, resultId, candidateName }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `${type}-report-${resultId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStates(prev => ({ ...prev, [type]: { loading: false, error: null } }));
    } catch (err: any) {
      setStates(prev => ({
        ...prev,
        [type]: { loading: false, error: err.message || 'Failed' },
      }));
    }
  };

  const buttons: { type: PdfType; label: string; icon: React.ReactNode; color: string; show: boolean }[] = [
    {
      type:  'psychometric',
      label: 'Psychometric Report',
      icon:  <Brain className="w-4 h-4" />,
      color: 'from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700',
      show:  reportType === 'psychometric' || reportType === 'both',
    },
    {
      type:  'aptitude',
      label: 'Aptitude Report',
      icon:  <FileText className="w-4 h-4" />,
      color: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      show:  reportType === 'aptitude' || reportType === 'both',
    },
    {
      type:  'insight',
      label: 'Insight Summary',
      icon:  <Lightbulb className="w-4 h-4" />,
      color: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      show:  reportType === 'both',
    },
  ];

  const visible = buttons.filter(b => b.show);

  return (
    <div className="flex flex-wrap gap-3 justify-center print:hidden">
      {visible.map(btn => {
        const state = states[btn.type];
        return (
          <div key={btn.type} className="flex flex-col items-center gap-1">
            <button
              onClick={() => download(btn.type)}
              disabled={state.loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold
                bg-gradient-to-r ${btn.color} shadow-md transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {state.loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {btn.icon}
              {state.loading ? 'Generating…' : `Download ${btn.label}`}
            </button>
            {state.error && (
              <span className="text-xs text-red-500 font-medium">{state.error}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
