
import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Iniciando Sistemas');
  
  useEffect(() => {
    const messages = [
      'Cargando Red Geodésica',
      'Sincronizando Capas SIG',
      'Validando Estándares ANM',
      'Optimizando Scripts Python',
      'Renderizando Modelos LADM-COL'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[i % messages.length]);
      i++;
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Vertical Scanning Line */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent absolute top-0 animate-[scan_3s_linear_infinite]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Advanced Geometric Loader */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-12">
          {/* Outer Rotating Ring (Dashed) */}
          <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-full animate-[spin_8s_linear_infinite] border-dashed"></div>
          
          {/* Middle Rotating Compass Ring */}
          <div className="absolute inset-4 border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-white/5 rounded-full"></div>
          
          {/* Inner Pulsing Core */}
          <div className="absolute inset-10 bg-gradient-to-br from-[#D4AF37] to-[#996515] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)] animate-pulse">
             <span className="text-black text-xl md:text-2xl font-black tracking-tighter">OV</span>
          </div>

          {/* Orbiting Point */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#fff]"></div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-white text-3xl md:text-4xl font-serif tracking-[0.4em] uppercase mb-4 italic">
            OnfeVS <span className="text-[#D4AF37]">Geologis</span>
          </h2>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
            <p className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase font-black animate-pulse">
              {loadingText}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator at the bottom */}
      <div className="absolute bottom-12 w-64 h-[1px] bg-zinc-900 overflow-hidden">
        <div className="h-full bg-[#D4AF37] animate-[progress_2.5s_ease-in-out_infinite]"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
