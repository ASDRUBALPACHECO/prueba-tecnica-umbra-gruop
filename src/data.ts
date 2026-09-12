import { Residence, Amenity, LocationPoint } from './types';
import heroImg from './images/Hero.jpg';
import interiorImg from './images/interior_image.jpg';
import experienciaImg from './images/Experiencia_image.jpg';
import cliffsideImg from './images/cliffside_estate.jpg';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1WWnWeAvZ1b1LYvERegNjMwRU97EvNUf5SaJIbFa4Gn3Ke75fGQ_BmFQqXcS0EVZu9yFsT11xNIQy-mFnQaz7eaRfdIlG-rvBKsko1EyggY7UWnsm3uwIzS6YFZHUCVBEKlb6XAzn_No_lQYXhTaCChRvj0GOMrQkcgjtkMcTt-Jhd15PPsrcND2c092zNE2iWwerfm-seY3kw0_OrNbrOK4T24isrOr09wlPW1a2nOMEJ_0AXUDKT5zA';

export const HERO_IMAGE = heroImg;

export const INTERIOR_AWARD_IMAGE = interiorImg;

export const EXPERIENCIA_IMAGE = experienciaImg;

export const RESIDENCES: Residence[] = [
  {
    id: 'garden-villa',
    name: 'Garden Villa Alborada',
    category: 'garden',
    categoryLabel: 'Garden Villas',
    badge: 'Planta Baja Privada',
    dimensions: '350 m² Interiores · 120 m² Jardín',
    suites: '3',
    bathrooms: '4.5',
    feature: 'Plunge',
    featureLabel: 'Piscina',
    price: 'Desde $1.85M USD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRPKAtDts0UsxX8QmXS5x8fZr5_UE2AcLl_h-AKZwA9YZsVortHR3vt6hXesjG79dlOQuVnSc_jNMH7FZw5K9m2JXq_VLtLhdvoVfdKvqH0fY58L-NrSRLQoXWChvOKkUdeqWQTaa36r3mdQ00JkYMt13qzlUMdjMW21o57zaE3E36ntR-nod6kZrmXUxHnUU71z5Kecz45Ts2JybpKHzCFLsTvlU5f69KW5fqkbRqTRy980Dy0aU=s2048',
    imageAlt: 'Modern luxury beachfront garden villa patio with private pool and lush greenery',
    coveredArea: '350 m²',
    terraceArea: '120 m² con jardín botánico',
    level: 'Planta Baja',
    orientation: 'Suroeste (Puesta de sol directa)',
    parking: '2 Plazas cerradas con cargador Wallbox EV',
    storage: 'Cava privada + Trastero náutico',
    description: 'Concebida para fusionar la tranquilidad de un oasis botánico privado con la cercanía inmediata a la arena. Cuenta con techos de 3.40 m de altura libre, ventanales retráctiles de piso a techo y una piscina plunge de piedra balinesa rodeada de palmeras autóctonas.',
    highlights: [
      'Piscina plunge climatizada con sistema de cloración salina',
      'Cocina italiana Poliform con encimeras de mármol Fior di Bosco',
      'Doble suite principal con baños dobles y vestidores de nogal',
      'Acceso directo y discreto al sendero privado de la playa'
    ],
    blueprintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRPKAtDts0UsxX8QmXS5x8fZr5_UE2AcLl_h-AKZwA9YZsVortHR3vt6hXesjG79dlOQuVnSc_jNMH7FZw5K9m2JXq_VLtLhdvoVfdKvqH0fY58L-NrSRLQoXWChvOKkUdeqWQTaa36r3mdQ00JkYMt13qzlUMdjMW21o57zaE3E36ntR-nod6kZrmXUxHnUU71z5Kecz45Ts2JybpKHzCFLsTvlU5f69KW5fqkbRqTRy980Dy0aU=s2048'
  },
  {
    id: 'oceanfront-suite',
    name: 'Oceanfront Coral Residence',
    category: 'ocean',
    categoryLabel: 'Oceanfront Suites',
    badge: 'Vista Panorámica',
    dimensions: '440 m² Totales · Nivel 3',
    suites: '4',
    bathrooms: '5',
    feature: 'Terraza',
    featureLabel: 'Jacuzzi',
    price: 'Desde $2.40M USD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048',
    imageAlt: 'Interior master suite bedroom of luxury beach villa with panoramic floor-to-ceiling glass doors',
    coveredArea: '360 m²',
    terraceArea: '80 m² volada sobre el mar',
    level: 'Nivel 3 (Elevación intermedia óptima)',
    orientation: 'Frontal Oeste 180°',
    parking: '3 Plazas en sótano climatizado',
    storage: 'Cava con temperatura regulada para 400 botellas',
    description: 'Una perspectiva insuperable sobre las olas rompientes. Esta residencia intermedia captura la brisa marina y ofrece una terraza en voladizo continuo de 28 metros lineales con jacuzzi termal integrado de piedra volcánica.',
    highlights: [
      'Terraza perimetral volada con barandillas de vidrio ultraclaro templado',
      'Master suite con bañera exenta de mármol travertino con vistas al mar',
      'Suite de invitados independiente con entrada de servicio auxiliar',
      'Domótica Lutron HomeWorks con escenarios lumínicos circadianos'
    ],
    blueprintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  },
  {
    id: 'sky-penthouse',
    name: 'Sky Penthouse Mirador',
    category: 'penthouse',
    categoryLabel: 'Sky Penthouses',
    badge: 'Rooftop Privado',
    dimensions: '680 m² Dúplex · Techo Panorámico',
    suites: '5',
    bathrooms: '6.5',
    feature: 'Infinity',
    featureLabel: 'Piscina',
    price: 'Desde $3.95M USD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAivozrdrussQ78Hkd5PM0jyo4SpqtklEP_90rYGqIw4Ohc3E4G3c7jpES9V5-0NiNT7SzKEPIZv5NrWsXj0NhZbXv5KsnCCytVKdY9cwQhYM8TL_EB__SNX5bVQ7dCunsgLMplZ3r_5j5B9fbxbIsimknccUqHEnsMHUm3InhbXT-Ovw0g_VemWR3pnNegB85EqJle90R8WuTb-IqzA7Zt2tj-pJeD68AUctB5wZm_Gr1uynbv85ZI=s2048',
    imageAlt: 'Rooftop luxury penthouse infinity pool overlooking turquoise calm sea at twilight',
    coveredArea: '480 m²',
    terraceArea: '200 m² en rooftop superior privado',
    level: 'Niveles 5 y 6 (Dúplex Corona)',
    orientation: '360° Panorámica (Mar, Bahía y Cadena Montañosa)',
    parking: '4 Plazas cerradas con box privado',
    storage: 'Armero de seguridad, cava walk-in y trastero técnico',
    description: 'La cúspide de Ohana Beach House. Un dúplex monumental con acceso en ascensor privado de doble clave biométrica, coronado por un solárium en azotea de 200 m² con piscina infinity de 14 metros suspendida hacia el infinito oceánico.',
    highlights: [
      'Piscina infinity privada en cubierta de 14 metros con fondo de cristal',
      'Ascensor privado que abre directamente en el vestíbulo de la residencia',
      'Pérgola bioclimática automatizada con cocina exterior Gaggenau',
      'Salón de doble altura (6.8 m) con chimenea lineal de vapor y mármol'
    ],
    blueprintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAivozrdrussQ78Hkd5PM0jyo4SpqtklEP_90rYGqIw4Ohc3E4G3c7jpES9V5-0NiNT7SzKEPIZv5NrWsXj0NhZbXv5KsnCCytVKdY9cwQhYM8TL_EB__SNX5bVQ7dCunsgLMplZ3r_5j5B9fbxbIsimknccUqHEnsMHUm3InhbXT-Ovw0g_VemWR3pnNegB85EqJle90R8WuTb-IqzA7Zt2tj-pJeD68AUctB5wZm_Gr1uynbv85ZI=s2048'
  },
  {
    id: 'cliffside-estate',
    name: 'Cliffside Signature Estate',
    category: 'estate',
    categoryLabel: 'Signature Estates',
    badge: 'Edición Limitada',
    dimensions: '820 m² Parcela · 540 m² Construidos',
    suites: '6',
    bathrooms: '7.5',
    feature: 'Cantilever',
    featureLabel: 'Piscina Volada',
    price: 'Desde $5.20M USD',
    image: cliffsideImg,
    imageAlt: 'Ultra-luxury modern architectural villa perched on dramatic cliff with cantilevered pool',
    coveredArea: '540 m²',
    terraceArea: '280 m² volada sobre el acantilado',
    level: 'Villa Independiente en Acantilado',
    orientation: 'Suroeste (Atardeceres infinitos)',
    parking: '4 Plazas subterráneas climatizadas con elevador vehicular',
    storage: 'Búnker de seguridad, cava privada de 600 botellas y zona náutica',
    description: 'La máxima expresión del diseño arquitectónico en Ohana. Esta villa unifamiliar independiente se asienta en la cresta más exclusiva del acantilado, con una piscina volada de voladizo estructural audaz que parece flotar sobre el romper de las olas.',
    highlights: [
      'Piscina en voladizo estructural de 18 metros sobre el mar abierto',
      'Master suite de 110 m² con chimenea de bioetanol y terraza privada zen',
      'Gimnasio privado con sauna seco, baño turco y cabina de crioterapia',
      'Ascensor interior privado que conecta todos los niveles hasta la cala'
    ],
    blueprintImg: cliffsideImg
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'infinity-pool',
    category: 'Bienestar',
    title: 'Infinity Pool & Solarium',
    description: 'Borde infinito suspendido sobre el acantilado con camas balinesas privadas y servicio de bar de toallas frescas.',
    iconName: 'pool',
    actionLabel: 'Acceso Exclusivo',
    extendedDescription: 'Diseñada como un espejo de agua mineralizada de 45 metros que se confunde visualmente con la línea del horizonte. Cuenta con zonas de hidromasaje sumergidas, sombrillas de lino náutico y servicio continuado de conserjería con carta de refrigerios orgánicos y toallas aromatizadas con flor de azahar.',
    hours: '07:00 - 22:00 (Residentes)',
    serviceType: 'Servicio de Toallas & Bar Náutico',
    image: HERO_IMAGE
  },
  {
    id: 'wellness-spa',
    category: 'Salud Holística',
    title: 'Wellness Spa & Hammam',
    description: 'Circuito hidrotermal completo, saunas finlandeses con vapor aromatizado y cabinas de masajes biomoleculares.',
    iconName: 'spa',
    actionLabel: 'Tratamientos a la Carta',
    extendedDescription: 'Un templo subterráneo de regeneración celular esculpido en piedra volcánica y maderas de cedro rojo. Incluye piscina de contraste térmico, sala de haloterapia con sal del Himalaya, baño turco vaporizado con eucalipto silvestre y cabinas de tratamiento doble atendidas por terapeutas especializados.',
    hours: '08:00 - 21:00',
    serviceType: 'Terapeutas bajo reserva privada',
    image: EXPERIENCIA_IMAGE
  },
  {
    id: 'beach-club',
    category: 'Costa Privada',
    title: 'Private Beach Club',
    description: 'Mayordomía en arena, gastronomía marina de autor con pesca del día y embarcadero privado para veleros.',
    iconName: 'beach_access',
    actionLabel: 'Solo Residentes',
    extendedDescription: 'Extensión directa de Ohana sobre la cala protegida. Cabanas de sombra arquitectónica equipadas con tomas de corriente, cajas fuertes y llamada directa a mayordomo de playa. Incluye muelle privado para tender y motos acuáticas, kayaks de fibra de carbono y tablas de paddle board de cortesía.',
    hours: '09:00 - Puesta de sol',
    serviceType: 'Mayordomía de costa y deportes náuticos',
    image: RESIDENCES[0].image
  },
  {
    id: 'wine-lounge',
    category: 'Gastronomía',
    title: 'Wine & Cigar Lounge',
    description: 'Cava subterránea climatizada con más de 2,000 etiquetas internacionales y asesoría de sumiller permanente.',
    iconName: 'wine_bar',
    actionLabel: 'Cavas Personales',
    extendedDescription: 'Espacio de tertulia íntima con control riguroso de humedad (70%) y temperatura (14°C). Cada propietario dispone de su propio casillero blindado de roble francés para añejamiento de cosechas privadas. Salón con ventilación de extracción pasiva silenciosa y humidor de puros habanos certificados.',
    hours: '24 Horas con llave biométrica',
    serviceType: 'Degustaciones privadas mensuales',
    image: INTERIOR_AWARD_IMAGE
  },
  {
    id: 'helipad',
    category: 'Logística VIP',
    title: 'Helipuerto & Concierge 24/7',
    description: 'Plataforma aérea certificada con transfer directo, coordinación de vuelos ejecutivos y seguridad de grado militar.',
    iconName: 'flight_takeoff',
    actionLabel: 'Servicio Ininterrumpido',
    extendedDescription: 'Pista de aterrizaje propia con balizaje nocturno reglamentario ICAO, capaz de recibir helicópteros bimotor ejecutivos. Conexión de 4 minutos con el Aeropuerto Internacional y transfer terrestre discreto mediante flota de todoterrenos eléctricos de alta gama conducidos por personal de seguridad privada.',
    hours: 'Operatividad 24/7/365',
    serviceType: 'Coordinación de permisos de vuelo y planes de viaje',
    image: RESIDENCES[2].image
  }
];

