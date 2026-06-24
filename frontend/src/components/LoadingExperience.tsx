'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Loader2 } from 'lucide-react';

interface LoadingExperienceProps {
  status: string;
}

export const LoadingExperience: React.FC<LoadingExperienceProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-8">
      {/* Premium Loader Animation */}
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-indigo-500/20"
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-t-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-10 h-10 text-indigo-400 opacity-50" />
        </div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
          AI Analysis in Progress
          <Loader2 className="animate-spin text-indigo-400" size={20} />
        </h3>
        
        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 w-1/3"
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <p className="text-slate-400 font-medium animate-pulse">
          {status || "Mapping threat vectors and extracting indicators..."}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3 opacity-60">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">MITRE Engines</span>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3 opacity-60">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Heuristic Engine</span>
          </div>
        </div>
      </div>

      {/* Shimmer Skeletons below */}
      <div className="w-full max-w-2xl space-y-4 opacity-20 pointer-events-none">
        <div className="h-32 w-full glass-panel rounded-2xl shimmer" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 glass-panel rounded-2xl shimmer" />
          <div className="h-48 glass-panel rounded-2xl shimmer" />
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
