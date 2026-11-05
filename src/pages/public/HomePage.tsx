import React, { useState, useEffect } from 'react';
import {
  Plane,
  ArrowRight,
  ShieldCheck,
  Luggage,
  PackageCheck,
  Armchair,
  Users,
  Wrench,
  Cpu,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Award,
  ExternalLink,
  ShieldAlert,
  Heart,
  TrendingUp,
  Compass,
  FileText,
  Play,
  Pause,
  Camera,
  X,
  Maximize2
} from 'lucide-react';
import { Service, LocationItem, Certification, NewsArticle, CustomerPartner } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { PARTNERS_DATA } from '../../data/partnersData';

// Airport images
import accraAirportImg from '../../assets/aviance_images/airports/Accra-International-Airport-940x560.png';
import kumasiAirportImg from '../../assets/aviance_images/airports/Kumasi_international_airport.jpg';
import tamaleAirportImg from '../../assets/aviance_images/airports/Temale_international_airport.png';

// All 10 authentic pictures from image_show folder
import imgEngineer from '../../assets/aviance_images/image_show/ee4669f3-9945-4b97-a86e-d28b9860138a.png';
import imgPushback from '../../assets/aviance_images/image_show/1791968160594.jpg';
import imgCargoVillage from '../../assets/aviance_images/image_show/1780574568846.jpg';
import imgCargoLoading from '../../assets/aviance_images/image_show/1759758700331.jpg';
import imgLoungeReception from '../../assets/aviance_images/image_show/c0c393c8-9128-4ce5-b464-28d0417a13b5.png';
import imgSolitair from '../../assets/aviance_images/image_show/1788350257403.jpg';
import imgEthiopianTeam from '../../assets/aviance_images/image_show/1776164623557.jpg';
import imgTrainingRoom from '../../assets/aviance_images/image_show/1740561240681.jpg';
import imgLoungeGuest from '../../assets/aviance_images/image_show/1791796143012.jpg';
import imgBrandGuest from '../../assets/aviance_images/image_show/1791796144202.jpg';


// Dynamic Logo Emblem Slideshow featuring authentic operations photography
import { EmblemSlideshow } from '../../components/public/EmblemSlideshow';
import { ScrollReveal } from '../../components/ui/ScrollReveal';


