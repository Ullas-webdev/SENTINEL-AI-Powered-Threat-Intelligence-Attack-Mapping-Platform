'use client';

import React, { useState, useEffect } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { GlassCard } from '@/components/GlassCard';
import { LoadingExperience } from '@/components/LoadingExperience';
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  MessageSquare,
  Calendar,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ReportsArchivePage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredReports = history.filter(item => {
    const summary = item.ai_report?.summary?.toLowerCase() || '';
    const analysisId = item.analysis_id?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return summary.includes(search) || analysisId.includes(search);
  });

  if (loading) return <LoadingExperience status="Compiling Intelligence Report Archive..." />;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            Intelligence <span className="text-indigo-500">Reports</span>
          </h1>
          <p className="text-slate-400 font-medium">Archive of high-fidelity AI-synthesized threat intelligence narratives.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:bg-white/10 transition-all">
             <Download size={14} /> Bulk Export
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by report content or analysis ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
        />
      </div>

      {/* Reports Archive List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.analysis_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <GlassCard 
                className="group !p-0 overflow-hidden hover:!bg-white/[0.04] transition-all border border-white/5"
                onClick={() => router.push(`/analysis/${report.analysis_id}`)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[180px]">
                  {/* Report Meta Card */}
                  <div className="lg:col-span-1 p-6 bg-white/[0.02] border-r border-white/5 flex flex-col justify-between">
                     <div className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">ID: {report.analysis_id.slice(0, 8)}</div>
                          <div className="text-xs font-bold text-white uppercase tracking-tighter">AI AGENT: SENTINEL-V4</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                        <Calendar size={12} /> {new Date(report.timestamp).toLocaleDateString()}
                     </div>
                  </div>

                  {/* Summary Content */}
                  <div className="lg:col-span-3 p-8 flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                        <MessageSquare size={160} className="text-white" />
                     </div>
                     
                     <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-3">
                           <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                             report.risk_level === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                           }`}>
                             {report.risk_level} Severity
                           </span>
                           <h3 className="text-sm font-black text-white italic uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">Executive Summary</h3>
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {report.ai_report.summary}
                        </p>
                     </div>

                     <div className="mt-6 flex items-center justify-between relative z-10">
                        <div className="flex gap-4">
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                             <ShieldCheck size={12} className="text-indigo-500" /> {(report.iocs?.ipv4?.length ?? 0) + (report.iocs?.domain?.length ?? 0)} Indicators
                           </div>
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                             <User size={12} className="text-purple-500" /> TTPs: {report.mitre_mapping?.length ?? 0}
                           </div>
                        </div>
                        <button className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-300">
                          Full Analysis <ChevronRight size={14} />
                        </button>
                     </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredReports.length === 0 && (
          <div className="py-40 text-center">
             <MessageSquare className="w-16 h-16 text-slate-800 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-700 uppercase italic">No intelligence reports archived</h3>
          </div>
        )}
      </div>
    </div>
  );
}
