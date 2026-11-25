import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Phone,
  Mail,
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  HeartPulse,
  Leaf,
  Scale,
  Lock,
  Eye,
  Award
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance Safety & Apron Photography
import SAFETY_HERO_IMG from '../../assets/aviance_images/careers_team.jpg'; // Concourse and ramp safety team
import RAMP_PUSHBACK_IMG from '../../assets/aviance_images/1791968160594.jpg'; // ISAGO pushback turnaround
import CARGO_SCREENING_IMG from '../../assets/aviance_images/services/cargo_services.jpg'; // RA3 cargo screening facility

interface QhseSafetyPageProps {
  onNavigate: (path: string) => void;
  onOpenCargoModal?: () => void;
}

export const QhseSafetyPage: React.FC<QhseSafetyPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();

  const safetyPillars = [
    {
      title: 'Safety Management System (SMS - ICAO Annex 19)',
      desc: 'Proactive hazard identification, qualitative Safety Risk Assessments (SRA), Just Culture incident reporting, and executive safety review board governance.',
      icon: ShieldCheck,
      badge: 'ICAO Annex 19'
    },
    {
      title: 'Aviation Security (AVSEC) & EU RA3 Validation',
      desc: 'Certified Regulated Agent (RA3) security controls, cargo dual-view X-ray and Explosive Trace Detection (ETD), tamper-proof seals, and aircraft security guards.',
      icon: Lock,
      badge: 'EU RA3 Validated'
    },
    {
      title: 'Airside Occupational Health & Safety (OHS)',
      desc: 'Mandatory PPE compliance, hearing conservation protocols, motorized airside speed monitoring, and daily ramp Foreign Object Debris (FOD) sweeps.',
      icon: HeartPulse,
      badge: 'Zero-Harm Policy'
    },
    {
      title: 'Quality Assurance & Station Compliance Audits',
      desc: 'Rigorous internal quality audits across ACC, KMS, and TML stations, verifying operational conformity with IATA AHM, IGOM, and airline customer SLAs.',
      icon: Award,
      badge: 'IATA IGOM Standard'
    },
    {
      title: 'Environmental Sustainability & Spill Response',
      desc: 'Over $1,000,000 invested in electric GSE, industrial hydrocarbon spill response kits on every tractor, safe battery recycling, and solar terminal lighting.',
      icon: Leaf,
      badge: 'Eco-Friendly'
    },
    {
      title: 'Emergency Response Planning (ERP)',
      desc: 'Integrated crisis management protocols with the Ghana Airports Company Limited (GACL), GCAA, National Fire Service, and partner airline crisis teams.',
      icon: Eye,
      badge: '24/7 EOC Ready'
    }
  ];

  return (
    <div className={`min-h-screen pb-24 transition-colors ${isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'}`}>
      
      {/* Breadcrumb Bar */}
      <div className={`border-b transition-colors ${isLight ? 'bg-white border-slate-200/80' : 'bg-[#08101E] border-slate-800'}`}>
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
            <span className="text-[#204696] font-semibold">Safety &amp; QHSE</span>
          </div>
        </div>
      </div>

      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Uncompromising Aviation Safety, Security &amp; Operational Quality
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Safety is the foundational bedrock of every flight turnaround at Aviance Ghana. Holding prestigious IATA ISAGO accreditation and EU Cargo RA3 security validation, our integrated Safety Management System (SMS) guarantees the highest standard of protection for passengers, crew, aircraft, and airside personnel.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/certifications')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#11244C] text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Safety Certifications &amp; Audits</span>
              <ArrowRight className="w-4 h-4 text-[#204696]" />
            </button>
            <a
              href="mailto:safety@avianceghana.com?subject=Confidential%20Safety%20Hazard%20Report"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Confidential Safety Reporting</span>
            </a>
            <button
              onClick={() => onNavigate('/code-of-conduct')}
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#72BF44]" />
              <span>Code of Conduct</span>
            </button>
          </div>
        </div>
      </section>
              <FileCheck2 className="w-4 h-4" />
              <span>Corporate Code of Conduct</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Key Metrics Strip */}
      <div className={`border-b py-6 ${isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#0E1A33] border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#72BF44]">100%</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">IATA ISAGO Conformity</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#204696] dark:text-[#58C1EB]">EU RA3</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Air Cargo Security Validated</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#009EE0]">10,000+ Hrs</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Annual Safety &amp; SMS Training</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">Zero-Harm</div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Continuous Safety Objective</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20 sm:space-y-28">

        {/* 6 Core Capabilities */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-[#204696]" />
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}>
                QHSE Management Framework
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Rigorous Oversight Across Terminal, Apron &amp; Cargo Hubs
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Aviance Ghana enforces a holistic safety management philosophy incorporating international civil aviation regulations and local statutory standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyPillars.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isLight
                      ? 'bg-white border-slate-200/90 hover:border-blue-300 shadow-sm'
                      : 'bg-[#11244C]/40 border-slate-800 hover:border-blue-500/40 shadow-none'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#204696] dark:text-[#58C1EB]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {c.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Confidential Just Culture Reporting Box */}
        <section className={`p-8 sm:p-12 rounded-3xl border ${
          isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-amber-950/20 border-amber-800/40'
        }`}>
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Non-Punitive Just Culture
              </span>
            </div>
            <h3 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Confidential Safety &amp; Hazard Reporting System
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Aviance Ghana fosters an open, non-punitive reporting environment where employees, airline flight crews, and airport stakeholders can report hazards, near-misses, and safety concerns without fear of reprisal. All reports are investigated by the Quality &amp; Safety Directorate to drive continuous prevention.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:safety@avianceghana.com?subject=Confidential%20Safety%20Report"
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Submit Hazard Report to safety@avianceghana.com
              </a>
              <span className="text-xs text-slate-500 font-mono">
                Direct Hotline: +233 (0) 244 342 526
              </span>
            </div>
          </div>
        </section>

        {/* Visual Showcase: Real Operational Safety */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-[#72BF44]" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-[#3B7A1C]' : 'text-[#72BF44]'}`}>
                  Audited Operations in Practice
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Verified Safety Standards in Action
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 self-start sm:self-auto">
              ISAGO Registered Station
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[16/10]">
              <img
                src={RAMP_PUSHBACK_IMG}
                alt="ISAGO Ramp Procedures"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-lg">Aircraft Turnaround Safety Standards</p>
                <p className="text-xs text-slate-300">Strict chocking, wing-tip marshallers, and safety clearance envelopes.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative aspect-[16/10]">
              <img
                src={CARGO_SCREENING_IMG}
                alt="EU RA3 Cargo Security Screening"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-lg">EU RA3 Cargo Security Hub</p>
                <p className="text-xs text-slate-300">Dual-view X-ray, explosive trace detection, and bonded vault containment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Safety Directorate CTA */}
        <section className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0E1A33] border-slate-800'
        }`}>
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Safety &amp; Compliance Audit Inquiries
            </h2>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Airline safety auditors and quality directors can request our latest IATA ISAGO audit reports, SMS manuals, and station security programs directly from our Quality &amp; Safety Directorate.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/certifications')}
              className="px-6 py-3.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
            >
              Review Accreditations &amp; Certificates
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className={`px-6 py-3.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
            >
              Contact Safety Directorate
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
