export interface BackendResidence {
  id: string;
  name: string;
  category: 'garden' | 'ocean' | 'penthouse' | 'estate';
  categoryLabel: string;
  badge: string;
  dimensions: string;
  suites: string;
  bathrooms: string;
  feature: string;
  featureLabel: string;
  price: string;
  priceUSD: number;
  deliveryMonths: number;
  image: string;
  imageAlt: string;
  coveredArea: string;
  terraceArea: string;
  level: string;
  orientation: string;
  parking: string;
  storage: string;
  description: string;
  highlights: string[];
  blueprintImg: string;
}

export interface BackendAmenity {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  actionLabel: string;
  extendedDescription: string;
  hours: string;
  serviceType: string;
  image: string;
}

export interface BackendLocationPoint {
  id: string;
  badge: string;
  title: string;
  desc: string;
  travelTime: string;
  icon: string;
  coords: { x: number; y: number };
}

export interface BackendStat {
  value: string;
  title: string;
  subtitle: string;
}

export interface StoredInquiry {
  id: string;
  confirmationCode: string;
  name: string;
  email: string;
  phone: string;
  typology: string;
  message?: string;
  privacyAccepted: boolean;
  receivedAt: string;
}

// Catálogo de Residencias en Español
export const RESIDENCES_ES: BackendResidence[] = [
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
    priceUSD: 1850000,
    deliveryMonths: 24,
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
    priceUSD: 2400000,
    deliveryMonths: 24,
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
    priceUSD: 3950000,
    deliveryMonths: 24,
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
    priceUSD: 5200000,
    deliveryMonths: 28,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048',
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
    blueprintImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  }
];

// Catálogo de Residencias en Inglés
export const RESIDENCES_EN: BackendResidence[] = RESIDENCES_ES.map((res) => {
  if (res.id === 'garden-villa') {
    return {
      ...res,
      badge: 'Private Ground Floor',
      dimensions: '350 m² Interior · 120 m² Private Garden',
      featureLabel: 'Pool',
      price: 'Starting from $1.85M USD',
      level: 'Ground Floor',
      orientation: 'Southwest (Direct Sunset Views)',
      parking: '2 Enclosed spaces with Wallbox EV fast-charger',
      storage: 'Private wine cellar + Nautical gear locker',
      description: 'Conceived to blend the quiet tranquility of a private botanical oasis with immediate adjacency to the pristine shoreline.',
      highlights: [
        'Heated private plunge pool with saltwater chlorination system',
        'Italian Poliform kitchen with Fior di Bosco marble countertops',
        'Double master suites featuring walnut walk-in dressing rooms',
        'Direct and discreet access to the private beach pathway'
      ],
    };
  }
  if (res.id === 'oceanfront-suite') {
    return {
      ...res,
      badge: 'Panoramic Ocean Views',
      dimensions: '440 m² Total · Level 3',
      featureLabel: 'Jacuzzi',
      price: 'Starting from $2.40M USD',
      level: 'Level 3 (Optimal Mid Elevation)',
      orientation: 'Direct West 180°',
      parking: '3 Temperature-controlled basement parking spaces',
      storage: 'Climate-controlled wine cellar for 400 bottles',
      description: 'An unrivaled front-row perspective directly over breaking waves. This mid-level residence offers a 28-meter continuous cantilevered terrace with built-in volcanic stone thermal jacuzzi.',
      highlights: [
        'Perimeter cantilevered terrace with ultra-clear tempered glass railings',
        'Master bath featuring freestanding travertine marble tub overlooking the ocean',
        'Self-contained guest suite with auxiliary service entrance',
        'Lutron HomeWorks smart home automation with circadian lighting scenes'
      ],
    };
  }
  if (res.id === 'sky-penthouse') {
    return {
      ...res,
      badge: 'Private Rooftop Crown',
      dimensions: '680 m² Duplex · Panoramic Skydeck',
      featureLabel: 'Infinity Pool',
      price: 'Starting from $3.95M USD',
      level: 'Levels 5 & 6 (Penthouse Duplex)',
      orientation: '360° Panoramic (Ocean, Bay, and Mountain Range)',
      parking: '4 Enclosed parking bays with private lock-up box',
      storage: 'Security armory, walk-in wine cellar, and technical storage',
      description: 'The crowning jewel of Ohana Beach House. A monumental duplex served by direct biometric elevator access, topped with a 200 m² skydeck and 14-meter cantilevered glass-bottom infinity pool.',
      highlights: [
        'Private 14-meter rooftop infinity pool with transparent glass edge',
        'Private keycard elevator opening directly into the entry foyer',
        'Motorized bioclimatic pergola with Gaggenau outdoor chef kitchen',
        'Double-height ceiling (6.8 m) living pavilion with linear vapor fireplace'
      ],
    };
  }
  return {
    ...res,
    badge: 'Limited Signature Edition',
    dimensions: '820 m² Plot · 540 m² Built Area',
    featureLabel: 'Cantilever Pool',
    price: 'Starting from $5.20M USD',
    level: 'Detached Cliffside Villa',
    orientation: 'Southwest (Endless Ocean Sunsets)',
    parking: '4 Enclosed underground spaces with hydraulic vehicle elevator',
    storage: 'Security safe-room, 600-bottle private cellar, and water-sports bay',
    description: 'The pinnacle expression of architectural mastery at Ohana. This fully detached private villa perches upon the most exclusive cliff crest with a daring cantilevered pool suspended over the surf.',
    highlights: [
      'Dramatic 18-meter cantilevered structural pool floating over the open sea',
      '110 m² master suite pavilion with bioethanol hearth and zen terrace',
      'Private fitness retreat with dry cedar sauna, steam bath, and cryotherapy chamber',
      'Private glass funicular elevator connecting all residential floors to the shoreline'
    ],
  };
});

