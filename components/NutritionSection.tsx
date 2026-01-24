
import React from 'react';

const NutritionSection: React.FC = () => {
  const stats = [
    { label: "Dureza Rockwell", value: "58-60 HRC" },
    { label: "Precisión Azimutal", value: "±0.5°" },
    { label: "Peso Operativo", value: "950g" },
    { label: "Vida Útil Estimada", value: "85 Años" }
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Valores de Integridad.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
          En OnfeVS, cuantificamos el rendimiento. Cada herramienta Geologis es sometida a pruebas de fatiga extrema en cámaras criogénicas y de alta presión.
        </p>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="border-l border-zinc-800 pl-6 py-2">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-white text-2xl font-serif">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-full border border-zinc-800 flex items-center justify-center p-12">
          <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse"></div>
          <div className="text-center z-10">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2">Certificación</p>
            <p className="text-white text-4xl font-serif italic italic">ASTM-G11</p>
            <p className="text-zinc-400 text-[10px] mt-4 uppercase tracking-[0.2em]">Resistencia Mineral</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSection;
