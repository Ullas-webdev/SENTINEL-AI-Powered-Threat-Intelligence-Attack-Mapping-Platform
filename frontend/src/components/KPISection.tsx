'use client';

import React from 'react';
import { GlassCard } from './GlassCard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Activity, Shield, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleData = [
  { value: 40 }, { value: 30 }, { value: 45 }, { value: 20 }, 
  { value: 55 }, { value: 40 }, { value: 65 }, { value: 50 }, 
  { value: 80 }, { value: 60 }, { value: 90 }, { value: 75 }
];

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  chartColor: string;
  data: any[];
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, chartColor, data }) => (
  <GlassCard className="flex flex-col gap-4 min-w-[240px]">
    <div className="flex justify-between items-start">
      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-brand-blue">
        <Icon size={20} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
        <TrendingUp size={10} />
        {change}
      </div>
    </div>
    
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>

    <div className="h-12 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={chartColor} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </GlassCard>
);

export const KPISection: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
    >
      <KPICard 
        title="Total Analyses" 
        value="1,284" 
        change="+12%" 
        icon={Activity} 
        chartColor="#3b82f6" 
        data={sampleData} 
      />
      <KPICard 
        title="Active Threats" 
        value="42" 
        change="+5%" 
        icon={AlertTriangle} 
        chartColor="#ef4444" 
        data={sampleData.map(d => ({ value: d.value * 0.8 }))} 
      />
      <KPICard 
        title="Detections" 
        value="892" 
        change="+18%" 
        icon={Shield} 
        chartColor="#8b5cf6" 
        data={sampleData.map(d => ({ value: d.value * 1.2 }))} 
      />
      <KPICard 
        title="Response Time" 
        value="2.4s" 
        change="-15%" 
        icon={Zap} 
        chartColor="#eab308" 
        data={sampleData.map(d => ({ value: 100 - d.value }))} 
      />
    </motion.div>
  );
};
