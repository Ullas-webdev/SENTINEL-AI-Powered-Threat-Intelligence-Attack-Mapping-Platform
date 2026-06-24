'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Shield, Check, AlertTriangle, Search, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export const AnalysisConsole: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
    };
    setLogs(prev => [...prev.slice(-15), newLog]);
  };

  useEffect(() => {
    const scenarios = [
      { msg: 'Initializing Sentinel AI Threat Engine...', type: 'info' },
      { msg: 'Connecting to MongoDB Cluster...', type: 'success' },
      { msg: 'Synthesizing global threat feeds...', type: 'info' },
      { msg: 'Neural network layer 4 optimized.', type: 'success' },
      { msg: 'Monitoring real-time IOC ingestion...', type: 'info' },
      { msg: 'Potential brute force detected (185.x.x.x)', type: 'warning' },
      { msg: 'MITRE ATT&CK Mapping: T1566 identified.', type: 'success' },
      { msg: 'Risk engine calculating vector magnitude...', type: 'info' },
      { msg: 'Anomaly detected in outgoing traffic pattern.', type: 'warning' },
      { msg: 'Gemini 1.5 Pro: Synthesis complete.', type: 'success' },
      { msg: 'Automated Sigma rule generation: [OK]', type: 'success' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      const s = scenarios[i % scenarios.length];
      addLog(s.msg, s.type as any);
      i++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden font-mono text-[10px] h-[300px] flex flex-col shadow-2xl">
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-indigo-400" />
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-[8px]">Intelligence-Console-v2.0</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <div className="w-2 h-2 rounded-full bg-green-500/30 animate-pulse" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1.5 scroll-smooth custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <span className="text-slate-600">[{log.timestamp}]</span>
              <span className={`
                font-bold uppercase px-1 rounded-[2px]
                ${log.type === 'info' ? 'text-blue-400 bg-blue-400/10' : ''}
                ${log.type === 'success' ? 'text-emerald-400 bg-emerald-400/10' : ''}
                ${log.type === 'warning' ? 'text-amber-400 bg-amber-400/10' : ''}
                ${log.type === 'error' ? 'text-red-400 bg-red-400/10' : ''}
              `}>
                {log.type}
              </span>
              <span className="text-slate-300">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="p-3 border-t border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1 text-[8px] uppercase tracking-tighter">
            <Activity size={12} className="text-indigo-400" /> CPU: 12%
          </div>
          <div className="flex items-center gap-1 text-[8px] uppercase tracking-tighter">
            <Search size={12} className="text-indigo-400" /> RAM: 1.2GB
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Live Engine</span>
        </div>
      </div>
    </div>
  );
};
