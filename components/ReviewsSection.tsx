
import React from 'react';
import { REVIEWS } from '../constants';

const ReviewsSection: React.FC = () => (
  <div>
    <div className="mb-24 text-center">
      <span className="font-mono text-[#A67C00] dark:text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-4 block transition-colors">Capítulo III</span>
      <h2 className="text-4xl md:text-5xl font-title text-zinc-900 dark:text-white mb-6 italic transition-colors">Testimonios de Confianza</h2>
      <div className="h-px w-16 bg-[#D4AF37]/50 mx-auto" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {REVIEWS.map((review) => (
        <div
          key={review.id}
          className="group relative p-10 md:p-12 card-surface dark:bg-zinc-950/50 border border-[#C8BFA8] dark:border-zinc-900 rounded-[2rem] transition-all duration-300 hover:border-[#D4AF37]/60 dark:hover:border-[#D4AF37]/30 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.18)] dark:hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.05)] overflow-hidden"
        >
          {/* Star Rating */}
          <div className="flex space-x-1 mb-8" aria-label={`Calificación: ${review.rating} de 5 estrellas`}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < review.rating ? 'text-[#A67C00] dark:text-white group-hover:text-[#A67C00] dark:group-hover:text-[#D4AF37]' : 'text-zinc-300/60 dark:text-zinc-800'} transition-colors duration-300`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Testimonial Content */}
          <blockquote className="relative mb-12">
            <span className="absolute -top-6 -left-4 text-6xl font-title text-zinc-900/5 dark:text-white/5 pointer-events-none transition-colors">"</span>
            <p className="text-zinc-800 dark:text-zinc-300 text-xl md:text-2xl font-title leading-relaxed italic relative z-10 group-hover:text-[#8B6200] dark:group-hover:text-[#D4AF37] transition-colors duration-500">
              {review.content}
            </p>
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#996515] to-[#F5D142] shadow-lg shadow-[#D4AF37]/20">
              <span className="text-black text-[11px] font-black uppercase">
                {review.author.split(' ').slice(0, 2).map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div className="w-0 flex-1">
              <cite className="not-italic text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest block mb-1 group-hover:text-[#A67C00] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
                {review.author}
              </cite>
              <span className="text-zinc-600 dark:text-zinc-600 text-[9px] uppercase tracking-[0.2em] group-hover:text-zinc-800 dark:group-hover:text-zinc-400 transition-colors block">
                {review.role} — <span className="font-medium">{review.company}</span>
              </span>
              {review.project && (
                <span className="inline-flex items-center gap-1.5 mt-2 text-[8px] text-[#A67C00] dark:text-[#D4AF37]/60 uppercase tracking-[0.2em] font-black">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {review.project}
                </span>
              )}
            </div>
          </div>

          {/* Subtle corner accent */}
          <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="w-12 h-12 border-b border-r border-[#D4AF37]/20 rounded-br-[2rem]" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center">
      <p className="font-mono text-zinc-600 dark:text-zinc-600 text-[9px] uppercase tracking-widest transition-colors">
        +25 proyectos ejecutados bajo normatividad ANM/ANLA en 2024
      </p>
    </div>
  </div>
);

export default ReviewsSection;
