'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RiskGauge3DProps {
  score: number;
  level: string;
  size?: number;
}

export const RiskGauge3D: React.FC<RiskGauge3DProps> = ({ 
  score, 
  level, 
  size = 200 
}) => {
  const radius = size * 0.4;
  const strokeWidth = size * 0.08;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#3b82f6';
    }
  };

  const color = getColor(level);

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width: size, height: size }}>
      {/* 3D Glass Ring Effect */}
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <filter id="glow-gauge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
        />
        
        {/* Progress Glow */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-4xl font-bold tracking-tighter"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em] mb-1">
          Risk Score
        </span>
        <motion.div 
          className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}44`
          }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {level}
        </motion.div>
      </div>

      {/* Outer Glow Ring */}
      <div 
        className="absolute inset-0 rounded-full opacity-10 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          transform: 'scale(1.2)'
        }}
      />
    </div>
  );
};
