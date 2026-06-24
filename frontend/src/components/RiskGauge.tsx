import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

interface RiskGaugeProps {
  score: number;
  level: string;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, level }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: Math.max(0, 100 - score) },
  ];

  const getColor = (lvl: string) => {
    switch (lvl) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      default: return '#22c55e';
    }
  };

  const color = getColor(level);

  return (
    <div className="flex flex-col items-center bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
      <h3 className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Risk Assessment</h3>
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <span className="text-4xl font-bold" style={{ color }}>{score}</span>
            <div className="text-xs text-slate-500 font-mono">/ 100</div>
        </div>
      </div>
      <div className="mt-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: color }}>
        {level}
      </div>
    </div>
  );
};

export default RiskGauge;
