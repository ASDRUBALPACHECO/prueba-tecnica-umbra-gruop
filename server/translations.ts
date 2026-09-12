export interface SiteContent {
  meta: {
    lang: 'es' | 'en';
    siteTitle: string;
    description: string;
  };
  header: {
    brandName: string;
    navLinks: {
      proyecto: string;
      maqueta3D: string;
      cifras: string;
      amenidades: string;
      tipologias: string;
      experiencia: string;
      ubicacion: string;
      contacto: string;
    };
    ctaPrivateTour: string;
    themeDaylight: string;
    themeSunset: string;
    oceanAudioOn: string;
    oceanAudioOff: string;
    drawerEyebrow: string;
    drawerFooterSubtitle: string;
    concierge: {
      eyebrow: string;
      title: string;
      description: string;
      directPhone: string;
      privateEmail: string;
      protocol: string;
      protocolDesc: string;
      requestMeeting: string;
    };
  };
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlinePart2: string;
    headlinePart3: string;
    tagline: string;
    discoverResidences: string;
    virtualTour360: string;
    locationBadge: string;
    oceanfrontBadge: string;
    explore: string;
  };
  concepto: {
    eyebrow: string;
    title: string;
    quote: string;
    quoteAuthor: string;
    description1: string;
    description2: string;
    materialsTitle: string;
    materialsBadge: string;
    pillars: Array<{
      icon: string;
      title: string;
      detail: string;
    }>;
    awardBadge: {
      category: string;
      link: string;
      title: string;
    };
    awardModal: {
      eyebrow: string;
      title: string;
      description: string;
      categoryLabel: string;
      categoryVal: string;
      materialsLabel: string;
      materialsVal: string;
      closeBtn: string;
    };
    stats: {
      solarProtection: string;
      solarDesc: string;
      naturalVentilation: string;
      ventilationDesc: string;
      energyEfficiency: string;
      energyDesc: string;
    };
  };
  model3d: {
    eyebrow: string;
    title: string;
    description: string;
    instructionNotice: string;
    autoRotate: string;
    pauseRotate: string;
    resetView: string;
    viewCatalogBtn: string;
    loading: string;
    badge: string;
    lightingGolden: string;
    lightingTwilight: string;
    modeStudio: string;
    modeBlueprint: string;
    gestureTip: string;
    residences: Record<string, {
      label: string;
      name: string;
      badge: string;
      dimensions: string;
      price: string;
      features: string[];
    }>;
  };
  cifras: {
    eyebrow: string;
    title: string;
    stats: Array<{
      value: string;
      title: string;
      subtitle: string;
    }>;
  };
  amenidades: {
    eyebrow: string;
    title: string;
    schedule: string;
    service: string;
    understood: string;
    ultraHdTitle: string;
    lightboxVerified: string;
    items: Array<{
      category: string;
      title: string;
      description: string;
    }>;
  };
  tipologias: {
    eyebrow: string;
    title: string;
    filters: {
      all: string;
      garden: string;
      ocean: string;
      penthouse: string;
      estate: string;
    };
    ctaView3D: string;
    ctaDossier: string;
    startingFrom: string;
    suites: string;
    baths: string;
    investment: string;
  };
  dossier: {
    tabs: {
      specs: string;
      blueprint: string;
      finishes: string;
    };
    specs: {
      coveredArea: string;
      terraceArea: string;
      level: string;
      orientation: string;
      parking: string;
      storage: string;
      highlightsTitle: string;
      estimatedInvestment: string;
    };
    blueprint: {
      spatialTitle: string;
      spatialDesc: string;
      projectLabel: string;
      levelLabel: string;
      refLabel: string;
      socialZone: string;
      socialDesc: string;
      masterSuite: string;
      masterDesc: string;
      guestSuites: string;
      guestDesc: string;
      footerLabel: string;
    };
    finishes: Array<{
      label: string;
      desc: string;
    }>;
    actions: {
      downloadPdf: string;
      generatingPdf: string;
      downloadSuccess: string;
      scheduleVisit: string;
      ultraHd: string;
      ultraHdTitle: string;
      closeDialog: string;
      lightboxVerified: string;
    };
  };
  calculadora: {
    eyebrow: string;
    title: string;
    subtitle: string;
    downPaymentLabel: string;
    constructionTermLabel: string;
    appreciationLabel: string;
    occupancyLabel: string;
    monthsLabel: string;
    monthsTick: string;
    daysLabel: string;
    perMonth: string;
    perYear: string;
    annualYieldLabel: string;
    residenceSelectedLabel: string;
    contractValueLabel: string;
    milestonesTitle: string;
    downPaymentMilestone: string;
    constructionMilestone: string;
    constructionNote: string;
    closingMilestone: string;
    returnsTitle: string;
    gainLabel: string;
    projectedValueLabel: string;
    rentalLabel: string;
    capRateLabel: string;
    ctaButton: string;
    disclaimer: string;
  };
  experiencia: {
    eyebrow: string;
    headline: string;
    description: string;
    ctaButton: string;
  };
  ubicacion: {
    eyebrow: string;
    title: string;
    description: string;
    radarActive: string;
    travelTime: string;
    ctaRoute: string;
    transitTimeLabel: string;
  };
  contacto: {
    eyebrow: string;
    title: string;
    description: string;
    fullNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    typologyLabel: string;
    messageLabel: string;
    privacyLabel: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    successEyebrow: string;
    successCardTitle: string;
    receiptFolio: string;
    receiptClient: string;
    receiptInterest: string;
    receiptReset: string;
  };
  footer: {
    tagline: string;
    exploreTitle: string;
    contactTitle: string;
    scrollTop: string;
    rightsReserved: string;
    leedBadge: string;
    investorCare: string;
    address: string;
    copyright: string;
    backToTop: string;
  };
}

