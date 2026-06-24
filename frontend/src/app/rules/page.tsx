'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { GlassCard } from '@/components/GlassCard';
import { LoadingExperience } from '@/components/LoadingExperience';
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Save, 
  ChevronRight,
  Database,
  Shield,
  Activity,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DetectionRulesPage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    return analysisId.includes(search) || inputType.includes(search);
  });

  const selectedAnalysis = useMemo(() => 
    history.find(a => a.analysis_id === activeAnalysisId) || history[0],
  [history, activeAnalysisId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingExperience status="Retrieving Detection Engineering Artifacts..." />;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            Detection <span className="text-indigo-500">Engineering</span>
          </h1>
          <p className="text-slate-400 font-medium">Unified repository for Sigma, Splunk, Sentinel, and Elastic detection rules.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
             <Shield size={12} fill="currentColor" /> Registry: Synced
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Rules Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by Analysis ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredHistory.map((item) => (
              <motion.div
                key={item.analysis_id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div 
                  onClick={() => setActiveAnalysisId(item.analysis_id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedAnalysis?.analysis_id === item.analysis_id 
                      ? 'bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    {item.input_type} Vector
                  </div>
                  <div className="text-sm font-bold text-white truncate">{item.analysis_id}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                       <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <ChevronRight size={14} className="text-slate-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rule Content */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {selectedAnalysis && (
              <motion.div
                key={selectedAnalysis.analysis_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Sigma Rule', content: selectedAnalysis.detection_rules.sigma, lang: 'yaml' },
                    { title: 'Splunk Query', content: selectedAnalysis.detection_rules.splunk, lang: 'splunk' },
                    { title: 'Sentinel KQL', content: selectedAnalysis.detection_rules.sentinel, lang: 'kql' },
                    { title: 'Elastic EQL', content: selectedAnalysis.detection_rules.elastic, lang: 'eql' },
                  ].map((rule) => (
                    <GlassCard key={rule.title} className="!p-0 overflow-hidden flex flex-col h-[350px]">
                      <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Code size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{rule.title}</span>
                         </div>
                         <button 
                          onClick={() => copyToClipboard(rule.content)}
                          className="text-slate-500 hover:text-white transition-colors"
                         >
                           {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                         </button>
                      </div>
                      <div className="flex-1 p-4 bg-slate-950/50 overflow-auto font-mono text-[11px] text-indigo-100/80 leading-relaxed whitespace-pre">
                        {rule.content}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
          
          {!selectedAnalysis && (
            <div className="h-[600px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
              <div className="text-center space-y-4">
                <Database className="w-16 h-16 text-slate-800 mx-auto" />
                <h3 className="text-xl font-bold text-slate-700">No detection data found in this cluster</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
