
import React from 'react';

const MapSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block underline decoration-[#D4AF37]/30">Presencia Regional</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Nuestra Sede en <br/><span className="text-[#D4AF37]">Manizales, Caldas</span>.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
          Ubicados en el corazón del eje cafetero, operamos desde un punto estratégico para la minería y los proyectos ambientales del centro-occidente colombiano.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-10 h-10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500">
               <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Coordenadas</p>
              <p className="text-zinc-500 text-[10px]">5.0689° N, 75.5174° W</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-10 h-10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500">
               <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Atención</p>
              <p className="text-zinc-500 text-[10px]">Lunes a Viernes — 08:00 a 18:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] bg-zinc-950 border border-zinc-900 group overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-all duration-1000 z-10 pointer-events-none"></div>
        
        {/* Usamos una imagen estilizada de Manizales para mantener el estilo visual */}
        <img 
          src="https://images.unsplash.com/photo-1628153303831-2775a7c2999e?auto=format&fit=crop&q=80&w=1400" 
          alt="Vista de Manizales" 
          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000"
        />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="p-8 bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
            <p className="text-[#D4AF37] text-[8px] uppercase tracking-[0.5em] mb-2 font-black">Localización Central</p>
            <p className="text-white text-xl font-serif">Manizales, Colombia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
