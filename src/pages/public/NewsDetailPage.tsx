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
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);

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

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Formatted date matching screenshot: "Oct 14"
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Dynamic Key Notes generator tailored with official Aviance brand context
  const getKeyNotes = (art: NewsArticle): string[] => {
    const notes: string[] = [];

    if (art.slug.includes('breast-cancer-awareness')) {
      notes.push('Active Corporate Social Responsibility supporting community healthcare, early detection, and civic development across Ghana.');
      notes.push('Joined partner Delta Air Lines and BCI founder Dr. Beatrice Wiafe Addai for community walk in Asante Mampong.');
      notes.push('Executive delegation led by CEO Richard Backhouse with solidarity from Kumasi airport operations team.');
      notes.push('Promoting health education and solidarity with families and communities affected by breast cancer.');
      return notes;
    }

    if (art.slug.includes('tf-group-games')) {
      notes.push('Aviance Ghana crowned Overall Champions at the annual Teachers’ Fund Group Games.');
      notes.push('Five championship honours won: Football, Volleyball, Men’s Sack Race, and CEO Challenge.');
      notes.push('CEO Richard Backhouse added to the team’s honours with a personal victory in the CEO Challenge.');
      notes.push('Fostering corporate camaraderie, fitness, and team solidarity away from airport airside duties.');
      return notes;
    }

    if (art.category.includes('CSR') || art.category.includes('Community')) {
      notes.push('Active Corporate Social Responsibility supporting community healthcare, early detection, and civic development across Ghana.');
      if (art.excerpt) notes.push(art.excerpt);
      notes.push('Strengthening community partnerships and grassroots engagement in local station communities.');
      notes.push('Operations delivered in strict conformance with IATA ISAGO standards and GCAA safety regulations.');
      return notes;
    }

    if (art.category.includes('Leadership') || art.category.includes('Executive')) {
      notes.push('Strengthening aviation governance, executive leadership, safety culture, and sustainable commercial network growth.');
      notes.push('Nationwide network stewardship across Accra (ACC), Prempeh I Kumasi (KMS), and Tamale (TML).');
      notes.push('Focusing on ramp safety, on-time turnaround reliability, and premium airline customer experience.');
      notes.push('Operations delivered in strict conformance with IATA ISAGO standards and GCAA safety regulations.');
      return notes;
    }

    if (art.category.includes('Sports') || art.category.includes('Culture')) {
      notes.push('Fostering team cohesion, recreational wellness, and corporate camaraderie across Teachers’ Fund group companies.');
      if (art.excerpt) notes.push(art.excerpt);
      notes.push('Celebrating athletic excellence and staff engagement beyond the airport terminal.');
      notes.push('Building strong interpersonal relationships and shared corporate pride.');
      return notes;
    }

    if (art.category.includes('Trade') || art.category.includes('Stakeholders')) {
      notes.push('Showcasing world-class ground handling and cargo terminal capacity to bilateral trade stakeholders and international investors.');
      if (art.excerpt) notes.push(art.excerpt);
      notes.push('Strengthening Ghana’s role as West Africa’s premier air logistics and passenger transit hub.');
      notes.push('Strict compliance with international aviation security, customs, and safety regulations.');
      return notes;
    }

    if (art.category.includes('Cargo') || art.category.includes('Healthcare')) {
      notes.push('State-of-the-art EU RA3 certified cold-chain terminal guaranteeing uninterrupted temperature control.');
      if (art.excerpt) notes.push(art.excerpt);
      notes.push('Rapid pharmaceutical, perishable, and diplomatic airfreight handling at Kotoka International Airport.');
      notes.push('Operations delivered in strict conformance with IATA ISAGO standards and GCAA safety regulations.');
      return notes;
    }

    // Default high-profile notes
    notes.push('Strategic milestone reinforcing Aviance Ghana’s position as Ghana’s premier aviation ground handling service provider.');
    if (art.excerpt) notes.push(art.excerpt);
    notes.push('Operations delivered in strict conformance with IATA ISAGO standards and GCAA safety regulations.');
    if (art.tags && art.tags.length > 0) {
      notes.push(`Key Stakeholders & Focus: ${art.tags.slice(0, 4).join(' • ')}`);
    }

    return notes.slice(0, 4);
  };

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

  const keyNotes = getKeyNotes(article);
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
          className="my-7 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50 border border-blue-200/90 space-y-3 shadow-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
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
      <div className="sticky top-[83.5px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 mb-8 sm:mb-14 lg:mb-16 shadow-xs transition-all">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
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

            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#204696] border border-blue-200 truncate shrink-0">
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

      {/* Main Reading Card with Official Aviance Logo Identity Stripe */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
          
          {/* Official Tri-Color Identity Stripe (Cobalt Blue, Azure Cyan, Leaf Green) */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

          <div className="p-6 sm:p-10 lg:p-12 space-y-8">

            {/* Meta Bar: Avatar, John Aryeh · Aug 11 · 1 min read, and Share / Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                {/* User Avatar Circle */}
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#204696] to-[#0F2E53] text-white flex items-center justify-center font-bold shadow-xs">
                    {article.authorName.charAt(0)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#72BF44] border-2 border-white" title="Verified Official Media Desk" />
                </div>

                <div className="text-xs sm:text-sm flex flex-wrap items-center gap-2 text-slate-600 font-medium">
                  <span className="font-bold text-[#0F2E53]">
                    {article.authorName}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span>{formattedDate}</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-[#009EE0]" />
                    {article.readTimeMinutes} min read
                  </span>
                </div>
              </div>

              {/* Share actions & Options dropdown */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mr-1">
                  <button
                    onClick={handleShareLinkedIn}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-blue-600 transition-colors cursor-pointer shadow-2xs"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShareTwitter}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-sky-50 hover:border-sky-200 text-sky-500 transition-colors cursor-pointer shadow-2xs"
                    title="Share on X"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 text-emerald-600 transition-colors cursor-pointer shadow-2xs"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#72BF44]" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shadow-2xs"
                    title="Copy Story Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-[#72BF44]" /> : <Copy className="w-4 h-4 text-[#204696]" />}
                  </button>
                </div>

                {/* Three Dots Menu (⋮) */}
                <div className="relative">
                  <button
                    id="article-options-trigger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Share and reading options"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div
                      id="article-options-menu"
                      className="absolute right-0 top-12 z-30 w-56 rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 space-y-1 animate-fade-in"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Share & Actions
                      </div>

                      <button
                        onClick={handleCopyLink}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 text-slate-700 flex items-center justify-between cursor-pointer text-left transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Copy className="w-3.5 h-3.5 text-[#204696]" />
                          <span>Copy Story Link</span>
                        </span>
                        {copiedLink && <Check className="w-3.5 h-3.5 text-[#72BF44] font-bold" />}
                      </button>

                      <button
                        onClick={handleShareLinkedIn}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2 cursor-pointer text-left transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Share to LinkedIn</span>
                      </button>

                      <button
                        onClick={handleShareTwitter}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2 cursor-pointer text-left transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5 text-sky-500" />
                        <span>Share to X (Twitter)</span>
                      </button>

                      <button
                        onClick={handleShareWhatsApp}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2 cursor-pointer text-left transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#72BF44]" />
                        <span>Share via WhatsApp</span>
                      </button>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={handlePrint}
                        className="w-full px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2 cursor-pointer text-left transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Print / PDF Story</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category Tag & Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#204696] border border-blue-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                  {article.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Official Press Release
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F2E53] tracking-tight leading-[1.22]">
                {article.title}
              </h1>
            </div>

            {/* GRAND FEATURED PHOTO SHOWCASE (Center-Flow) */}
            {article.featuredImage && (
              <div className="space-y-2">
                <div
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group cursor-pointer relative"
                  onClick={() => setLightboxImage({ src: article.featuredImage, caption: isCeoArticle ? 'Richard Backhouse — Chief Executive Officer, Aviance Ghana' : article.title })}
                >
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className={`w-full h-auto object-cover object-center ${
                      isCeoArticle ? 'max-h-[520px]' : 'max-h-[460px] sm:max-h-[520px]'
                    } group-hover:scale-[1.015] transition-transform duration-500 ease-out`}
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0F2E53]/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#72BF44]" />
                    <span>{plaqueInfo.label}</span>
                  </div>
                  <div
                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#204696] hover:bg-white text-xs font-semibold shadow-md transition-colors"
                    title="Click to expand full image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Integrated Media Plaque Underneath Hero */}
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

            {/* KEY NOTES & STRATEGIC TAKEAWAYS / EXECUTIVE MANDATE (Executive Summary Box) */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-emerald-50/40 border border-blue-100/90 shadow-xs overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <div className="p-5 sm:p-6 space-y-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#204696] text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4 text-[#72BF44]" />
                    </div>
                    <h4 className="text-sm sm:text-base font-extrabold text-[#0F2E53] tracking-tight">
                      {isCeoArticle ? 'Key Notes & Executive Mandate' : 'Key Notes & Strategic Takeaways'}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#72BF44]/20 text-[#256029] border border-[#72BF44]/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44]" /> Verified Release Facts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {keyNotes.map((note, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#72BF44] mt-0.5 shrink-0" />
                      <span className="font-semibold leading-relaxed text-xs">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTINUOUS EDITORIAL NARRATIVE FLOW */}
            <div className={`space-y-6 ${
              fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
            } text-[#1E293B] font-normal`}>

              {/* Paragraph 1: Styled lead with brand border */}
              {paragraphs[0] && (
                <div className="border-l-4 border-[#204696] pl-5 sm:pl-6 py-1.5">
                  <p className="text-lg sm:text-[21px] font-semibold text-[#0F2E53] leading-relaxed">
                    {paragraphs[0]}
                  </p>
                </div>
              )}

              {/* Paragraph 2 */}
              {paragraphs[1] && (
                <div className="leading-relaxed text-[#1E293B]">
                  {renderParagraphContent(paragraphs[1], 1)}
                </div>
              )}

              {/* Editorial Pull-Quote Callout with Aviance Brand Colors */}
              <div className="my-7 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/40 to-slate-50 border-l-4 border-[#204696] space-y-2 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <Quote className="w-6 h-6 text-[#009EE0] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-[#0F2E53] italic leading-relaxed">
                      &ldquo;{editorialQuote}&rdquo;
                    </p>
                    <p className="text-xs font-bold text-slate-500 pt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44]" />
                      <span>Aviance Corporate Communications Desk</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Paragraph 3 (if present) */}
              {paragraphs[2] && (
                <div className="leading-relaxed text-[#1E293B]">
                  {renderParagraphContent(paragraphs[2], 2)}
                </div>
              )}

              {/* IN-STORY FIELD EVENT HIGHLIGHTS GALLERY (Embedded Mosaic) */}
              {extraPhotos.length > 0 && (
                <div className="my-8 pt-2 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#204696]" />
                      <span>Field Event Highlights ({extraPhotos.length})</span>
                    </span>
                    <span className="text-xs font-semibold text-[#204696]">
                      Click photo to expand in full-screen
                    </span>
                  </div>

                  {/* Multi-Column Photo Mosaic Grid */}
                  <div className={`grid gap-4.5 ${
                    extraPhotos.length === 1
                      ? 'grid-cols-1'
                      : extraPhotos.length === 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {extraPhotos.map((photo, pIdx) => (
                      <figure
                        key={pIdx}
                        className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white group cursor-pointer transition-all hover:shadow-lg hover:border-slate-300"
                        onClick={() => setLightboxImage(photo)}
                      >
                        <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0F2E53]/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                            <Camera className="w-3 h-3 text-[#72BF44]" />
                            <span>Event Photo 0{pIdx + 1}</span>
                          </div>
                          <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#204696] hover:bg-white text-xs font-semibold shadow-md transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <figcaption className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                          <span className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">
                            {photo.caption}
                          </span>
                          <span className="text-[11px] text-[#204696] font-bold shrink-0 ml-2 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <Eye className="w-3.5 h-3.5 text-[#72BF44]" />
                            <span>Zoom</span>
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Remaining Paragraphs (Paragraph 4 & Onwards) */}
              {paragraphs.slice(3).map((paragraph, index) => {
                const actualIndex = index + 3;
                return (
                  <React.Fragment key={actualIndex}>
                    {renderParagraphContent(paragraph, actualIndex)}
                  </React.Fragment>
                );
              })}

              {/* Operational Impact & Strategic Priorities (2×2 Grid) */}
              <div className="pt-6 pb-2 space-y-3.5 border-t border-slate-100">
                <p className="text-xs font-bold text-[#204696] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#72BF44]" /> Operational Impact & Strategic Priorities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {operationalPillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-3 text-xs shadow-2xs">
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

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                  Topics:
                </span>
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Author Attribution & Quick Share Banner with Logo Colors */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-blue-50/40 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#204696] text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {article.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Published by {article.authorName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Official</span>
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Corporate Communications Desk &bull; Aviance Ghana Limited
                  </p>
                </div>
              </div>

              {/* Quick Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareLinkedIn}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
                  title="Share to LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-500 hover:border-sky-300 transition-all cursor-pointer shadow-2xs"
                  title="Share to X"
                >
                  <Twitter className="w-4 h-4 text-sky-500" />
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
                  title="Share to WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#72BF44]" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#204696] hover:bg-[#183570] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      </article>

      {/* Story Navigator: Previous & Next Article Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Story */}
          {prevArticle && (
            <div
              onClick={() => onNavigate(`/news/${prevArticle.slug}`)}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#204696]/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform text-[#204696]" />
                  Previous Story
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-1">
                  {prevArticle.title}
                </p>
              </div>
            </div>
          )}

          {/* Next Story */}
          {nextArticle && (
            <div
              onClick={() => onNavigate(`/news/${nextArticle.slug}`)}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#204696]/60 shadow-xs hover:shadow-md transition-all cursor-pointer group flex items-center justify-between text-right"
            >
              <div className="space-y-1 ml-auto">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1">
                  Next Story
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#204696]" />
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#204696] transition-colors line-clamp-1">
                  {nextArticle.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Stories Section Below Article */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#0F2E53]">
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
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white hover:border-[#204696]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img
                    src={r.featuredImage}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-[#204696] text-white">
                    {r.category}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(r.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
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

      {/* Lightbox Modal for Photo Zooming */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer shadow-lg"
              title="Close image view (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.caption}
              className="w-full h-auto max-h-[75vh] object-contain mx-auto"
            />
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-white/10 text-center space-y-1">
              <p className="text-sm font-semibold text-white">
                {lightboxImage.caption}
              </p>
              <p className="text-[11px] text-slate-400">
                Aviance Ghana Official Media Archive &bull; Press Esc to close
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsDetailPage;