// Catálogo de Amenidades (Español)
export const AMENITIES_DATA: BackendAmenity[] = [
  {
    id: 'infinity-pool',
    category: 'Bienestar & Agua',
    title: 'Piscina Infinity Oceánica',
    description: '60 metros lineales de horizonte de agua salada fusionado con el mar abierto.',
    iconName: 'pool',
    actionLabel: 'Acceso Exclusivo',
    extendedDescription: 'Diseñada como un espejo de agua mineralizada que se confunde visualmente con la línea del horizonte del Pacífico. Incluye servicio de mayordomía de toallas y bar náutico.',
    hours: '07:00 - 22:00',
    serviceType: 'Mayordomía & Bar Náutico',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAivozrdrussQ78Hkd5PM0jyo4SpqtklEP_90rYGqIw4Ohc3E4G3c7jpES9V5-0NiNT7SzKEPIZv5NrWsXj0NhZbXv5KsnCCytVKdY9cwQhYM8TL_EB__SNX5bVQ7dCunsgLMplZ3r_5j5B9fbxbIsimknccUqHEnsMHUm3InhbXT-Ovw0g_VemWR3pnNegB85EqJle90R8WuTb-IqzA7Zt2tj-pJeD68AUctB5wZm_Gr1uynbv85ZI=s2048'
  },
  {
    id: 'wellness-spa',
    category: 'Salud Holística',
    title: 'Spa Termal & Crioterapia',
    description: 'Circuitos hidrotermales, sauna de cedro finlandés y cabinas privadas de masaje.',
    iconName: 'spa',
    actionLabel: 'Tratamientos Privados',
    extendedDescription: 'Templo subterráneo de regeneración celular esculpido en piedra volcánica. Sala de haloterapia con sal del Himalaya y masajistas certificados a demanda.',
    hours: '08:00 - 21:00',
    serviceType: 'Terapeutas bajo reserva privada',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  },
  {
    id: 'beach-club',
    category: 'Club Náutico',
    title: 'Embarcadero & Beach Club',
    description: 'Mayordomía en arena, gastronomía de autor y embarcadero privado para veleros.',
    iconName: 'beach_access',
    actionLabel: 'Solo Propietarios',
    extendedDescription: 'Acceso directo a 280 metros lineales de playa virgen. Dispone de motos acuáticas, yate privado de 52 pies y equipo de buceo autónomo.',
    hours: '09:00 - Puesta de sol',
    serviceType: 'Deportes acuáticos & Concierge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRPKAtDts0UsxX8QmXS5x8fZr5_UE2AcLl_h-AKZwA9YZsVortHR3vt6hXesjG79dlOQuVnSc_jNMH7FZw5K9m2JXq_VLtLhdvoVfdKvqH0fY58L-NrSRLQoXWChvOKkUdeqWQTaa36r3mdQ00JkYMt13qzlUMdjMW21o57zaE3E36ntR-nod6kZrmXUxHnUU71z5Kecz45Ts2JybpKHzCFLsTvlU5f69KW5fqkbRqTRy980Dy0aU=s2048'
  },
  {
    id: 'wine-lounge',
    category: 'Alta Gastronomía',
    title: 'Cava Subterránea & Cigar Lounge',
    description: 'Cava climatizada con más de 2,500 etiquetas internacionales y sumiller privado.',
    iconName: 'wine_bar',
    actionLabel: 'Cavas Personales',
    extendedDescription: 'Espacio de tertulia con control riguroso de humedad (70%) y temperatura (14°C). Casilleros individuales de roble francés para cada propietario.',
    hours: '24 Horas con llave biométrica',
    serviceType: 'Degustaciones privadas mensuales',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  }
];