export const LOCATION_POINTS: LocationPoint[] = [
  {
    id: 'ohana',
    badge: 'Epicentro Costero',
    title: 'Ohana Beach House',
    desc: '24 Residencias exclusivas en primera línea de acantilado con cala privada y muelle protegido.',
    travelTime: '0 min (Ubicación Central)',
    icon: 'villa',
    coords: { x: 35, y: 50 }
  },
  {
    id: 'marina',
    badge: 'Náutica & Club',
    title: 'Marina & Yacht Club',
    desc: '5 minutos de navegación privada. Amarres de cortesía para mega yates de hasta 65 metros.',
    travelTime: '5 min en barco / 7 min en automóvil',
    icon: 'sailing',
    coords: { x: 60, y: 32 }
  },
  {
    id: 'airport',
    badge: 'Aviación Privada',
    title: 'Aeropuerto Internacional Ejecutivo',
    desc: 'A 18 minutos en chófer privado o 4 minutos en enlace directo con helipuerto Ohana.',
    travelTime: '18 min por autopista privada / 4 min vía aérea',
    icon: 'connecting_airports',
    coords: { x: 80, y: 70 }
  }
];

export const ARCHITECTURAL_PILLARS = [
  {
    icon: 'panorama',
    title: 'Vistas directas de 180° al océano y atardeceres privados',
    detail: 'Orientación suroeste que garantiza luz natural óptima y puestas de sol completas en todas las unidades.'
  },
  {
    icon: 'architecture',
    title: 'Materiales nobles, maderas nativas y mármol travertino',
    detail: 'Selección de piedra caliza extraída de canteras locales, maderas con certificación FSC y acabados biofílicos.'
  },
  {
    icon: 'shield_with_heart',
    title: 'Privacidad acústica absoluta, domótica integral y biometría',
    detail: 'Aislamiento multicapa de 62 dB, control integral de temperatura y cerrajería biométrica sin llave.'
  }
];

