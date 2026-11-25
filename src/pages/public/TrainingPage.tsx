import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Plane,
  Car,
  Truck,
  PackageCheck,
  Clock,
  Headphones,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  Calendar,
  ArrowRight,
  Building2,
  Monitor,
  Presentation,
  CheckCircle2,
  X,
  FileCheck,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Send
} from 'lucide-react';
import { SlidePagination } from '../../components/ui/SlidePagination';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

// Authentic Aviance Training Room & Academy Photography
import TRAINING_ROOM_IMG from '../../assets/aviance_images/image_show/1740561240681.jpg'; // Real Aviance Training Room with instructor and class

interface TrainingPageProps {
  onNavigate: (path: string) => void;
}

interface CourseItem {
  id: string;
  title: string;
  category: 'Safety & Compliance' | 'Ground Operations' | 'Customer & Cargo';
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
}

interface RoomItem {
  id: string;
  name: string;
  capacityNumber: number;
  capacityText: string;
  icon: React.ComponentType<{ className?: string }>;
  idealFor: string;
  amenities: string[];
  badge: string;
  image?: string;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const courses: CourseItem[] = [
    {
      id: 'sms',
      title: 'Safety Management Systems',
      category: 'Safety & Compliance',
      icon: ShieldCheck,
      tag: 'IATA & GCAA Compliant',
      description: 'Airside hazard identification, safety risk assessment, incident reporting and continual safety culture.'
    },
    {
      id: 'human-factors',
      title: 'Human Factors',
      category: 'Safety & Compliance',
      icon: Users,
      tag: 'Human Performance',
      description: 'Fatigue mitigation, situational awareness, communication and human error avoidance in fast-paced apron operations.'
    },
    {
      id: 'ramp-safety',
      title: 'Ramp Safety',
      category: 'Ground Operations',
      icon: Plane,
      tag: 'Airside Ramp Essential',
      description: 'Aircraft danger zones, engine blast clearance, foreign object debris (FOD) prevention and personal protective protocols.'
    },
    {
      id: 'customer-service',
      title: 'Customer Service',
      category: 'Customer & Cargo',
      icon: Headphones,
      tag: 'Passenger Experience',
      description: 'Aviation hospitality standards, conflict de-escalation, premium passenger care and frontline service delivery.'
    },
    {
      id: 'passenger-handling',
      title: 'Passenger Handling',
      category: 'Customer & Cargo',
      icon: Users,
      tag: 'Terminal Operations',
      description: 'Departure control systems, passenger check-in procedures, gate boarding facilitation and special assistance passenger care.'
    },
    {
      id: 'turnaround-coordination',
      title: 'Turnaround Coordination',
      category: 'Ground Operations',
      icon: Clock,
      tag: 'Precision Dispatch',
      description: 'Aircraft turnaround timeline management, service provider synchronization and on-time departure execution.'
    },
    {
      id: 'airside-driving',
      title: 'Airside Driving',
      category: 'Ground Operations',
      icon: Car,
      tag: 'Airside Driving Permit',
      description: 'Apron driving regulations, speed limits, vehicle clearance buffers, runway crossing safeguards and airport authority rules.'
    },
    {
      id: 'tractor-driving',
      title: 'Tractor Driving',
      category: 'Ground Operations',
      icon: Truck,
      tag: 'Heavy GSE Maneuvering',
      description: 'Baggage tug operations, dollies handling, safe maneuvering in tight apron corridors and coupling/decoupling procedures.'
    },
    {
      id: 'cargo-handling',
      title: 'Cargo and Mail Handling',
      category: 'Customer & Cargo',
      icon: PackageCheck,
      tag: 'Airfreight & Mail',
      description: 'Secure warehouse cargo processing, ULD build-up, dangerous goods awareness and mail documentation standards.'
    }
  ];

