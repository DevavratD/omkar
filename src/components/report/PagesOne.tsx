import React from 'react';
import { ReportPage, ReportHeader, ReportFooter, ReportSection } from './ReportWrapper';
import { DualBar, SingleBar } from './Charts';

// PAGE 1: COVER PAGE
export const CoverPage = ({ name, date }: { name: string, date: string }) => {
  return (
    <ReportPage>
      <div className="flex flex-col items-center justify-center h-[90%]" style={{ paddingTop: '80mm' }}>
        <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-10 shadow-sm">
          <span className="text-slate-800 font-black text-4xl">B</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 tracking-wider mb-4 uppercase">Career Report</h1>
        <h2 className="text-xl text-slate-500 font-semibold tracking-wide mb-16 uppercase">Candidate Assessment</h2>
        
        <div className="w-[80%] border-t border-b border-gray-200 py-8">
          <div className="flex flex-col space-y-4 items-center">
            <div className="text-lg">
              <span className="font-bold text-slate-600 w-32 inline-block text-right mr-4">Name:</span>
              <span className="text-slate-900 font-medium">{name}</span>
            </div>
            <div className="text-lg">
              <span className="font-bold text-slate-600 w-32 inline-block text-right mr-4">Date:</span>
              <span className="text-slate-900 font-medium">{date}</span>
            </div>
            <div className="text-lg">
              <span className="font-bold text-slate-600 w-32 inline-block text-right mr-4">Email:</span>
              <span className="text-slate-900 font-medium">{name.toLowerCase().replace(' ', '.')}@example.com</span>
            </div>
          </div>
        </div>
      </div>
      <ReportFooter />
    </ReportPage>
  );
};

// PAGE 2: PROFILING STAGE
export const ProfilingStagePage = ({ name, date, stage }: { name: string, date: string, stage: string }) => {
  const stages = ['Ignorant', 'Confused', 'Diffused', 'Methodical', 'Optimized'];
  const currentIndex = stages.indexOf(stage);

  return (
    <ReportPage>
      <ReportHeader name={name} date={date} />
      
      <ReportSection title="Career Profiling Stage Alignment" className="mt-16">
        <p className="text-sm mb-12 shadow-sm p-4 bg-[#F5F7FA] border-l-4 border-l-[#2E86C1] rounded-r-lg line-clamp-3">
          The profiling stage evaluates your current psychological mindset regarding your career goals. 
          A higher stage signifies deeper clarity, whereas lower stages require systematic exploration.
        </p>

        <div className="flex flex-col items-center justify-center py-10 my-10 border border-slate-200 rounded-2xl bg-white shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800 mb-12">Your Stage: <span className="text-slate-600">{stage}</span></h3>
          
          <div className="relative w-[90%] flex items-center justify-between mb-8 z-10">
            {/* The line connecting the nodes */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 -z-10">
              <div 
                className="h-full bg-[#2ECC71] transition-all" 
                style={{ width: `${(Math.max(0, currentIndex) / (stages.length - 1)) * 100}%` }}
              />
            </div>
            
            {/* The nodes */}
            {stages.map((st, idx) => {
              const isActive = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={st} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-white ${isCurrent ? 'border-[#E74C3C] border-8 w-10 h-10 shadow-lg' : isActive ? 'border-[#2ECC71]' : 'border-gray-300'}`}>
                    {isActive && !isCurrent && <div className="w-3 h-3 bg-[#2ECC71] rounded-full" />}
                  </div>
                  <span className={`text-xs mt-3 font-bold ${isCurrent ? 'text-[#E74C3C] text-sm' : isActive ? 'text-[#2C3E50]' : 'text-gray-400'}`}>{st}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 border rounded-xl p-8 bg-white shadow-sm border-slate-200">
          <h4 className="font-bold text-slate-800 text-xl mb-4">What does this mean?</h4>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">
            Being categorized as <strong className="text-slate-800">{stage}</strong> means you are currently operating with {stage === 'Optimized' ? 'immense clarity' : 'partial awareness'} regarding your ultimate vocational trajectory. This assessment acts as your compass to formalize your path forward.
          </p>
          <h4 className="font-bold text-slate-800 text-xl mb-4">Action Item</h4>
          <p className="text-slate-700 text-sm leading-relaxed">
            Review the Gap Analysis on Page 26 of this report carefully to address the immediate disconnects between your interests and aptitudes.
          </p>
        </div>
      </ReportSection>

      <ReportFooter />
    </ReportPage>
  );
};

// PAGE 3: PERSONALITY (MBTI)
export const PersonalityPage = ({ name, date, mbti, p, narrative }: { name: string, date: string, mbti: string, p: any, narrative: any }) => {
  return (
    <ReportPage>
      <ReportHeader name={name} date={date} />
      
      <ReportSection title="Personality Archetype (MBTI)">
        <div className="bg-slate-50 border border-slate-200 text-slate-900 p-6 rounded-2xl shadow-sm my-6 items-center justify-center flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-slate-500">Your Structural Type</h3>
          <div className="text-6xl font-black mb-3 tracking-tight drop-shadow-sm text-slate-800">{mbti}</div>
          <p className="text-slate-700 text-[13px] leading-relaxed max-w-2xl whitespace-pre-wrap text-justify">
            {narrative?.personality || 'An adaptive, multifaceted individual with strong dynamic traits.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-12 bg-[#F5F7FA] p-8 rounded-xl border border-gray-200">
          <div>
            <h4 className="text-md font-bold text-[#0F6D6D] mb-6">Psychological Dichotomies</h4>
            <DualBar leftLabel="Extroversion" rightLabel="Introversion" leftVal={p.extrovert || 0} rightVal={p.introvert || 0} />
            <DualBar leftLabel="Sensing" rightLabel="Intuition" leftVal={p.sensing || 0} rightVal={p.intuitive || 0} />
            <DualBar leftLabel="Thinking" rightLabel="Feeling" leftVal={p.thinking || 0} rightVal={p.feeling || 0} />
            <DualBar leftLabel="Judging" rightLabel="Perceiving" leftVal={p.judging || 0} rightVal={p.perceiving || 0} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="border-l-4 border-[#F39C12] pl-6 py-2">
              <h4 className="font-bold text-[#2C3E50] mb-2 text-lg">Impact on Career</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your strong leaning towards cognitive intuition and systematic judging makes you highly effective in structured problem-solving environments. Careers requiring intense analytical focus, long-term planning, and objective assessment align heavily with your baseline matrix.
              </p>
            </div>
          </div>
        </div>
      </ReportSection>

      <ReportFooter />
    </ReportPage>
  );
};
