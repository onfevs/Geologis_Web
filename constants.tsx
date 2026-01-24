
import { NavItem, Review, FAQItem, Service, Project, YoutubeVideo } from './types';

export const GOLD_COLORS = ["#D4AF37", "#F5D142", "#996515", "#FFD700"];

export const HERO_KEYWORDS = ["SIG", "ANM / ANLA", "PYTHON", "LADM-COL", "GEOLOGÍA", "MINERÍA", "CATASTRO"];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Sectores', href: '#sectores' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Media', href: '#media' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export const SERVICES: Service[] = [
  {
    title: "SIG & Gestión Geoespacial",
    description: "Administración avanzada de datos para cumplimiento de normas ANM y ANLA en Colombia.",
    icon: "M9 20l-5.447-2.724A2 2 0 013 15.488V5.512a2 2 0 011.553-1.944L9 2l6 3 6-3 4.447 2.224A2 2 0 0121 5.512v9.976a2 2 0 01-1.553 1.944L15 20l-6-3-6 3",
    features: ["Mapas de susceptibilidad", "Intersección de polígonos", "Modelos digitales de terreno"]
  },
  {
    title: "Automatización con Python",
    description: "Desarrollo de scripts personalizados para el procesamiento masivo de datos geológicos y reportes.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    features: ["ETL Geoespacial", "Automatización de QGIS/ArcPy", "Data Cleaning Geológico"]
  },
  {
    title: "Consultoría ANM / ANLA",
    description: "Garantizamos que sus proyectos cumplan con los rigurosos estándares técnicos y legales vigentes.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016",
    features: ["Formato GDB", "Tablas de atributos estándar", "Metadatos geográficos"]
  }
];

export const SECTORS = [
  {
    id: "mineria",
    title: "Minería",
    description: "Gestión de Títulos y Geodatabases ANM",
    image: "https://images.unsplash.com/photo-1529439322271-42931c09bce1?auto=format&fit=crop&q=80&w=1200",
    href: "#mineria"
  },
  {
    id: "medioambiente",
    title: "Medio Ambiente",
    description: "Estudios de Impacto y Licenciamiento ANLA",
    image: "https://images.unsplash.com/photo-1511497584788-8767fe771d21?auto=format&fit=crop&q=80&w=1200",
    href: "#medioambiente"
  },
  {
    id: "catastro",
    title: "Catastro",
    description: "LADM-COL y Planeación Territorial",
    image: "https://images.unsplash.com/photo-1544383335-96575199581a?auto=format&fit=crop&q=80&w=1200",
    href: "#catastro"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "GDB Automática Minera",
    category: "Python + SIG",
    image: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?auto=format&fit=crop&q=80&w=800",
    result: "Reducción del 70% en tiempo de entrega de reportes."
  },
  {
    title: "Susceptibilidad ANLA",
    category: "Ambiental",
    image: "https://images.unsplash.com/photo-1501854140801-50d01674aa3e?auto=format&fit=crop&q=80&w=800",
    result: "Precisión del 95% validada por ANLA."
  },
  {
    title: "Catastro Multipropósito",
    category: "LADM-COL",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800",
    result: "Integración de 12,000 folios geográficos."
  },
  {
    title: "Dashboard de Sondajes",
    category: "Geología",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
    result: "Visualización 3D interactiva en tiempo real."
  },
  {
    title: "ETL de Datos Masivos",
    category: "Data Engineering",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
    result: "Migración de 1M de registros geocodificados."
  },
  {
    title: "Mapeo Geomorfológico",
    category: "Consultoría",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    result: "Definición de zonas de riesgo para POT."
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Ing. Ricardo Santos",
    role: "Director Proyectos",
    company: "Minera Central",
    content: "La automatización con Python de OnfeVS revolucionó nuestra forma de procesar datos de campo.",
    rating: 5
  },
  {
    id: 2,
    author: "Dra. Martha Luz",
    role: "Consultora Senior",
    company: "EcoGeo",
    content: "Los mejores entregables GDB que hemos recibido. Cumplimiento total de normatividad ANLA.",
    rating: 5
  },
  {
    id: 3,
    author: "Ing. Carlos Mesa",
    role: "Gerente SIG",
    company: "GeoInnova",
    content: "Ahorro masivo de tiempo y eliminación de errores críticos en nuestras geodatabases.",
    rating: 5
  },
  {
    id: 4,
    author: "Dra. Elena Ruiz",
    role: "Especialista",
    company: "GreenLeaf",
    content: "Mapas de susceptibilidad que superaron las expectativas técnicas de la autoridad minera.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "¿Qué softwares SIG dominan en su flujo de trabajo?",
    answer: "Dominamos el ecosistema ESRI (ArcGIS Pro/Online), QGIS para flujos Open Source y Global Mapper. Nuestra ventaja competitiva radica en la integración de Python (ArcPy/PyQGIS) para automatizar tareas que tradicionalmente se harían de forma manual."
  },
  {
    question: "¿Cumplen con los estándares GDB vigentes de la ANM?",
    answer: "Absolutamente. Automatizamos la validación de topología, dominios y subtipos para asegurar que cada Geodatabase entregada a la Agencia Nacional de Minería cumpla estrictamente con la resolución técnica vigente, minimizando devoluciones."
  },
  {
    question: "¿Cómo garantizan la precisión en estudios para la ANLA?",
    answer: "Para la ANLA, estructuramos los modelos de datos siguiendo el Modelo de Almacenamiento Geográfico. Aplicamos controles de calidad espacial rigurosos en la intersección de polígonos y capas de susceptibilidad para asegurar coherencia técnica en los EIA."
  },
  {
    question: "¿Realizan la estructuración bajo el modelo LADM-COL?",
    answer: "Sí. Somos especialistas en la implementación técnica del modelo de dominio LADM-COL para proyectos de Catastro Multipropósito y administración de tierras, asegurando la interoperabilidad de la información predial y geográfica."
  },
  {
    question: "¿Ofrecen soporte técnico tras la entrega de los productos SIG?",
    answer: "Sí, todos nuestros entregables incluyen un periodo de acompañamiento técnico para resolver dudas durante la revisión de las autoridades mineras o ambientales, garantizando la aprobación final de la geodatabase."
  },
  {
    question: "¿Cómo manejan la seguridad y confidencialidad de los datos geológicos?",
    answer: "Implementamos protocolos de cifrado y acuerdos de confidencialidad estrictos. Sabemos que la información minera es un activo estratégico; por ello, el manejo de datos se realiza bajo estándares ISO de seguridad de la información."
  },
  {
    question: "¿Es posible integrar sus geodatabases con sistemas SAP o ERP corporativos?",
    answer: "Efectivamente. Mediante Python y conexiones SQL, podemos estructurar flujos de datos que alimenten dashboards corporativos o se integren directamente con sistemas de gestión de activos y planeación minera."
  },
  {
    question: "¿Cuáles son los tiempos de entrega promedio para una GDB masiva?",
    answer: "Gracias a nuestros scripts de automatización, reducimos los tiempos de estructuración manual en un 60%. Una GDB compleja puede estar lista para validación en un lapso de 5 a 10 días hábiles, dependiendo del volumen de datos fuente."
  },
  {
    question: "¿Tienen experiencia trabajando en regiones específicas de Colombia?",
    answer: "Hemos ejecutado proyectos en todo el territorio nacional, desde la zona minera de Antioquia y Boyacá hasta proyectos ambientales en la Costa Caribe y el Llano, adaptándonos a las particularidades cartográficas de cada región."
  },
  {
    question: "¿Desarrollan herramientas personalizadas (Plugins) para QGIS o ArcGIS?",
    answer: "Sí, desarrollamos herramientas 'In-house' a medida para nuestros clientes que necesitan optimizar procesos recurrentes, como la generación automática de formatos de campo o el cálculo de áreas de compensación ambiental."
  }
];

