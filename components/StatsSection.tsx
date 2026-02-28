import React, { useEffect, useState, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MunicipalData {
    name: string;
    dept: string;
    rural: number;
    urban: number;
    role?: string; // special role override
    color: string;
    image: string;
}

interface IcaProject {
    name: string;
    type: string;
    scope: string;
}

interface MineriaItem {
    label: string;
    value: string;
    detail: string;
}

// ─── Data: CATASTRO ───────────────────────────────────────────────────────────

const CATASTRO_MUNICIPIOS: MunicipalData[] = [
    { name: 'Barrancabermeja', dept: 'Santander', rural: 14200, urban: 29800, color: '#D4AF37', image: '/images/catastro/barrancabermeja.png' },
    { name: 'El Retiro', dept: 'Antioquia', rural: 10046, urban: 8443, role: 'Consolidador SIG', color: '#F5C842', image: '/images/catastro/el-retiro.png' },
    { name: 'Calarcá', dept: 'Quindío', rural: 6800, urban: 8200, color: '#C9A227', image: '/images/catastro/manizales.png' },
    { name: 'Filandia', dept: 'Quindío', rural: 2502, urban: 2578, color: '#E8C547', image: '/images/catastro/quindio.png' },
    { name: 'Quimbaya', dept: 'Quindío', rural: 2640, urban: 2004, color: '#D4AF37', image: '/images/catastro/quindio.png' },
    { name: 'Montenegro', dept: 'Quindío', rural: 2614, urban: 1780, color: '#B8941F', image: '/images/catastro/quindio.png' },
    { name: 'San Vicente de Ferrer', dept: 'Antioquia', rural: 2200, urban: 900, color: '#F0D060', image: '/images/catastro/el-retiro.png' },
];

// ─── Data: ANLA ───────────────────────────────────────────────────────────────

const ICA_PROJECTS: IcaProject[] = [
    { name: 'ICA Minero Norte', type: 'ICA', scope: 'Área de influencia directa · Antioquia' },
    { name: 'ICA Vial Bucaramanga', type: 'ICA', scope: 'Infraestructura vial · Santander' },
    { name: 'ICA Hidroeléctrica Sur', type: 'ICA', scope: 'Componente hídrico · Huila' },
    { name: 'ICA Oleoducto Caribe', type: 'ICA', scope: 'Corredor ambiental · Costa Caribe' },
    { name: 'ICA Residuos Sólidos', type: 'ICA', scope: 'Área urbana-rural · Quindío' },
    { name: 'ICA Expansión Portuaria', type: 'ICA', scope: 'Zona costera · Bolívar' },
    { name: 'ICA Deforestación RN', type: 'ICA', scope: 'Bosque húmedo · Chocó' },
    { name: 'ICA Agroindustrial', type: 'ICA', scope: 'Palma de aceite · Meta' },
    { name: 'ICA Captación Hídrica', type: 'ICA', scope: 'Cuenca alta · Cundinamarca' },
    { name: 'ICA Minería Artesanal', type: 'ICA', scope: 'Pequeña minería · Nariño' },
];

const ANLA_KPIS = [
    { value: 20, suffix: '+', label: 'ICAs Estructurados', detail: 'Informes de Cumplimiento Ambiental' },
    { value: 95, suffix: '%', label: 'Aprobación ANLA', detail: 'Tasa de aprobación técnica' },
    { value: 10, suffix: '', label: 'Departamentos', detail: 'Cobertura territorial nacional' },
];

// ─── Data: MINERÍA ────────────────────────────────────────────────────────────

const MINERIA_ITEMS: MineriaItem[] = [
    { label: 'FBM Entregados', value: '50+', detail: 'Formularios de Bien Minero · ANM' },
    { label: 'POT Procesados', value: '8+', detail: 'Planes de Ordenamiento Territorial' },
    { label: 'GDBs Estructuradas', value: '65+', detail: 'Geodatabases bajo resolución ANM vigente' },
    { label: 'Reducción de tiempo', value: '70%', detail: 'vs. estructuración manual convencional' },
    { label: 'Tasa de Aprobación', value: '98%', detail: 'Validación topológica sin devoluciones' },
    { label: 'Regiones Cubiertas', value: '6', detail: 'Antioquia · Boyacá · Cesar · Córdoba · Meta · Chocó' },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useInView = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); }
        }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, isVisible] as const;
};

