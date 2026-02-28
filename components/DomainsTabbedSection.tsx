import React, { useState, useEffect, useRef } from 'react';
import { PixelCanvas } from './PixelCanvas';
import SectionHeader from './SectionHeader';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para mapas en tabs y animaciones (Leaflet no calcula bien cuando está oculto/animado)
const MapResizer: React.FC<{ isFlipped?: boolean }> = ({ isFlipped }) => {
    const map = useMap();
    useEffect(() => {
        // Ejecuta resize durante y después de la animación de flip
        const t1 = setTimeout(() => map.invalidateSize(), 150);
        const t2 = setTimeout(() => map.invalidateSize(), 400);
        const t3 = setTimeout(() => map.invalidateSize(), 850);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [map, isFlipped]);
    return null;
};

// GSAP loaded via CDN in index.html
declare const gsap: any;
declare const ScrollTrigger: any;

// ─── Types ────────────────────────────────────────────────────────────────────

interface MunicipalData { name: string; dept: string; rural: number; urban: number; role?: string; image?: string; lat: number; lng: number; }
interface IcaProject { name: string; scope: string; }
interface MineriaKpi { label: string; value: string; detail: string; }
type MuniStatus = 'finalizado' | 'en_proceso';
interface CatastroMuni extends MunicipalData { status: MuniStatus; }

interface NormRef { code: string; title: string; entity: string; year: string; color: string; }

// ─── Normativas ───────────────────────────────────────────────────────────────

const NORM_MINERIA: NormRef[] = [
    { code: 'Res. 504/2018', title: 'Modelo de Datos Geográficos ANM V2 — estructura, topología, dominios y subtipos de la GDB minera', entity: 'ANM', year: '2018', color: '#D4AF37' },
    { code: 'Res. 505/2019', title: 'Modificación y actualización de estándares técnicos para Formatos Básicos Mineros (FBM)', entity: 'ANM', year: '2019', color: '#F5D142' },
];

const NORM_ANLA: NormRef[] = [
    { code: 'Res. 2182/2016', title: 'Modelo de Almacenamiento Geográfico (MAG) — estructura de información geográfica en EIA e ICAs', entity: 'ANLA', year: '2016', color: '#D4AF37' },
    { code: 'Circular 00002/2021', title: 'Diccionario de Datos Geográficos Complementario — PPII y YNC para proyectos de infraestructura', entity: 'ANLA', year: '2021', color: '#F5D142' },
];

const NORM_CATASTRO: NormRef[] = [
    { code: 'LADM-COL v3', title: 'Land Administration Domain Model para Colombia — ISO 19152 adaptado por IGAC, SNR y ANT', entity: 'IGAC', year: '2020', color: '#D4AF37' },
    { code: 'Dec. 148/2020', title: 'Operaciones catastrales multipropósito: levantamiento, actualización y conservación predial', entity: 'Presidencia', year: '2020', color: '#F5D142' },
];

// ─── Data: Catastro ───────────────────────────────────────────────────────────

const CATASTRO_MUNICIPIOS: CatastroMuni[] = [
    { name: 'El Retiro', dept: 'Antioquia', rural: 10046, urban: 8443, role: 'Consolidador SIG', status: 'finalizado', image: '/images/catastro/ElRetiro.jpg', lat: 6.0594, lng: -75.5028 },
    { name: 'Filandia', dept: 'Quindío', rural: 2502, urban: 2578, status: 'finalizado', image: '/images/catastro/Filandia.jpg', lat: 4.6738, lng: -75.6669 },
    { name: 'Quimbaya', dept: 'Quindío', rural: 2640, urban: 2004, status: 'finalizado', image: '/images/catastro/Quimbaya.jpg', lat: 4.6214, lng: -75.7600 },
    { name: 'Montenegro', dept: 'Quindío', rural: 2614, urban: 1780, status: 'finalizado', image: '/images/catastro/Montenegro.jpg', lat: 4.5678, lng: -75.7500 },
    { name: 'San Vicente de Ferrer', dept: 'Antioquia', rural: 2200, urban: 900, status: 'finalizado', image: '/images/catastro/ElRetiro.jpg', lat: 6.2800, lng: -75.3269 },
    { name: 'Barrancabermeja', dept: 'Santander', rural: 14200, urban: 29800, status: 'en_proceso', image: '/images/catastro/Barranca.jpg', lat: 7.0653, lng: -73.8547 },
    { name: 'Calarcá', dept: 'Quindío', rural: 6800, urban: 8200, status: 'en_proceso', image: '/images/catastro/Calarca.jpg', lat: 4.5247, lng: -75.6425 },
];

// ─── Data: ANLA ───────────────────────────────────────────────────────────────

const ICA_PROJECTS: IcaProject[] = [
    { name: 'ICA Extracción Minera Norte', scope: 'Área influencia directa · Antioquia' },
    { name: 'ICA Vial Bucaramanga', scope: 'Infraestructura vial · Santander' },
    { name: 'ICA Hidroeléctrica Sur', scope: 'Componente hídrico · Huila' },
    { name: 'ICA Oleoducto Caribe', scope: 'Corredor ambiental · Costa Caribe' },
    { name: 'ICA Residuos Sólidos', scope: 'Área urbana-rural · Quindío' },
    { name: 'ICA Expansión Portuaria', scope: 'Zona costera · Bolívar' },
    { name: 'ICA Deforestación RN', scope: 'Bosque húmedo · Chocó' },
    { name: 'ICA Agroindustrial', scope: 'Palma de aceite · Meta' },
    { name: 'ICA Captación Hídrica', scope: 'Cuenca alta · Cundinamarca' },
    { name: 'ICA Minería Artesanal', scope: 'Pequeña minería · Nariño' },
];

// ─── Data: Minería ────────────────────────────────────────────────────────────

const MINERIA_KPIS: MineriaKpi[] = [
    { label: 'FBM Entregados', value: '50+', detail: 'Formatos Básicos Mineros · ANM' },
    { label: 'POT Procesados', value: '8+', detail: 'Planes de Obras y Trabajos · ANM' },
    { label: 'GDBs Estructuradas', value: '65+', detail: 'Geodatabases bajo Res. 504 y 505' },
    { label: 'Reducción de Tiempo', value: '70%', detail: 'vs. proceso manual convencional' },
    { label: 'Tasa de Aprobación', value: '98%', detail: 'Sin devoluciones por topología' },
    { label: 'Regiones', value: '6', detail: 'Ant · Boy · Csr · Crd · Met · Chocó' },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useInView = () => {
    const [vis, setVis] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVis(true); obs.unobserve(e.target); }
        }, { threshold: 0.06 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis] as const;
};