  const rooms: RoomItem[] = [
    {
      id: 'large-room',
      name: 'Large Training Room',
      capacityNumber: 25,
      capacityText: 'capacity of 25 people.',
      icon: Presentation,
      badge: 'Workshops & Large Cohorts',
      idealFor: 'Full airline team inductions, company-wide certifications, and operational seminars.',
      amenities: ['Full HD Projector & Motorized Screen', 'Dual Magnetic Whiteboards', 'High-Speed Wi-Fi', 'Flexible Desk Arrangements'],
      image: TRAINING_ROOM_IMG,
    },
    {
      id: 'standard-room',
      name: 'Standard Training Room',
      capacityNumber: 12,
      capacityText: 'capacity of 12 people.',
      icon: Monitor,
      badge: 'Interactive Seminars',
      idealFor: 'Specialist modules, supervisor trainings, recurrent safety workshops, and committee sessions.',
      amenities: ['65" Ultra HD Presentation Display', 'Conference Audio-Visual Setup', 'Whiteboard & Flipcharts', 'Ergonomic Executive Seating'],
      image: TRAINING_ROOM_IMG,
    },
    {
      id: 'small-room',
      name: 'Small Training Room',
      capacityNumber: 6,
      capacityText: 'capacity of 6 people.',
      icon: Building2,
      badge: 'Briefings & Meetings',
      idealFor: 'Executive debriefs, airline client meetings, one-on-one evaluations, and dispatch reviews.',
      amenities: ['Conference Table Setup', 'HDMI & Wireless Screencast', 'Dedicated High-Speed Wi-Fi', 'Quiet Air-Conditioned Environment'],
      image: TRAINING_ROOM_IMG,
    }
  ];

