import React, { useState } from 'react';
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
  Send
} from 'lucide-react';

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
      capacityNumber: 8,
      capacityText: 'capacity of 8 people.',
      icon: Building2,
      badge: 'Briefings & Meetings',
      idealFor: 'Executive debriefs, airline client meetings, one-on-one evaluations, and dispatch reviews.',
      amenities: ['Conference Table Setup', 'HDMI & Wireless Screencast', 'Dedicated High-Speed Wi-Fi', 'Quiet Air-Conditioned Environment'],
      image: TRAINING_ROOM_IMG,
    }
  ];

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

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              GCAA & IATA ISAGO Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-12 sm:py-16 lg:py-20">
        {/* Subtle aeronautical runway grid backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Decorative ambient glowing orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#009EE0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#72BF44]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-blue-100">
                <GraduationCap className="w-4 h-4 text-[#009EE0]" />
                <span>Aviance Ghana Training & Academy</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
                  TRAINING
                </h1>
                <p className="text-base sm:text-xl text-blue-100/90 font-light leading-relaxed max-w-2xl">
                  Aviance Ghana provides practical aviation training designed to strengthen safety, operational performance and service delivery across international airport environments.
                </p>
              </div>

              {/* Key Quick Facts Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">9 Certified Courses</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs">
                  <Building2 className="w-4 h-4 text-[#009EE0]" />
                  <span className="font-semibold text-white">3 Training Rooms</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold text-white">Kotoka Airport Base</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="mailto:info@avianceghana.com?subject=Aviance%20Ghana%20Training%20%26%20Room%20Hire%20Inquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#009EE0] hover:bg-[#008bc5] text-white text-sm font-bold shadow-lg shadow-[#009EE0]/30 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Email info@avianceghana.com
                </a>
                <button
                  onClick={() => {
                    const elem = document.getElementById('room-hire-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-blue-200" />
                  View Training Rooms
                </button>
              </div>
            </div>

            {/* Authentic Classroom Photo Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40 group bg-slate-950">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={TRAINING_ROOM_IMG}
                    alt="Aviance Ghana Training Room in session with instructors and students"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 bg-[#204696]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#58C1EB]/40 flex items-center gap-1.5 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#72BF44] animate-pulse" />
                    Kotoka Airport Academy Base
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono font-bold text-[#58C1EB] uppercase tracking-wider block">
                      Official Training Room
                    </span>
                    <h3 className="text-white text-sm sm:text-base font-bold drop-shadow">
                      Certified Ground Operations Induction & Safety Class
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* SECTION 1: COURSES OFFERED */}
        <section className="space-y-8">
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
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Specialized ground handling and safety modules tailored for airlines, airport authorities, and handling personnel.
            </p>
          </div>

          {/* 9 Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, idx) => {
              const IconComp = course.icon;
              return (
                <div
                  key={course.id}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#204696]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#204696] flex items-center justify-center group-hover:bg-[#204696] group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {course.tag}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-[#009EE0] uppercase tracking-wider mb-1">
                        Course #{idx + 1}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#11244C] group-hover:text-[#204696] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-[#204696] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      Accredited Course
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: TRAINING ROOM HIRE */}
        <section id="room-hire-section" className="space-y-8 scroll-mt-24">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => {
              const RoomIcon = room.icon;
              return (
                <div
                  key={room.id}
                  className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {room.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
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

                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#009EE0] hover:bg-[#0089c2] text-white text-sm font-bold shadow-lg shadow-[#009EE0]/30 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Email info@avianceghana.com
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 backdrop-blur-md transition-all cursor-pointer"
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
