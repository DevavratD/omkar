import Link from 'next/link';
import { Compass, Sparkles, BrainCircuit, ActivitySquare } from 'lucide-react';

export default function Home() {
  const tests = [
    { 
      id: 'aptitude', 
      name: 'Aptitude Test', 
      desc: 'Evaluate logical, analytical, spatial, and numerical reasoning through cognitive challenges. Get skill-wise breakdowns and cognitive-based career targets.', 
      icon: <BrainCircuit className="w-10 h-10 text-emerald-600" />,
      glowColor: 'bg-emerald-500/10 text-emerald-600',
      href: '/tests/aptitude',
    },
    { 
      id: 'psychometric', 
      name: 'Psychometric Test', 
      desc: 'Discover core personality traits, behavioral styles, and workplace preferences. Geared towards determining your natural professional alignments.', 
      icon: <ActivitySquare className="w-10 h-10 text-indigo-600" />,
      glowColor: 'bg-indigo-500/10 text-indigo-600',
      href: '/tests/psychometric',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-blue-100/50">
      
      {/* VIBRANT HERO SECTION */}
      <section className="relative overflow-hidden min-h-[70vh] flex flex-col justify-center items-center pt-16 pb-20">
        {/* Animated Background Mesh Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-300 rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[0%] w-[60%] h-[60%] bg-indigo-300 rounded-full blur-[140px] opacity-30 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-10">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md text-slate-700 rounded-full px-6 py-2.5 text-sm font-semibold border border-white/40 shadow-sm mx-auto hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Omkar Career Counseling</span>
          </div>
          
          {/* Massive Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter text-slate-900 leading-[1.1]">
            Standardized <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
              Testing Environment
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium leading-relaxed">
            Select the designated module to proceed. Each module functions entirely independently with exclusive diagnostic reporting.
          </p>
          
        </div>
      </section>

      {/* PREMIUM GLASSMORPHIC CARDS */}
      <section className="max-w-[70rem] mx-auto px-6 lg:px-8 -mt-16 relative z-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tests.map(test => (
            <Link 
              key={test.id} 
              href={test.href}
              className="group flex flex-col items-start p-10 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Card internal gradient glow on hover */}
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
              
              <div className="flex items-center text-lg font-bold text-slate-900 mt-auto relative z-10 group-hover:text-indigo-600 transition-colors">
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center mr-4 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-colors duration-300">
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
                Open Module
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
