'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { 
  Zap, 
  Terminal, 
  Shield, 
  Lock, 
  Skull, 
  ChevronDown 
} from 'lucide-react';

const stages = [
  { id: 'recon', name: 'Initial Access', icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'exec', name: 'Execution', icon: Terminal, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 'persist', name: 'Persistence', icon: Lock, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { id: 'escalate', name: 'Privilege Escalation', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'impact', name: 'Impact', icon: Skull, color: 'text-red-400', bg: 'bg-red-400/10' },
];

interface AttackTimelineProps {
  activeStages: string[];
}

export const AttackTimeline: React.FC<AttackTimelineProps> = ({ activeStages }) => {
  return (
    <div className="flex flex-col gap-4 relative">
      {stages.map((stage, idx) => {
        const isActive = activeStages.includes(stage.id);
        const Icon = stage.icon;

        return (
          <div key={stage.id} className="flex gap-6 group">
            {/* Timeline Connector */}
            <div className="flex flex-col items-center">
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                  isActive 
                    ? `border-white/20 ${stage.bg} shadow-[0_0_15px_rgba(255,255,255,0.1)]` 
                    : 'border-white/5 bg-white/5'
                }`}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Icon size={18} className={isActive ? stage.color : 'text-slate-600'} />
              </motion.div>
              {idx < stages.length - 1 && (
                <div className="w-0.5 h-16 bg-gradient-to-b from-white/10 to-transparent flex-1" />
              )}
            </div>

            {/* Stage Card */}
            <div className="flex-1 pb-10">
              <GlassCard 
                className={`transition-all duration-500 ${
                  isActive ? 'border-l-4 border-l-white/20' : 'opacity-40 grayscale pointer-events-none'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                      {stage.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-medium">
                      Stage {idx + 1}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div 
                      className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20 font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      DETECTED
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </div>
            
            {/* Connector Arrow */}
            {idx < stages.length - 1 && isActive && activeStages.includes(stages[idx+1].id) && (
              <div className="absolute left-[19px] top-[40px] h-[calc(100%-80px)] pointer-events-none">
                <ChevronDown className="text-white/20 animate-bounce mt-10" size={14} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
