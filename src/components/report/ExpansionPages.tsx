import React from 'react';
import { ReportPage, ReportHeader, ReportFooter, ReportSection } from './ReportWrapper';
import { SingleBar, DualBar } from './Charts';

// ======================================
// 1. MBTI EXPANSION (4 PAGES)
// ======================================
export const MBTIDetailPages = ({ name, date, p }: { name: string, date: string, p: any }) => {
  const dimensions = [
    {
      title: 'Energy Orientation',
      left: { label: 'Extroversion (E)', val: p.extrovert || 0, desc: 'Draws energy from external stimuli, social interaction, and dynamic environments.' },
      right: { label: 'Introversion (I)', val: p.introvert || 0, desc: 'Recharges through internal reflection, independent focus, and controlled environments.' },
      insight: 'This dimension dictates your fundamental metabolic rate in professional settings. Forcing an Introvert into an Extroverted environment causes rapid cognitive fatigue, whereas under-stimulating an Extrovert results in severe disengagement.'
    },
    {
      title: 'Information Processing',
      left: { label: 'Sensing (S)', val: p.sensing || 0, desc: 'Focuses on concrete facts, present realities, measurable data, and proven methodologies.' },
      right: { label: 'Intuition (N)', val: p.intuition || 0, desc: 'Focuses on future potential, abstract concepts, underlying patterns, and theoretical possibilities.' },
      insight: 'This governs how you ingest the world. Sensors are tactical executors who demand empirical reality. Intuitives are strategic architects who demand systemic vision. High-performing teams require the precise friction between both.'
    },
    {
      title: 'Decision Framework',
      left: { label: 'Thinking (T)', val: p.thinking || 0, desc: 'Analyzes problems based on objective logic, systemic truth, and detached rationality.' },
      right: { label: 'Feeling (F)', val: p.feeling || 0, desc: 'Evaluates problems based on human impact, emotional consensus, and subjective harmony.' },
      insight: 'When crises hit, your decision framework takes over. Thinkers will ruthlessly optimize the system even if it hurts morale. Feelers will protect the cultural fabric even if it costs systemic efficiency.'
    },
    {
      title: 'Environmental Structure',
      left: { label: 'Judging (J)', val: p.judging || 0, desc: 'Prefers closure, strict schedules, definitive plans, and aggressive organization.' },
      right: { label: 'Perceiving (P)', val: p.perceiving || 0, desc: 'Prefers optionality, spontaneous adaptation, fluid schedules, and emergent opportunities.' },
      insight: 'This is your execution archetype. Judgers close loops and build rigid scaffolding to prevent chaos. Perceivers leave loops open to hijack unexpected chaotic opportunities. Both achieve success through entirely opposite tactical engines.'
    }
  ];

  return (
    <>
      {dimensions.map((dim, idx) => {
        const dominant = dim.left.val > dim.right.val ? dim.left.label : dim.right.label;
        const dominantDesc = dim.left.val > dim.right.val ? dim.left.desc : dim.right.desc;
        const dominantColor = dim.left.val > dim.right.val ? '#0F6D6D' : '#4B3F72';
        
        return (
          <ReportPage key={idx}>
            <ReportHeader name={name} date={date} />
            <ReportSection title={`Trait Horizon: ${dim.title}`}>
              <div className="bg-[#F5F7FA] p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden mb-10">
                <DualBar 
                  leftLabel={dim.left.label} rightLabel={dim.right.label} 
                  leftVal={Math.round(dim.left.val)} rightVal={Math.round(dim.right.val)} 
                />
              </div>

              <div className="flex gap-6 mb-12">
                <div className="flex-1 bg-white p-6 border-t-4 border-[#0F6D6D] shadow-sm">
                  <h4 className="font-bold text-[#0F6D6D] mb-2">{dim.left.label}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed text-justify">{dim.left.desc}</p>
                </div>
                <div className="flex-1 bg-white p-6 border-t-4 border-[#4B3F72] shadow-sm">
                  <h4 className="font-bold text-[#4B3F72] mb-2">{dim.right.label}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed text-justify">{dim.right.desc}</p>
                </div>
              </div>

              <div className="bg-slate-50 text-slate-900 border border-slate-200 p-8 rounded-xl shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-5">
                  <span className="text-9xl font-black text-slate-900">{dominant.split('(')[1].replace(')','')}</span>
                </div>
                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Your Baseline Alignment</h4>
                <h3 className="text-2xl font-black mb-4 text-slate-800">{dominant}</h3>
                <p className="text-[14px] leading-relaxed text-slate-700 text-justify mb-6">
                  {dominantDesc}
                </p>
                <div className="bg-white p-5 rounded-lg border-l-4 border-[#2ECC71] shadow-sm">
                  <p className="text-[13px] leading-relaxed italic text-slate-600">
                    " {dim.insight} "
                  </p>
                </div>
              </div>
            </ReportSection>
            <ReportFooter />
          </ReportPage>
        );
      })}
    </>
  );
};

