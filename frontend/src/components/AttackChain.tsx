import React from 'react';
import { RiskFactor } from '../lib/types';
import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AttackChainProps {
  factors: RiskFactor[];
}

const AttackChain: React.FC<AttackChainProps> = ({ factors }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 backdrop-blur-sm">
      <h3 className="text-slate-300 font-bold flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-amber-500" />
        Risk Factor Analysis
      </h3>
      <div className="space-y-4">
        {factors.map((factor, idx) => (
          <div key={idx} className="flex items-start gap-4 group">
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/50 flex items-center justify-center z-10 group-hover:bg-amber-500/20 transition-colors">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              {idx < factors.length - 1 && (
                <div className="w-0.5 h-12 bg-slate-800 group-hover:bg-amber-500/20 transition-colors"></div>
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-200">{factor.factor}</span>
                <span className="text-xs font-mono text-red-400">+{factor.points} pts</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500/50 animate-pulse" 
                  style={{ width: `${(factor.points / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        {factors.length === 0 && (
          <div className="flex items-center gap-3 text-slate-500">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span>No significant risk factors identified.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackChain;
