import React from 'react';
import { GlassCard } from './GlassCard';
import { Info } from 'lucide-react';

/**
 * SIEMQueryViewer
 * This component informs users that SIEM query generation has been removed from the platform.
 * It uses the existing GlassCard UI component to maintain visual consistency with the rest of the app.
 */
export const SIEMQueryViewer: React.FC = () => {
  return (
    <GlassCard className="p-6 flex items-center space-x-4 bg-gradient-to-r from-red-600 to-indigo-600 text-white" tiltEnabled={false}>
      <Info className="h-8 w-8 flex-shrink-0" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-black uppercase tracking-widest italic">SIEM Generation Offline</h2>
        <p className="mt-1 text-xs font-medium opacity-90">
          Neural SIEM generation has been decommissioned in the current platform build. 
          Please use the native Search console for advanced hunting queries.
        </p>
      </div>
    </GlassCard>
  );
};
