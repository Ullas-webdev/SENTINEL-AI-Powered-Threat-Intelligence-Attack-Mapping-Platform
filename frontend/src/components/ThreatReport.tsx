import React from 'react';
import { AIReport } from '../lib/types';
import { FileText, Zap, ShieldAlert, ListChecks, Search } from 'lucide-react';

interface ThreatReportProps {
  report: AIReport;
}

const ThreatReport: React.FC<ThreatReportProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      {/* Summary & Scenario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 backdrop-blur-sm">
          <h3 className="text-slate-300 font-bold flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-500" />
            Executive Summary
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">{report.summary}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 backdrop-blur-sm">
          <h3 className="text-slate-300 font-bold flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-purple-500" />
            Attack Scenario
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">{report.scenario}</p>
        </div>
      </div>

      {/* Impact & Actions */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 backdrop-blur-sm">
        <h3 className="text-slate-300 font-bold flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-yellow-500" />
          Intel-Driven Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Immediate Actions
            </h4>
            <ul className="space-y-2">
              {report.immediate_actions.map((action, i) => (
                <li key={i} className="text-slate-400 text-xs flex gap-2">
                  <span className="text-red-500">•</span> {action}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <ListChecks className="w-4 h-4" /> Remediation
            </h4>
            <ul className="space-y-2">
              {report.long_term_remediation.map((action, i) => (
                <li key={i} className="text-slate-400 text-xs flex gap-2">
                  <span className="text-blue-500">•</span> {action}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" /> Monitoring
            </h4>
            <ul className="space-y-2">
              {report.monitoring.map((action, i) => (
                <li key={i} className="text-slate-400 text-xs flex gap-2">
                  <span className="text-green-500">•</span> {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatReport;
