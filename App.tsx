
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import DomainsTabbedSection from './components/DomainsTabbedSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import YoutubeSection from './components/YoutubeSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import MapSection from './components/MapSection';
import ContactSection from './components/ContactSection';
import LoadingScreen from './components/LoadingScreen';
import ClientsCarousel from './components/ClientsCarousel';
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

// --- Sub-componente: Botón Flotante WhatsApp ---
const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      setVisible(scrollY > 300);
      setNearFooter(scrollY + windowHeight > pageHeight - 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/573001234567?text=Hola%2C%20me%20interesa%20una%20consultor%C3%ADa%20geoespacial"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultoría por WhatsApp"
      className={`fixed right-6 z-[200] flex items-center gap-3 transition-all duration-500 ease-out ${visible && !nearFooter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      style={{ bottom: '5rem' }}
    >
      {/* Pill label — solo desktop */}
      <span className="hidden md:block bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-xl shadow-[#D4AF37]/20 whitespace-nowrap">
        Consultoría Inmediata
      </span>
      {/* Icon button */}
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
    </a>
  );
};

// --- Sub-componente: Scroll To Top ---
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className={`fixed right-6 bottom-6 z-[200] w-11 h-11 border border-[#D4AF37]/40 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-xl ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
};

// --- Sub-componente: Cursor Personalizado (OPTIMIZACIÓN TOTAL - ZERO LAG) ---
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Verificar si es táctil para no renderizar cursores pesados ni escuchar eventos
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

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

  if (isTouchDevice) return null;

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
    // Smart loading: hide splash as soon as page is ready, max 1.5s, min 500ms
    const start = Date.now();
    const hide = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 500 - elapsed); // minimum 500ms to avoid flash
      setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
      // Fallback: never block more than 1.5s
      const fallback = setTimeout(() => setLoading(false), 1500);
      return () => {
        window.removeEventListener('load', hide);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative section-primary dark:bg-black text-zinc-900 dark:text-white selection:bg-[#D4AF37] selection:text-black antialiased overflow-x-hidden">
      {/* Skip to main content — keyboard & screen-reader accessibility */}
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <CustomCursor />
      <ScrollProgress />
      <FloatingCTA />
      <ScrollToTop />

      {/* Textura de ruido cinemático optimizada — visible in both modes, slightly more opaque in light mode */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ClientsCarousel />

        {/* 1. What we do (The Value Proposition) */}
        <RevealSection id="servicios" bgColor="section-primary dark:bg-zinc-950 transition-colors duration-150"><ServicesSection /></RevealSection>

        {/* 2. Deep Dive into Domains — stats embedded per tab */}
        <RevealSection id="dominios" bgColor="section-secondary dark:bg-black transition-colors duration-150"><DomainsTabbedSection /></RevealSection>

        {/* 4. Proof of Work (Trust) */}
        <RevealSection id="proyectos" bgColor="section-primary dark:bg-black transition-colors duration-150"><ProjectsSection /></RevealSection>
        <RevealSection id="media" bgColor="section-secondary dark:bg-zinc-950 transition-colors duration-150"><YoutubeSection /></RevealSection>

        {/* 5. Social Proof (Validation) */}
        <RevealSection id="testimonios" bgColor="section-primary dark:bg-black transition-colors duration-150"><ReviewsSection /></RevealSection>

        {/* 6. Objections & Logistics (Friction Removal) */}
        <RevealSection id="faq" bgColor="section-secondary dark:bg-zinc-950 transition-colors duration-150"><FAQSection /></RevealSection>
        <RevealSection id="ubicacion" bgColor="section-primary dark:bg-black transition-colors duration-150"><MapSection /></RevealSection>

        {/* 7. Call To Action (Conversion) */}
        <RevealSection id="contacto" bgColor="section-secondary dark:bg-zinc-950 transition-colors duration-150"><ContactSection /></RevealSection>
      </main>

      <footer className="py-16 md:py-24 px-6 border-t border-zinc-300/60 dark:border-zinc-900 footer-surface dark:bg-black relative overflow-hidden transition-colors">
        {/* Decorative gold line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 dark:via-[#D4AF37]/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 items-start">
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h2 className="text-3xl font-title text-zinc-900 dark:text-white tracking-tighter italic transition-colors">OnfeVS <span className="text-[#D4AF37]">Geologis</span></h2>
              <p className="text-zinc-600 dark:text-zinc-500 text-sm font-light leading-relaxed transition-colors">
                Ingeniería geoespacial de alta fidelidad. Expertos en cumplimiento normativo ANM/ANLA y automatización de datos territoriales en Colombia.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-zinc-900 dark:text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4 transition-colors">Navegación</h3>
              <ul className="space-y-4">
                {NAV_ITEMS.map(item => (
                  <li key={item.label}>
                    <a href={item.href} className="text-zinc-600 dark:text-zinc-500 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] text-[11px] uppercase tracking-[0.25em] transition-all flex items-center group py-2 min-h-[44px] md:min-h-0 md:py-0">
                      <span className="w-0 group-hover:w-4 h-px bg-[#D4AF37] mr-0 group-hover:mr-3 transition-all duration-300"></span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-zinc-900 dark:text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4 transition-colors">Legal & Técnica</h3>
              <ul className="space-y-4">
                {['Normas GDB 2024', 'LADM-COL v3.0', 'Términos de Servicio', 'Política de Datos', 'Licenciamiento ANLA'].map(item => (
                  <li key={item}><a href="#" className="text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors block py-2 min-h-[44px] md:min-h-0 md:py-0 flex items-center">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h3 className="text-zinc-900 dark:text-white text-[11px] font-black uppercase tracking-[0.4em] border-l-2 border-[#D4AF37] pl-4 transition-colors">Presencia Digital</h3>
              <div className="grid grid-cols-3 gap-4 max-w-[200px]">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jorgevallejo/" target="_blank" rel="noopener noreferrer"
                  className="social-icon-btn group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0077B5'; (e.currentTarget as HTMLElement).style.borderColor = '#0077B5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/onfevs/" target="_blank" rel="noopener noreferrer"
                  className="social-icon-btn group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,#E1306C,#833AB4)'; (e.currentTarget as HTMLElement).style.borderColor = '#E1306C'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                {/* YouTube */}
                <a
                  href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                  className="social-icon-btn group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FF0000'; (e.currentTarget as HTMLElement).style.borderColor = '#FF0000'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
              <div className="pt-6">
                <a href="#contacto" className="group relative flex items-center justify-center px-10 py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:bg-white transition-all w-full text-center shadow-xl shadow-[#D4AF37]/10">
                  <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={6} speed={40} />
                  <span className="relative z-10">Agendar Consultoría</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 text-center border-t border-zinc-200 dark:border-zinc-900 mt-12 transition-colors">
            <p className="text-zinc-500 dark:text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-light transition-colors">
              © 2026 OnfeVS Geologis · Colombia · Ingeniería SIG &amp; Automatización Python
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
