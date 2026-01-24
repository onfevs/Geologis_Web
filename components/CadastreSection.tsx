
import React from 'react';
import { PixelCanvas } from './PixelCanvas';

const CadastreSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block underline decoration-[#D4AF37]/30">LADM-COL Expertos</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Catastro & <span className="text-[#D4AF37]">Administración de Tierras</span>.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
          Asistencia técnica especializada en el modelo de dominio LADM-COL, estructurando bases de datos catastrales para la planeación territorial moderna.
        </p>
        
        <div className="space-y-4 mb-10">
          <div className="p-6 bg-zinc-950/50 border border-zinc-900 hover:border-[#D4AF37]/40 transition-all group">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-2 group-hover:text-[#D4AF37]">Estructuración Multipropósito</h4>
            <p className="text-zinc-500 text-xs font-light">Levantamientos topográficos integrados a sistemas catastrales de alta fidelidad.</p>
          </div>
          <div className="p-6 bg-zinc-950/50 border border-zinc-900 hover:border-[#D4AF37]/40 transition-all group">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-2 group-hover:text-[#D4AF37]">Modelamiento Geográfico</h4>
            <p className="text-zinc-500 text-xs font-light">Estandarización bajo normas nacionales de tierras y gestión de archivos SHP/GDB.</p>
          </div>
        </div>

        <a href="#contacto" className="group relative inline-block px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden hover:bg-[#D4AF37] hover:scale-105 transition-all">
          <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={5} speed={40} />
          <span className="relative z-10">Asesoría Catastral</span>
        </a>
      </div>
      
      <div className="aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl relative rounded-sm group">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
        <img 
          src="https://images.unsplash.com/photo-1544383335-96575199581a?auto=format&fit=crop&q=80&w=1200" 
          alt="Catastro LADM-COL OnfeVS" 
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
        />
      </div>
    </div>
  );
};

export default CadastreSection;
