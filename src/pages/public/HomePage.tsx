import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Camera,
  X,
  Maximize2
} from 'lucide-react';
import { Service, LocationItem, Certification, NewsArticle, CustomerPartner } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { PARTNERS_DATA } from '../../data/partnersData';

// Airport images
import accraAirportImg from '../../assets/aviance_images/airports/Accra-International-Airport-940x560.png';
import kumasiAirportImg from '../../assets/aviance_images/airports/Kumasi_international_airport.jpg';
import tamaleAirportImg from '../../assets/aviance_images/airports/Temale_international_airport.png';

// CSR highlights photography
import csrVolunteerImg from '../../assets/aviance_images/csr/f52640_f8ef59f1440d4978b12d7af42b0b0782~mv2.jpg';
import csrChildLiftImg from '../../assets/aviance_images/csr/f52640_831252991b76460598417e8e658fbafc~mv2.jpg';
import csrClassroomArtImg from '../../assets/aviance_images/csr/f52640_1fecac509d4c4c9faed3422942694808~mv2.jpg';

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

// Authentic service photography for horizontal capabilities showcase
import svcPassengerImg from '../../assets/aviance_images/services/passenger_services.jpg';
import svcRampImg from '../../assets/aviance_images/services/ramp_handling.jpg';
import svcCargoImg from '../../assets/aviance_images/services/cargo_services.jpg';
import svcLoungeImg from '../../assets/aviance_images/services/lounge_services.jpg';
import svcVipImg from '../../assets/aviance_images/services/vip_charter.jpg';
import svcFlightOpsImg from '../../assets/aviance_images/services/flight_ops.jpg';
import svcGseImg from '../../assets/aviance_images/services/gse_maintenance.jpg';
import svcFindMyBagImg from '../../assets/aviance_images/services/find_my_bag.jpg';


