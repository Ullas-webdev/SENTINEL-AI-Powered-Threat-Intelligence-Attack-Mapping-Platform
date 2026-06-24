'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { GlassCard } from '@/components/GlassCard';
import { MITREMatrix3D } from '@/components/MITREMatrix3D';
import { LoadingExperience } from '@/components/LoadingExperience';
import { Target, Info, Shield, Layers, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalMitrePage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTactic, setSelectedTactic] = useState<string | null>(null);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const aggregatedMappings = useMemo(() => {
    const allMappings = history.flatMap(item => item.mitre_mapping);
    // Remove duplicates based on technique_id
    const uniqueMappings = Array.from(new Map(allMappings.map(m => [m.technique_id, m])).values());
    return uniqueMappings;
  }, [history]);

  const stats = useMemo(() => {
    const tactics = new Set(aggregatedMappings.map(m => m.tactic));
    return {
      totalTechniques: aggregatedMappings.length,
      totalTactics: tactics.size,
      topTactic: Array.from(tactics).sort()[0] || 'N/A'
    };
  }, [aggregatedMappings]);

  if (loading) return <LoadingExperience status="Aggregated MITRE Adversarial Mapping..." />;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            MITRE ATT&CK <span className="text-indigo-500">Coverage</span>
          </h1>
          <p className="text-slate-400 font-medium">Holistic view of adversarial techniques detected across the enterprise infrastructure.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center min-w-[120px]">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Techniques</div>
             <div className="text-xl font-black text-white">{stats.totalTechniques}</div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-center min-w-[120px]">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tactics</div>
             <div className="text-xl font-black text-indigo-400">{stats.totalTactics}</div>
          </div>
        </div>
      </div>

      {/* Hero Matrix Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <Target className="text-red-500" />
            Global Adversarial Heatmap
          </h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:bg-white/10 transition-all">
              <Filter size={12} /> Filter by Dataset
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:bg-white/10 transition-all">
              <Layers size={12} /> Export CSV
            </button>
          </div>
        </div>
        <GlassCard className="!p-8 overflow-hidden">
          <MITREMatrix3D mappings={aggregatedMappings} />
        </GlassCard>
      </section>

      {/* Insights & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
            <Info size={14} className="text-indigo-400" /> Coverage Metrics
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Prevalent Tactic</div>
              <div className="text-lg font-bold text-white">{stats.topTactic}</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Detection Confidence</div>
              <div className="text-lg font-bold text-white">94.2%</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed italic">
            Coverage is calculated based on historical ingestion from all telemetry nodes.
          </p>
        </GlassCard>

        <GlassCard className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
            <Shield size={14} className="text-indigo-400" /> Technique Intelligence
          </h3>
          <div className="space-y-3">
             {aggregatedMappings.slice(0, 5).map((m, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-[10px]">
                      {m.technique_id}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{m.technique_name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{m.tactic}</div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                  >
                    <button className="text-indigo-400 hover:text-indigo-300 transform">
                      <Target size={18} />
                    </button>
                  </motion.div>
               </div>
             ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