// Catálogo de Amenidades (English)
export const AMENITIES_EN: BackendAmenity[] = [
  {
    id: 'infinity-pool',
    category: 'Wellness & Water',
    title: 'Oceanic Infinity Pool',
    description: '60 linear meters of saltwater horizon seamlessly merging with the open sea.',
    iconName: 'pool',
    actionLabel: 'Exclusive Access',
    extendedDescription: 'Engineered as a mineralized mirror of water visually melding into the Pacific horizon. Includes dedicated towel butler service and private nautical cocktail bar.',
    hours: '07:00 - 22:00',
    serviceType: 'Butler Service & Nautical Bar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAivozrdrussQ78Hkd5PM0jyo4SpqtklEP_90rYGqIw4Ohc3E4G3c7jpES9V5-0NiNT7SzKEPIZv5NrWsXj0NhZbXv5KsnCCytVKdY9cwQhYM8TL_EB__SNX5bVQ7dCunsgLMplZ3r_5j5B9fbxbIsimknccUqHEnsMHUm3InhbXT-Ovw0g_VemWR3pnNegB85EqJle90R8WuTb-IqzA7Zt2tj-pJeD68AUctB5wZm_Gr1uynbv85ZI=s2048'
  },
  {
    id: 'wellness-spa',
    category: 'Holistic Health',
    title: 'Thermal Spa & Cryotherapy',
    description: 'Hydrothermal circuits, Finnish cedarwood sauna, and private massage suites.',
    iconName: 'spa',
    actionLabel: 'Private Treatments',
    extendedDescription: 'Subterranean sanctuary of cellular regeneration carved from volcanic stone. Himalayan salt halotherapy room and on-demand certified holistic therapists.',
    hours: '08:00 - 21:00',
    serviceType: 'Private On-Demand Therapists',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  },
  {
    id: 'beach-club',
    category: 'Yacht & Beach Club',
    title: 'Private Pier & Beach Club',
    description: 'Sand butler service, signature coastal dining, and private marina dock for yachts.',
    iconName: 'beach_access',
    actionLabel: 'Owners Only',
    extendedDescription: 'Direct access to 280 linear meters of untouched beachfront. Features jet skis, a 52-foot private club yacht, and premium autonomous diving equipment.',
    hours: '09:00 - Sunset',
    serviceType: 'Water Sports & Dedicated Concierge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrRPKAtDts0UsxX8QmXS5x8fZr5_UE2AcLl_h-AKZwA9YZsVortHR3vt6hXesjG79dlOQuVnSc_jNMH7FZw5K9m2JXq_VLtLhdvoVfdKvqH0fY58L-NrSRLQoXWChvOKkUdeqWQTaa36r3mdQ00JkYMt13qzlUMdjMW21o57zaE3E36ntR-nod6kZrmXUxHnUU71z5Kecz45Ts2JybpKHzCFLsTvlU5f69KW5fqkbRqTRy980Dy0aU=s2048'
  },
  {
    id: 'wine-lounge',
    category: 'Haute Gastronomy',
    title: 'Subterranean Cellar & Cigar Lounge',
    description: 'Climate-controlled cellar with 2,500+ international labels and private master sommelier.',
    iconName: 'wine_bar',
    actionLabel: 'Personal Lockers',
    extendedDescription: 'Intimate conversation salon featuring precise humidity (70%) and temperature (14°C) control. Individual French oak wine vaults for each residence owner.',
    hours: '24/7 with Biometric Key',
    serviceType: 'Monthly Sommelier Tastings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpVH-l8Bv-MT5dHqTDEPNgXiTjmqtIFExrdXfEldqAwRRgJxe8C4cNAceFtvYKX8_0Esf62o4oYOkBKgLizeGIEdubU_Qizvz6i_tJgXDyezvnTy2v4XonQTbhaY8CJrGh3DXNnT2sv5s9mkDOs24VWs6HsLni2TyxzDElBnnc_OVesmFFw1S4BAbY2hzSGy0emE8Zl1f7--SEAknF0SzxKa9QS0IjTq-9aS6jBKaIn08dJYBrpzUm=s2048'
  }
];

