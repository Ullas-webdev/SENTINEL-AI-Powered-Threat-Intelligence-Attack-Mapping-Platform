'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAnalysisById } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { RiskGauge3D } from '@/components/RiskGauge3D';
import { MITREMatrix3D } from '@/components/MITREMatrix3D';
import { IOCGraphPremium } from '@/components/IOCGraphPremium';
import { AttackTimeline } from '@/components/AttackTimeline';
import { AIIntelligencePanel } from '@/components/AIIntelligencePanel';
import { KPISection } from '@/components/KPISection';
import { GlassCard } from '@/components/GlassCard';
import IOCTable from '@/components/IOCTable';
import SigmaRuleViewer from '@/components/SigmaRuleViewer';
import { AttackPathPredictor } from '@/components/AttackPathPredictor';
import { LoadingExperience } from '@/components/LoadingExperience';
import { 
  ChevronLeft, 
  ShieldAlert, 
  Info, 
  FileText, 
  Terminal, 
  Share2,
  Download,
  Share
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalysisView() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [data, setData] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState('Fetching intelligence data...');

  useEffect(() => {
    if (id) {
      setLoadingStatus('Decrypting secure analysis vault...');
      getAnalysisById(id)
        .then(setData)
        .catch(err => {
          console.error(err);
          setError("Failed to load analysis results. Intelligence data may have been purged or relocated.");
        });
    }
  }, [id]);

  if (error) return (
    <div className="min-h-[600px] flex items-center justify-center">
        <GlassCard className="text-center space-y-6 max-w-md border-red-500/20">
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <h2 className="text-2xl font-black text-white italic">ACCESS DENIED</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{error}</p>
            <button 
              onClick={() => router.push('/')} 
              className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-all"
            >
              RETURN TO DASHBOARD
            </button>
        </GlassCard>
    </div>
  );

  if (!data) return <LoadingExperience status={loadingStatus} />;

  return (
    <div 
      className="max-w-6xl mx-auto space-y-10 pb-20"
    >
      {/* Header & Meta */}
      <div className="flex items-center justify-between gap-6 pb-6 border-b border-white/5">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-6">
          <div className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] animate-pulse">
            Neural Engine v2.5.1 [ACTIVE]
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">TI-{(data.analysis_id || '').slice(0, 12).toUpperCase()}</span>
          <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
            data.risk_level === 'Critical' ? 'bg-red-500 text-white' : 
            data.risk_level === 'High' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
          }`}>
            Risk: {Math.round(data.risk_score)}/100 {data.risk_level}
          </div>
        </div>
      </div>

      {/* Risk Analysis Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col items-center justify-center p-8 bg-white/[0.02]">
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Risk Score</div>
           <RiskGauge3D score={data.risk_score} level={data.risk_level} />
        </GlassCard>

        <GlassCard className="p-8">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Risk Factors</div>
          <div className="space-y-4">
             {(data.risk_factors ?? []).map((factor, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400">{factor.factor}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${Math.min((factor.points ?? 0) * 1.5, 100)}%` }} />
                  </div>
                  <span className="text-indigo-400 w-6 text-right">+{factor.points ?? 0}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* NEW: Attack Path Prediction */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Attack Path Prediction</div>
        <AttackPathPredictor path={data.ai_report.attack_path} />
      </section>

      {/* Extracted IOCs Section */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Extracted IOCs</div>
        <IOCTable iocs={data.iocs} />
      </section>

      {/* MITRE ATT&CK Mapping */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">MITRE ATT&CK Mapping</div>
        <MITREMatrix3D mappings={data.mitre_mapping ?? []} />
      </section>

      {/* AI Threat Intelligence Section */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">AI Threat Intelligence</div>
        <AIIntelligencePanel report={data.ai_report} />
      </section>


      {/* NEW: IOC Relationship Graph */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Relational Graph</div>
        <GlassCard className="h-[500px] overflow-hidden !p-0">
          <IOCGraphPremium graph={data.graph} />
        </GlassCard>
      </section>


      {/* Detection Rules Section */}
      <section className="space-y-6">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Detection Rules</div>
        <SigmaRuleViewer rules={data.detection_rules} />
      </section>
    </div>
  );
}
