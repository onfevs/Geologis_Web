import React from 'react';

// ── Inline SVG Icons for each institution ────────────────────────────────────

const IconANM = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.3" />
        {/* Pickaxe / Mining */}
        <path d="M14 34L22 26M22 26L30 18M22 26L16 20L26 14L32 20L26 26" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 30L34 36" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="36" r="2" fill="#D4AF37" opacity="0.6" />
    </svg>
);

const IconANLA = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#4ADE80" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Leaf / Environment */}
        <path d="M24 36C24 36 12 28 12 18C12 12 18 8 24 8C30 8 36 12 36 18C36 28 24 36 24 36Z" stroke="#4ADE80" strokeWidth="1.8" fill="none" opacity="0.8" />
        <path d="M24 36V20" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 26C24 26 18 22 18 16" stroke="#4ADE80" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
);

const IconSGC = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Geological layers */}
        <path d="M10 28C14 24 20 26 24 24C28 22 34 24 38 20" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 33C14 29 20 31 24 29C28 27 34 29 38 25" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d="M10 23C14 19 20 21 24 19C28 17 34 19 38 15" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
        <path d="M22 36L26 36L24 30Z" fill="#60A5FA" opacity="0.8" />
    </svg>
);

const IconMasora = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Location pin with check */}
        <path d="M24 10C19 10 15 14 15 19C15 26 24 38 24 38C24 38 33 26 33 19C33 14 29 10 24 10Z" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
        <path d="M20 19L23 22L28 16" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconUCaldas = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Graduation cap */}
        <path d="M24 14L38 20L24 26L10 20L24 14Z" stroke="#A78BFA" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <path d="M16 23V31C16 31 20 34 24 34C28 34 32 31 32 31V23" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M38 20V27" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="38" cy="28" r="1.5" fill="#A78BFA" />
    </svg>
);

const IconMuzo = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#34D399" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Gemstone / Emerald */}
        <path d="M24 10L32 16L32 32L24 38L16 32L16 16L24 10Z" stroke="#34D399" strokeWidth="1.8" fill="none" />
        <path d="M16 16L24 22L32 16" stroke="#34D399" strokeWidth="1.5" opacity="0.7" />
        <path d="M24 22L24 38" stroke="#34D399" strokeWidth="1.5" opacity="0.5" />
        <path d="M16 32L24 22L32 32" stroke="#34D399" strokeWidth="1.2" opacity="0.5" />
    </svg>
);