// Dynamic Logo Emblem Slideshow featuring authentic operations photography
import { EmblemSlideshow } from '../../components/public/EmblemSlideshow';
import { PartnerRadarWeb } from '../../components/public/PartnerRadarWeb';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { AvianceLogo } from '../../components/ui/AvianceLogo';
import { SlidePagination } from '../../components/ui/SlidePagination';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';


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
  const { language, t } = useLanguage();
  const isFr = language === 'fr';

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

  // Unified Hero Gestures (Touch Swipe & Desktop Mouse Drag)
  const { handlers: heroSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: handleNextSlide,
    onSwipeRight: handlePrevSlide,
    threshold: 45,
    enableMouseDrag: true,
  });

  // Horizontal Core Services Slider State
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [isServicePaused, setIsServicePaused] = useState(false);

  // Curated 8 Core Services
  const serviceSummaries = [
    {
      id: 'passenger',
      tabLabel: 'Passenger Services',
      title: 'Passenger Handling',
      category: 'Terminal Services',
      slug: '/passenger-services',
      summary: 'DCS check-in, boarding gate management, travel document verification, and dedicated PRM mobility care across Kotoka Terminal 3 and regional stations.',
      image: svcPassengerImg,
      alt: 'Aviance Passenger Services Check-in Desk',
      imagePosition: 'object-top'
    },
    {
      id: 'ramp',
      tabLabel: 'Ramp Handling',
      title: 'Ramp Handling',
      category: 'Airside Operations',
      slug: '/ramp-handling',
      summary: 'ISAGO-certified apron turnaround, precision towbarless pushback, 400Hz ground power, and rapid baggage and cargo transfer.',
      image: svcRampImg,
      alt: 'Aviance Ramp Handling Apron Operations',
      imagePosition: 'object-[center_35%]'
    },
    {
      id: 'cargo',
      tabLabel: 'Cargo Logistics',
      title: 'Cargo Handling',
      category: 'Air Freight',
      slug: '/cargo',
      summary: 'EU RA3-certified bonded warehousing, automated dual-view X-ray screening, and temperature-controlled cold rooms handling ~60% of Ghana airfreight.',
      image: svcCargoImg,
      alt: 'Aviance Cargo Handling Bonded Facility',
      imagePosition: 'object-[center_20%]'
    },
    {
      id: 'lounges',
      tabLabel: 'Executive Lounges',
      title: 'Airport Lounges',
      category: 'Hospitality',
      slug: '/lounge',
      summary: 'Premier airport hospitality across 6 lounges in Ghana, including the flagship Adinkra Executive Lounges and walk-in U Lounge at Terminal 3.',
      image: svcLoungeImg,
      alt: 'Aviance Adinkra Executive Lounge',
      imagePosition: 'object-center'
    },
    {
      id: 'vip',
      tabLabel: 'VIP & Charter',
      title: 'VIP & Executive Aviation',
      category: 'Executive Handling',
      slug: '/vip-charter',
      summary: 'Dedicated apron meet-and-greet protocol, fast-track customs facilitation, and ground turnaround for private jets, diplomatic flights, and charters.',
      image: svcVipImg,
      alt: 'Aviance VIP and Charter Aircraft Handling',
      imagePosition: 'object-top'
    },
    {
      id: 'occ',
      tabLabel: 'Flight Operations',
      title: 'OCC Flight Operations',
      category: 'Flight Operations',
      slug: '/operations',
      summary: '24/7 centralized flight watch, real-time VHF airside coordination, and computerized weight and balance load control.',
      image: svcFlightOpsImg,
      alt: 'Aviance Operations Control Centre OCC',
      imagePosition: 'object-[center_30%]'
    },
    {
      id: 'gse',
      tabLabel: 'GSE Maintenance',
      title: 'GSE Fleet Maintenance',
      category: 'Airside Engineering',
      slug: '/gse-fleet-maintenance',
      summary: 'Airside engineering workshops maintaining motorized and non-motorized ground support equipment with ongoing $1M+ eco-fleet modernization.',
      image: svcGseImg,
      alt: 'Aviance GSE Fleet Engineering Workshop',
      imagePosition: 'object-[center_35%]'
    },
    {
      id: 'baggage',
      tabLabel: 'Baggage Services',
      title: 'Baggage Services & Tracing',
      category: 'Passenger Care',
      slug: '/find-my-bag',
      summary: '24/7 arrivals baggage claim desk at Kotoka Terminal 3 integrated with the global SITA WorldTracer network for fast luggage tracing.',
      image: svcFindMyBagImg,
      alt: 'Aviance Baggage Services Helpdesk',
      imagePosition: 'object-center'
    }
  ];

  // Auto-advance service slider when not paused/hovered (4.8s cycle)
  useEffect(() => {
    if (isServicePaused) return;
    const timer = setInterval(() => {
      setActiveServiceSlide((prev) => (prev + 1) % serviceSummaries.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isServicePaused, serviceSummaries.length]);

  // Unified Service Showcase Gestures (Touch Swipe & Desktop Mouse Drag)
  const { handlers: serviceSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setActiveServiceSlide((prev) => (prev + 1) % serviceSummaries.length),
    onSwipeRight: () => setActiveServiceSlide((prev) => (prev === 0 ? serviceSummaries.length - 1 : prev - 1)),
    threshold: 45,
    enableMouseDrag: true,
  });

  // Curated 3 Airport Station Summaries (Summary for /operations)
  const stationSummaries = [
    {
      code: 'ACC',
      icao: 'DGAA',
      city: 'Accra, Greater Accra',
      name: language === 'fr' ? 'Aéroport International de Kotoka' :
            language === 'es' ? 'Aeropuerto Internacional Kotoka' :
            language === 'de' ? 'Kotoka International Airport' :
            language === 'pt' ? 'Aeroporto Internacional de Kotoka' :
            language === 'zh' ? '科托卡国际机场' :
            language === 'ar' ? 'مطار كوتوكا الدولي' :
            'Kotoka International Airport',
      role: 'Corporate Headquarters & Primary Hub',
      highlight: 'Terminal 3 & 2 passenger handling, 24/7 OCC nerve centre, EU RA3 bonded cargo terminal, and Adinkra lounges.',
      image: accraAirportImg,
      imagePosition: 'object-[center_35%]'
    },
    {
      code: 'KMS',
      icao: 'DGSI',
      city: 'Kumasi, Ashanti Region',
      name: language === 'fr' ? 'Aéroport International Prempeh I' :
            language === 'es' ? 'Aeropuerto Internacional Prempeh I' :
            language === 'de' ? 'Prempeh I International Airport' :
            language === 'pt' ? 'Aeroporto Internacional Prempeh I' :
            language === 'zh' ? '普伦佩一世国际机场' :
            language === 'ar' ? 'مطار بريمبيه الأول الدولي' :
            'Prempeh I International Airport',
      role: 'Ashanti Commercial & VIP Gateway',
      highlight: 'Full ramp turnaround, scheduled domestic flight facilitation, VIP delegations, and Adinkra CIP lounge services.',
      image: kumasiAirportImg,
      imagePosition: 'object-[center_65%]'
    },
    {
      code: 'TML',
      icao: 'DGLN',
      city: 'Tamale, Northern Region',
      name: language === 'fr' ? 'Aéroport International de Tamale' :
            language === 'es' ? 'Aeropuerto Internacional de Tamale' :
            language === 'de' ? 'Tamale International Airport' :
            language === 'pt' ? 'Aeroporto Internacional de Tamale' :
            language === 'zh' ? '塔马利国际机场' :
            language === 'ar' ? 'مطار تامالي الدولي' :
            'Tamale International Airport',
      role: 'Northern Strategic Gateway',
      highlight: 'Commercial passenger turnarounds, agro-cargo freighters, and annual wide-body Hajj pilgrimage flight staging.',
      image: tamaleAirportImg,
      imagePosition: 'object-[center_45%]'
    }
  ];

  // Curated 3 CSR Community Highlights (Full-bleed showcase matching Airport cards)
  const csrHighlights = [
    {
      id: 'autism',
      title: language === 'fr' ? 'Répétition de Voyage Aérien pour Personnes Autistes' :
             language === 'es' ? 'Simulacro de Viaje Aéreo para Personas con Autismo' :
             language === 'de' ? 'Flugreise-Training für Menschen mit Autismus' :
             language === 'pt' ? 'Ensaio de Viagem Aérea para Pessoas com Autismo' :
             language === 'zh' ? '自闭症群体飞行出行无障碍模拟演练' :
             language === 'ar' ? 'برنامج محاكاة السفر الجوي لذوي التوحد' :
             'Autism Flight Travel Rehearsal',
      image: csrVolunteerImg,
      path: '/csr',
      imagePosition: 'object-[center_25%]'
    },
    {
      id: 'orbis',
      title: language === 'fr' ? 'Hôpital Ophtalmique Volant Orbis' :
             language === 'es' ? 'Hospital Ocular Volador Orbis' :
             language === 'de' ? 'Fliegende Augenklinik Orbis' :
             language === 'pt' ? 'Hospital Oftalmológico Voador Orbis' :
             language === 'zh' ? '奥比斯眼科飞机医院保障' :
             language === 'ar' ? 'مستشفى العيون الطائر أوربيس' :
             'Orbis Flying Eye Hospital',
      image: csrChildLiftImg,
      path: '/csr',
      imagePosition: 'object-[center_35%]'
    },
    {
      id: 'education',
      title: language === 'fr' ? 'Éducation & Étoiles de Demain' :
             language === 'es' ? 'Educación y Estrellas del Futuro' :
             language === 'de' ? 'Bildung & Zukunftssterne' :
             language === 'pt' ? 'Educação e Futuras Estrelas' :
             language === 'zh' ? '青少年教育与未来之星扶助' :
             language === 'ar' ? 'التعليم ودعم نجوم المستقبل' :
             'Education & Future Stars',
      image: csrClassroomArtImg,
      path: '/csr',
      imagePosition: 'object-center'
    }
  ];

  // Rolling News Carousel State & Logic (Swissport-Inspired Rolling Showcase)
  const [newsSlide, setNewsSlide] = useState(0);
  const [isNewsPaused, setIsNewsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const newsContainerRef = useRef<HTMLDivElement | null>(null);
  const [newsTrackOffset, setNewsTrackOffset] = useState(0);

  // Curated up to 9 fresh articles for continuous rolling
  const rollingNews = (news && news.length > 0 ? news : []).slice(0, 9);

  // Media count per article for Swissport-style tag
  const getMediaCount = (slug: string): number => {
    const counts: Record<string, number> = {
      'aviance-ghana-emerges-as-overall-champions-at-tf-group-games': 4,
      'aviance-ghana-walks-for-breast-cancer-awareness-in-asante-mampong': 3,
      'aviance-ghana-supports-the-orbis-flying-eye-hospital-programme': 3,
      'aviance-ghana-commences-domestic-operations': 3,
      'aviance-ghana-hosts-uk-parliamentary-delegation': 2,
      'aviance-ghana-at-2024-asogli-yam-festival': 2,
      'we-are-expanding-our-horizons': 2,
      'aviance-ghana-wins-best-growing-company-cargo-ground-handler-of-the-year-air-2024': 2,
      'celebrating-25-years': 2,
      'remembrance-day-at-aviance': 2,
    };
    return counts[slug] || 1;
  };

  const updateNewsOffset = useCallback((index: number, perView: number) => {
    if (!newsContainerRef.current) return;
    const containerWidth = newsContainerRef.current.offsetWidth;
    const gap = 24; // 1.5rem (gap-6)
    const cardWidth = (containerWidth - (perView - 1) * gap) / perView;
    const step = cardWidth + gap;
    setNewsTrackOffset(index * step);
  }, []);

  // Update visible cards on screen resize
  useEffect(() => {
    const handleResize = () => {
      let perView = 3;
      if (window.innerWidth < 768) {
        perView = 1;
      } else if (window.innerWidth < 1024) {
        perView = 2;
      }
      setItemsPerView(perView);
      setNewsSlide((prev) => {
        const maxIdx = Math.max(0, rollingNews.length - perView);
        const clamped = Math.min(prev, maxIdx);
        updateNewsOffset(clamped, perView);
        return clamped;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [rollingNews.length, updateNewsOffset]);

  // Recalculate track position whenever newsSlide or itemsPerView updates
  useEffect(() => {
    updateNewsOffset(newsSlide, itemsPerView);
  }, [newsSlide, itemsPerView, updateNewsOffset]);

  // Continuous auto-advance every 4.8s when not hovered
  useEffect(() => {
    if (isNewsPaused || rollingNews.length <= itemsPerView) return;
    const timer = setInterval(() => {
      setNewsSlide((prev) => {
        const maxIdx = Math.max(0, rollingNews.length - itemsPerView);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 4800);
    return () => clearInterval(timer);
  }, [isNewsPaused, rollingNews.length, itemsPerView]);

  const maxNewsIndex = Math.max(0, rollingNews.length - itemsPerView);

  const handlePrevNews = () => {
    setNewsSlide((prev) => (prev <= 0 ? maxNewsIndex : prev - 1));
  };

  const handleNextNews = () => {
    setNewsSlide((prev) => (prev >= maxNewsIndex ? 0 : prev + 1));
  };

  // Unified News Carousel Gestures (Touch Swipe & Desktop Mouse Drag)
  const { handlers: newsSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: handleNextNews,
    onSwipeRight: handlePrevNews,
    threshold: 45,
    enableMouseDrag: true,
  });


  // Filtered gallery items
  const filteredGallery = galleryFilter === 'all'
    ? heroSlides
    : heroSlides.filter((item) => item.filterGroup === galleryFilter);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-20 sm:pb-28 lg:pb-36 bg-white">
      
      {/* 1. USER'S SIGNATURE HERO SECTION: BALANCED 50/50 BLUE & WHITE SPLIT (DESKTOP) / CINEMATIC FULL-SCREEN SLIDESHOW (MOBILE) */}
      <section
        className="relative w-full overflow-hidden select-none bg-white cursor-grab active:cursor-grabbing"
        {...heroSwipeHandlers}
      >
        
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

          {/* Mobile & Tablet Full-Bleed Dynamic Operations Slideshow (< lg) */}
          <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
            {/* Dynamic Authentic Photo Slides */}
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={`mobile-bg-${slide.id}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              );
            })}

            {/* Rich Aviance Royal Blue Gradient Scrim & Glass Filter */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001447]/70 via-[#001855]/40 via-50% to-[#001447]/80" />

            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-16 w-80 h-80 rounded-full bg-[#009EE0]/20 blur-3xl pointer-events-none" />

            {/* Subtle Aeronautical Radar Canvas with Smooth Rotating Sweep Line */}
            <svg className="absolute top-6 left-1/2 -translate-x-1/2 w-[580px] h-[360px] opacity-25 pointer-events-none" viewBox="0 0 580 360">
              <circle cx="290" cy="180" r="80" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 5" fill="none" />
              <circle cx="290" cy="180" r="140" stroke="rgba(56,189,248,0.3)" strokeWidth="1.2" fill="none" />
              <circle cx="290" cy="180" r="220" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 8" fill="none" />
              <line x1="70" y1="180" x2="510" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 4" />
              <line x1="290" y1="20" x2="290" y2="340" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="2 4" />
              
              {/* Animated Radar Sweep Beam */}
              <g className="animate-radar-sweep">
                <line x1="290" y1="180" x2="290" y2="40" stroke="url(#radarGradientMobile)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
              <defs>
                <linearGradient id="radarGradientMobile" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#72BF44" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#009EE0" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>


        {/* Hero Content Container */}
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 pt-28 sm:pt-36 lg:py-16 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
            
            {/* Left Column: Responsive Text, Live Status & Mobile Slide Controller */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start relative z-20">

              {/* Main Display Headline: Confident, Big & Impactful on Mobile */}
              <h1 className="animate-blur-reveal animation-delay-100 text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-bold tracking-[-0.028em] text-white leading-[1.14] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                {isFr ? 'Assistance en Escale & Fret Aérien' : 'Ground Handling & Cargo Operations'} <br className="hidden sm:inline" />
                <span className="text-[#72BF44] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] block sm:inline mt-1 sm:mt-0">
                  {isFr ? 'Sur les Principaux Aéroports du Ghana.' : "Across Ghana's Premier Airports."}
                </span>
              </h1>

              {/* Executive Subtitle: Crisp & Highly Legible on Mobile Devices */}
              <p className="animate-blur-reveal animation-delay-250 text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-normal max-w-lg mx-auto lg:mx-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                {isFr
                  ? 'Connecter le Ghana au monde avec des opérations au sol certifiées ISAGO, une logistique de fret sous chaîne du froid et des salons aéroportuaires de prestige à Accra, Kumasi et Tamale.'
                  : 'Connecting Ghana to the world with ISAGO-certified ground operations, cold-chain cargo logistics, and executive airport hospitality across Accra, Kumasi, and Tamale.'}
              </p>

              {/* Action Buttons */}
              <div className="animate-blur-reveal animation-delay-400 pt-1 sm:pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5 flex-wrap">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#009EE0] hover:bg-[#0089C4] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#009EE0]/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{isFr ? 'Explorer les Services' : 'Explore Services'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => onNavigate('/about')}
                  className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/12 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center cursor-pointer text-center"
                >
                  {isFr ? 'À Propos d\'Aviance' : 'About Aviance'}
                </button>
              </div>
            </div>

            {/* Right Column: Expansive Dynamic Logo Slideshow Showcase (Desktop Only, lg:flex) */}
            <div className="hidden lg:flex animate-fade-in-right animation-delay-200 lg:col-span-7 xl:col-span-7 flex-col items-center lg:items-end xl:items-center justify-center relative py-2 lg:py-4 pl-0 lg:pl-8 xl:pl-12 w-full mt-6 sm:mt-8 lg:mt-0">
              <EmblemSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION — SPLIT SHOWCASE WITH AIRPORT-STYLE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side: Section Intro, Button & Slider Controls */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
            <ScrollReveal animation="fade-up">
              <div className="space-y-3.5">
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.14]">
                  {isFr ? 'Nos Services Aéronautiques' : 'Core Aviation Services'}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {isFr
                    ? 'Aviance Ghana assure une assistance au sol sûre et certifiée pour le terminal, le tarmac, le fret et les salons VIP. Parcourez chaque service ci-dessous pour découvrir nos opérations et capacités.'
                    : 'Aviance Ghana delivers safe, certified ground handling across terminal, apron, cargo, and hospitality operations. Slide through each service below to view authentic operations, key capabilities, and direct access.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => onNavigate('/services')}
                  className="btn-primary group"
                >
                  <span>{isFr ? 'Voir Tous les Services' : 'View All Services'}</span>
                  <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>

              {/* Modern Numbered Slide Indicator Capsule (Controls removed per user request) */}
              <div className="pt-6 flex items-center">
                <SlidePagination
                  current={activeServiceSlide}
                  total={serviceSummaries.length}
                  onChange={setActiveServiceSlide}
                  labels={serviceSummaries.map((s) => s.title)}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Airport-Style Full-Bleed Dynamic Image Showcase Card */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up" delay={150}>
              <div
                className="group relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 select-none"
                onMouseEnter={() => setIsServicePaused(true)}
                onMouseLeave={() => setIsServicePaused(false)}
                {...serviceSwipeHandlers}
              >
                {serviceSummaries.map((svc, idx) => {
                  const isActive = idx === activeServiceSlide;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => onNavigate(svc.slug)}
                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                      }`}
                    >
                      {/* Full-Bleed Operation Image */}
                      <img
                        src={svc.image}
                        alt={svc.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Airport-Style Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-40% to-transparent group-hover:from-black/95 transition-colors duration-500" />

                      {/* Airport-Style Text on Image: Category + Title + "View Details" Hover Reveal */}
                      <div className={`absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8 z-20 space-y-2 text-left transition-all duration-700 ease-out ${
                        isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-3'
                      }`}>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#72BF44] drop-shadow-xs block">
                          {svc.category}
                        </span>

                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                          {svc.title}
                        </h3>

                        {/* "View Details →" revealed on hover (Airport Style) */}
                        <div className="pt-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">
                            View Details
                          </span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>




      {/* 5. OPERATIONAL FOOTPRINT & AIRPORT NETWORK SUMMARY (Points to /operations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 border-t border-slate-100">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 text-left">
            <div className="space-y-2.5 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                {t('stations.title', "Operating Across Ghana's Key Commercial Air Gateways")}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {t('stations.subtitle', 'Aviance Ghana maintains certified ground handling stations, ramp equipment fleets, and passenger operations across 3 premier airports.')}
              </p>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <button
                onClick={() => onNavigate('/operations')}
                className="btn-link group"
              >
                <span className="link-label">{t('stations.viewAll', 'View Full Operations & Map')}</span>
                <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Station Cards — Swissport-Inspired Full-Bleed Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {stationSummaries.map((station, idx) => (
            <ScrollReveal key={station.code} animation="fade-up" delay={idx * 100}>
              <div
                onClick={() => onNavigate('/operations')}
                className="group relative h-[420px] sm:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={station.image}
                  alt={station.name}
                  className={`absolute inset-0 w-full h-full object-cover ${station.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                />

                {/* Swissport Subtle Bottom Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 via-35% to-transparent group-hover:from-black/90 transition-colors duration-500" />

                {/* Bottom Overlay Content — Swissport Style: Airport Name + Hover "Learn more" */}
                <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8 z-10 space-y-2">
                  <h3 className="text-2xl sm:text-[26px] lg:text-[28px] xl:text-[30px] font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                    {station.name}
                  </h3>

                  {/* "Learn more" revealed on hover (Swissport style) */}
                  <div className="pt-1.5 flex items-center gap-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">{t('stations.learnMore', 'Learn more')}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. AIRLINE PARTNERS — SWISSPORT-STYLE CORPORATE SHOWCASE */}
      <PartnerRadarWeb onNavigate={onNavigate} />

      {/* 7. VERIFIED CERTIFICATIONS & ACCREDITATION BANNER (Points to /certifications) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 border-t border-slate-100">
        <ScrollReveal animation="fade-up">
          <div className="border-t border-b border-slate-200 py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left">
              
              <div className="space-y-2.5 md:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#204696]">
                  {t('certBanner.eyebrow', 'Quality, Safety & Regulatory Accreditation')}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  {t('certBanner.title', 'IATA ISAGO Accredited · Certificate ISAGO-ACC-24-2419')}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {t('certBanner.desc', 'Accredited under the IATA Safety Audit for Ground Operations (ISAGO) at Kotoka International Airport (ACC) through January 21, 2027. Supported by European Union Cargo RA3 security validation and Ghana Civil Aviation Authority operating licenses.')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
                <button
                  onClick={() => onNavigate('/certifications')}
                  className="btn-primary group"
                >
                  <span>{t('certBanner.viewCerts', 'View Certifications & Audits')}</span>
                  <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => onNavigate('/code-of-conduct')}
                  className="btn-secondary group"
                >
                  <span>{t('certBanner.codeOfConduct', 'Code of Conduct & Governance')}</span>
                </button>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CSR & COMMUNITY IMPACT SUMMARY (Points to /csr) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 border-t border-slate-100">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
            <p className="eyebrow text-[#204696]">
              {t('csr.eyebrow', 'Sustainability & Community Engagement')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-[-0.025em] leading-[1.18]">
              {t('csr.title', 'Community Impact & Sustainability')}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {t('csr.subtitle', 'Winner of the Excellence in CSR Award at the 2025 Ghana Shippers’ Authority Awards.')}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 CSR Cards — Full-Bleed Showcase matching Airport Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          {csrHighlights.map((item, idx) => (
            <ScrollReveal key={item.id} animation="fade-up" delay={idx * 100}>
              <div
                onClick={() => onNavigate(item.path)}
                className="group relative h-[420px] sm:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover ${item.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
                />

                {/* Subtle Bottom Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 via-35% to-transparent group-hover:from-black/90 transition-colors duration-500" />

                {/* Bottom Overlay Content — Title + Hover Reveal */}
                <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8 z-10 space-y-2">
                  <h3 className="text-2xl sm:text-[26px] lg:text-[28px] xl:text-[30px] font-bold text-white tracking-tight leading-snug drop-shadow-xs">
                    {item.title}
                  </h3>

                  {/* "Read Story" revealed on hover (matching Airport card style) */}
                  <div className="pt-1.5 flex items-center gap-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">{t('csr.readStory', 'Read Story')}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center pt-8 sm:pt-10">
          <button
            onClick={() => onNavigate('/csr')}
            className="btn-link group text-xs sm:text-sm"
          >
            <span className="link-label">{t('csr.exploreAll', 'Explore All CSR Programs & Impact Reports')}</span>
            <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </section>


      {/* 9. LATEST NEWS & PRESS RELEASES ROLLING SHOWCASE (Points to /news) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 mb-16 sm:mb-24 border-t border-slate-100">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
            <div className="space-y-1.5">
              <p className="eyebrow text-[#204696]">{t('news.eyebrow', 'Corporate News & Announcements')}</p>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-slate-900 tracking-[-0.025em] leading-[1.2]">
                {t('news.title', 'Latest Updates from Aviance Ghana')}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/news')}
              className="btn-link group"
            >
              <span className="link-label">{t('news.allPress', 'All Articles & Press Releases')}</span>
              <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </ScrollReveal>

        {/* Rolling Carousel Wrapper with Dedicated Gutters (Buttons NEVER touch cards) */}
        <div className="relative group/carousel px-10 sm:px-14 lg:px-16">
          {/* Left Arrow Button */}
          {rollingNews.length > itemsPerView && (
            <button
              onClick={handlePrevNews}
              aria-label="Previous news"
              className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {rollingNews.length > itemsPerView && (
            <button
              onClick={handleNextNews}
              aria-label="Next news"
              className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Carousel Viewport with Unified Gestures */}
          <div
            ref={newsContainerRef}
            className="overflow-hidden w-full py-4 -my-4 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsNewsPaused(true)}
            onMouseLeave={() => setIsNewsPaused(false)}
            {...newsSwipeHandlers}
          >
            {/* Sliding Track */}
            <div
              className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{
                transform: `translate3d(-${newsTrackOffset}px, 0, 0)`
              }}
            >
              {rollingNews.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                    flexShrink: 0
                  }}
                  className="h-full"
                >
                  <article
                    onClick={() => onNavigate(`/news/${item.slug}`)}
                    className="group cursor-pointer flex flex-col justify-between h-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-slate-300 transition-all duration-500 hover:-translate-y-2 overflow-hidden text-left"
                  >
                    {/* Top Image Container — Only Media Count Tag (Swissport Style) */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                          item.featuredImage.includes('richard_backhouse')
                            ? 'object-[center_12%]'
                            : 'object-center'
                        }`}
                        loading="lazy"
                      />
                      {/* Media Count Tag Only */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-md border border-white/15 pointer-events-none">
                        <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90" />
                        <span>{getMediaCount(item.slug)}</span>
                      </div>
                    </div>

                    {/* Card Body — Clean Title & Metadata without Description */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
                      <div className="space-y-3">
                        {/* Meta row: Date on left, Media Release on right (Swissport Style) */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {new Date(item.publishedAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="font-bold text-[#204696] tracking-wide text-[11px] uppercase">
                            {t('news.mediaRelease', 'Media Release')}
                          </span>
                        </div>

                        {/* Title — Prominent & Clean */}
                        <h4 className="font-bold text-lg sm:text-[20px] leading-snug text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-3 min-h-[56px] sm:min-h-[64px]">
                          {item.title}
                        </h4>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#204696]">
                        <span className="inline-flex items-center gap-1.5 group-hover:text-[#0C1E4A] transition-colors">
                          <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">
                            {t('news.readFull', 'Read Full Article')}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.readTimeMinutes || 2} {t('news.minRead', 'min read')}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Numbered Slide Indicator Capsule */}
          {maxNewsIndex > 0 && (
            <div className="flex items-center justify-center pt-8 sm:pt-10">
              <SlidePagination
                current={newsSlide}
                total={maxNewsIndex + 1}
                onChange={setNewsSlide}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
