'use client';

import React from 'react';

// The universal A4 wrapper that forces precise pagination on print
export const ReportPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="report-page relative bg-white mx-auto overflow-hidden text-[#2C3E50]" style={{ width: '210mm', height: '297mm', padding: '20mm', pageBreakAfter: 'always' }}>
      {children}
    </div>
  );
};

export const ReportHeader = ({ name, date }: { name: string, date: string }) => {
  return (
    <div className="flex justify-between items-center border-b-[2px] border-slate-200 pb-3 mb-8 w-full">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
          <span className="text-slate-800 font-bold text-xs">B</span>
        </div>
        <span className="text-slate-900 font-bold text-lg tracking-tight">Omkar</span>
      </div>
      <div className="text-center absolute left-0 right-0 pointer-events-none">
        <h1 className="text-slate-800 text-2xl font-bold uppercase tracking-widest">Career Report</h1>
      </div>
      <div className="text-right">
        <div className="text-[12px] font-bold text-[#2C3E50]">{name}</div>
        <div className="text-[10px] text-gray-500">{date}</div>
      </div>
    </div>
  );
};

export const ReportFooter = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-slate-50 border-t border-slate-200 text-slate-500 text-center py-2 text-[10px] uppercase tracking-wider font-semibold">
      Omkar Counseling Center • Generated via Psychometric Engine
    </div>
  );
};

export const ReportSection = ({ title, children, className = '' }: { title: string, children: React.ReactNode, className?: string }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className="text-[18px] font-semibold border-l-4 pl-3 border-slate-300 text-slate-800 uppercase tracking-wider mb-5">
        {title}
      </h2>
      <div className="text-[12px] leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  );
};
