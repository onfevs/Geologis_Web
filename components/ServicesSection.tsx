import React from 'react';
import { SERVICES } from '../constants';
import PremiumButton from './PremiumButton';
import SectionHeader from './SectionHeader';

const ServicesSection: React.FC = () => {
  return (
    <div>
      <SectionHeader
        subtitle="Capacidad Técnica"
        titleLight="Soluciones"
        titleGold="Premium"
        description="Ingeniería geoespacial de vanguardia diseñada para maximizar el valor de sus activos geológicos."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, i) => (
          <div key={i} className="group relative p-12 bg-[#0a0a0a] border border-[#D4AF37]/10 transition-all duration-500 hover:border-[#D4AF37]/40 flex flex-col h-full overflow-hidden rounded-[2rem]">
            <div className="w-14 h-14 mb-8 border border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500 rounded-2xl">
              <svg className="w-6 h-6 text-[#D4AF37] group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={service.icon} />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-title mb-6 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
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
              <PremiumButton href="#contacto" variant="outline" className="w-full">
                Solicitar Servicio
              </PremiumButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
