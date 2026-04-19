'use client';

import { useState } from 'react';
import AccessGuard from '@/components/AccessGuard';
import AptitudeFlow from './AptitudeFlow';
import { Question } from '@/types';

interface WrapperProps {
  testId: string;
  questions: Question[];
}

export default function AptitudeClientWrapper({ testId, questions }: WrapperProps) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <AccessGuard testType="aptitude" onUnlock={() => setUnlocked(true)} />;
  }

  return <AptitudeFlow testId={testId} questions={questions} />;
}
