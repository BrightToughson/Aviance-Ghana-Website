import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  Mail,
  ChevronDown,
  ChevronRight,
  Plane,
  Shield,
  PackageCheck,
  Armchair,
  Users,
  Wrench,
  Cpu,
  ArrowRight,
  Award,
  Building2,
  FileCheck2,
  HeartHandshake,
  Home,
  Briefcase,
  MapPin,
  Clock,
  ExternalLink,
  Luggage,
  Newspaper,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  X,
  Globe
} from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';

// Authentic Aviance Operations Photography for Directory Showcase
import turnaroundImg from '../../assets/aviance_images/1791968160594.jpg';
import loungeImg from '../../assets/aviance_images/1791796145150.jpg';
import supportImg from '../../assets/aviance_images/1776164623557.jpg';
import cargoImg from '../../assets/aviance_images/1780574568846.jpg';

// Cross-platform vector flag components (ensures vivid, crisp flags on all OS including Windows)
export const FlagIcon: React.FC<{ code: LanguageCode | string; className?: string }> = ({ code, className = "w-5 h-3.5" }) => {
  if (code === 'fr') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#002654" d="M0 0h213.3v480H0z"/>
        <path fill="#FFF" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#CE1126" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  }
  if (code === 'es') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#c60b1e" d="M0 0h640v480H0z"/>
        <path fill="#ffc400" d="M0 120h640v240H0z"/>
        <circle cx="160" cy="240" r="32" fill="#c60b1e"/>
      </svg>
    );
  }
  if (code === 'de') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#000" d="M0 0h640v160H0z"/>
        <path fill="#dd0000" d="M0 160h640v160H0z"/>
        <path fill="#ffce00" d="M0 320h640v160H0z"/>
      </svg>
    );
  }
  if (code === 'pt') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#006600" d="M0 0h256v480H0z"/>
        <path fill="#ff0000" d="M256 0h384v480H256z"/>
        <circle cx="256" cy="240" r="64" fill="#ffcc00"/>
        <path fill="#fff" d="M244 216h24v48h-24z"/>
        <path fill="#002b7f" d="M248 224h16v32h-16z"/>
      </svg>
    );
  }
  if (code === 'zh') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#de2910" d="M0 0h640v480H0z"/>
        <polygon fill="#ffde00" points="100,50 115,95 160,95 125,122 138,165 100,138 62,165 75,122 40,95 85,95"/>
        <polygon fill="#ffde00" points="180,40 185,55 200,55 188,64 192,78 180,69 168,78 172,64 160,55 175,55"/>
        <polygon fill="#ffde00" points="215,80 220,95 235,95 223,104 227,118 215,109 203,118 207,104 195,95 210,95"/>
        <polygon fill="#ffde00" points="215,140 220,155 235,155 223,164 227,178 215,169 203,178 207,164 195,155 210,155"/>
        <polygon fill="#ffde00" points="180,180 185,195 200,195 188,204 192,218 180,209 168,218 172,204 160,195 175,195"/>
      </svg>
    );
  }
  if (code === 'ar') {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
        <path fill="#006c35" d="M0 0h640v480H0z"/>
        <path fill="#fff" d="M190 280h260v16H190zM420 270l30 18-30 18v-36z"/>
        <text x="320" y="240" fill="#fff" fontSize="56" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">العربية</text>
      </svg>
    );
  }
  // Default UK Flag for English
  return (
    <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] shadow-2xs border border-slate-200/90 inline-block shrink-0`} aria-hidden="true">
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-180L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 288 216 153v39h-40L368 308l56-20zM640 0v10L446 155l-33-27L598 0h42zM0 480v-10l194-145 33 27L42 480H0zm0-441L194 184l-42 20L0 78V39z"/>
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
      <path fill="#C8102E" d="M267 0v480h106V0H267zM0 187v106h640V187H0z"/>
    </svg>
  );
};

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, currentLanguageOption, t } = useLanguage();
  const isFr = language === 'fr';
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuToggledOnce, setMenuToggledOnce] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [drawerAboutOpen, setDrawerAboutOpen] = useState(false);
  const [drawerServicesOpen, setDrawerServicesOpen] = useState(false);
  const [sidebarSlide, setSidebarSlide] = useState(0);

  // Auto-expand relevant dropdown in mobile drawer based on current route
  useEffect(() => {
    if (mobileMenuOpen) {
      if (
        currentPath.startsWith('/about') ||
        currentPath === '/management' ||
        currentPath === '/facts-figures' ||
        currentPath === '/customers' ||
        currentPath === '/code-of-conduct' ||
        currentPath === '/certifications'
      ) {
        setDrawerAboutOpen(true);
      } else if (
        currentPath.startsWith('/services') ||
        currentPath.startsWith('/passenger') ||
        currentPath.startsWith('/ramp') ||
        currentPath === '/cargo' ||
        currentPath === '/lounge' ||
        currentPath === '/vip-charter' ||
        currentPath === '/operations' ||
        currentPath === '/find-my-bag' ||
        currentPath === '/training' ||
        currentPath === '/gse-fleet-maintenance'
      ) {
        setDrawerServicesOpen(true);
      }
    }
  }, [mobileMenuOpen, currentPath]);

  // Debounced dropdown close timer to prevent vanishing when moving mouse down
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (type: 'about' | 'services') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setAboutDropdownOpen(type === 'about');
    setServicesDropdownOpen(type === 'services');
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
      setServicesDropdownOpen(false);
    }, 350);
  };

  const toggleDirectoryMenu = () => {
    setMenuToggledOnce(true);
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMenuToggledOnce(true);
        setAboutDropdownOpen(false);
        setServicesDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNav = (path: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMobileMenuOpen(false);
    setMenuToggledOnce(true);
    setServicesDropdownOpen(false);
    setAboutDropdownOpen(false);
    setDrawerAboutOpen(false);
    setDrawerServicesOpen(false);
    onNavigate(path);
  };

  const servicePillars = [
    {
      title: language === 'fr' ? 'Passagers & Terminal' :
             language === 'es' ? 'Pasajeros y Terminal' :
             language === 'de' ? 'Passagiere & Terminal' :
             language === 'pt' ? 'Passageiros e Terminal' :
             language === 'zh' ? '旅客与航站楼服务' :
             language === 'ar' ? 'المسافرين والصالة' :
             'Passenger & Terminal',
      kicker: language === 'fr' ? 'Accueil & Confort' :
              language === 'es' ? 'Hospitalidad y Cuidado' :
              language === 'de' ? 'Gastfreundschaft & Betreuung' :
              language === 'pt' ? 'Hospitalidade e Cuidado' :
              language === 'zh' ? '礼宾接待与关怀' :
              language === 'ar' ? 'الضيافة والرعاية' :
              'Hospitality & Care',
      dotClass: 'bg-[#204696]',
      items: [
        {
          name: language === 'fr' ? 'Services Passagers' :
                language === 'es' ? 'Servicios de Pasajeros' :
                language === 'de' ? 'Passagierdienste' :
                language === 'pt' ? 'Serviços de Passageiros' :
                language === 'zh' ? '旅客地面服务' :
                language === 'ar' ? 'خدمات المسافرين' :
                'Passenger Services',
          path: '/passenger-services',
          icon: Users,
          desc: language === 'fr' ? 'Enregistrement DCS, embarquement & assistance PMR' :
                language === 'es' ? 'Check-in DCS, puertas de embarque y atención PRM' :
                language === 'de' ? 'DCS Check-in, Boarding & PRM-Betreuung' :
                language === 'pt' ? 'Check-in DCS, portas de embarque e apoio PRM' :
                language === 'zh' ? 'DCS 值机、登机口保障及特殊旅客服务' :
                language === 'ar' ? 'إنهاء إجراءات السفر، بوابات الصعود ورعاية ذوي الاحتياجات' :
                'DCS check-in, boarding gates & PRM passenger care'
        },
        {
          name: language === 'fr' ? 'Salons VIP Adinkra' :
                language === 'es' ? 'Salas VIP Adinkra' :
                language === 'de' ? 'Adinkra VIP-Lounges' :
                language === 'pt' ? 'Salas VIP Adinkra' :
                language === 'zh' ? '阿丁克拉贵宾室' :
                language === 'ar' ? 'صالات أدينكرا التنفيذية' :
                'Lounge Services',
          path: '/lounge',
          icon: Armchair,
          desc: language === 'fr' ? 'Salon Exécutif Adinkra & Salon The U au T3' :
                language === 'es' ? 'Salas ejecutivas Adinkra y The U en T3' :
                language === 'de' ? 'Adinkra Executive Lounge & The U Lounge am T3' :
                language === 'pt' ? 'Lounge Executivo Adinkra e The U no T3' :
                language === 'zh' ? '3号航站楼阿丁克拉行政贵宾室与 U 贵宾室' :
                language === 'ar' ? 'صالة أدينكرا وصالة The U في مبنى 3' :
                'Adinkra Executive Lounge & The U Lounge at T3'
        },
        {
          name: language === 'fr' ? 'Suivi Bagages' :
                language === 'es' ? 'Rastreo de Equipaje' :
                language === 'de' ? 'Gepäckverfolgung' :
                language === 'pt' ? 'Rastreio de Bagagem' :
                language === 'zh' ? '行李追踪查询' :
                language === 'ar' ? 'تتبع الأمتعة' :
                'Find My Bag',
          path: '/find-my-bag',
          icon: Luggage,
          desc: language === 'fr' ? 'Suivi en direct des bagages & résolution PIR' :
                language === 'es' ? 'Rastreo directo de equipaje y resolución PIR' :
                language === 'de' ? 'Direkte Gepäckverfolgung & PIR-Klärung' :
                language === 'pt' ? 'Rastreio em tempo real de bagagens e resolução PIR' :
                language === 'zh' ? '实时行李条码追踪与 PIR 遗失申报' :
                language === 'ar' ? 'تتبع مباشر للأمتعة ومعالجة تقارير الفقدان' :
                'Direct passenger baggage tracking & PIR resolution'
        },
      ]
    },
    {
      title: language === 'fr' ? 'Piste & Escales' :
             language === 'es' ? 'Rampa y Turnaround' :
             language === 'de' ? 'Vorfeld & Turnaround' :
             language === 'pt' ? 'Placa e Turnaround' :
             language === 'zh' ? '机坪特种与过站保障' :
             language === 'ar' ? 'الساحة والعمليات' :
             'Airside & Turnaround',
      kicker: language === 'fr' ? 'Opérations Tarmac' :
              language === 'es' ? 'Operaciones en Pista' :
              language === 'de' ? 'Vorfeldbetrieb' :
              language === 'pt' ? 'Operações de Pista' :
              language === 'zh' ? '机坪停机位作业' :
              language === 'ar' ? 'عمليات المهبط' :
              'Apron Operations',
      dotClass: 'bg-[#009EE0]',
      items: [
        {
          name: language === 'fr' ? 'Assistance en Piste' :
                language === 'es' ? 'Servicio de Rampa' :
                language === 'de' ? 'Vorfeldabfertigung' :
                language === 'pt' ? 'Assistência em Placa' :
                language === 'zh' ? '机坪过站服务' :
                language === 'ar' ? 'مناولة الساحة' :
                'Ramp Handling',
          path: '/ramp-handling',
          icon: Plane,
          desc: language === 'fr' ? 'Rotation d\'aéronefs, repoussage & alimentation GPU' :
                language === 'es' ? 'Turnaround de aeronaves, remolque y GPU' :
                language === 'de' ? 'Flugzeug-Turnaround, Pushback & GPU-Versorgung' :
                language === 'pt' ? 'Turnaround de aeronaves, pushback e GPU' :
                language === 'zh' ? '飞机快速过站、推杆牵引与400Hz电源供电' :
                language === 'ar' ? 'دوران الطائرات، الدفع للخلف وتزويد الطاقة' :
                'Aircraft turnaround, pushback & GPU servicing'
        },
        {
          name: language === 'fr' ? 'OCC - Opérations de Vol' :
                language === 'es' ? 'CCO - Operaciones de Vuelo' :
                language === 'de' ? 'OCC - Flugbetriebsleitung' :
                language === 'pt' ? 'CCO - Operações de Voo' :
                language === 'zh' ? 'OCC 运行控制中心' :
                language === 'ar' ? 'مركز العمليات الجوية' :
                'OCC-Flight Operations',
          path: '/operations',
          icon: Cpu,
          desc: language === 'fr' ? 'Coordination 24/7, dispatch de vol & devis de masse' :
                language === 'es' ? 'Coordinación 24/7, despacho de vuelos y control de carga' :
                language === 'de' ? '24/7 Flugkoordination, Dispatch & Lastkontrolle' :
                language === 'pt' ? 'Coordenação 24/7, despacho de voos e balanceamento' :
                language === 'zh' ? '24/7 航班运行协调、签派放行与载重平衡' :
                language === 'ar' ? 'تنسيق الرحلات 24/7 ومراقبة الحمولة' :
                '24/7 flight coordination, dispatch & load control'
        },
        {
          name: language === 'fr' ? 'Maintenance GSE & Flotte' :
                language === 'es' ? 'Mantenimiento GSE y Flota' :
                language === 'de' ? 'GSE & Flotteninstandhaltung' :
                language === 'pt' ? 'Manutenção GSE e Frota' :
                language === 'zh' ? 'GSE 设备与车队维护' :
                language === 'ar' ? 'صيانة معدات الدعم الأرضي' :
                'GSE and Fleet Maintenance',
          path: '/gse-fleet-maintenance',
          icon: Wrench,
          desc: language === 'fr' ? 'Maintenance technique du matériel d\'assistance au sol' :
                language === 'es' ? 'Mantenimiento técnico de equipos terrestres' :
                language === 'de' ? 'Wartung von Bodenabfertigungsgeräten & Technik' :
                language === 'pt' ? 'Manutenção preventiva e corretiva de equipamentos' :
                language === 'zh' ? '机坪特种设备大修车间与机械工程保障' :
                language === 'ar' ? 'الصيانة الهندسية والفنية لمعدات المهبط' :
                'Ground support equipment maintenance & engineering'
        },
      ]
    },
    {
      title: language === 'fr' ? 'Fret & Spécialisé' :
             language === 'es' ? 'Carga y Especializado' :
             language === 'de' ? 'Fracht & Spezialdienste' :
             language === 'pt' ? 'Carga e Especializado' :
             language === 'zh' ? '货运与特殊保障' :
             language === 'ar' ? 'الشحن والخدمات الخاصة' :
             'Cargo & Specialized',
      kicker: language === 'fr' ? 'Logistique & Sûreté' :
              language === 'es' ? 'Logística y Seguridad' :
              language === 'de' ? 'Logistik & Sicherheit' :
              language === 'pt' ? 'Logística e Segurança' :
              language === 'zh' ? '特种物流与安全' :
              language === 'ar' ? 'اللوجستيات والأمان' :
              'Logistics & Safety',
      dotClass: 'bg-[#72BF44]',
      items: [
        {
          name: language === 'fr' ? 'Fret Aérien' :
                language === 'es' ? 'Carga Aérea' :
                language === 'de' ? 'Luftfrachtterminal' :
                language === 'pt' ? 'Carga Aérea' :
                language === 'zh' ? '航空货运服务' :
                language === 'ar' ? 'خدمات الشحن الجوي' :
                'Cargo Services',
          path: '/cargo',
          icon: PackageCheck,
          desc: language === 'fr' ? 'Entrepôt sous douane certifié UE RA3 & chaîne du froid' :
                language === 'es' ? 'Almacén aduanero certificado UE RA3 y cadena de frío' :
                language === 'de' ? 'EU RA3 zertifiziertes Zolllager & Kühlkette' :
                language === 'pt' ? 'Entreposto aduaneiro certificado UE RA3 e cadeia de frio' :
                language === 'zh' ? '欧盟 RA3 认证保税货运仓库与冷链恒温存储' :
                language === 'ar' ? 'مستودع جمركي معتمد من الاتحاد الأوروبي RA3' :
                'EU RA3 certified bonded warehousing & cold-chain'
        },
        {
          name: language === 'fr' ? 'Services VIP & Charters' :
                language === 'es' ? 'Servicios VIP y Chárter' :
                language === 'de' ? 'VIP & Charter-Flüge' :
                language === 'pt' ? 'Serviços VIP e Charter' :
                language === 'zh' ? '贵宾礼宾与私人包机' :
                language === 'ar' ? 'خدمات كبار الشخصيات والشارتر' :
                'VIP and Charter Services',
          path: '/vip-charter',
          icon: Shield,
          desc: language === 'fr' ? 'Escorte sur piste, vols privés & protocole diplomatique' :
                language === 'es' ? 'Acompañamiento en pista, vuelos privados y protocolo' :
                language === 'de' ? 'Vorfeldeskortierung, Privatflüge & Diplomatenprotokoll' :
                language === 'pt' ? 'Escolta em pista, voos privados e protocolo' :
                language === 'zh' ? '停机坪专车护送、商务包机与外交礼遇' :
                language === 'ar' ? 'مرافقة خاصة في الساحة وبروتوكول دبلوماسي' :
                'Apron escort, private charters & diplomatic protocol'
        },
        {
          name: language === 'fr' ? 'Centre de Formation' :
                language === 'es' ? 'Centro de Capacitación' :
                language === 'de' ? 'Ausbildungsakademie' :
                language === 'pt' ? 'Academia de Formação' :
                language === 'zh' ? '民航培训学院' :
                language === 'ar' ? 'أكاديمية التدريب' :
                'Training Academy',
          path: '/training',
          icon: GraduationCap,
          desc: language === 'fr' ? 'Sécurité OACI & IATA, cours SGS & installations de pointe' :
                language === 'es' ? 'Seguridad OACI e IATA, cursos SMS e instalaciones modernas' :
                language === 'de' ? 'ICAO & IATA Sicherheit, SMS-Kurse & moderne Einrichtungen' :
                language === 'pt' ? 'Segurança ICAO e IATA, cursos SMS e salas modernas' :
                language === 'zh' ? 'ICAO 与 IATA 民航安全资质培训与 SMS 模拟教室' :
                language === 'ar' ? 'دورات سلامة الإيكاو وإياتا وإدارة السلامة' :
                'ICAO & IATA safety, SMS courses & training facilities'
        },
      ]
    }
  ];

  const services = servicePillars.flatMap((p) => p.items);

  const aboutPillars = [
    {
      title: language === 'fr' ? 'Gouvernance & Entreprise' :
             language === 'es' ? 'Corporativo y Gobernanza' :
             language === 'de' ? 'Unternehmen & Governance' :
             language === 'pt' ? 'Empresa e Governança' :
             language === 'zh' ? '企业管理与公司治理' :
             language === 'ar' ? 'الشركة والحوكمة' :
             'Corporate & Governance',
      dotClass: 'bg-[#204696]',
      items: [
        {
          name: language === 'fr' ? 'À Propos d\'Aviance' :
                language === 'es' ? 'Sobre Aviance (Quiénes Somos)' :
                language === 'de' ? 'Über Aviance (Wer wir sind)' :
                language === 'pt' ? 'Sobre a Aviance' :
                language === 'zh' ? '关于 Aviance Ghana' :
                language === 'ar' ? 'عن أفيانس غانا' :
                'About Aviance (Who We Are)',
          path: '/about',
          icon: Building2,
          desc: language === 'fr' ? 'Plus de 30 ans d\'histoire, vision & mission' :
                language === 'es' ? 'Más de 30 años de legado, visión y misión' :
                language === 'de' ? 'Über 30 Jahre Unternehmensgeschichte, Vision & Mission' :
                language === 'pt' ? 'Mais de 30 anos de história, visão e missão' :
                language === 'zh' ? '深耕西非30载历史沉淀、发展愿景与核心使命' :
                language === 'ar' ? 'أكثر من 30 عاماً من الريادة والرؤية والرسالة' :
                '30+ year company heritage, vision & mission'
        },
        {
          name: language === 'fr' ? 'Équipe de Direction' :
                language === 'es' ? 'Equipo Directivo' :
                language === 'de' ? 'Führungsteam' :
                language === 'pt' ? 'Equipa de Gestão' :
                language === 'zh' ? '高级执行管理团队' :
                language === 'ar' ? 'فريق الإدارة التنفيذية' :
                'Management Team',
          path: '/management',
          icon: Users,
          desc: language === 'fr' ? 'Direction générale & responsables d\'escale' :
                language === 'es' ? 'Liderazgo ejecutivo y directores de estación' :
                language === 'de' ? 'Geschäftsleitung & Stationsleiter' :
                language === 'pt' ? 'Diretoria executiva e chefes de escala' :
                language === 'zh' ? '执行总裁及各机场航站运营总监' :
                language === 'ar' ? 'القيادة التنفيذية ورؤساء المحطات' :
                'Executive leadership team & station department heads'
        },
        {
          name: language === 'fr' ? 'Code de Conduite' :
                language === 'es' ? 'Código de Conducta' :
                language === 'de' ? 'Verhaltenskodex' :
                language === 'pt' ? 'Código de Conduta' :
                language === 'zh' ? '商业行为与道德准则' :
                language === 'ar' ? 'مدونة السلوك والامتثال' :
                'Code of Conduct',
          path: '/code-of-conduct',
          icon: ShieldCheck,
          desc: language === 'fr' ? 'Gouvernance d\'entreprise, éthique & conformité sécurité' :
                language === 'es' ? 'Gobernanza corporativa, ética y cumplimiento de seguridad' :
                language === 'de' ? 'Unternehmensführung, Ethik & Sicherheits-Compliance' :
                language === 'pt' ? 'Governança corporativa, ética e conformidade' :
                language === 'zh' ? '企业合规管治、反腐倡廉与安全责任承诺' :
                language === 'ar' ? 'حوكمة الشركات، الأخلاقيات والامتثال لمعايير السلامة' :
                'Corporate governance, ethics & safety compliance'
        },
      ]
    },
    {
      title: language === 'fr' ? 'Normes & Partenariats' :
             language === 'es' ? 'Estándares y Alianzas' :
             language === 'de' ? 'Standards & Partnerschaften' :
             language === 'pt' ? 'Padrões e Parcerias' :
             language === 'zh' ? '国际标准与航司合作' :
             language === 'ar' ? 'المعايير والشراكات' :
             'Standards & Partnerships',
      dotClass: 'bg-[#009EE0]',
      items: [
        {
          name: language === 'fr' ? 'Faits & Chiffres' :
                language === 'es' ? 'Datos y Cifras' :
                language === 'de' ? 'Fakten & Zahlen' :
                language === 'pt' ? 'Factos e Números' :
                language === 'zh' ? '运营数据与业务成果' :
                language === 'ar' ? 'حقائق وأرقام' :
                'Facts & Figures',
          path: '/facts-figures',
          icon: BarChart3,
          desc: language === 'fr' ? 'Vols annuels, tonnage fret et statistiques passagers' :
                language === 'es' ? 'Vuelos anuales, volumen de carga y métricas de pasajeros' :
                language === 'de' ? 'Jährliche Flüge, Frachtvolumen & Passagierzahlen' :
                language === 'pt' ? 'Voos anuais, volume de carga e passageiros' :
                language === 'zh' ? '历年保障架次、航空货邮吞吐量与旅客保障统计' :
                language === 'ar' ? 'الرحلات السنوية، حجم الشحن وإحصاءات المسافرين' :
                'Annual flights, cargo volume & passenger metrics'
        },
        {
          name: language === 'fr' ? 'Compagnies Aériennes' :
                language === 'es' ? 'Aerolíneas Clientes' :
                language === 'de' ? 'Kunden-Fluggesellschaften' :
                language === 'pt' ? 'Companhias Clientes' :
                language === 'zh' ? '航司客户名录' :
                language === 'ar' ? 'شركات الطيران الشريكة' :
                'Customer Airlines',
          path: '/customers',
          icon: Plane,
          desc: language === 'fr' ? 'Compagnies régulières long-courrier, nationales et cargo' :
                language === 'es' ? 'Aerolíneas regulares de largo radio, nacionales y de carga' :
                language === 'de' ? 'Langstrecken-, Inlands- und Frachtfluggesellschaften' :
                language === 'pt' ? 'Companhias de longo curso, domésticas e de carga' :
                language === 'zh' ? '全球40余家定期宽体长途、区域国内及全货机合作伙伴' :
                language === 'ar' ? 'الناقلات الدولية للرحلات الطويلة، الإقليمية والشحن' :
                'Scheduled long-haul, domestic & cargo carriers'
        },
        {
          name: language === 'fr' ? 'Certifications & Licences' :
                language === 'es' ? 'Certificaciones y Licencias' :
                language === 'de' ? 'Zertifikate & Lizenzen' :
                language === 'pt' ? 'Certificações e Licenças' :
                language === 'zh' ? '法定牌照与安全认证' :
                language === 'ar' ? 'الشهادات والتراخيص' :
                'Certifications & Licenses',
          path: '/certifications',
          icon: FileCheck2,
          desc: language === 'fr' ? 'Registre IATA ISAGO, UE RA3 & licence GCAA' :
                language === 'es' ? 'Registro IATA ISAGO, UE RA3 y licencias GCAA' :
                language === 'de' ? 'IATA ISAGO Register, EU RA3 & GCAA-Lizenzen' :
                language === 'pt' ? 'Registo IATA ISAGO, UE RA3 e licença GCAA' :
                language === 'zh' ? '国际航协 ISAGO 注册名录、欧盟 RA3 及民航局许可证' :
                language === 'ar' ? 'سجل إياتا ISAGO، أمن الشحن RA3 وتراخيص الطيران المدني' :
                'IATA ISAGO registry, EU RA3 & GCAA licence'
        },
      ]
    }
  ];

  const aboutLinks = aboutPillars.flatMap((p) => p.items);

  const contactLinks = [
    { name: isFr ? 'Bureaux d\'Escale & Siège' : 'Station Offices & Headquarters', path: '/contact#stations', icon: MapPin, desc: isFr ? 'Village Fret, Aéroport International Kotoka (ACC)' : 'Kotoka International Airport (ACC) Cargo Village' },
    { name: isFr ? 'Aéroports Régionaux' : 'Regional Aerodromes', path: '/contact#regional', icon: Building2, desc: isFr ? 'Opérations régionales à Kumasi (KMS) & Tamale (TML)' : 'Kumasi (KMS) & Tamale (TML) regional operations' },
    { name: isFr ? 'Centre OCC Opérations 24/7' : '24/7 Operations Control Centre', path: '/contact#occ', icon: PhoneCall, desc: isFr ? 'Coordination tarmac en temps réel & dispatch vols' : 'Real-time apron coordination & flight dispatch' },
    { name: isFr ? 'Demande de Proposition (RFP)' : 'Request Handling Proposal (RFP)', path: '/contact#rfp', icon: FileCheck2, desc: isFr ? 'Appels d\'offres compagnies, vols charters & devis' : 'Formal airline tenders, ad-hoc charters & service quotes' },
    { name: isFr ? 'Assistance & Service Client' : 'Help & Customer Inquiries', path: '/contact#inquiries', icon: Mail, desc: isFr ? 'Accès salons VIP, demandes & service client' : 'Executive lounge passes, inquiries & customer care' },
  ];

  const TURNAROUND_IMG = turnaroundImg;
  const LOUNGE_IMG = loungeImg;
  const SUPPORT_IMG = supportImg;

  // 4 Authentic Showcase Slides for Directory Sidebar
  const showcaseSlides = [
    {
      id: 1,
      image: turnaroundImg,
      title: isFr ? 'Assistance en Escale & Rotations' : 'Airline Ground Handling & Turnaround',
      desc: isFr ? 'Opérations de piste de précision, repoussage et assistance à ACC, KMS & TML.' : 'Precision ramp operations, pushback, and flight servicing at ACC, KMS & TML.'
    },
    {
      id: 2,
      image: loungeImg,
      title: isFr ? 'Salons Exécutifs Adinkra' : 'Executive Adinkra Lounges',
      desc: isFr ? 'Hospitalité de classe mondiale, confort passagers VIP et salons aéroportuaires dédiés.' : 'World-class hospitality, VIP passenger comforts, and dedicated airport executive facilities.'
    },
    {
      id: 3,
      image: supportImg,
      title: isFr ? 'GSE Moderne & Ingénierie de Flotte' : 'Modern GSE & Fleet Engineering',
      desc: isFr ? 'Matériel d\'assistance au sol certifié, ingénierie zéro émission et sécurité côté piste.' : 'Certified ground support equipment, zero-emission engineering, and airside safety.'
    },
    {
      id: 4,
      image: cargoImg,
      title: isFr ? 'Logistique Fret Sous Douane UE RA3' : 'EU RA3 Bonded Cargo Logistics',
      desc: isFr ? 'Chaîne du froid sous température dirigée, manutention pharmaceutique et fret aérien.' : 'Secure temperature-controlled cold-chain, pharmaceutical handling, and air freight logistics.'
    }
  ];

  // Auto-advance sidebar slideshow automatically every 3.5s
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const interval = setInterval(() => {
      setSidebarSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [mobileMenuOpen, showcaseSlides.length]);

  // Desktop Mega-Menu Auto-Rotating Highlights
  const aboutHighlights = [
    {
      id: 'heritage',
      image: loungeImg,
      title: isFr ? 'Plus de 30 ans d\'excellence en assistance au sol au Terminal 3 de Kotoka' : '30+ Years of Ground Handling Excellence at Kotoka Terminal 3',
      path: '/about'
    },
    {
      id: 'partners',
      image: supportImg,
      title: isFr ? 'Partenaire d\'assistance de confiance pour plus de 40 compagnies mondiales' : 'Trusted Ground Handling Partner for 40+ Global Airline Carriers',
      path: '/customers'
    },
    {
      id: 'standards',
      image: turnaroundImg,
      title: isFr ? 'Certifié IATA ISAGO & réglementé par la GCAA à travers tout le Ghana' : 'IATA ISAGO Registered & Regulated by GCAA Across Ghana',
      path: '/certifications'
    }
  ];

  const serviceHighlights = [
    {
      id: 'ramp',
      image: turnaroundImg,
      title: isFr ? 'Opérations de rotation en piste et repoussage accréditées ISAGO' : 'ISAGO-Accredited Apron Turnaround & Pushback Operations',
      path: '/ramp-handling'
    },
    {
      id: 'cargo',
      image: cargoImg,
      title: isFr ? 'Logistique de fret aérien sous douane et chaîne du froid validée UE RA3' : 'EU RA3-Validated Cold-Chain & Bonded Air Cargo Logistics',
      path: '/cargo'
    },
    {
      id: 'hospitality',
      image: loungeImg,
      title: isFr ? 'Salons exécutifs Adinkra & accueil passagers VIP' : 'Executive Adinkra Lounges & VIP Passenger Hospitality',
      path: '/lounge'
    }
  ];

  const [aboutHighlightIndex, setAboutHighlightIndex] = useState(0);
  const [serviceHighlightIndex, setServiceHighlightIndex] = useState(0);
  const [isHighlightPaused, setIsHighlightPaused] = useState(false);

  // Auto-advance About dropdown highlight every 4 seconds
  useEffect(() => {
    if (!aboutDropdownOpen || isHighlightPaused) return;
    const timer = setInterval(() => {
      setAboutHighlightIndex((prev) => (prev + 1) % aboutHighlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [aboutDropdownOpen, isHighlightPaused, aboutHighlights.length]);

  // Auto-advance Services dropdown highlight every 4 seconds
  useEffect(() => {
    if (!servicesDropdownOpen || isHighlightPaused) return;
    const timer = setInterval(() => {
      setServiceHighlightIndex((prev) => (prev + 1) % serviceHighlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [servicesDropdownOpen, isHighlightPaused, serviceHighlights.length]);

  return (
    <>
      {/* Main Corporate Navigation Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/90'
          : 'bg-white/98 backdrop-blur-sm border-b border-slate-200'
      }`}>
        {/* Aviance Identity Tri-Color Top Accent (Cobalt Blue, Azure Cyan, Leaf Green) */}
        <div className="h-[3.5px] w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 transition-all duration-300">
            
            {/* Brand Logo with micro-lift */}
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 focus:outline-none text-left transition-transform duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
              aria-label="Aviance Ghana Homepage"
            >
              <AvianceLogo variant="on-light" size="md" showSubtitle={false} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 font-semibold text-[15px] xl:text-base text-slate-800 h-full">
              <button
                onClick={() => handleNav('/')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath === '/'
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                {t('nav.home', 'Home')}
              </button>

              {/* About Us Aramex-Style Mega Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownEnter('about')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => handleNav('/about')}
                  className={`flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                    currentPath.startsWith('/about') ||
                    currentPath === '/management' ||
                    currentPath === '/management-team' ||
                    currentPath === '/facts-figures' ||
                    currentPath === '/facts-and-figures' ||
                    currentPath === '/customers' ||
                    currentPath === '/code-of-conduct' ||
                    currentPath === '/certifications' ||
                    currentPath === '/certifications-licenses'
                      ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                      : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                  }`}
                >
                  <span>{t('nav.about', 'About Us')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${aboutDropdownOpen ? 'rotate-180 text-[#204696]' : 'text-slate-400'}`} />
                </button>

                {aboutDropdownOpen && (
                  <>
                    {/* Soft Backdrop Overlay with interactive dismiss */}
                    <div
                      onClick={() => {
                        setAboutDropdownOpen(false);
                        setServicesDropdownOpen(false);
                      }}
                      className="fixed inset-0 top-20 bg-slate-950/25 backdrop-blur-2xs z-40 transition-opacity duration-300 animate-fade-in"
                      aria-hidden="true"
                    />

                    {/* Seamless Full-Width Mega-Dropdown Panel */}
                    <div
                      onMouseEnter={() => handleDropdownEnter('about')}
                      onMouseLeave={handleDropdownLeave}
                      className="fixed top-20 inset-x-0 w-full z-50 bg-white border-b border-slate-200/90 shadow-2xl shadow-slate-900/10 pointer-events-auto animate-slide-down"
                    >
                      {/* Aviance Identity Tri-Color Top Accent Line */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

                      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-7 lg:py-8">
                        {/* Main Content Grid — Swissport-Inspired Layout */}
                        <div className="grid grid-cols-12 gap-8 lg:gap-10 text-slate-800 text-left items-start">
                          {/* Left Column: Section Title, Lead Description & Bigger Links */}
                          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
                            {/* Section Header & Descriptive Intro (Swissport Style) */}
                            <div className="space-y-2 mb-6">
                              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                {isFr ? 'À Propos d\'Aviance' : 'About Aviance'}
                              </h3>
                              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-xl">
                                {isFr
                                  ? 'Découvrez plus de 30 ans d\'héritage aéronautique, notre direction exécutive, nos normes d\'assistance certifiées et nos partenariats avec les compagnies aériennes au Ghana. '
                                  : 'Explore our 30+ year aviation heritage, executive leadership, certified ground handling standards, and customer airline partnerships across Ghana. '}
                                <button
                                  onClick={() => handleNav('/about')}
                                  className="font-bold text-[#204696] hover:text-[#153170] hover:underline cursor-pointer inline-flex items-center gap-1 ml-0.5"
                                >
                                  <span>{isFr ? 'En savoir plus' : 'Learn more'}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </p>
                            </div>

                            {/* 2 Columns of Prominent, Bigger Page Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                              {aboutPillars.map((pillar) => (
                                <div key={pillar.title} className="space-y-1">
                                  {pillar.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <button
                                        key={item.name}
                                        onClick={() => handleNav(item.path)}
                                        className="w-full text-left py-2.5 px-3 rounded-xl transition-all duration-150 group flex items-center gap-3.5 hover:bg-slate-50 cursor-pointer"
                                      >
                                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-[#204696] text-slate-700 group-hover:text-white transition-colors shrink-0">
                                          <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <span className="font-bold text-[15px] sm:text-base text-slate-900 group-hover:text-[#204696] transition-colors flex-1">
                                          {item.name}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-[#204696] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-1" />
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Single Auto-Rotating Highlight Showcase (Swissport Style) */}
                          <div
                            className="col-span-12 lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200/90 pt-6 lg:pt-0 lg:pl-10"
                            onMouseEnter={() => setIsHighlightPaused(true)}
                            onMouseLeave={() => setIsHighlightPaused(false)}
                          >
                            <div className="flex items-center justify-between mb-3.5">
                              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                                {isFr ? 'Points Forts' : 'Highlights'}
                              </h4>
                              {/* Slide Progress Dots */}
                              <div className="flex items-center gap-1.5">
                                {aboutHighlights.map((_, dotIdx) => (
                                  <button
                                    key={dotIdx}
                                    onClick={() => setAboutHighlightIndex(dotIdx)}
                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                      dotIdx === aboutHighlightIndex
                                        ? 'w-6 h-1.5 bg-[#204696]'
                                        : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Highlight slide ${dotIdx + 1}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Single Showcase Image Card with Crossfade */}
                            <div
                              onClick={() => handleNav(aboutHighlights[aboutHighlightIndex].path)}
                              className="group/hcard cursor-pointer"
                            >
                              <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 mb-3 shadow-xs border border-slate-100">
                                {aboutHighlights.map((hl, idx) => {
                                  const isActive = idx === aboutHighlightIndex;
                                  return (
                                    <div
                                      key={hl.id}
                                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                                        isActive
                                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                                      }`}
                                    >
                                      <img
                                        src={hl.image}
                                        alt={hl.title}
                                        className="w-full h-full object-cover group-hover/hcard:scale-105 transition-transform duration-700 ease-out"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Dynamic Headline underneath */}
                              <div className="flex items-start justify-between gap-3">
                                <h5
                                  key={aboutHighlightIndex}
                                  className="animate-fade-in font-bold text-xs sm:text-[14px] text-slate-900 group-hover/hcard:text-[#204696] transition-colors leading-snug flex-1"
                                >
                                  {aboutHighlights[aboutHighlightIndex].title}
                                </h5>
                                <ArrowRight className="w-4 h-4 text-[#204696] group-hover/hcard:translate-x-1 transition-transform shrink-0 mt-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Services Aramex-Style Mega Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => handleNav('/services')}
                  className={`flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                    currentPath === '/services' ||
                    currentPath.startsWith('/services') ||
                    currentPath === '/passenger-services' ||
                    currentPath === '/ramp-handling' ||
                    currentPath === '/cargo' ||
                    currentPath === '/cargo-services' ||
                    currentPath === '/lounge' ||
                    currentPath === '/lounge-services' ||
                    currentPath === '/vip-charter' ||
                    currentPath === '/vip-and-charter-services' ||
                    currentPath === '/operations' ||
                    currentPath === '/occ' ||
                    currentPath === '/occ-flight-operations' ||
                    currentPath === '/find-my-bag' ||
                    currentPath === '/baggage' ||
                    currentPath === '/training' ||
                    currentPath === '/gse-fleet-maintenance' ||
                    currentPath === '/gse-and-fleet-maintenance'
                      ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                      : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                  }`}
                >
                  <span>{t('nav.services', 'Services')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ease-out ${servicesDropdownOpen ? 'rotate-180 text-[#204696]' : 'text-slate-400'}`} />
                </button>

                {servicesDropdownOpen && (
                  <>
                    {/* Soft Backdrop Overlay with interactive dismiss */}
                    <div
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        setAboutDropdownOpen(false);
                      }}
                      className="fixed inset-0 top-20 bg-slate-950/25 backdrop-blur-2xs z-40 transition-opacity duration-300 animate-fade-in"
                      aria-hidden="true"
                    />

                    {/* Seamless Full-Width Mega-Dropdown Panel */}
                    <div
                      onMouseEnter={() => handleDropdownEnter('services')}
                      onMouseLeave={handleDropdownLeave}
                      className="fixed top-20 inset-x-0 w-full z-50 bg-white border-b border-slate-200/90 shadow-2xl shadow-slate-900/10 pointer-events-auto animate-slide-down"
                    >
                      {/* Aviance Identity Tri-Color Top Accent Line */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

                      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-7 lg:py-8">
                        {/* Main Content Grid — Swissport-Inspired Layout */}
                        <div className="grid grid-cols-12 gap-8 lg:gap-10 text-slate-800 text-left items-start">
                          {/* Left Column: Section Title, Lead Description & Bigger Links */}
                          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
                            {/* Section Header & Descriptive Intro (Swissport Style) */}
                            <div className="space-y-2 mb-6">
                              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                                {isFr ? 'Nos Services' : 'Core Services'}
                              </h3>
                              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-xl">
                                {isFr
                                  ? 'Prestations de rotation au sol certifiées ISAGO, logistique fret chaîne du froid UE RA3, salons VIP et maintenance de flotte GSE au Ghana. '
                                  : 'Delivering ISAGO-certified ground turnaround, EU RA3 cold-chain cargo logistics, executive lounge hospitality, and GSE fleet maintenance across Ghana. '}
                                <button
                                  onClick={() => handleNav('/services')}
                                  className="font-bold text-[#204696] hover:text-[#153170] hover:underline cursor-pointer inline-flex items-center gap-1 ml-0.5"
                                >
                                  <span>{isFr ? 'En savoir plus' : 'Learn more'}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </p>
                            </div>

                            {/* 3 Columns of Prominent, Bigger Page Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2">
                              {servicePillars.map((pillar) => (
                                <div key={pillar.title} className="space-y-1">
                                  {pillar.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentPath === item.path ||
                                      (item.path === '/lounge' && currentPath === '/lounge-services') ||
                                      (item.path === '/cargo' && currentPath === '/cargo-services') ||
                                      (item.path === '/vip-charter' && currentPath === '/vip-and-charter-services') ||
                                      (item.path === '/operations' && (currentPath === '/occ' || currentPath === '/occ-flight-operations')) ||
                                      (item.path === '/find-my-bag' && currentPath === '/baggage') ||
                                      (item.path === '/gse-fleet-maintenance' && currentPath === '/gse-and-fleet-maintenance');
                                    return (
                                      <button
                                        key={item.name}
                                        onClick={() => handleNav(item.path)}
                                        className={`w-full text-left py-2 px-2.5 rounded-xl transition-all duration-150 group flex items-center gap-2.5 cursor-pointer ${
                                          isActive
                                            ? 'bg-blue-50 text-[#204696] font-bold shadow-2xs'
                                            : 'hover:bg-slate-50 text-slate-900'
                                        }`}
                                      >
                                        <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                                          isActive
                                            ? 'bg-[#204696] text-white'
                                            : 'bg-slate-100 group-hover:bg-[#204696] text-slate-700 group-hover:text-white'
                                        }`}>
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-xs sm:text-[13.5px] transition-colors flex-1 ${
                                          isActive
                                            ? 'font-bold text-[#204696]'
                                            : 'font-semibold text-slate-900 group-hover:text-[#204696]'
                                        }`}>
                                          {item.name}
                                        </span>
                                        <ArrowRight className={`w-3.5 h-3.5 text-[#204696] transition-all shrink-0 ${
                                          isActive
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                        }`} />
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column: Single Auto-Rotating Highlight Showcase (Swissport Style) */}
                          <div
                            className="col-span-12 lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200/90 pt-6 lg:pt-0 lg:pl-10"
                            onMouseEnter={() => setIsHighlightPaused(true)}
                            onMouseLeave={() => setIsHighlightPaused(false)}
                          >
                            <div className="flex items-center justify-between mb-3.5">
                              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                                {isFr ? 'Points Forts' : 'Highlights'}
                              </h4>
                              {/* Slide Progress Dots */}
                              <div className="flex items-center gap-1.5">
                                {serviceHighlights.map((_, dotIdx) => (
                                  <button
                                    key={dotIdx}
                                    onClick={() => setServiceHighlightIndex(dotIdx)}
                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                      dotIdx === serviceHighlightIndex
                                        ? 'w-6 h-1.5 bg-[#204696]'
                                        : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Highlight slide ${dotIdx + 1}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Single Showcase Image Card with Crossfade */}
                            <div
                              onClick={() => handleNav(serviceHighlights[serviceHighlightIndex].path)}
                              className="group/hcard cursor-pointer"
                            >
                              <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 mb-3 shadow-xs border border-slate-100">
                                {serviceHighlights.map((hl, idx) => {
                                  const isActive = idx === serviceHighlightIndex;
                                  return (
                                    <div
                                      key={hl.id}
                                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                                        isActive
                                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                                      }`}
                                    >
                                      <img
                                        src={hl.image}
                                        alt={hl.title}
                                        className="w-full h-full object-cover group-hover/hcard:scale-105 transition-transform duration-700 ease-out"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Dynamic Headline underneath */}
                              <div className="flex items-start justify-between gap-3">
                                <h5
                                  key={serviceHighlightIndex}
                                  className="animate-fade-in font-bold text-xs sm:text-[14px] text-slate-900 group-hover/hcard:text-[#204696] transition-colors leading-snug flex-1"
                                >
                                  {serviceHighlights[serviceHighlightIndex].title}
                                </h5>
                                <ArrowRight className="w-4 h-4 text-[#204696] group-hover/hcard:translate-x-1 transition-transform shrink-0 mt-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => handleNav('/csr')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath === '/csr' || currentPath.includes('csr')
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                {t('nav.csr', 'CSR')}
              </button>

              <button
                onClick={() => handleNav('/news')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath.startsWith('/news')
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                {t('nav.news', 'News')}
              </button>

              <button
                onClick={() => handleNav('/careers')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath === '/careers'
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                {t('nav.careers', 'Careers')}
              </button>

              {/* Contact Direct Link */}
              <button
                onClick={() => handleNav('/contact')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold cursor-pointer active:scale-95 ${
                  currentPath === '/contact' || currentPath.startsWith('/contact')
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                {t('nav.contact', 'Contact')}
              </button>
            </nav>

            {/* Action Buttons Right */}
            <div className="flex items-center gap-2">

              {/* Language Switcher */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-sm font-semibold cursor-pointer active:scale-95 shadow-2xs bg-white"
                  aria-label="Change language"
                  title="Change language"
                >
                  <FlagIcon code={language} className="w-5 h-3.5" />
                  <span className="text-xs font-bold tracking-wide uppercase text-slate-700">{language}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-[#204696]' : ''}`} />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden z-50 animate-fade-in p-1.5">
                    <div className="px-3 pt-2.5 pb-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Language</p>
                    </div>
                    <div className="space-y-0.5">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as LanguageCode);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 text-[#204696]'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <FlagIcon code={lang.code} className="w-5 h-3.5" />
                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] font-bold leading-tight ${isSelected ? 'text-[#204696]' : 'text-slate-800'}`}>
                                {lang.label}
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">{lang.nativeLabel}</p>
                            </div>
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-[#204696] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Executive Mobile Menu Toggle Button */}
              <button
                onClick={toggleDirectoryMenu}
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer select-none active:scale-95 group ${
                  mobileMenuOpen
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-100'
                }`}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <div className="relative w-5 h-4 flex items-center justify-center pointer-events-none">
                  {/* Top Bar */}
                  <span
                    className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                      mobileMenuOpen
                        ? 'translate-y-0 rotate-45 bg-slate-800 group-hover:bg-[#204696]'
                        : '-translate-y-1.5 group-hover:-translate-y-[3.5px] rotate-0 bg-slate-800 group-hover:bg-[#204696]'
                    }`}
                  />

                  {/* Middle Bar (collapses to 2 bars on hover & X on open) */}
                  <span
                    className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out transform origin-center bg-slate-800 group-hover:bg-[#204696] ${
                      mobileMenuOpen
                        ? 'opacity-0 scale-x-0'
                        : 'opacity-100 scale-x-100 group-hover:opacity-0 group-hover:scale-x-0'
                    }`}
                  />

                  {/* Bottom Bar */}
                  <span
                    className={`absolute h-[2px] w-5 rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                      mobileMenuOpen
                        ? 'translate-y-0 -rotate-45 bg-slate-800 group-hover:bg-[#204696]'
                        : 'translate-y-1.5 group-hover:translate-y-[3.5px] rotate-0 bg-slate-800 group-hover:bg-[#204696]'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Executive Responsive Navigation Drawer with Smooth Slide & Fade In/Out */}
        {/* Soft Backdrop Overlay with interactive dismiss & smooth fade */}
        <div
          onClick={() => {
            setMobileMenuOpen(false);
            setMenuToggledOnce(true);
          }}
          className={`fixed inset-0 top-20 bg-slate-950/40 backdrop-blur-xs z-30 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
          }`}
          aria-hidden="true"
        />

        {/* Top-Down Expanding Panel attached below Header with smooth physics */}
        <div
          className={`fixed inset-x-0 top-20 z-40 bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto visible'
              : '-translate-y-4 opacity-0 pointer-events-none invisible'
          }`}
        >
              {/* Aviance Identity Tri-Color Top Accent Line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

              <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
                {/* Main Navigation Stack */}
                <div className="space-y-1">
                  
                  {/* 1. Aviation Services (Expandable) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => setDrawerServicesOpen(!drawerServicesOpen)}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          currentPath.startsWith('/services') || currentPath.startsWith('/passenger') || currentPath.startsWith('/ramp') || currentPath === '/cargo' || currentPath === '/lounge' || currentPath === '/vip-charter' || currentPath === '/operations' || currentPath === '/find-my-bag' || currentPath === '/training' || currentPath === '/gse-fleet-maintenance'
                            ? 'text-[#204696]'
                            : 'text-slate-900 group-hover:text-[#204696]'
                        }`}>
                          {isFr ? 'Services Aéronautiques' : 'Aviation Services'}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 font-mono">
                          (9)
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 group-hover:text-[#204696] transition-transform duration-300 ease-out ${
                          drawerServicesOpen ? 'rotate-180 text-[#204696]' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        drawerServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pt-1 px-1 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {servicePillars.map((pillar) => (
                            <div key={pillar.title} className="space-y-1">
                              {pillar.items.map((item) => {
                                const isActive = currentPath === item.path;
                                return (
                                  <button
                                    key={item.name}
                                    onClick={() => handleNav(item.path)}
                                    className={`w-full text-left py-2 px-2.5 rounded-lg transition-all group flex items-center justify-between cursor-pointer ${
                                      isActive
                                        ? 'bg-blue-50/80 text-[#204696]'
                                        : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                                  >
                                    <span className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-[#204696]">
                                      {item.name}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-[#204696] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleNav('/services')}
                            className="text-xs font-bold text-[#204696] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isFr ? 'Explorer nos 9 compétences aéronautiques' : 'Explore all 9 aviation capabilities hub'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. About Aviance Ghana (Expandable) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => setDrawerAboutOpen(!drawerAboutOpen)}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                          currentPath.startsWith('/about') || currentPath === '/management' || currentPath === '/facts-figures' || currentPath === '/customers' || currentPath === '/code-of-conduct' || currentPath === '/certifications'
                            ? 'text-[#204696]'
                            : 'text-slate-900 group-hover:text-[#204696]'
                        }`}>
                          {isFr ? 'À Propos d\'Aviance Ghana' : 'About Aviance Ghana'}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 font-mono">
                          (6)
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 group-hover:text-[#204696] transition-transform duration-300 ease-out ${
                          drawerAboutOpen ? 'rotate-180 text-[#204696]' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        drawerAboutOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pt-1 px-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {aboutLinks.map((item) => {
                            const isActive = currentPath === item.path;
                            return (
                              <button
                                key={item.name}
                                onClick={() => handleNav(item.path)}
                                className={`w-full text-left py-2 px-2.5 rounded-lg transition-all group flex items-center justify-between cursor-pointer ${
                                  isActive
                                    ? 'bg-blue-50/80 text-[#204696]'
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-[#204696]">
                                  {item.name}
                                </span>
                                <ArrowRight className="w-3 h-3 text-[#204696] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => handleNav('/about')}
                            className="text-xs font-bold text-[#204696] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isFr ? 'Découvrir le profil et l\'histoire de l\'entreprise' : 'Explore full corporate profile & heritage'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. CSR & Sustainability (Direct) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => handleNav('/csr')}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        currentPath === '/csr' ? 'text-[#204696]' : 'text-slate-900 group-hover:text-[#204696]'
                      }`}>
                        {t('nav.csr', 'CSR & Community')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#204696] group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                  {/* 4. News & Media (Direct) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => handleNav('/news')}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        currentPath.startsWith('/news') ? 'text-[#204696]' : 'text-slate-900 group-hover:text-[#204696]'
                      }`}>
                        {t('nav.news', 'News & Media')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#204696] group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                  {/* 5. Careers & Opportunities (Direct) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => handleNav('/careers')}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        currentPath === '/careers' ? 'text-[#204696]' : 'text-slate-900 group-hover:text-[#204696]'
                      }`}>
                        {t('nav.careers', 'Careers')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#204696] group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                  {/* 6. Contact & Station Offices (Direct) */}
                  <div className="border-b border-slate-100">
                    <button
                      onClick={() => handleNav('/contact')}
                      className="w-full py-4 px-1 text-left flex items-center justify-between group cursor-pointer transition-colors"
                    >
                      <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        currentPath.startsWith('/contact') ? 'text-[#204696]' : 'text-slate-900 group-hover:text-[#204696]'
                      }`}>
                        {t('nav.contact', 'Contact & Station Offices')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#204696] group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                </div>

                {/* Ground Operations & Utilities Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4">
                  {/* Mobile Language Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 gap-2.5">
                    <span className="text-xs font-bold text-slate-700">
                      {language === 'fr' ? 'Langue :' : language === 'es' ? 'Idioma:' : language === 'de' ? 'Sprache:' : language === 'pt' ? 'Idioma:' : language === 'zh' ? '语言:' : language === 'ar' ? 'اللغة:' : 'Language:'}
                    </span>
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto max-w-full scrollbar-none">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as LanguageCode);
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              isSelected
                                ? 'bg-[#204696] text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <FlagIcon code={lang.code} className="w-4 h-3" />
                            <span>{lang.nativeLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    {/* Live OCC Contact */}
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72BF44] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#72BF44]"></span>
                      </span>
                      <span className="text-slate-500 font-medium">{isFr ? 'Dispatch Opérations de Vol 24/7 :' : '24/7 Flight Operations Dispatch:'}</span>
                      <a href="tel:+233244333133" className="font-semibold text-slate-900 hover:text-[#204696] font-mono">
                        +233 (0) 244 333 133
                      </a>
                    </div>

                    {/* Extranet & Hubs */}
                    <div className="flex items-center gap-3 text-slate-500">
                      <button
                        onClick={() => handleNav('/partner-portal')}
                        className="hover:text-[#204696] transition-colors flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>{isFr ? 'Extranet Compagnies' : 'Airline Extranet'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-slate-500">ACC · KMS · TML</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span>{isFr ? 'Agréé par la Ghana Civil Aviation Authority (GCAA) · Prestataire d\'assistance en escale certifié IATA ISAGO' : 'Ghana Civil Aviation Authority (GCAA) Licensed · IATA ISAGO Registered Ground Handler'}</span>
                    <span>{isFr ? 'Aéroport International Kotoka · Terminal 3 & Village Fret' : 'Kotoka International Airport · Terminal 3 & Cargo Village'}</span>
                  </div>
                </div>

              </div>
            </div>
          </header>
    </>
  );
};
