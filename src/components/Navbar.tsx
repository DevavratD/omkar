import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200/50 group-hover:shadow-md transition-shadow duration-300">
            <Image
              src="/logo.png"
              alt="Omkar Career Counseling Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-indigo-700 transition-colors duration-200">
            Omkar Career Counseling
          </span>
        </Link>

        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">
          Assessment Platform
        </div>
      </div>
    </header>
  );
}
