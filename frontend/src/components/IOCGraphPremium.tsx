'use client';

import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Handle, 
  Position,
  NodeProps,
  Edge,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Share2, Globe, ShieldAlert, Cpu, User, Bug } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Node Types
const IOCNode = ({ data, selected }: NodeProps) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'domain': return <Globe size={18} className="text-cyan-400" />;
      case 'ip': return <Cpu size={18} className="text-blue-400" />;
      case 'cve': return <ShieldAlert size={18} className="text-amber-400" />;
      case 'actor': return <User size={18} className="text-purple-400" />;
      case 'malware': return <Bug size={18} className="text-red-400" />;
      default: return <Share2 size={18} className="text-slate-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'domain': return 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
      case 'ip': return 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case 'cve': return 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      case 'actor': return 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      case 'malware': return 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      default: return 'border-slate-500/50';
    }
  };

  return (
    <div className={`glass-panel p-4 rounded-xl border-2 min-w-[180px] ${getColor(data.type)} ${selected ? 'ring-2 ring-white/20' : ''}`}>
      <Handle type="target" position={Position.Top} className="!bg-slate-500" />
      <div className="flex items-center gap-3">
        <div className="bg-white/5 p-2 rounded-lg">
          {getIcon(data.type)}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{data.type}</div>
          <div className="text-sm font-bold text-white truncate max-w-[120px]">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-500" />
    </div>
  );
};

const nodeTypes = {
  ioc: IOCNode,
};

interface IOCGraphPremiumProps {
  graph: {
    nodes: Node[];
    edges: Edge[];
  };
}

export const IOCGraphPremium: React.FC<IOCGraphPremiumProps> = ({ graph }) => {
  const { nodes, edges } = graph;
  const transformedNodes = useMemo(() => 
    nodes.map(n => ({
      ...n,
      type: 'ioc',
      data: { ...n.data, type: (n.data as any).type || 'unknown' }
    })), [nodes]
  );

  return (
    <div className="glass-panel overflow-hidden h-[600px] relative rounded-2xl">
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <Share2 className="w-5 h-5 text-cyan-500" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">IOC Relationship Graph</h3>
          <p className="text-slate-400 text-xs">Interactive graph of threat connections.</p>
        </div>
      </div>

      <ReactFlow
        nodes={transformedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-[#020617]"
      >
        <Background color="#1e293b" gap={24} size={1} />
        <Controls className="bg-slate-900 border-white/10 fill-white" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.data?.type === 'malware') return '#ef4444';
            if (n.data?.type === 'actor') return '#a855f7';
            return '#334155';
          }}
          maskColor="rgba(0, 0, 0, 0.7)"
          className="!bg-slate-900 !border-white/10"
        />
      </ReactFlow>

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full blur-[1px] animate-bounce" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-red-500 rounded-full blur-[2px] animate-pulse" />
      </div>
    </div>
  );
};
