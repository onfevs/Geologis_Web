
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

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

      // Animate menu in
      if (menuRef.current) {
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

      // Fade out menu
      if (menuRef.current) {
        gsap.to(menuRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      }
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6 py-4 md:px-12 ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-[#D4AF37]/10' : 'bg-transparent py-10'
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="group flex items-center space-x-3">
          <span className="text-white text-2xl font-title tracking-tighter group-hover:text-[#D4AF37] transition-colors">OnfeVS</span>
          <span className="h-[1px] w-8 bg-[#D4AF37] group-hover:w-12 transition-all duration-700"></span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`text-[9px] uppercase font-bold tracking-[0.4em] transition-all duration-500 relative py-2 ${activeSection === item.href.substring(1)
                  ? 'text-[#D4AF37]'
                  : 'text-zinc-500 hover:text-white'
                  }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-px bg-[#D4AF37] transition-all duration-500 ${activeSection === item.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="group relative px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:text-white hover:border-[#D4AF37] transition-all">
              <PixelCanvas colors={GOLD_COLORS} gap={3} speed={60} />
              <span className="relative z-10">Agendar Cita</span>
            </a>
          </li>
        </ul>

        {/* Mobile Toggle — GSAP Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span ref={line1} className="hamburger-line" />
          <span ref={line2} className="hamburger-line" />
          <span ref={line3} className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 min-h-screen z-[50] lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(40px)' }}
      >
        {/* Clickable Backdrop */}
        <div
          className="absolute inset-0"
          onClick={closeMenu}
          onTouchEnd={closeMenu}
          aria-label="Cerrar menú"
        />

        {/* Gold accent top-left */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#D4AF37]/4 blur-3xl pointer-events-none" />

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
              className={`pointer-events-auto text-3xl font-title tracking-widest transition-all duration-300 hover:text-[#D4AF37] hover:tracking-[0.18em] ${activeSection === item.href.substring(1)
                ? 'text-[#D4AF37]'
                : 'text-white'
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
