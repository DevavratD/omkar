import Link from 'next/link';
import { Target, Compass, Briefcase, Puzzle, Shapes } from 'lucide-react';

export default function PsychometricSelection() {
  const tests = [
    { 
      id: '2-4', 
      name: 'Classes 2–4', 
      desc: 'Discover early behavioral patterns and interests.', 
      icon: <Puzzle className="w-10 h-10 text-rose-600" />,
      glowColor: 'bg-rose-500/10 text-rose-600'
    },
    { 
      id: '5-7', 
      name: 'Classes 5–7', 
      desc: 'Explore developing personality traits and teamwork styles.', 
      icon: <Shapes className="w-10 h-10 text-amber-600" />,
      glowColor: 'bg-amber-500/10 text-amber-600'
    },
    { 
      id: '8-10', 
      name: 'Classes 8–10', 
      desc: 'Discover foundational personality traits and interests.', 
      icon: <Compass className="w-10 h-10 text-indigo-600" />,
      glowColor: 'bg-indigo-500/10 text-indigo-600'
    },
    { 
      id: '11-12', 
      name: 'Classes 11–12', 
      desc: 'Advanced psychometric evaluation for career trajectories.', 
      icon: <Target className="w-10 h-10 text-purple-600" />,
      glowColor: 'bg-purple-500/10 text-purple-600'
    },
    { 
      id: 'professional', 
      name: 'Professionals', 
      desc: 'Analyze workplace behaviors and professional alignment.', 
      icon: <Briefcase className="w-10 h-10 text-blue-600" />,
      glowColor: 'bg-blue-500/10 text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-indigo-100/50 pt-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 text-center">
          Psychometric Evaluation
        </h1>
        <p className="text-xl text-slate-500 text-center mb-16 font-medium">
          Select your current level to begin the behavioral and personality profile.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map(test => (
            <Link 
              key={test.id} 
              href={`/tests/psychometric/${test.id}`}
              className="group flex flex-col items-start p-10 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className={`p-6 rounded-3xl mb-8 transition-transform duration-500 group-hover:scale-110 shadow-sm ${test.glowColor} bg-white border border-white/50 relative z-10`}>
                {test.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight relative z-10 group-hover:text-indigo-700 transition-colors duration-300">
                {test.name}
              </h3>
              <p className="text-slate-600 text-[17px] leading-relaxed mb-10 flex-grow font-medium relative z-10">
                {test.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