const IconEMS = () => (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.2" />
        {/* Diamond mining */}
        <path d="M14 20L24 12L34 20L24 38L14 20Z" stroke="#F59E0B" strokeWidth="1.8" fill="none" />
        <path d="M14 20H34" stroke="#F59E0B" strokeWidth="1.5" opacity="0.7" />
        <path d="M18 20L24 12L30 20" stroke="#F59E0B" strokeWidth="1.2" opacity="0.5" />
    </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const ALLIES = [
    { name: 'Agencia Nacional\nde Minería', abbr: 'ANM', icon: <IconANM />, category: 'Regulatoria' },
    { name: 'Autoridad Nacional\nde Licencias Amb.', abbr: 'ANLA', icon: <IconANLA />, category: 'Ambiental' },
    { name: 'Servicio Geológico\nColombiano', abbr: 'SGC', icon: <IconSGC />, category: 'Ciencias de la Tierra' },
    { name: 'MASORA', abbr: 'MASORA', icon: <IconMasora />, category: 'Gestor Catastral' },
    { name: 'Universidad\nde Caldas', abbr: 'U. Caldas', icon: <IconUCaldas />, category: 'Academia' },
    { name: 'Empresas Muzo', abbr: 'Muzo', icon: <IconMuzo />, category: 'Esmeraldas' },
];

// ── Component ─────────────────────────────────────────────────────────────────

const ClientsCarousel: React.FC = () => {
    return (
        <section className="py-20 bg-black border-y border-zinc-900 overflow-hidden relative">

            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
                <h3 className="text-[#D4AF37] text-[11px] font-subtitle uppercase tracking-[0.4em] mb-4">Confianza Institucional</h3>
                <h2 className="text-3xl md:text-4xl font-title text-white">Aliados y Clientes Estratégicos</h2>
            </div>

            {/* Full width layout: Allies top, Tech scrolling bottom */}
            <div className="w-full flex flex-col items-center">

                {/* ── Top: Allies Grid ───────────────────────────── */}
                <div className="w-full mb-20 relative overflow-hidden">
                    <div className="relative flex overflow-x-hidden group pb-8 pt-4">
                        <div className="animate-marquee-reverse whitespace-nowrap flex items-center md:group-hover:pause-animation">
                            {ALLIES.map((ally, i) => (
                                <div
                                    key={i}
                                    className="group mx-4 w-60 flex flex-col items-center gap-4 p-8 rounded-2xl border border-zinc-900 bg-zinc-950/60 hover:border-[#D4AF37]/30 hover:bg-zinc-900/60 transition-all duration-500 cursor-default text-center shrink-0"
                                >
                                    <div className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                        {ally.icon}
                                    </div>
                                    <div className="w-full overflow-hidden">
                                        <p className="text-white font-bold text-sm md:text-base leading-snug whitespace-pre-line group-hover:text-white transition-colors">{ally.name}</p>
                                        <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2 group-hover:text-zinc-400 transition-colors truncate">{ally.category}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless infinite scrolling */}
                            {ALLIES.map((ally, i) => (
                                <div
                                    key={`dup-${i}`}
                                    className="group mx-4 w-60 flex flex-col items-center gap-4 p-8 rounded-2xl border border-zinc-900 bg-zinc-950/60 hover:border-[#D4AF37]/30 hover:bg-zinc-900/60 transition-all duration-500 cursor-default text-center shrink-0"
                                >
                                    <div className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                        {ally.icon}
                                    </div>
                                    <div className="w-full overflow-hidden">
                                        <p className="text-white font-bold text-sm md:text-base leading-snug whitespace-pre-line group-hover:text-white transition-colors">{ally.name}</p>
                                        <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2 group-hover:text-zinc-400 transition-colors truncate">{ally.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Gradients to fade edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                </div>

                {/* ── Bottom: Tech Stack Scrolling Marquee ───────── */}
                <div className="w-full border-t border-zinc-900 pt-16 relative overflow-hidden">
                    <style>{`
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
            }
            .animate-marquee {
                animation: marquee 30s linear infinite;
                width: max-content;
            }
            .animate-marquee-reverse {
                animation: marquee-reverse 30s linear infinite;
                width: max-content;
            }
            .pause-animation {
                animation-play-state: paused;
            }
          `}</style>

                    <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black underline decoration-[#D4AF37]/30 decoration-2 underline-offset-4">
                            Infraestructura Tecnológica Integrada
                        </span>
                    </div>

                    <div className="relative flex overflow-x-hidden group pb-8">
                        <div className="py-4 animate-marquee whitespace-nowrap flex items-center md:group-hover:pause-animation">
                            {TECHS.map((tech, index) => (
                                <div key={index} className="flex items-center space-x-4 mx-10 md:mx-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <img src={tech.icon} alt={tech.name} className="h-10 md:h-12 w-auto object-contain" />
                                    <span className="text-zinc-400 font-title text-xl md:text-2xl">{tech.name}</span>
                                </div>
                            ))}
                            {/* Duplicate for seamless infinite scrolling */}
                            {TECHS.map((tech, index) => (
                                <div key={`dup-${index}`} className="flex items-center space-x-4 mx-10 md:mx-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <img src={tech.icon} alt={tech.name} className="h-10 md:h-12 w-auto object-contain" />
                                    <span className="text-zinc-400 font-title text-xl md:text-2xl">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gradients to fade edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none mt-16"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none mt-16"></div>
                </div>

            </div>
        </section>
    );
};

// ── TECH Data ─────────────────────────────────────────────────────────────────

const TECHS = [
    { name: 'ArcGIS Pro', icon: 'https://cdn.worldvectorlogo.com/logos/arcgis-1.svg' },
    { name: 'Python', icon: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
    { name: 'QGIS', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/QGIS_logo_new.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg' },
    { name: 'PostGIS', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/PostGIS_logo.png' },
    { name: 'AWS', icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
    { name: 'AutoCAD', icon: 'https://cdn.worldvectorlogo.com/logos/autocad.svg' },
    { name: 'React', icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
];

export default ClientsCarousel;
