'use client';

import React from 'react';
import { Target, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface MitreMapping {
  technique_id: string;
  technique_name: string;
  tactic: string;
  description: string;
}

interface MitreMatrix3DProps {
  mappings: MitreMapping[];
}

export const MITREMatrix3D: React.FC<MitreMatrix3DProps> = ({ mappings }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-red-500" />
          MITRE ATT&CK Matrix
        </h2>
        <div className="text-[10px] font-black tracking-widest text-slate-600 uppercase">
          {mappings.length} Techniques Detected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mappings.map((mapping, idx) => (
          <GlassCard 
            key={idx} 
            className="group relative border-l-4 border-l-red-500/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-[10px] font-mono font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                {mapping.technique_id}
              </div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-black">
                {mapping.tactic}
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-200 mb-2 group-hover:text-red-400 transition-colors">
              {mapping.technique_name}
            </h3>
            
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-4">
              {mapping.description}
            </p>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-slate-500 italic">Advanced Persistent Threat</span>
              <button className="text-red-400 hover:text-red-300">
                <ExternalLink size={12} />
              </button>
            </div>
          </GlassCard>
        ))}

        {mappings.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-800 mb-4">
              <Target className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-500 italic">No MITRE ATT&CK patterns identified in this analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};