export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: "video1",
    title: "Dominando la GDB de la ANM",
    description: "Guía técnica para la estructuración y validación topográfica de títulos mineros.",
    thumbnail: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "video2",
    title: "Python para Geoprocesos",
    description: "Cómo automatizar el flujo de trabajo entre QGIS y ArcGIS Pro usando ArcPy.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "video3",
    title: "Modelamiento LADM-COL",
    description: "Implementación técnica del modelo de dominio para catastro multipropósito.",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c89eececbfbc?auto=format&fit=crop&q=80&w=800"
  }
];

export const YOUTUBE_URL = "https://www.youtube.com/channel/UCuw7tG2Ve01P9yu4J6JzwXg";
export const HERO_STATIC_URL = "https://dvhzxuyeczsymbcftucd.supabase.co/storage/v1/object/sign/Web/1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZWI4NjM4Ni00MGVhLTQwMGAbOGJhNy0yZDQwZGRjOWI1NjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJXZWIvMS5wbmciLCJpYXQiOjE3NjkyMTYzMDksImV4cCI6MzM0NjAxNjMwOX0.9wl_aCajPLKcdc5CQIfu8b7Ylhd0UHUh_X0OIbAo20A";
export const HERO_BG_URL = "https://dvhzxuyeczsymbcftucd.supabase.co/storage/v1/object/sign/Web/81feb0f0-8a0e-4220-b681-b78c76a9dd1c-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZWI4NjM4Ni00MGVhLTQwMGItOGJhNy0yZDQwZGRjOWI1NjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJXZWIvODFmZWIwZjAtOGEwZS00MjIwLWI2ODEtYjc4Yzc2YTlkZDFjLWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY5MjE1OTIyLCJleHAiOjMzNDYwMTU5MjJ9.AQvQnOBmmx08mosRqS11Hip1a_yO4FDzlJkC1DlRQPM";