const AnimNum: React.FC<{ end: number; go: boolean; dur?: number }> = ({ end, go, dur = 1600 }) => {
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!go) return;
        let n = 0; const inc = end / (dur / 16);
        const t = setInterval(() => {
            n += inc;
            if (n >= end) { clearInterval(t); setV(end); } else setV(Math.floor(n));
        }, 16);
        return () => clearInterval(t);
    }, [end, go, dur]);
    return <>{v.toLocaleString('es-CO')}</>;
};

// ─── Normative Banner ─────────────────────────────────────────────────────────

const NormBanner: React.FC<{ norms: NormRef[] }> = ({ norms }) => (
    <div className="mt-8 pt-6 border-t border-zinc-800">
        <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em] font-black mb-3">Marco Normativo</p>
        <div className="flex flex-col gap-2">
            {norms.map((n, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center p-4 rounded-lg border border-zinc-900 bg-zinc-950/40 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="shrink-0 text-[10px] font-black uppercase px-2 py-0.5 border rounded" style={{ color: n.color, borderColor: `${n.color}50` }}>
                        {n.code}
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-zinc-300 text-[11px] leading-snug">{n.title}</p>
                        <p className="text-zinc-600 text-[9px] mt-0.5 uppercase tracking-wider">{n.entity} · {n.year}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── STATS: Minería ───────────────────────────────────────────────────────────

const MineriaStats: React.FC<{ go: boolean }> = ({ go }) => (
    <div className="mt-8 pt-8 border-t border-zinc-800">
        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.35em] font-black mb-5">
            Entregables ANM — Formatos, Geodatabases y Planes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {MINERIA_KPIS.map((k, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/30 rounded-xl p-4 transition-all duration-300 group">
                    <p className={`text-2xl md:text-3xl font-title mb-1 ${i < 2 ? 'text-[#D4AF37]' : 'text-white'}`}>{k.value}</p>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black">{k.label}</p>
                    <p className="text-zinc-600 text-[9px] mt-1 leading-relaxed">{k.detail}</p>
                </div>
            ))}
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-[11px] mb-4 uppercase tracking-widest font-black">Distribución de Entregables</p>
            {[
                { label: 'FBM — Formatos Básicos Mineros', pct: 55, count: '50+' },
                { label: 'GDB — Geodatabases ANM', pct: 70, count: '65+' },
                { label: 'POT — Planes de Obras y Trabajos', pct: 20, count: '8+' },
            ].map((row, i) => (
                <div key={i} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-zinc-300 text-[11px]">{row.label}</p>
                        <p className="text-[#D4AF37] text-[11px] font-bold">{row.count}</p>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#996515] to-[#F5D142] transition-all duration-1000 ease-out"
                            style={{ width: go ? `${row.pct}%` : '0%', transitionDelay: `${i * 150}ms` }} />
                    </div>
                </div>
            ))}
        </div>
        <NormBanner norms={NORM_MINERIA} />
    </div>
);

// ─── STATS: ANLA ─────────────────────────────────────────────────────────────

const AnlaStats: React.FC<{ go: boolean }> = ({ go }) => (
    <div className="mt-8 pt-8 border-t border-zinc-800">
        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.35em] font-black mb-5">
            ICAs Estructurados — Informes de Cumplimiento Ambiental
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
            {[
                { n: 20, suf: '+', lbl: 'ICAs Entregados', sub: 'Aprobados ante ANLA', gold: true },
                { n: 95, suf: '%', lbl: 'Aprobación Técnica', sub: 'Sin observaciones de fondo', gold: false },
                { n: 10, suf: '', lbl: 'Departamentos', sub: 'Cobertura nacional', gold: false },
            ].map((k, i) => (
                <div key={i} className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800">
                    <p className={`text-xl md:text-2xl font-title ${k.gold ? 'text-[#D4AF37]' : 'text-white'}`}>
                        <AnimNum end={k.n} go={go} />{k.suf}
                    </p>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black mt-1">{k.lbl}</p>
                    <p className="text-zinc-600 text-[9px] mt-0.5">{k.sub}</p>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ICA_PROJECTS.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-zinc-900/50 border border-zinc-800 hover:border-[#D4AF37]/25 rounded-xl p-3 transition-all duration-300">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-[8px] font-black mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                        <p className="text-white text-[12px] font-semibold">{p.name}</p>
                        <p className="text-zinc-500 text-[10px] mt-0.5">{p.scope}</p>
                    </div>
                </div>
            ))}
        </div>
        <NormBanner norms={NORM_ANLA} />
    </div>
);

// ─── STATS: Catastro — FLIP CARDS ─────────────────────────────────────────────

const MuniCard: React.FC<{ m: CatastroMuni; go: boolean }> = ({ m, go }) => {
    const total = m.rural + m.urban;
    const ruralPct = Math.round((m.rural / total) * 100);
    const myShare = Math.round(total / 6);
    const isProc = m.status === 'en_proceso';
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="flip-card-container w-full h-[340px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className="flip-card-inner">

                {/* ══════ FRENTE ══════ */}
                <div className="flip-card-front" style={{
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}>
                    {/* Imagen con filtro dorado */}
                    <img
                        src={m.image || '/images/catastro.jpg'}
                        alt={m.name}
                        className="gold-filter"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />

                    {/* Difuminado negro para legibilidad de textos (User feedback) */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)',
                        pointerEvents: 'none'
                    }} />

                    {/* Ícono flip en esquina */}
                    <div className="flip-hint-icon">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                            <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                        </svg>
                    </div>

                    {/* Status badge */}
                    {isProc && (
                        <div style={{
                            position: 'absolute', top: 14, left: 14,
                            display: 'flex', alignItems: 'center', gap: 5,
                            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(251,191,36,0.4)', borderRadius: 99,
                            padding: '3px 8px',
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FCD34D', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                            <span style={{ color: '#FCD34D', fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>En proceso</span>
                        </div>
                    )}

                    {/* Gradiente + texto inferior */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                        padding: '18px 18px 14px',
                    }}>
                        <p style={{ color: '#fff', fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: '1.25rem', lineHeight: 1.15, margin: 0 }}>
                            {m.name}
                        </p>
                        <p style={{ color: '#D4AF37', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.28em', fontWeight: 700, marginTop: 4 }}>
                            {m.dept}
                        </p>
                    </div>
                </div>

                {/* ══════ REVERSO ══════ */}
                <div className="flip-card-back" style={{
                    background: '#09090b',
                    border: '1px solid rgba(212,175,55,0.2)',
                    boxShadow: '0 8px 32px rgba(212,175,55,0.08)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    {/* PREMIUM MAP BACKGROUND (Interactive disabled to behave as bg) */}
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
                        {/* Overlay to fade out map at the bottom text area */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.6) 40%, rgba(9,9,11,0.95) 85%)', zIndex: 1 }} />
                    </div>

                    {/* Contenido Reverso (Z-index superior para estar sobre el mapa) */}
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
                        <div>
                            <div style={{
                                width: 28, height: 2,
                                background: 'linear-gradient(to right, #D4AF37, transparent)',
                                marginBottom: 6
                            }} />
                            <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', margin: 0, lineHeight: 1.2 }}>{m.name}</p>
                            <p style={{ color: '#71717a', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: 2 }}>{m.dept}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                            {m.role && (
                                <span style={{
                                    fontSize: '0.5rem', padding: '2px 7px', borderRadius: 99,
                                    border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37',
                                    fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                                    background: 'rgba(212,175,55,0.08)'
                                }}>
                                    {m.role}
                                </span>
                            )}
                            {isProc && (
                                <span style={{
                                    fontSize: '0.5rem', padding: '2px 7px', borderRadius: 99,
                                    border: '1px solid rgba(251,191,36,0.4)', color: '#FCD34D',
                                    fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                                    background: 'rgba(251,191,36,0.06)'
                                }}>
                                    En proceso
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Barra Rural / Urbano */}
                    <div style={{ marginBottom: 10, padding: '0 16px', position: 'relative', zIndex: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                            <span style={{ color: '#71717a', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Composición predial</span>
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
                            <span style={{ color: '#52525b', fontSize: '0.58rem' }}>Rural {ruralPct}%</span>
                            <span style={{ color: '#52525b', fontSize: '0.58rem' }}>Urbano {100 - ruralPct}%</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10, margin: '0 16px', position: 'relative', zIndex: 10 }} />

                    {/* Datos: Rural + Urbano */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px', marginBottom: 10, padding: '0 16px', position: 'relative', zIndex: 10 }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Rural</p>
                            <p style={{ color: '#d4d4d8', fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 0', lineHeight: 1 }}>
                                {m.rural.toLocaleString('es-CO')}
                            </p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '7px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Urbano</p>
                            <p style={{ color: '#d4d4d8', fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 0', lineHeight: 1 }}>
                                {m.urban.toLocaleString('es-CO')}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10, margin: '0 16px', position: 'relative', zIndex: 10 }} />

                    {/* Total + Aporte */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 16px 16px', position: 'relative', zIndex: 10 }}>
                        <div>
                            <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Total Predios</p>
                            <p style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 900, margin: '2px 0 0', lineHeight: 1 }}>
                                {total.toLocaleString('es-CO')}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ color: '#52525b', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Mi aporte ⅙</p>
                            <p style={{ color: '#D4AF37', fontSize: '1.25rem', fontWeight: 900, margin: '2px 0 0', lineHeight: 1 }}>
                                ~{myShare.toLocaleString('es-CO')}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const CatastroStats: React.FC<{ go: boolean }> = ({ go }) => {
    const finalizados = CATASTRO_MUNICIPIOS.filter(m => m.status === 'finalizado');
    const enProceso = CATASTRO_MUNICIPIOS.filter(m => m.status === 'en_proceso');
    const totalPredios = CATASTRO_MUNICIPIOS.reduce((a, m) => a + m.rural + m.urban, 0);
    const myShare = Math.round(totalPredios / 6);
    const gridRef = useRef<HTMLDivElement>(null);
    const grid2Ref = useRef<HTMLDivElement>(null);

    // GSAP stagger entrance animation
    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const animateGrid = (ref: React.RefObject<HTMLDivElement | null>, delay = 0) => {
                if (!ref.current) return;
                const cards = ref.current.querySelectorAll('.flip-card-container');

                // Animación de entrada premium: scale + y + rotateX + opacity
                gsap.fromTo(cards,
                    { opacity: 0, y: 70, rotateX: -20, scale: 0.90 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 1.0,
                        stagger: 0.1,
                        delay,
                        ease: 'back.out(1.2)',
                        // No usamos ScrollTrigger aquí porque el componente se renderiza CUANDO el usuario cambia de tab.
                        // No usamos ScrollTrigger aquí porque el componente se renderiza CUANDO el usuario cambia de tab.
                        clearProps: 'transform' // EVITAR "all", ya que borra estilos importantes inline (width/height si los hubiera)
                    }
                );
            };

            animateGrid(gridRef, 0.1);
            animateGrid(grid2Ref, 0.2);
        });

        return () => ctx.revert(); // Cleanup completo al desmontar
    }, []);

    return (
        <div className="mt-8 pt-8 border-t border-zinc-800 space-y-8">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.35em] font-black">
                Predios Digitalizados — Catastro Multipropósito LADM-COL
            </p>

            {/* ── KPI strip ── */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { n: CATASTRO_MUNICIPIOS.length, lbl: 'Municipios', sub: '5 entregados · 2 en proceso', gold: false },
                    { n: totalPredios, lbl: 'Predios Totales', sub: 'Rurales + Urbanos digitalizados', gold: false },
                    { n: myShare, lbl: 'Mi Aporte (⅙)', sub: 'Equipo de 6 especialistas', gold: true },
                ].map((k, i) => (
                    <div key={i} className="bg-zinc-900/80 rounded-xl p-3 text-center border border-zinc-800">
                        <p className={`text-xl md:text-2xl font-title ${k.gold ? 'text-[#D4AF37]' : 'text-white'}`}>
                            <AnimNum end={k.n} go={go} />
                        </p>
                        <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black mt-1">{k.lbl}</p>
                        <p className="text-zinc-600 text-[9px] mt-0.5">{k.sub}</p>
                    </div>
                ))}
            </div>

            {/* ── FINALIZADOS — 1→2→ALL en una línea ── */}
            <div>
                <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <p className="text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-black">
                        Finalizados · Entregados
                    </p>
                    <span className="flex-1 h-px bg-emerald-400/10" />
                    <span className="text-zinc-600 text-[10px]">{finalizados.length} municipios</span>
                </div>
                {/* 1 col mobile · 2 col tablet · 5 col desktop en una fila */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4"
                >
                    {finalizados.map((m, i) => (
                        <MuniCard key={i} m={m} go={go} />
                    ))}
                </div>
            </div>

            {/* ── EN PROCESO ── */}
            <div>
                <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <p className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-black">
                        En Proceso · Actualización Activa
                    </p>
                    <span className="flex-1 h-px bg-amber-400/10" />
                    <span className="text-zinc-600 text-[10px]">{enProceso.length} municipios</span>
                </div>
                {/* 1 col mobile · 2 col xl => para abarcar todo el box (50/50) */}
                <div
                    ref={grid2Ref}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {enProceso.map((m, i) => (
                        <MuniCard key={i} m={m} go={go} />
                    ))}
                </div>
            </div>

            {/* ── PRÓXIMAMENTE ── */}
            <div className="flex flex-wrap items-center gap-2 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-black">Próximamente</span>
                </div>
                {['Santander', 'Valle del Cauca', 'Huila', 'Cundinamarca', 'Córdoba'].map(d => (
                    <span key={d} className="text-[10px] text-zinc-500 bg-zinc-800/70 border border-zinc-700/60 px-2.5 py-0.5 rounded-full">
                        {d}
                    </span>
                ))}
                <span className="text-zinc-700 text-[10px] italic">+ más en gestión</span>
            </div>

            <NormBanner norms={NORM_CATASTRO} />
        </div>
    );
};

// ─── TABS data ────────────────────────────────────────────────────────────────

interface TabData {
    id: string; label: string; normLabel: string;
    description: string; features: string[];
    image: string; buttonText: string;
}

const TABS: TabData[] = [
    {
        id: 'mineria',
        label: 'Minería',
        normLabel: 'Res. ANM 504/2018',
        description: 'Automatizamos la estructuración de Formatos Básicos Mineros (FBM), Geodatabases (GDB) y Planes de Obras y Trabajos (POT) bajo los estándares técnicos exigidos por la Agencia Nacional de Minería.',
        features: [
            'Validación topológica automática: detección de solapamientos, brechas y errores geométricos.',
            'Estructuración masiva de FBM y GDB bajo el Modelo de Datos Geográficos ANM Versión 2.',
            'Scripts Python para automatizar flujos de trabajo y reducir el tiempo de entrega hasta un 70%.',
        ],
        image: '/images/sector_mineria_1772070111064.png',
        buttonText: 'Consultoría ANM',
    },
    {
        id: 'ambiente',
        label: 'ANLA',
        normLabel: 'Res. ANLA 2182/2016',
        description: 'Estructuramos Informes de Cumplimiento Ambiental (ICA) y Estudios de Impacto Ambiental bajo el Modelo de Almacenamiento Geográfico (MAG) de la ANLA, garantizando aprobación técnica.',
        features: [
            'Estructuración geográfica de ICAs con el Diccionario de Datos Geográficos ANLA y metadatos institucionales.',
            'Sistema de coordenadas MAGNA-SIRGAS configurado según los orígenes exigidos por la resolución.',
            'Análisis multivariable de amenazas y riesgos ambientales integrado a bases espaciales validadas.',
        ],
        image: '/images/sector_ambiente_1772070327635.png',
        buttonText: 'Consultoría Ambiental',
    },
    {
        id: 'catastro',
        label: 'Catastro',
        normLabel: 'LADM-COL · IGAC',
        description: 'Digitalizamos y actualizamos información predial urbana y rural bajo el modelo LADM-COL, trabajando con gestores catastrales certificados (MASORA) en proyectos de Catastro Multipropósito.',
        features: [
            'Levantamiento y digitalización de predios rurales y urbanos bajo el marco LADM-COL (ISO 19152).',
            'Estructuración de unidades espaciales, derechos, restricciones y responsabilidades catastrales.',
            'Rol de Consolidador SIG: integración, validación y entrega de información geográfica al gestor catastral.',
        ],
        image: '/images/sector_catastro_1772070548686.png',
        buttonText: 'Asesoría Catastral',
    },
];


// ─── Main Component ───────────────────────────────────────────────────────────

const DomainsTabbedSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
    const [ref, go] = useInView();
    const activeData = TABS.find(t => t.id === activeTab) || TABS[0];

    return (
        <div className="w-full relative z-10" ref={ref}>
            <SectionHeader
                subtitle="Expertise Técnico"
                titleLight="Dominios"
                titleGold="Especializados"
                description="Soluciones geoespaciales que cumplen con los estándares técnicos y normativos de la ANM, ANLA e IGAC — los más exigentes de Colombia."
                className="mx-auto text-center flex flex-col items-center mb-16"
            />

            {/* Tab Controls */}
            <div className="hidden md:flex justify-center space-x-2 mb-12">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group flex flex-col items-center px-8 py-4 rounded-full transition-all duration-500 border ${activeTab === tab.id
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                            : 'bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-[#D4AF37]/50 hover:text-white'
                            }`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">{tab.label}</span>
                        <span className={`text-[8px] tracking-wider mt-0.5 ${activeTab === tab.id ? 'text-black/60' : 'text-zinc-700'}`}>
                            {tab.normLabel}
                        </span>
                    </button>
                ))}
            </div>

            {/* Mobile selector */}
            <div className="md:hidden flex flex-col space-y-2 mb-10 px-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(tab.id);
                        }}
                        className={`w-full block text-left px-6 py-4 rounded-lg transition-all duration-300 border cursor-pointer select-none outline-none ${activeTab === tab.id
                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/50'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-500 border-zinc-800'
                            }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <span className="block text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                        <span className="block text-[9px] text-zinc-600 mt-0.5">{tab.normLabel}</span>
                    </button>
                ))}
            </div>

            {/* Content Panel */}
            <div className="bg-zinc-950/50 rounded-[2rem] border border-zinc-900 p-6 md:p-12">
                {/* Top: text + image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1 animate-fade-in-up" key={`text-${activeTab}`}>
                        {/* Norm badge */}
                        <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] mb-5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016" />
                            </svg>
                            {activeData.normLabel}
                        </span>

                        <h3 className="text-3xl md:text-4xl font-title text-white mb-5">
                            {activeData.label} <span className="text-[#D4AF37]">·</span> Expertise
                        </h3>
                        <p className="text-zinc-400 text-base font-light leading-relaxed mb-8">
                            {activeData.description}
                        </p>
                        <div className="space-y-3 mb-10">
                            {activeData.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start space-x-4 group p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#D4AF37]/30 transition-colors">
                                    <div className="h-2 w-2 bg-[#D4AF37] mt-2 rounded-full shrink-0 shadow-[0_0_10px_#D4AF37]" />
                                    <p className="text-zinc-300 text-sm">{feature}</p>
                                </div>
                            ))}
                        </div>
                        <a href="#contacto" className="group relative inline-flex px-10 py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/20">
                            <PixelCanvas colors={["#000000", "#1a1a1a"]} gap={6} speed={40} />
                            <span className="relative z-10">{activeData.buttonText}</span>
                        </a>
                    </div>

                    <div className="order-1 lg:order-2 aspect-square md:aspect-[4/3] w-full rounded-[1.5rem] overflow-hidden relative shadow-2xl border border-zinc-800" key={`img-${activeTab}`}>
                        <div className="absolute inset-0 bg-transparent md:bg-black/20 md:hover:bg-transparent transition-all duration-700 z-10 pointer-events-none" />
                        <img src={activeData.image} alt={activeData.label}
                            className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 md:hover:scale-105 transition-all duration-1000 animate-fade-in" />
                    </div>
                </div>

                {/* Stats per sector */}
                {activeTab === 'mineria' && <MineriaStats go={go} />}
                {activeTab === 'ambiente' && <AnlaStats go={go} />}
                {activeTab === 'catastro' && <CatastroStats go={go} />}
            </div>

            <style>{`
                @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
                @keyframes fadeIn   { from { opacity:0; filter:blur(10px); } to { opacity:1; filter:blur(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
                .animate-fade-in    { animation: fadeIn 0.8s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default DomainsTabbedSection;
