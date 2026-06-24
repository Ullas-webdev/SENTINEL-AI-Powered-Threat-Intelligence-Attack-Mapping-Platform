'use client';

import React, { useEffect, useState } from 'react';
import { getHistory } from '@/lib/api';
import { Analysis } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Clock, Shield, Search, ChevronRight } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HistoryPage() {
  const [history, setHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-950"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-slate-950/50 py-12 px-6">
      <div className="max-w-[1000px] mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Intelligence History</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Retrieved {history.length} records from local vault</p>
            </div>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            NEW ANALYSIS
          </button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <div 
              key={item.analysis_id}
              onClick={() => router.push(`/analysis/${item.analysis_id}`)}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-center justify-between group cursor-pointer hover:border-blue-500/50 transition-all hover:bg-slate-900"
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                  item.risk_level === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                  item.risk_level === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                  'bg-green-500/10 border-green-500/20 text-green-500'
                }`}>
                  {item.risk_score}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-200">Session {item.analysis_id.slice(0, 8)}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        item.risk_level === 'Critical' ? 'bg-red-500/20 text-red-400' :
                        item.risk_level === 'High' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-green-500/20 text-green-400'
                    }`}>
                        {item.risk_level}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1"><Search className="w-3 h-3" /> {item.input_type}</span>
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {Object.values(item.iocs).flat().length} IOCs</span>
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}

          {history.length === 0 && (
            <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800">
                    <Shield className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-slate-500 text-sm">No analysis history found. Start your first scan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
