import { getQuestionsForTest as getQuestionsDb } from '@/lib/db';
import { Question } from '@/types';

export async function fetchQuestionsForTest(testId: string): Promise<Question[] | null> {
  try {
    const questions = await getQuestionsDb(testId);
    if (!questions || questions.length === 0) return null;
    return questions;
  } catch (err) {
    console.error('Failed to fetch questions from SQLite', err);
    return null;
  }
}