export const SPANISH_CONTENT: SiteContent = {
  meta: {
    lang: 'es',
    siteTitle: 'Ohana Beach House | Residencias Privadas de Ultra-Lujo',
    description: 'Colección residencial exclusiva de villas y penthouses frente al océano. Arquitectura bioclimática, caliza natural y privacidad absoluta.',
  },
  header: {
    brandName: 'OHANA',
    navLinks: {
      proyecto: 'El Proyecto',
      maqueta3D: 'Maqueta 3D',
      cifras: 'Cifras',
      amenidades: 'Amenidades',
      tipologias: 'Tipologías',
      experiencia: 'Experiencia',
      ubicacion: 'Ubicación',
      contacto: 'Contacto',
    },
    ctaPrivateTour: 'Cita Privada',
    themeDaylight: 'Día Soleado',
    themeSunset: 'Modo Atardecer',
    oceanAudioOn: 'Audio Océano',
    oceanAudioOff: 'Silenciar',
    drawerEyebrow: 'Colección Residencial',
    drawerFooterSubtitle: 'Residencias Privadas & Vida Costera',
    concierge: {
      eyebrow: 'Oficina Privada de Inversiones',
      title: 'Atención Directa & Confidencial',
      description: 'Ohana Beach House gestiona cada consulta bajo estrictos acuerdos de no divulgación. Nuestro equipo de directores patrimoniales está disponible para consultas personalizadas.',
      directPhone: 'Línea Telefónica Directa',
      privateEmail: 'Email Privado',
      protocol: 'Protocolo',
      protocolDesc: 'Asignación de asesor senior en menos de 2 horas',
      requestMeeting: 'Solicitar Reunión Privada',
    },
  },
  hero: {
    eyebrow: 'COLECCIÓN RESIDENCIAL DE ULTRA-LUJO',
    headlinePart1: 'Donde el océano',
    headlinePart2: 'abraza la serenidad',
    headlinePart3: 'arquitectónica.',
    tagline: '18 residencias exclusivas suspendidas sobre aguas turquesas vírgenes. Un refugio biofílico donde la piedra caliza y el horizonte funden su grandeza.',
    discoverResidences: 'Explorar Residencias',
    virtualTour360: 'Tour Virtual 360°',
    locationBadge: 'Costa del Sol Privada',
    oceanfrontBadge: 'Frente al Océano Directo',
    explore: 'Explorar',
  },
  concepto: {
    eyebrow: 'MANIFIESTO ARQUITECTÓNICO',
    title: 'Geometría biofílica en armonía orgánica con la marea',
    quote: 'Diseñamos cada residencia no para contemplar el mar desde la distancia, sino para vivir inmersos en su ritmo natural.',
    quoteAuthor: 'Estudio de Arquitectura Bioclimática Ohana',
    description1: 'Inspiradas en las formaciones rocosas litorales esculpidas por el oleaje durante siglos, las residencias de Ohana Beach House integran muros monolíticos de caliza extraída localmente, pérgolas de madera teca sostenible y celosías cinéticas brise-soleil.',
    description2: 'El diseño arquitectónico optimiza las corrientes eólicas marinas reduciendo el consumo energético en un 42%, con terrazas voladizas continuas que filtran la radiación solar directa conservando luz natural cenital permanente.',
    materialsTitle: 'Materiales Nobles y Sostenibilidad Costera',
    materialsBadge: 'Certificación de Lujo Sostenible',
    pillars: [
      {
        icon: 'light_mode',
        title: 'Luz Cenital',
        detail: 'Ventanales corridos de 3.4m y atrios abiertos que capturan luz natural filtrada.'
      },
      {
        icon: 'foundation',
        title: 'Travertino Romano',
        detail: 'Piedra natural local y maderas de teca tratadas con acabados minerales puros.'
      },
      {
        icon: 'air',
        title: 'Ventilación Cruzada',
        detail: 'Diseño pasivo aerodinámico orientado para capturar la brisa marina continua.'
      },
      {
        icon: 'water_drop',
        title: 'Geotermia Marina',
        detail: 'Eficiencia energética de vanguardia con huella de carbono neutral.'
      }
    ],
    awardBadge: {
      category: 'Galardón Internacional',
      link: 'Ver Certificación',
      title: 'Mejor Proyecto Residencial Costero 2025'
    },
    awardModal: {
      eyebrow: 'Jurado Arquitectónico Internacional',
      title: 'World Architecture & Coastal Estate Award 2025',
      description: 'Otorgado por el comité de diseño biofílico y sostenibilidad de Ginebra en reconocimiento a la integración geológica de Ohana Beach House, su eficiencia energética pasiva y el uso exclusivo de canteras de caliza recuperadas.',
      categoryLabel: 'Categoría:',
      categoryVal: 'Obra Maestra Sostenible de Ultra-Lujo',
      materialsLabel: 'Materiales:',
      materialsVal: 'Piedra caliza crema, cedro termotratado y acristalamiento solar triple',
      closeBtn: 'Entendido'
    },
    stats: {
      solarProtection: '85%',
      solarDesc: 'de protección térmica pasiva',
      naturalVentilation: '100%',
      ventilationDesc: 'flujo de ventilación cruzada',
      energyEfficiency: '-42%',
      energyDesc: 'huella hídrica y energética',
    },
  },
  model3d: {
    eyebrow: 'INTERACTIVO EN TIEMPO REAL',
    title: 'Modelado 3D de las Residencias',
    description: 'Explora la maqueta arquitectónica tridimensional generada con WebGL. Selecciona cada tipología para orbitar, inspeccionar detalles estructurales y contemplar la iluminación crepuscular.',
    instructionNotice: 'Usa el cursor para rotar 360° o la rueda del ratón para acercar/alejar la perspectiva.',
    autoRotate: 'Giro Automático',
    pauseRotate: 'Pausar Giro',
    resetView: 'Restablecer Ángulo',
    viewCatalogBtn: 'Consultar Ficha Técnica',
    loading: 'Cargando geometría arquitectónica...',
    badge: 'PBR 3D · RESIDENCIA ACTIVA',
    lightingGolden: 'Golden Hour',
    lightingTwilight: 'Crepúsculo',
    modeStudio: 'Estudio PBR',
    modeBlueprint: 'Blueprint CAD',
    gestureTip: 'Arrastra para orbitar 360° · Rueda para zoom · Clic en los botones inferiores para cambiar de residencia',
    residences: {
      overview: {
        label: 'Complejo General',
        name: 'Masterplan Complejo Ohana',
        badge: 'Vista de Conjunto',
        dimensions: '18 Residencias Exclusivas · 4.5 Hectáreas',
        price: 'Desde $1.85M hasta $5.20M USD',
        features: [
          'Masterplan completo escalonado de 6 niveles frente al mar',
          'Acceso privado directo a 280 metros lineales de playa virgen',
          'Club privado, solárium central y paisajismo biofílico perimetral'
        ]
      },
      garden: {
        label: 'Garden Villa',
        name: 'Garden Villa Alborada',
        badge: 'Planta Baja Privada',
        dimensions: '350 m² Interiores · 120 m² Jardín',
        price: 'Desde $1.85M USD',
        features: [
          'Jardín botánico privado con palmeras autóctonas y solárium de teca',
          'Piscina plunge balinesa climatizada con cascada de recirculación',
          'Ventanales corredizos retráctiles y acceso directo a la arena'
        ]
      },
      ocean: {
        label: 'Oceanfront Suite',
        name: 'Oceanfront Coral Residence',
        badge: 'Nivel 3 Panorámico',
        dimensions: '360 m² Cubiertos · 80 m² Terraza Volada',
        price: 'Desde $2.40M USD',
        features: [
          'Terraza perimetral voladiza continua de 28 metros lineales',
          'Jacuzzi termal exterior de piedra volcánica integrado en esquina',
          'Celosías móviles brise-soleil en champagne y vidrio ultraclaro'
        ]
      },
      penthouse: {
        label: 'Sky Penthouse',
        name: 'Sky Penthouse Mirador',
        badge: 'Rooftop Dúplex Corona',
        dimensions: '480 m² Cubiertos · 200 m² Solárium',
        price: 'Desde $3.95M USD',
        features: [
          'Piscina infinity flotante en cubierta de 14 metros con borde de cristal',
          'Dúplex a doble altura (6.8 m) con pérgola bioclimática y comedor exterior',
          'Solárium panorámico 360° con vistas al océano y a la bahía'
        ]
      },
      estate: {
        label: 'Cliffside Estate',
        name: 'Cliffside Signature Estate',
        badge: 'Villa en Acantilado',
        dimensions: '540 m² Construidos · 280 m² Terraza Acantilado',
        price: 'Desde $5.20M USD',
        features: [
          'Villa independiente unifamiliar anclada sobre acantilado rocoso escarpado',
          'Piscina en voladizo estructural de 18 metros suspendida hacia el mar abierto',
          'Terraza zen privada con brasero central de bioetanol y lounge exterior'
        ]
      }
    }
  },
  cifras: {
    eyebrow: 'DIMENSIONES Y ESCALA',
    title: 'Magnitud espacial construida con precisión artesanal',
    stats: [
      { value: '18', title: 'Residencias Privadas', subtitle: 'Baja densidad absoluta y máxima privacidad' },
      { value: '280m', title: 'Frente al Océano', subtitle: 'Acceso directo a playa virgen protegida' },
      { value: '4.5 Ha', title: 'Reserva Natural Privada', subtitle: 'Jardines botánicos autóctonos' },
      { value: '100%', title: 'Vistas Panorámicas', subtitle: 'Orientación frontal a la puesta de sol' },
    ],
  },
  amenidades: {
    eyebrow: 'CLUB PRIVADO & HOSPITALIDAD',
    title: 'Servicios de clase mundial diseñados para el bienestar',
    schedule: 'Horario Exclusivo',
    service: 'Modalidad de Servicio',
    understood: 'Entendido',
    ultraHdTitle: 'Ampliar fotografía en Ultra-HD',
    lightboxVerified: 'Fotografía Arquitectónica 2048px Alta Definición',
    items: [
      { category: 'BIENESTAR Y AGUA', title: 'Piscina Infinity Oceánica', description: '60 metros lineales de horizonte de agua salada fusionado con el mar abierto.' },
      { category: 'SALUD HOLÍSTICA', title: 'Spa Termal y Crioterapia', description: 'Circuitos hidrotermales, sauna de cedro finlandés y cabinas privadas de masaje.' },
      { category: 'CONSERJERÍA PRIVADA', title: 'Club Náutico y Embarcadero', description: 'Yate privado de 52 pies exclusivo para propietarios y actividades de snorkel.' },
      { category: 'ALTA GASTRONOMÍA', title: 'Cava Privada & Chef Sommelier', description: 'Salón de degustación subterráneo con capacidad climatizada para 2,500 botellas.' },
    ],
  },
  tipologias: {
    eyebrow: 'COLECCIÓN EXCLUSIVA',
    title: 'Residencias Signature frente al Océano',
    filters: {
      all: 'Todas las Tipologías',
      garden: 'Garden Villas',
      ocean: 'Oceanfront Suites',
      penthouse: 'Sky Penthouses',
      estate: 'Signature Estates',
    },
    ctaView3D: 'Ver en 3D',
    ctaDossier: 'Dossier',
    startingFrom: 'Desde',
    suites: 'Suites',
    baths: 'Baños',
    investment: 'Inversión',
  },
  dossier: {
    tabs: {
      specs: 'Ficha Técnica',
      blueprint: 'Distribución & Plano',
      finishes: 'Memoria de Calidades',
    },
    specs: {
      coveredArea: 'Área Cubierta',
      terraceArea: 'Terrazas & Exterior',
      level: 'Nivel / Altura',
      orientation: 'Orientación',
      parking: 'Aparcamiento',
      storage: 'Almacenaje',
      highlightsTitle: 'Puntos Destacados de Arquitectura',
      estimatedInvestment: 'Inversión Estimada',
    },
    blueprint: {
      spatialTitle: 'Esquema Espacial Arquitectónico',
      spatialDesc: 'Plano acotado de distribución de estancias y circulaciones interiores.',
      projectLabel: 'PROYECTO: OHANA BEACH HOUSE',
      levelLabel: 'NIVEL:',
      refLabel: 'REF:',
      socialZone: 'ZONA SOCIAL',
      socialDesc: 'Salón + Comedor + Cocina',
      masterSuite: 'MASTER SUITE',
      masterDesc: 'Vestidor + Baño Doble',
      guestSuites: 'SUITES SECUNDARIAS',
      guestDesc: 'Dormitorios en suite',
      footerLabel: 'TERRAZA FRONTAL AL OCÉANO & PISCINA INTEGRADA',
    },
    finishes: [
      { label: 'Piedra y Pavimentos', desc: 'Mármol travertino romano mate de gran formato y piedra balinesa antideslizante.' },
      { label: 'Ebanistería y Carpintería', desc: 'Puertas de paso de suelo a techo en madera de nogal macizo y frentes lacados.' },
      { label: 'Cocina & Electrodomésticos', desc: 'Equipamiento integral Gaggenau Serie 400 con encimeras de cuarcita Taj Mahal.' },
      { label: 'Baños y Grifería', desc: 'Griferías Dornbracht en acabado champagne pulido y bañeras exentas de resina sólida.' },
      { label: 'Domótica y Confort', desc: 'Sistema Lutron HomeWorks, climatización geotérmica radiante y audio invisible Sonance.' },
    ],
    actions: {
      downloadPdf: 'Descargar Dossier PDF',
      generatingPdf: 'Generando PDF...',
      downloadSuccess: 'Dossier Descargado ✓',
      scheduleVisit: 'Solicitar Visita para esta Residencia',
      ultraHd: 'Ultra-HD',
      ultraHdTitle: 'Ampliar render arquitectónico en Ultra-HD',
      closeDialog: 'Cerrar dossier',
      lightboxVerified: 'Render Arquitectónico 2048px Alta Definición',
    },
  },
  calculadora: {
    eyebrow: 'ESTRUCTURA PATRIMONIAL & RENDIMIENTOS',
    title: 'Simulador Financiero y Proyección ROI',
    subtitle: 'Configura tu plan de pagos durante la fase constructiva y proyecta la plusvalía estimada y rentas vacacionales gestionadas por Ohana Private Club.',
    downPaymentLabel: 'Enganche Inicial a la Firma',
    constructionTermLabel: 'Plazo Durante Construcción',
    appreciationLabel: 'Plusvalía Anual Estimada',
    occupancyLabel: 'Ocupación en Club de Rentas',
    monthsLabel: 'Meses sin intereses',
    monthsTick: 'Meses',
    daysLabel: 'días',
    perMonth: '/ mes',
    perYear: '/ año',
    annualYieldLabel: 'Anual',
    residenceSelectedLabel: 'RESIDENCIA SELECCIONADA',
    contractValueLabel: 'VALOR CONTRACTUAL',
    milestonesTitle: 'Hitos del Plan de Adquisición',
    downPaymentMilestone: '1. Enganche Inicial',
    constructionMilestone: '2. Cuota Mensual de Obra',
    constructionNote: 'Sin intereses bancarios directos',
    closingMilestone: '3. Liquidación a la Entrega (15%)',
    returnsTitle: 'Retorno Patrimonial Estimado',
    gainLabel: 'Plusvalía Proyectada a 5 Años',
    projectedValueLabel: 'Valor proyectado',
    rentalLabel: 'Renta Neta Estimada (Club)',
    capRateLabel: 'Cap Rate estimado',
    ctaButton: 'Solicitar Plan Financiero Personalizado',
    disclaimer: 'Cálculos con fines informativos y de proyección patrimonial. Condiciones definitivas sujetas a contrato de compraventa y programa de administración hotelera de Ohana Private Club.',
  },
  experiencia: {
    eyebrow: 'INMERSIÓN SENSORIAL',
    headline: 'La serenidad oceánica como estilo de vida permanente',
    description: 'Descubre cómo la brisa, el sonido hipnótico de las olas y la arquitectura de vanguardia elevan cada instante a una experiencia irrepetible.',
    ctaButton: 'Agendar Cita Confidencial',
  },
  ubicacion: {
    eyebrow: 'UBICACIÓN PRIVILEGIADA',
    title: 'Enclave privado sobre la bahía más codiciada de la costa',
    description: 'Situado estratégicamente a minutos del aeropuerto privado internacional y la marina deportiva, preservando el aislamiento absoluto de una península protegida.',
    radarActive: 'Enlace Satelital Activo',
    travelTime: 'Tiempo estimado',
    ctaRoute: 'Trazar Ruta Privada',
    transitTimeLabel: 'Tiempo de Tránsito:',
  },
  contacto: {
    eyebrow: 'CONSULTORÍA PATRIMONIAL PRIVADA',
    title: 'Reserve una visita confidencial o solicite el dossier exclusivo',
    description: 'Nuestro equipo de asesores de ultra-lujo se pondrá en contacto con usted de manera discreta para presentarle los planos maestros y disponibilidad.',
    fullNameLabel: 'Nombre Completo y Apellidos',
    emailLabel: 'Correo Electrónico Privado',
    phoneLabel: 'Teléfono Directo / WhatsApp',
    typologyLabel: 'Tipología de su Interés',
    messageLabel: 'Requerimientos Específicos o Comentarios',
    privacyLabel: 'Acepto la política de confidencialidad y tratamiento reservado de datos de Ohana Beach House.',
    submitButton: 'Solicitar Dossier & Cita Privada',
    submittingButton: 'Procesando Solicitud Confidencial...',
    successTitle: 'Solicitud Registrada con Éxito',
    successMessage: 'Un director patrimonial de Ohana Beach House se comunicará con usted en menos de 2 horas.',
    successEyebrow: 'Solicitud Registrada Exitosamente',
    successCardTitle: 'Cita Privada en Gestión',
    receiptFolio: 'Código de Folio:',
    receiptClient: 'Titular:',
    receiptInterest: 'Interés:',
    receiptReset: 'Realizar Otra Consulta',
  },
  footer: {
    tagline: 'Colección de residencias privadas de ultra-lujo frente al océano. Donde la arquitectura bioclimática se une a la exclusividad de un club privado.',
    exploreTitle: 'Navegación',
    contactTitle: 'Oficina Privada',
    scrollTop: 'Volver arriba',
    rightsReserved: 'Todos los derechos reservados. Ohana Beach House & Umbra Luxury Developments.',
    leedBadge: 'Certificación LEED Platinum Residential',
    investorCare: 'Atención 24/7 para Inversores',
    address: 'Calle del Faro 12, Enclave Reservado',
    copyright: 'Todos los derechos reservados. Proyecto residencial confidencial.',
    backToTop: 'Volver Arriba',
  },
};

