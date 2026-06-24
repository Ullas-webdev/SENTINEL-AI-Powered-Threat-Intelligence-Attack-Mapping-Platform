import React, { useState, useRef } from 'react';
import { Upload, Search, FileText, Globe, Box, Sparkles, ShieldAlert } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ThreatFormProps {
  onAnalyzeText: (text: string) => void;
  onAnalyzeFile: (file: File) => void;
}

const ThreatForm: React.FC<ThreatFormProps> = ({ onAnalyzeText, onAnalyzeFile }) => {
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState('text');
  const [options, setOptions] = useState({
    mitre: true,
    risk: true,
    sigma: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAnalyzeText(inputText);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAnalyzeFile(file);
    }
  };

  return (
    <GlassCard className="!p-8 border-indigo-500/10 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Header - Analyze a Threat */}
        <div className="text-center space-y-2 border-b border-white/5 pb-6">
          <h3 className="text-2xl font-black text-white tracking-widest uppercase italic">Analyze a Threat</h3>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
            <span>Input Type:</span>
            <select 
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 outline-none text-indigo-400 focus:border-indigo-500/50"
            >
              <option value="text">Text</option>
              <option value="cve">CVE</option>
              <option value="url">URL</option>
              <option value="file">File Upload</option>
            </select>
          </div>
        </div>

        {/* Big Text Area */}
        <div className="relative">
          <textarea
            className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-200 font-mono text-sm focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-600 resize-none shadow-inner"
            placeholder="Paste threat report, enter CVE ID, or describe the threat here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Options & Action Buttons */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="text-slate-600 italic">Options:</span>
            <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition-colors">
              <input 
                type="checkbox" 
                checked={options.mitre} 
                onChange={() => setOptions({...options, mitre: !options.mitre})}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              MITRE Mapping
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition-colors">
              <input 
                type="checkbox" 
                checked={options.risk} 
                onChange={() => setOptions({...options, risk: !options.risk})}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              Risk Score
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition-colors">
              <input 
                type="checkbox" 
                checked={options.sigma} 
                onChange={() => setOptions({...options, sigma: !options.sigma})}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
              />
              Sigma Rules
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_10px_20px_-5px_rgba(79,70,229,0.5)] active:scale-95"
            >
              Analyze Threat <Search size={16} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              Upload File <Upload size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.csv,.json"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ThreatForm;