  // Rolling Showcase of 4 Courses
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(4);
  const [courseSlide, setCourseSlide] = useState(0);
  const [isCoursesPaused, setIsCoursesPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCoursesCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCoursesCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCoursesCount(3);
      } else {
        setVisibleCoursesCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxCourseSlide = Math.max(0, courses.length - visibleCoursesCount);

  // Auto-advance courses every 4.5 seconds
  useEffect(() => {
    if (isCoursesPaused) return;
    const interval = setInterval(() => {
      setCourseSlide((prev) => (prev >= maxCourseSlide ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isCoursesPaused, maxCourseSlide]);

  // Touch swipe & mouse drag gestures
  const { handlers: courseSwipeHandlers } = useSwipeGesture({
    onSwipeLeft: () => setCourseSlide((prev) => Math.min(prev + 1, maxCourseSlide)),
    onSwipeRight: () => setCourseSlide((prev) => Math.max(prev - 1, 0)),
    threshold: 40,
    enableMouseDrag: true,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@avianceghana.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('/services')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              Services
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">Training</span>
          </div>
        </div>
      </div>

      {/* Hero Section — Clean Header without dark banner */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs sm:text-sm font-semibold text-[#204696]">
                <GraduationCap className="w-4 h-4 text-[#009EE0]" />
                <span>Aviance Ghana Training &amp; Academy</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase">
                  TRAINING
                </h1>
                <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                  Aviance Ghana provides practical aviation training designed to strengthen safety, operational performance and service delivery across international airport environments.
                </p>
              </div>

              {/* Key Quick Facts Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">9 Certified Courses</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <Building2 className="w-4 h-4 text-[#204696]" />
                  <span className="font-semibold text-slate-800">3 Training Rooms</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <FileCheck className="w-4 h-4 text-[#72BF44]" />
                  <span className="font-semibold text-slate-800">IATA / GCAA Compliant</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('courses-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#204696]/20 transition-all cursor-pointer"
                >
                  <span>Explore 9 Accredited Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('rooms-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 shadow-xs transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#204696]" />
                  <span>Hire Training Facility</span>
                </button>
              </div>
            </div>

            {/* Authentic Classroom Photo Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden group bg-slate-100 shadow-xl border border-slate-200/90">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={TRAINING_ROOM_IMG}
                    alt="Aviance Ghana Training Room in session with instructors and students"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* SECTION 1: COURSES OFFERED (ROLLING SHOWCASE OF 4) */}
        <section id="courses-section" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#204696] uppercase tracking-wider mb-1">
                <FileCheck className="w-4 h-4" />
                Accredited Curriculum
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11244C] flex items-center gap-2">
                <span>Courses Offered</span>
              </h2>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-4">
              <p className="text-xs sm:text-sm text-slate-500 max-w-md hidden sm:block">
                Specialized ground handling and safety modules tailored for airlines and personnel.
              </p>
              
              {/* Rolling Chevron Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCourseSlide((prev) => Math.max(0, prev - 1))}
                  disabled={courseSlide === 0}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  aria-label="Previous courses"
                  title="Previous courses"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCourseSlide((prev) => Math.min(maxCourseSlide, prev + 1))}
                  disabled={courseSlide >= maxCourseSlide}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  aria-label="Next courses"
                  title="Next courses"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Rolling Showcase Container with Drag/Swipe Support */}
          <div
            {...courseSwipeHandlers}
            onMouseEnter={() => setIsCoursesPaused(true)}
            onMouseLeave={() => setIsCoursesPaused(false)}
            className="relative select-none cursor-grab active:cursor-grabbing space-y-4"
          >
            <div className="overflow-hidden -mx-3 py-2">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${courseSlide * (100 / visibleCoursesCount)}%)`
                }}
              >
                {courses.map((course, idx) => {
                  const IconComp = course.icon;
                  return (
                    <div
                      key={course.id}
                      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 shrink-0 px-3"
                    >
                      <div className="h-full flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#204696]/40 hover:shadow-lg transition-all duration-300 space-y-4 text-left group">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#204696] flex items-center justify-center group-hover:bg-[#204696] group-hover:text-white transition-all duration-300 shadow-xs">
                              <IconComp className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              {course.tag}
                            </span>
                          </div>

                          <div>
                            <div className="text-[11px] font-bold text-[#009EE0] uppercase tracking-wider mb-1">
                              Course #{idx + 1}
                            </div>
                            <h3 className="text-base font-bold text-[#11244C] group-hover:text-[#204696] transition-colors leading-snug">
                              {course.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[55%]">
                            {course.category}
                          </span>
                          <span className="text-[10px] font-bold text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 shrink-0">
                            Accredited
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slide Pagination Capsule */}
            <div className="flex items-center justify-center pt-2">
              <SlidePagination
                current={courseSlide}
                total={maxCourseSlide + 1}
                onChange={setCourseSlide}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: TRAINING ROOM HIRE */}
        <section id="rooms-section" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#72BF44] uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                Airport Facilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11244C]">
                Training Room Hire
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              Our training rooms are available for training sessions, workshops and meetings at Kotoka International Airport.
            </p>
          </div>

          {/* 3 Training Rooms Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => {
              const RoomIcon = room.icon;
              return (
                <div
                  key={room.id}
                  className="group flex flex-col justify-between space-y-4 transition-all"
                >
                  {room.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                      <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 px-2.5 py-0.5 rounded backdrop-blur-xs">
                        Official Aviance Training Centre
                      </span>
                    </div>
                  )}

                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#72BF44] flex items-center justify-center">
                          <RoomIcon className="w-6 h-6 text-[#204696]" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#204696]/10 text-[#204696]">
                          {room.capacityNumber} Seats
                        </span>
                      </div>

                      <div className="mt-4">
                        <span className="text-[11px] font-bold text-[#009EE0] uppercase tracking-wider">
                          {room.badge}
                        </span>
                        <h3 className="text-lg font-bold text-[#11244C] mt-0.5">
                          {room.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          — {room.capacityText}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                          {room.idealFor}
                        </p>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Room Amenities:
                      </p>
                      <ul className="space-y-1.5">
                        {room.amenities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-[#72BF44] mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INQUIRIES & CONTACT CARD */}
        <section className="bg-gradient-to-r from-slate-900 via-[#11244C] to-[#204696] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle circles in background */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs sm:text-sm font-semibold text-blue-200">
              <Mail className="w-4 h-4 text-[#009EE0]" />
              Official Course Schedules & Reservations
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to Book a Course or Training Room?
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
              For course schedules, training fees, room availability and bookings, please email{' '}
              <a
                href="mailto:info@avianceghana.com?subject=Aviance%20Ghana%20Training%20%26%20Room%20Hire%20Inquiry"
                className="font-bold text-[#009EE0] underline underline-offset-4 hover:text-white transition-colors"
              >
                info@avianceghana.com
              </a>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="mailto:info@avianceghana.com?subject=Aviance%20Ghana%20Training%20%26%20Room%20Hire%20Inquiry"
                className="btn-accent group !py-3.5 !px-7"
              >
                <Mail className="w-4 h-4" />
                <span>Email info@avianceghana.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-sm"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied info@avianceghana.com</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-blue-200" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Kotoka International Airport, Terminal 3 / Cargo Village, Accra
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                GCAA Approved Training Facility
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TrainingPage;
