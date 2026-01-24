
import React, { useState } from 'react';
import { PixelCanvas } from './PixelCanvas';
import { GOLD_COLORS } from '../constants';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <div id="contacto" className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">Inicie su <br/><span className="text-[#D4AF37]">Próximo Proyecto</span>.</h2>
        <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
          Contacte con nuestro equipo de ingeniería para una evaluación técnica de sus necesidades geoespaciales.
        </p>
        
        <div className="space-y-12">
          <div className="group">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Sede Central</p>
            <p className="text-white text-sm font-light">Ecosistema Minero, Colombia.</p>
          </div>
          <div className="group">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Canal Directo</p>
            <p className="text-white text-sm font-light">ingenieria@onfevs.com</p>
          </div>
        </div>
      </div>

      <div className="relative bg-[#050505] p-8 md:p-12 border border-[#D4AF37]/10 overflow-hidden">
        {isSent && (
          <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-serif mb-2">Mensaje Recibido</h3>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest">Un ingeniero responderá en breve.</p>
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group">
              <input required type="text" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="Nombre" />
            </div>
            <div className="relative group">
              <input required type="email" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="Email Corporativo" />
            </div>
          </div>
          <div className="relative group">
            <textarea required rows={4} className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all resize-none" placeholder="Alcance del Proyecto"></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="group relative w-full py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
          >
            <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={6} speed={40} />
            <span className="relative z-10">{isSubmitting ? 'Transmitiendo...' : 'Enviar Consulta Técnica'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
