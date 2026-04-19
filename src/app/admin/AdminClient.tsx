'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Users, Calendar, ArrowUpRight, Search, Activity, BrainCircuit } from 'lucide-react';

export default function AdminClient({ typedResults }: { typedResults: any[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'aptitude' | 'psychometric' | 'combined'>('all');

  const filteredResults = activeTab === 'all' 
    ? typedResults 
    : typedResults.filter(r => r.test_type === activeTab);

  return (
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
                Admin Panel
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Assessment Records</h1>
          </div>
          
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4 shrink-0">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Candidates</p>
              <p className="text-2xl font-black text-slate-900 leading-none">{typedResults.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Tests
          </button>
          <button 
            onClick={() => setActiveTab('aptitude')}
            className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'aptitude' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BrainCircuit className="w-4 h-4 mr-2" />
            Aptitude
          </button>
          <button 
            onClick={() => setActiveTab('psychometric')}
            className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'psychometric' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Psychometric
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          {/* Table Header Row (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-slate-50 border-b border-slate-200 text-sm font-black text-slate-500 uppercase tracking-widest">
            <div className="col-span-3">Candidate</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Age/Grade</div>
            <div className="col-span-2">Date / Type</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Table Body */}
          {filteredResults.length === 0 ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-lg font-medium">No records found for this test type.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredResults.map((result) => {
                const meta = result.meta_data || {};
                const name = meta.name || 'Anonymous';
                const phone = meta.phone || 'N/A';
                const age = meta.age || '--';
                const grade = meta.grade || '--';
                const date = new Date(result.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={result.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-6 items-center hover:bg-slate-50 transition-colors group">
                    
                    {/* Candidate Name */}
                    <div className="col-span-1 md:col-span-3">
                      <p className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{name}</p>
                      <p className="text-sm text-slate-500 md:hidden mt-0.5">{phone}</p>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1 md:col-span-3 hidden md:block">
                      <p className="text-slate-600 font-medium">{phone}</p>
                    </div>

                    {/* Demographics */}
                    <div className="col-span-1 md:col-span-2 hidden md:block">
                      <p className="text-slate-900 font-semibold">{grade}</p>
                      <p className="text-sm text-slate-500">Age: {age}</p>
                    </div>

                    {/* Date / Type */}
                    <div className="col-span-1 md:col-span-2">
                      <div className="text-sm text-slate-500 flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2 hidden xl:block" />
                        {date}
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${result.test_type === 'aptitude' ? 'bg-emerald-100 text-emerald-700' : result.test_type === 'psychometric' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                        {result.test_type || 'combined'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 md:col-span-2 md:text-right mt-4 md:mt-0">
                      <Link
                        href={`/results/${result.id}`}
                        target="_blank"
                        className="inline-flex items-center justify-center bg-white border-2 border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all shadow-sm w-full md:w-auto"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Report
                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-50" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
  );
}
