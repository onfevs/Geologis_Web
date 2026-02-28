
import React from 'react';
import { REVIEWS } from '../constants';

const ReviewsSection: React.FC = () => {
  return (
    <div>
      <div className="mb-24 text-center">
        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-4 block">Capítulo III</span>
        <h2 className="text-4xl md:text-5xl font-title text-white mb-6 italic">Testimonios de Confianza</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {REVIEWS.map((review) => (
          <div 
            key={review.id} 
            className="group relative p-12 md:p-16 bg-zinc-950/50 border border-zinc-900 transition-all duration-700 hover:border-[#D4AF37]/30 hover:shadow-[0_20px_80px_-20px_rgba(212,175,55,0.05)]"
          >
            {/* Star Rating */}
            <div className="flex space-x-1 mb-10">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < review.rating ? 'text-white group-hover:text-[#D4AF37]' : 'text-zinc-800'} transition-colors duration-500`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="relative mb-12">
              <span className="absolute -top-6 -left-4 text-6xl font-title text-white/5 pointer-events-none">“</span>
              <p className="text-zinc-300 text-xl md:text-2xl font-title leading-relaxed italic relative z-10 group-hover:text-[#D4AF37] transition-colors duration-500">
                {review.content}
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center space-x-6">
              <div className="w-10 h-px bg-zinc-800 group-hover:w-14 group-hover:bg-[#D4AF37] transition-all duration-700"></div>
              <div>
                <cite className="not-italic text-white font-bold text-xs uppercase tracking-widest block mb-1 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {review.author}
                </cite>
                <span className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
                  {review.role} — <span className="font-medium">{review.company}</span>
                </span>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="w-12 h-12 border-b border-r border-[#D4AF37]/20"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
          +25 proyectos ejecutados bajo normatividad ANM/ANLA en 2024
        </p>
      </div>
    </div>
  );
};

export default ReviewsSection;
