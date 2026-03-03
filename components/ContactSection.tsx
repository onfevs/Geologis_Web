import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import PremiumButton from './PremiumButton';

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
        <SectionHeader
          subtitle="Inicio Inmediato"
          titleLight="Inicie su"
          titleGold="Próximo Proyecto"
          description="Contacte con nuestro equipo de ingeniería para una evaluación técnica de sus necesidades geoespaciales."
          className="mb-12"
        />

        <div className="space-y-10">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">Disponibles Ahora · Resp. &lt; 2h</span>
          </div>

          <div className="group">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Sede Central</p>
            <p className="text-zinc-900 dark:text-white text-sm font-light transition-colors">Ecosistema Minero, Colombia.</p>
          </div>
          <div className="group">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 opacity-50 group-hover:opacity-100 transition-opacity">Canal Directo</p>
            <a href="mailto:ingenieria@onfevs.com" className="text-zinc-900 dark:text-white text-sm font-light hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors">ingenieria@onfevs.com</a>
          </div>
          {/* WhatsApp direct link */}
          <a
            href="https://wa.me/573001234567?text=Hola%2C%20me%20interesa%20una%20consultor%C3%ADa%20geoespacial"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 w-fit px-6 py-3 rounded-full border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/15 hover:border-[#25D366]/60 transition-all"
          >
            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[#25D366] text-[11px] font-black uppercase tracking-[0.25em]">WhatsApp Directo</span>
          </a>
        </div>
      </div>

      <div className="relative bg-zinc-50 dark:bg-[#050505] p-8 md:p-12 border border-zinc-200 dark:border-[#D4AF37]/10 overflow-hidden rounded-[2rem] transition-colors shadow-xl dark:shadow-none">
        {isSent && (
          <div className="absolute inset-0 z-20 bg-white/95 dark:bg-black/95 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm transition-colors">
            <div className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-zinc-900 dark:text-white text-2xl font-title mb-2 transition-colors">Mensaje Recibido</h3>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest">Un ingeniero responderá en breve.</p>
          </div>
        )}

        <form
          className="space-y-8"
          action="https://formsubmit.co/ajax/ingenieria@onfevs.com"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);

            fetch(form.action, {
              method: form.method,
              body: JSON.stringify(Object.fromEntries(data)),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }).then(response => {
              if (response.ok) {
                setIsSubmitting(false);
                setIsSent(true);
                form.reset();
                setTimeout(() => setIsSent(false), 5000);
              } else {
                setIsSubmitting(false);
                alert("Hubo un problema procesando el envío. Intente de nuevo.");
              }
            }).catch(() => {
              setIsSubmitting(false);
              alert("Error de red. Intente más tarde.");
            });
          }}
        >
          <input type="hidden" name="_captcha" value="false" />

          {/* Row 1: Nombre + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="block text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] mb-2 font-black opacity-60 group-focus-within:opacity-100 transition-opacity">Nombre Completo *</label>
              <input required name="name" type="text"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                placeholder="Ing. Jorge Vallejo" />
            </div>
            <div className="relative group">
              <label className="block text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] mb-2 font-black opacity-60 group-focus-within:opacity-100 transition-opacity">Email Corporativo *</label>
              <input required name="email" type="email"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                placeholder="nombre@empresa.com" />
            </div>
          </div>

          {/* Row 2: Empresa + Servicio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="block text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] mb-2 font-black opacity-60 group-focus-within:opacity-100 transition-opacity">Empresa / Organización</label>
              <input name="empresa" type="text"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                placeholder="Minera Central S.A.S." />
            </div>
            <div className="relative group">
              <label className="block text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] mb-2 font-black opacity-60 group-focus-within:opacity-100 transition-opacity">Servicio de Interés</label>
              <select name="servicio"
                className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 pb-3 text-sm focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer text-zinc-600 dark:text-zinc-400 focus:text-zinc-900 dark:focus:text-white"
              >
                <option value="" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Seleccionar servicio…</option>
                <option value="ANM - GDB" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">GDB / FBM — Minería ANM</option>
                <option value="ANLA - ICA" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">ICA / EIA — Ambiental ANLA</option>
                <option value="Catastro LADM-COL" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Catastro Multipropósito LADM-COL</option>
                <option value="Python Automation" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Automatización Python / ArcPy</option>
                <option value="Consultoría SIG" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Consultoría SIG Geoespacial</option>
                <option value="Otro" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Otro / Consulta General</option>
              </select>
            </div>
          </div>

          {/* Row 3: Mensaje */}
          <div className="relative group">
            <label className="block text-[#D4AF37] text-[9px] uppercase tracking-[0.35em] mb-2 font-black opacity-60 group-focus-within:opacity-100 transition-opacity">Alcance del Proyecto *</label>
            <textarea required name="message" rows={4}
              className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
              placeholder="Describa brevemente su proyecto, ubicación, entidad reguladora y plazo estimado…" />
          </div>

          <PremiumButton
            type="submit"
            disabled={isSubmitting}
            variant="solid"
            className="w-full"
          >
            {isSubmitting ? 'Transmitiendo…' : 'Enviar Consulta Técnica'}
          </PremiumButton>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
