
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6 py-4 md:px-12 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-[#D4AF37]/10' : 'bg-transparent py-10'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="group flex items-center space-x-3">
          <span className="text-white text-2xl font-serif tracking-tighter group-hover:text-[#D4AF37] transition-colors">OnfeVS</span>
          <span className="h-[1px] w-8 bg-[#D4AF37] group-hover:w-12 transition-all duration-700"></span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href}
                className={`text-[9px] uppercase font-bold tracking-[0.4em] transition-all duration-500 relative py-2 ${
                  activeSection === item.href.substring(1) 
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

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 space-y-2">
            <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-50 lg:hidden transition-transform duration-700 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full justify-center items-center space-y-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-white text-2xl font-serif tracking-widest hover:text-[#D4AF37] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contacto" 
            onClick={closeMenu}
            className="px-12 py-5 bg-[#D4AF37] text-black text-xs font-black uppercase tracking-[0.4em] rounded-full"
          >
            Contacto Directo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
