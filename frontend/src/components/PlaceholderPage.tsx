'use client';

import React from 'react';
import { GlassCard } from '@/components/GlassCard';
import { ShieldAlert, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaceholderPage() {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <GlassCard className="text-center p-20 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="relative inline-block">
            <ShieldAlert className="w-24 h-24 text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
            <motion.div 
              className="absolute -top-4 -right-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Construction className="w-12 h-12 text-amber-500" />
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Intelligence Node Offline</h1>
            <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              This intelligence vector is currently undergoing high-fidelity calibration. 
              Sub-system deployment scheduled for next operational phase.
            </p>
          </div>

          <div className="h-px w-full bg-white/5" />
          
          <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> System Online</span>
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /> AI Calibrating</span>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
