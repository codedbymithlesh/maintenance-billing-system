import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

const Loader = () => {
  // Optional: Text changing effect for engagement

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950  from-slate-900 to-slate-950">
      
      <div className="relative flex items-center justify-center mb-10">
        

        <div className="absolute h-32 w-32 rounded-full border border-blue-500/10 animate-[ping_2.5s_ease-out_infinite]"></div>
        
    
        <div className="absolute h-24 w-24 rounded-full border border-blue-500/30 animate-[ping_2.5s_ease-out_infinite_400ms]"></div>
        
    
        <div className="absolute h-20 w-20 bg-blue-600/20 rounded-full blur-2xl animate-pulse"></div>

        
        <div className="relative z-10 p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 ring-1 ring-white/5">
          <Building2 size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loader;