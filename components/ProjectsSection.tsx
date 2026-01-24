
import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS } from '../constants';

const ProjectsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lógica de Autoplay Fluido
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        
        // Si está cerca del final, vuelve al inicio con un scroll suave
        // de lo contrario, avanza una porción del ancho visible
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 450, behavior: 'smooth' });
        }
      }
    }, 3500); // Movimiento cada 3.5 segundos para un ritmo premium

    return () => clearInterval(interval);
  }, [isPaused]);

  // Navegación Manual
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.7; // Desplaza el 70% del contenedor
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div 
      className="relative group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
        <div className="max-w-2xl">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-4 block font-black">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Casos de Éxito & <span className="text-[#D4AF37]">Resultados</span>.</h2>
          <p className="text-zinc-400 font-light leading-relaxed max-w-xl">
            Explora nuestra trayectoria. El carrusel se mueve automáticamente, pero puedes tomar el control total usando las flechas o deslizando.
          </p>
        </div>
        
        {/* Controles Manuales Premium */}
        <div className="flex space-x-6 mt-10 md:mt-0 z-30">
          <button 
            onClick={() => scroll('left')}
            className="group w-16 h-16 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-700 rounded-full bg-black/40 backdrop-blur-sm shadow-xl"
            aria-label="Ver anterior"
          >
            <span className="text-2xl group-hover:-translate-x-1.5 transition-transform duration-500">←</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="group w-16 h-16 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-700 rounded-full bg-black/40 backdrop-blur-sm shadow-xl"
            aria-label="Ver siguiente"
          >
            <span className="text-2xl group-hover:translate-x-1.5 transition-transform duration-500">→</span>
          </button>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-16 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              className="min-w-[320px] md:min-w-[580px] snap-start group/card relative bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#D4AF37]/30"
            >
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-black/50 group-hover/card:bg-transparent transition-all duration-1000 z-10 pointer-events-none"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover/card:scale-110 group-hover/card:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] text-[#D4AF37] uppercase tracking-[0.4em] mb-3 font-black">{project.category}</p>
                    <h3 className="text-white text-2xl md:text-3xl font-serif">{project.title}</h3>
                  </div>
                </div>
                <div className="h-px w-full bg-zinc-900 mb-8 group-hover/card:bg-[#D4AF37]/40 transition-all duration-1000"></div>
                <p className="text-zinc-400 text-sm md:text-base italic flex items-start">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-4 mt-2 shrink-0 animate-pulse"></span>
                  <span><span className="text-white font-bold not-italic mr-2">Impacto:</span> {project.result}</span>
                </p>
              </div>
              
              <div className="absolute top-8 left-8 z-20 bg-[#D4AF37] text-black text-[9px] font-black px-5 py-2 uppercase tracking-[0.2em] translate-y-[-120%] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700 shadow-2xl">
                Premium Project
              </div>
            </div>
          ))}
        </div>
        
        {/* Sombras de profundidad lateral */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/60 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/60 to-transparent z-20 pointer-events-none"></div>
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        {PROJECTS.map((_, i) => (
          <div key={i} className="w-8 h-0.5 bg-zinc-900 overflow-hidden">
            <div className={`h-full bg-[#D4AF37] transition-all duration-1000 ${!isPaused ? 'w-full' : 'w-0'}`} style={{ transitionDelay: `${i * 100}ms` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
