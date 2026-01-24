
import React from 'react';
import { PixelCanvas } from './PixelCanvas';
import { GOLD_COLORS } from '../constants';

const EnvironmentSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1 aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl relative group">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
        <img 
          src="https://images.unsplash.com/photo-1511497584788-8767fe771d21?auto=format&fit=crop&q=80&w=1200" 
          alt="Estudio Ambiental OnfeVS" 
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
        />
      </div>
      <div className="order-1 lg:order-2">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block underline decoration-[#D4AF37]/30">Gestión ANLA</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">EIA & Licenciamiento <span className="text-[#D4AF37]">Socio-Ambiental</span>.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
          Soporte geoespacial robusto para Estudios de Impacto Ambiental, cumpliendo con los modelos de datos exigidos por la ANLA y las corporaciones autónomas regionales.
        </p>
        <ul className="space-y-6">
          <li className="flex items-start space-x-4 group">
            <div className="h-2 w-2 bg-[#D4AF37] mt-1.5 rounded-full group-hover:scale-150 transition-transform"></div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-widest">Modelos de Susceptibilidad</h4>
              <p className="text-zinc-500 text-xs">Análisis multivariable de riesgos y amenazas ambientales mediante Python SIG.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4 group">
            <div className="h-2 w-2 bg-zinc-700 mt-1.5 rounded-full group-hover:bg-[#D4AF37] transition-colors"></div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-widest">Inventarios Bióticos</h4>
              <p className="text-zinc-500 text-xs">Georreferenciación masiva de fauna y flora integrada a bases de datos espaciales.</p>
            </div>
          </li>
        </ul>
        <div className="mt-12">
          <a href="#contacto" className="group relative inline-block px-10 py-4 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded-full overflow-hidden hover:bg-[#D4AF37] hover:text-black transition-all">
            <PixelCanvas colors={GOLD_COLORS} gap={4} speed={50} />
            <span className="relative z-10">Consultoría Ambiental</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSection;