interface HomePageProps {
  services: Service[];
  locations: LocationItem[];
  certifications: Certification[];
  news: NewsArticle[];
  customers: CustomerPartner[];
  onNavigate: (path: string) => void;
  onOpenCargoModal: () => void;
  onOpenVipModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  locations,
  certifications,
  news,
  customers,
  onNavigate,
  onOpenCargoModal,
  onOpenVipModal: _onOpenVipModal,
}) => {
  const { isLight } = useTheme();

  // Complete 10 authentic photography collection from image_show folder
  const heroSlides = [
    {
      id: 'engineer',
      image: imgEngineer,
      alt: 'Aviance Ramp Technician with Headset at Aircraft Nose Gear Interphone',
      title: 'Airside Avionics & Flight Crew Interphone Liaison',
      category: 'Ramp Engineering',
      filterGroup: 'apron'
    },
    {
      id: 'pushback',
      image: imgPushback,
      alt: 'Aviance SCHOPF F300 Pushback Tractor Staging Boeing 787',
      title: 'Heavy Aircraft Pushback & Apron Turnaround',
      category: 'Apron Operations',
      filterGroup: 'apron'
    },
    {
      id: 'cargo-village',
      image: imgCargoVillage,
      alt: 'Aviance Cargo Village Bonded Warehouse Facility & Staff',
      title: 'Kotoka Cargo Village Bonded Terminal & Operations Team',
      category: 'Cargo Logistics',
      filterGroup: 'cargo'
    },
    {
      id: 'cargo-loading',
      image: imgCargoLoading,
      alt: 'Apron Handling Crew Staging Ethiopian Cargo AKE Container',
      title: 'High-Capacity Air Cargo & ULD Pallet Staging',
      category: 'Air Cargo Handling',
      filterGroup: 'cargo'
    },
    {
      id: 'lounge-reception',
      image: imgLoungeReception,
      alt: 'Aviance Adinkra Executive Lounge Reception & Concierge',
      title: 'Adinkra Executive Lounge Reception · Kotoka Terminal 3',
      category: 'Lounge Hospitality',
      filterGroup: 'lounge'
    },
    {
      id: 'solitair',
      image: imgSolitair,
      alt: 'SolitAir Flight Turnaround with UAE and Ghana Flags & Crew',
      title: 'International Airline Turnaround & Apron Coordination',
      category: 'Flight Turnaround',
      filterGroup: 'apron'
    },
    {
      id: 'ethiopian-team',
      image: imgEthiopianTeam,
      alt: 'Aviance Passenger Services Team with Ethiopian Airlines',
      title: 'Dedicated Passenger Handling & Commercial Airline Partnerships',
      category: 'Passenger Services',
      filterGroup: 'team'
    },
    {
      id: 'training-room',
      image: imgTrainingRoom,
      alt: 'Aviance Team in Hi-Vis Safety Gear Outside the Training Room',
      title: 'Aviation Safety Training Academy & Certified Ramp Crew',
      category: 'Training & Safety',
      filterGroup: 'team'
    },
    {
      id: 'lounge-guest',
      image: imgLoungeGuest,
      alt: 'Guest in Adinkra Executive Lounge: I am Aviance, I am Reliable',
      title: 'Executive Passenger Comfort & Reliable Hospitality',
      category: 'VIP Experience',
      filterGroup: 'lounge'
    },
    {
      id: 'brand-guest',
      image: imgBrandGuest,
      alt: 'Guest holding Aviance #StrongerTogether Emblem',
      title: 'Connecting Ghana to the World · #StrongerTogether',
      category: 'Trusted Brand',
      filterGroup: 'lounge'
    }
  ];

  const [heroViewMode, setHeroViewMode] = useState<'composite' | 'mockup'>('composite');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  // Lightbox modal state for gallery view
  const [activeLightboxImg, setActiveLightboxImg] = useState<{
    image: string;
    title: string;
    category: string;
    alt: string;
  } | null>(null);

  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'apron' | 'cargo' | 'lounge' | 'team'>('all');

  const SLIDE_DURATION = 5500;
  const PROGRESS_TICK = 50;

  // Auto-advance slideshow with smooth progress synchronization
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % heroSlides.length);
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlide(idx);
    setSlideProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setSlideProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setSlideProgress(0);
  };

  // Curated 8 Core Services Summary (Summary cards pointing to full service pages)
  const serviceSummaries = [
    {
      id: 'passenger',
      title: 'Passenger Services',
      slug: '/passenger-services',
      icon: Users,
      summary: 'DCS check-in, boarding gates, travel document verification, and dedicated PRM mobility care across Kotoka Terminal 3.',
      badge: 'Terminal Handling',
      tagColor: 'text-[#204696] bg-blue-50 border-blue-200'
    },
    {
      id: 'ramp',
      title: 'Ramp Handling',
      slug: '/ramp-handling',
      icon: Plane,
      summary: 'ISAGO-certified apron turnaround, towbarless pushback, 400Hz GPU power, and rapid precision baggage loading.',
      badge: 'ISAGO Accredited',
      tagColor: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    {
      id: 'cargo',
      title: 'Cargo Logistics',
      slug: '/cargo',
      icon: PackageCheck,
      summary: 'Handling ~60% of Ghana airfreight with EU RA3 certified bonded warehousing, dual-view X-ray, and cold vaults.',
      badge: '~60% Market Share',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'lounges',
      title: 'Lounge Hospitality',
      slug: '/lounge',
      icon: Armchair,
      summary: 'Operating 6 airport lounges including the premier Adinkra Executive Lounges and walk-in U Lounge ($25.00).',
      badge: '6 Lounges in Ghana',
      tagColor: 'text-amber-800 bg-amber-50 border-amber-200'
    },
    {
      id: 'vip',
      title: 'VIP & Charter Services',
      slug: '/vip-charter',
      icon: ShieldCheck,
      summary: 'Apron meet-and-greet, fast-track diplomatic facilitation, and ground turnaround for private jets and executive flights.',
      badge: 'Executive Handling',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200'
    },
    {
      id: 'occ',
      title: 'OCC Flight Operations',
      slug: '/operations',
      icon: Cpu,
      summary: '24/7 centralized nerve centre coordinating real-time flight staging, load control, Weight & Balance, and slot liaison.',
      badge: '24/7 Coordination',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      id: 'gse',
      title: 'GSE Fleet Maintenance',
      slug: '/gse-fleet-maintenance',
      icon: Wrench,
      summary: 'Airside engineering workshops maintaining motorized and non-motorized fleets with $1M+ eco-friendly investment.',
      badge: '$1M+ Eco Fleet',
      tagColor: 'text-slate-700 bg-slate-100 border-slate-200'
    },
    {
      id: 'baggage',
      title: 'Find My Bag & Tracing',
      slug: '/find-my-bag',
      icon: Luggage,
      summary: 'Dedicated passenger baggage tracing, WorldTracer system lookups, and 24/7 arrivals baggage claim desk at Terminal 3.',
      badge: 'WorldTracer Tracing',
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200'
    }
  ];

  // Curated 3 Airport Station Summaries (Summary for /operations)
  const stationSummaries = [
    {
      code: 'ACC',
      icao: 'DGAA',
      city: 'Accra, Greater Accra',
      name: 'Kotoka International Airport',
      role: 'Corporate Headquarters & Primary Hub',
      highlight: 'Terminal 3 & 2 passenger handling, 24/7 OCC nerve centre, EU RA3 bonded cargo terminal, and Adinkra lounges.',
      image: accraAirportImg
    },
    {
      code: 'KMS',
      icao: 'DGSI',
      city: 'Kumasi, Ashanti Region',
      name: 'Prempeh I International Airport',
      role: 'Ashanti Commercial & VIP Gateway',
      highlight: 'Full ramp turnaround, scheduled domestic flight facilitation, VIP delegations, and Adinkra CIP lounge services.',
      image: kumasiAirportImg
    },
    {
      code: 'TML',
      icao: 'DGLN',
      city: 'Tamale, Northern Region',
      name: 'Tamale International Airport',
      role: 'Northern Strategic Gateway',
      highlight: 'Commercial passenger turnarounds, agro-cargo freighters, and annual wide-body Hajj pilgrimage flight staging.',
      image: tamaleAirportImg
    }
  ];

  // Premier airline logos for summary showcase (12 prominent partners)
  const featuredAirlinePartners = PARTNERS_DATA.slice(0, 12);

  // Filtered gallery items
  const filteredGallery = galleryFilter === 'all'
    ? heroSlides
    : heroSlides.filter((item) => item.filterGroup === galleryFilter);

  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-20 sm:pb-28 lg:pb-36 bg-white">
      
      {/* 1. USER'S SIGNATURE HERO SECTION: BALANCED 50/50 BLUE & WHITE SPLIT WITH EXPANSIVE EMBLEM */}
      <section className="relative w-full overflow-hidden select-none bg-white">
        
        {/* Background Layer: Frosted Curved Glass Pane Split (~50% Glassy Blue / ~50% White) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Desktop & Tablet Curved Glass SVG Split */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full"
            viewBox="0 0 1440 820"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Translucent Glass Base Gradient - Vibrant, multi-depth royal cobalt */}
              <linearGradient id="glassBlueBase" x1="0%" y1="0%" x2="100%" y2="90%">
                <stop offset="0%" stopColor="#001D62" stopOpacity="0.95" />
                <stop offset="28%" stopColor="#003AA8" stopOpacity="0.88" />
                <stop offset="65%" stopColor="#004FD6" stopOpacity="0.84" />
                <stop offset="85%" stopColor="#0A5AE5" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#002A7E" stopOpacity="0.96" />
              </linearGradient>

              {/* Internal Caustic Refraction Glow - Optical light scattering inside curved glass */}
              <radialGradient id="glassCausticRefract" cx="58%" cy="42%" r="55%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.38" />
                <stop offset="35%" stopColor="#0284C7" stopOpacity="0.18" />
                <stop offset="75%" stopColor="#003EA8" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#001D62" stopOpacity="0" />
              </radialGradient>

              {/* Primary Diagonal Surface Specular Glare (Glass Light Sheen) */}
              <linearGradient id="glassSheenPrimary" x1="10%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
                <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Secondary Corner Light Reflection */}
              <linearGradient id="glassSheenSecondary" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Polished Glass Bevel Edge Specular Gradient */}
              <linearGradient id="glassEdgeStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="20%" stopColor="#E0F2FE" stopOpacity="0.90" />
                <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#93C5FD" stopOpacity="0.80" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
              </linearGradient>

              {/* Outer Glass Rim Caustic Bloom Gradient */}
              <linearGradient id="glassEdgeBloomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.70" />
                <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.80" />
                <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.60" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.75" />
              </linearGradient>

              {/* Soft Glass Rim Glow Filter */}
              <filter id="glassEdgeBlurFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              </filter>

              {/* Colored Glass Caustic Shadow Filter on White Surface */}
              <filter id="glassCausticShadowFilter" x="-20%" y="-20%" width="150%" height="150%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
              </filter>
            </defs>

            {/* Right Canvas: Clean Bright White */}
            <rect width="1440" height="820" fill="#FFFFFF" />

            {/* Subtle Air-Route Concentric Arcs across White Canvas */}
            <circle cx="1100" cy="410" r="320" stroke="rgba(32,70,150,0.035)" strokeWidth="1.5" />
            <circle cx="1100" cy="410" r="540" stroke="rgba(32,70,150,0.025)" strokeWidth="1.5" />
            <circle cx="1100" cy="410" r="760" stroke="rgba(32,70,150,0.015)" strokeWidth="1.5" />

            {/* 1. Cast Glass Caustic Shadow onto the White Surface (Colored glass shadow) */}
            <path
              d="M 0 0 L 590 0 C 560 250, 665 500, 710 620 C 790 800, 770 760, 800 820 L 0 820 Z"
              fill="#0047C4"
              opacity="0.35"
              filter="url(#glassCausticShadowFilter)"
            />

            {/* 2. Main Frosted Royal Blue Glass Body */}
            <path
              d="M 0 0 L 580 0 C 550 250, 655 500, 700 620 C 780 800, 760 760, 790 820 L 0 820 Z"
              fill="url(#glassBlueBase)"
            />

            {/* 3. Internal Caustic Light Refraction (Deep cyan dispersion inside glass) */}
            <path
              d="M 0 0 L 580 0 C 550 250, 655 500, 700 620 C 780 800, 760 760, 790 820 L 0 820 Z"
              fill="url(#glassCausticRefract)"
            />

            {/* 4. Aeronautical Radar Rings Visible Through Translucent Glass */}
            <circle cx="140" cy="220" r="280" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="140" cy="220" r="460" stroke="rgba(56,189,248,0.14)" strokeWidth="1.5" />
            <circle cx="140" cy="220" r="640" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* 5. Diagonal Specular Glass Surface Glare (Light Sheen sweep across glass) */}
            <path
              d="M 0 0 L 580 0 C 540 180, 410 320, 220 480 L 0 540 Z"
              fill="url(#glassSheenPrimary)"
            />
            <path
              d="M 0 60 L 440 0 L 320 0 L 0 240 Z"
              fill="url(#glassSheenSecondary)"
            />

            {/* 6. Polished Specular Glass Beveled Edge (Curved glass rim highlights) */}
            {/* Outer Caustic Edge Bloom */}
            <path
              d="M 580 0 C 550 250, 655 500, 700 620 C 780 800, 760 760, 790 820"
              stroke="url(#glassEdgeBloomGrad)"
              strokeWidth="9"
              opacity="0.45"
              filter="url(#glassEdgeBlurFilter)"
              fill="none"
            />

            {/* Physical Glass Bevel Highlight (3px) */}
            <path
              d="M 580 0 C 550 250, 655 500, 700 620 C 780 800, 760 760, 790 820"
              stroke="url(#glassEdgeStrokeGrad)"
              strokeWidth="3.2"
              fill="none"
            />

            {/* Razor-Sharp Pure White Specular Glint Core (1.2px) */}
            <path
              d="M 580 0 C 550 250, 655 500, 700 620 C 780 800, 760 760, 790 820"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.95"
              fill="none"
            />

            {/* Inner Refraction Shadow Line (Gives 3D physical glass thickness) */}
            <path
              d="M 577 0 C 547 250, 652 500, 697 620 C 777 800, 757 760, 787 820"
              stroke="rgba(0, 15, 50, 0.35)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/* Mobile / Tablet Responsive Fallback with Glass Sheen (< lg) */}
          <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
            {/* Deep Royal Glass Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001D62] via-[#003AA8] via-65% to-white" />

            {/* Specular Ambient Glow Orbs with Floating Breathing Glow */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-400/25 blur-3xl pointer-events-none animate-halo-pulse" />
            <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-[#009EE0]/20 blur-3xl pointer-events-none animate-ai-breathe" />

            {/* Subtle Aeronautical Radar Canvas with Smooth Rotating Sweep Line */}
            <svg className="absolute top-6 left-1/2 -translate-x-1/2 w-[580px] h-[360px] opacity-30 pointer-events-none" viewBox="0 0 580 360">
              <circle cx="290" cy="180" r="80" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 5" fill="none" />
              <circle cx="290" cy="180" r="140" stroke="rgba(56,189,248,0.3)" strokeWidth="1.2" fill="none" />
              <circle cx="290" cy="180" r="220" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 8" fill="none" />
              <line x1="70" y1="180" x2="510" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 4" />
              <line x1="290" y1="20" x2="290" y2="340" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 4" />
              
              {/* Animated Radar Sweep Beam */}
              <g className="animate-radar-sweep">
                <line x1="290" y1="180" x2="290" y2="40" stroke="url(#radarGradient)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#72BF44" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#009EE0" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>


        {/* Hero Content Container */}
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 pt-36 sm:pt-48 lg:py-16 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Column: Exactly on Solid Royal Blue Canvas */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start relative z-20">

              {/* Main Display Headline: Confident, Big & Impactful on Mobile */}
              <h1 className="animate-blur-reveal animation-delay-100 text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.18] sm:leading-[1.12]">
                Ground Handling & Cargo Operations <br className="hidden sm:inline" />
                <span className="text-[#72BF44] drop-shadow-sm block sm:inline mt-1 sm:mt-0">Across Ghana's Premier Airports.</span>
              </h1>

              {/* Executive Subtitle: Crisp & Highly Legible on Mobile Devices */}
              <p className="animate-blur-reveal animation-delay-250 text-sm xs:text-[15px] sm:text-base md:text-lg text-blue-100/95 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0">
                Connecting Ghana to the world with ISAGO-certified ground operations, cold-chain cargo logistics, and executive airport hospitality across Accra, Kumasi, and Tamale.
              </p>

              {/* Action Buttons: Thumb-Friendly & Shimmering on Mobile */}
              <div className="animate-blur-reveal animation-delay-400 pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5 flex-wrap">
                <button
                  onClick={() => onNavigate('/services')}
                  className="relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#009EE0] hover:bg-[#0089C4] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#009EE0]/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {/* Subtle animated gleam on the primary button */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-button-shimmer" />
                  <span className="relative z-10">Explore Services</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => onNavigate('/about')}
                  className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/12 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-white/25 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center cursor-pointer text-center"
                >
                  About Aviance
                </button>
              </div>
            </div>

            {/* Right Column: Expansive Dynamic Logo Slideshow Showcase */}
            <div className="animate-fade-in-right animation-delay-200 lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-end xl:items-center justify-center relative py-2 lg:py-4 pl-0 lg:pl-8 xl:pl-12 w-full mt-6 sm:mt-8 lg:mt-0">
              
              {/* Mobile Floating Micro-Badges with Gentle Levitation */}
              <div className="lg:hidden w-full flex items-center justify-between px-2 max-w-[440px] xs:max-w-[480px] mb-3 pointer-events-none">
                <div className="animate-float-slow px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-1.5 text-[10px] font-bold text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-pulse" />
                  <span>100% Safety Standard</span>
                </div>
                <div className="animate-float-slow animation-delay-300 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-1.5 text-[10px] font-bold text-[#204696]">
                  <span>✈ 42+ Airlines Handled</span>
                </div>
              </div>

              <EmblemSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION — EXECUTIVE SUMMARY & DIRECT ACCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Comprehensive Ground Operations <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">ISAGO Certified</span>
                </h2>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Our Core Services at a Glance
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Aviance Ghana delivers safe, certified ground handling across terminal, apron, cargo, and hospitality operations. Click any service below to view full operational details, SLAs, and rate specifications on our dedicated pages.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-md shadow-[#204696]/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Explore All Services & Rates</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 8 Concise Service Summary Cards with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceSummaries.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <ScrollReveal key={svc.id} animation="fade-up" delay={idx * 60}>
                <div
                  onClick={() => onNavigate(svc.slug)}
                  className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#204696]/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-50 text-[#204696] group-hover:bg-[#204696] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${svc.tagColor}`}>
                        {svc.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-base lg:text-lg font-bold text-slate-900 group-hover:text-[#204696] transition-colors mb-2">
                      {svc.title}
                    </h3>

                    <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                      {svc.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#204696] group-hover:text-[#0C1E4A] inline-flex items-center gap-1">
                      <span>View Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Page Details →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>




      {/* 5. OPERATIONAL FOOTPRINT & AIRPORT NETWORK SUMMARY (Points to /operations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                    Nationwide Airport Network <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Accra · Kumasi · Tamale</span>
                  </h2>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Operating Across Ghana's Key Commercial Air Gateways
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Aviance Ghana maintains certified ground handling stations, ramp equipment fleets, and passenger operations across 3 premier airports.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/operations')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#204696]/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shrink-0 cursor-pointer self-start md:self-auto group"
              >
                <span>View Full Operations & Map</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

            {/* 3 Station Summary Cards with Staggered ScrollReveal */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {stationSummaries.map((station, idx) => (
                <ScrollReveal key={station.code} animation="fade-up" delay={idx * 100}>
                  <div
                    onClick={() => onNavigate('/operations')}
                    className="p-6 sm:p-8 flex flex-col justify-between space-y-4 hover:bg-slate-50/80 transition-all duration-300 cursor-pointer group h-full"
                  >
                    <div className="space-y-4">
                      {/* Photo Thumbnail */}
                      <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200">
                        <img
                          src={station.image}
                          alt={station.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md group-hover:bg-[#204696] transition-colors duration-300">
                          {station.code} · {station.icao}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#204696] uppercase tracking-wider block">
                          {station.role}
                        </span>
                        <h3 className="text-xl sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-[#204696] transition-colors mt-0.5">
                          {station.name}
                        </h3>
                        <p className="text-xs sm:text-xs text-slate-500 mt-0.5">{station.city}</p>
                      </div>

                      <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 leading-relaxed">
                        {station.highlight}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#204696]">
                      <span>Operational Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* 6. AIRLINE PARTNERS SUMMARY (Points to /customers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Trusted Aviation Partnerships <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Global Airlines & Freighters</span>
              </h2>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Over 40 Global Airlines & Cargo Freighters
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From scheduled flag carriers to intercontinental cargo giants and diplomatic airlift missions, international operators count on Aviance Ghana for on-time turnaround excellence.
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Logo Summary Grid with Staggered ScrollReveal */}
        <div className="grid mt-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredAirlinePartners.map((partner, idx) => (
            <ScrollReveal key={partner.id} animation="zoom-in" delay={idx * 35}>
              <div
                onClick={() => onNavigate('/customers')}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#204696] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center h-24 group"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                />
                <span className="text-[10px] text-slate-500 font-semibold mt-1 group-hover:text-[#204696] transition-colors truncate max-w-full">
                  {partner.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA to Full Customers Page */}
        <div>
          <button
            onClick={() => onNavigate('/customers')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 hover:bg-[#204696] border border-slate-200 hover:border-[#204696] text-slate-700 hover:text-white font-bold text-xs shadow-xs transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <span>View All 42 Airline Partners, Aircraft Fleets & Handling Scope</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </section>


      {/* 7. VERIFIED CERTIFICATIONS & ACCREDITATION BANNER (Points to /certifications) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden relative group hover:shadow-xl transition-all duration-300">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            <div className="p-8 sm:p-10 bg-gradient-to-r from-blue-50/50 via-white to-emerald-50/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                <div className="space-y-2 md:col-span-2 text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3B7A1C]">
                      Audited & Certified Safety Leadership <span className="text-[#204696]">·</span> <span className="text-[#009EE0]">IATA ISAGO & GCAA</span>
                    </h2>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    IATA ISAGO Accredited · Certificate ISAGO-ACC-24-2419
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-700">
                    Accredited under the IATA Safety Audit for Ground Operations (ISAGO) at Kotoka International Airport (ACC) through <strong>January 21, 2027</strong>. Supported by European Union Cargo RA3 security accreditation and Ghana Civil Aviation Authority licenses.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
                  <button
                    onClick={() => onNavigate('/certifications')}
                    className="px-5 py-2.5 rounded-lg bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-xs transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-center cursor-pointer"
                  >
                    Inspect Official Certifications
                  </button>
                  <button
                    onClick={() => onNavigate('/code-of-conduct')}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-xs font-bold text-center transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer"
                  >
                    Code of Conduct & Compliance
                  </button>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>


      {/* 8. CSR & COMMUNITY IMPACT SUMMARY (Points to /csr) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Corporate Social Responsibility <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Giving Back to Ghana</span>
              </h2>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900">
              Community Impact & Sustainable Aviation
            </h3>
            <p className="text-xs text-slate-600">
              Winner of the <strong>Excellence in CSR Award</strong> at the 2025 Ghana Shippers’ Authority Awards.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <ScrollReveal animation="fade-up" delay={0}>
            <div
              onClick={() => onNavigate('/csr')}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-[#204696]/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
            >
              <div className="p-2.5 rounded-lg bg-blue-50 text-[#204696] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 w-fit">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-sm lg:text-base text-slate-900 group-hover:text-[#204696] transition-colors">
                Autism Flight Travel Rehearsal
              </h4>
              <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 leading-relaxed">
                Partnering with Emirates Airlines to support autistic children through a guided airport and cabin travel simulation.
              </p>
              <span className="text-xs font-bold text-[#204696] inline-flex items-center gap-1 pt-1">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <div
              onClick={() => onNavigate('/csr')}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-[#204696]/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
            >
              <div className="p-2.5 rounded-lg bg-[#72BF44]/10 text-[#55942B] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 w-fit">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-sm lg:text-base text-slate-900 group-hover:text-[#204696] transition-colors">
                Orbis Flying Eye Hospital
              </h4>
              <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 leading-relaxed">
                Full ground handling partner for the flying ophthalmic teaching hospital during its sight-restoring medical missions in Ghana.
              </p>
              <span className="text-xs font-bold text-[#204696] inline-flex items-center gap-1 pt-1">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <div
              onClick={() => onNavigate('/csr')}
              className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-[#204696]/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
            >
              <div className="p-2.5 rounded-lg bg-sky-50 text-[#009EE0] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 w-fit">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base sm:text-sm lg:text-base text-slate-900 group-hover:text-[#204696] transition-colors">
                Education & Future Stars
              </h4>
              <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 leading-relaxed">
                Built a 6-unit school block in Kalande (Savannah Region) with McDan Foundation and partnered with Future Stars charity.
              </p>
              <span className="text-xs font-bold text-[#204696] inline-flex items-center gap-1 pt-1">
                <span>Read Story</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </div>
          </ScrollReveal>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('/csr')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-[#204696] bg-white hover:bg-slate-50 text-slate-800 hover:text-[#204696] font-bold text-xs shadow-xs transition-all duration-300 hover:scale-105 group cursor-pointer"
          >
            <span>Explore All CSR Programs & Impact Reports</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </section>


      {/* 9. LATEST NEWS & PRESS RELEASES SUMMARY (Points to /news) */}
      <section className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#204696]">News & Media</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Updates from Aviance Ghana
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/news')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#204696] border border-slate-200 hover:border-[#204696] text-xs font-bold text-slate-700 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer group shrink-0 self-start sm:self-auto"
            >
              <span>All Articles & Press Releases</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(news && news.length > 0 ? news.slice(0, 3) : []).map((item, idx) => (
            <ScrollReveal key={item.id} animation="fade-up" delay={idx * 100}>
              <article
                onClick={() => onNavigate(`/news/${item.slug}`)}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#204696]/40 text-left flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={item.featuredImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F2E53]/90 backdrop-blur-md text-white shadow-sm border border-white/10">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <h4 className="font-bold text-lg sm:text-base leading-snug text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-xs lg:text-[13px] text-slate-600 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                  </div>
                </div>
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#204696]">
                  <span className="inline-flex items-center gap-1 group-hover:text-[#0C1E4A]">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Official Release →
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};
