'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldAlert, 
  Target, 
  Share2, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Database,
  Brain
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Target, label: 'MITRE ATT&CK', href: '/mitre' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="glass-panel h-screen sticky top-0 border-r-0 flex flex-col z-50 overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Brain className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tighter text-white uppercase italic">Sentinel AI</h2>
              <p className="text-[10px] text-slate-500 font-bold">CORE PLATFORM v2.4</p>
            </div>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto">
            <Brain className="text-white w-5 h-5" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}>
                {isActive && (
                  <motion.div 
                    layoutId="active-bar"
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                  />
                )}
                <Icon size={20} className={isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''} />
                {!isCollapsed && (
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-16 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:left-[72px] transition-all whitespace-nowrap z-[100] text-xs font-bold shadow-2xl">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2 text-xs font-bold"><ChevronLeft size={16} /> Hide Sidebar</div>}
        </button>
      </div>
    </motion.aside>
  );
};
