import Link from 'next/link';
import { CheckCircle2, Home } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-emerald-500/10 border-2 border-emerald-100 max-w-2xl w-full flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-400/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-emerald-200">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
            Assessment Submitted
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-lg">
            Thank you for completing the psychometric and cognitive evaluation. Your responses have been successfully recorded and sent to the administration team for review.
          </p>

          <Link
            href="/"
            className="bg-slate-900 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all focus:ring-4 focus:ring-slate-300 flex items-center"
          >
            <Home className="w-5 h-5 mr-3" />
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
