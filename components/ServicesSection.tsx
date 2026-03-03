import React from 'react';
import { SERVICES } from '../constants';
import SectionHeader from './SectionHeader';
import PremiumButton from './PremiumButton';

const ServicesSection: React.FC = () => (
  <div id="servicios">
    <SectionHeader
      subtitle="Capacidades Técnicas"
      titleLight="Servicios de"
      titleGold="Ingeniería SIG"
      description="Soluciones geoespaciales de alta precisión que cumplen con los estándares normativos más exigentes de Colombia."
      className="mb-16"
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {SERVICES.map((service, i) => (
        <div
          key={i}
          className="group relative p-12 card-surface dark:bg-[#0a0a0a] border border-[#C8BFA8] dark:border-[#D4AF37]/10 transition-all duration-300 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(212,175,55,0.12)] flex flex-col h-full overflow-hidden rounded-[2rem] cursor-pointer"
        >
          {/* Order number watermark */}
          <span
            aria-hidden="true"
            className="absolute top-6 right-8 text-[4rem] font-black text-zinc-900/[0.03] dark:text-white/[0.03] group-hover:text-[#D4AF37]/[0.1] transition-colors duration-300 leading-none pointer-events-none select-none"
          >
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Icon box */}
          <div className="w-14 h-14 mb-8 rounded-2xl border border-zinc-200 dark:border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
            <svg className="w-6 h-6 text-[#A67C00] dark:text-[#D4AF37] group-hover:text-white dark:group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={service.icon} />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-zinc-900 dark:text-white text-2xl font-title mb-6 group-hover:text-[#A67C00] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed mb-8 transition-colors">
            {service.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mb-12 flex-grow" role="list">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-widest transition-colors">
                <span className="font-mono text-[#A67C00] dark:text-[#D4AF37] text-[8px] select-none" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')} ·
                </span>
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

export default ServicesSection;
