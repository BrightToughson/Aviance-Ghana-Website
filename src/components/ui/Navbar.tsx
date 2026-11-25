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
  const { language, setLanguage, currentLanguageOption } = useLanguage();
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
      title: 'Passenger & Terminal',
      kicker: 'Hospitality & Care',
      dotClass: 'bg-[#204696]',
      items: [
        { name: 'Passenger Services', path: '/passenger-services', icon: Users, desc: 'DCS check-in, boarding gates & PRM passenger care' },
        { name: 'Lounge Services', path: '/lounge', icon: Armchair, desc: 'Adinkra Executive Lounge & The U Lounge at T3' },
        { name: 'Find My Bag', path: '/find-my-bag', icon: Luggage, desc: 'Direct passenger baggage tracking & PIR resolution' },
      ]
    },
    {
      title: 'Airside & Turnaround',
      kicker: 'Apron Operations',
      dotClass: 'bg-[#009EE0]',
      items: [
        { name: 'Ramp Handling', path: '/ramp-handling', icon: Plane, desc: 'Aircraft turnaround, pushback & GPU servicing' },
        { name: 'OCC-Flight Operations', path: '/operations', icon: Cpu, desc: '24/7 flight coordination, dispatch & load control' },
        { name: 'GSE and Fleet Maintenance', path: '/gse-fleet-maintenance', icon: Wrench, desc: 'Ground support equipment maintenance & engineering' },
      ]
    },
    {
      title: 'Cargo & Specialized',
      kicker: 'Logistics & Safety',
      dotClass: 'bg-[#72BF44]',
      items: [
        { name: 'Cargo Services', path: '/cargo', icon: PackageCheck, desc: 'EU RA3 certified bonded warehousing & cold-chain' },
        { name: 'VIP and Charter Services', path: '/vip-charter', icon: Shield, desc: 'Apron escort, private charters & diplomatic protocol' },
        { name: 'Training Academy', path: '/training', icon: GraduationCap, desc: 'ICAO & IATA safety, SMS courses & training facilities' },
      ]
    }
  ];

  const services = servicePillars.flatMap((p) => p.items);

  const aboutPillars = [
    {
      title: 'Corporate & Governance',
      dotClass: 'bg-[#204696]',
      items: [
        { name: 'About Aviance (Who We Are)', path: '/about', icon: Building2, desc: '30+ year company heritage, vision & mission' },
        { name: 'Management Team', path: '/management', icon: Users, desc: 'Executive leadership team & station department heads' },
        { name: 'Code of Conduct', path: '/code-of-conduct', icon: ShieldCheck, desc: 'Corporate governance, ethics & safety compliance' },
      ]
    },
    {
      title: 'Standards & Partnerships',
      dotClass: 'bg-[#009EE0]',
      items: [
        { name: 'Facts & Figures', path: '/facts-figures', icon: BarChart3, desc: 'Annual flights, cargo volume & passenger metrics' },
        { name: 'Customer Airlines', path: '/customers', icon: Plane, desc: 'Scheduled long-haul, domestic & cargo carriers' },
        { name: 'Certifications & Licenses', path: '/certifications', icon: FileCheck2, desc: 'IATA ISAGO registry, EU RA3 & GCAA licence' },
      ]
    }
  ];

  const aboutLinks = aboutPillars.flatMap((p) => p.items);

  const contactLinks = [
    { name: 'Station Offices & Headquarters', path: '/contact#stations', icon: MapPin, desc: 'Kotoka International Airport (ACC) Cargo Village' },
    { name: 'Regional Aerodromes', path: '/contact#regional', icon: Building2, desc: 'Kumasi (KMS) & Tamale (TML) regional operations' },
    { name: '24/7 Operations Control Centre', path: '/contact#occ', icon: PhoneCall, desc: 'Real-time apron coordination & flight dispatch' },
    { name: 'Request Handling Proposal (RFP)', path: '/contact#rfp', icon: FileCheck2, desc: 'Formal airline tenders, ad-hoc charters & service quotes' },
    { name: 'Help & Customer Inquiries', path: '/contact#inquiries', icon: Mail, desc: 'Executive lounge passes, inquiries & customer care' },
  ];

  const TURNAROUND_IMG = turnaroundImg;
  const LOUNGE_IMG = loungeImg;
  const SUPPORT_IMG = supportImg;

  // 4 Authentic Showcase Slides for Directory Sidebar
  const showcaseSlides = [
    {
      id: 1,
      image: turnaroundImg,
      title: 'Airline Ground Handling & Turnaround',
      desc: 'Precision ramp operations, pushback, and flight servicing at ACC, KMS & TML.'
    },
    {
      id: 2,
      image: loungeImg,
      title: 'Executive Adinkra Lounges',
      desc: 'World-class hospitality, VIP passenger comforts, and dedicated airport executive facilities.'
    },
    {
      id: 3,
      image: supportImg,
      title: 'Modern GSE & Fleet Engineering',
      desc: 'Certified ground support equipment, zero-emission engineering, and airside safety.'
    },
    {
      id: 4,
      image: cargoImg,
      title: 'EU RA3 Bonded Cargo Logistics',
      desc: 'Secure temperature-controlled cold-chain, pharmaceutical handling, and air freight logistics.'
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
      title: '30+ Years of Ground Handling Excellence at Kotoka Terminal 3',
      path: '/about'
    },
    {
      id: 'partners',
      image: supportImg,
      title: 'Trusted Ground Handling Partner for 40+ Global Airline Carriers',
      path: '/customers'
    },
    {
      id: 'standards',
      image: turnaroundImg,
      title: 'IATA ISAGO Registered & Regulated by GCAA Across Ghana',
      path: '/certifications'
    }
  ];

  const serviceHighlights = [
    {
      id: 'ramp',
      image: turnaroundImg,
      title: 'ISAGO-Accredited Apron Turnaround & Pushback Operations',
      path: '/ramp-handling'
    },
    {
      id: 'cargo',
      image: cargoImg,
      title: 'EU RA3-Validated Cold-Chain & Bonded Air Cargo Logistics',
      path: '/cargo'
    },
    {
      id: 'hospitality',
      image: loungeImg,
      title: 'Executive Adinkra Lounges & VIP Passenger Hospitality',
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
                Home
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
                  <span>About Us</span>
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
                                About Aviance
                              </h3>
                              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-xl">
                                Explore our 30+ year aviation heritage, executive leadership, certified ground handling standards, and customer airline partnerships across Ghana.{' '}
                                <button
                                  onClick={() => handleNav('/about')}
                                  className="font-bold text-[#204696] hover:text-[#153170] hover:underline cursor-pointer inline-flex items-center gap-1 ml-0.5"
                                >
                                  <span>Learn more</span>
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
                                Highlights
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
                  <span>Services</span>
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
                                Core Services
                              </h3>
                              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal max-w-xl">
                                Delivering ISAGO-certified ground turnaround, EU RA3 cold-chain cargo logistics, executive lounge hospitality, and GSE fleet maintenance across Ghana.{' '}
                                <button
                                  onClick={() => handleNav('/services')}
                                  className="font-bold text-[#204696] hover:text-[#153170] hover:underline cursor-pointer inline-flex items-center gap-1 ml-0.5"
                                >
                                  <span>Learn more</span>
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
                                Highlights
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
                CSR
              </button>

              <button
                onClick={() => handleNav('/news')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath.startsWith('/news')
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                News
              </button>

              <button
                onClick={() => handleNav('/careers')}
                className={`px-4 xl:px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold active:scale-95 ${
                  currentPath === '/careers'
                    ? 'text-[#204696] font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-[#204696] hover:bg-slate-50 hover:scale-[1.02]'
                }`}
              >
                Careers
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
                Contact
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
                          Aviation Services
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
                            <span>Explore all 9 aviation capabilities hub</span>
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
                          About Aviance Ghana
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
                            <span>Explore full corporate profile & heritage</span>
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
                        CSR & Community
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
                        News & Media
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
                        Careers
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
                        Contact & Station Offices
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#204696] group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                </div>

                {/* Ground Operations & Utilities Bar */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4">
                  {/* Mobile Language Selector */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-xs font-bold text-slate-700">Language:</span>
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code as LanguageCode);
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#204696] text-white shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            <FlagIcon code={lang.code} className="w-4 h-3" />
                            <span>{lang.label}</span>
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
                      <span className="text-slate-500 font-medium">24/7 Flight Operations Dispatch:</span>
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
                        <span>Airline Extranet</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <span>·</span>
                      <span className="font-mono text-[11px] text-slate-500">ACC · KMS · TML</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span>Ghana Civil Aviation Authority (GCAA) Licensed · IATA ISAGO Registered Ground Handler</span>
                    <span>Kotoka International Airport · Terminal 3 & Cargo Village</span>
                  </div>
                </div>

              </div>
            </div>
          </header>
    </>
  );
};
