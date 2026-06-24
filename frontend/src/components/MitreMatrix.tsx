import React from 'react';
import { MitreMapping } from '../lib/types';
import { Target } from 'lucide-react';

interface MitreMatrixProps {
  mappings: MitreMapping[];
}

const MitreMatrix: React.FC<MitreMatrixProps> = ({ mappings }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
        <h3 className="text-slate-300 font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-red-500" />
          MITRE ATT&CK Mapping
        </h3>
        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">
          AI-Assisted Classification
        </span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mappings.map((mapping, idx) => (
          <div key={idx} className="bg-slate-800/40 p-4 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {mapping.technique_id}
              </span>
              <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">
                {mapping.tactic}
              </span>
            </div>
            <h4 className="text-slate-200 font-bold text-sm mb-2 group-hover:text-blue-400 transition-colors">
              {mapping.technique_name}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {mapping.description}
            </p>
          </div>
        ))}
        {mappings.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 italic">
            No specific MITRE patterns identified.
          </div>
        )}
      </div>
    </div>
  );
};

export default MitreMatrix;
