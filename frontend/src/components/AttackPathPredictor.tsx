'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Shield, Zap, Target, Search, Lock, User, FileWarning, ArrowRight } from 'lucide-react';

interface AttackPathPredictorProps {
  path: string[];
}

const StageIcon: React.FC<{ stage: string }> = ({ stage }) => {
  const s = stage.toLowerCase();
  if (s.includes('recon')) return <Search size={14} />;
  if (s.includes('phish') || s.includes('initial')) return <User size={14} />;
  if (s.includes('access') || s.includes('vpn')) return <Lock size={14} />;
  if (s.includes('lateral')) return <Zap size={14} />;
  if (s.includes('credential')) return <Shield size={14} />;
  if (s.includes('impact') || s.includes('ransom')) return <Target size={14} />;
  return <FileWarning size={14} />;
};

export const AttackPathPredictor: React.FC<AttackPathPredictorProps> = ({ path = [] }) => {
  if (!path || path.length === 0) {
    return (
      <GlassCard className="!p-8 border-white/5 text-center">
        <p className="text-slate-500 italic text-sm">Kill chain projection not available for this analysis dataset.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="!p-8 border-indigo-500/10 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-4">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Zap size={12} className="text-red-500" />
            Predicted Adversarial Kill Chain
          </div>
          <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
            AI Projection Mode
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-red-500/20 via-indigo-500/20 to-emerald-500/20 -translate-y-1/2" />

          {path.map((stage, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 relative z-10 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900 border ${
                  i === 0 ? 'border-red-500/30' : i === path.length - 1 ? 'border-emerald-500/30' : 'border-white/10'
                } flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-indigo-500/50 shadow-xl group-hover:shadow-indigo-500/20`}>
                  <div className={`text-slate-400 group-hover:text-white transition-colors`}>
                    <StageIcon stage={stage} />
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${
                    i === 0 ? 'text-red-400/70' : i === path.length - 1 ? 'text-emerald-400/70' : 'text-slate-500'
                  }`}>
                    Stage {i + 1}
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {stage}
                  </div>
                </div>
              </motion.div>
              
              {i < path.length - 1 && (
                <div className="md:hidden">
                  <ArrowRight size={16} className="text-slate-800 rotate-90" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-[10px] text-slate-600 text-center italic">
            This projection is generated based on identified TTPs and historical actor behavior patterns.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