export const STATS = [
  {
    value: '24',
    title: 'Residencias',
    subtitle: 'Colección ultralimitada'
  },
  {
    value: '100%',
    title: 'Vistas al Mar',
    subtitle: 'Orientación frontal pura'
  },
  {
    value: '350-680',
    title: 'm² Privados',
    subtitle: 'Plantas flexibles de autor'
  },
  {
    value: '1.2 km',
    title: 'Playa Virgen',
    subtitle: 'Acceso directo y exclusivo'
  }
];

export const CALCULATOR_RESIDENCES = [
  {
    id: 'garden-villa',
    name: 'Garden Villa Alborada',
    categoryLabel: 'Garden Villas',
    priceUSD: 1850000,
    deliveryMonths: 24,
  },
  {
    id: 'oceanfront-suite',
    name: 'Oceanfront Coral Residence',
    categoryLabel: 'Oceanfront Suites',
    priceUSD: 2400000,
    deliveryMonths: 24,
  },
  {
    id: 'sky-penthouse',
    name: 'Sky Penthouse Mirador',
    categoryLabel: 'Sky Penthouses',
    priceUSD: 3950000,
    deliveryMonths: 24,
  },
  {
    id: 'cliffside-estate',
    name: 'Cliffside Signature Estate',
    categoryLabel: 'Signature Estates',
    priceUSD: 5200000,
    deliveryMonths: 28,
  },
];

