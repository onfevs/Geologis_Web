
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';
import { ThemeToggle } from './ThemeToggle';

// GSAP from CDN
declare const gsap: any;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hamburger line refs
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP hamburger + menu animation
  useEffect(() => {
    if (typeof gsap === 'undefined') return;

    if (isMobileMenuOpen) {
      // Animate hamburger → X
      gsap.to(line1.current, { rotation: 45, y: 8, backgroundColor: '#D4AF37', duration: 0.35, ease: 'power2.out' });
      gsap.to(line2.current, { scaleX: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
      gsap.to(line3.current, { rotation: -45, y: -8, backgroundColor: '#D4AF37', duration: 0.35, ease: 'power2.out' });

      // Show menu first (restore display), then animate in
      if (menuRef.current) {
        menuRef.current.style.display = 'flex';
        gsap.fromTo(menuRef.current,
          { opacity: 0, backdropFilter: 'blur(0px)' },
          { opacity: 1, backdropFilter: 'blur(40px)', duration: 0.4, ease: 'power2.out' }
        );
      }

      // Stagger menu items
      if (menuItemsRef.current) {
        const items = menuItemsRef.current.querySelectorAll('a');
        gsap.fromTo(items,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, delay: 0.1, ease: 'power3.out' }
        );
      }
    } else {
      // Animate X → hamburger
      gsap.to(line1.current, { rotation: 0, y: 0, backgroundColor: '#ffffff', duration: 0.35, ease: 'power2.in' });
      gsap.to(line2.current, { scaleX: 1, opacity: 1, duration: 0.25, delay: 0.1, ease: 'power2.in' });
      gsap.to(line3.current, { rotation: 0, y: 0, backgroundColor: '#ffffff', duration: 0.35, ease: 'power2.in' });

      // Fade out menu → then hide completely so it CANNOT intercept any touch
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            // CRITICAL: set display none after animation — opacity:0 alone still blocks touches
            if (menuRef.current) menuRef.current.style.display = 'none';
          }
        });
      }
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6 py-4 md:px-12 ${isScrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl py-4 border-b border-zinc-200 dark:border-[#D4AF37]/10' : 'bg-transparent py-10'
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="group flex items-center space-x-3">
          <span className="text-zinc-900 dark:text-white text-2xl font-title tracking-tighter group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors">OnfeVS</span>
          <span className="h-[1px] w-8 bg-[#D4AF37] group-hover:w-12 transition-all duration-700"></span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-[9px] uppercase font-bold tracking-[0.4em] transition-all duration-300 relative py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:rounded ${activeSection === item.href.substring(1)
                  ? 'text-[#D4AF37]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${activeSection === item.href.substring(1) ? 'w-full' : 'w-0'}`}></span>
              </a>
            </li>
          ))}
          <li className="flex items-center gap-6">
            <ThemeToggle />
            <a href="#contacto" className="group relative px-8 py-3 border border-zinc-300 dark:border-[#D4AF37]/40 text-[#A67C00] dark:text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-[#D4AF37] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <PixelCanvas colors={GOLD_COLORS} gap={3} speed={60} />
              <span className="relative z-10">Agendar Cita</span>
            </a>
          </li>
        </ul>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile Toggle — GSAP Hamburger */}
          <button
            className="flex flex-col justify-center items-center gap-[6px] w-11 h-11 relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            <span ref={line1} className="w-6 h-[2px] bg-zinc-900 dark:bg-white rounded-full transition-transform" />
            <span ref={line2} className="w-6 h-[2px] bg-zinc-900 dark:bg-white rounded-full transition-transform" />
            <span ref={line3} className="w-6 h-[2px] bg-zinc-900 dark:bg-white rounded-full transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 min-h-screen z-[50] lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-3xl flex-col"
        style={{ display: 'none' }}
      >
        {/* Clickable Backdrop */}
        <div
          className="absolute inset-0"
          onClick={closeMenu}
          onTouchEnd={closeMenu}
          aria-label="Cerrar menú"
        />

        {/* Gold accent top-left */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#D4AF37]/8 dark:bg-[#D4AF37]/4 blur-3xl pointer-events-none" />

        {/* Menu Content */}
        <div
          ref={menuItemsRef}
          className="relative flex flex-col h-full justify-center items-center space-y-8 pt-20 pointer-events-none"
        >
          {/* Gold line accent */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-12 h-px bg-[#D4AF37]/40" />

          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`pointer-events-auto text-3xl font-title tracking-widest transition-all duration-300 hover:text-[#D4AF37] hover:tracking-[0.18em] min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:rounded ${activeSection === item.href.substring(1)
                ? 'text-[#D4AF37]'
                : 'text-zinc-800 dark:text-white'
                }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={closeMenu}
            className="pointer-events-auto mt-4 px-12 py-5 bg-[#D4AF37] text-black text-xs font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-transform"
          >
            Contacto Directo
          </a>
          {/* Social Icons Row */}
          <div className="pointer-events-auto flex items-center gap-5 mt-2">
            <a href="https://www.linkedin.com/in/jorgevallejo/" target="_blank" rel="noopener noreferrer" aria-label="Ver perfil de LinkedIn" className="w-11 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-[#D4AF37] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://www.instagram.com/onfevs/" target="_blank" rel="noopener noreferrer" aria-label="Ver perfil de Instagram" className="w-11 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-[#D4AF37] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.youtube.com/@onfevs" target="_blank" rel="noopener noreferrer" aria-label="Ver canal de YouTube" className="w-11 h-11 border border-zinc-300 dark:border-zinc-700 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-[#D4AF37] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