// ─── Animated counter ─────────────────────────────────────────────────────────

const AnimNum: React.FC<{ end: number; suffix: string; go: boolean; duration?: number }> = ({
    end, suffix, go, duration = 1800,
}) => {
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!go) return;
        let n = 0;
        const inc = end / (duration / 16);
        const t = setInterval(() => {
            n += inc;
            if (n >= end) { clearInterval(t); setV(end); } else setV(Math.floor(n));
        }, 16);
        return () => clearInterval(t);
    }, [end, go, duration]);
    return <span>{v.toLocaleString('es-CO')}{suffix}</span>;
};

// ─── Mini progress bar ────────────────────────────────────────────────────────

const MiniBar: React.FC<{ rural: number; urban: number; color: string; go: boolean }> = ({ rural, urban, color, go }) => {
    const total = rural + urban;
    const rp = (rural / total) * 100;
    const up = 100 - rp;
    return (
        <div className="flex w-full h-1.5 rounded-full overflow-hidden bg-zinc-800 mt-1.5">
            <div className="h-full transition-all duration-1000 ease-out" style={{ width: go ? `${rp}%` : '0%', backgroundColor: color, opacity: 0.65 }} />
            <div className="h-full transition-all duration-1000 ease-out" style={{ width: go ? `${up}%` : '0%', backgroundColor: color, transitionDelay: '100ms' }} />
        </div>
    );
};

// ─── MuniCard ─────────────────────────────────────────────────────────────────

