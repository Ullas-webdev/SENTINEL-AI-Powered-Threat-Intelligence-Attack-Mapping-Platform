'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { 
  Settings, 
  Shield, 
  Key, 
  Cpu, 
  Globe, 
  Lock, 
  RefreshCw, 
  Save, 
  Database,
  Cloud,
  Zap,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [dbStatus, setDbStatus] = useState('Optimal');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const sections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'intelligence', label: 'Intelligence', icon: BrainIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'infrastructure', label: 'Cluster', icon: Cloud },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            Platform <span className="text-indigo-500">Settings</span>
          </h1>
          <p className="text-slate-400 font-medium">Configure global intelligence parameters and operational security protocols.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] hover:scale-105 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? 'Synchronizing...' : 'Apply Protocols'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Sidebar */}
        <div className="col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all ${
                activeTab === section.id 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
            >
              <section.icon size={20} />
              <span className="text-sm uppercase tracking-widest">{section.label}</span>
            </button>
          ))}
          
          <div className="pt-10">
            <GlassCard className="!p-6 bg-emerald-500/5 border-emerald-500/10">
               <div className="flex items-center gap-3 text-emerald-400 mb-3">
                  <Activity size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sys Health</span>
               </div>
               <div className="text-2xl font-black text-white italic">99.9%</div>
               <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">All Nodes Nominal</p>
            </GlassCard>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          <GlassCard className="space-y-8">
             <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                   <Key size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">AI Integration Vault</h3>
                   <p className="text-xs text-slate-500">Configure high-fidelity model endpoints and security clearing keys.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Primary Intelligence Key (Gemini)</label>
                   <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                      <input 
                        type="password" 
                        value="••••••••••••••••••••••••••••" 
                        readOnly
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs text-indigo-400 font-mono"
                      />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Model Heuristics</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-xs text-white font-bold appearance-none">
                      <option>Gemini 1.5 Pro (Ultra-Analysis)</option>
                      <option>Gemini 1.5 Flash (Rapid-Scan)</option>
                   </select>
                </div>
             </div>
          </GlassCard>

          <GlassCard className="space-y-8">
             <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                   <Database size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Intelligence Database</h3>
                   <p className="text-xs text-slate-500">Global storage cluster synchronization and latency protocols.</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                   <div className="flex items-center gap-4">
                      <Zap className="text-indigo-400" size={20} />
                      <div>
                         <div className="text-sm font-bold text-white uppercase tracking-tighter">Auto-Sync Indicators</div>
                         <div className="text-[10px] text-slate-600 font-bold">Synchronize new extraction data every 60s</div>
                      </div>
                   </div>
                   <div className="w-12 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center px-1">
                      <div className="w-4 h-4 rounded-full bg-indigo-500 translate-x-6" />
                   </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-50">
                   <div className="flex items-center gap-4">
                      <Globe className="text-slate-400" size={20} />
                      <div>
                         <div className="text-sm font-bold text-white uppercase tracking-tighter">Geo-Redundancy</div>
                         <div className="text-[10px] text-slate-600 font-bold">Replicate intelligence across global regions</div>
                      </div>
                   </div>
                   <div className="w-12 h-6 rounded-full bg-white/10 border border-white/20 flex items-center px-1">
                      <div className="w-4 h-4 rounded-full bg-slate-600" />
                   </div>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function BrainIcon({ size }: { size: number }) {
  return <Cpu size={size} />;
}
