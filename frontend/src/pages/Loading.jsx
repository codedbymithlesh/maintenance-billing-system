import React from 'react';
import { Building2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      
      {/* Animation Container */}
      <div className="relative flex items-center justify-center mb-8">
        
        {/* Ring 1 (Outer Ripple) */}
        <div className="absolute h-24 w-24 rounded-full border-2 border-blue-500/20 animate-[ping_2s_ease-out_infinite]"></div>
        
        {/* Ring 2 (Inner Ripple - Delayed) */}
        <div className="absolute h-24 w-24 rounded-full border border-blue-500/40 animate-[ping_2s_ease-out_infinite_300ms]"></div>
        
        {/* Glowing Background Glow */}
        <div className="absolute h-16 w-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>

        {/* Central Icon */}
        <div className="relative z-10 p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-blue-900/20">
          <Building2 size={40} className="text-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Text Animation */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          SnehSagar<span className="text-blue-500"> Society</span>
        </h2>
        
        {/* Custom Dot Loading */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="h-1.5 w-1.5 bg-slate-600 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
          <div className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
        </div>
        
        <p className="text-xs text-slate-500 font-medium mt-2 uppercase tracking-widest">
          Loading System
        </p>
      </div>
    </div>
  );
};

export default Loader;