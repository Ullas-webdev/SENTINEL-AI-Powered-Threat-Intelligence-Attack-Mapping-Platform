import React from 'react';
import { IOCs } from '../lib/types';
import { Shield, Globe, Mail, Fingerprint, Bug } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface IOCTableProps {
  iocs: IOCs;
}

const IOCTable: React.FC<IOCTableProps> = ({ iocs }) => {
  const categories = [
    { key: 'ipv4', label: 'IPv4', icon: Globe, color: 'text-blue-400' },
    { key: 'domain', label: 'Domain', icon: Globe, color: 'text-cyan-400' },
    { key: 'email', label: 'Email', icon: Mail, color: 'text-purple-400' },
    { key: 'md5', label: 'MD5', icon: Fingerprint, color: 'text-amber-400' },
    { key: 'sha256', label: 'SHA256', icon: Fingerprint, color: 'text-orange-400' },
    { key: 'cve', label: 'CVE', icon: Bug, color: 'text-red-400' },
  ];

  return (
    <GlassCard className="!p-0 overflow-hidden border-white/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Value</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Reputation</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Enriched</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
                {categories.map((cat) => {
                  const values = iocs[cat.key as keyof IOCs] as string[];
                  if (!values || values.length === 0) return null;
                  
                  return values.map((val, idx) => (
                    <tr key={`${cat.key}-${idx}`} className="hover:bg-white/[0.02] transition-colors group">
                      <td className={`px-6 py-4 text-xs font-bold ${cat.color} flex items-center gap-2`}>
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">{val}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${
                          cat.key === 'cve' || cat.key === 'md5' ? 'text-red-500' : 'text-orange-500'
                        }`}>
                          {cat.key === 'cve' ? 'VULNERABLE' : cat.key === 'md5' ? 'MALICIOUS' : 'SUSPICIOUS'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">YES</span>
                      </td>
                    </tr>
                  ));
                })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default IOCTable;
