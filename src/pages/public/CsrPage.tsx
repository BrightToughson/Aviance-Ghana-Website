import React, { useState, useEffect } from 'react';
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
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

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

  // Auto-rotate hero image show every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % csrGallery.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, csrGallery.length]);

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

        <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
              Community Stewardship <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Sustainable Aviation</span>
            </h2>
          </div>

          {/* Official Page Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Corporate Social Responsibility
          </h1>

          {/* AUTHENTIC 3D ROLLING IMAGE CAROUSEL SHOWCASE (Rolling cylinder animation across all 6 CSR photos) */}
          <div className="relative max-w-5xl mx-auto pt-2 pb-2 px-2 sm:px-4">
            
            {/* The 3D Rolling Carousel Cylinder Stage */}
            <div
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="relative w-full h-[290px] sm:h-[350px] md:h-[400px] flex items-center justify-center [perspective:1200px] overflow-hidden select-none my-2"
            >
              
              {/* Floating Left Arrow Button */}
              <button
                type="button"
                onClick={() => setCurrentSlide(prevIndex)}
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
                        setCurrentSlide(index);
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

                    {/* Active Center Card Badges */}
                    {diff === 0 ? (
                      <>
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#3B7A1C]/95 text-white shadow-xs backdrop-blur-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{photo.tag}</span>
                          </span>
                        </div>
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/85 text-white shadow-xs backdrop-blur-xs">
                            {index + 1} of {totalSlides}
                          </span>
                        </div>
                      </>
                    ) : (
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
                onClick={() => setCurrentSlide(nextIndex)}
                aria-label="Next photo in rolling show"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#204696] shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs group"
                title={`Next: ${nextPhoto.title}`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Clean Minimalist Indicators & Details (Small thumbnail images removed) */}
            <div className="space-y-3 pt-3">
              {/* Smooth Rolling Progress Dots + Pause/Play */}
              <div className="flex items-center justify-center gap-2">
                {csrGallery.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
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

              {/* Active Photo Caption & Info Card */}
              <div className="max-w-xl mx-auto px-4 py-2.5 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
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
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/90 bg-gradient-to-r from-blue-50/70 via-white to-emerald-50/50 shadow-sm relative overflow-hidden text-left">
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
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-800 shadow-2xs">
                  Awarding Body: Ghana Shippers’ Authority
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#72BF44]/15 border border-[#72BF44]/35 font-bold text-[#3B7A1C]">
                  Citation: Corporate Social Responsibility Excellence
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto shadow-2xs">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-lg text-slate-900">30+ Years of Giving Back</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empowering Ghana’s aviation corridors, children's homes and regional communities since 1994.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-[#204696]">
                <ShieldCheck className="w-4 h-4 text-[#72BF44]" />
                <span>Certified Sustainable Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPLETE AUTHENTIC CSR INITIATIVES SECTION */}
        <div className="space-y-8">
          <div className="space-y-3 max-w-3xl text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Real Community Impact <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">1994 – 2026</span>
              </h3>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Our recent and long-standing CSR initiatives include:
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From humanitarian medical airlifts and child welfare support to rural school building and environmental stewardship, explore Aviance Ghana's certified community contributions.
            </p>
          </div>

          {/* Grid of all 12 authentic initiatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#204696]/40 transition-all group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top Row: Year/Milestone & Pillar Icon */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-blue-50 text-[#204696] border border-blue-100 uppercase tracking-wider">
                        {item.year}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#204696] group-hover:bg-[#204696] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Initiative Title */}
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#204696] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    {/* Exact Official Text */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.text}
                    </p>
                  </div>

                  {/* Partner / Pillar Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#3B7A1C] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#72BF44]" />
                      <span>{item.partner}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. AUTHENTIC OPERATIONAL PHOTOGRAPHY GALLERY (All 6 Photos from the csr folder) */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 text-left space-y-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Authentic CSR Photography <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Official Archive</span>
              </h3>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Moments of Community Stewardship
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              High-resolution authentic imagery captured directly from our educational outreaches, environmental clean-ups, and children's home celebrations across Ghana.
            </p>
          </div>

          {/* 6-Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {csrGallery.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => {
                  setCurrentSlide(index);
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                title={`Roll to photo: ${photo.title}`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#204696]/90 text-white backdrop-blur-xs shadow-xs">
                    {photo.tag}
                  </span>
                </div>

                {/* Bottom Title & Action */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 space-y-1 text-white">
                  <h4 className="text-xs sm:text-sm font-bold leading-tight drop-shadow-xs">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 font-normal leading-relaxed">
                    {photo.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. COMMUNITY PARTNERSHIP CALL TO ACTION */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#204696] via-[#1A387A] to-[#0E2046] text-white p-8 sm:p-12 text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#009EE0]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-[#58C1EB] border border-white/20">
              Community & NGO Collaboration
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Partner With Aviance Ghana for Sustainable Social Impact
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              Are you an airline partner, humanitarian medical team, educational institution, or NGO seeking airside handling collaboration or community sponsorship in Ghana? Our CSR desk welcomes value-driven partnerships.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#204696] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Contact Our Corporate CSR Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:info@avianceghana.com?subject=CSR%20Partnership%20Enquiry"
                className="px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>info@avianceghana.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
