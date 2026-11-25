import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  HeartHandshake,
  Award,
  Sparkles,
  Plane,
  Eye,
  GraduationCap,
  Users,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Mail,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { SlidePagination } from '../../components/ui/SlidePagination';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

// Authentic Official CSR Photography from src/assets/aviance_images/csr/
import csrChildLiftImg from '../../assets/aviance_images/csr/f52640_831252991b76460598417e8e658fbafc~mv2.jpg';
import csrSantaKidsImg from '../../assets/aviance_images/csr/f52640_648176d3c119477aa1e0d49b314d4e39~mv2.jpg';
import csrVolunteerImg from '../../assets/aviance_images/csr/f52640_f8ef59f1440d4978b12d7af42b0b0782~mv2.jpg';
import csrCommunityDanceImg from '../../assets/aviance_images/csr/f52640_24adb6cb26e04c379e58bb697fe8d77f~mv2.jpg';
import csrClassroomArtImg from '../../assets/aviance_images/csr/f52640_1fecac509d4c4c9faed3422942694808~mv2.jpg';
import csrEnvironmentCleanImg from '../../assets/aviance_images/csr/f52640_87b512b999eb4f998409d3ffe1cf46f0~mv2.jpg';

interface CsrPageProps {
  onNavigate: (path: string) => void;
}

