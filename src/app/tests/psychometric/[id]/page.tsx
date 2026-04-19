import PsychometricClientWrapper from './PsychometricClientWrapper';
import { fetchQuestionsForTest } from '@/lib/fetch-questions';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export default async function PsychometricTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const questions = await fetchQuestionsForTest(id);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-slate-800">Test Not Provisioned</h1>
          <p className="text-slate-500 max-w-md">No questions found for module {id}. Please check back later.</p>
        </div>
      </div>
    );
  }

  // STRICT ISOLATION: Provide psychometric questions along with profiling meta questions
  const psychometricQuestions = questions.filter(q => q.type === 'psychometric' || q.type === 'meta');

  if (psychometricQuestions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-slate-800">Test Configuration Error</h1>
          <p className="text-slate-500 max-w-md">No psychometric questions found in the database. Please run the seeder.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <PsychometricClientWrapper testId={id} questions={psychometricQuestions} />
    </main>
  );
}
