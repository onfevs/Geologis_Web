import React, { useState, useEffect } from 'react';
import { YOUTUBE_URL } from '../constants';
import PremiumButton from './PremiumButton';
import SectionHeader from './SectionHeader';

// ─── Types ────────────────────────────────────────────────────────────────────

interface VideoData {
  id: string;
  title: string;
  description: string;
  publishedAt?: string;
  viewCount?: string;
}

// ─── Seed videos — datos reales del canal GeolóGIS ───────────────────────────
// Se muestran inmediatamente. El RSS los sobreescribe con los más recientes.
// Solo se muestran videos largos (no Shorts).

const SEED_VIDEOS: VideoData[] = [
  {
    id: '2VtYcI6G-EE',
    title: 'Conversión de Coordenadas Geográficas a Grados Decimales en ArcGIS Pro ANM',
    description: 'Transformación exacta GMS → grados decimales con 5 cifras de precisión según normativa ANM · MAGNA-SIRGAS.',
  },
  {
    id: 'Js9nzfUmtWc',
    title: '¿Cómo Usar Coordenadas en ArcGIS para Levantamientos?',
    description: 'Georeferenciación y levantamiento topográfico con ArcGIS Pro para proyectos SIG en Colombia.',
  },
  {
    id: 'gNpw1xLXXqg',
    title: '¿Cómo Crear una GDB de la ANM? Paso a Paso',
    description: 'Estructuración y validación de la Geodatabase minera bajo el Modelo de Datos ANM · Resolución 504 de 2018.',
  },
];

// ─── Thumbnail with multi-resolution fallback ─────────────────────────────────

const YtThumbnail: React.FC<{ videoId: string; alt: string; className?: string }> = ({ videoId, alt, className }) => {
  const sources = [
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/default.jpg`,
  ];
  const [srcIdx, setSrcIdx] = useState(0);

  return (
    <img
      src={sources[srcIdx]}
      alt={alt}
      className={className}
      onError={() => {
        if (srcIdx < sources.length - 1) setSrcIdx(i => i + 1);
      }}
    />
  );
};

// ─── Video Card ───────────────────────────────────────────────────────────────

const VideoCard: React.FC<{ video: VideoData; index: number }> = ({ video, index }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative bg-[#050505] border border-zinc-900 hover:border-[#D4AF37]/30 transition-all duration-500 rounded-[2rem] overflow-hidden flex flex-col">
      {/* Latest badge */}
      {index === 0 && (
        <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          Más reciente
        </div>
      )}

      {/* Thumbnail / Player */}
      <div
        className="aspect-video overflow-hidden relative cursor-pointer"
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full z-20"
          />
        ) : (
          <>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/60 md:group-hover:bg-black/20 transition-all duration-700 z-10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/80 flex items-center justify-center bg-[#D4AF37]/80 md:bg-black/40 backdrop-blur-sm md:group-hover:scale-110 md:group-hover:bg-[#D4AF37] md:group-hover:border-[#D4AF37] transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <svg className="w-5 h-5 text-black fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Thumbnail */}
            <YtThumbnail
              videoId={video.id}
              alt={video.title}
              className="w-full h-full object-cover grayscale-0 opacity-100 md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:scale-105 md:group-hover:opacity-100 transition-all duration-1000"
            />
          </>
        )}
      </div>

      {/* Text */}
      <div className="p-7 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-[#D4AF37] md:text-white text-base font-title mb-3 md:group-hover:text-[#D4AF37] transition-colors leading-snug">
            {video.title}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-5 font-light line-clamp-2">
            {video.description}
          </p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] text-zinc-400 uppercase tracking-widest hover:text-[#D4AF37] transition-colors flex items-center gap-3 mt-auto group/link"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Ver en YouTube
          <span className="w-4 h-px bg-zinc-700 group-hover/link:w-8 group-hover/link:bg-[#D4AF37] transition-all duration-300" />
        </a>
      </div>
    </div>
  );
};

// ─── RSS Loader ───────────────────────────────────────────────────────────────
// Uses a CORS proxy to fetch the YouTube RSS feed and extract the latest video IDs.
// Falls back to SEED_VIDEOS if the fetch fails.

const RSS_PROXY = 'https://api.allorigins.win/get?url=';
const CHANNEL_RSS = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCuw7tG2Ve01P9yu4J6JzwXg';

async function fetchLatestVideos(): Promise<VideoData[]> {
  try {
    const proxyUrl = `${RSS_PROXY}${encodeURIComponent(CHANNEL_RSS)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error('RSS fetch failed');
    const data = await res.json();
    const xml = data.contents as string;
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const entries = Array.from(doc.querySelectorAll('entry'));

    // Filter out Shorts (their alternate link contains /shorts/)
    const fullVideos = entries.filter(entry => {
      const link = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || '';
      return !link.includes('/shorts/');
    });

    return fullVideos.slice(0, 3).map(entry => {
      const videoId = entry.querySelector('videoId')?.textContent?.trim() || '';
      const rawTitle = entry.querySelector('title')?.textContent?.trim() || '';
      // Strip emoji clusters and excess hashtags from title for cleaner display
      const title = rawTitle.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').replace(/#\S+/g, '').trim();
      const published = entry.querySelector('published')?.textContent || '';
      const group = entry.querySelector('group');
      const rawDesc = group?.querySelector('description')?.textContent?.trim() || '';
      // Take first meaningful sentence (before \n)
      const description = (rawDesc.split('\n')[0] || rawDesc).slice(0, 150);
      const views = entry.querySelector('statistics')?.getAttribute('views') || '';
      return { id: videoId, title: title || rawTitle, description, publishedAt: published, viewCount: views };
    });
  } catch {
    return [];
  }
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const YoutubeSection: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>(SEED_VIDEOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestVideos().then(fetched => {
      if (fetched.length >= 1) {
        // Merge: latest fetched videos first, fill remainder with seeds not already included
        const fetchedIds = new Set(fetched.map(v => v.id));
        const extras = SEED_VIDEOS.filter(v => !fetchedIds.has(v.id));
        setVideos([...fetched, ...extras].slice(0, 3));
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
        <SectionHeader
          subtitle="Academia Digital"
          titleLight="Últimos"
          titleGold="Videos"
          description="Tutoriales técnicos sobre SIG, ANM, ANLA y automatización geoespacial. El video más reciente siempre aparece primero."
          className="mb-0 max-w-2xl"
        />
        <PremiumButton href={YOUTUBE_URL} variant="outline" className="mt-8 md:mt-0">
          <span className="flex items-center">
            Ver Canal Completo
            <svg className="w-3 h-3 ml-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </span>
        </PremiumButton>
      </div>

      {loading ? (
        /* Skeleton loaders */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden animate-pulse">
              <div className="aspect-video bg-zinc-800" />
              <div className="p-7 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      )}

      {/* Notice */}
      <p className="text-center text-zinc-700 text-[10px] uppercase tracking-widest mt-8">
        Los videos se actualizan automáticamente · Canal @OnfeVS GeolóGIS
      </p>
    </div>
  );
};

export default YoutubeSection;
