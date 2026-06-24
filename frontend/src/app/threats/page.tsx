'use client';

import React, { useState, useEffect } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { GlassCard } from '@/components/GlassCard';
import { LoadingExperience } from '@/components/LoadingExperience';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Activity, 
  Calendar,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ThreatIntelligencePage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredHistory = history.filter(item => {
    const analysisId = item.analysis_id?.toLowerCase() || '';
    const inputType = item.input_type?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchesSearch = analysisId.includes(search) || inputType.includes(search);
    const matchesFilter = filterLevel ? item.risk_level === filterLevel : true;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <LoadingExperience status="Synchronizing with Global Threat Vault..." />;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            Threat Intelligence <span className="text-indigo-500">Feed</span>
          </h1>
          <p className="text-slate-400 font-medium">Real-time correlation of global indicators and behavioral analysis history.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                AI
              </div>
            ))}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            3 Active Defensive Clusters
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by ID or Vector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {['Critical', 'High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setFilterLevel(filterLevel === level ? null : level)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                filterLevel === level 
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Threat List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.analysis_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <GlassCard 
                className="group !p-6 hover:!bg-white/10 transition-all cursor-pointer border-l-4" 
                style={{ borderLeftColor: 
                  item.risk_level === 'Critical' ? '#ef4444' : 
                  item.risk_level === 'High' ? '#f97316' : 
                  item.risk_level === 'Medium' ? '#f59e0b' : '#10b981' 
                }}
                onClick={() => router.push(`/analysis/${item.analysis_id}`)}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Activity className={
                        item.risk_level === 'Critical' ? 'text-red-500' : 
                        item.risk_level === 'High' ? 'text-orange-500' : 'text-indigo-400'
                      } size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-white italic">{item.analysis_id.slice(0, 12)}...</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          {item.input_type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(item.timestamp).toLocaleString()}</span>
                        <span className="flex items-center gap-1.5"><ShieldAlert size={12} /> {item.risk_score}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right hidden sm:block">
                      <div className={`text-xs font-black uppercase tracking-[0.2em] ${
                        item.risk_level === 'Critical' ? 'text-red-500' : 
                        item.risk_level === 'High' ? 'text-orange-500' : 'text-slate-400'
                      }`}>
                        {item.risk_level} SEVERITY
                      </div>
                      <div className="text-[10px] text-slate-600 font-bold mt-1">
                        CONFIDENCE: 92%
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Investigate <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredHistory.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-500">No matching threat intelligence records</h3>
            <p className="text-slate-600 mt-2">Adjust your filters or initiate a new heuristic scan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
