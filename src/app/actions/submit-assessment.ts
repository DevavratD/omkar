'use server';

import { getResultById } from '@/lib/db';

export async function getResultData(id: string) {
  const result = await getResultById(id);
  return result ?? null;
}
