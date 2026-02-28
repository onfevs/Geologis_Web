import React from 'react';
import { SECTORS } from '../constants';
import SectionHeader from './SectionHeader';

const SectorsSection: React.FC = () => {
  return (
    <div className="w-full">
      <SectionHeader
        subtitle="Dominios Estructurales"
        titleLight="Sectores de"
        titleGold="Especialización"
        description="Nuestras soluciones tecnológicas impactan estratégicamente el desempeño y éxito regulatorio en los sectores más exigentes del país."
        className="mx-auto text-center flex flex-col items-center mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SECTORS.map((sector) => (
          <a
            key={sector.id}
            href={sector.href}
            className="group relative h-[400px] overflow-hidden bg-zinc-900 border border-zinc-800 rounded-[2rem]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={sector.image}
                alt={sector.title}
                className="w-full h-full object-cover grayscale-0 opacity-100 md:opacity-40 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-110 md:group-hover:opacity-80 transition-all duration-1000"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] mb-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Sector Especializado</span>
              <h3 className="text-white text-3xl font-title mb-2">{sector.title}</h3>
              <p className="text-zinc-300 text-sm font-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {sector.description}
              </p>
              <div className="mt-6 w-12 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-700"></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SectorsSection;
