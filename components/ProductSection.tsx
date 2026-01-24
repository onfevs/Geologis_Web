
import React from 'react';

const ProductSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block">Capítulo I</span>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">La Herramienta del <br/>Descubrimiento.</h2>
        <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10">
          Nuestra línea Geologis no es solo equipo; es una extensión de la voluntad del geólogo. Brújulas de espejismo y martillos forjados en el vacío, listos para descifrar los secretos de la litosfera.
        </p>
        <div className="space-y-6">
          <div className="flex items-start space-x-6">
            <div className="h-px w-8 bg-[#D4AF37] mt-3"></div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Precisión Absoluta</h3>
              <p className="text-zinc-500 text-sm">Margen de error nulo en condiciones magnéticas adversas.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6">
            <div className="h-px w-8 bg-zinc-700 mt-3"></div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Ergonomía Táctica</h3>
              <p className="text-zinc-500 text-sm">Diseño balanceado para reducir la fatiga en jornadas de campo extendidas.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div className="aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1544084944-15269ec7b5a0?auto=format&fit=crop&q=80&w=1200" 
            alt="Instrumento Geológico" 
            className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 hidden md:block w-64 p-8 bg-[#D4AF37] text-black">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-black">Especificación</p>
          <p className="text-lg font-serif italic">"Resistencia al impacto de 5000J sin deformación estructural."</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
