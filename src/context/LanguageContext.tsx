import React, { createContext, useContext, useState, useEffect } from 'react';
import { PHRASE_MAP } from '../constants/phraseMaps';

export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'zh' | 'ar';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇵🇹' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦' },
];

export const LANG_CODES: LanguageCode[] = ['en', 'fr', 'es', 'de', 'pt', 'zh', 'ar'];

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  // ==========================================
  // ENGLISH (DEFAULT)
  // ==========================================
  en: {
    // Top Telemetry Bar
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'ISAGO Registered',
    'telemetry.gcaa': 'GCAA Authorized Handler',
    'telemetry.occ': '24/7 OCC:',
    'telemetry.portal': 'Airline Portal',
    'telemetry.tracing': 'Baggage Tracing',

    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.flightOps': 'Flight Ops',
    'nav.cargo': 'Cargo',
    'nav.findMyBag': 'Find My Bag',
    'nav.lounge': 'Adinkra Lounge',
    'nav.safety': 'Safety & Standards',
    'nav.csr': 'CSR',
    'nav.news': 'News',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.more': 'More',
    'nav.about': 'About Us',
    'nav.management': 'Executive Leadership',
    'nav.documents': 'Document Centre',
    'nav.faqs': 'Operational FAQs',
    'nav.requestHandling': 'Request Handling',
    'nav.admin': 'Admin',
    'nav.search': 'Search',
    'nav.themeLight': 'Light',
    'nav.themeNavy': 'Navy',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.completeDirectory': 'Complete Directory',
    'nav.servicesTitle': 'Ground Handling & Aviation Services',

    // Hero Section
    'hero.kicker': 'Aviance Ghana Limited · Established 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Ground Handling.',
    'hero.title2': 'Elevated to Precision.',
    'hero.subtitle':
      'A full-service aviation ground handling provider certified and regulated by IATA ISAGO and the Ghana Civil Aviation Authority (GCAA). Delivering professional passenger services, ramp handling, Cargo RA3 secure logistics, and executive lounge hospitality.',
    'hero.badgeTitle': 'Official Corporate Identity:',
    'hero.badgeDesc':
      'Digital platform synchronized with certified Aviance Ghana business operations, IATA ISAGO standards, and GCAA regulations.',
    'hero.exploreBtn': 'Explore Aviation Services',
    'hero.baggageBtn': 'Track Inbound Bag',
    'hero.cargoBtn': 'Cargo Village (RA3)',

    // Partner Radar Section
    'partners.title': 'Trusted Ground Handling Partner to Over 40 Global Airlines',
    'partners.subtitle':
      'From scheduled daily wide-body passenger services to international cold-chain cargo freighters, Aviance Ghana is the certified handling agent of choice across Accra, Kumasi, and Tamale.',
    'partners.viewAll': 'View All 42 Partners',
    'partners.tabAll': 'All Partners (42)',
    'partners.tabIntl': 'International Commercial',
    'partners.tabRegional': 'Regional & African',
    'partners.tabCargo': 'Cargo & Freighters',
    'partners.tabVip': 'VIP & Charter',

    // Airport Stations Section
    'stations.title': "Operating Across Ghana's Key Commercial Air Gateways",
    'stations.subtitle':
      'Aviance Ghana maintains certified ground handling stations, ramp equipment fleets, and passenger operations across 3 premier airports.',
    'stations.viewAll': 'View Full Operations & Map',
    'stations.learnMore': 'Learn more',
    'stations.accName': "Kotoka International Airport (ACC / DGAA) · Terminal 3 & Cargo Village",
    'stations.kmsName': "Prempeh I International Airport (KMS / DGSI) · Kumasi Hub",
    'stations.tmlName': "Tamale International Airport (TML / DGLE) · Northern Gateway",

    // Certifications Banner
    'certBanner.eyebrow': 'Quality, Safety & Regulatory Accreditation',
    'certBanner.title': 'IATA ISAGO Accredited · Certificate ISAGO-ACC-24-2419',
    'certBanner.desc':
      'Accredited under the IATA Safety Audit for Ground Operations (ISAGO) at Kotoka International Airport (ACC) through January 21, 2027. Supported by European Union Cargo RA3 security validation and Ghana Civil Aviation Authority operating licenses.',
    'certBanner.viewCerts': 'View Certifications & Audits',
    'certBanner.codeOfConduct': 'Code of Conduct & Governance',

    // CSR Section
    'csr.eyebrow': 'Sustainability & Community Engagement',
    'csr.title': 'Community Impact & Sustainability',
    'csr.subtitle': 'Winner of the Excellence in CSR Award at the 2025 Ghana Shippers’ Authority Awards.',
    'csr.readStory': 'Read Story',
    'csr.exploreAll': 'Explore All CSR Programs & Impact Reports',

    // News Section
    'news.eyebrow': 'Corporate News & Announcements',
    'news.title': 'Latest Updates from Aviance Ghana',
    'news.allPress': 'All Articles & Press Releases',
    'news.readFull': 'Read Full Article',
    'news.mediaRelease': 'Media Release',
    'news.minRead': 'min read',

    // Services Mega Menu
    'services.passenger.title': 'Passenger Services',
    'services.passenger.desc': 'DCS check-in, boarding & PRM care',
    'services.ramp.title': 'Ramp Handling',
    'services.ramp.desc': 'Aircraft turnaround, GPU & pushback',
    'services.cargo.title': 'Air Cargo Terminal',
    'services.cargo.desc': 'EU RA3 cold chain & perishables',
    'services.vip.title': 'VIP & Charter Services',
    'services.vip.desc': 'Meet & greet, executive ramp handling',
    'services.lounge.title': 'Lounge Services (Adinkra)',
    'services.lounge.desc': 'Executive hospitality Terminal 3',
    'services.baggage.title': 'Baggage Services',
    'services.baggage.desc': 'Delayed baggage & WorldTracer desk',
    'services.gse.title': 'GSE & Fleet Maintenance',
    'services.gse.desc': 'Airside workshop & motorized fleet',
    'services.training.title': 'Operational Training',
    'services.training.desc': 'Ramp safety, DGR & IATA AHM',
    'services.occ.title': 'OCC - Flight Operations',
    'services.occ.desc': '24/7 flight coordination center',

    // Stats Section
    'stats.turnaround': 'Turnaround Reliability',
    'stats.turnaroundSub': 'On-time pushback performance',
    'stats.cargo': 'Annual Cargo Tonnage',
    'stats.cargoSub': 'Secure RA3 freight processed',
    'stats.safety': 'ISAGO Safety Audit Score',
    'stats.safetySub': 'Zero major ramp non-conformances',
    'stats.established': 'Years of Operational Excellence',
    'stats.establishedSub': 'Serving Ghana aviation since 1994',

    // Footer
    'footer.companyDesc':
      'Established in 1994, Aviance Ghana is a full-service aviation ground handling provider operating at Kotoka International Airport (Accra), Kumasi, and Tamale. Delivering IATA ISAGO-certified ramp handling, Cargo RA3 security, passenger services, executive lounge hospitality, and VIP/charter assistance.',
    'footer.certTitle': 'Official Certifications & Standards',
    'footer.aviationServices': 'Aviation Services',
    'footer.corporateLinks': 'Corporate & Governance',
    'footer.operationalStations': 'Operational Stations',
    'footer.copyright': 'All rights reserved. Aviance Ghana Limited. Regulated by GCAA & IATA ISAGO.',

    // Common
    'common.readMore': 'Read More',
    'common.viewDetails': 'View Details',
    'common.contactUs': 'Contact OCC',
    'common.switchLanguage': 'Select Language',
    'common.close': 'Close',
  },

  // ==========================================
  // FRENCH (FRANÇAIS)
  // ==========================================
  fr: {
    // Top Telemetry Bar
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'Homologué ISAGO',
    'telemetry.gcaa': 'Opérateur Agréé GCAA',
    'telemetry.occ': 'OCC 24h/7j :',
    'telemetry.portal': 'Portail Compagnies',
    'telemetry.tracing': 'Suivi Bagages',

    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.flightOps': 'Opérations de Vol',
    'nav.cargo': 'Fret Aérien',
    'nav.findMyBag': 'Suivre Mes Bagages',
    'nav.lounge': 'Salon Adinkra',
    'nav.safety': 'Sécurité & Normes',
    'nav.csr': 'RSE',
    'nav.news': 'Actualités',
    'nav.careers': 'Carrières',
    'nav.contact': 'Contact',
    'nav.more': 'Plus',
    'nav.about': 'À Propos',
    'nav.management': 'Direction Générale',
    'nav.documents': 'Centre Documentaire',
    'nav.faqs': 'FAQ Opérationnelle',
    'nav.requestHandling': "Demande d'Assistance",
    'nav.admin': 'Portail Admin',
    'nav.search': 'Rechercher',
    'nav.themeLight': 'Clair',
    'nav.themeNavy': 'Marine',
    'nav.menu': 'Menu',
    'nav.close': 'Fermer',
    'nav.completeDirectory': 'Répertoire Complet',
    'nav.servicesTitle': "Assistance en Escale & Services Aéroportuaires",

    // Hero Section
    'hero.kicker': 'Aviance Ghana Limited · Fondé en 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Assistance en Escale.',
    'hero.title2': 'Élevée à la Précision.',
    'hero.subtitle':
      "Fournisseur complet d'assistance aéroportuaire en escale certifié par IATA ISAGO et l'Autorité de l'Aviation Civile du Ghana (GCAA). Services passagers, assistance en piste, fret sécurisé RA3 et salons VIP exécutifs.",
    'hero.badgeTitle': 'Identité Officielle :',
    'hero.badgeDesc':
      "Plateforme numérique synchronisée avec les opérations certifiées d'Aviance Ghana, les normes IATA ISAGO et la réglementation GCAA.",
    'hero.exploreBtn': 'Explorer les Services Aériens',
    'hero.baggageBtn': 'Suivre Mon Bagage',
    'hero.cargoBtn': 'Terminal Fret (RA3)',

    // Partner Radar Section
    'partners.title': "Partenaire d'Assistance en Escale de Confiance pour Plus de 40 Compagnies Aériennes Mondiales",
    'partners.subtitle':
      "Des vols passagers gros-porteurs réguliers quotidiens aux avions-cargos sous chaîne du froid internationale, Aviance Ghana est l'agent d'assistance certifié de référence à Accra, Kumasi et Tamale.",
    'partners.viewAll': 'Voir Tous les 42 Partenaires',
    'partners.tabAll': 'Tous les Partenaires (42)',
    'partners.tabIntl': 'Commercial International',
    'partners.tabRegional': 'Régional & Africain',
    'partners.tabCargo': 'Fret & Cargo',
    'partners.tabVip': 'VIP & Vols Privés',

    // Airport Stations Section
    'stations.title': "Présent sur les Principales Portes Aériennes Commerciales du Ghana",
    'stations.subtitle':
      "Aviance Ghana exploite des stations d'assistance au sol certifiées, une flotte d'équipements de piste et des opérations passagers sur 3 aéroports majeurs.",
    'stations.viewAll': 'Voir Toutes les Opérations & Carte',
    'stations.learnMore': 'En savoir plus',
    'stations.accName': "Aéroport International de Kotoka (ACC / DGAA) · Terminal 3 & Village Fret",
    'stations.kmsName': "Aéroport International Prempeh I (KMS / DGSI) · Plateforme de Kumasi",
    'stations.tmlName': "Aéroport International de Tamale (TML / DGLE) · Porte du Nord",

    // Certifications Banner
    'certBanner.eyebrow': 'Qualité, Sécurité & Accréditations Réglementaires',
    'certBanner.title': 'Accrédité IATA ISAGO · Certificat ISAGO-ACC-24-2419',
    'certBanner.desc':
      "Accrédité selon l'audit de sécurité des opérations au sol de l'IATA (ISAGO) à l'aéroport international de Kotoka (ACC) jusqu'au 21 janvier 2027. Soutenu par la validation de sécurité Fret RA3 de l'Union européenne et les licences d'exploitation de la Ghana Civil Aviation Authority.",
    'certBanner.viewCerts': 'Voir les Certifications & Audits',
    'certBanner.codeOfConduct': 'Code de Conduite & Gouvernance',

    // CSR Section
    'csr.eyebrow': 'Durabilité & Engagement Communautaire',
    'csr.title': 'Impact Communautaire & Durabilité',
    'csr.subtitle': "Lauréat du Prix d'Excellence en RSE aux Ghana Shippers' Authority Awards 2025.",
    'csr.readStory': "Lire l'Histoire",
    'csr.exploreAll': "Explorer Tous les Programmes RSE & Rapports d'Impact",

    // News Section
    'news.eyebrow': 'Actualités & Communiqués Officiels',
    'news.title': "Dernières Nouvelles d'Aviance Ghana",
    'news.allPress': 'Tous les Articles & Communiqués',
    'news.readFull': "Lire l'Article Complet",
    'news.mediaRelease': 'Communiqué de Presse',
    'news.minRead': 'min de lecture',

    // Services Mega Menu
    'services.passenger.title': 'Services Passagers',
    'services.passenger.desc': "Enregistrement DCS, embarquement & assistance PMR",
    'services.ramp.title': 'Assistance en Piste',
    'services.ramp.desc': 'Rotation aéronef, GPU 400Hz & repoussage',
    'services.cargo.title': 'Terminal Fret Aérien',
    'services.cargo.desc': 'Entrepôt certifié UE RA3 & chaîne du froid',
    'services.vip.title': 'Services VIP & Vols Spéciaux',
    'services.vip.desc': 'Accueil protocolaire, salon d’honneur & escale privée',
    'services.lounge.title': 'Salon Exécutif Adinkra (T3)',
    'services.lounge.desc': 'Hospitalité de prestige au Terminal 3',
    'services.baggage.title': 'Services Bagages',
    'services.baggage.desc': 'Rapprochement BRS & comptoir WorldTracer',
    'services.gse.title': 'Maintenance des Équipements GSE',
    'services.gse.desc': 'Atelier côté piste & entretien des engins tracteurs',
    'services.training.title': 'Formation Opérationnelle',
    'services.training.desc': 'Sécurité en piste, matières dangereuses (DGR) & IATA',
    'services.occ.title': 'CCO - Centre de Contrôle Opérationnel',
    'services.occ.desc': 'Coordination des mouvements de vols 24h/24 et 7j/7',

    // Stats Section
    'stats.turnaround': 'Fiabilité de Rotation',
    'stats.turnaroundSub': 'Ponctualité au repoussage garantie',
    'stats.cargo': 'Tonnage Annuel de Fret',
    'stats.cargoSub': 'Cargaison sécurisée certifiée RA3',
    'stats.safety': 'Score d’Audit ISAGO',
    'stats.safetySub': 'Zéro non-conformité majeure en piste',
    'stats.established': 'Années d’Excellence Aéronautique',
    'stats.establishedSub': 'Au service du ciel ghanéen depuis 1994',

    // Footer
    'footer.companyDesc':
      "Fondé en 1994, Aviance Ghana est un prestataire complet d'assistance aéroportuaire en escale opérant à l'aéroport international de Kotoka (Accra), Kumasi et Tamale. Assistance en piste certifiée IATA ISAGO, fret sécurisé RA3, services passagers et salons exécutifs.",
    'footer.certTitle': 'Certifications Officielles & Normes',
    'footer.aviationServices': 'Services Aéronautiques',
    'footer.corporateLinks': 'Entreprise & Gouvernance',
    'footer.operationalStations': 'Stations Opérationnelles',
    'footer.copyright': 'Tous droits réservés. Aviance Ghana Limited. Régulé par la GCAA & IATA ISAGO.',

    // Common
    'common.readMore': 'En savoir plus',
    'common.viewDetails': 'Voir les détails',
    'common.contactUs': 'Contacter le CCO',
    'common.switchLanguage': 'Choisir la langue',
    'common.close': 'Fermer',
  },

  // ==========================================
  // SPANISH (ESPAÑOL)
  // ==========================================
  es: {
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'Registrado en ISAGO',
    'telemetry.gcaa': 'Operador Autorizado GCAA',
    'telemetry.occ': 'CCO 24/7:',
    'telemetry.portal': 'Portal de Aerolíneas',
    'telemetry.tracing': 'Rastreo de Equipaje',

    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.flightOps': 'Operaciones de Vuelo',
    'nav.cargo': 'Carga Aérea',
    'nav.findMyBag': 'Rastrear Mi Maleta',
    'nav.lounge': 'Sala Adinkra',
    'nav.safety': 'Seguridad y Normas',
    'nav.csr': 'RSC',
    'nav.news': 'Noticias',
    'nav.careers': 'Empleo',
    'nav.contact': 'Contacto',
    'nav.more': 'Más',
    'nav.about': 'Quiénes Somos',
    'nav.management': 'Liderazgo Ejecutivo',
    'nav.documents': 'Centro Documental',
    'nav.faqs': 'Preguntas Frecuentes',
    'nav.requestHandling': 'Solicitar Asistencia',
    'nav.admin': 'Portal Admin',
    'nav.search': 'Buscar',
    'nav.themeLight': 'Claro',
    'nav.themeNavy': 'Azul Marino',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'nav.completeDirectory': 'Directorio Completo',
    'nav.servicesTitle': 'Servicios Aeroportuarios y Asistencia en Tierra',

    'hero.kicker': 'Aviance Ghana Limited · Fundada en 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Asistencia en Tierra.',
    'hero.title2': 'Elevada a la Precisión.',
    'hero.subtitle':
      'Proveedor integral de asistencia aeroportuaria en tierra certificado y regulado por IATA ISAGO y la Autoridad de Aviación Civil de Ghana (GCAA). Servicios de pasajeros, rampa, carga segura RA3 y salas ejecutivas.',
    'hero.badgeTitle': 'Identidad Corporativa Oficial:',
    'hero.badgeDesc':
      'Plataforma digital sincronizada con las operaciones comerciales certificadas de Aviance Ghana, normas IATA ISAGO y regulaciones GCAA.',
    'hero.exploreBtn': 'Explorar Servicios de Aviación',
    'hero.baggageBtn': 'Rastrear Maleta de Llegada',
    'hero.cargoBtn': 'Terminal de Carga (RA3)',

    'partners.title': 'Socio de Asistencia en Tierra de Confianza para Más de 40 Aerolíneas Globales',
    'partners.subtitle':
      'Desde vuelos diarios regulares de pasajeros de fuselaje ancho hasta cargueros internacionales con cadena de frío, Aviance Ghana es el agente de asistencia certificado de elección en Accra, Kumasi y Tamale.',
    'partners.viewAll': 'Ver los 42 Socios',
    'partners.tabAll': 'Todos los Socios (42)',
    'partners.tabIntl': 'Comercial Internacional',
    'partners.tabRegional': 'Regional y Africano',
    'partners.tabCargo': 'Carga y Flete',
    'partners.tabVip': 'VIP y Chárter',

    'stations.title': 'Operando en las Principales Puertas Aéreas Comerciales de Ghana',
    'stations.subtitle':
      'Aviance Ghana mantiene estaciones certificadas de asistencia en tierra, flota de equipos de rampa y operaciones de pasajeros en 3 aeropuertos principales.',
    'stations.viewAll': 'Ver Operaciones Completas y Mapa',
    'stations.learnMore': 'Más información',
    'stations.accName': 'Aeropuerto Internacional Kotoka (ACC / DGAA) · Terminal 3 y Ciudad de Carga',
    'stations.kmsName': 'Aeropuerto Internacional Prempeh I (KMS / DGSI) · Centro de Kumasi',
    'stations.tmlName': 'Aeropuerto Internacional de Tamale (TML / DGLE) · Puerta Norte',

    'certBanner.eyebrow': 'Calidad, Seguridad y Acreditación Normativa',
    'certBanner.title': 'Acreditado por IATA ISAGO · Certificado ISAGO-ACC-24-2419',
    'certBanner.desc':
      'Acreditado bajo la Auditoría de Seguridad para Operaciones en Tierra de la IATA (ISAGO) en el Aeropuerto Internacional Kotoka (ACC) hasta el 21 de enero de 2027. Respaldado por la validación de seguridad de carga RA3 de la Unión Europea y licencias de operación de la Autoridad de Aviación Civil de Ghana.',
    'certBanner.viewCerts': 'Ver Certificaciones y Auditorías',
    'certBanner.codeOfConduct': 'Código de Conducta y Gobernanza',

    'csr.eyebrow': 'Sostenibilidad y Compromiso Comunitario',
    'csr.title': 'Impacto Comunitario y Sostenibilidad',
    'csr.subtitle': 'Ganador del Premio a la Excelencia en RSC en los Ghana Shippers’ Authority Awards 2025.',
    'csr.readStory': 'Leer Historia',
    'csr.exploreAll': 'Explorar Todos los Programas de RSC e Informes de Impacto',

    'news.eyebrow': 'Noticias Corporativas y Anuncios',
    'news.title': 'Últimas Novedades de Aviance Ghana',
    'news.allPress': 'Todos los Artículos y Notas de Prensa',
    'news.readFull': 'Leer Artículo Completo',
    'news.mediaRelease': 'Comunicado de Prensa',
    'news.minRead': 'min de lectura',

    'services.passenger.title': 'Servicios de Pasajeros',
    'services.passenger.desc': 'Check-in DCS, embarque y atención PRM',
    'services.ramp.title': 'Servicio de Rampa',
    'services.ramp.desc': 'Turnaround de aeronaves, GPU 400Hz y remolque',
    'services.cargo.title': 'Terminal de Carga Aérea',
    'services.cargo.desc': 'Logística cadena de frío validada UE RA3',
    'services.vip.title': 'Servicios VIP y Chárter',
    'services.vip.desc': 'Recepción ejecutiva y asistencia de rampa VIP',
    'services.lounge.title': 'Salas Ejecutivas Adinkra',
    'services.lounge.desc': 'Hospitalidad premium en Terminal 3',
    'services.baggage.title': 'Servicios de Equipaje',
    'services.baggage.desc': 'Reconciliación BRS y mostrador WorldTracer',
    'services.gse.title': 'Mantenimiento de Flota GSE',
    'services.gse.desc': 'Taller en lado aire y mantenimiento mecánico',
    'services.training.title': 'Capacitación Operativa',
    'services.training.desc': 'Seguridad en pista, DGR y normativas IATA AHM',
    'services.occ.title': 'CCO - Operaciones de Vuelo',
    'services.occ.desc': 'Centro de control de operaciones 24/7',

    'stats.turnaround': 'Fiabilidad en Pista',
    'stats.turnaroundSub': 'Puntualidad de pushback garantizada',
    'stats.cargo': 'Tonelaje Anual de Carga',
    'stats.cargoSub': 'Carga segura procesada bajo estándar RA3',
    'stats.safety': 'Puntuación de Auditoría ISAGO',
    'stats.safetySub': 'Cero no conformidades mayores en rampa',
    'stats.established': 'Años de Excelencia Aérea',
    'stats.establishedSub': 'Sirviendo a la aviación de Ghana desde 1994',

    'footer.companyDesc':
      'Establecida en 1994, Aviance Ghana es un proveedor integral de asistencia en tierra en el Aeropuerto Internacional Kotoka (Accra), Kumasi y Tamale. Ofreciendo rampa certificada por IATA ISAGO, seguridad de carga RA3, servicios de pasajeros y hospitalidad ejecutiva.',
    'footer.certTitle': 'Certificaciones Oficiales y Estándares',
    'footer.aviationServices': 'Servicios de Aviación',
    'footer.corporateLinks': 'Corporativo y Gobernanza',
    'footer.operationalStations': 'Estaciones Operativas',
    'footer.copyright': 'Todos los derechos reservados. Aviance Ghana Limited. Regulado por GCAA e IATA ISAGO.',

    'common.readMore': 'Leer más',
    'common.viewDetails': 'Ver detalles',
    'common.contactUs': 'Contactar CCO',
    'common.switchLanguage': 'Seleccionar idioma',
    'common.close': 'Cerrar',
  },

  // ==========================================
  // GERMAN (DEUTSCH)
  // ==========================================
  de: {
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'ISAGO-zertifiziert',
    'telemetry.gcaa': 'GCAA-autorisierter Abfertiger',
    'telemetry.occ': '24/7 OCC:',
    'telemetry.portal': 'Airline-Portal',
    'telemetry.tracing': 'Gepäckverfolgung',

    'nav.home': 'Startseite',
    'nav.services': 'Dienstleistungen',
    'nav.flightOps': 'Flugbetrieb',
    'nav.cargo': 'Luftfracht',
    'nav.findMyBag': 'Gepäck finden',
    'nav.lounge': 'Adinkra Lounge',
    'nav.safety': 'Sicherheit & Standards',
    'nav.csr': 'Nachhaltigkeit (CSR)',
    'nav.news': 'Aktuelles',
    'nav.careers': 'Karriere',
    'nav.contact': 'Kontakt',
    'nav.more': 'Mehr',
    'nav.about': 'Über uns',
    'nav.management': 'Geschäftsleitung',
    'nav.documents': 'Dokumentencenter',
    'nav.faqs': 'Häufige Fragen (FAQ)',
    'nav.requestHandling': 'Abfertigung anfragen',
    'nav.admin': 'Admin-Portal',
    'nav.search': 'Suchen',
    'nav.themeLight': 'Hell',
    'nav.themeNavy': 'Marine',
    'nav.menu': 'Menü',
    'nav.close': 'Schließen',
    'nav.completeDirectory': 'Gesamtverzeichnis',
    'nav.servicesTitle': 'Bodenabfertigung & Flugbetriebsdienste',

    'hero.kicker': 'Aviance Ghana Limited · Gegründet 1994',
    'hero.stations': 'Accra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Bodenabfertigung.',
    'hero.title2': 'Präzision auf höchstem Niveau.',
    'hero.subtitle':
      'Vollumfänglicher Bodenabfertigungsdienstleister, zertifiziert und reguliert durch IATA ISAGO und die Ghana Civil Aviation Authority (GCAA). Professionelle Passagierdienste, Vorfeldabfertigung, RA3-zertifizierte Frachtlogistik und VIP-Lounges.',
    'hero.badgeTitle': 'Offizielle Unternehmensidentität:',
    'hero.badgeDesc':
      'Digitale Plattform synchronisiert mit zertifizierten Aviance Ghana Geschäftsabläufen, IATA ISAGO Standards und GCAA Vorschriften.',
    'hero.exploreBtn': 'Flugbetriebsdienste entdecken',
    'hero.baggageBtn': 'Ankommendes Gepäck verfolgen',
    'hero.cargoBtn': 'Frachtzentrum (RA3)',

    'partners.title': 'Zuverlässiger Bodenabfertigungspartner für über 40 globale Fluggesellschaften',
    'partners.subtitle':
      'Von täglichen Linienflügen für Großraum-Passagierflugzeuge bis hin zu internationalen Frachtflügen mit Kühlkette ist Aviance Ghana der zertifizierte Abfertigungspartner der Wahl in Accra, Kumasi und Tamale.',
    'partners.viewAll': 'Alle 42 Partner anzeigen',
    'partners.tabAll': 'Alle Partner (42)',
    'partners.tabIntl': 'International Kommerziell',
    'partners.tabRegional': 'Regional & Afrikanisch',
    'partners.tabCargo': 'Fracht & Cargo',
    'partners.tabVip': 'VIP & Charter',

    'stations.title': 'Präsent an Ghanas wichtigsten kommerziellen Luftfahrt-Drehkreuzen',
    'stations.subtitle':
      'Aviance Ghana betreibt zertifizierte Bodenabfertigungsstationen, Vorfeldfahrzeugflotten und Passagierdienste an 3 führenden Flughäfen.',
    'stations.viewAll': 'Vollständige Einsätze & Karte anzeigen',
    'stations.learnMore': 'Mehr erfahren',
    'stations.accName': 'Kotoka International Airport (ACC / DGAA) · Terminal 3 & Frachtzentrum',
    'stations.kmsName': 'Prempeh I International Airport (KMS / DGSI) · Kumasi Drehkreuz',
    'stations.tmlName': 'Tamale International Airport (TML / DGLE) · Nördliches Tor',

    'certBanner.eyebrow': 'Qualität, Sicherheit & behördliche Zulassungen',
    'certBanner.title': 'IATA-ISAGO-akkreditiert · Zertifikat ISAGO-ACC-24-2419',
    'certBanner.desc':
      'Akkreditiert nach dem IATA Safety Audit for Ground Operations (ISAGO) am Kotoka International Airport (ACC) bis zum 21. Januar 2027. Unterstützt durch EU-Cargo-RA3-Sicherheitsvalidierung und GCAA-Betriebslizenzen.',
    'certBanner.viewCerts': 'Zertifikate & Audits ansehen',
    'certBanner.codeOfConduct': 'Verhaltenskodex & Unternehmensführung',

    'csr.eyebrow': 'Nachhaltigkeit & gesellschaftliches Engagement',
    'csr.title': 'Gesellschaftliche Wirkung & Nachhaltigkeit',
    'csr.subtitle': 'Gewinner des CSR-Exzellenzpreises bei den Ghana Shippers’ Authority Awards 2025.',
    'csr.readStory': 'Bericht lesen',
    'csr.exploreAll': 'Alle CSR-Programme & Wirkungsberichte ansehen',

    'news.eyebrow': 'Unternehmensnachrichten & Mitteilungen',
    'news.title': 'Neueste Updates von Aviance Ghana',
    'news.allPress': 'Alle Artikel & Pressemitteilungen',
    'news.readFull': 'Vollständigen Artikel lesen',
    'news.mediaRelease': 'Pressemitteilung',
    'news.minRead': 'Min. Lesezeit',

    'services.passenger.title': 'Passagierdienste',
    'services.passenger.desc': 'DCS-Check-in, Boarding & PRM-Betreuung',
    'services.ramp.title': 'Vorfeldabfertigung (Ramp)',
    'services.ramp.desc': 'Flugzeugabfertigung, GPU 400Hz & Pushback',
    'services.cargo.title': 'Luftfrachtterminal',
    'services.cargo.desc': 'EU RA3 validierte Kühlkette & Frachtlager',
    'services.vip.title': 'VIP- & Charter-Services',
    'services.vip.desc': 'Empfangsservice & exklusive Rampenbetreuung',
    'services.lounge.title': 'Adinkra Executive Lounge (T3)',
    'services.lounge.desc': 'Erstklassige Gastfreundschaft Terminal 3',
    'services.baggage.title': 'Gepäckabfertigung',
    'services.baggage.desc': 'BRS-Abgleich & WorldTracer-Schalter',
    'services.gse.title': 'GSE-Flotteninstandhaltung',
    'services.gse.desc': 'Luftseitige Werkstatt & Motorfahrzeugwartung',
    'services.training.title': 'Betriebliche Schulung',
    'services.training.desc': 'Vorfeldsicherheit, DGR Gefahrgut & IATA AHM',
    'services.occ.title': 'OCC - Flugbetriebsleitung',
    'services.occ.desc': '24/7 Flugkoordinationszentrum',

    'stats.turnaround': 'Abfertigungszuverlässigkeit',
    'stats.turnaroundSub': 'Garantierte Pünktlichkeit beim Pushback',
    'stats.cargo': 'Jährliche Frachttonnage',
    'stats.cargoSub': 'Sicherheitsabgefertigte RA3-Fracht',
    'stats.safety': 'ISAGO-Sicherheitsbewertung',
    'stats.safetySub': 'Null signifikante Abweichungen am Vorfeld',
    'stats.established': 'Jahre operative Exzellenz',
    'stats.establishedSub': 'Im Dienst der ghanaischen Luftfahrt seit 1994',

    'footer.companyDesc':
      'Aviance Ghana wurde 1994 gegründet und ist ein Komplettanbieter für Flugzeugbodenabfertigung an den Flughäfen Kotoka (Accra), Kumasi und Tamale. Bietet ISAGO-zertifizierte Vorfeldabfertigung, Cargo RA3, Passagierdienste und VIP-Lounges.',
    'footer.certTitle': 'Offizielle Zertifikate & Standards',
    'footer.aviationServices': 'Luftfahrtdienste',
    'footer.corporateLinks': 'Unternehmen & Governance',
    'footer.operationalStations': 'Betriebsstationen',
    'footer.copyright': 'Alle Rechte vorbehalten. Aviance Ghana Limited. Reguliert durch GCAA & IATA ISAGO.',

    'common.readMore': 'Mehr erfahren',
    'common.viewDetails': 'Details anzeigen',
    'common.contactUs': 'OCC kontaktieren',
    'common.switchLanguage': 'Sprache auswählen',
    'common.close': 'Schließen',
  },

  // ==========================================
  // PORTUGUESE (PORTUGUÊS)
  // ==========================================
  pt: {
    'telemetry.station': "ACC · Kotoka Int'l",
    'telemetry.terminal': 'Terminal 3 (DGAA)',
    'telemetry.isago': 'Registado no ISAGO',
    'telemetry.gcaa': 'Operador Autorizado GCAA',
    'telemetry.occ': 'CCO 24/7:',
    'telemetry.portal': 'Portal de Companhias',
    'telemetry.tracing': 'Rastreio de Bagagem',

    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.flightOps': 'Operações de Voo',
    'nav.cargo': 'Carga Aérea',
    'nav.findMyBag': 'Localizar Bagagem',
    'nav.lounge': 'Lounge Adinkra',
    'nav.safety': 'Segurança & Normas',
    'nav.csr': 'RSE',
    'nav.news': 'Notícias',
    'nav.careers': 'Carreiras',
    'nav.contact': 'Contacto',
    'nav.more': 'Mais',
    'nav.about': 'Sobre Nós',
    'nav.management': 'Liderança Executiva',
    'nav.documents': 'Centro Documental',
    'nav.faqs': 'Perguntas Frequentes',
    'nav.requestHandling': 'Solicitar Assistência',
    'nav.admin': 'Portal Admin',
    'nav.search': 'Pesquisar',
    'nav.themeLight': 'Claro',
    'nav.themeNavy': 'Azul Marinho',
    'nav.menu': 'Menu',
    'nav.close': 'Fechar',
    'nav.completeDirectory': 'Diretório Completo',
    'nav.servicesTitle': 'Serviços Aeroportuários e Assistência em Escala',

    'hero.kicker': 'Aviance Ghana Limited · Estabelecida em 1994',
    'hero.stations': 'Acra (KIA) · Kumasi · Tamale',
    'hero.title1': 'Assistência em Escala.',
    'hero.title2': 'Elevada à Precisão.',
    'hero.subtitle':
      'Prestador de assistência em escala certificado e regulamentado pela IATA ISAGO e pela Autoridade de Aviação Civil do Gana (GCAA). Serviços de passageiros, assistência de placa, carga segura RA3 e salas VIP executivas.',
    'hero.badgeTitle': 'Identidade Corporativa Oficial:',
    'hero.badgeDesc':
      'Plataforma digital sincronizada com operações comerciais certificadas da Aviance Ghana, normas IATA ISAGO e regulamentos GCAA.',
    'hero.exploreBtn': 'Explorar Serviços de Aviação',
    'hero.baggageBtn': 'Localizar Bagagem de Chegada',
    'hero.cargoBtn': 'Terminal de Carga (RA3)',

    'partners.title': 'Parceiro Confiável de Assistência em Escala para Mais de 40 Companhias Aéreas Globais',
    'partners.subtitle':
      'Desde voos diários regulares de passageiros de grande porte até cargueiros internacionais de cadeia de frio, a Aviance Ghana é o agente de assistência certificado de eleição em Acra, Kumasi e Tamale.',
    'partners.viewAll': 'Ver Todos os 42 Parceiros',
    'partners.tabAll': 'Todos os Parceiros (42)',
    'partners.tabIntl': 'Comercial Internacional',
    'partners.tabRegional': 'Regional e Africano',
    'partners.tabCargo': 'Carga e Frete',
    'partners.tabVip': 'VIP e Charter',

    'stations.title': 'Operando nos Principais Aeroportos Comerciais do Gana',
    'stations.subtitle':
      'A Aviance Ghana mantém estações certificadas de assistência em escala, frotas de equipamentos de placa e operações de passageiros em 3 aeroportos principais.',
    'stations.viewAll': 'Ver Operações Completas e Mapa',
    'stations.learnMore': 'Saber mais',
    'stations.accName': 'Aeroporto Internacional de Kotoka (ACC / DGAA) · Terminal 3 e Vila de Carga',
    'stations.kmsName': 'Aeroporto Internacional Prempeh I (KMS / DGSI) · Centro de Kumasi',
    'stations.tmlName': 'Aeroporto Internacional de Tamale (TML / DGLE) · Porta Norte',

    'certBanner.eyebrow': 'Qualidade, Segurança e Acreditação Regulatória',
    'certBanner.title': 'Acreditado pela IATA ISAGO · Certificado ISAGO-ACC-24-2419',
    'certBanner.desc':
      'Acreditado pela Auditoria de Segurança para Operações em Terra da IATA (ISAGO) no Aeroporto Internacional de Kotoka (ACC) até 21 de janeiro de 2027. Apoiado pela validação de segurança de carga RA3 da União Europeia e licenças operacionais da Autoridade de Aviação Civil do Gana.',
    'certBanner.viewCerts': 'Ver Certificações e Auditorias',
    'certBanner.codeOfConduct': 'Código de Conduta e Governança',

    'csr.eyebrow': 'Sustentabilidade e Envolvimento Comunitário',
    'csr.title': 'Impacto Comunitário e Sustentabilidade',
    'csr.subtitle': 'Vencedor do Prémio de Excelência em RSE nos Ghana Shippers’ Authority Awards de 2025.',
    'csr.readStory': 'Ler História',
    'csr.exploreAll': 'Explorar Todos os Programas de RSE e Relatórios de Impacto',

    'news.eyebrow': 'Notícias Corporativas e Comunicados',
    'news.title': 'Últimas Atualizações da Aviance Ghana',
    'news.allPress': 'Todos os Artigos e Comunicados de Imprensa',
    'news.readFull': 'Ler Artigo Completo',
    'news.mediaRelease': 'Comunicado de Imprensa',
    'news.minRead': 'min de leitura',

    'services.passenger.title': 'Serviços de Passageiros',
    'services.passenger.desc': 'Check-in DCS, embarque e apoio a passageiros PRM',
    'services.ramp.title': 'Assistência em Placa (Ramp)',
    'services.ramp.desc': 'Turnaround de aeronaves, GPU 400Hz e pushback',
    'services.cargo.title': 'Terminal de Carga Aérea',
    'services.cargo.desc': 'Logística sob cadeia de frio validada UE RA3',
    'services.vip.title': 'Serviços VIP e Charter',
    'services.vip.desc': 'Recepção executiva e apoio de rampa dedicado',
    'services.lounge.title': 'Lounges Executivos Adinkra',
    'services.lounge.desc': 'Hospitalidade de prestígio no Terminal 3',
    'services.baggage.title': 'Serviços de Bagagem',
    'services.baggage.desc': 'Reconciliação BRS e balcão WorldTracer',
    'services.gse.title': 'Manutenção de Frotas GSE',
    'services.gse.desc': 'Oficina no lado ar e manutenção preventiva',
    'services.training.title': 'Formação Operacional',
    'services.training.desc': 'Segurança em pista, DGR e normas IATA AHM',
    'services.occ.title': 'CCO - Operações de Voo',
    'services.occ.desc': 'Centro de coordenação operacional 24/7',

    'stats.turnaround': 'Fiabilidade Operacional',
    'stats.turnaroundSub': 'Pontualidade no pushback garantida',
    'stats.cargo': 'Tonelagem Anual de Carga',
    'stats.cargoSub': 'Carga segura processada no padrão RA3',
    'stats.safety': 'Pontuação de Auditoria ISAGO',
    'stats.safetySub': 'Zero não conformidades maiores na pista',
    'stats.established': 'Anos de Excelência Operacional',
    'stats.establishedSub': 'Servindo a aviação do Gana desde 1994',

    'footer.companyDesc':
      'Fundada em 1994, a Aviance Ghana é um operador de assistência em escala a operar em Acra (Kotoka), Kumasi e Tamale. Assistência de placa ISAGO, segurança de carga RA3 e hospitalidade executiva.',
    'footer.certTitle': 'Certificações Oficiais & Normas',
    'footer.aviationServices': 'Serviços de Aviação',
    'footer.corporateLinks': 'Empresa e Governança',
    'footer.operationalStations': 'Estacões Operacionais',
    'footer.copyright': 'Todos os direitos reservados. Aviance Ghana Limited. Regulado por GCAA e IATA ISAGO.',

    'common.readMore': 'Saber mais',
    'common.viewDetails': 'Ver detalhes',
    'common.contactUs': 'Contactar CCO',
    'common.switchLanguage': 'Selecionar idioma',
    'common.close': 'Fechar',
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    'telemetry.station': 'ACC · 科托卡国际机场',
    'telemetry.terminal': '3号航站楼 (DGAA)',
    'telemetry.isago': 'ISAGO 认证资质',
    'telemetry.gcaa': '加纳民航局授权代理',
    'telemetry.occ': '24/7 运行指挥中心:',
    'telemetry.portal': '航空公司门户',
    'telemetry.tracing': '行李追踪查询',

    'nav.home': '首页',
    'nav.services': '业务服务',
    'nav.flightOps': '飞行签派与控制',
    'nav.cargo': '航空货运',
    'nav.findMyBag': '行李追踪',
    'nav.lounge': '阿丁克拉贵宾室',
    'nav.safety': '安全标准与资质',
    'nav.csr': '企业社会责任',
    'nav.news': '新闻资讯',
    'nav.careers': '招贤纳士',
    'nav.contact': '联系我们',
    'nav.more': '更多内容',
    'nav.about': '关于我们',
    'nav.management': '管理团队',
    'nav.documents': '官方文档中心',
    'nav.faqs': '运营常见问题',
    'nav.requestHandling': '申请地面代理',
    'nav.admin': '管理登录',
    'nav.search': '全局搜索',
    'nav.themeLight': '浅色',
    'nav.themeNavy': '深蓝',
    'nav.menu': '菜单',
    'nav.close': '关闭',
    'nav.completeDirectory': '全站业务导航',
    'nav.servicesTitle': '地面保障与航空专业服务',

    'hero.kicker': 'Aviance Ghana Limited · 创立于1994年',
    'hero.stations': '阿克拉 (KIA) · 库马西 · 塔马利',
    'hero.title1': '地面保障服务。',
    'hero.title2': '铸就极致精准。',
    'hero.subtitle':
      '受国际航空运输协会 ISAGO 和加纳民航局（GCAA）官方严格认证与监管的航空全业务地面服务提供商。提供旅客服务、机坪特种保障、欧盟 RA3 认证冷链安全货运及贵宾候机室服务。',
    'hero.badgeTitle': '官方企业资质：',
    'hero.badgeDesc':
      '与 Aviance Ghana 认证商业运作、IATA ISAGO 国际标准及加纳民航局规定全面同步的数字化平台。',
    'hero.exploreBtn': '探索航空地面服务',
    'hero.baggageBtn': '查询进港行李状态',
    'hero.cargoBtn': '国际货运中心 (RA3)',

    'partners.title': '超过40家全球航空公司的可信赖地面服务合作伙伴',
    'partners.subtitle':
      '从每日定期的宽体客机航班到国际冷链货运专机，Aviance Ghana 是阿克拉、库马西和塔马利首选的认证地面代理。',
    'partners.viewAll': '查看全部42家合作伙伴',
    'partners.tabAll': '全部合作伙伴 (42)',
    'partners.tabIntl': '国际商业航司',
    'partners.tabRegional': '区域及非洲航司',
    'partners.tabCargo': '货运与全货机',
    'partners.tabVip': '贵宾与包机',

    'stations.title': '业务覆盖加纳主要商业航空门户',
    'stations.subtitle':
      'Aviance Ghana 在三大首要机场运营认证的地面保障站、机坪特种设备车队和旅客服务。',
    'stations.viewAll': '查看完整运营与地图',
    'stations.learnMore': '了解更多',
    'stations.accName': '科托卡国际机场 (ACC / DGAA) · 3号航站楼与货运村',
    'stations.kmsName': '普伦佩一世国际机场 (KMS / DGSI) · 库马西枢纽',
    'stations.tmlName': '塔马利国际机场 (TML / DGLE) · 北部门户',

    'certBanner.eyebrow': '质量、安全与官方监管认证',
    'certBanner.title': '国际航空运输协会 ISAGO 认证 · 证书编号 ISAGO-ACC-24-2419',
    'certBanner.desc':
      '通过国际航协机坪地面运行安全审计（ISAGO），科托卡国际机场（ACC）认证有效期至2027年1月21日。拥有欧盟航空货运 RA3 独立安全验证及加纳民航局法定运营牌照。',
    'certBanner.viewCerts': '查看认证与审计',
    'certBanner.codeOfConduct': '行为准则与公司治理',

    'csr.eyebrow': '可持续发展与社区关怀',
    'csr.title': '社区赋能与绿色发展',
    'csr.subtitle': '荣获2025年加纳托运人局年度企业社会责任（CSR）卓越金奖。',
    'csr.readStory': '阅读报道',
    'csr.exploreAll': '浏览全部企业社会责任项目与年度影响力报告',

    'news.eyebrow': '企业新闻与官方公告',
    'news.title': '来自 Aviance Ghana 的最新动态',
    'news.allPress': '所有新闻与媒体通稿',
    'news.readFull': '阅读完整文章',
    'news.mediaRelease': '新闻稿',
    'news.minRead': '分钟阅读',

    'services.passenger.title': '旅客地面服务',
    'services.passenger.desc': '离港系统 DCS 值机、登机及特殊旅客关怀',
    'services.ramp.title': '机坪地面保障',
    'services.ramp.desc': '过站快速过检、400Hz 地面电源及无杆推杆牵引',
    'services.cargo.title': '航空货运中心',
    'services.cargo.desc': '欧盟 RA3 认证高保税温控冷链医药物流',
    'services.vip.title': '贵宾与政要包机礼宾',
    'services.vip.desc': '停机坪元首迎宾及公务专机尊享保障',
    'services.lounge.title': '阿丁克拉头等贵宾室',
    'services.lounge.desc': '3号航站楼尊荣候机礼遇及独立卫浴',
    'services.baggage.title': '行李全流程处理',
    'services.baggage.desc': '条码自动化核对系统及国际行李查询台',
    'services.gse.title': '机坪特种车辆维护',
    'services.gse.desc': '空侧特种动力设备自主大型维修车间',
    'services.training.title': '民航资质培训',
    'services.training.desc': '机坪运行安全、危险品运输及航协标准',
    'services.occ.title': '运行控制指挥中心 (OCC)',
    'services.occ.desc': '全天候24小时不间断航班过站调度中心',

    'stats.turnaround': '过站准点保障率',
    'stats.turnaroundSub': '精准推出准点率全球领先',
    'stats.cargo': '年均航空货邮吞吐量',
    'stats.cargoSub': '高标准欧盟安全认证清关处理',
    'stats.safety': 'ISAGO 安全审计总得分',
    'stats.safetySub': '零重大机坪安全责任偏差记录',
    'stats.established': '深耕航空卓越历程',
    'stats.establishedSub': '自1994年起服务西非与全球航空业',

    'footer.companyDesc':
      'Aviance Ghana 创立于1994年，是在科托卡国际机场、库马西和塔马利运营的全资质综合性地面保障服务商。提供 ISAGO 认证机坪服务、欧盟 RA3 货运、旅客值机与贵宾接待。',
    'footer.certTitle': '官方认证资质与安全准则',
    'footer.aviationServices': '航空业务板块',
    'footer.corporateLinks': '企业管治与合规',
    'footer.operationalStations': '全国地面站点',
    'footer.copyright': '版权所有 © Aviance Ghana Limited。受加纳民航局与国际航协监管。',

    'common.readMore': '查看更多',
    'common.viewDetails': '查看详情',
    'common.contactUs': '联络运行中心',
    'common.switchLanguage': '切换界面语言',
    'common.close': '关闭窗口',
  },

  // ==========================================
  // ARABIC (العربية)
  // ==========================================
  ar: {
    'telemetry.station': 'مطار كوتوكا الدولي (ACC)',
    'telemetry.terminal': 'صالة 3 (DGAA)',
    'telemetry.isago': 'معتمد من إيساغو ISAGO',
    'telemetry.gcaa': 'وكيل معتمد من هيئة الطيران GCAA',
    'telemetry.occ': 'مركز العمليات 24/7:',
    'telemetry.portal': 'بوابة شركات الطيران',
    'telemetry.tracing': 'تتبع الأمتعة',

    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.flightOps': 'عمليات الطيران',
    'nav.cargo': 'الشحن الجوي',
    'nav.findMyBag': 'البحث عن أمتعتي',
    'nav.lounge': 'صالة أدينكرا',
    'nav.safety': 'السلامة والمعايير',
    'nav.csr': 'المسؤولية المجتمعية',
    'nav.news': 'الأخبار',
    'nav.careers': 'الوظائف',
    'nav.contact': 'اتصل بنا',
    'nav.more': 'المزيد',
    'nav.about': 'من نحن',
    'nav.management': 'الإدارة التنفيذية',
    'nav.documents': 'مركز الوثائق',
    'nav.faqs': 'الأسئلة الشائعة',
    'nav.requestHandling': 'طلب مناولة أرضية',
    'nav.admin': 'بوابة الإدارة',
    'nav.search': 'بحث',
    'nav.themeLight': 'فاتح',
    'nav.themeNavy': 'كحلي',
    'nav.menu': 'القائمة',
    'nav.close': 'إغلاق',
    'nav.completeDirectory': 'الدليل الشامل',
    'nav.servicesTitle': 'المناولة الأرضية وخدمات الطيران',

    'hero.kicker': 'أفيانس غانا المحدودة · تأسست عام 1994',
    'hero.stations': 'أكرا (KIA) · كوماسي · تامالي',
    'hero.title1': 'المناولة الأرضية.',
    'hero.title2': 'مرتفعة إلى قمة الدقة.',
    'hero.subtitle':
      'مزود خدمات مناولة أرضية متكامل ومعتمد وخاضع لرقابة اتحاد النقل الجوي الدولي (IATA ISAGO) وهيئة الطيران المدني الغانية (GCAA). نقدم خدمات المسافرين المتميزة، ومناولة الساحة، والشحن الآمن RA3، والضيافة التنفيذية.',
    'hero.badgeTitle': 'الهوية المؤسسية الرسمية:',
    'hero.badgeDesc':
      'منصة رقمية متزامنة مع العمليات المعتمدة لأفيانس غانا ومعايير IATA ISAGO ولوائح هيئة الطيران المدني.',
    'hero.exploreBtn': 'استكشاف خدمات الطيران',
    'hero.baggageBtn': 'تتبع الأمتعة القادمة',
    'hero.cargoBtn': 'قرية الشحن الجوي (RA3)',

    'partners.title': 'شريك موثوق للمناولة الأرضية لأكثر من 40 شركة طيران عالمية',
    'partners.subtitle':
      'من رحلات الركاب اليومية المجدولة ذات البدن العريض إلى طائرات الشحن المبردة بسلسلة التبريد الدولية، تعد أفيانس غانا وكيل المناولة المعتمد المفضل في أكرا وكوماسي وتامالي.',
    'partners.viewAll': 'عرض جميع الشركاء الـ 42',
    'partners.tabAll': 'جميع الشركاء (42)',
    'partners.tabIntl': 'تجاري دولي',
    'partners.tabRegional': 'إقليمي وأفريقي',
    'partners.tabCargo': 'الشحن والطرود',
    'partners.tabVip': 'كبار الشخصيات والشارتر',

    'stations.title': 'نعمل عبر بوابات الطيران التجاري الرئيسية في غانا',
    'stations.subtitle':
      'تحافظ أفيانس غانا على محطات مناولة أرضية معتمدة، وأساطيل معدات الساحة، وعمليات الركاب عبر 3 مطارات رئيسية.',
    'stations.viewAll': 'عرض العمليات الكاملة والخريطة',
    'stations.learnMore': 'معرفة المزيد',
    'stations.accName': 'مطار كوتوكا الدولي (ACC / DGAA) · صالة 3 وقرية الشحن',
    'stations.kmsName': 'مطار بريمبيه الأول الدولي (KMS / DGSI) · مركز كوماسي',
    'stations.tmlName': 'مطار تامالي الدولي (TML / DGLE) · البوابة الشمالية',

    'certBanner.eyebrow': 'الجودة والسلامة والاعتماد التنظيمي',
    'certBanner.title': 'معتمد من إياتا إيساغو · شهادة ISAGO-ACC-24-2419',
    'certBanner.desc':
      'معتمد بموجب تدقيق إياتا لسلامة العمليات الأرضية (ISAGO) في مطار كوتوكا الدولي (ACC) حتى 21 يناير 2027. مدعوم بالتحقق الأمني لشحن الاتحاد الأوروبي RA3 وتراخيص تشغيل هيئة الطيران المدني الغانية.',
    'certBanner.viewCerts': 'عرض الشهادات والتدقيقات',
    'certBanner.codeOfConduct': 'مدونة السلوك والحوكمة',

    'csr.eyebrow': 'الاستدامة والمشاركة المجتمعية',
    'csr.title': 'الأثر المجتمعي والاستدامة',
    'csr.subtitle': 'الفائز بجائزة التميز في المسؤولية المجتمعية في حفل جوائز هيئة الشاحنين الغانية لعام 2025.',
    'csr.readStory': 'قراءة القصة',
    'csr.exploreAll': 'استكشاف جميع برامج المسؤولية المجتمعية وتقارير الأثر',

    'news.eyebrow': 'أخبار الشركة وإعلاناتها',
    'news.title': 'آخر التحديثات من أفيانس غانا',
    'news.allPress': 'جميع المقالات والبيانات الصحفية',
    'news.readFull': 'قراءة المقال كاملاً',
    'news.mediaRelease': 'بيان صحفي',
    'news.minRead': 'دقائق للقراءة',

    'services.passenger.title': 'خدمات المسافرين',
    'services.passenger.desc': 'إنهاء إجراءات السفر عبر DCS، الصعود ورعاية ذوي الاحتياجات الخاصة',
    'services.ramp.title': 'مناولة الساحة والمهبط',
    'services.ramp.desc': 'دوران الطائرات، وحدات الطاقة 400Hz وسحب الطائرات',
    'services.cargo.title': 'محطة الشحن الجوي',
    'services.cargo.desc': 'خدمات لوجستية وسلسلة تبريد معتمدة من الاتحاد الأوروبي RA3',
    'services.vip.title': 'خدمات كبار الشخصيات والشارتر',
    'services.vip.desc': 'الاستقبال والترحيب ومناولة الطائرات الخاصة الفاخرة',
    'services.lounge.title': 'صالات أدينكرا التنفيذية',
    'services.lounge.desc': 'ضيافة راقية ومتميزة في صالة 3',
    'services.baggage.title': 'خدمات الأمتعة',
    'services.baggage.desc': 'مطابقة الأمتعة BRS ومكتب وورلد تريسر الدولي',
    'services.gse.title': 'صيانة معدات الدعم الأرضي',
    'services.gse.desc': 'ورشة متخصصة داخل الساحة لصيانة المعدات والمحركات',
    'services.training.title': 'التدريب العملي والمهني',
    'services.training.desc': 'سلامة الساحة، مناولة المواد الخطرة DGR ومعايير إياتا',
    'services.occ.title': 'مركز التحكم في العمليات (OCC)',
    'services.occ.desc': 'مركز تنسيق ومراقبة الرحلات على مدار الساعة طوال أيام الأسبوع',

    'stats.turnaround': 'موثوقية دوران الطائرات',
    'stats.turnaroundSub': 'دقة موعد دفع الطائرات للخلف',
    'stats.cargo': 'حمولة الشحن السنوية',
    'stats.cargoSub': 'بضائع آمنة ومعتمدة بمعايير RA3',
    'stats.safety': 'درجة تدقيق سلامة ISAGO',
    'stats.safetySub': 'صفر مخالفات كبرى على مهبط الطائرات',
    'stats.established': 'سنوات من التميز التشغيلي',
    'stats.establishedSub': 'في خدمة قطاع الطيران بغانا منذ 1994',

    'footer.companyDesc':
      'تأسست أفيانس غانا عام 1994، وهي مزود شامل للمناولة الأرضية في مطار كوتوكا الدولي (أكرا) وكوماسي وتامالي. تقدم مناولة ساحة معتمدة من ISAGO وشحن RA3 وخدمات ركاب وصالات فاخرة.',
    'footer.certTitle': 'الشهادات والمعايير الرسمية',
    'footer.aviationServices': 'خدمات الطيران',
    'footer.corporateLinks': 'الشركة والحوكمة',
    'footer.operationalStations': 'المحطات التشغيلية',
    'footer.copyright': 'جميع الحقوق محفوظة. أفيانس غانا المحدودة. مرخصة من GCAA وIATA ISAGO.',

    'common.readMore': 'اقرأ المزيد',
    'common.viewDetails': 'عرض التفاصيل',
    'common.contactUs': 'اتصل بمركز العمليات',
    'common.switchLanguage': 'اختر اللغة',
    'common.close': 'إغلاق',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // 1. Check URL prefix first (highest priority)
    const path = window.location.pathname;
    for (const code of LANG_CODES) {
      if (path === `/${code}` || path.startsWith(`/${code}/`)) {
        return code;
      }
    }
    // 2. Fall back to localStorage
    try {
      const saved = localStorage.getItem('aviance_language');
      if (saved && LANG_CODES.includes(saved as LanguageCode)) {
        return saved as LanguageCode;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('aviance_language', lang);
    } catch {
      // fallback
    }
    // Update URL to reflect new language prefix
    const currentPath = window.location.pathname;
    const cleanPath = currentPath.replace(/^\/(en|fr|es|de|pt|zh|ar)(?=\/|$)/, '') || '/';
    const newPath = `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
    const fullNew = newPath + window.location.hash;
    if (window.location.pathname + window.location.hash !== fullNew) {
      window.history.replaceState(null, '', fullNew);
    }

    // Set document lang attribute and RTL if Arabic
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }

    if (typeof document === 'undefined') return;
    if (language === 'en') return;

    const phrases = PHRASE_MAP[language as Exclude<LanguageCode, 'en'>];
    if (!phrases) return;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
        const text = node.nodeValue.trim();
        if (!text) return;
        if (phrases[text]) {
          node.nodeValue = node.nodeValue.replace(text, phrases[text]);
        } else {
          // Check without trailing punctuation or colons
          const clean = text.replace(/[\.\:\;\,\s]+$/, '');
          if (phrases[clean]) {
            node.nodeValue = node.nodeValue.replace(clean, phrases[clean]);
          }
        }
      } else {
        node.childNodes.forEach(translateNode);
      }
    };

    // Initial walk
    translateNode(document.body);

    // Dynamic subtree mutation observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateNode);
        if (mutation.type === 'characterData' && mutation.target) {
          const text = mutation.target.nodeValue?.trim();
          if (text) {
            if (phrases[text]) {
              mutation.target.nodeValue = mutation.target.nodeValue!.replace(text, phrases[text]);
            } else {
              const clean = text.replace(/[\.\:\;\,\s]+$/, '');
              if (phrases[clean]) {
                mutation.target.nodeValue = mutation.target.nodeValue!.replace(clean, phrases[clean]);
              }
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
