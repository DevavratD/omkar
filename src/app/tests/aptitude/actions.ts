'use server';

import { UserAnswer, TestResult } from '@/types';
import { getQuestionsForTest, insertResult } from '@/lib/db';
import { scoreAptitude, generateAptitudeReport } from '@/lib/scoring';

export async function submitAptitude(testId: string, answers: UserAnswer[], profileData: any) {
  const liveQuestions = await getQuestionsForTest(testId);
  if (!liveQuestions || liveQuestions.length === 0) {
    throw new Error('Could not fetch test schema for mapping.');
  }

  // Build meta profiling data
  const extendedMeta: Record<string, string> = { ...profileData };
  for (const a of answers) {
    const q = liveQuestions.find(q => q.id === a.question_id);
    if (q?.type === 'meta') {
      const opt = q.options.find(o => o.id === a.selected_option_id);
      if (opt) extendedMeta[q.question_text] = opt.text;
    }
  }

  // Build aptitude answer inputs
  const aptAnswers = answers
    .filter(a => {
      const q = liveQuestions.find(q => q.id === a.question_id);
      return q?.type === 'aptitude';
    })
    .map(a => ({
      question_id: a.question_id,
      selected_option_id: a.selected_option_id,
    }));

  // Score
  const aptResult = scoreAptitude(liveQuestions, aptAnswers);

  // Build normalized scores record for DB storage
  const normalizedScores: Record<string, number> = {};
  for (const [key, val] of Object.entries(aptResult.construct_scores)) {
    normalizedScores[key] = val.normalized;
  }

  // Candidate info for report
  const candidateInfo: Record<string, string> = {
    name: profileData?.name ?? '',
    cohort: testId,
    ...extendedMeta,
  };

  // Generate structured report
  const report = generateAptitudeReport(aptResult, candidateInfo);

  const resultId = 'APT-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const newResult: TestResult = {
    id: resultId,
    test_id: testId,
    test_type: 'aptitude',
    answers,
    scores: normalizedScores as any,
    normalized_scores: normalizedScores as any,
    created_at: new Date().toISOString(),
    meta_data: { ...extendedMeta, aptResult },
    report,
  };

  await insertResult(newResult);
  return resultId;
}
