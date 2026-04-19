'use client';

import { useState } from 'react';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

interface AccessGuardProps {
  testType: 'aptitude' | 'psychometric';
  onUnlock: () => void;
}

export default function AccessGuard({ testType, onUnlock }: AccessGuardProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple environment-based password check
    // If running in browser and env variables aren't exposed cleanly, 
    // we use a hardcoded fallback just for demo purposes if nothing is set.
    const expectedAptitude = process.env.NEXT_PUBLIC_APTITUDE_CODE || 'aptitude123';
    const expectedPsychometric = process.env.NEXT_PUBLIC_PSYCHOMETRIC_CODE || 'psych123';

    if (testType === 'aptitude' && password === expectedAptitude) {
      onUnlock();
    } else if (testType === 'psychometric' && password === expectedPsychometric) {
      onUnlock();
    } else {
      setError('Incorrect access code. Please ask your counselor for the correct code.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
        
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border-4 border-blue-100 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 text-center mb-2 tracking-tight">
          Module Locked
        </h1>
        <p className="text-slate-500 text-center mb-8 font-medium">
          Please enter the official counselor access code to begin the {testType === 'aptitude' ? 'Cognitive Assessment' : 'Psychometric Evaluation'}.
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start text-sm font-semibold">
            <ShieldAlert className="w-5 h-5 mr-3 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full text-lg border-2 border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-center tracking-widest font-mono"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!password.trim()}
            className="w-full bg-blue-600 text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock Session <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>
        
        <p className="text-xs text-center text-slate-400 mt-8 font-medium uppercase tracking-wider">
          Testing Environment Protected
        </p>

      </div>
    </div>
  );
}
