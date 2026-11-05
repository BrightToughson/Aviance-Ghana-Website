import React, { useEffect } from 'react';
import {
  Plane,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Heart,
  Eye,
  Target,
  Compass,
  Building2,
  TrendingUp,
  MapPin,
  Calendar,
  Mail
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import careersTeamImg from '../../assets/aviance_images/careers_team.jpg';
import isagoCertImg from '../../assets/aviance_images/certificates/f52640_e678c4204cbd4ff1ae9a7afb634acf02~mv2.jpg';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  useEffect(() => {
    if (window.location.pathname === '/csr' || window.location.hash === '#csr') {
      setTimeout(() => {
        const el = document.getElementById('csr');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32 bg-white">
      {/* Hero Header */}
      <div className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200 bg-slate-50 text-slate-900 relative overflow-hidden">
        <ScrollReveal animation="fade-up">
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Aviance Ghana Limited <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Established 1994</span>
              </h2>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              About Aviance Ghana
            </h1>

            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-600">
              Ghana's premier aviation ground handling agent, delivering certified passenger services, ramp turnaround, cold-chain cargo logistics, and executive lounge hospitality across Accra, Kumasi, and Tamale.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* AUTHENTIC CORPORATE PROFILE: WHO WE ARE & WHAT WE DO */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12 relative text-left hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Authentic Content */}
              <div className="lg:col-span-7 space-y-8">
                {/* Who We Are */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                      About Aviance Ghana Limited <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Established 1994</span>
                    </h2>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Who We Are
                  </h3>

                  <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <p>
                      At Aviance Ghana, we are passionate about delivering exceptional aviation, logistics and travel experince's that connect Ghana to the world. Aviance Ghana is an ISAGO-registered ground service provider, demonstrating our commitment to internationally recognised standards for the safety and oversight of ground operations.
                    </p>

                    <p>
                      With a strong commitment to service excellence focused on safety, integrity, quality and teamwork we work behind the scenes and on the frontline to ensure our customer airlines passengers and cargo are handled with care and efficiency. Our dedicated departments bring together expertise developed using international best practices since we were established in 1994 at Accra Kotoka International Airport.
                    </p>

                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/40 to-emerald-50/50 border-l-4 border-[#204696] border-y border-r border-slate-200 shadow-2xs">
                      <p className="font-semibold text-slate-900 italic text-sm sm:text-base leading-relaxed">
                        “At Aviance Ghana, we believe great service is more than getting people and cargo from one destination to another, it is about creating confidence and convenience for our customers making us stronger together.”
                      </p>
                    </div>
                  </div>
                </div>

                {/* What We Do */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#009EE0] via-[#72BF44] to-[#204696]" />
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                      Comprehensive Aviation Ground Support <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">24/7 Operations</span>
                    </h2>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    What We Do
                  </h3>

                  <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <p className="font-semibold text-slate-900">
                      Aviance Ghana is your trusted partner for Airline and Cargo Operations in Accra, Kumasi and Tamale.
                    </p>

                    <p>
                      When flying to Accra, Kumasi or Tamale on scheduled, charter, ad hoc or one off basis you need a partner who can make every operational detail seamless.
                    </p>

                    <p>
                      Aviance Ghana provides a complete range of ground handling and aviation support services, tailored for your operation from landing permits to push back and everything in-between. From the moment your aircraft arrives, to its departure, our experienced team coordinates the services, people and suppliers needed for your operation.
                    </p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                      We will manage preflight approvals, passenger handling, ramp services, baggage handling, aircraft turnaround coordination, cargo support and VIP handling and lounge services.
                    </div>

                    <p>
                      Please contact our Operations Control Centre for further details about our ground handling and aviation services.
                    </p>

                    {/* OCC Direct Enquiries Card */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0F2E53] to-[#153170] text-white space-y-3 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-mono text-[#58C1EB] uppercase tracking-wider font-bold block">
                            Operations Control Centre (OCC)
                          </span>
                          <span className="text-sm font-bold text-white">
                            OCC Enquiries:
                          </span>
                        </div>
                        <a
                          href="mailto:occmgr@avianceghana.com?subject=Enquiries%20-%20Ground%20Support%20in%20Ghana"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#009EE0] hover:bg-[#0089C4] text-white font-bold text-xs shadow-sm hover:scale-105 transition-all cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>occmgr@avianceghana.com</span>
                        </a>
                      </div>
                      <p className="text-xs text-blue-100/90 font-medium italic border-t border-white/10 pt-2.5">
                        “We look forward to arranging your ground support here in Ghana.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Frontline Team & Official ISAGO Certificate */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group relative">
                  <img
                    src={careersTeamImg}
                    alt="Aviance Ghana Passenger Services & Operations Team"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="p-4 bg-slate-900 text-white space-y-1 text-left">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#58C1EB]">Frontline & Behind the Scenes</span>
                      <span className="text-slate-400 font-mono text-[11px]">Since 1994</span>
                    </div>
                    <p className="text-xs text-slate-300 font-normal">
                      Our dedicated staff delivering exceptional aviation, logistics and hospitality experiences.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs text-left space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#3B7A1C]" />
                      <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                        Certificate of Accreditation
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#72BF44]/20 text-[#3B7A1C]">
                      ISAGO Certified
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-white p-2 shadow-2xs">
                    <img
                      src={isagoCertImg}
                      alt="IATA ISAGO Certificate of Accreditation for Aviance Ghana Limited"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs text-slate-600">
                    <span>Accredited Ground Operations</span>
                    <button
                      onClick={() => onNavigate('/certifications')}
                      className="font-bold text-[#204696] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Licences & Audits</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* VISION, MISSION & VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="p-8 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#204696] flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Our Vision
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                To be the leading and reliable provider of aircraft ground handling services on the African continent.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={120}>
            <div className="p-8 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full text-left">
              <div className="w-12 h-12 rounded-xl bg-[#72BF44]/15 text-[#3B7A1C] flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Our Mission
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                To deliver safe, secure and competitive ground handling services that meet the expectations of our customers, shareholders and other stakeholders.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 CORE VALUES */}
        <div className="space-y-6">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#204696]">Guiding Principles</span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Our Core Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: 'Integrity',
                desc: 'Acting ethically, honestly and responsibly in every aspect of our operations and stakeholder engagements.',
                bg: 'bg-blue-50',
                color: 'text-[#204696]'
              },
              {
                icon: CheckCircle2,
                title: 'Quality',
                desc: 'Pursuing operational excellence and delivering measurable value to airline customers, cargo clients, and passengers.',
                bg: 'bg-[#72BF44]/15',
                color: 'text-[#3B7A1C]'
              },
              {
                icon: Award,
                title: 'Safety',
                desc: 'Protecting people, aircraft operations, and the airside environment with IATA ISAGO rigor and just-culture oversight.',
                bg: 'bg-amber-50',
                color: 'text-[#D97706]'
              },
              {
                icon: Users,
                title: 'Teamwork',
                desc: 'Working together with a shared purpose across flight ops, ramp crews, cargo terminals, and passenger lounges.',
                bg: 'bg-purple-50',
                color: 'text-purple-700'
              }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.title} animation="fade-up" delay={idx * 80}>
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 hover:border-[#204696]/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group">
                    <div className={`p-3 rounded-xl ${val.bg} ${val.color} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 w-fit`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#204696] transition-colors">
                      {val.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* HERITAGE STORY & MANAGEMENT BANNER */}
        <ScrollReveal animation="fade-up">
          <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs hover:shadow-lg transition-all duration-300 text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-mono font-bold text-[#204696] uppercase tracking-wider">
                Leadership & Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Guided by Experienced Aviation Leadership
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                Under Chief Executive Officer Richard Backhouse, Director of Operations Michaela Walker, and General Manager Operations Ebenezer Darko, Aviance Ghana commands a dedicated workforce of over 1,000 aviation professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/management')}
                className="px-6 py-3.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-md shadow-[#204696]/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>View Executive Team (20 Members)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onNavigate('/certifications')}
                className="px-5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-xs font-bold transition-all duration-300 hover:scale-105 shadow-xs cursor-pointer"
              >
                ISAGO Certification
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* CSR DETAILED SECTION */}
        <div id="csr" className="space-y-8 pt-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="flex items-center justify-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                  Community Impact <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">CSR Excellence</span>
                </h2>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Corporate Social Responsibility
              </h2>
              <p className="text-xs text-slate-600">
                Winner of the <strong>Excellence in Corporate Social Responsibility Award</strong> at the 2025 Ghana Shippers’ Authority Awards.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Autism Travel Rehearsal with Emirates',
                desc: 'In collaboration with Emirates Airlines, guided children on the autism spectrum through an airport travel rehearsal to reduce flight anxiety and build confidence.'
              },
              {
                title: 'Orbis Flying Eye Hospital Partner',
                desc: 'Delivered full complimentary ground handling and turnaround services for the Orbis Flying Eye Hospital sight-restoration mission in Ghana.'
              },
              {
                title: 'Savannah Region Kalande Classroom Block',
                desc: 'Constructed a modern six-unit classroom block at Kalande in the Savannah Region in partnership with the McDan Foundation.'
              },
              {
                title: 'New Life Nungua Children’s Home',
                desc: 'Partnered with Delta Air Lines to provide ongoing financial, nutritional, and educational support to vulnerable children in Nungua.'
              },
              {
                title: 'Future Stars Charity Partnership',
                desc: 'Long-term support for underprivileged children through football, sports development, educational sponsorships, and aviation discovery excursions.'
              },
              {
                title: 'USD $1M Eco-Friendly GSE Investment',
                desc: 'Pioneering environmental sustainability in Ghanaian ground handling with electric pushback equipment, battery tugs, and solar charging infrastructure.'
              }
            ].map((csr, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 60}>
                <div
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5 hover:border-[#204696]/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group"
                >
                  <div className="font-bold text-sm text-[#204696] flex items-center gap-2 group-hover:text-[#0C1E4A] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform duration-300" />
                    {csr.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {csr.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/csr')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white font-bold text-xs shadow-md shadow-[#204696]/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Explore Dedicated Corporate Social Responsibility Page</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
