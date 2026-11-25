import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Clock,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Bookmark,
  Printer,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  FileDown,
  Download,
  FileText,
  PhoneCall,
  Mail,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Eye,
  Type,
  Camera,
  Maximize2,
  X,
  MapPin,
  Building2,
  Tag
} from 'lucide-react';
import { NewsArticle } from '../../types';
import { useTheme } from '../../context/ThemeContext';

// Authentic operational imagery for multimedia fallback
import imgCargoVillage from '../../assets/aviance_images/image_show/1780574568846.jpg';
import imgPushback from '../../assets/aviance_images/image_show/1791968160594.jpg';

interface NewsDetailPageProps {
  article: NewsArticle;
  allNews: NewsArticle[];
  onNavigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ article, allNews, onNavigate }) => {
  const { isLight } = useTheme();
  const [copiedLink, setCopiedLink] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close three-dot menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#article-options-menu') && !target.closest('#article-options-trigger')) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [menuOpen]);

  // Secondary photos for event articles
  const secondaryPhotos: Record<string, { src: string; caption: string }[]> = {
    'aviance-ghana-walks-for-breast-cancer-awareness-in-asante-mampong': [
      {
        src: '/assets/aviance_images/news/breast_cancer_walk_2.jpg',
        caption: 'Aviance Ghana delegation marching through Asante Mampong with Delta Air Lines.'
      },
      {
        src: '/assets/aviance_images/news/breast_cancer_walk_3.jpg',
        caption: 'Community gathering and addresses led by Dr. Beatrice Wiafe Addai.'
      }
    ],
    'aviance-ghana-emerges-as-overall-champions-at-tf-group-games': [
      {
        src: '/assets/aviance_images/news/tf_games_trophy.jpg',
        caption: 'Overall Champions Trophy presentation to Team Aviance Ghana.'
      },
      {
        src: '/assets/aviance_images/news/tf_games_action.jpg',
        caption: 'Volleyball and athletics tournament action.'
      },
      {
        src: '/assets/aviance_images/news/tf_games_team.jpg',
        caption: 'Colleagues and supporters celebrating team honours.'
      }
    ],
    'aviance-ghana-hosts-uk-parliamentary-delegation': [
      {
        src: '/assets/aviance_images/news/uk_delegation_tour.jpg',
        caption: 'UK MPs touring cargo terminal logistics hub with BII and GIP Ghana.'
      }
    ],
    'aviance-ghana-supports-the-orbis-flying-eye-hospital-programme': [
      {
        src: '/assets/aviance_images/csr/f52640_648176d3c119477aa1e0d49b314d4e39~mv2.jpg',
        caption: 'Aviance apron operations team facilitating medical aircraft logistics.'
      },
      {
        src: '/assets/aviance_images/csr/f52640_f8ef59f1440d4978b12d7af42b0b0782~mv2.jpg',
        caption: 'Medical team and aviation crews collaborating at Kotoka International Airport.'
      }
    ],
    'aviance-ghana-at-2024-asogli-yam-festival': [
      {
        src: '/assets/aviance_images/csr/f52640_1fecac509d4c4c9faed3422942694808~mv2.jpg',
        caption: 'Aviance delegation celebrating with traditional leadership in the Volta Region.'
      }
    ],
    'aviance-ghana-commences-domestic-operations': [
      {
        src: '/assets/aviance_images/news/eb15b6_127a64f8960f48a9a8dc9b32421dc9e3~mv2.avif',
        caption: 'Prempeh I International Airport Kumasi apron and passenger turnaround.'
      },
      {
        src: '/assets/aviance_images/news/eb15b6_26e9017c0b6a4cfe85e6b8f4c6f7f4d8~mv2.avif',
        caption: 'Tamale International Airport domestic aircraft ground handling operations.'
      }
    ],
    'we-are-expanding-our-horizons': [
      {
        src: '/assets/aviance_images/news/eb15b6_1539f417f02649fc91fefd7a1a8cfcea~mv2.avif',
        caption: 'Africa World Airlines domestic handling at regional aerodromes.'
      }
    ],
    'aviance-ghana-wins-best-growing-company-cargo-ground-handler-of-the-year-air-2024': [
      {
        src: '/assets/aviance_images/news/eb15b6_1fe510959ba04838842b578659b4d7f9~mv2.avif',
        caption: 'Ghana Shippers Awards ceremony and trophy recognition in Accra.'
      }
    ],
    'celebrating-25-years': [
      {
        src: '/assets/aviance_images/news/f52640_7e25c3acb4f84688ae7b9d46952c9ad9~mv2.avif',
        caption: 'Quarter-century milestone celebrations at Kotoka International Airport.'
      }
    ],
    'remembrance-day-at-aviance': [
      {
        src: '/assets/aviance_images/news/f52640_cd6f8d6c86e54e43959ea022faadbd2b~mv2.avif',
        caption: 'Aviance colleagues honouring service men and women.'
      }
    ]
  };

  const extraPhotos = secondaryPhotos[article.slug] || [];

  // Curated multimedia photos: either secondary photos or fallback curated operational photos
  const fallbackPhotos = [
    {
      src: imgPushback,
      caption: 'Aviance Ghana Heavy Aircraft Pushback & Apron Turnaround Staging'
    },
    {
      src: imgCargoVillage,
      caption: 'Aviance Cargo Village Bonded Terminal & Cold-Chain Facility'
    }
  ];

  const multimediaPhotos = [
    {
      src: article.featuredImage,
      caption: `${article.title} — Official Media Asset`
    },
    ...(extraPhotos.length > 0 ? extraPhotos : fallbackPhotos)
  ];

  const activePhoto = lightboxIndex !== null ? multimediaPhotos[lightboxIndex] || multimediaPhotos[0] : null;

  // Handle keyboard navigation for lightbox (Esc to close, Arrow keys to cycle photos)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % multimediaPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + multimediaPhotos.length) % multimediaPhotos.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, multimediaPhotos.length]);

  // Social Sharing Handlers
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setMenuOpen(false);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setMenuOpen(false);
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setMenuOpen(false);
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' — ' + currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setMenuOpen(false);
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setMenuOpen(false);
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent('Read this official press release from Aviance Ghana:\n\n' + currentUrl)}`;
    setMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setMenuOpen(false);
  };

  // Next / Previous Navigation across authentic articles
  const currentIndex = allNews.findIndex((n) => n.id === article.id);
  const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : allNews[allNews.length - 1];
  const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : allNews[0];
  const related = allNews.filter((n) => n.id !== article.id).slice(0, 3);

  // Check if article is CEO welcome (matches user screenshot for side-by-side layout)
  const isCeoArticle =
    article.slug.includes('richard-backhouse') ||
    article.slug.includes('chief-executive-officer');

  // Formatted date matching screenshot: "Oct 14"
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Dynamic Editorial Pull-Quote tailored for high-impact magazine presentation
  const getEditorialQuote = (art: NewsArticle): string => {
    if (art.slug.includes('breast-cancer-awareness')) {
      return 'Participating alongside Delta Air Lines was an opportunity to support a shared community cause beyond our daily work in aviation. We were proud to walk alongside the wider community in support of awareness, early detection and everyone facing the breast cancer journey.';
    }
    if (art.slug.includes('tf-group-games')) {
      return 'Away from their daily duties at the airport, colleagues had the opportunity to compete together, support one another and enjoy the day. Five tournament championship honours celebrated.';
    }
    if (art.slug.includes('richard-backhouse') || art.slug.includes('chief-executive-officer')) {
      return 'A strong focus on safety, service delivery, operational performance and sustainable growth across our nationwide network.';
    }
    if (art.slug.includes('uk-parliamentary-delegation')) {
      return 'Showcasing our operations and discussing the role of aviation services, air cargo logistics and cold chain infrastructure in supporting Ghana’s trade and connectivity.';
    }
    if (art.slug.includes('orbis-flying-eye')) {
      return 'We are proud to contribute to initiatives that transform lives, build professional capacity and help create a brighter future for eye care in Ghana.';
    }
    if (art.slug.includes('asogli-yam-festival')) {
      return 'Celebrating cultural heritage and community partnership with traditional leadership in the Volta Region upon the invitation of Togbe Afede XIV.';
    }
    if (art.slug.includes('commences-domestic-operations') || art.slug.includes('expanding-our-horizons')) {
      return 'Expanding our horizons: delivering world-class passenger turnaround and apron safety standards at regional domestic aerodromes.';
    }
    if (art.slug.includes('cargo-ground-handler-of-the-year') || art.slug.includes('best-growing-company')) {
      return 'A proud industry validation of our dedicated ground handling team, investments in EU RA3 cold storage, and unwavering adherence to ramp safety.';
    }

    const quoteMatch = art.content.match(/["“]([^"”]{20,160})["”]/);
    if (quoteMatch && quoteMatch[1]) {
      return quoteMatch[1];
    }

    const sentences = art.content.split(/[.!?]\s+/).filter((s) => s.length > 25 && s.length < 150);
    if (sentences.length > 1) {
      return sentences[1].trim() + '.';
    }

    return art.excerpt || 'Delivering safe, reliable and customer-focused aviation services across Ghana.';
  };

  // Dynamic Operational Priorities & Impact Pillars (4 items per article)
  const getOperationalPillars = (art: NewsArticle): { title: string; subtitle: string }[] => {
    if (art.category.includes('CSR') || art.category.includes('Community')) {
      return [
        { title: 'Community Health & Early Detection', subtitle: 'Public awareness & screenings' },
        { title: 'Delta Air Lines & BCI Partnership', subtitle: 'Shared humanitarian initiative' },
        { title: 'Regional Outreach (Ashanti & Volta)', subtitle: 'Grassroots civic engagement' },
        { title: 'Corporate Social Responsibility', subtitle: 'Staff and executive solidarity' }
      ];
    }
    if (art.category.includes('Sports') || art.category.includes('Culture')) {
      return [
        { title: 'Teachers’ Fund Camaraderie', subtitle: 'Group companies connection' },
        { title: 'Five Championship Honours', subtitle: 'Football, volleyball & CEO challenge' },
        { title: 'Workplace Wellness & Fitness', subtitle: 'Recreation beyond the airport' },
        { title: 'Team Aviance Solidarity', subtitle: 'Cohesion, passion & pride' }
      ];
    }
    if (art.category.includes('Leadership') || art.category.includes('Executive')) {
      return [
        { title: 'Ramp Safety & ISAGO Conformance', subtitle: 'World-class operational standard' },
        { title: 'Air Cargo & EU RA3 Cold Chain', subtitle: 'Perishables and pharma hub' },
        { title: 'Customer Airline Experience', subtitle: 'Passenger and ramp turnaround' },
        { title: 'Accra, Kumasi & Tamale Stations', subtitle: 'Nationwide network growth' }
      ];
    }
    if (art.category.includes('Trade') || art.category.includes('Stakeholders')) {
      return [
        { title: 'UK Parliamentary Delegation', subtitle: 'Bilateral trade engagement' },
        { title: 'BII & GIP Ghana Collaboration', subtitle: 'Aviation investment hub' },
        { title: 'Cargo Infrastructure Showcase', subtitle: 'Cold storage & bonded facilities' },
        { title: 'Economic Gateway for Ghana', subtitle: 'Regional airfreight connectivity' }
      ];
    }
    if (art.category.includes('Cargo') || art.category.includes('Healthcare')) {
      return [
        { title: 'EU RA3 Cold Chain Facility', subtitle: 'Pharma & perishables standard' },
        { title: 'Rapid Pallet & ULD Turnaround', subtitle: 'Freighter ramp operations' },
        { title: 'Customs & Bonded Security', subtitle: 'Strict international compliance' },
        { title: '24/7 Cargo Logistics Hub', subtitle: 'Airfreight connectivity' }
      ];
    }
    if (art.category.includes('Operations') || art.category.includes('Network')) {
      return [
        { title: 'Prempeh I Kumasi (KMS) Station', subtitle: 'Regional domestic hub' },
        { title: 'Tamale International (TML)', subtitle: 'Northern corridor connectivity' },
        { title: 'Modern GSE Ground Fleet', subtitle: 'Tugs, loaders & pushbacks' },
        { title: '24/7 OCC Flight Dispatch', subtitle: 'Live turnaround control' }
      ];
    }
    if (art.category.includes('Awards') || art.category.includes('Recognition')) {
      return [
        { title: 'Ghana Shippers Awards Winner', subtitle: 'Cargo ground handler of the year' },
        { title: 'ISAGO Accredited Safety', subtitle: 'Zero-incident audit record' },
        { title: 'Reliability & SLA Adherence', subtitle: 'Trusted by world carriers' },
        { title: 'Continuous Team Excellence', subtitle: '30+ years aviation heritage' }
      ];
    }
    return [
      { title: 'IATA ISAGO Standards', subtitle: 'Strict international compliance' },
      { title: 'Customer Airline Excellence', subtitle: 'Timely apron turnaround' },
      { title: 'Station Safety Culture', subtitle: 'Trained aviation personnel' },
      { title: 'Corporate Media Release', subtitle: 'Verified official update' }
    ];
  };

  // Dynamic Plaque Information for the Sticky Media Card
  const getPlaqueInfo = (art: NewsArticle) => {
    let location = 'Kotoka International Airport (ACC)';
    let organization = 'Aviance Ghana Press Desk';
    let label = 'Official Release Coverage';

    const text = (art.title + ' ' + art.content).toLowerCase();
    if (text.includes('asante mampong') || text.includes('mampong')) {
      location = 'Asante Mampong, Ashanti Region';
      organization = 'Aviance Ghana & Delta Air Lines';
      label = 'CSR & Community Walk';
    } else if (text.includes('kumasi') || text.includes('prempeh')) {
      location = 'Prempeh I International Airport (KMS)';
      organization = 'Aviance Domestic Operations';
      label = 'Regional Station Operations';
    } else if (text.includes('tamale')) {
      location = 'Tamale International Airport (TML)';
      organization = 'Aviance Northern Operations';
      label = 'Regional Station Operations';
    } else if (text.includes('teachers’ fund') || text.includes('tf group')) {
      location = 'Accra Sports Complex';
      organization = 'Teachers’ Fund Group & Team Aviance';
      label = 'Corporate Sports & Recreation';
    } else if (text.includes('richard backhouse') || text.includes('chief executive')) {
      location = 'Kotoka International Airport (ACC)';
      organization = 'Aviance Ghana Limited & Executive Committee';
      label = 'Executive Leadership';
    } else if (text.includes('orbis')) {
      location = 'Kotoka International Airport (ACC) Apron';
      organization = 'Ministry of Health & Orbis International';
      label = 'Humanitarian Airside Logistics';
    } else if (text.includes('asogli') || text.includes('yam festival')) {
      location = 'Ho, Volta Region';
      organization = 'Asogli State & Aviance Delegation';
      label = 'Cultural Heritage Partnership';
    } else if (text.includes('uk') || text.includes('parliamentary')) {
      location = 'Aviance Cargo Terminal, ACC';
      organization = 'UK Parliament, BII & GIP Ghana';
      label = 'Trade & Investment Mission';
    } else if (text.includes('cargo') || text.includes('shippers')) {
      location = 'Aviance Cargo Village, ACC';
      organization = 'Cargo & Ground Handling Division';
      label = 'Air Cargo & Cold Chain';
    }

    return { location, organization, label };
  };

  const editorialQuote = getEditorialQuote(article);
  const operationalPillars = getOperationalPillars(article);
  const plaqueInfo = getPlaqueInfo(article);
  const paragraphs = article.content.split('\n\n').filter(Boolean);

  const renderParagraphContent = (paragraph: string, index: number) => {
    // Honours or Bullets List
    if (paragraph.startsWith('•') || paragraph.startsWith('-') || paragraph.includes('•')) {
      const bullets = paragraph.split('\n').filter(Boolean);
      return (
        <div
          key={index}
          className="my-7 p-5 sm:p-6 border-l-4 border-[#204696] bg-slate-50/80 rounded-r-xl space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <p className="text-xs font-extrabold text-[#204696] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Honours & Tournament Recognition
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#72BF44]/20 text-[#256029] border border-[#72BF44]/30">
              5 Major Trophies
            </span>
          </div>
          <ul className="space-y-2.5 pt-1 pl-1">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#72BF44] mt-1.5 shrink-0" />
                <span>{b.replace(/^[•\-]\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Slogan Banner
    if (paragraph.trim().toLowerCase().includes('stronger together')) {
      return (
        <div
          key={index}
          className="my-7 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50/40 border-l-4 border-[#204696] flex items-center justify-between flex-wrap gap-3 shadow-2xs"
        >
          <div className="flex items-center gap-2.5 font-bold text-[#204696] text-base sm:text-lg italic">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <span>&ldquo;{paragraph}&rdquo;</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
            <span>Aviance Corporate Creed</span>
          </div>
        </div>
      );
    }

    return (
      <p key={index} className="leading-relaxed text-[#1E293B]">
        {paragraph}
      </p>
    );
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-32 lg:pb-36 bg-slate-50/70 text-slate-800 transition-colors">

      {/* Reading Progress Bar fixed at top of screen with official logo colors */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Utility Bar (Breadcrumbs, Back to News, Text Size Toggle) - Sticky under main navbar */}
      <div className="sticky top-[83.5px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 mb-6 sm:mb-10 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm min-w-0">
            <button
              onClick={() => onNavigate('/news')}
              className="inline-flex items-center gap-1.5 font-bold transition-all px-3 py-1.5 rounded-lg cursor-pointer text-slate-700 hover:text-[#204696] hover:bg-blue-50/80 shrink-0"
              title="Return to Aviance News Center"
            >
              <ArrowLeft className="w-4 h-4 text-[#204696]" />
              <span>News Center</span>
            </button>

            <span className="text-slate-300 shrink-0">/</span>

            <span
              onClick={() => onNavigate('/news')}
              className="text-xs font-medium text-slate-500 hover:text-[#204696] transition-colors cursor-pointer truncate shrink-0"
            >
              {article.category}
            </span>

            {/* Contextual story title on medium and larger displays */}
            <span className="hidden md:inline-block text-xs font-medium text-slate-500 truncate max-w-xs lg:max-w-md">
              &bull; {article.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Font Size Toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                fontSize === 'large'
                  ? 'bg-[#204696] text-white border-[#204696] shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-2xs'
              }`}
              title="Toggle reading text size"
            >
              <Type className="w-3.5 h-3.5 text-[#009EE0]" />
              <span>{fontSize === 'large' ? 'Text: Large' : 'Text: Normal'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                bookmarked
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-slate-500 hover:text-amber-600 hover:bg-slate-100 border-slate-200'
              }`}
              title={bookmarked ? 'Story Bookmarked' : 'Bookmark this story'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dynamic reading progress accent line along bottom of sticky banner */}
        <div className="h-[2px] w-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Main Content Area — Two-Column Swissport-Style Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* 1. Header & Headline (Clean Swissport Style — No Tag Pills) */}
        <div className="max-w-4xl space-y-3 mb-6 sm:mb-8 text-left">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#204696]">
              Media Release
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#009EE0]" />
              {article.readTimeMinutes || 3} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-[#0F2E53] tracking-[-0.028em] leading-[1.16]">
            {article.title}
          </h1>
        </div>

        {/* 2. Grand Hero Image (Swissport Style) */}
        {article.featuredImage && (
          <div className="space-y-3 mb-8 sm:mb-12">
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 group cursor-pointer relative shadow-md border border-slate-200/80"
              onClick={() => setLightboxIndex(0)}
            >
              <img
                src={article.featuredImage}
                alt={article.title}
                className={`w-full h-auto object-cover ${
                  isCeoArticle || article.featuredImage.includes('richard_backhouse')
                    ? 'object-top max-h-[580px] sm:max-h-[640px]'
                    : 'object-center max-h-[500px] sm:max-h-[560px]'
                } group-hover:scale-[1.01] transition-transform duration-500 ease-out`}
              />
            </div>

            {/* Media Plaque Underneath Hero */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#204696] shrink-0" />
                <span className="font-bold text-[#0F2E53]">{plaqueInfo.organization}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#72BF44]" />
                  <span>{plaqueInfo.location}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#72BF44]" />
                  <span>ISAGO Accredited Ground Service</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Swissport Two-Column Body Layout with Left Social Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start text-left">

          {/* Far Left Column (Desktop Social Share Rail: 1 Col) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center sticky top-28 pt-2">
            <div className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-md">
              <button
                onClick={handleShareWhatsApp}
                className="p-2.5 rounded-xl hover:bg-emerald-50 text-slate-600 hover:text-[#72BF44] transition-all cursor-pointer"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#72BF44]" />
              </button>

              <button
                onClick={handleShareFacebook}
                className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-[#1877F2] transition-all cursor-pointer"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </button>

              <button
                onClick={handleShareTwitter}
                className="p-2.5 rounded-xl hover:bg-sky-50 text-slate-600 hover:text-sky-500 transition-all cursor-pointer"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-sky-500" />
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all cursor-pointer"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
              </button>

              <button
                onClick={handleEmail}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-[#204696] transition-all cursor-pointer"
                title="Email Article"
              >
                <Mail className="w-5 h-5" />
              </button>

              <div className="w-5 h-[1px] bg-slate-200 my-1" />

              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-[#204696] transition-all cursor-pointer"
                title="Copy Link"
              >
                {copiedLink ? <Check className="w-5 h-5 text-[#72BF44]" /> : <Copy className="w-5 h-5 text-[#204696]" />}
              </button>
            </div>
          </div>

          {/* Main Story Column (7 Cols on Desktop) */}
          <div className="col-span-1 lg:col-span-7 space-y-6">

            {/* Mobile Share Bar (< lg) */}
            <div className="flex lg:hidden items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Share Story</span>
              <div className="flex items-center gap-1.5">
                <button onClick={handleShareWhatsApp} className="p-2 rounded-lg bg-emerald-50 text-[#72BF44]"><MessageCircle className="w-4 h-4" /></button>
                <button onClick={handleShareFacebook} className="p-2 rounded-lg bg-blue-50 text-[#1877F2]"><Facebook className="w-4 h-4" /></button>
                <button onClick={handleShareTwitter} className="p-2 rounded-lg bg-sky-50 text-sky-500"><Twitter className="w-4 h-4" /></button>
                <button onClick={handleShareLinkedIn} className="p-2 rounded-lg bg-blue-50 text-blue-600"><Linkedin className="w-4 h-4" /></button>
                <button onClick={handleCopyLink} className="p-2 rounded-lg bg-slate-100 text-[#204696]">{copiedLink ? <Check className="w-4 h-4 text-[#72BF44]" /> : <Copy className="w-4 h-4" />}</button>
              </div>
            </div>

            {/* Swissport-Style Bold Introductory Lead Paragraph */}
            {paragraphs[0] && (
              <div className="border-l-4 border-[#204696] pl-5 sm:pl-6 py-2 my-2 bg-slate-100/60 rounded-r-2xl">
                <p className="text-lg sm:text-[21px] font-semibold text-slate-900 leading-relaxed tracking-[-0.015em]">
                  {paragraphs[0]}
                </p>
              </div>
            )}

            {/* Article Narrative Paragraphs */}
            <div className={`space-y-6 ${
              fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
            } text-slate-700 font-normal`}>

              {/* Paragraph 2 */}
              {paragraphs[1] && (
                <div className="leading-relaxed text-[#1E293B]">
                  {renderParagraphContent(paragraphs[1], 1)}
                </div>
              )}

              {/* Editorial Pull-Quote Callout with Aviance Brand Colors */}
              <div className="my-7 p-6 sm:p-7 border-l-4 border-[#204696] bg-gradient-to-r from-blue-50/60 via-slate-50 to-emerald-50/30 rounded-r-2xl space-y-3 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <Quote className="w-7 h-7 text-[#009EE0] shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-base sm:text-lg font-semibold text-[#0F2E53] italic leading-relaxed">
                      &ldquo;{editorialQuote}&rdquo;
                    </p>
                    <p className="text-xs font-bold text-slate-500 pt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                      <span>Aviance Corporate Communications Desk</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Remaining Paragraphs */}
              {paragraphs.slice(2).map((paragraph, index) => {
                const actualIndex = index + 2;
                return (
                  <React.Fragment key={actualIndex}>
                    {renderParagraphContent(paragraph, actualIndex)}
                  </React.Fragment>
                );
              })}

              {/* Operational Impact & Strategic Priorities (2×2 Grid) */}
              <div className="pt-6 pb-2 space-y-3.5 border-t border-slate-200">
                <p className="text-xs font-bold text-[#204696] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#72BF44]" /> Operational Impact & Strategic Priorities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {operationalPillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 text-xs shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#72BF44] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800 leading-snug">{pillar.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{pillar.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slogan Banner with Aviance Leaf Green Accent */}
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50/40 border-l-4 border-[#204696] flex items-center justify-between flex-wrap gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 font-bold text-[#204696] text-base sm:text-lg">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Stronger Together, in service and in our communities.</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                  <span>Aviance Corporate Creed</span>
                </div>
              </div>

            </div>

            {/* Author Attribution */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#204696] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {article.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Published by {article.authorName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Official Desk</span>
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Corporate Communications Desk &bull; Aviance Ghana Limited
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column (4 Cols on Desktop: Multimedia, PDF, Media Relations) */}
          <div className="col-span-1 lg:col-span-4 sticky top-28 space-y-6">

            {/* 1. MULTIMEDIA SECTION (Swissport Style) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#204696]" />
                  <span>Multimedia</span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-[#204696]">
                  <span
                    onClick={() => setLightboxIndex(0)}
                    className="hover:underline cursor-pointer"
                  >
                    View All ({multimediaPhotos.length})
                  </span>
                </div>
              </div>

              {/* Multimedia Thumbnails Grid (Swissport Style) */}
              <div className="grid grid-cols-2 gap-3">
                {multimediaPhotos.slice(0, 4).map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => setLightboxIndex(pIdx)}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 cursor-pointer shadow-2xs hover:shadow-md transition-all"
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out ${
                        photo.src.includes('richard_backhouse') ? 'object-top' : 'object-center'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-bold">
                      <Eye className="w-4 h-4 text-[#72BF44]" />
                      <span>Zoom</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Official high-resolution photography cleared for editorial & press publication.
              </p>
            </div>

            {/* 2. DOWNLOAD PDF SECTION (Swissport Style) */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-[#204696]" />
                  <span>Download PDF</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#204696] border border-blue-200">
                  Official Release
                </span>
              </div>

              <div
                onClick={handlePrint}
                className="group p-3.5 rounded-xl border border-slate-200 hover:border-[#204696] bg-slate-50/70 hover:bg-blue-50/40 transition-all duration-300 cursor-pointer flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-2 leading-snug">
                    AvianceGhana_MediaRelease_{article.slug.slice(0, 35)}.pdf
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>PDF Release</span>
                    <span>&bull;</span>
                    <span>1.2 MB</span>
                    <span>&bull;</span>
                    <span className="text-[#204696] font-bold inline-flex items-center gap-1 group-hover:underline">
                      <Download className="w-3 h-3" />
                      <span>Save / Print</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. MEDIA RELATIONS CONTACT DESK */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#204696]" />
                  <span>Media Relations</span>
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#72BF44]" title="Press Desk Open" />
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <p className="font-medium text-slate-700 leading-relaxed">
                  For official inquiries, spokesperson interviews, or high-res broadcast footage:
                </p>

                <div className="space-y-2.5 pt-1 font-semibold">
                  <a
                    href="mailto:media@avianceghana.com"
                    className="flex items-center gap-2.5 text-slate-800 hover:text-[#204696] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#009EE0] shrink-0" />
                    <span>media@avianceghana.com</span>
                  </a>

                  <div className="flex items-center gap-2.5 text-slate-800">
                    <PhoneCall className="w-4 h-4 text-[#72BF44] shrink-0" />
                    <span>+233 (0) 302 778 022</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600">
                    <MapPin className="w-4 h-4 text-[#204696] shrink-0" />
                    <span>Kotoka Int. Airport, Terminal 3, Accra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. CERTIFIED ACCREDITATION BADGE */}
            <div className="p-5 rounded-2xl bg-[#0F2E53] text-white shadow-md space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#72BF44]">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Ground Handling Provider</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Delivering passenger turnaround, ramp handling, and air cargo under IATA ISAGO & EU RA3 certification.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white">GCAA Certified</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white">ISAGO Registered</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Story Navigator: Previous & Next Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Story */}
          {prevArticle && (
            <div
              onClick={() => onNavigate(`/news/${prevArticle.slug}`)}
              className="py-3 hover:opacity-80 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#204696]" />
                  Previous Story
                </span>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-1">
                  {prevArticle.title}
                </p>
              </div>
            </div>
          )}

          {/* Next Story */}
          {nextArticle && (
            <div
              onClick={() => onNavigate(`/news/${nextArticle.slug}`)}
              className="py-3 hover:opacity-80 transition-all cursor-pointer group flex items-center justify-between text-right"
            >
              <div className="space-y-1 ml-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-end gap-1">
                  Next Story
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#204696]" />
                </span>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-1">
                  {nextArticle.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Stories Section Below Article */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#0F2E53]">
              More News from Aviance Ghana
            </h3>
            <button
              onClick={() => onNavigate('/news')}
              className="text-xs font-bold text-[#204696] hover:underline flex items-center gap-1 cursor-pointer"
            >
              See All News &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <div
                key={r.id}
                onClick={() => onNavigate(`/news/${r.slug}`)}
                className="group cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={r.featuredImage}
                    alt={r.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
                      r.featuredImage.includes('richard_backhouse') ? 'object-top' : 'object-center'
                    }`}
                    loading="lazy"
                  />
                  {/* Media Count Tag Only (Swissport Style) */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1 shadow-sm border border-white/15 pointer-events-none">
                    <Camera className="w-3 h-3 text-white/90" />
                    <span>{(secondaryPhotos[r.slug]?.length || 0) + 1}</span>
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#204696] uppercase tracking-wider">
                        {r.category}
                      </span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(r.publishedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-2 mt-0.5">
                      {r.title}
                    </h4>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#204696] pt-2">
                    Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Return to News Center Banner at bottom of article */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center">
        <button
          onClick={() => onNavigate('/news')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#204696] to-[#009EE0] hover:from-[#183878] hover:to-[#0089c4] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Aviance News Center</span>
        </button>
      </div>

      {/* Lightbox Modal (Swissport-Inspired Media Viewer — "More Nicer") */}
      {lightboxIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in cursor-pointer overflow-y-auto"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Floating Close Button outside card (Top-Left Swissport Signature) */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="fixed top-5 left-5 z-50 hidden sm:flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
            title="Close viewer (Esc)"
          >
            <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg">
              <X className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Close
            </span>
          </button>

          {/* Floating Close Button (Top-Right on Mobile) */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="fixed top-4 right-4 z-50 sm:hidden w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-95"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Card Frame (Swissport Pure White Card) */}
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-200/80 max-w-5xl lg:max-w-6xl w-full overflow-hidden p-6 sm:p-8 lg:p-10 cursor-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* In-Card Close Button on top-right */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              title="Close viewer (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">

              {/* Left Column: Media & Story Information (Swissport Style) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
                <div className="space-y-4">
                  {/* Headline (Swissport Bold Style) */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-snug tracking-tight pr-6">
                    {article.title}
                  </h3>

                  {/* ID & Legal Info (Swissport Exact Layout) */}
                  <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
                        ID
                      </span>
                      <p className="font-mono text-slate-900 font-bold text-sm tracking-wide">
                        {139000 + (lightboxIndex + 1) * 24}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-600 font-medium text-xs">
                        &copy; Aviance Ghana Limited
                      </p>
                    </div>

                    <div className="pt-1">
                      <p className="text-slate-500 text-xs leading-relaxed font-normal">
                        {activePhoto.caption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Left: Share & Download Button */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  {/* Share Icons Row (Swissport Style) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                        Share
                      </span>
                      {copiedLink && (
                        <span className="text-[11px] font-bold text-[#72BF44] animate-fade-in flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={handleCopyLink}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#204696] transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Copy Story Link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleShareFacebook}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#1877F2] transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleShareTwitter}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-black transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Share on X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleShareLinkedIn}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0A66C2] transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleEmail}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#204696] transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Email Media Asset"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleShareWhatsApp}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#25D366] transition-all cursor-pointer border border-slate-200 flex items-center justify-center shadow-xs"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Download High-Res Button */}
                  <a
                    href={activePhoto.src}
                    download={`Aviance_Media_Asset_${lightboxIndex + 1}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <Download className="w-4 h-4 text-[#72BF44]" />
                    <span>Download Media Asset</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Main Image Showcase, Thumbnails Strip & Counter */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                
                {/* Main Large Image Stage */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center h-[320px] sm:h-[420px] lg:h-[470px] shadow-inner group">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.caption}
                    className="w-full h-full object-contain mx-auto transition-all duration-300"
                  />

                  {/* Top-Right Action Controls on Image (Swissport Style) */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                    <a
                      href={activePhoto.src}
                      download={`Aviance_Photo_${lightboxIndex + 1}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#204696] text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
                      title="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </a>

                    <a
                      href={activePhoto.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#204696] text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
                      title="Open full resolution in new tab"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Previous Photo Arrow */}
                  {multimediaPhotos.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + multimediaPhotos.length) % multimediaPhotos.length : 0));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* Next Photo Arrow */}
                  {multimediaPhotos.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % multimediaPhotos.length : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Bottom Row: Thumbnails Strip on Left, Counter on Right (Swissport Style) */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  {/* Thumbnails Strip */}
                  <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                    {multimediaPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className={`relative rounded-lg overflow-hidden w-16 h-12 sm:w-20 sm:h-14 shrink-0 transition-all cursor-pointer border ${
                          idx === lightboxIndex
                            ? 'border-[#204696] ring-2 ring-[#204696] ring-offset-2 opacity-100 scale-105 shadow-md'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={photo.src}
                          alt=""
                          className={`w-full h-full object-cover ${
                            photo.src.includes('richard_backhouse') ? 'object-top' : 'object-center'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Counter: "1 of 1" or "1 of 3" (Swissport Style) */}
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-mono font-bold text-slate-500 whitespace-nowrap">
                      {lightboxIndex + 1} of {multimediaPhotos.length}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsDetailPage;
