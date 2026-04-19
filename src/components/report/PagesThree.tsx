import React from 'react';
import { ReportPage, ReportHeader, ReportFooter, ReportSection } from './ReportWrapper';
import { SingleBar } from './Charts';

// PAGE 7: CAREER CLUSTERS
export const ClustersPage = ({ name, date, clusters }: { name: string, date: string, clusters: any[] }) => {
  const topCluster = clusters[0]?.name || 'Exploration';

  return (
    <ReportPage>
      <ReportHeader name={name} date={date} />
      
      <ReportSection title="Career Clusters (Macro Fit)">
        <p className="text-sm text-gray-700 leading-relaxed mb-8">
          Career clusters are broad groupings of occupations and industries based on commonalities. You match most strongly with the fields yielding the highest macro-scores below.
        </p>

        <div className="bg-[#F5F7FA] p-8 border border-gray-200 rounded-xl mb-12 shadow-sm">
          <h3 className="text-xl font-bold text-[#0F6D6D] border-b pb-4 mb-8">Cluster Affinity Ranking</h3>
          {clusters.slice(0, 5).map((c: any, i: number) => (
            <SingleBar 
              key={c.name} 
              label={c.name} 
              score={c.score} 
              colorHex={i === 0 ? '#2ECC71' : i === 1 ? '#2E86C1' : '#94A3B8'} 
              rightLabel={i === 0 ? 'TOP MATCH' : ''}
            />
          ))}
        </div>

        <div className="bg-slate-50 text-slate-900 border border-slate-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
          <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-2 font-bold">Highest Structural Alignment</h4>
          <h2 className="text-3xl font-black mb-4 text-slate-800">{topCluster}</h2>
          <p className="text-sm leading-relaxed max-w-md text-slate-600">
            This sector aligns perfectly with your combined psychological temperament, vocational interests, and cognitive skill baseline.
          </p>
        </div>
      </ReportSection>

      <ReportFooter />
    </ReportPage>
  );
};

