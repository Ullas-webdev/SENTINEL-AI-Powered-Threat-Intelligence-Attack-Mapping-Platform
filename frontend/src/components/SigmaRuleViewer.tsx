import React, { useState } from 'react';
import { DetectionRules } from '../lib/types';
import { Terminal, Copy, Check } from 'lucide-react';

interface SigmaRuleViewerProps {
  rules: DetectionRules;
}

const SigmaRuleViewer: React.FC<SigmaRuleViewerProps> = ({ rules }) => {
  const [activeTab, setActiveTab] = useState<'sigma' | 'splunk' | 'sentinel' | 'elastic'>('sigma');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRuleText = () => {
    switch (activeTab) {
      case 'sigma': return rules.sigma;
      case 'splunk': return rules.splunk || 'Rule not generated';
      case 'sentinel': return rules.sentinel || 'Rule not generated';
      case 'elastic': return rules.elastic || 'Rule not generated';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
        <h3 className="text-slate-300 font-bold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-500" />
          Detection Rules
        </h3>
        <div className="flex gap-2">
          {['sigma', 'splunk', 'sentinel', 'elastic'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                activeTab === tab 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 relative">
        <pre className="bg-slate-950 p-6 rounded-lg font-mono text-xs text-green-400 overflow-x-auto max-h-[400px] leading-relaxed border border-green-500/10">
          {getRuleText()}
        </pre>
        <button 
          onClick={() => copyToClipboard(getRuleText())}
          className="absolute top-6 right-6 p-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors text-slate-400"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default SigmaRuleViewer;
