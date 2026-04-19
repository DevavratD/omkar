'use client';

import { useState } from 'react';
import AccessGuard from '@/components/AccessGuard';
import PsychometricFlow from './PsychometricFlow';
import { Question } from '@/types';

interface WrapperProps {
  testId: string;
  questions: Question[];
}

export default function PsychometricClientWrapper({ testId, questions }: WrapperProps) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <AccessGuard testType="psychometric" onUnlock={() => setUnlocked(true)} />;
  }

  return <PsychometricFlow testId={testId} questions={questions} />;
}
