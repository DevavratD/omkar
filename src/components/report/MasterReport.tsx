'use client';

import PsychometricReport from './PsychometricReport';
import AptitudeReport from './AptitudeReport';
import PdfDownloadButtons from './PdfDownloadButtons';

interface MasterReportProps {
  report: any;
  user: { name: string; date: string };
  resultId?: string;
}

export default function MasterReport({ report, user, resultId }: MasterReportProps) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-12">
          <h1 className="text-2xl font-bold text-slate-700 mb-3">Report Not Available</h1>
          <p className="text-slate-500">This result does not have a generated report.</p>
        </div>
      </div>
    );
  }

  // Detect report type by checking key fields
  const isPsychometric =
    'career_orientation_summary' in report ||
    report.module === 'Psychometric Assessment';

  const isAptitude =
    'aptitude_summary' in report ||
    report.module === 'Aptitude Assessment';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Omkar Career Counseling
          </p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {isPsychometric ? 'Psychometric Assessment Report' : 'Aptitude Assessment Report'}
          </h1>
          <p className="text-slate-500 mt-3">
            {user.name && user.name !== 'Candidate Profile' ? `Prepared for ${user.name}` : 'Candidate Report'} • {user.date}
          </p>
        </div>

        {isPsychometric && <PsychometricReport report={report} />}
        {isAptitude && <AptitudeReport report={report} />}

        {!isPsychometric && !isAptitude && (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
            <p className="text-slate-500 font-medium">Unknown report format. Raw data:</p>
            <pre className="mt-4 text-left text-xs text-slate-600 bg-slate-50 rounded-xl p-4 overflow-auto max-h-96">
              {JSON.stringify(report, null, 2)}
            </pre>
          </div>
        )}

        {/* Download Buttons */}
        {resultId && (
          <div className="text-center print:hidden pb-8 space-y-4">
            <p className="text-sm text-slate-400 font-medium">Download professional PDF reports</p>
            <PdfDownloadButtons
              resultId={resultId}
              reportType={isPsychometric ? 'psychometric' : isAptitude ? 'aptitude' : 'both'}
              candidateName={user.name !== 'Candidate Profile' ? user.name : undefined}
            />
          </div>
        )}
        {!resultId && (
          <div className="text-center print:hidden pb-8">
            <button
              onClick={() => window.print()}
              className="bg-slate-900 text-white font-bold px-10 py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
            >
              Print / Save as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
