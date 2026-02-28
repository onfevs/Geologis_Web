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

      <div className="relative bg-[#050505] p-8 md:p-12 border border-[#D4AF37]/10 overflow-hidden rounded-[2rem]">
        {isSent && (
          <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-title mb-2">Mensaje Recibido</h3>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest">Un ingeniero responderá en breve.</p>
          </div>
        )}

        <form
          className="space-y-10"
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
            }).catch(error => {
              setIsSubmitting(false);
              alert("Error de red. Intente más tarde.");
            });
          }}
        >
          <input type="hidden" name="_captcha" value="false" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group">
              <input required name="name" type="text" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="Nombre Completo" />
            </div>
            <div className="relative group">
              <input required name="email" type="email" className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="Email Corporativo" />
            </div>
          </div>
          <div className="relative group">
            <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all resize-none" placeholder="Alcance del Proyecto o Consulta"></textarea>
          </div>

          <PremiumButton
            type="submit"
            disabled={isSubmitting}
            variant="solid"
            className="w-full"
          >
            {isSubmitting ? 'Transmitiendo...' : 'Enviar Consulta Técnica'}
          </PremiumButton>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