const MuniCard: React.FC<{ m: MunicipalData; go: boolean }> = ({ m, go }) => {
    const total = m.rural + m.urban;
    const myShare = Math.round(total / 6);
    const rp = Math.round((m.rural / total) * 100);
    return (
        <div className="group perspective-1000 w-full h-[320px]">
            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* FRONT: Image with golden filter */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-zinc-800">
                    <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover gold-filter"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                        <p className="text-white font-black text-xl font-title tracking-tight">{m.name}</p>
                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">{m.dept}</p>
                    </div>
                </div>

                {/* BACK: Information */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-zinc-950 border border-[#D4AF37]/30 p-5 flex flex-col gap-3 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                    <div>
                        <div className="flex items-start justify-between gap-1">
                            <p className="text-white font-semibold text-lg leading-tight">{m.name}</p>
                            {m.role && (
                                <span className="shrink-0 text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] font-black">
                                    {m.role}
                                </span>
                            )}
                        </div>
                        <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-0.5">{m.dept}</p>
                    </div>

                    <div className="mt-1">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-2">Composición Predial</p>
                        <MiniBar rural={m.rural} urban={m.urban} color={m.color} go={go} />
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 mt-1">
                        <div>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-wider">Rural</p>
                            <p className="text-white text-base font-bold">{m.rural.toLocaleString('es-CO')}</p>
                            <p className="text-zinc-600 text-[10px]">{rp}%</p>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-wider">Urbano</p>
                            <p className="text-white text-base font-bold">{m.urban.toLocaleString('es-CO')}</p>
                            <p className="text-zinc-600 text-[10px]">{100 - rp}%</p>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800 mt-auto" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-wider">Total Predios</p>
                            <p className="text-white text-base font-black">{total.toLocaleString('es-CO')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: m.color }}>Mi aporte ⅙</p>
                            <p className="text-base font-black" style={{ color: m.color }}>~{myShare.toLocaleString('es-CO')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Panel: CATASTRO ──────────────────────────────────────────────────────────

const CatastroPanel: React.FC<{ go: boolean }> = ({ go }) => {
    const [tab, setTab] = useState(0);
    const totalPredios = CATASTRO_MUNICIPIOS.reduce((a, m) => a + m.rural + m.urban, 0);
    const myTotal = CATASTRO_MUNICIPIOS.reduce((a, m) => a + Math.round((m.rural + m.urban) / 6), 0);

    return (
        <div>
            {/* Summary KPIs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { n: 7, suf: '', lbl: 'Municipios', sub: 'Catastro Multipropósito' },
                    { n: totalPredios, suf: '', lbl: 'Predios Totales', sub: 'Rurales + Urbanos' },
                    { n: myTotal, suf: '', lbl: 'Mi Contribución', sub: '1 / 6 del equipo' },
                ].map((k, i) => (
                    <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 text-center">
                        <div className="text-3xl md:text-4xl font-title text-white mb-1">
                            {i === 2
                                ? <span className="text-[#D4AF37]"><AnimNum end={k.n} suffix={k.suf} go={go} /></span>
                                : <AnimNum end={k.n} suffix={k.suf} go={go} />
                            }
                        </div>
                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black">{k.lbl}</p>
                        <p className="text-zinc-600 text-[10px] mt-0.5">{k.sub}</p>
                    </div>
                ))}
            </div>

            {/* Mobile tab selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
                {CATASTRO_MUNICIPIOS.map((m, i) => (
                    <button key={i} onClick={() => setTab(i)}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${tab === i ? 'bg-[#D4AF37] text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                        {m.name.split(' ')[0]}
                    </button>
                ))}
            </div>

            {/* Desktop grid | Mobile single */}
            <div className="hidden md:grid grid-cols-4 gap-3">
                {CATASTRO_MUNICIPIOS.slice(0, 4).map((m, i) => <MuniCard key={i} m={m} go={go} />)}
            </div>
            <div className="hidden md:grid grid-cols-3 gap-3 mt-3">
                {CATASTRO_MUNICIPIOS.slice(4).map((m, i) => <MuniCard key={i} m={m} go={go} />)}
            </div>
            <div className="md:hidden">
                <MuniCard m={CATASTRO_MUNICIPIOS[tab]} go={go} />
            </div>

            {/* Legend + source */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#D4AF37]/60" /><span className="text-zinc-500 text-[10px] uppercase tracking-wider">Rural</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#D4AF37]" /><span className="text-zinc-500 text-[10px] uppercase tracking-wider">Urbano</span></div>
                <p className="ml-auto text-zinc-700 text-[10px] italic">Fuente: MASORA · IGAC · Catastro Multipropósito 2024–2025</p>
            </div>
        </div>
    );
};

// ─── Panel: ANLA ─────────────────────────────────────────────────────────────

const AnlaPanel: React.FC<{ go: boolean }> = ({ go }) => (
    <div>
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            {ANLA_KPIS.map((k, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 text-center">
                    <div className={`text-3xl md:text-4xl font-title mb-1 ${i === 0 ? 'text-[#D4AF37]' : 'text-white'}`}>
                        <AnimNum end={k.value} suffix={k.suffix} go={go} />
                    </div>
                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black">{k.label}</p>
                    <p className="text-zinc-600 text-[10px] mt-0.5">{k.detail}</p>
                </div>
            ))}
        </div>

        {/* ICA project list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ICA_PROJECTS.map((p, i) => (
                <div key={i} className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 hover:border-[#D4AF37]/30 rounded-xl p-4 transition-all duration-300 group">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all">
                        <span className="text-[#D4AF37] text-[9px] font-black">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">{p.name}</p>
                        <p className="text-zinc-500 text-[11px] mt-0.5">{p.scope}</p>
                    </div>
                    <span className="ml-auto shrink-0 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500 self-start">
                        {p.type}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <p className="text-zinc-500 text-[11px]">Estructuración geoespacial bajo modelo de almacenamiento ANLA</p>
            <p className="text-zinc-700 text-[10px] italic">+10 proyectos adicionales en curso</p>
        </div>
    </div>
);

// ─── Panel: MINERÍA ───────────────────────────────────────────────────────────

const MineriaPanel: React.FC<{ go: boolean }> = ({ go }) => (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {MINERIA_ITEMS.map((item, i) => (
                <div key={i}
                    className="group bg-zinc-950 border border-zinc-800 hover:border-[#D4AF37]/40 rounded-2xl p-5 flex flex-col transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/0 group-hover:from-[#D4AF37]/4 to-transparent transition-all duration-500 pointer-events-none" />
                    <p className={`text-3xl md:text-4xl font-title mb-2 ${i < 2 ? 'text-[#D4AF37]' : 'text-white'}`}>
                        {item.value}
                    </p>
                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black">{item.label}</p>
                    <p className="text-zinc-600 text-[10px] mt-1.5 leading-relaxed">{item.detail}</p>
                </div>
            ))}
        </div>

        {/* Visual breakdown bar */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black mb-6">Distribución de Entregables ANM</p>
            {[
                { label: 'FBM (Formularios de Bien Minero)', pct: 55, count: '50+' },
                { label: 'GDB (Geodatabases ANM)', pct: 70, count: '65+' },
                { label: 'POT (Planes de Ordenamiento)', pct: 20, count: '8+' },
            ].map((row, i) => (
                <div key={i} className="mb-5 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                        <p className="text-zinc-300 text-[12px]">{row.label}</p>
                        <p className="text-[#D4AF37] text-[12px] font-bold">{row.count}</p>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#996515] to-[#F5D142] transition-all duration-1000 ease-out"
                            style={{ width: go ? `${row.pct}%` : '0%', transitionDelay: `${i * 150}ms` }}
                        />
                    </div>
                </div>
            ))}
            <p className="mt-6 text-zinc-600 text-[10px] italic">Cumplimiento normativo ANM · Resolución 40600 y concordantes</p>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

type SectorId = 'catastro' | 'anla' | 'mineria';

const SECTORS: { id: SectorId; label: string; icon: React.ReactNode }[] = [
    {
        id: 'catastro',
        label: 'Catastro',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
        ),
    },
    {
        id: 'anla',
        label: 'ANLA / Ambiental',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12a8.96 8.96 0 0 0 .284 2.253" />
            </svg>
        ),
    },
    {
        id: 'mineria',
        label: 'Minería ANM',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
        ),
    },
];

const StatsSection: React.FC = () => {
    const [ref, go] = useInView();
    const [active, setActive] = useState<SectorId>('catastro');

    return (
        <div className="w-full bg-zinc-950 py-24 relative overflow-hidden" ref={ref}>
            {/* Decorative lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#D4AF37]/3 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black mb-4">
                        Impacto Real · Números Verificables
                    </p>
                    <h2 className="text-3xl md:text-4xl font-title text-white">
                        Experiencia en{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D142]">
                            Cifras
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-sm mt-4 max-w-xl mx-auto">
                        Proyectos reales ejecutados en los tres ejes técnicos — Catastro, Ambiental y Minería — con resultados medibles y entregables aprobados por las autoridades competentes.
                    </p>
                </div>

                {/* Sector tabs */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {SECTORS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActive(s.id)}
                            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${active === s.id
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-[#D4AF37]/40 hover:text-white'
                                }`}
                        >
                            <span className={active === s.id ? 'text-black' : 'text-zinc-500'}>{s.icon}</span>
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Panel */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 md:p-10">
                    {active === 'catastro' && <CatastroPanel go={go} />}
                    {active === 'anla' && <AnlaPanel go={go} />}
                    {active === 'mineria' && <MineriaPanel go={go} />}
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
