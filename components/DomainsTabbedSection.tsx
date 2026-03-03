import React, { useState, useEffect, useRef } from 'react';
import { PixelCanvas } from './PixelCanvas';
import SectionHeader from './SectionHeader';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PremiumMuniCard from './PremiumMuniCard';

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
export interface CatastroMuni extends MunicipalData { status: MuniStatus; }

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
    { name: 'El Retiro', dept: 'Antioquia', rural: 9031, urban: 3767, role: 'Consolidador SIG', status: 'finalizado', image: '/images/catastro/ElRetiro.jpg', lat: 6.0594, lng: -75.5028 },
    { name: 'Puerto Berrío', dept: 'Antioquia', rural: 7000, urban: 4000, role: 'Independiente', status: 'finalizado', image: '/images/catastro/ElRetiro.jpg', lat: 6.4894, lng: -74.4063 },
    { name: 'Filandia', dept: 'Quindío', rural: 2480, urban: 2539, status: 'finalizado', image: '/images/catastro/Filandia.jpg', lat: 4.6738, lng: -75.6669 },
    { name: 'Quimbaya', dept: 'Quindío', rural: 6643, urban: 2265, status: 'finalizado', image: '/images/catastro/Quimbaya.jpg', lat: 4.6214, lng: -75.7600 },
    { name: 'Montenegro', dept: 'Quindío', rural: 9516, urban: 2208, status: 'finalizado', image: '/images/catastro/Montenegro.jpg', lat: 4.5678, lng: -75.7500 },
    { name: 'San Vicente de Ferrer', dept: 'Antioquia', rural: 2200, urban: 900, status: 'finalizado', image: '/images/catastro/ElRetiro.jpg', lat: 6.2800, lng: -75.3269 },
    { name: 'Barrancabermeja', dept: 'Santander', rural: 4824, urban: 42442, status: 'en_proceso', image: '/images/catastro/Barranca.jpg', lat: 7.0653, lng: -73.8547 },
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
    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="font-mono text-zinc-600 dark:text-zinc-500 text-[9px] uppercase tracking-[0.4em] font-black mb-3">Marco Normativo</p>
        <div className="flex flex-col gap-2">
            {norms.map((n, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center p-4 border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/40 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="shrink-0 font-mono text-[10px] font-black uppercase px-2 py-0.5 border" style={{ color: n.color, borderColor: `${n.color}50` }}>
                        {n.code}
                    </span>
                    <div className="flex-1 min-w-0">
                        <p className="text-zinc-800 dark:text-zinc-300 text-[11px] leading-snug font-medium transition-colors">{n.title}</p>
                        <p className="text-zinc-600 dark:text-zinc-600 text-[9px] mt-0.5 uppercase tracking-wider">{n.entity} · {n.year}</p>
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
                <div key={i} className="bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-[#D4AF37]/30 dark:hover:border-[#D4AF37]/30 rounded-xl p-4 transition-all duration-300 group">
                    <p className={`text-2xl md:text-3xl font-title mb-1 transition-colors ${i < 2 ? 'text-[#D4AF37]' : 'text-zinc-900 dark:text-white'}`}>{k.value}</p>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black">{k.label}</p>
                    <p className="text-zinc-500 dark:text-zinc-600 text-[9px] mt-1 leading-relaxed">{k.detail}</p>
                </div>
            ))}
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 transition-colors">
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mb-4 uppercase tracking-widest font-black">Distribución de Entregables</p>
            {[
                { label: 'FBM — Formatos Básicos Mineros', pct: 55, count: '50+' },
                { label: 'GDB — Geodatabases ANM', pct: 70, count: '65+' },
                { label: 'POT — Planes de Obras y Trabajos', pct: 20, count: '8+' },
            ].map((row, i) => (
                <div key={i} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-1.5">
                        <p className="text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition-colors">{row.label}</p>
                        <p className="text-[#D4AF37] text-[11px] font-bold">{row.count}</p>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden transition-colors">
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
                <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl p-3 text-center border border-zinc-200 dark:border-zinc-800 transition-colors">
                    <p className={`text-xl md:text-2xl font-title transition-colors ${k.gold ? 'text-[#D4AF37]' : 'text-zinc-900 dark:text-white'}`}>
                        <AnimNum end={k.n} go={go} />{k.suf}
                    </p>
                    <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black mt-1">{k.lbl}</p>
                    <p className="text-zinc-500 dark:text-zinc-600 text-[9px] mt-0.5">{k.sub}</p>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ICA_PROJECTS.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/25 p-3 transition-all duration-300">
                    <span className="shrink-0 w-5 h-5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center font-mono text-[#A67C00] dark:text-[#D4AF37] text-[8px] font-black mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                        <p className="text-zinc-900 dark:text-white text-[12px] font-semibold transition-colors">{p.name}</p>
                        <p className="text-zinc-600 dark:text-zinc-500 text-[10px] mt-0.5 transition-colors">{p.scope}</p>
                    </div>
                </div>
            ))}
        </div>
        <NormBanner norms={NORM_ANLA} />
    </div>
);

