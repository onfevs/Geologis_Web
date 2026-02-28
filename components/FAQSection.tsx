
import React, { useState } from 'react';
import { FAQS, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-24">
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-4 block font-black">Knowledge Base</span>
        <h2 className="text-4xl md:text-5xl font-title text-white mb-6 italic">Preguntas Frecuentes</h2>
        <p className="text-zinc-500 font-light max-w-xl mx-auto">
          Resolvemos sus dudas técnicas sobre normatividad SIG, flujos de automatización y procesos de consultoría.
        </p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div 
            key={i} 
            className={`transition-all duration-500 border-b border-zinc-900 overflow-hidden ${
              openIndex === i ? 'bg-zinc-950/30' : 'hover:bg-zinc-950/10'
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-8 px-6 flex justify-between items-center text-left transition-colors group"
            >
              <div className="flex items-center space-x-6">
                <span className={`text-[10px] font-black transition-colors duration-500 ${
                  openIndex === i ? 'text-[#D4AF37]' : 'text-zinc-700'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-lg md:text-xl font-title transition-all duration-500 ${
                  openIndex === i ? 'text-white translate-x-2' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  {faq.question}
                </span>
              </div>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-full h-0.5 bg-[#D4AF37] transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}></span>
                <span className={`absolute w-0.5 h-full bg-[#D4AF37] transition-transform duration-500 ${openIndex === i ? 'rotate-90 scale-0' : ''}`}></span>
              </div>
            </button>
            <div 
              className={`transition-all duration-700 ease-in-out px-16 ${
                openIndex === i ? 'max-h-[500px] pb-10 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              <div className="border-l border-[#D4AF37]/30 pl-8">
                <p className="text-zinc-400 leading-relaxed font-light text-base md:text-lg">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-zinc-950 border border-zinc-900 rounded-sm text-center">
        <p className="text-zinc-500 text-sm mb-8">¿Tiene una consulta técnica específica que no aparece aquí?</p>
        <a 
          href="#contacto" 
          className="group relative inline-block px-12 py-5 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:text-white transition-all"
        >
          <PixelCanvas colors={GOLD_COLORS} gap={4} speed={50} />
          <span className="relative z-10">Consultar con un Ingeniero →</span>
        </a>
      </div>
    </div>
  );
};

export default FAQSection;
