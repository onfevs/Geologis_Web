import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CatastroMuni } from './DomainsTabbedSection';

// Fix para mapas en tabs y animaciones
const MapResizer: React.FC<{ isFlipped?: boolean }> = ({ isFlipped }) => {
    const map = useMap();
    useEffect(() => {
        const t1 = setTimeout(() => map.invalidateSize(), 150);
        const t2 = setTimeout(() => map.invalidateSize(), 400);
        const t3 = setTimeout(() => map.invalidateSize(), 850);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [map, isFlipped]);
    return null;
};

interface PremiumMuniCardProps {
    m: CatastroMuni;
    go?: boolean;
}

const PremiumMuniCard: React.FC<PremiumMuniCardProps> = ({ m, go = true }) => {
    const total = m.rural + m.urban;
    const ruralPct = Math.round((m.rural / total) * 100);
    const myShare = Math.round(total / 6);
    const isProc = m.status === 'en_proceso';
    const [isFlipped, setIsFlipped] = useState(false);

    // Referencia para detectar si el usuario está haciendo scroll o tap en móvil
    const touchStartY = React.useRef(0);
    const touchStartX = React.useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
        const deltaX = Math.abs(e.changedTouches[0].clientX - touchStartX.current);
        // Solo es un "tap" si el dedo se movió menos de 10px en cualquier dirección
        if (deltaY < 10 && deltaX < 10) {
            e.preventDefault();   // Evita que el navegador haga scroll/navigate
            e.stopPropagation();
            setIsFlipped(prev => !prev);
        }
        // Si el dedo se movió más, era un scroll → no hacemos nada
    };

    return (
        <div
            className="flip-card-container w-full h-[360px] cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            // onClick en desktop, onTouchEnd maneja mobile
            onClick={(e) => {
                // En desktop, prevenir bubbling hacia secciones padre
                e.stopPropagation();
            }}
        >
            <div
                className={`flip-card-inner h-full w-full ${isFlipped ? 'mobile-flipped' : ''}`}
                style={{ transform: isFlipped ? 'rotateY(180deg)' : '' }}
            >

                {/* ══════ FRENTE (Glassmorphism Split / Ice Land Style) ══════ */}
                <div className="flip-card-front w-full h-full rounded-[1.5rem] overflow-hidden relative border border-zinc-800/80 shadow-[0_15px_35px_rgba(0,0,0,0.5)] bg-black">
                    {/* 1. IMAGEN DE FONDO (enfocada) - cubre el 100% */}
                    <img
                        src={m.image || '/images/catastro.jpg'}
                        alt={m.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
                        style={{ transform: isFlipped ? 'scale(1.1)' : 'scale(1)', zIndex: 1 }}
                    />

                    {/* 2. PANEL FROSTED GLASS (estilo Iceland) - lado derecho 40%
                        Técnica: imagen duplicada borrosa + overlay blanco encima = vidrio esmerilado */}
                    <div
                        className="absolute top-0 right-0 h-full overflow-hidden"
                        style={{ width: '40%', zIndex: 2 }}
                    >
                        {/* Imagen borrosa alineada a la derecha igual que el fondo principal */}
                        <img
                            src={m.image || '/images/catastro.jpg'}
                            alt=""
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,            /* alineada al borde derecho como background */
                                height: '100%',
                                width: '250%',       /* cubre la misma zona que la imagen del fondo */
                                objectFit: 'cover',
                                objectPosition: 'right center',
                                /* ⬅️ CAMBIAR INTENSIDAD DE DESENFOQUE AQUÍ */
                                filter: 'blur(20px)',
                                WebkitFilter: 'blur(20px)',
                                transform: 'scale(1.05)', /* evita bordes transparentes del blur */
                            }}
                        />
                        {/* Overlay negro/oscuro = vidrio negro premium */}
                        {/* ⬅️ CAMBIAR OPACIDAD DEL VIDRIO AQUÍ: 0.7 = muy oscuro, 0.4 = más transparente */}
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.72)', backdropFilter: 'blur(2px)' }} />
                        {/* Línea dorada premium */}
                        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), transparent)' }} />
                    </div>

                    {/* 3. GRADIENTE lado izquierdo - NO cubre el panel blur (z-index menor) */}
                    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10" style={{ width: '60%' }} />
                    </div>

                    {/* 4. GRADIENTE fondo parte inferior - solo en el 60% izquierdo */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '62%', height: '7rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent)', zIndex: 3, pointerEvents: 'none' }} />

                    {/* 5. TEXTOS EN VERTICAL */}
                    <div className="absolute inset-0 flex flex-row w-full h-full pointer-events-none px-5 pt-5 pb-16 justify-start items-end gap-1" style={{ zIndex: 4 }}>
                        {/* MUNICIPIO (Dorado, Vertical) */}
                        <span
                            lang="es"
                            style={{
                                color: '#D4AF37',
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                textShadow: '0 4px 20px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1)',
                                wordBreak: 'break-word',
                                fontSize: '1.8rem', /* ⬅️ CAMBIAR TAMAÑO MUNICIPIO AQUÍ */
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                lineHeight: 0.85,
                                letterSpacing: '-0.02em',
                                maxHeight: '100%',
                            }}
                        >
                            {m.name}
                        </span>

                        {/* DEPARTAMENTO (blanco transparente sobre vidrio negro) */}
                        <span
                            lang="es"
                            style={{
                                color: 'rgba(255, 255, 255, 0.5)', /* ⬅️ CAMBIAR OPACIDAD AQUÍ */
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                fontSize: '1.5rem', /* ⬅️ CAMBIAR TAMAÑO DEPARTAMENTO AQUÍ */
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                maxHeight: '100%',
                                marginLeft: 'auto',
                                marginRight: '12px',
                                textShadow: '0 0 20px rgba(212,175,55,0.2)',
                            }}
                        >
                            {m.dept}
                        </span>
                    </div>

                    {/* 6. BADGE "En proceso" */}
                    {isProc && (
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/50 rounded-full px-3 py-1.5 shadow-lg" style={{ zIndex: 5 }}>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#FCD34D]" />
                            <span className="text-amber-400 text-[9px] font-black uppercase tracking-widest">En proceso</span>
                        </div>
                    )}

                    {/* 7. Hint Girar */}
                    <div className="absolute bottom-5 left-0 right-0 flex justify-center w-full" style={{ zIndex: 5 }}>
                        <div className="flex flex-col items-center gap-1 opacity-70">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                                <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                                <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                            </svg>
                            <span className="text-[#D4AF37] text-[8px] uppercase tracking-[0.3em] font-bold">Girar</span>
                        </div>
                    </div>
                </div>

                {/* ══════ REVERSO ══════ */}
                <div className="flip-card-back w-full h-full rounded-[1.5rem] overflow-hidden" style={{
                    background: '#09090b',
                    border: '1px solid rgba(212,175,55,0.2)',
                    boxShadow: '0 8px 32px rgba(212,175,55,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* PREMIUM MAP BACKGROUND */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35 }}>
                        <MapContainer
                            center={[m.lat, m.lng]}
                            zoom={13}
                            attributionControl={false}
                            zoomControl={false}
                            dragging={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                            style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
                        >
                            <MapResizer isFlipped={isFlipped} />
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            <CircleMarker
                                center={[m.lat, m.lng]}
                                radius={6}
                                pathOptions={{ color: '#D4AF37', fillColor: '#D4AF37', fillOpacity: 0.7 }}
                            />
                        </MapContainer>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.6) 40%, rgba(9,9,11,0.95) 85%)', zIndex: 1 }} />
                    </div>

                    {/* Contenido Reverso */}
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <div style={{
                                    width: 28, height: 2,
                                    background: 'linear-gradient(to right, #D4AF37, transparent)',
                                    marginBottom: 6
                                }} />
                                <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', margin: 0, lineHeight: 1.2 }}>{m.name}</p>
                                <p style={{ color: '#71717a', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: 2 }}>{m.dept}</p>
                            </div>
                            <div className="flex flex-col gap-1 items-end pt-1">
                                {m.role && (
                                    <span style={{
                                        fontSize: '0.45rem', padding: '3px 8px', borderRadius: 99,
                                        border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37',
                                        fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                                        background: 'rgba(212,175,55,0.08)'
                                    }}>
                                        {m.role}
                                    </span>
                                )}
                                {isProc && (
                                    <span style={{
                                        fontSize: '0.45rem', padding: '3px 8px', borderRadius: 99,
                                        border: '1px solid rgba(251,191,36,0.4)', color: '#FCD34D',
                                        fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                                        background: 'rgba(251,191,36,0.06)'
                                    }}>
                                        En proceso
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats at bottom area */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flex: 2, zIndex: 10 }}>
                        <div style={{ marginBottom: 10, padding: '0 16px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <span style={{ color: '#71717a', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Composición predial</span>
                            </div>
                            <div style={{ display: 'flex', height: 7, borderRadius: 99, overflow: 'hidden', background: '#1f1f1f', gap: 1 }}>
                                <div style={{
                                    height: '100%', width: go ? `${ruralPct}%` : '0%',
                                    background: 'linear-gradient(to right, rgba(212,175,55,0.3), rgba(212,175,55,0.55))',
                                    transition: 'width 1.4s cubic-bezier(0.23,1,0.32,1)',
                                }} />
                                <div style={{
                                    height: '100%', width: go ? `${100 - ruralPct}%` : '0%',
                                    background: 'linear-gradient(to right, #C9A227, #F5D142)',
                                    transition: 'width 1.4s cubic-bezier(0.23,1,0.32,1) 0.12s',
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <span style={{ color: '#52525b', fontSize: '0.58rem', fontWeight: 600 }}>Rural {ruralPct}%</span>
                                <span style={{ color: '#52525b', fontSize: '0.58rem', fontWeight: 600 }}>Urbano {100 - ruralPct}%</span>
                            </div>
                        </div>

                        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10, margin: '0 16px', position: 'relative' }} />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px', marginBottom: 10, padding: '0 16px', position: 'relative' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 700 }}>Rural</p>
                                <p style={{ color: '#d4d4d8', fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 0', lineHeight: 1 }}>
                                    {m.rural.toLocaleString('es-CO')}
                                </p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 700 }}>Urbano</p>
                                <p style={{ color: '#d4d4d8', fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 0', lineHeight: 1 }}>
                                    {m.urban.toLocaleString('es-CO')}
                                </p>
                            </div>
                        </div>

                        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10, margin: '0 16px', position: 'relative' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 16px 16px', position: 'relative' }}>
                            <div>
                                <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 700 }}>Total Predios</p>
                                <p style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 900, margin: '2px 0 0', lineHeight: 1 }}>
                                    {total.toLocaleString('es-CO')}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: 700 }}>Aporte GS(⅙)</p>
                                <p style={{ color: '#D4AF37', fontSize: '1.25rem', fontWeight: 900, margin: '2px 0 0', lineHeight: 1 }}>
                                    ~{myShare.toLocaleString('es-CO')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PremiumMuniCard;