// ─── STATS: Catastro — FLIP CARDS ─────────────────────────────────────────────

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
                    { n: CATASTRO_MUNICIPIOS.length, lbl: 'Municipios', sub: `${finalizados.length} entregados · ${enProceso.length} en proceso`, gold: false },
                    { n: totalPredios, lbl: 'Predios Totales', sub: 'Rurales + Urbanos digitalizados', gold: false },
                    { n: myShare, lbl: 'Mi Aporte (⅙)', sub: 'Equipo de 6 especialistas', gold: true },
                ].map((k, i) => (
                    <div key={i} className="bg-[#F5F0E8] dark:bg-zinc-900/80 transition-colors rounded-xl p-3 text-center border border-[#C8BFA8] dark:border-zinc-800">
                        <p className={`text-xl md:text-2xl font-title transition-colors ${k.gold ? 'text-[#D4AF37]' : 'text-zinc-900 dark:text-white'}`}>
                            <AnimNum end={k.n} go={go} />
                        </p>
                        <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-black mt-1">{k.lbl}</p>
                        <p className="text-zinc-600 dark:text-zinc-600 text-[9px] mt-0.5 transition-colors">{k.sub}</p>
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
                {/* Adaptive grid: 3 cols when 6 items (3+3), 5 cols for 5, fallback 3 cols */}
                <div
                    ref={gridRef}
                    className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${finalizados.length === 6 ? 'xl:grid-cols-3' :
                            finalizados.length === 5 ? 'xl:grid-cols-5' :
                                finalizados.length === 4 ? 'xl:grid-cols-4' :
                                    'xl:grid-cols-3'
                        }`}
                >
                    {finalizados.map((m, i) => (
                        <PremiumMuniCard key={i} m={m} go={go} />
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
                        <PremiumMuniCard key={i} m={m} go={go} />
                    ))}
                </div>
            </div>

            {/* ── PRÓXIMAMENTE ── */}
            <div>
                <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0 transition-colors" />
                    <p className="text-zinc-500 dark:text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black">
                        Próximamente · En Gestión
                    </p>
                    <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-800 transition-colors" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { name: 'Santander', dept: 'Santander del Norte' },
                        { name: 'Valle del Cauca', dept: 'Valle del Cauca' },
                        { name: 'Huila', dept: 'Departamento del Huila' },
                        { name: 'Cundinamarca', dept: 'Cundinamarca' },
                        { name: 'Córdoba', dept: 'Córdoba' },
                    ].map((place, idx) => (
                        <div
                            key={idx}
                            className="relative h-[200px] rounded-[1.5rem] overflow-hidden border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col items-center justify-center gap-3 transition-colors"
                        >
                            {/* pulsing dot */}
                            <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center transition-colors">
                                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600 animate-pulse transition-colors" />
                            </div>
                            <div className="text-center px-3">
                                <p className="text-zinc-800 dark:text-zinc-200 font-bold text-sm leading-snug transition-colors">{place.name}</p>
                                <p className="text-zinc-500 dark:text-zinc-600 text-[9px] uppercase tracking-widest mt-1 transition-colors">{place.dept}</p>
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-700 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-full transition-colors">
                                Próximamente
                            </span>
                        </div>
                    ))}
                </div>
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
                            : 'bg-white dark:bg-zinc-950 text-zinc-500 border-zinc-200 dark:border-zinc-900 hover:border-[#D4AF37]/50 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">{tab.label}</span>
                        <span className={`text-[8px] tracking-wider mt-0.5 ${activeTab === tab.id ? 'text-black/60' : 'text-zinc-500 dark:text-zinc-700'}`}>
                            {tab.normLabel}
                        </span>
                    </button>
                ))}
            </div>

            {/* Mobile selector — vertical stacked */}
            <div className="md:hidden flex flex-col space-y-2 mb-10 px-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-label={`${tab.label} — ${tab.normLabel}`}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 border cursor-pointer select-none outline-none ${activeTab === tab.id
                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/50'
                            : 'bg-white dark:bg-zinc-900/80 text-zinc-500 border-zinc-200 dark:border-zinc-800'
                            }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        <div className="text-left">
                            <span className="block text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                            <span className="block text-[9px] text-zinc-600 mt-0.5">{tab.normLabel}</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${activeTab === tab.id ? 'bg-[#D4AF37]' : 'bg-zinc-700'}`} />
                    </button>
                ))}
            </div>

            {/* Content Panel */}
            <div className="bg-white dark:bg-zinc-950/50 rounded-[2rem] border border-zinc-200 dark:border-zinc-900 p-6 md:p-12 transition-colors duration-700 shadow-xl dark:shadow-none">
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

                        <h3 className="text-3xl md:text-4xl font-title text-zinc-900 dark:text-white mb-5 transition-colors duration-500">
                            {activeData.label} <span className="text-[#D4AF37]">·</span> Expertise
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-base font-light leading-relaxed mb-8 transition-colors duration-500">
                            {activeData.description}
                        </p>
                        <div className="space-y-3 mb-10">
                            {activeData.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start space-x-4 group p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/30 transition-colors">
                                    <div className="h-2 w-2 bg-[#D4AF37] mt-2 rounded-full shrink-0 shadow-[0_0_10px_#D4AF37]" />
                                    <p className="text-zinc-700 dark:text-zinc-300 text-sm font-medium dark:font-normal">{feature}</p>
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
                        <img src={activeData.image} alt={`${activeData.label} — OnfeVS Geologis`}
                            loading="lazy"
                            decoding="async"
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
