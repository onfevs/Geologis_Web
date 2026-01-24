
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import SectorsSection from './components/SectorsSection';
import MiningSection from './components/MiningSection';
import EnvironmentSection from './components/EnvironmentSection';
import CadastreSection from './components/CadastreSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import YoutubeSection from './components/YoutubeSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import MapSection from './components/MapSection';
import ContactSection from './components/ContactSection';
import LoadingScreen from './components/LoadingScreen';
import { PixelCanvas } from './components/PixelCanvas';
import { NAV_ITEMS, YOUTUBE_URL, GOLD_COLORS } from './constants';

// --- Sub-componente: Barra de Progreso de Scroll ---
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#996515] via-[#D4AF37] to-[#F5D142] transition-all duration-150 ease-out shadow-[0_0_15px_#D4AF37]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// --- Sub-componente: Cursor Personalizado (OPTIMIZACIÓN TOTAL - ZERO LAG) ---
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const updateCursor = () => {
      // Inercia para el anillo (0.15 = fluido y elegante)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      requestAnimationFrame(updateCursor);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isActionable = target.closest('a, button, .group, input, textarea, [role="button"]');
      if (ringRef.current) {
        if (isActionable) {
          ringRef.current.style.width = '75px';
          ringRef.current.style.height = '75px';
          ringRef.current.style.backgroundColor = 'rgba(212,175,55,0.1)';
          ringRef.current.style.borderColor = '#D4AF37';
        } else {
          ringRef.current.style.width = '40px';
          ringRef.current.style.height = '40px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'rgba(212,175,55,0.4)';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    const animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      {/* Dot: Núcleo con Glow masivo */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full z-[1000] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform shadow-[0_0_20px_4px_#D4AF37,0_0_8px_#fff]"
      ></div>
      {/* Ring: Seguidor suave */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-[#D4AF37]/40 rounded-full z-[999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform transition-[width,height,background-color,border-color] duration-300 ease-out"
      ></div>
    </div>
  );
};

// Envoltorio de sección con animación suave de entrada
// Fix: Explicitly type children as optional in props definition to avoid JSX attribute mismatch errors in React 18
const RevealSection: React.FC<React.PropsWithChildren<{ id: string; bgColor?: string; className?: string }>> = ({ children, id, bgColor, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      id={id}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <Section id={id} bgColor={bgColor} className={className}>
        {children}
      </Section>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative bg-black text-white selection:bg-[#D4AF37] selection:text-black antialiased overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Textura de ruido cinemático optimizada */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <RevealSection id="sectores" bgColor="bg-black" className="!pt-4 !pb-20"><SectorsSection /></RevealSection>
        <RevealSection id="servicios" bgColor="bg-zinc-950"><ServicesSection /></RevealSection>
        <RevealSection id="mineria" bgColor="bg-black"><MiningSection /></RevealSection>
        <RevealSection id="medioambiente" bgColor="bg-zinc-950"><EnvironmentSection /></RevealSection>
        <RevealSection id="catastro" bgColor="bg-black"><CadastreSection /></RevealSection>
        <RevealSection id="proyectos" bgColor="bg-zinc-950"><ProjectsSection /></RevealSection>
        <RevealSection id="media" bgColor="bg-black"><YoutubeSection /></RevealSection>
        <RevealSection id="testimonios" bgColor="bg-zinc-950"><ReviewsSection /></RevealSection>
        <RevealSection id="faq" bgColor="bg-black"><FAQSection /></RevealSection>
        <RevealSection id="ubicacion" bgColor="bg-zinc-950"><MapSection /></RevealSection>
        <RevealSection id="contacto" bgColor="bg-black"><ContactSection /></RevealSection>
      </main>

      <footer className="py-32 px-6 border-t border-zinc-900 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 items-start">
            <div className="space-y-10">
              <h2 className="text-4xl font-serif text-white tracking-tighter italic">OnfeVS <span className="text-[#D4AF37]">Geologis</span></h2>
              <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
                Ingeniería geoespacial de alta fidelidad. Expertos en cumplimiento normativo ANM/ANLA y automatización de datos territoriales en Colombia.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="group flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] hover:text-white transition-colors"
              >
                <span>Sistemas al Inicio</span>
                <span className="w-10 h-px bg-[#D4AF37] group-hover:w-16 transition-all duration-500"></span>
              </button>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4">Navegación</h3>
              <ul className="space-y-4">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <a href={item.href} className="text-zinc-500 hover:text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] transition-all flex items-center group">
                      <span className="w-0 group-hover:w-4 h-px bg-[#D4AF37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4">Legal & Técnica</h3>
              <ul className="space-y-4">
                {['Normas GDB 2024', 'LADM-COL v3.0', 'Términos de Servicio', 'Política de Datos', 'Licenciamiento ANLA'].map(item => (
                  <li key={item}><a href="#" className="text-zinc-600 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h3 className="text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4">Presencia Digital</h3>
              <div className="grid grid-cols-3 gap-4 max-w-[200px]">
                {/* LinkedIn */}
                <a href="#" className="w-11 h-11 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all group rounded-xl">
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-11 h-11 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all group rounded-xl">
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* YouTube */}
                <a href={YOUTUBE_URL} target="_blank" className="w-11 h-11 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all group rounded-xl">
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <div className="pt-6">
                <a href="#contacto" className="group relative inline-block px-10 py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:bg-white transition-all w-full text-center shadow-xl shadow-[#D4AF37]/10">
                  <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={6} speed={40} />
                  <span className="relative z-10">Agendar Consultoría</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-32 text-center border-t border-zinc-900 mt-24">
            <p className="text-zinc-600 text-[9px] tracking-[0.8em] uppercase font-light">
              © 2026 OnfeVS Geologis. Colombia — Ingeniería SIG & Automatización Python.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