// PAGE 8: CAREER PATHS (MICRO)
export const CareerPathsPage = ({ name, date, paths, narrative }: { name: string, date: string, paths: any[], narrative: any }) => {
  const top6 = paths.slice(0, 6);
  const bestFit = top6[0]?.name || 'General Management';

  return (
    <ReportPage>
      <ReportHeader name={name} date={date} />
      
      <ReportSection title="Actionable Career Paths">
        <p className="text-sm text-gray-700 leading-relaxed mb-8">
          Extracting specific vocational roles mapped mathematically against your personal metrics. Green paths represent immediate alignment, while Yellow fields warrant exploration.
        </p>

        <table className="w-full text-left border-collapse mb-10 shadow-sm text-sm">
          <thead>
            <tr>
              <th className="bg-slate-50 text-slate-700 p-3 border border-slate-200 rounded-tl-lg font-bold w-2/5">Career Path</th>
              <th className="bg-slate-50 text-slate-700 p-3 border border-slate-200 text-center font-bold">Psy Fit</th>
              <th className="bg-slate-50 text-slate-700 p-3 border border-slate-200 text-center font-bold">Skill Fit</th>
              <th className="bg-slate-50 text-slate-700 p-3 border border-slate-200 rounded-tr-lg text-center font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {top6.map((path, idx) => {
              const hl = path.match_decision === 'Good Fit' ? 'bg-[#2ECC71]/10 text-[#27ae60]' : path.match_decision === 'Moderate Fit' ? 'bg-[#F39C12]/10 text-[#d35400]' : 'bg-[#E74C3C]/10 text-[#c0392b]';
              return (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 border-b border-gray-200 font-bold text-[#2C3E50]">{path.name}</td>
                  <td className="p-3 border-b border-gray-200 text-center font-semibold text-gray-700">{!isFinite(path.psy_score) ? 0 : Math.round(path.psy_score)}%</td>
                  <td className="p-3 border-b border-gray-200 text-center font-semibold text-gray-700">{!isFinite(path.skill_score) ? 0 : Math.round(path.skill_score)}%</td>
                  <td className="p-3 border-b border-gray-200 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${hl.replace('/10', '/30')}`}>{path.match_decision}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="bg-slate-50 text-slate-900 p-8 rounded-xl flex items-start gap-6 border-l-8 border-[#2ECC71] shadow-sm border border-slate-200">
          <div className="flex-1">
            <h4 className="uppercase text-[10px] tracking-widest text-slate-500 font-bold mb-2">Primary Recommendation</h4>
            <h3 className="text-3xl font-black text-[#2ECC71] mb-2">{bestFit}</h3>
            <p className="text-[13px] p-5 bg-white border border-slate-200 rounded-xl mt-3 leading-relaxed text-slate-700 whitespace-pre-wrap text-justify shadow-sm">
              {narrative?.career || `Based on empirical psychometric clustering, pursuing a trajectory towards ${bestFit} offers the highest probability of long-term job satisfaction.`}
            </p>
          </div>
        </div>
      </ReportSection>

      <ReportFooter />
    </ReportPage>
  );
};

// PAGE 9: SUBJECTS & GAPS
export const SubjectAndGapPage = ({ name, date, subjects, gaps, narrative }: { name: string, date: string, subjects: any[], gaps: any[], narrative: any }) => {
  const topSubject = subjects[0]?.stream || 'General Studies';
  
  // Extract unique gaps from array of strings (the user's updated scoring logic)
  // `gaps` comes in as [{ career: "...", gaps: ["To improve your overall career fit..."] }]
  const rawDesc = gaps[0]?.gaps[0] || "";
  const colonParts = rawDesc.split(': ');
  const weakAreas = colonParts.length > 1 ? colonParts[1].split('.')[0].split(', ') : ['Verbal', 'Logical'];
  
  const narrativeGapArray = narrative?.gaps || [];

  return (
    <ReportPage>
      <ReportHeader name={name} date={date} />
      
      <ReportSection title="Academic Stream Recommendation">
        <p className="text-[13px] text-[#2C3E50] leading-relaxed mb-5 whitespace-pre-wrap p-5 bg-[#0F6D6D]/5 rounded-xl border border-[#0F6D6D]/20 font-medium text-justify">
          {narrative?.subject || 'This aligns with your current abilities and interest orientation.'}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {subjects.map((sub: any, idx: number) => (
            <div key={idx} className={`p-6 rounded-xl border ${idx === 0 ? 'border-[#0F6D6D] bg-[#0F6D6D]/5' : 'border-gray-200 bg-white'} shadow-sm flex flex-col`}>
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <span className={`font-bold text-lg ${idx === 0 ? 'text-[#0F6D6D]' : 'text-[#2C3E50]'}`}>{sub.stream}</span>
                <span className={`font-black text-xl ${idx === 0 ? 'text-[#2ECC71]' : 'text-gray-400'}`}>{Math.round(sub.score)}%</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4 flex-1">
                {idx === 0 && <li className="text-[#0F6D6D] font-bold">Top Match for your profile</li>}
                <li>Core foundations aligned with cluster scores</li>
                <li>Required progression for recommended career tracks</li>
              </ul>
            </div>
          ))}
        </div>
      </ReportSection>

      <ReportSection title="Gap Analysis & Skill Development Plan">
        <p className="text-sm text-gray-700 leading-relaxed mb-5">
          To successfully transition into your primary career tracks, you must address specific cognitive and behavioral deficiencies.
        </p>
        
        <div className="bg-[#E74C3C]/5 border border-[#E74C3C]/20 p-6 rounded-xl mb-6">
          <h4 className="text-[#E74C3C] font-black text-lg mb-3 uppercase tracking-widest border-b border-[#E74C3C]/20 pb-2 flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#E74C3C] mr-3"></span> Critical Deficits
          </h4>
          <p className="text-[13px] text-[#2C3E50] font-medium leading-relaxed whitespace-pre-wrap text-justify">
            {narrative?.gap || 'You possess a highly optimized competency baseline for your targeted roles. Protect this advantage.'}
          </p>
        </div>

      </ReportSection>

      <ReportFooter />
    </ReportPage>
  );
};