// ======================================
// 2. RIASEC EXPANSION (6 PAGES)
// ======================================
export const RIASECDetailPages = ({ name, date, interests }: { name: string, date: string, interests: any }) => {
  const themes = [
    { id: 'realistic', name: 'Realistic (The Doers)', score: interests.realistic, color: '#E74C3C', desc: 'Gravitates towards tangible, physical, and mechanical systems. Values practical outcomes over philosophical theories. Prefers working with tools, machines, flora, or fauna. Thrives in highly autonomous, execution-heavy environments.' },
    { id: 'investigative', name: 'Investigative (The Thinkers)', score: interests.investigative, color: '#3498DB', desc: 'Driven by intense intellectual curiosity. Consumes data, analyzes profound logical systems, and seeks objective truths. Thrives in research environments, deeply complex troubleshooting, and scientific frameworks.' },
    { id: 'artistic', name: 'Artistic (The Creators)', score: interests.artistic, color: '#9B59B6', desc: 'Demands absolute structural freedom. Operates through intuition, creativity, and self-expression. Repulsed by heavy bureaucracy or rigid procedural repetition. Thrives in design, ideation, architecture, and conceptual innovation.' },
    { id: 'social', name: 'Social (The Helpers)', score: interests.social, color: '#2ECC71', desc: 'Exclusively energized by human capital. Focuses on interpersonal development, healing, curing, teaching, and training. Thrives in heavily collective, empathetic, and culturally rich collaborative environments.' },
    { id: 'enterprising', name: 'Enterprising (The Persuaders)', score: interests.enterprising, color: '#E67E22', desc: 'Aggressively oriented toward leadership, influence, and capital generation. Comfortable taking measured systemic risks. Thrives in competitive arenas, high-stakes negotiations, political strategy, and corporate expansion.' },
    { id: 'conventional', name: 'Conventional (The Organizers)', score: interests.conventional, color: '#34495E', desc: 'Values total predictability, immaculate organization, and unshakeable rules. Extremely proficient at managing massive datasets and financial ledgers. Thrives in structured, clear-hierarchy corporate ecosystems.' }
  ];

  return (
    <>
      {themes.map((theme, idx) => (
        <ReportPage key={idx}>
          <ReportHeader name={name} date={date} />
          <ReportSection title={`Occupational Theme: ${theme.name}`}>
            <div className="p-8 rounded-2xl mb-10 relative overflow-hidden text-slate-900 shadow-sm border border-slate-200 bg-white" style={{borderTopColor: theme.color, borderTopWidth: '8px'}}>
              <div className="absolute -right-6 -bottom-10 opacity-5 font-black text-[180px] leading-none" style={{color: theme.color}}>
                {theme.name.charAt(0)}
              </div>
              <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Empirical Affinity Score</h4>
              <h2 className="text-6xl font-black mb-6 drop-shadow-sm" style={{color: theme.color}}>{Math.round(theme.score)}%</h2>
              <p className="text-[14px] leading-relaxed max-w-xl text-justify font-medium text-slate-700">
                {theme.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-[#2C3E50] mb-4 text-sm border-b pb-2">Optimal Ecosystems</h4>
                <ul className="text-[12px] text-gray-600 space-y-2 list-disc pl-4 marker:text-gray-400">
                  <li>Environments mapping exactly to this affinity archetype</li>
                  <li>Infrastructures rewarding high-leverage outputs over activity</li>
                  <li>Cultural fabrics enforcing their primary motivation drivers</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-[#2C3E50] mb-4 text-sm border-b pb-2">Destructive Ecosystems</h4>
                <ul className="text-[12px] text-gray-600 space-y-2 list-disc pl-4 marker:text-gray-400">
                  <li>Organizations forcefully demanding antithetical behaviors</li>
                  <li>Role responsibilities blocking natural flow-state triggers</li>
                  <li>Cultures operating fundamentally opposite to this specific theme</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border-l-4 p-6 rounded-r-xl shadow-sm italic text-[13px] text-gray-600 leading-relaxed text-justify" style={{borderLeftColor: theme.color}}>
              "If this score is above 60%, it represents a fundamental core pillar of your vocational psychology. Any long-term career projection that severely starves this dimension will ultimately result in profound professional burnout, regardless of how much financial compensation is attached to the role."
            </div>
          </ReportSection>
          <ReportFooter />
        </ReportPage>
      ))}
    </>
  );
};

// ======================================
// 3. SKILL EXPANSION (8 PAGES)
// ======================================
export const SkillDetailPages = ({ name, date, skills }: { name: string, date: string, skills: any }) => {
  const skillList = Object.entries(skills).map(([key, val]) => ({
    key, 
    title: key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()), 
    score: val as number
  }));

  return (
    <>
      {skillList.map((skill, idx) => (
        <ReportPage key={idx}>
          <ReportHeader name={name} date={date} />
          <ReportSection title={`Skill Assessment: ${skill.title}`}>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center mt-6 mb-12">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Capability Score</h4>
              <div className="relative w-48 h-48 rounded-full border-8 flex items-center justify-center mb-6 shadow-inner" style={{ borderColor: skill.score > 70 ? '#2ECC71' : skill.score > 40 ? '#F39C12' : '#E74C3C' }}>
                <span className="text-5xl font-black text-[#2C3E50]">{Math.round(skill.score)}<span className="text-xl opacity-50">%</span></span>
              </div>
              <p className="text-[13px] leading-relaxed text-gray-600 max-w-sm text-center">
                This metric represents your functional capability in <strong>{skill.title}</strong> compared to a standardized professional distribution.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-6 rounded-xl border border-gray-200 shadow-inner">
              <h3 className="text-[#0F6D6D] font-bold text-lg mb-4 border-b border-gray-300 pb-2">Analysis</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed text-justify mb-4">
                Raw {skill.title.toLowerCase()} is often a primary requirement for roles highly dependent on this specific analytical or social function.
              </p>
              {skill.score > 60 ? (
                <div className="bg-[#2ECC71]/10 border border-[#2ECC71]/30 p-4 rounded-lg flex items-start">
                  <span className="text-[#2ECC71] font-bold text-xl mr-3">✓</span>
                  <p className="text-[13px] text-gray-800 leading-relaxed">
                    <strong>Clear Strength:</strong> You operate at a highly competent level in this area. This is a solid advantage. You should target roles that actively require this capability, utilizing it as a core part of your day-to-day work.
                  </p>
                </div>
              ) : (
                <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 p-4 rounded-lg flex items-start">
                  <span className="text-[#E74C3C] font-bold text-xl mr-3">⚠</span>
                  <p className="text-[13px] text-gray-800 leading-relaxed">
                    <strong>Area for Improvement:</strong> This currently functions below the expected threshold for senior execution. If your chosen path relies heavily on {skill.title.toLowerCase()}, this metric will act as a bottleneck. Targeted practice is advised.
                  </p>
                </div>
              )}
            </div>

          </ReportSection>
          <ReportFooter />
        </ReportPage>
      ))}
    </>
  );
};

// ======================================
// 4. CAREER PATH EXPANSION (3 PAGES)
// ======================================
export const CareerDetailPages = ({ name, date, paths }: { name: string, date: string, paths: any[] }) => {
  const topPaths = paths.slice(0, 3);

  return (
    <>
      {topPaths.map((career, idx) => (
        <ReportPage key={idx}>
          <ReportHeader name={name} date={date} />
          <ReportSection title={`Career Profile: Option ${idx + 1}`}>
            
            <div className="bg-slate-50 text-slate-900 border border-slate-200 p-10 rounded-2xl shadow-sm mt-6 mb-10 border-t-8 border-[#2ECC71]">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">Primary Recommendation</h4>
              <h2 className="text-4xl font-black mb-6 text-slate-800">{career.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col justify-center items-center h-24 shadow-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Psychological Fit</span>
                  <span className="text-3xl font-black text-[#2ECC71]">{Math.round(career.psy_score || career.psy || 0)}%</span>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-lg flex flex-col justify-center items-center h-24 shadow-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Capability Fit</span>
                  <span className="text-3xl font-black text-[#3498DB]">{Math.round(career.skill_score || career.skill || 0)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white border text-[13px] border-gray-200 p-8 rounded-xl shadow-sm mb-8 relative">
              <h3 className="text-lg font-black text-[#0F6D6D] border-b pb-3 mb-4">Strategic Outlook</h3>
              <p className="text-gray-700 leading-relaxed text-justify mb-6">
                Pursuing a career as a <strong>{career.name}</strong> ensures that your underlying psychological traits are leveraged rather than suppressed. This role demands the combination of interests and skills that currently align with your assessment profile. By directing your energy into this space, you can focus purely on technical skill acquisition rather than fighting a mismatched organizational culture.
              </p>
              
              <div className="bg-[#F5F7FA] p-5 rounded-lg border border-gray-100">
                <h4 className="font-bold text-[#2C3E50] mb-3 uppercase text-[11px] tracking-wider">Recommended Next Steps</h4>
                <ul className="space-y-2 list-none text-gray-600">
                  <li className="flex items-start"><span className="text-red-500 font-black mr-2">1.</span> Research the specific technical or degree requirements explicitly requested for a {career.name}.</li>
                  <li className="flex items-start"><span className="text-red-500 font-black mr-2">2.</span> Review your Gap Analysis to identify any critical study areas required before entry.</li>
                  <li className="flex items-start"><span className="text-red-500 font-black mr-2">3.</span> Orient your immediate academic stream towards building this required capability base.</li>
                </ul>
              </div>
            </div>

          </ReportSection>
          <ReportFooter />
        </ReportPage>
      ))}
    </>
  );
};
