
import React, { useState } from 'react';
import { FAQS, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-24">
        <span className="text-[#A67C00] dark:text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-4 block font-black transition-colors">Knowledge Base</span>
        <h2 className="text-4xl md:text-5xl font-title text-zinc-900 dark:text-white mb-6 italic transition-colors">Preguntas Frecuentes</h2>
        <p className="text-zinc-600 dark:text-zinc-500 font-light max-w-xl mx-auto transition-colors">
          Resolvemos sus dudas técnicas sobre normatividad SIG, flujos de automatización y procesos de consultoría.
        </p>
      </div>

      <div className="space-y-1 border-t border-zinc-200 dark:border-zinc-900">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`transition-all duration-300 border-b border-zinc-200 dark:border-zinc-900 overflow-hidden ${openIndex === i ? 'bg-zinc-100/80 dark:bg-zinc-950/50' : 'hover:bg-zinc-100/40 dark:hover:bg-zinc-950/20'
              }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-7 px-6 flex justify-between items-center text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              aria-expanded={openIndex === i}
            >
              <div className="flex items-center space-x-6">
                <span className={`font-mono text-[10px] font-black transition-colors duration-300 ${openIndex === i ? 'text-[#A67C00] dark:text-[#D4AF37]' : 'text-zinc-400 dark:text-zinc-700'
                  }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-lg md:text-xl font-title transition-all duration-300 ${openIndex === i ? 'text-zinc-900 dark:text-white translate-x-2' : 'text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'
                  }`}>
                  {faq.question}
                </span>
              </div>
              <div className="relative w-5 h-5 shrink-0 flex items-center justify-center ml-4">
                <span className={`absolute w-4 h-0.5 bg-[#D4AF37] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}></span>
                <span className={`absolute w-0.5 h-4 bg-[#D4AF37] transition-all duration-300 ${openIndex === i ? 'opacity-0 scale-0' : ''}`}></span>
              </div>
            </button>
            {/* CSS grid trick for smooth height animation */}
            <div
              className="grid transition-all duration-500 ease-in-out"
              style={{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-16 pb-10">
                  <div className="border-l border-[#D4AF37]/30 pl-8">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-base md:text-lg transition-colors">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-10 section-secondary dark:bg-zinc-950 border border-[#C8BFA8] dark:border-zinc-900 rounded-[2rem] text-center transition-colors">
        <p className="text-zinc-700 dark:text-zinc-500 text-sm mb-8 transition-colors">¿Tiene una consulta técnica específica que no aparece aquí?</p>
        <a
          href="#contacto"
          className="group relative inline-block px-12 py-5 border border-[#D4AF37]/40 text-[#A67C00] dark:text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden hover:text-zinc-900 dark:hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full"
        >
          <PixelCanvas colors={GOLD_COLORS} gap={4} speed={50} />
          <span className="relative z-10">Consultar con un Ingeniero →</span>
        </a>
      </div>
    </div>
  );
};

export default FAQSection;
