
import React, { useEffect, useState, useRef } from 'react';
import { HERO_STATIC_URL, GOLD_COLORS, HERO_KEYWORDS } from '../constants';
import heroBgVideo from '../hero-bg.mp4';
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
    <section ref={heroRef} className="relative h-[110vh] w-full overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-700">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic Background Layer */}
        <div
          className="absolute inset-0 z-0 will-change-transform transition-opacity duration-700 overflow-hidden"
          style={{
            transform: `translateY(${bgTranslateY}px) scale(${1 + progress * 0.15}) rotate(${progress * 1}deg)`,
            opacity: blendFactor,
            filter: `brightness(${0.5 + progress * 0.5}) contrast(1.1) saturate(${1 + progress * 0.2})`
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute inset-0"
            src={heroBgVideo}
          />
        </div>

        {/* Static Transition Layer */}
        <div
          className="absolute inset-0 z-[1] transition-opacity duration-1000 ease-out pointer-events-none"
          style={{
            backgroundImage: `url('${HERO_STATIC_URL}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: Math.max(0, 1 - progress * 2.5),
          }}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white/95 via-white/80 to-zinc-50/90 dark:from-black/70 dark:via-transparent dark:to-black transition-colors duration-700 backdrop-blur-sm dark:backdrop-blur-none pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-white/30 dark:bg-black/10 backdrop-grayscale-0 dark:backdrop-grayscale-[0.2] transition-colors duration-700 pointer-events-none"></div>

        <div
          className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: 1 - progress * 1.8
          }}
        >
          <div className="text-center max-w-5xl px-4 md:px-6 pointer-events-auto">
            <h1 className="text-zinc-900 dark:text-white text-[2.8rem] md:text-[9rem] font-title tracking-tighter mb-3 md:mb-8 leading-none drop-shadow-xl dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] mt-6 md:mt-0 transition-colors duration-700">
              OnfeVS <span className="text-[#A67C00] dark:text-[#D4AF37] italic transition-colors">Geologis</span>
            </h1>

            <div className="h-[70px] md:h-[100px] flex flex-col items-center justify-center mb-8 md:mb-16">
              <p className="text-zinc-600 dark:text-zinc-200 text-sm md:text-2xl max-w-3xl mx-auto font-subtitle font-light leading-relaxed tracking-wide drop-shadow-sm dark:drop-shadow-lg mb-1 transition-colors duration-700">
                Soluciones críticas y automatización en
              </p>
              <span
                className={`text-2xl md:text-6xl font-black transition-all duration-500 tracking-[0.08em] md:tracking-[0.2em] ${fade ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform -translate-y-4 scale-95'
                  } text-[#A67C00] dark:text-[#D4AF37] drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]`}
              >
                {HERO_KEYWORDS[keywordIndex]}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:space-x-8">
              <a href="#contacto" className="w-full sm:w-auto text-center group relative px-8 py-4 sm:px-16 sm:py-7 bg-zinc-900 dark:bg-[#D4AF37] text-white dark:text-black text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:scale-105 transition-all shadow-xl dark:shadow-[0_0_60px_rgba(212,175,55,0.4)]">
                <PixelCanvas colors={["#18181b", "#27272a"]} gap={6} speed={40} />
                <span className="relative z-10">Agendar Consultoría</span>
              </a>
              <a href="#proyectos" className="w-full sm:w-auto text-center group relative px-8 py-4 sm:px-16 sm:py-7 border-2 border-zinc-300 dark:border-[#D4AF37]/50 text-zinc-900 dark:text-[#D4AF37] text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-[#D4AF37] transition-all bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-lg dark:shadow-none">
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
