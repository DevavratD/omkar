'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, UserAnswer } from '@/types';
import { submitAptitude } from '../actions';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, ChevronLeft, BrainCircuit, UserCircle, Target } from 'lucide-react';

interface AptitudeFlowProps {
  testId: string;
  questions: Question[];
}

export default function AptitudeFlow({ testId, questions }: AptitudeFlowProps) {
  const router = useRouter();
  
  const metaQuestions = questions.filter(q => q.type === 'meta');
  const aptitudeQuestions = questions.filter(q => q.type === 'aptitude');

  // States: profile -> meta_tests (if any) -> intro -> testing -> submitting
  const [testState, setTestState] = useState<'profile_setup' | 'meta_testing' | 'intro' | 'testing' | 'submitting'>('profile_setup');
  
  const [currentMetaIndex, setCurrentMetaIndex] = useState(0);
  const [currentAptIndex, setCurrentAptIndex] = useState(0);

  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [profile, setProfile] = useState({ name: '', phone: '', age: '', grade: '' });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (testState === 'intro') {
      const imageUrls = aptitudeQuestions.filter(q => q.image_url).map(q => q.image_url as string);
      imageUrls.forEach(url => {
        const img = new window.Image();
        img.src = url;
      });
    }
  }, [testState, aptitudeQuestions]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testState === 'testing' && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => (t !== null && t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testState, timeLeft]);

  useEffect(() => {
    if (testState === 'testing' && timeLeft === 0) {
      setTestState('submitting');
      submitAptitude(testId, answers, profile)
        .then(() => router.push(`/success`))
        .catch(() => {
          setTestState('testing');
          alert('There was an error auto-submitting. Please try again.');
        });
    }
  }, [timeLeft, testState, answers, profile, testId, router]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => [
      ...prev.filter(a => a.question_id !== questionId),
      { question_id: questionId, selected_option_id: optionId }
    ]);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ----- RENDERING: Profile Setup -----
  if (testState === 'profile_setup') {
    const isProfileComplete = profile.name.trim() && profile.phone.trim() && profile.age.trim() && profile.grade.trim();
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-16 md:pt-24 px-6">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-slate-50 border border-slate-200 px-8 py-6 rounded-3xl flex items-center justify-between mb-12 shadow-sm">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center">
              <UserCircle className="w-6 h-6 mr-4 text-emerald-600" /> Candidate Profile
            </h1>
          </div>
          <div className="px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Tell us about yourself</h2>
            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
              Please provide your basic details to personalize your aptitude diagnostic report.
            </p>
            <div className="space-y-8 mb-12">
              <div>
                <label className="block text-base md:text-lg font-bold text-slate-700 mb-3">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full text-lg border-2 border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all shadow-sm bg-slate-50 hover:bg-white focus:bg-white" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                 <input type="tel" placeholder="+1 234 567 8900" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                  <input type="number" placeholder="e.g. 16" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Class / Grade</label>
                  <input type="text" placeholder="e.g. 11th Grade" className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start pt-10 border-t border-slate-100">
               <button
                 disabled={!isProfileComplete}
                 onClick={() => setTestState(metaQuestions.length > 0 ? 'meta_testing' : 'intro')}
                 className={`font-bold text-lg px-10 py-4 rounded-xl transition-all flex items-center ${isProfileComplete ? 'bg-emerald-600 text-white hover:-translate-y-0.5 shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}
               >
                 Next Steps <ChevronRight className="ml-2 w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----- RENDERING: Meta Profiling -----
  if (testState === 'meta_testing' && metaQuestions.length > 0) {
    const currentQ = metaQuestions[currentMetaIndex];
    const currentAns = answers.find(a => a.question_id === currentQ.id);
    const progress = (currentMetaIndex / metaQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <div className="w-full h-2 bg-slate-200 shrink-0">
          <div className="h-full bg-slate-800 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 w-full">
          <div className="w-full max-w-3xl mx-auto">
            <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center">
              <Target className="w-5 h-5 mr-3 text-slate-700" /> Profiling Matrix
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight">{currentQ.question_text}</h2>
            <div className="space-y-4 mb-10">
              {currentQ.options.map(option => {
                const isSelected = currentAns?.selected_option_id === option.id;
                return (
                  <button key={option.id} onClick={() => handleSelectOption(currentQ.id, option.id)} className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all ${isSelected ? 'border-slate-800 bg-slate-800 text-white shadow-lg' : 'border-slate-300 hover:border-slate-800 bg-white text-slate-700'}`}>
                    <span className="text-lg md:text-xl font-bold">{option.text}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
               <button onClick={() => { if (currentMetaIndex > 0) setCurrentMetaIndex(currentMetaIndex - 1); else setTestState('profile_setup'); }} className="flex items-center px-6 py-3 rounded-xl font-bold text-lg text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 shadow-sm"><ChevronLeft className="w-5 h-5 mr-2" /> Previous</button>
               <button disabled={!currentAns} onClick={() => { if (currentMetaIndex < metaQuestions.length - 1) setCurrentMetaIndex(currentMetaIndex + 1); else setTestState('intro'); }} className={`flex items-center px-8 py-3 rounded-xl font-bold text-lg transition-all ${!currentAns ? 'text-white bg-slate-300 cursor-not-allowed' : 'text-white bg-slate-900 hover:bg-slate-800 shadow-md'}`}>Next <ChevronRight className="w-5 h-5 ml-2" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----- RENDERING: Intro & Rules -----
  if (testState === 'intro') {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col pt-16 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-emerald-50 border border-emerald-100 px-8 py-6 rounded-3xl flex items-center justify-between mb-12 shadow-sm">
            <h1 className="text-2xl font-bold text-emerald-900 flex items-center"><BrainCircuit className="w-6 h-6 mr-4 text-emerald-600" /> Cognitive Aptitude Assessment</h1>
          </div>
          <div className="px-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">Before You Begin</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl">This module evaluates logical, analytical, spatial, and numerical reasoning. Ensure you are in a quiet environment.</p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex items-start">
              <AlertCircle className="w-6 h-6 text-emerald-600 shrink-0 mr-4 mt-0.5" />
              <div>
                <ul className="space-y-3 text-slate-700 font-medium">
                  <li>• Focus completely. You will be evaluated on accuracy and reasoning.</li>
                  <li>• Read each question carefully before selecting an option.</li>
                  <li>• There is an overall time limit of 40 minutes for the aptitude section.</li>
                  <li>• Do not refresh your browser during the test.</li>
                </ul>
              </div>
            </div>
             <button onClick={() => { setTimeLeft(40 * 60); setTestState('testing'); }} className="mt-6 bg-emerald-600 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all flex items-center">Start Timer & Begin <ChevronRight className="ml-2 w-5 h-5" /></button>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'submitting') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 border-8 border-slate-100 border-t-emerald-600 rounded-full animate-spin shadow-lg mb-12" />
        <h2 className="text-4xl font-black text-slate-900 mb-6">Processing Aptitude Data</h2>
      </div>
    );
  }

  // ----- RENDERING: Testing Flow -----
  const currentQ = aptitudeQuestions[currentAptIndex];
  const progress = (currentAptIndex / aptitudeQuestions.length) * 100;
  const currentAns = answers.find(a => a.question_id === currentQ?.id);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-emerald-100/50">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-5 flex items-center justify-between shadow-sm">
        <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest">Aptitude Component</div>
        <div className="flex items-center space-x-6">
          <div className="text-lg font-medium text-slate-500">Question <span className="text-slate-900 font-bold ml-1">{currentAptIndex + 1}</span> / {aptitudeQuestions.length}</div>
          <div className={`flex items-center text-xl font-mono font-bold px-6 py-2 rounded-xl transition-colors ${timeLeft !== null && timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
            <Clock className="w-6 h-6 mr-3" /> {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-100"><div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} /></div>
      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 w-full">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-10 leading-[1.25] tracking-tight">{currentQ.question_text}</h2>
          {currentQ.image_url && <div className="mb-10 flex justify-center bg-slate-50 border border-slate-200 rounded-3xl p-6"><img src={currentQ.image_url} alt="Question Diagram" className="max-h-[350px] mix-blend-multiply" /></div>}
          <div className="space-y-4">
            {currentQ.options.map(o => {
              const isSelected = currentAns?.selected_option_id === o.id;
              return (
              <button key={o.id} onClick={() => handleSelectOption(currentQ.id, o.id)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex justify-between ${isSelected ? 'border-emerald-500 bg-emerald-50 shadow-md text-emerald-900' : 'border-slate-200 hover:border-emerald-500 text-slate-700'}`}>
                <div className="text-xl font-medium flex-1">
                  {o.text.startsWith('/images/visual') ? (
                    <img src={o.text} alt="Option Element" className="h-32 w-auto object-contain mix-blend-multiply inline-block" />
                  ) : (
                    o.text
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${isSelected ? 'border-emerald-500' : 'border-slate-300'}`}><div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-emerald-500' : ''}`} /></div>
              </button>
            )})}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => { if (currentAptIndex > 0) setCurrentAptIndex(currentAptIndex - 1); else setTestState('intro'); }} className="flex items-center px-6 py-3 rounded-xl font-bold text-lg border-2 border-slate-200 hover:bg-slate-50 shadow-sm"><ChevronLeft className="w-5 h-5 mr-2" /> Previous</button>
            <button disabled={!currentAns} onClick={async () => { if (currentAptIndex < aptitudeQuestions.length - 1) setCurrentAptIndex(currentAptIndex + 1); else { setTestState('submitting'); await submitAptitude(testId, answers, profile); router.push('/success'); } }} className={`flex items-center px-8 py-3 rounded-xl font-bold text-lg shadow-sm ${!currentAns ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30'}`}>{currentAptIndex === aptitudeQuestions.length - 1 ? <>Submit <CheckCircle2 className="w-5 h-5 ml-2" /></> : <>Next <ChevronRight className="w-5 h-5 ml-2" /></>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