export const CsrPage: React.FC<CsrPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // All 6 Authentic Images from the csr folder
  const csrGallery = [
    {
      id: 'santa-kids',
      image: csrSantaKidsImg,
      title: 'Christmas Community Outreach & Children Celebration',
      category: 'Child Welfare',
      tag: 'Holiday Outreach',
      desc: 'Aviance Ghana festive season support bringing smiles, gift boxes, and holiday joy to school children in Accra.'
    },
    {
      id: 'child-lift',
      image: csrChildLiftImg,
      title: 'Youth Mentorship & Future Stars School Partnership',
      category: 'Education & Youth',
      tag: 'Youth Development',
      desc: 'Aviance staff volunteers lifting the spirits of young students through active mentorship and sports coaching.'
    },
    {
      id: 'volunteer-craft',
      image: csrVolunteerImg,
      title: 'Sensory Learning & Individual Student Support',
      category: 'Health & Inclusion',
      tag: 'Inclusive Education',
      desc: 'One-on-one educational engagement nurturing cognitive creativity and motor skills for children.'
    },
    {
      id: 'community-dance',
      image: csrCommunityDanceImg,
      title: 'Community School Sports & Cultural Celebration',
      category: 'Community Welfare',
      tag: 'Community Life',
      desc: 'Aviance Ghana leadership and team members participating in celebratory cultural dances with local school pupils.'
    },
    {
      id: 'classroom-art',
      image: csrClassroomArtImg,
      title: 'Creative Arts & Classroom Educational Supplies',
      category: 'Education & Youth',
      tag: 'Creative Learning',
      desc: 'Donation of educational craft kits, paints, and learning materials guided by dedicated Aviance staff mentors.'
    },
    {
      id: 'environment-clean',
      image: csrEnvironmentCleanImg,
      title: 'World Environment Day 2026 Employee Clean-Up',
      category: 'Environmental Stewardship',
      tag: 'Green Aviation',
      desc: 'Aviance Ghana staff members actively cleaning regional roadways and airside access perimeters in Accra.'
    }
  ];

  // All 12 Authentic Initiatives matching https://www.avianceghana.com/csr
  const officialInitiatives = [
    {
      id: 'autism-travel',
      year: 'Recent Milestone',
      title: 'Autistic Children Guided Travel Rehearsal',
      text: 'In collaboration with Emirates Airlines, Aviance Ghana supported autistic children through a guided travel rehearsal to build confidence and reduce anxiety before flying.',
      category: 'health',
      categoryLabel: 'Health & Inclusive Travel',
      partner: 'Emirates Airlines',
      icon: Heart,
      image: csrVolunteerImg
    },
    {
      id: 'world-environment-day',
      year: '2026',
      title: 'World Environment Day Employee Clean-Up Exercise',
      text: 'Environmental clean-up exercise involving employees to mark World Environment Day 2026.',
      category: 'environment',
      categoryLabel: 'Environmental Stewardship',
      partner: 'World Environment Day Initiative',
      icon: Leaf,
      image: csrEnvironmentCleanImg
    },
    {
      id: 'rotary-friend',
      year: 'Official Recognition',
      title: '"Friend of Rotary" Award by Rotary Club Accra-South',
      text: 'Recognised as a "Friend of Rotary" by Rotary Club Accra-South for Aviance Ghana\'s support of community-focused initiatives.',
      category: 'welfare',
      categoryLabel: 'Community Welfare',
      partner: 'Rotary Club Accra-South',
      icon: Award,
      image: csrCommunityDanceImg
    },
    {
      id: 'new-life-nungua',
      year: 'Long-standing',
      title: 'New Life Nungua Children\'s Home Collaboration',
      text: 'Support for New Life Nungua Children\'s Home in collaboration with Delta Air Lines.',
      category: 'welfare',
      categoryLabel: 'Child Welfare',
      partner: 'Delta Air Lines',
      icon: HeartHandshake,
      image: csrSantaKidsImg
    },
    {
      id: 'orbis-eye-hospital',
      year: 'Ongoing Mission',
      title: 'Orbis Flying Eye Hospital Ground-Handling Support',
      text: 'Full ground-handling support for the Orbis Flying Eye Hospital and its sight-restoration mission.',
      category: 'health',
      categoryLabel: 'Healthcare & Sight Restoration',
      partner: 'Orbis International',
      icon: Eye,
      image: csrChildLiftImg
    },
    {
      id: 'future-stars-charity',
      year: 'Long-term Partnership',
      title: 'Future Stars Charity Sports & Education Development',
      text: 'Long-term partnership with Future stars Charity, supporting children through education, sports development, financial contributions and aviation learning experiences.',
      category: 'education',
      categoryLabel: 'Education & Sports',
      partner: 'Future Stars Charity',
      icon: Users,
      image: csrClassroomArtImg
    },
    {
      id: 'teshie-children-home',
      year: '2020',
      title: 'Teshie Children\'s Home COVID-19 Food Relief',
      text: 'Donation of food items to the Teshie Children\'s Home during the COVID-19 pandemic in 2020.',
      category: 'welfare',
      categoryLabel: 'Child Welfare Relief',
      partner: 'Teshie Children\'s Home',
      icon: Heart,
      image: csrSantaKidsImg
    },
    {
      id: 'kalande-classroom-block',
      year: '2019',
      title: 'Construction of Six-Unit Classroom Block at Kalande',
      text: 'Construction of a six-unit classroom block at Kalande in the Savannah Region, in partnership with the McClan Foundation, in 2019.',
      category: 'education',
      categoryLabel: 'Educational Infrastructure',
      partner: 'McClan Foundation',
      icon: GraduationCap,
      image: csrCommunityDanceImg
    },
    {
      id: 'medical-screening',
      year: '2019',
      title: 'Public Health & Employee Medical Screening',
      text: 'Medical screening for employees and members of the public in 2019.',
      category: 'health',
      categoryLabel: 'Preventive Healthcare',
      partner: 'Regional Health Directorates',
      icon: ShieldCheck,
      image: csrVolunteerImg
    },
    {
      id: 'accra-psychiatric-hospital',
      year: '2019',
      title: 'Accra Psychiatric Hospital 25th Anniversary Food Donation',
      text: 'Donation of food items to the Accra Psychiatric Hospital during Aviance Ghana\'s 25th anniversary in 2019.',
      category: 'health',
      categoryLabel: 'Healthcare & Welfare',
      partner: 'Accra Psychiatric Hospital',
      icon: HeartHandshake,
      image: csrClassroomArtImg
    },
    {
      id: 'akrade-academy',
      year: '2011',
      title: 'Akrade Academy Sports Development Sponsorship',
      text: 'Financial support to Akrade Academy to promote sports development in 2011.',
      category: 'education',
      categoryLabel: 'Youth Sports',
      partner: 'Akrade Academy',
      icon: Users,
      image: csrChildLiftImg
    },
    {
      id: 'sustainable-gse-investment',
      year: 'Strategic Investment',
      title: 'USD $1 Million+ Eco-Friendly Sustainable GSE Fleet',
      text: 'Investment of approximately USD 1 million in environmentally sustainable ground-support equipment.',
      category: 'environment',
      categoryLabel: 'Green Aviation',
      partner: 'Airside Zero-Emission Fleet',
      icon: Leaf,
      image: csrEnvironmentCleanImg
    }
  ];

  const filtered = officialInitiatives;

  // Responsive cards per slide
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItemsCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItemsCount(2);
      } else {
        setVisibleItemsCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rolling Showcase for Initiatives
  const [initiativeSlide, setInitiativeSlide] = useState(0);
  const [isInitiativesPaused, setIsInitiativesPaused] = useState(false);

  // Rolling Showcase for Photo Gallery
  const [gallerySlide, setGallerySlide] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);

  const maxInitiativeSlide = Math.max(0, officialInitiatives.length - visibleItemsCount);
  const maxGallerySlide = Math.max(0, csrGallery.length - visibleItemsCount);

  // Auto-advance initiatives
  useEffect(() => {
    if (isInitiativesPaused) return;
    const interval = setInterval(() => {
      setInitiativeSlide((prev) => (prev >= maxInitiativeSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isInitiativesPaused, maxInitiativeSlide]);

  // Auto-advance photo gallery
  useEffect(() => {
    if (isGalleryPaused) return;
    const interval = setInterval(() => {
      setGallerySlide((prev) => (prev >= maxGallerySlide ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isGalleryPaused, maxGallerySlide]);

  // Unified Gestures for CSR Initiatives (Touch Swipe & Desktop Mouse Drag)
  const { handlers: initSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setInitiativeSlide((prev) => Math.min(prev + 1, maxInitiativeSlide)),
    onSwipeRight: () => setInitiativeSlide((prev) => Math.max(prev - 1, 0)),
    threshold: 45,
    enableMouseDrag: true,
  });

  // Unified Gestures for CSR Gallery (Touch Swipe & Desktop Mouse Drag)
  const { handlers: galSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setGallerySlide((prev) => Math.min(prev + 1, maxGallerySlide)),
    onSwipeRight: () => setGallerySlide((prev) => Math.max(prev - 1, 0)),
    threshold: 45,
    enableMouseDrag: true,
  });

  // Unified Gestures for 3D Cylindrical Hero Gallery (Touch Swipe & Desktop Mouse Drag)
  const { handlers: cylinderSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => handleSlideChange(nextIndex),
    onSwipeRight: () => handleSlideChange(prevIndex),
    threshold: 35,
    enableMouseDrag: true,
  });

  // Auto-rotate hero image show every 4.5 seconds continuously, even after controls are clicked
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const restartAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % csrGallery.length);
    }, 4500);
  }, [csrGallery.length]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [restartAutoplay]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    // Restart timer so user gets full 4.5s on selected slide before auto-advance resumes
    restartAutoplay();
  };

  const totalSlides = csrGallery.length;
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentSlide + 1) % totalSlides;

  const currentPhoto = csrGallery[currentSlide];
  const prevPhoto = csrGallery[prevIndex];
  const nextPhoto = csrGallery[nextIndex];

  // Calculate circular offset for 3D cylindrical roll
  const getDiff = (index: number) => {
    let d = (index - currentSlide) % totalSlides;
    if (d > totalSlides / 2) d -= totalSlides;
    if (d < -totalSlides / 2) d += totalSlides;
    if (d === -3) d = 3;
    return d;
  };

  // 3D rolling cylinder transform & depth styles
  const getCardStyle = (diff: number) => {
    if (diff === 0) {
      return {
        transform: 'translate(-50%, -50%) translateX(0%) translateZ(0px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        filter: 'drop-shadow(0 20px 30px rgba(15, 23, 42, 0.22))',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 1) {
      return {
        transform: 'translate(-50%, -50%) translateX(60%) translateZ(-90px) rotateY(-30deg) scale(0.85)',
        opacity: 0.85,
        zIndex: 20,
        filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.15))',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -1) {
      return {
        transform: 'translate(-50%, -50%) translateX(-60%) translateZ(-90px) rotateY(30deg) scale(0.85)',
        opacity: 0.85,
        zIndex: 20,
        filter: 'drop-shadow(0 10px 20px rgba(15, 23, 42, 0.15))',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 2) {
      return {
        transform: 'translate(-50%, -50%) translateX(114%) translateZ(-200px) rotateY(-48deg) scale(0.68)',
        opacity: 0.35,
        zIndex: 10,
        filter: 'drop-shadow(0 5px 10px rgba(15, 23, 42, 0.1))',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -2) {
      return {
        transform: 'translate(-50%, -50%) translateX(-114%) translateZ(-200px) rotateY(48deg) scale(0.68)',
        opacity: 0.35,
        zIndex: 10,
        filter: 'drop-shadow(0 5px 10px rgba(15, 23, 42, 0.1))',
        pointerEvents: 'auto' as const,
      };
    }
    return {
      transform: 'translate(-50%, -50%) translateX(0%) translateZ(-340px) rotateY(180deg) scale(0.4)',
      opacity: 0,
      zIndex: 0,
      filter: 'none',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32 bg-white">
      
      {/* 1. HERO HEADER WITH AUTHENTIC OVERLAPPING 3-IMAGE SHOWCASE */}
      <section className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 relative overflow-hidden">
        {/* Aviance Identity Tri-Color Top Accent Line */}
        <div className="h-[3.5px] w-full absolute top-0 left-0 bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-6 text-center">
          {/* Official Page Title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-slate-900 leading-[1.14]">
              Corporate Social Responsibility
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
              Empowering local communities, youth education, sustainable healthcare and sports development across Ghana.
            </p>
          </div>

          {/* AUTHENTIC 3D ROLLING IMAGE CAROUSEL SHOWCASE (Rolling cylinder animation across all 6 CSR photos) */}
          <div className="relative max-w-5xl mx-auto pt-2 pb-2 px-2 sm:px-4">
            
            {/* The 3D Rolling Carousel Cylinder Stage with Unified Gestures */}
            <div
              {...cylinderSwipeHandlers}
              className="relative w-full h-[290px] sm:h-[350px] md:h-[400px] flex items-center justify-center [perspective:1200px] overflow-hidden select-none my-2 cursor-grab active:cursor-grabbing"
            >
              
              {/* Floating Left Arrow Button */}
              <button
                type="button"
                onClick={() => handleSlideChange(prevIndex)}
                aria-label="Previous photo in rolling show"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#204696] shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs group"
                title={`Previous: ${prevPhoto.title}`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* All 6 Photos in 3D Rolling Drum Cylinder */}
              {csrGallery.map((photo, index) => {
                const diff = getDiff(index);
                const cardStyle = getCardStyle(diff);

                return (
                  <div
                    key={photo.id}
                    onClick={() => {
                      if (diff !== 0) {
                        handleSlideChange(index);
                      }
                    }}
                    style={{
                      ...cardStyle,
                      transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease',
                    }}
                    className="absolute left-1/2 top-1/2 w-[270px] sm:w-[350px] md:w-[410px] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white bg-slate-900 cursor-pointer group"
                    title={photo.title}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* 3D Rolling Cylinder Shading Gradient for Side Items */}
                    {diff !== 0 && (
                      <div
                        className={`absolute inset-0 transition-opacity ${
                          diff > 0
                            ? 'bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950/50'
                            : 'bg-gradient-to-l from-transparent via-slate-950/20 to-slate-950/50'
                        }`}
                      />
                    )}

                    {diff !== 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/30">
                        <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/95 text-[#204696] shadow-md backdrop-blur-xs">
                          Click to roll
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Floating Right Arrow Button */}
              <button
                type="button"
                onClick={() => handleSlideChange(nextIndex)}
                aria-label="Next photo in rolling show"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#204696] shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs group"
                title={`Next: ${nextPhoto.title}`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Clean Minimalist Indicators & Details (Small thumbnail images removed) */}
            <div className="space-y-3 pt-3">
              {/* Smooth Rolling Progress Dots */}
              <div className="flex items-center justify-center gap-2">
                {csrGallery.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => handleSlideChange(idx)}
                    className={`h-2.5 rounded-full transition-all duration-400 cursor-pointer ${
                      currentSlide === idx
                        ? 'w-8 bg-[#204696] shadow-xs'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Roll to photo ${idx + 1}: ${photo.title}`}
                    title={`Photo ${idx + 1}: ${photo.title}`}
                  />
                ))}
              </div>

              {/* Active Photo Caption & Info */}
              <div className="max-w-xl mx-auto px-4 py-2 text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#204696]/10 text-[#204696] uppercase tracking-wider">
                    {currentPhoto.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Photo {currentSlide + 1} of {totalSlides}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {currentPhoto.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                  {currentPhoto.desc}
                </p>
              </div>
            </div>

          </div>

          {/* Authentic Introductory Text from avianceghana.com/csr */}
          <div className="max-w-3xl mx-auto space-y-4 pt-2 text-left sm:text-center">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              Aviance Ghana is committed to supporting communities, advancing education and healthcare, protecting the environment and improving the wellbeing of children and vulnerable groups.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Aviance Ghana's commitment to community impact and sustainability was recognised with the <strong className="text-slate-900">Excellence in Corporate Social Responsibility Award</strong> at the 2025 Ghana Shippers' Authority Awards.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* 2. OFFICIAL EXCELLENCE IN CSR AWARD CARD */}
        <div className="py-8 sm:py-12 border-b border-slate-200 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Official Industry Recognition <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Ghana Shippers' Authority</span>
                </h3>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Winner of the <span className="text-[#204696]">Excellence in CSR Award</span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Conferred at the prestigious <strong>Ghana Shippers’ Authority Awards</strong>, this honor recognizes Aviance Ghana’s outstanding track record of investing back into the Ghanaian community — from rural school building and medical mission turnarounds to neurodiverse travel accessibility and airside green fleet modernization.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-800">
                  Awarding Body: Ghana Shippers’ Authority
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#72BF44]/15 border border-[#72BF44]/35 font-bold text-[#3B7A1C]">
                  Citation: Corporate Social Responsibility Excellence
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 text-center space-y-3 pt-6 lg:pt-0 lg:border-l border-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto shadow-2xs">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900">30+ Years of Giving Back</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Empowering Ghana’s aviation corridors, children's homes and regional communities since 1994.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-[#204696]">
                <ShieldCheck className="w-4 h-4 text-[#72BF44]" />
                <span>Certified Sustainable Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPLETE AUTHENTIC CSR INITIATIVES SECTION (ROLLING SHOWCASE + IMAGES) */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6 text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Real Community Impact <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">1994 – 2026</span>
                </h3>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Our recent and long-standing CSR initiatives include:
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                From humanitarian medical airlifts and child welfare support to rural school building and environmental stewardship, explore Aviance Ghana's certified community contributions.
              </p>
            </div>
          </div>

          {/* Rolling Showcase Mode with Dedicated Gutters and Side Circular Navigation Buttons */}
          <div
            className="relative px-8 sm:px-12 lg:px-16 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsInitiativesPaused(true)}
            onMouseLeave={() => setIsInitiativesPaused(false)}
            {...initSwipeHandlers}
          >
            {/* Left Side Arrow Button */}
            {officialInitiatives.length > visibleItemsCount && (
              <button
                type="button"
                onClick={() => setInitiativeSlide((prev) => (prev <= 0 ? maxInitiativeSlide : prev - 1))}
                aria-label="Previous initiative"
                className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Side Arrow Button */}
            {officialInitiatives.length > visibleItemsCount && (
              <button
                type="button"
                onClick={() => setInitiativeSlide((prev) => (prev >= maxInitiativeSlide ? 0 : prev + 1))}
                aria-label="Next initiative"
                className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <div className="overflow-hidden -mx-3 py-2">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${initiativeSlide * (100 / visibleItemsCount)}%)`
                  }}
                >
                  {officialInitiatives.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                      >
                        <div className="h-full flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group text-left">
                          {/* Card Image */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#204696] transition-colors leading-snug line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                                {item.text}
                              </p>
                            </div>

                            {/* Partner / Verification Footer */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-[11px] font-semibold text-[#3B7A1C] flex items-center gap-1 truncate max-w-[80%]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44] shrink-0" />
                                <span className="truncate">{item.partner}</span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modern Numbered Slide Indicator Capsule */}
              <div className="flex items-center justify-center pt-4">
                <SlidePagination
                  current={initiativeSlide}
                  total={maxInitiativeSlide + 1}
                  onChange={setInitiativeSlide}
                />
              </div>
            </div>
          </div>

        {/* 4. AUTHENTIC OPERATIONAL PHOTOGRAPHY GALLERY (ROLLING SHOWCASE) */}
        <div className="pt-10 sm:pt-14 border-t border-slate-200 text-left space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Authentic CSR Photography <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Official Archive</span>
                </h3>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Moments of Community Stewardship
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                High-resolution authentic imagery captured directly from our educational outreaches, environmental clean-ups, and children's home celebrations across Ghana.
              </p>
            </div>
          </div>

          {/* Rolling Gallery Mode with Dedicated Gutters and Side Circular Navigation Buttons */}
          <div
            className="relative px-8 sm:px-12 lg:px-16 select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsGalleryPaused(true)}
            onMouseLeave={() => setIsGalleryPaused(false)}
            {...galSwipeHandlers}
          >
            {/* Left Side Arrow Button */}
            {csrGallery.length > visibleItemsCount && (
              <button
                type="button"
                onClick={() => setGallerySlide((prev) => (prev <= 0 ? maxGallerySlide : prev - 1))}
                aria-label="Previous photo"
                className="absolute left-0 sm:left-1 lg:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Side Arrow Button */}
            {csrGallery.length > visibleItemsCount && (
              <button
                type="button"
                onClick={() => setGallerySlide((prev) => (prev >= maxGallerySlide ? 0 : prev + 1))}
                aria-label="Next photo"
                className="absolute right-0 sm:right-1 lg:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl border border-slate-200/90 text-slate-700 hover:text-white hover:bg-[#204696] hover:border-[#204696] active:scale-90 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <div className="overflow-hidden -mx-3 py-2">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${gallerySlide * (100 / visibleItemsCount)}%)`
                }}
              >
                {csrGallery.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div
                      onClick={() => {
                        setCurrentSlide(index);
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      title={`View photo: ${photo.title}`}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Swissport Dark Gradient Overlay (Guarantees 100% Crisp Title Contrast) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 via-45% to-transparent pointer-events-none" />

                      {/* Top Category Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#204696]/90 text-white backdrop-blur-md shadow-xs">
                          {photo.tag}
                        </span>
                      </div>

                      {/* Bottom Title & Action (High Contrast Crisp White Text) */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 space-y-1.5 text-left pointer-events-none">
                        <h4 className="text-base sm:text-lg font-bold !text-white leading-snug drop-shadow-md">
                          {photo.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] !text-slate-200 line-clamp-2 font-normal leading-relaxed drop-shadow-xs">
                          {photo.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modern Numbered Slide Indicator Capsule */}
            <div className="flex items-center justify-center pt-4">
              <SlidePagination
                current={gallerySlide}
                total={maxGallerySlide + 1}
                onChange={setGallerySlide}
              />
            </div>
          </div>
        </div>

        {/* 5. COMMUNITY PARTNERSHIP CALL TO ACTION */}
        <div className="pt-12 sm:pt-16 border-t border-slate-200 text-left space-y-5">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#204696] border border-blue-100">
              Community & NGO Collaboration
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Partner With Aviance Ghana for Sustainable Social Impact
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Are you an airline partner, humanitarian medical team, educational institution, or NGO seeking airside handling collaboration or community sponsorship in Ghana? Our CSR desk welcomes value-driven partnerships.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/contact')}
                className="btn-primary group"
              >
                <span>Contact Our Corporate CSR Desk</span>
                <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <a
                href="mailto:info@avianceghana.com?subject=CSR%20Partnership%20Enquiry"
                className="btn-link group sm:pl-3"
              >
                <Mail className="w-4 h-4 text-[#72BF44]" />
                <span className="link-label lowercase font-mono">info@avianceghana.com</span>
                <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
