import { getResultById } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import AptitudeReport from '@/components/report/AptitudeReport';
import PsychometricReport from '@/components/report/PsychometricReport';

export const dynamic = 'force-dynamic';

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getResultById(id);

  if (!result || !result.report) {
    notFound();
  }

  // If it's a single test, bypass the UI and just stream the PDF directly!
  if (result.test_type === 'aptitude' || result.test_type === 'psychometric') {
    redirect(`/api/generate-pdf?id=${id}&type=${result.test_type}`);
  }

  // For combined tests, we offer a clean Download Hub
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-2">Reports Ready</h1>
        <p className="text-sm text-slate-500 mb-8">
          Your combined assessment generated multiple reports. Choose which one to view.
        </p>

        <div className="space-y-3">
          <a
            href={`/api/generate-pdf?id=${id}&type=insight`}
            target="_blank"
            className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Open Insight Summary
          </a>
          <a
            href={`/api/generate-pdf?id=${id}&type=psychometric`}
            target="_blank"
            className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Open Psychometric Report
          </a>
          <a
            href={`/api/generate-pdf?id=${id}&type=aptitude`}
            target="_blank"
            className="flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Open Aptitude Report
          </a>
        </div>
      </div>
    </div>
  );
}
