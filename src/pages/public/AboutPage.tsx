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
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import careersTeamImg from '../../assets/aviance_images/careers_team.jpg';
import isagoCertImg from '../../assets/aviance_images/certificates/f52640_e678c4204cbd4ff1ae9a7afb634acf02~mv2.jpg';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { language } = useLanguage();
  const isFr = language === 'fr';

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
    <div className="pb-24 sm:pb-36 bg-white">
      {/* Top Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-[#0C1933] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#204696] font-medium transition-colors cursor-pointer"
            >
              {isFr ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-[#204696] font-semibold">{isFr ? 'À Propos' : 'About Us'}</span>
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
            {isFr ? 'À Propos d\'Aviance Ghana' : 'About Aviance Ghana'}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            {isFr
              ? 'Premier agent d\'assistance en escale au Ghana, assurant des services passagers certifiés, des rotations en piste, une logistique de fret sous chaîne du froid et des salons aéroportuaires de direction à Accra, Kumasi et Tamale.'
              : "Ghana's premier aviation ground handling agent, delivering certified passenger services, ramp turnaround, cold-chain cargo logistics, and executive lounge hospitality across Accra, Kumasi, and Tamale."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 lg:space-y-36 pt-12 sm:pt-20">
        
        {/* ====================================================
            1. AUTHENTIC CORPORATE PROFILE: WHO WE ARE
            ==================================================== */}
        <ScrollReveal animation="fade-up">
          <div className="relative text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Authentic Content */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#204696]">
                    About Aviance Ghana Limited <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Established 1994</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-[-0.025em] leading-snug">
                  Who We Are
                </h2>

                <div className="space-y-5 text-slate-700 text-base sm:text-[17px] leading-relaxed font-normal">
                  <p>
                    At Aviance Ghana, we are passionate about delivering exceptional aviation, logistics and travel experiences that connect Ghana to the world. Aviance Ghana is an ISAGO-registered ground service provider, demonstrating our commitment to internationally recognised standards for the safety and oversight of ground operations.
                  </p>

                  <p>
                    With a strong commitment to service excellence focused on safety, integrity, quality and teamwork we work behind the scenes and on the frontline to ensure our customer airlines passengers and cargo are handled with care and efficiency. Our dedicated departments bring together expertise developed using international best practices since we were established in 1994 at Accra Kotoka International Airport.
                  </p>
                </div>

                {/* Executive Quotation Callout */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50/90 via-sky-50/40 to-emerald-50/50 border-l-4 border-[#204696] border-y border-r border-slate-200/90 shadow-xs my-6 sm:my-8">
                  <p className="font-semibold text-slate-900 italic text-base sm:text-lg leading-relaxed">
                    “At Aviance Ghana, we believe great service is more than getting people and cargo from one destination to another, it is about creating confidence and convenience for our customers making us stronger together.”
                  </p>
                </div>
              </div>

              {/* Right Column: Frontline Team Photography Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg group relative">
                  <img
                    src={careersTeamImg}
                    alt="Aviance Ghana Passenger Services & Operations Team"
                    className="w-full h-[360px] sm:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#58C1EB] text-sm">Frontline & Behind the Scenes</span>
                      <span className="text-slate-400 font-mono text-xs">Since 1994</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      Our dedicated staff delivering exceptional aviation, logistics and hospitality experiences across Ghana's commercial airports.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ====================================================
            2. WHAT WE DO & 24/7 AIRSIDE CAPABILITIES
            ==================================================== */}
        <ScrollReveal animation="fade-up">
          <div className="relative text-left pt-16 sm:pt-24 lg:pt-28 border-t border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: What We Do Content & OCC */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#009EE0] via-[#72BF44] to-[#204696]" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#204696]">
                    Comprehensive Aviation Ground Support <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">24/7 Operations</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-[-0.025em] leading-snug">
                  What We Do
                </h2>

                <div className="space-y-5 text-slate-700 text-base sm:text-[17px] leading-relaxed font-normal">
                  <p className="font-semibold text-slate-900 text-lg sm:text-xl">
                    Aviance Ghana is your trusted partner for Airline and Cargo Operations in Accra, Kumasi and Tamale.
                  </p>

                  <p>
                    When flying to Accra, Kumasi or Tamale on scheduled, charter, ad hoc or one off basis you need a partner who can make every operational detail seamless.
                  </p>

                  <p>
                    Aviance Ghana provides a complete range of ground handling and aviation support services, tailored for your operation from landing permits to push back and everything in-between. From the moment your aircraft arrives, to its departure, our experienced team coordinates the services, people and suppliers needed for your operation.
                  </p>
                </div>

                {/* Turnaround Scope Box */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-800 text-sm sm:text-base font-medium leading-relaxed my-6 sm:my-8 shadow-2xs">
                  We manage preflight approvals, passenger handling, ramp services, baggage handling, aircraft turnaround coordination, cargo support and VIP handling and lounge services.
                </div>

                <p className="text-sm sm:text-base text-slate-600">
                  Please contact our Operations Control Centre for further details about our ground handling and aviation services.
                </p>

                {/* OCC Direct Enquiries Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0F2E53] to-[#153170] text-white space-y-4 shadow-lg my-6 sm:my-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-[#58C1EB] uppercase tracking-wider font-bold block mb-1">
                        Operations Control Centre (OCC)
                      </span>
                      <span className="text-base font-bold text-white">
                        OCC Enquiries & Airside Dispatch:
                      </span>
                    </div>
                    <a
                      href="mailto:occmgr@avianceghana.com?subject=Enquiries%20-%20Ground%20Support%20in%20Ghana"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#009EE0] hover:bg-[#0089C4] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 transition-all cursor-pointer shrink-0"
                    >
                      <Mail className="w-4 h-4" />
                      <span>occmgr@avianceghana.com</span>
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100/90 font-medium italic border-t border-white/10 pt-3">
                    “We look forward to arranging your ground support here in Ghana.”
                  </p>
                </div>
              </div>

              {/* Right Column: Official ISAGO Certificate Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md text-left space-y-5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-6 h-6 text-[#3B7A1C]" />
                      <span className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wider">
                        Certificate of Accreditation
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#72BF44]/20 text-[#3B7A1C]">
                      ISAGO Certified
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-slate-50 p-3 sm:p-4 border border-slate-200/80">
                    <img
                      src={isagoCertImg}
                      alt="IATA ISAGO Certificate of Accreditation for Aviance Ghana Limited"
                      className="w-full h-auto object-contain rounded-xl shadow-xs"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs sm:text-sm text-slate-600">
                    <span>Accredited Ground Operations</span>
                    <button
                      onClick={() => onNavigate('/certifications')}
                      className="font-bold text-[#204696] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Licences & Audits</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ====================================================
            3. VISION & MISSION
            ==================================================== */}
        <ScrollReveal animation="fade-up">
          <div className="pt-16 sm:pt-24 lg:pt-28 border-t border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all space-y-5 text-left">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#204696] flex items-center justify-center font-bold shadow-2xs">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[-0.02em]">
                  Our Vision
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                  To be the leading and reliable provider of aircraft ground handling services on the African continent.
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all space-y-5 text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#72BF44]/15 text-[#3B7A1C] flex items-center justify-center font-bold shadow-2xs">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[-0.02em]">
                  Our Mission
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                  To deliver safe, secure and competitive ground handling services that meet the expectations of our customers, shareholders and other stakeholders.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ====================================================
            4. 4 CORE VALUES
            ==================================================== */}
        <div className="pt-16 sm:pt-24 lg:pt-28 border-t border-slate-200/80 space-y-12 sm:space-y-16">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#204696]">Guiding Principles</span>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-slate-900 tracking-[-0.025em] leading-[1.2]">
                Our Core Values
              </h2>
              <p className="text-base text-slate-600 font-normal">
                The foundational values that anchor our safety culture, operations, and customer relationships.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
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
                  <div className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 h-full group">
                    <div className={`p-3.5 rounded-2xl ${val.bg} ${val.color} group-hover:scale-105 transition-transform duration-300 w-fit shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#204696] transition-colors">
                      {val.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            5. HERITAGE STORY & MANAGEMENT BANNER
            ==================================================== */}
        <ScrollReveal animation="fade-up">
          <div className="my-8 sm:my-14 border-t border-b border-slate-200 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 text-left">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#204696]">
                Leadership & Governance
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                Guided by Experienced Aviation Leadership
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Under Chief Executive Officer Richard Backhouse, Director of Operations Michaela Walker, and General Manager Operations Ebenezer Darko, Aviance Ghana commands a dedicated workforce of over 1,000 aviation professionals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center shrink-0">
              <button
                onClick={() => onNavigate('/management')}
                className="btn-primary group"
              >
                <span>View Executive Team (20 Members)</span>
                <ArrowRight className="w-4 h-4 text-[#58C1EB] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <button
                onClick={() => onNavigate('/certifications')}
                className="btn-link group"
              >
                <span className="link-label">ISAGO Certification</span>
                <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ====================================================
            6. CSR DETAILED SECTION
            ==================================================== */}
        <div id="csr" className="pt-16 sm:pt-24 lg:pt-28 border-t border-slate-200/80 space-y-12 sm:space-y-16">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-center gap-2.5">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#204696]">
                  Community Impact <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">CSR Excellence</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-slate-900 tracking-[-0.025em] leading-[1.2]">
                Corporate Social Responsibility
              </h2>
              <p className="text-base leading-relaxed text-slate-600 font-normal">
                Winner of the <strong>Excellence in Corporate Social Responsibility Award</strong> at the 2025 Ghana Shippers’ Authority Awards.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
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
                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3 h-full group text-left hover:border-slate-300 transition-all shadow-2xs">
                  <div className="font-bold text-base text-[#204696] flex items-center gap-2 group-hover:text-[#0C1E4A] transition-colors">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform duration-300" />
                    {csr.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {csr.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center pt-6 sm:pt-10">
            <button
              onClick={() => onNavigate('/csr')}
              className="btn-link group text-xs sm:text-sm tracking-wide"
            >
              <span className="link-label">Explore Dedicated Corporate Social Responsibility Page</span>
              <ArrowRight className="w-4 h-4 text-[#72BF44] group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
