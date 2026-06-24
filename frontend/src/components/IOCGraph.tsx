import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { IOCGraph as GraphData } from '../lib/types';
import { Share2 } from 'lucide-react';

interface IOCGraphProps {
  graph: GraphData;
}

const IOCGraph: React.FC<IOCGraphProps> = ({ graph }) => {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden backdrop-blur-sm h-[500px]">
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
        <h3 className="text-slate-300 font-bold flex items-center gap-2">
          <Share2 className="w-5 h-5 text-cyan-500" />
          Relationship Graph
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Interactive View</span>
      </div>
      <div className="w-full h-full">
        <ReactFlow
          nodes={graph.nodes as any}
          edges={graph.edges as any}
          fitView
          nodesDraggable={true}
          style={{ background: '#020617' }}
          colorMode="dark"
        >
          <Background color="#1e293b" gap={20} />
          <Controls className="bg-slate-800 fill-slate-300" />
          <MiniMap 
            nodeColor="#334155" 
            maskColor="rgba(0, 0, 0, 0.5)"
            className="bg-slate-900 border border-slate-800"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default IOCGraph;
