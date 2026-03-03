import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fuerza a Leaflet a recalcular el tamaño tras el montaje
// (necesario cuando el padre usa aspect-ratio en lugar de height fija)
const MapResizer: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    const timers = [
      setTimeout(() => map.invalidateSize(), 100),
      setTimeout(() => map.invalidateSize(), 400),
      setTimeout(() => map.invalidateSize(), 900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [map]);
  return null;
};

const MapSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div>
        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 block underline decoration-[#D4AF37]/30">Presencia Regional</span>
        <h2 className="text-4xl md:text-5xl font-title text-zinc-900 dark:text-white mb-8 transition-colors">Nuestra Sede en <br /><span className="text-[#D4AF37]">Manizales, Caldas</span>.</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed mb-10 transition-colors">
          Ubicados en el corazón del eje cafetero, operamos desde un punto estratégico para la minería y los proyectos ambientales del centro-occidente colombiano.
        </p>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-10 h-10 border border-zinc-300 dark:border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500 rounded-lg dark:rounded-none">
              <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-white dark:group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest transition-colors">Coordenadas</p>
              <p className="text-zinc-500 dark:text-zinc-500 text-[10px] transition-colors">5.0689° N, 75.5174° W</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-default">
            <div className="w-10 h-10 border border-zinc-300 dark:border-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500 rounded-lg dark:rounded-none">
              <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-white dark:group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest transition-colors">Atención</p>
              <p className="text-zinc-500 dark:text-zinc-500 text-[10px] transition-colors">Lunes a Viernes — 08:00 a 18:00</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl overflow-hidden p-1 rounded-[2rem] transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{ width: '100%', height: '100%', filter: isHovered ? 'brightness(110%) contrast(110%)' : 'grayscale(30%) opacity(0.8)' }}
          className="transition-all duration-700 rounded-3xl overflow-hidden z-0 relative"
        >
          {/* Vignette Premium Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.95)] border border-[#D4AF37]/20 rounded-3xl" />

          <MapContainer
            center={[5.0689, -75.5174]}
            zoom={14}
            scrollWheelZoom={false}
            attributionControl={false}
            style={{ height: '100%', minHeight: '320px', width: '100%', background: '#0a0a0a' }}
            className={`transition-all duration-700 ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <MapResizer />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <CircleMarker
              center={[5.0689, -75.5174]}
              radius={6}
              pathOptions={{ color: '#D4AF37', fillColor: '#D4AF37', fillOpacity: 1 }}
            />
            <CircleMarker
              center={[5.0689, -75.5174]}
              radius={24}
              pathOptions={{ color: '#D4AF37', fillColor: 'transparent', weight: 1, dashArray: '4' }}
            />
          </MapContainer>
        </div>

        <div className="absolute bottom-6 left-6 z-20 flex items-center justify-center pointer-events-none">
          <div className="p-4 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-zinc-200 dark:border-[#D4AF37]/50 shadow-xl dark:shadow-2xl rounded-2xl transition-colors">
            <p className="text-[#D4AF37] text-[8px] uppercase tracking-[0.5em] mb-1 font-black">Sede Operativa</p>
            <p className="text-zinc-900 dark:text-white text-lg font-title transition-colors">Manizales, CO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
