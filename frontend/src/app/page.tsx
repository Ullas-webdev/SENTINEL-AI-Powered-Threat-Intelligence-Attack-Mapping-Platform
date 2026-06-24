'use client';

import React, { useState, useEffect } from 'react';
import ThreatForm from '@/components/ThreatForm';
import { LoadingExperience } from '@/components/LoadingExperience';
import { KPISection } from '@/components/KPISection';
import { GlassCard } from '@/components/GlassCard';
import { analyzeText, uploadFile, getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Clock, ShieldCheck, Activity, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalysisConsole } from '@/components/AnalysisConsole';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [history, setHistory] = useState<Analysis[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    getHistory().then(setHistory).catch(console.error);
  }, []);

  const handleAnalyzeText = async (text: string) => {
    setLoading(true);
    setLoadingStatus('Initializing AI heuristic analysis...');
    try {
      setTimeout(() => setLoadingStatus('Extracting Indicators of Compromise...'), 2000);
      setTimeout(() => setLoadingStatus('Mapping to MITRE ATT&CK Framework...'), 4000);
      const result = await analyzeText(text);
      router.push(`/analysis/${result.analysis_id}`);
    } catch (error) {
      alert('Analysis failed. Check console for details.');
      console.error(error);
      setLoading(false);
    }
  };

  const handleAnalyzeFile = async (file: File) => {
    setLoading(true);
    setLoadingStatus('Processing binary headers and metadata...');
    try {
      setTimeout(() => setLoadingStatus('Running sandbox behavioral analysis...'), 2000);
      setTimeout(() => setLoadingStatus('Synthesizing threat intelligence report...'), 4000);
      const result = await uploadFile(file);
      router.push(`/analysis/${result.analysis_id}`);
    } catch (error) {
      alert('File analysis failed.');
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <LoadingExperience status={loadingStatus} />;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <header className="py-10 text-center border-b border-white/5">
        <h1 className="text-4xl font-black text-white tracking-[0.2em] uppercase italic">
          Threat Intelligence Platform
        </h1>
        <p className="text-slate-500 text-xs font-bold mt-4 tracking-widest uppercase">
          Advanced Multi-Vector Analysis Engine v2.5
        </p>
      </header>

      {/* Page 1: Analyze a Threat */}
      <section className="space-y-6">
        <ThreatForm onAnalyzeText={handleAnalyzeText} onAnalyzeFile={handleAnalyzeFile} />
      </section>

      {/* Recent Analyses Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Recent Analyses
          </h2>
          <div className="text-[10px] font-black tracking-widest text-slate-600 uppercase">
            Data Refresh: {mounted && new Date().toLocaleTimeString()}
          </div>
        </div>

        <GlassCard className="!p-0 overflow-hidden border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Input</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Risk</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.map((item) => (
                  <tr 
                    key={item.analysis_id} 
                    className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                    onClick={() => router.push(`/analysis/${item.analysis_id}`)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-indigo-400 group-hover:text-indigo-300">
                        TI-{(item.analysis_id || '').slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-slate-300 truncate max-w-[200px]">
                        {item.input_text?.slice(0, 40) || (item.input_type || 'Unknown').toUpperCase()}...
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-black ${
                        item.risk_score >= 80 ? 'text-red-500' : 
                        item.risk_score >= 50 ? 'text-orange-500' : 'text-green-500'
                      }`}>
                        {Math.round(item.risk_score)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        item.risk_level === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                        item.risk_level === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                        'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                        {item.risk_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-slate-600 italic text-sm">No historical analyses found in the ledger.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