export const ENGLISH_CONTENT: SiteContent = {
  meta: {
    lang: 'en',
    siteTitle: 'Ohana Beach House | Ultra-Luxury Private Residences',
    description: 'Exclusive beachfront residential collection of villas and penthouses. Bioclimatic architecture, natural limestone, and uncompromised privacy.',
  },
  header: {
    brandName: 'OHANA',
    navLinks: {
      proyecto: 'The Project',
      maqueta3D: '3D Model',
      cifras: 'Key Stats',
      amenidades: 'Amenities',
      tipologias: 'Residences',
      experiencia: 'Experience',
      ubicacion: 'Location',
      contacto: 'Contact',
    },
    ctaPrivateTour: 'Private Tour',
    themeDaylight: 'Sunny Day',
    themeSunset: 'Golden Hour',
    oceanAudioOn: 'Ocean Audio',
    oceanAudioOff: 'Mute',
    drawerEyebrow: 'Residential Collection',
    drawerFooterSubtitle: 'Private Residences & Coastal Living',
    concierge: {
      eyebrow: 'Private Investment Office',
      title: 'Direct & Confidential Assistance',
      description: 'Ohana Beach House handles every inquiry under strict non-disclosure terms. Our senior wealth directors are available for bespoke consultations.',
      directPhone: 'Direct Telephone Line',
      privateEmail: 'Private Email',
      protocol: 'Protocol',
      protocolDesc: 'Senior advisor assigned within 2 hours',
      requestMeeting: 'Request Private Consultation',
    },
  },
  hero: {
    eyebrow: 'ULTRA-LUXURY RESIDENTIAL COLLECTION',
    headlinePart1: 'Where the ocean',
    headlinePart2: 'embraces timeless',
    headlinePart3: 'architectural serenity.',
    tagline: '18 bespoke residences suspended over pristine turquoise waters. A biophilic haven where natural limestone and the horizon seamlessly merge.',
    discoverResidences: 'Explore Residences',
    virtualTour360: '360° Virtual Tour',
    locationBadge: 'Private Coastal Reserve',
    oceanfrontBadge: 'Direct Oceanfront',
    explore: 'Explore',
  },
  concepto: {
    eyebrow: 'ARCHITECTURAL MANIFESTO',
    title: 'Biophilic geometry in organic harmony with the coastal tide',
    quote: 'We designed each residence not to admire the sea from afar, but to live fully immersed in its natural rhythm.',
    quoteAuthor: 'Ohana Bioclimatic Architecture Studio',
    description1: 'Inspired by shoreline limestone formations carved by ocean currents over millennia, Ohana Beach House residences integrate locally quarried monolithic stone walls, certified teak pergolas, and kinetic brise-soleil screens.',
    description2: 'The bioclimatic design harnesses coastal wind currents, reducing energy consumption by 42%, while continuous cantilevered terraces shield interiors from direct tropical heat while preserving overhead daylight.',
    materialsTitle: 'Noble Materials & Coastal Sustainability',
    materialsBadge: 'Sustainable Luxury Certified',
    pillars: [
      {
        icon: 'light_mode',
        title: 'Zenithal Daylight',
        detail: 'Continuous 3.4m panoramic glazing and open atriums capturing diffused coastal light.'
      },
      {
        icon: 'foundation',
        title: 'Roman Travertine',
        detail: 'Indigenous quarry stone and treated architectural teak with natural mineral sealants.'
      },
      {
        icon: 'air',
        title: 'Cross Ventilation',
        detail: 'Aerodynamic passive orientation engineered to capture continuous onshore sea breezes.'
      },
      {
        icon: 'water_drop',
        title: 'Marine Geothermal',
        detail: 'Pioneering radiant thermal efficiency engineered for a net-zero carbon footprint.'
      }
    ],
    awardBadge: {
      category: 'International Award',
      link: 'View Certification',
      title: 'Best Coastal Residential Project 2025'
    },
    awardModal: {
      eyebrow: 'International Architectural Juror',
      title: 'World Architecture & Coastal Estate Award 2025',
      description: 'Awarded by the Geneva Biophilic Design and Sustainability Committee in recognition of Ohana Beach House’s geological harmony, passive energy conservation, and reclaimed limestone craftsmanship.',
      categoryLabel: 'Category:',
      categoryVal: 'Ultra-Luxury Sustainable Masterpiece',
      materialsLabel: 'Materials:',
      materialsVal: 'Cream limestone, heat-treated cedar, and triple solar glazing',
      closeBtn: 'Close'
    },
    stats: {
      solarProtection: '85%',
      solarDesc: 'passive thermal solar protection',
      naturalVentilation: '100%',
      ventilationDesc: 'cross-ventilation airflow',
      energyEfficiency: '-42%',
      energyDesc: 'water and energy footprint',
    },
  },
  model3d: {
    eyebrow: 'REAL-TIME 3D INTERACTIVE',
    title: '3D Modeling of the Residences',
    description: 'Explore the three-dimensional architectural model generated in WebGL. Select each residence category to orbit, inspect structural details, and observe twilight illumination.',
    instructionNotice: 'Drag to orbit 360° or use mouse wheel / pinch gestures to zoom the perspective.',
    autoRotate: 'Auto Rotate',
    pauseRotate: 'Pause Rotation',
    resetView: 'Reset Angle',
    viewCatalogBtn: 'View Specifications',
    loading: 'Loading architectural geometry...',
    badge: 'PBR 3D · ACTIVE RESIDENCE',
    lightingGolden: 'Golden Hour',
    lightingTwilight: 'Twilight',
    modeStudio: 'PBR Studio',
    modeBlueprint: 'CAD Blueprint',
    gestureTip: 'Drag to orbit 360° · Scroll to zoom · Click buttons below to switch residence',
    residences: {
      overview: {
        label: 'Masterplan Overview',
        name: 'Ohana Masterplan Complex',
        badge: 'Estate Overview',
        dimensions: '18 Exclusive Residences · 4.5 Hectares',
        price: 'From $1.85M to $5.20M USD',
        features: [
          'Terraced 6-tier oceanfront masterplan overlooking the bay',
          'Direct private access to 280 linear meters of protected beach',
          'Private beach club, central solarium, and biophilic native gardens'
        ]
      },
      garden: {
        label: 'Garden Villa',
        name: 'Garden Villa Alborada',
        badge: 'Private Ground Floor',
        dimensions: '350 m² Interior · 120 m² Garden',
        price: 'Starting from $1.85M USD',
        features: [
          'Private botanical garden with native palms and teak deck solarium',
          'Heated Balinese plunge pool with natural stone recirculation cascade',
          'Retractable pocket glass doors with immediate access to the sand'
        ]
      },
      ocean: {
        label: 'Oceanfront Suite',
        name: 'Oceanfront Coral Residence',
        badge: 'Panoramic Level 3',
        dimensions: '360 m² Covered · 80 m² Cantilever Terrace',
        price: 'Starting from $2.40M USD',
        features: [
          'Continuous 28-meter perimeter cantilevered terrace over the sea',
          'Integrated volcanic basalt outdoor thermal corner jacuzzi',
          'Kinetic champagne brise-soleil louvers and ultra-clear laminated glass'
        ]
      },
      penthouse: {
        label: 'Sky Penthouse',
        name: 'Sky Penthouse Mirador',
        badge: 'Duplex Crown Rooftop',
        dimensions: '480 m² Covered · 200 m² Solarium',
        price: 'Starting from $3.95M USD',
        features: [
          'Suspended 14-meter rooftop glass-edged infinity pool',
          'Double-height duplex (6.8m) with bioclimatic pergola & outdoor kitchen',
          '360° panoramic solarium with sweeping ocean and bay vistas'
        ]
      },
      estate: {
        label: 'Cliffside Estate',
        name: 'Cliffside Signature Estate',
        badge: 'Cliffside Villa',
        dimensions: '540 m² Built · 280 m² Cliffside Terrace',
        price: 'Starting from $5.20M USD',
        features: [
          'Freestanding single-family villa anchored atop a dramatic rocky cliff',
          'Structural 18-meter cantilevered pool suspended above the crashing waves',
          'Private zen terrace with central bioethanol fire pit and outdoor lounge'
        ]
      }
    }
  },
  cifras: {
    eyebrow: 'DIMENSIONS & SCALE',
    title: 'Spatial magnitude crafted with meticulous precision',
    stats: [
      { value: '18', title: 'Private Residences', subtitle: 'Ultra-low density with uncompromised privacy' },
      { value: '280m', title: 'Direct Oceanfront', subtitle: 'Private access to protected virgin beach' },
      { value: '4.5 Ha', title: 'Private Nature Reserve', subtitle: 'Native botanical coastal gardens' },
      { value: '100%', title: 'Panoramic Ocean Views', subtitle: 'Direct westward facing sunset horizons' },
    ],
  },
  amenidades: {
    eyebrow: 'PRIVATE CLUB & HOSPITALITY',
    title: 'World-class amenities curated for holistic living',
    schedule: 'Exclusive Hours',
    service: 'Service Type',
    understood: 'Close',
    ultraHdTitle: 'Expand photo in Ultra-HD',
    lightboxVerified: '2048px High-Definition Architectural Photo',
    items: [
      { category: 'WATER & LEISURE', title: 'Oceanic Infinity Pool', description: '60 meters of saltwater horizon blending seamlessly into the open sea.' },
      { category: 'HOLISTIC WELLNESS', title: 'Thermal Spa & Cryotherapy', description: 'Hydrothermal wellness circuits, cedar saunas, and private treatment suites.' },
      { category: 'CONCIERGE & MARINE', title: 'Private Yacht Club & Pier', description: 'Dedicated 52-foot yacht exclusive to owners for private island excursions.' },
      { category: 'FINE DINING & WINE', title: 'Private Sommelier Wine Cellar', description: 'Underground temperature-controlled cellar hosting over 2,500 curated bottles.' },
    ],
  },
  tipologias: {
    eyebrow: 'EXCLUSIVE PORTFOLIO',
    title: 'Signature Oceanfront Residences',
    filters: {
      all: 'All Typologies',
      garden: 'Garden Villas',
      ocean: 'Oceanfront Suites',
      penthouse: 'Sky Penthouses',
      estate: 'Signature Estates',
    },
    ctaView3D: 'View 3D',
    ctaDossier: 'Dossier',
    startingFrom: 'Starting from',
    suites: 'Suites',
    baths: 'Baths',
    investment: 'Investment',
  },
  dossier: {
    tabs: {
      specs: 'Technical Specs',
      blueprint: 'Floorplan & Layout',
      finishes: 'Finishes & Materials',
    },
    specs: {
      coveredArea: 'Covered Area',
      terraceArea: 'Terraces & Exterior',
      level: 'Level / Elevation',
      orientation: 'Orientation',
      parking: 'Parking',
      storage: 'Storage',
      highlightsTitle: 'Architectural Highlights',
      estimatedInvestment: 'Estimated Investment',
    },
    blueprint: {
      spatialTitle: 'Architectural Spatial Diagram',
      spatialDesc: 'Dimensioned layout of interior living zones and circulation.',
      projectLabel: 'PROJECT: OHANA BEACH HOUSE',
      levelLabel: 'LEVEL:',
      refLabel: 'REF:',
      socialZone: 'SOCIAL LIVING',
      socialDesc: 'Living + Dining + Kitchen',
      masterSuite: 'MASTER SUITE',
      masterDesc: 'Walk-in Closet + Double Bath',
      guestSuites: 'GUEST SUITES',
      guestDesc: 'En-suite bedrooms',
      footerLabel: 'FRONTAL OCEAN TERRACE & INTEGRATED POOL',
    },
    finishes: [
      { label: 'Stone & Flooring', desc: 'Matte large-format Roman travertine and non-slip Balinese pool stone.' },
      { label: 'Cabinetry & Millwork', desc: 'Floor-to-ceiling solid walnut doors and matte lacquered cabinet fronts.' },
      { label: 'Kitchen & Appliances', desc: 'Full Gaggenau 400 Series suite with Taj Mahal quartzite countertops.' },
      { label: 'Bathrooms & Fixtures', desc: 'Dornbracht fixtures in polished champagne finish and solid mineral freestanding tubs.' },
      { label: 'Home Automation & Climate', desc: 'Lutron HomeWorks lighting, radiant geothermal climate, and invisible Sonance audio.' },
    ],
    actions: {
      downloadPdf: 'Download Dossier PDF',
      generatingPdf: 'Generating PDF...',
      downloadSuccess: 'Dossier Downloaded ✓',
      scheduleVisit: 'Request Private Viewing for this Residence',
      ultraHd: 'Ultra-HD',
      ultraHdTitle: 'Expand architectural render in Ultra-HD',
      closeDialog: 'Close dossier',
      lightboxVerified: '2048px High-Definition Architectural Render',
    },
  },
  calculadora: {
    eyebrow: 'WEALTH ALLOCATION & YIELDS',
    title: 'Financial Simulator & ROI Projection',
    subtitle: 'Configure your acquisition milestones during construction and project capital appreciation along with private rental yields managed by Ohana Club.',
    downPaymentLabel: 'Initial Down Payment at Signing',
    constructionTermLabel: 'Term During Construction',
    appreciationLabel: 'Projected Annual Appreciation',
    occupancyLabel: 'Rental Club Occupancy',
    monthsLabel: 'Interest-free months',
    monthsTick: 'Months',
    daysLabel: 'days',
    perMonth: '/ mo',
    perYear: '/ yr',
    annualYieldLabel: 'Annual',
    residenceSelectedLabel: 'SELECTED RESIDENCE',
    contractValueLabel: 'CONTRACTUAL VALUE',
    milestonesTitle: 'Acquisition Payment Milestones',
    downPaymentMilestone: '1. Initial Down Payment',
    constructionMilestone: '2. Monthly Construction Installment',
    constructionNote: 'Direct developer financing with 0% interest',
    closingMilestone: '3. Handover & Closing Payment (15%)',
    returnsTitle: 'Projected Wealth Returns',
    gainLabel: '5-Year Capital Appreciation',
    projectedValueLabel: 'Projected value',
    rentalLabel: 'Estimated Net Rental (Club)',
    capRateLabel: 'Estimated Cap Rate',
    ctaButton: 'Request Personalized Financial Schedule',
    disclaimer: 'Calculations for informational and investment planning purposes only. Final terms subject to purchase contract and Ohana Private Club rental management charter.',
  },
  experiencia: {
    eyebrow: 'SENSORY IMMERSION',
    headline: 'Oceanic serenity as a permanent lifestyle',
    description: 'Experience how ocean breezes, the rhythmic sound of breaking waves, and avant-garde architecture elevate every single moment into an art form.',
    ctaButton: 'Schedule Confidential Consultation',
  },
  ubicacion: {
    eyebrow: 'PRIVILEGED LOCATION',
    title: 'A secluded enclave upon the most coveted coastal bay',
    description: 'Strategically located minutes from the international private airport and marina, while preserving the total serenity of an untouched coastal peninsula.',
    radarActive: 'Satellite Link Active',
    travelTime: 'Estimated travel time',
    ctaRoute: 'Plot Private Route',
    transitTimeLabel: 'Transit Time:',
  },
  contacto: {
    eyebrow: 'PRIVATE WEALTH ADVISORY',
    title: 'Schedule a confidential appointment or request the private dossier',
    description: 'Our senior luxury advisory directors will discreetly assist you with masterplan blueprints, private site visits, and priority reservation terms.',
    fullNameLabel: 'Full Legal Name',
    emailLabel: 'Confidential Email Address',
    phoneLabel: 'Direct Phone / WhatsApp',
    typologyLabel: 'Residences of Interest',
    messageLabel: 'Specific Architectural Preferences or Notes',
    privacyLabel: 'I accept the strict confidentiality and private data policy of Ohana Beach House.',
    submitButton: 'Request Dossier & Private Consultation',
    submittingButton: 'Submitting Confidential Inquiry...',
    successTitle: 'Inquiry Successfully Received',
    successMessage: 'A senior wealth director from Ohana Beach House will contact you discreetly in less than 2 hours.',
    successEyebrow: 'Inquiry Successfully Registered',
    successCardTitle: 'Private Consultation in Progress',
    receiptFolio: 'Confirmation Folio:',
    receiptClient: 'Client Name:',
    receiptInterest: 'Selected Residence:',
    receiptReset: 'Submit Another Inquiry',
  },
  footer: {
    tagline: 'Collection of ultra-luxury oceanfront private residences. Where bioclimatic architecture meets the discreet exclusivity of a private club.',
    exploreTitle: 'Explore',
    contactTitle: 'Private Office',
    scrollTop: 'Back to top',
    rightsReserved: 'All rights reserved. Ohana Beach House & Umbra Luxury Developments.',
    leedBadge: 'LEED Platinum Residential Certification',
    investorCare: '24/7 Investor Service',
    address: '12 Lighthouse Street, Private Enclave',
    copyright: 'All rights reserved. Confidential residential project.',
    backToTop: 'Back to Top',
  },
};

export const translations: Record<'es' | 'en', SiteContent> = {
  es: SPANISH_CONTENT,
  en: ENGLISH_CONTENT,
};
