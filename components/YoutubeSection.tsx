
import React from 'react';
import { YOUTUBE_VIDEOS, YOUTUBE_URL, GOLD_COLORS } from '../constants';
import { PixelCanvas } from './PixelCanvas';

const YoutubeSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
        <div className="max-w-2xl">
          <span className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-4 block">Capítulo IV</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 italic">Academia <span className="text-[#D4AF37]">Digital</span>.</h2>
          <p className="text-zinc-400 font-light leading-relaxed max-w-xl">
            Compartimos conocimiento técnico para elevar los estándares de la industria geoespacial en Colombia. Explora nuestros tutoriales más solicitados.
          </p>
        </div>
        
        <a 
          href={YOUTUBE_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative px-10 py-4 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden hover:border-[#D4AF37] transition-all mt-8 md:mt-0"
        >
          <PixelCanvas colors={GOLD_COLORS} gap={5} speed={40} />
          <span className="relative z-10 flex items-center">
            Ver Canal de YouTube
            <svg className="w-3 h-3 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {YOUTUBE_VIDEOS.map((video) => (
          <div key={video.id} className="group relative bg-[#050505] border border-zinc-900 transition-all duration-500 hover:border-[#D4AF37]/30">
            <div className="aspect-video overflow-hidden relative">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-700 z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:scale-125 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
                  <svg className="w-5 h-5 text-white group-hover:text-black fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
              />
            </div>
            <div className="p-8">
              <h3 className="text-white text-xl font-serif mb-4 group-hover:text-[#D4AF37] transition-colors">{video.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
                {video.description}
              </p>
              <a 
                href={YOUTUBE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] text-zinc-400 uppercase tracking-widest hover:text-[#D4AF37] transition-colors flex items-center"
              >
                Ver Tutorial Completo
                <span className="ml-3 w-4 h-px bg-zinc-800"></span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSection;
