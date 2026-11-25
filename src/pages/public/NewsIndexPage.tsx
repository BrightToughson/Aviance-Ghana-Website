import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Sparkles,
  Camera,
  Share2,
  ExternalLink,
  Mail,
  ChevronRight,
  ChevronLeft,
  Search,
  Tag,
  Building2,
  Award,
  Loader2,
  CheckCircle2,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { NewsArticle } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { SlidePagination } from '../../components/ui/SlidePagination';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

interface NewsIndexPageProps {
  news: NewsArticle[];
  onNavigate: (path: string) => void;
}

export const NewsIndexPage: React.FC<NewsIndexPageProps> = ({ news, onNavigate }) => {
  const { isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Rolling mode & responsive items
  const [viewMode, setViewMode] = useState<'rolling' | 'grid'>('rolling');
  const [newsSlide, setNewsSlide] = useState(0);
  const [isNewsPaused, setIsNewsPaused] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCardsCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCardsCount(2);
      } else {
        setVisibleCardsCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Unified Gestures for News Carousel (Touch Swipe & Desktop Mouse Drag)
  const { handlers: newsSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setNewsSlide((prev) => Math.min(prev + 1, maxNewsSlide)),
    onSwipeRight: () => setNewsSlide((prev) => Math.max(prev - 1, 0)),
    threshold: 45,
    enableMouseDrag: true,
  });

  // Rolling mode & touch swipe for Photo Highlights / Moments Gallery
  const [momentsSlide, setMomentsSlide] = useState(0);
  const [isMomentsPaused, setIsMomentsPaused] = useState(false);
  const maxMomentsSlide = Math.max(0, 6 - visibleCardsCount);

  // Auto-advance moments
  useEffect(() => {
    if (isMomentsPaused) return;
    const interval = setInterval(() => {
      setMomentsSlide((prev) => (prev >= maxMomentsSlide ? 0 : prev + 1));
    }, 4800);
    return () => clearInterval(interval);
  }, [isMomentsPaused, maxMomentsSlide]);

  // Unified Gestures for Moments Carousel (Touch Swipe & Desktop Mouse Drag)
  const { handlers: momentsSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setMomentsSlide((prev) => Math.min(prev + 1, maxMomentsSlide)),
    onSwipeRight: () => setMomentsSlide((prev) => Math.max(prev - 1, 0)),
    threshold: 45,
    enableMouseDrag: true,
  });

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

  // Top 3 Featured Headlines
  const featuredArticles = news.slice(0, 3);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-switch smoothly every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying || featuredArticles.length <= 1) return;

    const intervalTime = 6000;
    const stepTime = 60;
    const progressStep = (stepTime / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setFeaturedIndex((currentIdx) => (currentIdx + 1) % featuredArticles.length);
          return 0;
        }
        return prev + progressStep;
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, featuredArticles.length]);

  const handleNextFeatured = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProgress(0);
    setIsAutoPlaying(true);
    setFeaturedIndex((prev) => (prev + 1) % featuredArticles.length);
  };

  const handlePrevFeatured = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProgress(0);
    setIsAutoPlaying(true);
    setFeaturedIndex((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  // Unified Gestures for Featured News Story (Touch Swipe & Desktop Mouse Drag)
  const { handlers: featuredSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => handleNextFeatured(),
    onSwipeRight: () => handlePrevFeatured(),
    threshold: 40,
    enableMouseDrag: true,
  });

  const categories = [
    'All',
    'Airline Partnerships',
    'Operations & Network',
    'Cargo & Healthcare',
    'CSR & Community',
    'Awards & Recognition',
    'Leadership & Governance'
  ];

  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'];

  const filtered = news.filter((n) => {
    // Category matching
    let matchesCat = selectedCategory === 'All';
    if (!matchesCat) {
      if (selectedCategory === 'Airline Partnerships') {
        matchesCat = n.category === 'Airline Partnerships';
      } else if (selectedCategory === 'Operations & Network') {
        matchesCat =
          n.category.includes('Operations') ||
          n.category.includes('Equipment') ||
          n.category.includes('Milestones') ||
          n.category.includes('Safety');
      } else if (selectedCategory === 'Cargo & Healthcare') {
        matchesCat = n.category.includes('Cargo') || n.category.includes('Healthcare');
      } else if (selectedCategory === 'CSR & Community') {
        matchesCat =
          n.category.includes('CSR') ||
          n.category.includes('Community') ||
          n.category.includes('Green') ||
          n.category.includes('Sustainability');
      } else if (selectedCategory === 'Awards & Recognition') {
        matchesCat =
          n.category.includes('Awards') ||
          n.category.includes('Culture') ||
          n.category.includes('Sports');
      } else if (selectedCategory === 'Leadership & Governance') {
        matchesCat =
          n.category.includes('Leadership') ||
          n.category.includes('Stakeholders') ||
          n.category.includes('History') ||
          n.category.includes('VIP');
      } else {
        matchesCat = n.category === selectedCategory;
      }
    }

    // Year matching
    let matchesYear = selectedYear === 'All';
    if (!matchesYear) {
      const pubYear = new Date(n.publishedAt).getFullYear().toString();
      matchesYear = pubYear === selectedYear;
    }

    // Search query matching
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      n.title.toLowerCase().includes(query) ||
      n.excerpt.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query) ||
      n.authorName.toLowerCase().includes(query) ||
      (n.tags && n.tags.some((t) => t.toLowerCase().includes(query)));

    return matchesCat && matchesYear && matchesSearch;
  });

  const visibleArticles = filtered.slice(0, visibleCount);

  const maxNewsSlide = Math.max(0, filtered.length - visibleCardsCount);

  // Auto-advance news rolling
  useEffect(() => {
    if (viewMode !== 'rolling' || isNewsPaused || filtered.length <= visibleCardsCount) return;
    const interval = setInterval(() => {
      setNewsSlide((prev) => (prev >= maxNewsSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [viewMode, isNewsPaused, maxNewsSlide, filtered.length, visibleCardsCount]);

  // Automatic Infinite Scroll: loads more releases seamlessly as user scrolls down
  useEffect(() => {
    if (visibleCount >= filtered.length) return;

    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 9, filtered.length));
            setIsLoadingMore(false);
          }, 180);
        }
      },
      {
        root: null,
        rootMargin: '350px',
        threshold: 0.05,
      }
    );

    observer.observe(currentSentinel);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filtered.length, isLoadingMore]);

  const activeFeatured = featuredArticles[featuredIndex] || featuredArticles[0];

  // Authentic gallery moments linking directly to their official news articles
  const galleryMoments = [
    {
      src: '/assets/aviance_images/news/f52640_3541ea8b139048598ab2e7f7d9ae5640~mv2.avif',
      title: 'Overall Champions Trophy Celebration',
      caption: 'Aviance Ghana celebrates five championship honours at the TF Group Games.',
      tag: 'Sports & Culture',
      slug: 'aviance-ghana-emerges-as-overall-champions-at-tf-group-games'
    },
    {
      src: '/assets/aviance_images/news/f52640_c3752bde8d064779a837d707b09b7a17~mv2.avif',
      title: 'Walk for the Cure — Asante Mampong',
      caption: 'Aviance Ghana and Delta Air Lines delegation supporting Breast Care International.',
      tag: 'CSR & Health',
      slug: 'aviance-ghana-walks-for-breast-cancer-awareness-in-asante-mampong'
    },
    {
      src: '/assets/aviance_images/news/f52640_63a8306e1fd7482096064138a694854c~mv2.avif',
      title: 'UK Parliamentary Delegation Engagement',
      caption: 'Showcasing airside ground handling and cargo facilities to British stakeholders.',
      tag: 'Trade & Diplomacy',
      slug: 'aviance-ghana-hosts-uk-parliamentary-delegation'
    },
    {
      src: '/assets/aviance_images/news/richard_backhouse_ceo.jpg',
      title: 'Chief Executive Officer Appointment',
      caption: 'Welcoming Richard Backhouse to guide Aviance Ghana’s next phase of development.',
      tag: 'Leadership',
      slug: 'aviance-ghana-welcomes-richard-backhouse-as-chief-executive-officer'
    },
    {
      src: '/assets/aviance_images/news/f52640_7e25c3acb4f84688ae7b9d46952c9ad9~mv2.avif',
      title: 'Celebrating 25 Years of Ground Handling',
      caption: 'A quarter century of airline handling excellence at Kotoka International Airport.',
      tag: 'Heritage',
      slug: 'celebrating-25-years'
    },
    {
      src: '/assets/aviance_images/news/f52640_cd6f8d6c86e54e43959ea022faadbd2b~mv2.avif',
      title: 'Remembrance Day Commemoration at Aviance',
      caption: 'Honouring veterans and celebrating dedicated airport operational teams.',
      tag: 'Community',
      slug: 'remembrance-day-at-aviance'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#08101E] text-slate-100'}`}>
      
      {/* Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-[#0C1933] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">News</span>
          </div>


        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            News & Media Centre
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Stay informed with official updates regarding station operations, community initiatives, executive appointments, and international aviation milestones.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* 3 FEATURED HEADLINES SHOWCASE WITH ANIMATION & GESTURES */}
        {featuredArticles.length > 0 && activeFeatured && (
          <section className="space-y-4">
            {/* Main Featured Showcase with Unified Gestures */}
            <div
              key={activeFeatured.id}
              onClick={() => onNavigate(`/news/${activeFeatured.slug}`)}
              {...featuredSwipeHandlers}
              className="animate-featured-switch group cursor-grab active:cursor-grabbing select-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4"
            >
              {/* Image Side */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={activeFeatured.featuredImage}
                  alt={activeFeatured.title}
                  className={`w-full h-full object-cover ${
                    activeFeatured.featuredImage.includes('richard_backhouse') ? 'object-[center_12%]' : 'object-center'
                  } group-hover:scale-105 transition-transform duration-700 ease-out`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />

                {/* Expand badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span>Read Release</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#009EE0] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-[#204696]">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(activeFeatured.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-[#009EE0]" />
                      {activeFeatured.readTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[27px] font-extrabold text-[#0F2E53] group-hover:text-[#204696] transition-colors leading-[1.25]">
                    {activeFeatured.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {activeFeatured.excerpt}
                  </p>

                  {/* Key Stakeholders / Tag Pills */}
                  {activeFeatured.tags && activeFeatured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeFeatured.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#204696] to-[#0F2E53] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {activeFeatured.authorName.charAt(0)}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-[#0F2E53]">{activeFeatured.authorName}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{activeFeatured.authorRole}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#204696] group-hover:text-[#183570] transition-colors">
                    <span>Full Story</span>
                    <ArrowRight className="w-4 h-4 text-[#204696] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Interactive Headline Switcher Tabs with Animated Progress Timer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {featuredArticles.map((art, idx) => {
                const isActive = idx === featuredIndex;
                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      setProgress(0);
                      setFeaturedIndex(idx);
                      setIsAutoPlaying(true);
                    }}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-blue-50/90 border-[#204696] shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {/* Active Animated Progress Bar */}
                    {isActive && isAutoPlaying && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/60 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] pb-1">
                      <span className={`font-extrabold ${isActive ? 'text-[#204696]' : 'text-slate-400'}`}>
                        0{idx + 1} &bull; {art.category}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#72BF44] animate-pulse" />
                      )}
                    </div>

                    <p className={`text-xs font-bold line-clamp-1 ${
                      isActive ? 'text-[#0F2E53]' : 'text-slate-700'
                    }`}>
                      {art.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* SEARCH & CATEGORY FILTERS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(12);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#204696] text-white shadow-md'
                      : isLight
                      ? 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search across all 43 releases..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs focus:ring-2 focus:ring-[#204696] focus:outline-none transition-all ${
                  isLight
                    ? 'bg-white border border-slate-300 text-slate-800'
                    : 'bg-slate-800 border border-slate-700 text-white'
                }`}
              />
            </div>

          </div>

          {/* Sub-bar: Year Selector & Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Filter Year:
              </span>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setSelectedYear(y);
                    setVisibleCount(12);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedYear === y
                      ? 'bg-[#009EE0] text-white shadow-xs'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Position Counter */}
            <p className="text-slate-500 text-xs">
              Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filtered.length}</span> articles
            </p>
          </div>
        </div>

        {/* ARTICLES SECTION (ROLLING SHOWCASE) */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 p-8 space-y-3">
            <Search className="w-10 h-10 mx-auto text-slate-400" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No releases match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting the category and year filters to view all releases.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedYear('All');
                setSearchQuery('');
                setVisibleCount(12);
                setNewsSlide(0);
              }}
              className="btn-primary !py-2.5 !px-6 text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Rolling Showcase Mode with Dedicated Gutters */
          <div
            className="relative px-8 sm:px-12 lg:px-16 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsNewsPaused(true)}
            onMouseLeave={() => setIsNewsPaused(false)}
            {...newsSwipeHandlers}
          >
            {/* Left Side Arrow Button */}
            {filtered.length > visibleCardsCount && (
              <button
                type="button"
                onClick={() => setNewsSlide((prev) => (prev <= 0 ? maxNewsSlide : prev - 1))}
                aria-label="Previous articles"
                className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Side Arrow Button */}
            {filtered.length > visibleCardsCount && (
              <button
                type="button"
                onClick={() => setNewsSlide((prev) => (prev >= maxNewsSlide ? 0 : prev + 1))}
                aria-label="Next articles"
                className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <div className="overflow-hidden -mx-3 py-2">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${newsSlide * (100 / visibleCardsCount)}%)`
                }}
              >
                {filtered.map((article) => (
                  <div
                    key={article.id}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <article
                      onClick={() => onNavigate(`/news/${article.slug}`)}
                      className="group cursor-pointer flex flex-col justify-between h-full space-y-4 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 text-left"
                    >
                      <div className="space-y-4">
                        {/* Article Image */}
                        <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900">
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
                              article.featuredImage.includes('richard_backhouse') ? 'object-top' : 'object-center'
                            }`}
                            loading="lazy"
                          />
                          {/* Media Count Tag Only (Swissport Style) */}
                          <div className="absolute top-3 right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-md border border-white/15 pointer-events-none">
                            <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90" />
                            <span>{getMediaCount(article.slug)}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-bold text-[#204696] dark:text-[#009EE0] uppercase text-[10px] tracking-wider">
                              {article.category}
                            </span>
                            <span>&bull;</span>
                            <Calendar className="w-3.5 h-3.5 text-[#204696] dark:text-[#009EE0]" />
                            <span>
                              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            <span>&bull;</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTimeMinutes} min</span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-[#11244C] dark:text-white group-hover:text-[#204696] dark:group-hover:text-[#009EE0] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h3>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <User className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[120px] font-medium">{article.authorName}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-bold text-[#204696] dark:text-[#009EE0]">
                          <span className="underline underline-offset-4 decoration-2 decoration-[#72BF44]">
                            Read Article
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
                        </span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Numbered Slide Indicator Capsule */}
            {maxNewsSlide > 0 && (
              <div className="flex items-center justify-center pt-4">
                <SlidePagination
                  current={newsSlide}
                  total={maxNewsSlide + 1}
                  onChange={setNewsSlide}
                />
              </div>
            )}
          </div>
        )}


        {/* PHOTO HIGHLIGHTS & ARCHIVE GALLERY (ROLLING SHOWCASE) */}
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#72BF44] uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" /> Aviance in Action
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11244C] dark:text-white">
                Photo Highlights & Operational Moments
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1">
                A visual glimpse into our airline partner events, community outreach, sports tournaments, and airport airside team.
              </p>
            </div>
          </div>

          {/* Rolling Showcase Mode with Dedicated Gutters and Side Circular Navigation Buttons */}
          <div
            className="relative px-8 sm:px-12 lg:px-16 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsMomentsPaused(true)}
            onMouseLeave={() => setIsMomentsPaused(false)}
            {...momentsSwipeHandlers}
          >
            {/* Left Side Arrow Button */}
            {galleryMoments.length > visibleCardsCount && (
              <button
                type="button"
                onClick={() => setMomentsSlide((prev) => (prev <= 0 ? maxMomentsSlide : prev - 1))}
                aria-label="Previous moment"
                className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Side Arrow Button */}
            {galleryMoments.length > visibleCardsCount && (
              <button
                type="button"
                onClick={() => setMomentsSlide((prev) => (prev >= maxMomentsSlide ? 0 : prev + 1))}
                aria-label="Next moment"
                className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <div className="overflow-hidden -mx-3 py-2">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${momentsSlide * (100 / visibleCardsCount)}%)`
                }}
              >
                {galleryMoments.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div
                      onClick={() => onNavigate(`/news/${item.slug}`)}
                      className="group cursor-pointer flex flex-col justify-between h-full space-y-3 bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 text-left"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                          <img
                            src={item.src}
                            alt={item.title}
                            className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
                              item.src.includes('richard_backhouse') ? 'object-top' : 'object-center'
                            }`}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#204696] dark:text-[#009EE0] uppercase tracking-wider block">
                            {item.tag}
                          </span>
                          <h4 className="text-sm font-bold text-[#11244C] dark:text-white group-hover:text-[#204696] dark:group-hover:text-[#009EE0] transition-colors line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#204696] dark:text-[#009EE0] border-t border-slate-100 dark:border-slate-800/80">
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Numbered Slide Indicator Capsule */}
            {maxMomentsSlide > 0 && (
              <div className="flex items-center justify-center pt-4">
                <SlidePagination
                  current={momentsSlide}
                  total={maxMomentsSlide + 1}
                  onChange={setMomentsSlide}
                />
              </div>
            )}
          </div>
        </section>

        {/* MEDIA DESK & INQUIRIES CARD */}
        <section className="bg-gradient-to-r from-slate-900 via-[#11244C] to-[#204696] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200">
                <Mail className="w-3.5 h-3.5 text-[#009EE0]" /> Press & Media Relations
              </span>
              <h3 className="text-2xl font-bold text-white">
                Media Inquiries & Press Kit Requests
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                For journalist inquiries, interview requests with Aviance Ghana executive leadership, or high-resolution official assets, contact our corporate communications desk.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:info@avianceghana.com?subject=Media%20Inquiry%20-%20Aviance%20Ghana"
                className="btn-accent group !py-3 !px-6"
              >
                <Mail className="w-4 h-4" />
                <span>info@avianceghana.com</span>
              </a>
              <button
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Contact Directory</span>
                <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};


export default NewsIndexPage;
