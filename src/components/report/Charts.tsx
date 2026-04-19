import React from 'react';

// DualBar exactly as specified for MBTI
export const DualBar = ({ leftLabel, rightLabel, leftVal, rightVal }: { leftLabel: string, rightLabel: string, leftVal: number, rightVal: number }) => {
  const total = (leftVal + rightVal) || 1;
  const leftPct = Math.round((leftVal / total) * 100);
  const rightPct = Math.round((rightVal / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-[11px] font-bold text-[#2C3E50] mb-2 px-1">
        <span>{leftLabel} ({leftPct}%)</span>
        <span>{rightLabel} ({rightPct}%)</span>
      </div>
      <div className="w-full flex h-4 rounded-full overflow-hidden border border-gray-200">
        {/* Left side: Accent Blue */}
        <div className="bg-[#2E86C1] h-full transition-all duration-500" style={{ width: `${leftPct}%` }} />
        {/* Right side: Neutral Gray to represent balance */}
        <div className="bg-gray-300 h-full transition-all duration-500" style={{ width: `${rightPct}%` }} />
      </div>
    </div>
  );
};

// SingleBar for RIASEC, Motivators, Skills (Horizontal)
export const SingleBar = ({ label, score, colorHex, rightLabel = '' }: { label: string, score: number, colorHex: string, rightLabel?: string }) => {
  return (
    <div className="mb-5 flex items-center">
      <div className="w-32 text-[11px] font-bold text-[#2C3E50] truncate pr-2">
        {label}
      </div>
      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200 relative">
        <div 
          className="h-full transition-all duration-500" 
          style={{ width: `${score}%`, backgroundColor: colorHex }} 
        />
      </div>
      <div className="w-24 text-right text-[11px] font-bold text-[#2C3E50] pl-2 flex justify-end gap-2">
        <span>{Math.round(score)}%</span>
        {rightLabel && <span className={`px-2 rounded-full text-[9px] text-white flex items-center bg-[${colorHex}]`} style={{backgroundColor: colorHex}}>{rightLabel}</span>}
      </div>
    </div>
  );
};
