
import React from 'react';

const IngredientsSection: React.FC = () => {
  const materials = [
    { name: "Acero al Carbono 1055", use: "Cuerpo del Martillo", desc: "Equilibrio perfecto entre dureza y tenacidad." },
    { name: "Zafiro Sintético", use: "Lente de Brújula", desc: "Resistencia a rayaduras de nivel 9 en la escala de Mohs." },
    { name: "Neodimio de Grado N52", use: "Núcleo Magnético", desc: "La mayor fuerza coercitiva disponible en el mercado." },
    { name: "Polímero Aeroespacial", use: "Empuñadura", desc: "Absorción de vibraciones superior al 85%." }
  ];

  return (
    <div>
      <div className="text-center mb-24">
        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] mb-4 block">Capítulo II</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Composición Elemental</h2>
        <div className="h-px w-24 bg-white mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {materials.map((m, i) => (
          <div key={i} className="p-8 border border-zinc-800 hover:border-white transition-colors duration-500 group">
            <span className="text-zinc-700 text-3xl font-serif mb-6 block group-hover:text-white transition-colors">0{i+1}</span>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{m.name}</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-4">{m.use}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsSection;
