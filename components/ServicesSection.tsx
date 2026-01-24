
import React from 'react';
import { SERVICES, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const ServicesSection: React.FC = () => {
  return (
    <div>
      <div className="mb-20">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block">Capacidad Técnica</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Soluciones <span className="text-[#D4AF37]">Premium</span>.</h2>
        <p className="text-zinc-500 max-w-2xl font-light">
          Ingeniería geoespacial de vanguardia diseñada para maximizar el valor de sus activos geológicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => (
          <div key={i} className="group relative p-12 bg-[#0a0a0a] border border-[#D4AF37]/10 transition-all duration-500 hover:border-[#D4AF37]/40 flex flex-col h-full overflow-hidden">
            <div className="w-14 h-14 mb-8 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
              <svg className="w-6 h-6 text-[#D4AF37] group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={service.icon} />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-serif mb-6 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              {service.description}
            </p>
            
            <ul className="space-y-3 mb-12 flex-grow">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-center text-[10px] text-zinc-400 uppercase tracking-widest">
                  <span className="w-1 h-1 bg-[#D4AF37] rounded-full mr-3"></span>
                  {feat}
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <a 
                href="#contacto" 
                className="group relative inline-block w-full text-center px-6 py-4 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden hover:text-white transition-all duration-500"
              >
                <PixelCanvas colors={GOLD_COLORS} gap={4} speed={50} />
                <span className="relative z-10">Solicitar Servicio</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
