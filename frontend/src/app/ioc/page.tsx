'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { GlassCard } from '@/components/GlassCard';
import { LoadingExperience } from '@/components/LoadingExperience';
import { 
  Share2, 
  Search, 
  Globe, 
  ShieldAlert, 
  Cpu, 
  User, 
  Bug, 
  ExternalLink,
  Save,
  Trash2,
  FileSearch,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AggregatedIOC {
  value: string;
  type: string;
  firstSeen: string;
  analysisId: string;
  riskLevel: string;
}

export default function IOCExplorerPage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allIOCs = useMemo(() => {
    const iocs: AggregatedIOC[] = [];
    history.forEach(analysis => {
      Object.entries(analysis.iocs).forEach(([type, values]) => {
        if (Array.isArray(values)) {
          values.forEach(val => {
            iocs.push({
              value: val,
              type,
              firstSeen: analysis.timestamp,
              analysisId: analysis.analysis_id,
              riskLevel: analysis.risk_level
            });
          });
        }
      });
    });
    // Deduplicate and sort
    return iocs.sort((a, b) => new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime());
  }, [history]);

  const filteredIOCs = allIOCs.filter(ioc => {
    const value = ioc.value?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchesSearch = value.includes(search);
    const matchesType = selectedType ? ioc.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'domain': return <Globe size={18} className="text-cyan-400" />;
      case 'ipv4': return <Cpu size={18} className="text-blue-400" />;
      case 'cve': return <ShieldAlert size={18} className="text-amber-400" />;
      case 'actor': return <User size={18} className="text-purple-400" />;
      case 'malware': return <Bug size={18} className="text-red-400" />;
      case 'md5': 
      case 'sha256': return <Fingerprint size={18} className="text-orange-400" />;
      default: return <Share2 size={18} className="text-slate-400" />;
    }
  };

  const iocTypes = Array.from(new Set(allIOCs.map(i => i.type)));

  if (loading) return <LoadingExperience status="Indexing Indicators of Compromise..." />;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
            IOC <span className="text-indigo-500">Explorer</span>
          </h1>
          <p className="text-slate-400 font-medium">Global repository of extracted indicators across all intelligence vectors.</p>
        </div>
        
        <div className="flex gap-4">
          <GlassCard className="!p-4 bg-white/[0.02] border-white/5 text-center px-8">
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Index</div>
             <div className="text-xl font-black text-white">{allIOCs.length}</div>
          </GlassCard>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-[500px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Filter by value (IP, Domain, CVE)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
              selectedType === null 
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
            }`}
          >
            All Types
          </button>
          {iocTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                selectedType === type 
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* IOC Grid / List */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredIOCs.map((ioc, index) => (
            <motion.div
              key={`${ioc.value}-${ioc.analysisId}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              layout
            >
              <GlassCard className="group hover:scale-[1.02] transition-all border-b-2" style={{ 
                borderBottomColor: ioc.riskLevel === 'Critical' ? '#ef4444' : '#6366f1' 
              }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {getIcon(ioc.type)}
                  </div>
                  <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tighter ${
                    ioc.riskLevel === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {ioc.riskLevel} Scan
                  </div>
                </div>
                
                <h3 className="text-sm font-bold text-white mb-1 truncate hover:text-indigo-400 cursor-pointer flex items-center gap-2">
                  {ioc.value}
                </h3>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ioc.type} Indicator</div>
                
                <div className="h-px w-full bg-white/5 my-4" />
                
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[9px] text-slate-600 font-black uppercase">First Seen</span>
                      <span className="text-[10px] text-slate-400 font-bold">{new Date(ioc.firstSeen).toLocaleDateString()}</span>
                   </div>
                   <button 
                    onClick={() => router.push(`/analysis/${ioc.analysisId}`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-500 hover:text-indigo-400 transition-all border border-white/10"
                   >
                     <ExternalLink size={14} />
                   </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {filteredIOCs.length === 0 && (
        <div className="py-20 text-center glass-panel rounded-3xl border-dashed">
          <FileSearch className="w-16 h-16 text-slate-800 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No indicators matched your search criteria</h3>
          <p className="text-slate-600 mt-2">Try searching for IP addresses, domain names, or file hashes.</p>
        </div>
      )}
    </div>
  );
}
