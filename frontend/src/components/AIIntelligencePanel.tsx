'use client';

import React from 'react';
import { GlassCard } from './GlassCard';
import { AIReport } from '../lib/types';

interface AIIntelligencePanelProps {
  report: AIReport;
}

export const AIIntelligencePanel: React.FC<AIIntelligencePanelProps> = ({ report }) => {
  return (
    <GlassCard className="!p-8 space-y-10 border-indigo-500/10">
      {/* SUMMARY */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Summary</div>
        <p className="text-slate-200 text-sm leading-relaxed font-bold italic">"{report.summary}"</p>
      </section>

      {/* ATTACK SCENARIO */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Attack Scenario</div>
        <p className="text-slate-300 text-sm leading-relaxed">{report.attack_scenario}</p>
      </section>

      {/* BUSINESS IMPACT */}
      <section className="space-y-3">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Business Impact</div>
        <p className="text-slate-300 text-sm leading-relaxed">{report.business_impact}</p>
      </section>

      {/* Two Column Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="space-y-3">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2">Immediate Actions</div>
          <ul className="space-y-2">
            {report.immediate_actions.map((action, i) => (
              <li key={i} className="flex gap-3 text-xs text-slate-400 font-bold">
                <span className="text-indigo-500">{i + 1}.</span> {action}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest border-b border-white/5 pb-2">Long-Term Remediation</div>
          <ul className="space-y-2">
            {report.long_term_remediation.map((rem, i) => (
              <li key={i} className="flex gap-3 text-xs text-slate-400 font-bold">
                <span className="text-purple-500">{i + 1}.</span> {rem}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* MONITORING */}
      {report.monitoring && report.monitoring.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Monitoring</div>
          <ul className="space-y-2">
            {report.monitoring.map((mon, i) => (
              <li key={i} className="flex gap-3 text-xs text-slate-500 italic">
                <span className="text-slate-700">•</span> {mon}
              </li>
            ))}
          </ul>
        </section>
      )}
    </GlassCard>
  );
};

export default AIIntelligencePanel;
