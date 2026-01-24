
import React, { useEffect, useState, useRef } from 'react';
import { HERO_BG_URL, HERO_STATIC_URL, GOLD_COLORS, HERO_KEYWORDS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animación de palabras clave
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setKeywordIndex((prev) => (prev + 1) % HERO_KEYWORDS.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const progress = Math.min(1, Math.max(0, scrollY / 900));
  
  // Parallax Ratios
  const bgTranslateY = scrollY * 0.25; 
  const textTranslateY = scrollY * 0.5;
  const blendFactor = 0.5 + (progress * 0.5);

  return (
    <section ref={heroRef} className="relative h-[110vh] w-full overflow-hidden bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic Background Layer */}
        <div 
          className="absolute inset-0 z-0 will-change-transform transition-opacity duration-700"
          style={{
            backgroundImage: `url('${HERO_BG_URL}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: `translateY(${bgTranslateY}px) scale(${1 + progress * 0.15}) rotate(${progress * 1}deg)`,
            opacity: blendFactor,
            filter: `brightness(${0.5 + progress * 0.5}) contrast(1.1) saturate(${1 + progress * 0.2})`
          }}
        />
        
        {/* Static Transition Layer */}
        <div 
          className="absolute inset-0 z-[1] transition-opacity duration-1000 ease-out pointer-events-none"
          style={{
            backgroundImage: `url('${HERO_STATIC_URL}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: Math.max(0, 1 - progress * 2.5),
            filter: 'grayscale(100%) brightness(0.4)'
          }}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-transparent to-black"></div>
        <div className="absolute inset-0 z-[2] bg-black/10 backdrop-grayscale-[0.2]"></div>

        <div 
          className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: 1 - progress * 1.8
          }}
        >
          <div className="text-center max-w-5xl px-6 pointer-events-auto">
            <h1 className="text-white text-6xl md:text-[9rem] font-serif tracking-tighter mb-8 leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              OnfeVS <span className="text-[#D4AF37] italic">Geologis</span>
            </h1>
            
            <div className="h-[100px] flex flex-col items-center justify-center mb-16">
              <p className="text-zinc-200 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-lg mb-2">
                Soluciones críticas y automatización en
              </p>
              <span 
                className={`text-4xl md:text-6xl font-black transition-all duration-500 tracking-[0.2em] ${
                  fade ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform -translate-y-4 scale-95'
                } text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]`}
              >
                {HERO_KEYWORDS[keywordIndex]}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-10">
              <a href="#contacto" className="group relative px-16 py-7 bg-[#D4AF37] text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_0_60px_rgba(212,175,55,0.4)]">
                <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={6} speed={40} />
                <span className="relative z-10">Agendar Consultoría</span>
              </a>
              <a href="#proyectos" className="group relative px-16 py-7 border-2 border-[#D4AF37]/50 text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:text-white hover:border-[#D4AF37] transition-all bg-black/50 backdrop-blur-md">
                <PixelCanvas colors={GOLD_COLORS} gap={6} speed={40} />
                <span className="relative z-10">Casos de Éxito</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center opacity-50">
            <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce"></div>
            <p className="text-[#D4AF37] text-[8px] uppercase tracking-[0.5em] mt-4 font-bold">Scroll</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