// Puntos Geográficos del Mapa (Español)
export const LOCATION_POINTS_DATA: BackendLocationPoint[] = [
  {
    id: 'ohana',
    badge: 'Epicentro Costero',
    title: 'Ohana Beach House',
    desc: '18 Residencias exclusivas en primera línea de acantilado con cala privada y muelle protegido.',
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

// Puntos Geográficos del Mapa (English)
export const LOCATION_POINTS_EN: BackendLocationPoint[] = [
  {
    id: 'ohana',
    badge: 'Coastal Epicenter',
    title: 'Ohana Beach House',
    desc: '18 exclusive oceanfront residences on prime cliff crest with private cove and protected dock.',
    travelTime: '0 min (Core Location)',
    icon: 'villa',
    coords: { x: 35, y: 50 }
  },
  {
    id: 'marina',
    badge: 'Yacht & Marina',
    title: 'Marina & Yacht Club',
    desc: '5 minutes of private sailing. Courtesy moorings for mega yachts up to 65 meters.',
    travelTime: '5 min by boat / 7 min by car',
    icon: 'sailing',
    coords: { x: 60, y: 32 }
  },
  {
    id: 'airport',
    badge: 'Private Aviation',
    title: 'Executive International Airport',
    desc: '18 minutes via private chauffeur highway or 4 minutes via direct Ohana helipad transfer.',
    travelTime: '18 min private road / 4 min direct air',
    icon: 'connecting_airports',
    coords: { x: 80, y: 70 }
  }
];

// Estadísticas del Proyecto (Español)
export const STATS_DATA: BackendStat[] = [
  { value: '18', title: 'Residencias Privadas', subtitle: 'Baja densidad absoluta y máxima privacidad' },
  { value: '280m', title: 'Frente al Océano', subtitle: 'Acceso directo a playa virgen protegida' },
  { value: '4.5 Ha', title: 'Reserva Natural Privada', subtitle: 'Jardines botánicos autóctonos' },
  { value: '100%', title: 'Vistas Panorámicas', subtitle: 'Orientación frontal a la puesta de sol' },
];

// Estadísticas del Proyecto (English)
export const STATS_EN: BackendStat[] = [
  { value: '18', title: 'Private Residences', subtitle: 'Ultra-low density and absolute privacy' },
  { value: '280m', title: 'Ocean Frontage', subtitle: 'Direct access to pristine protected beach' },
  { value: '4.5 Ha', title: 'Private Nature Reserve', subtitle: 'Native botanical cliffside gardens' },
  { value: '100%', title: 'Panoramic Views', subtitle: 'Direct westward frontal sunset orientation' },
];

// Almacenamiento en memoria para Prospectos / Citas (Inquiries)
export const INQUIRIES_STORE: StoredInquiry[] = [];

