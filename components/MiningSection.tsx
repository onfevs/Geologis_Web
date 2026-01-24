
import React from 'react';
import { PixelCanvas } from './PixelCanvas';

const MiningSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block underline decoration-[#D4AF37]/30">Minería Estratégica</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">Optimización de Títulos & <span className="text-[#D4AF37]">GDB ANM</span>.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
          Implementamos flujos de automatización para asegurar que sus entregables cumplan con el 100% de la validación topológica y estructural exigida por la Agencia Nacional de Minería.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border-l border-[#D4AF37]/40 pl-6 py-2 group-hover:border-[#D4AF37] transition-all">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-2">Validación Espacial</h4>
            <p className="text-zinc-500 text-xs">Algoritmos de detección de solapamientos y brechas en polígonos mineros.</p>
          </div>
          <div className="border-l border-[#D4AF37]/40 pl-6 py-2 group-hover:border-[#D4AF37] transition-all">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-2">Dominios GDB</h4>
            <p className="text-zinc-500 text-xs">Estructuración masiva de atributos bajo estándares de la resolución vigente.</p>
          </div>
        </div>
        <div className="mt-12">
          <a href="#contacto" className="group relative inline-block px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden hover:bg-[#D4AF37] hover:scale-105 transition-all">
            <PixelCanvas colors={["#000000", "#333333"]} gap={5} speed={40} />
            <span className="relative z-10">Consultoría ANM</span>
          </a>
        </div>
      </div>
      <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl relative group">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
        <img 
          src="https://images.unsplash.com/photo-1529439322271-42931c09bce1?auto=format&fit=crop&q=80&w=1200" 
          alt="Minería SIG OnfeVS" 
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
        />
      </div>
    </div>
  );
};

export default MiningSection;
