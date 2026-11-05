import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  FileText,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Check,
  Building2,
  Calendar,
  Lock,
  Layers,
  ArrowRight,
  Download,
  X,
  ChevronRight,
  Sparkles,
  Info,
  Eye,
} from 'lucide-react';
import { Certification } from '../../types';

// Official Certificate Document Assets from src/assets/aviance_images/certificates/
import isagoCertImg from '../../assets/aviance_images/certificates/f52640_e678c4204cbd4ff1ae9a7afb634acf02~mv2.jpg';
import gcaaCertImg from '../../assets/aviance_images/certificates/f52640_480dbaa705c8412bb2e7687fbf5cc036~mv2.jpg';
import ra3CertImg from '../../assets/aviance_images/certificates/f52640_67115efc4f6b48ccbc2bbab716b7d054~mv2.jpg';

interface CertificationsPageProps {
  certifications?: Certification[];
  onNavigate: (path: string) => void;
}

interface OfficialCertificateDoc {
  id: string;
  badge: string;
  badgeColor: string;
  authorityShort: string;
  title: string;
  issuer: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  validityTerm: string;
  status: string;
  station: string;
  signatory: string;
  signatoryTitle: string;
  legalBasis: string;
  summary: string;
  disciplinesOrScopes: string[];
  image: string;
  verificationUrl?: string;
  verificationLabel?: string;
}

const OFFICIAL_CERTIFICATES: OfficialCertificateDoc[] = [
  {
    id: 'isago',
    badge: 'Global IATA Safety Audit for Ground Operations',
    badgeColor: 'border-blue-500/30 text-[#204696] bg-blue-50',
    authorityShort: 'IATA ISAGO',
    title: 'Certificate of Accreditation (ISAGO)',
    issuer: 'International Air Transport Association (IATA)',
    certificateNumber: 'ISAGO-ACC-24-2419',
    issueDate: '17 December 2024',
    expiryDate: '29 January 2027',
    validityTerm: '2+ Years Operational Validity',
    status: 'Active · Fully Accredited',
    station: 'Kotoka International Airport (ACC / DGAA), Accra, Ghana',
    signatory: 'Nick Careen',
    signatoryTitle: 'Senior Vice President, Operations, Safety & Security, IATA',
    legalBasis: 'IATA ISAGO Standards & Recommended Practices (GOSM / GOSARP Registry)',
    summary:
      'Official accreditation under the prestigious IATA Safety Audit for Ground Operations (ISAGO) program at Kotoka International Airport. Covers all seven standard ground operations disciplines, certifying Aviance Ghana’s organizational management, airside safety management system (SMS), and standard ground handling procedures.',
    disciplinesOrScopes: [
      'Organization Management (ORM)',
      'Ramp Handling (RMP)',
      'Personnel & Recurrent Training (TRN)',
      'Passenger Handling & Check-In (PAX)',
      'Cargo & Mail Handling (CGM)',
      'Load Control & Weight/Balance (LOD)',
      'Baggage Handling & BRS (BAG)',
    ],
    image: isagoCertImg,
    verificationUrl: 'https://onesource.iata.org',
    verificationLabel: 'Verify on IATA ONE Source',
  },
  {
    id: 'gcaa',
    badge: 'Statutory State Regulatory Licence (Act 1120)',
    badgeColor: 'border-emerald-500/30 text-emerald-800 bg-emerald-50',
    authorityShort: 'GCAA Ghana',
    title: 'Ground Handling Operating Certificate',
    issuer: 'Ghana Civil Aviation Authority (GCAA)',
    certificateNumber: 'GCAA/ASAS-GHSP/01/2024',
    issueDate: '19 September 2024',
    expiryDate: '18 September 2029',
    validityTerm: '5-Year Statutory Operating Term (2024–2029)',
    status: 'Active · Authorized State Provider',
    station: 'Kotoka International Airport, Kumasi & Tamale Aerodromes',
    signatory: 'Ing. Charles Kraikue',
    signatoryTitle: 'Director-General, Ghana Civil Aviation Authority',
    legalBasis: 'Ghana Civil Aviation Act, 2024 (Act 1120) & Aerodromes Directives (Part 33)',
    summary:
      'Statutory operating authority issued by the Republic of Ghana through the Ghana Civil Aviation Authority (GCAA). Authorizes Aviance Ghana Limited to conduct full commercial ground handling, passenger dispatch, cargo warehouse processing, and airside ramp operations under strict national aviation safety directives.',
    disciplinesOrScopes: [
      'Commercial Ground Handling Services',
      'Aircraft Turnaround & Ramp Operations',
      'Air Cargo & Perishable Logistics',
      'Passenger Terminal Check-In & Boarding',
      'Subcontracted Fueling & Catering Oversight',
      'Five-Year Continuous Operating Mandate',
    ],
    image: gcaaCertImg,
    verificationUrl: 'https://www.gcaa.com.gh',
    verificationLabel: 'GCAA Directives Portal',
  },
  {
    id: 'ra3',
    badge: 'UK & EU International Cargo Security Validation',
    badgeColor: 'border-indigo-500/30 text-indigo-800 bg-indigo-50',
    authorityShort: 'UK RA3 / CEIV',
    title: 'Regulated Agent Third Country (RA3) Validation',
    issuer: 'UK Aviation Security · CEIV IATA · EVAAS',
    certificateNumber: 'UAI:GB/0026/KL/3000',
    issueDate: '28 February 2025',
    expiryDate: '27 February 2028',
    validityTerm: '3-Year Certified Security Cycle',
    status: 'Active · EU / UK Cargo Compliant',
    station: 'Kotoka International Airport (IATA: ACC, ICAO: DGAA), Accra, Ghana',
    signatory: 'Stephen Ogada',
    signatoryTitle: 'Aviation Security Independent Validator (EVAAS / IATA CEIV)',
    legalBasis: 'UK RA3 Checklist Version 1 (April 2024) & EU Regulation (EC) No 300/2008 & 2015/1998',
    summary:
      'Independent security validation certifying Aviance Ghana Limited as a Regulated Agent in a Third Country (RA3). Validated under the rigorous UK Department for Transport and EU aviation security checklist, ensuring that cargo and mail loaded onto aircraft bound for the United Kingdom and European Union meet international anti-sabotage security standards.',
    disciplinesOrScopes: [
      'Dual-View X-Ray Cargo Screening (EDS)',
      'Explosive Trace Detection (ETD) & Physical Search',
      'Chain of Custody & Tamper-Evident Cargo Sealing',
      'Known Consignor & Regulated Agent Compliance',
      'Direct Flights to UK & European Hubs (ACC3 Chain)',
      'Security Vetting of Cargo Handling Personnel',
    ],
    image: ra3CertImg,
    verificationUrl: 'https://www.iata.org/en/programs/cargo/ceiv/',
    verificationLabel: 'IATA CEIV / RA3 Security Standard',
  },
];

const ISAGO_DISCIPLINE_CARDS = [
  { code: 'ORM', name: 'Organization & Management', desc: 'Corporate governance, safety policy, and quality assurance systems.' },
  { code: 'RMP', name: 'Ramp Handling', desc: 'Airside marshaling, aircraft loading, pushback, and ground support equipment.' },
  { code: 'TRN', name: 'Personnel Training', desc: 'IATA DGR, safety recurrent, airside driving, and operational licensing.' },
  { code: 'PAX', name: 'Passenger Handling', desc: 'DCS check-in, boarding control, special assistance (PRM), and gate transit.' },
  { code: 'CGM', name: 'Cargo & Mail Handling', desc: 'Air freight screening, cold room chain, pharmaceuticals, and ULD build-up.' },
  { code: 'LOD', name: 'Load Control & Balance', desc: 'Accredited weight & balance calculations, trim sheets, and load sheet dispatch.' },
  { code: 'BAG', name: 'Baggage Handling', desc: 'Automated Baggage Reconciliation (BRS), sortation, and lost & found tracing.' },
];

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'isago' | 'gcaa' | 'ra3'>('all');
  const [selectedCert, setSelectedCert] = useState<OfficialCertificateDoc | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCerts =
    activeTab === 'all'
      ? OFFICIAL_CERTIFICATES
      : OFFICIAL_CERTIFICATES.filter((c) => c.id === activeTab);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const openLightbox = (cert: OfficialCertificateDoc) => {
    setSelectedCert(cert);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedCert(null);
    setZoomLevel(1);
  };

  return (
    <div className="pb-24 sm:pb-32 space-y-16 sm:space-y-24 lg:space-y-32 bg-white text-slate-900">
      {/* Hero Header */}
      <div className="py-14 sm:py-20 lg:py-24 text-center border-b border-slate-200 bg-slate-50 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
              Aviation Governance &amp; Regulatory Compliance
            </h2>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Certifications, Licences &amp; Regulatory Standards
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-slate-600">
            Aviance Ghana operates under the highest international aviation governance frameworks, accredited by IATA, authorized by the Ghana Civil Aviation Authority (GCAA), and validated under UK &amp; European Union aviation security directives.
          </p>

          {/* Quick Compliance Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-[#204696] block">ISAGO</span>
              <span className="text-[11px] text-slate-500 font-medium">IATA Global Registry</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-[#72BF44] block">7 / 7</span>
              <span className="text-[11px] text-slate-500 font-medium">Disciplines Certified</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-[#009EE0] block">5-Year</span>
              <span className="text-[11px] text-slate-500 font-medium">GCAA Statutory Mandate</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="text-xl sm:text-2xl font-extrabold text-[#11244C] block">UK RA3</span>
              <span className="text-[11px] text-slate-500 font-medium">EU Cargo Chain Validated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Official Documents (3)
            </button>
            <button
              onClick={() => setActiveTab('isago')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'isago'
                  ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              IATA ISAGO Accreditation
            </button>
            <button
              onClick={() => setActiveTab('gcaa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gcaa'
                  ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              GCAA Operating Licence
            </button>
            <button
              onClick={() => setActiveTab('ra3')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ra3'
                  ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              UK / EU RA3 Cargo Security
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Station: Kotoka International Airport (ACC / DGAA)</span>
          </div>
        </div>

        {/* PRIMARY CERTIFICATES SHOWCASE (Rendered with the Actual Asset Images) */}
        <div className="space-y-12">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden transition-all duration-300 hover:border-[#204696]/40"
            >
              {/* Card Header Strip with Brand Gradient */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Visual Column: Authentic Document Display with Plaque Frame */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div
                    onClick={() => openLightbox(cert)}
                    className="group relative w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 border-4 border-slate-200/90 shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    title="Click to inspect high-resolution certificate"
                  >
                    {/* The Official Certificate Image from Assets */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto object-cover block select-none"
                    />

                    {/* Gradient Overlay & Hover Inspection Button */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 text-white p-4">
                      <div className="w-12 h-12 rounded-full bg-[#204696] text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold tracking-wide uppercase bg-black/60 px-3 py-1 rounded-full">
                        Inspect Certificate Full Screen
                      </span>
                    </div>

                    {/* Official Certificate Seal Stamp Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] font-mono font-bold shadow-md flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cert.authorityShort}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openLightbox(cert)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#204696] hover:text-[#0F2E53] transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to zoom &amp; inspect details</span>
                  </button>
                </div>

                {/* Right Details Column: Full Verified Metadata & Operational Scope */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category Pill & Active Status */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${cert.badgeColor}`}>
                      {cert.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{cert.status}</span>
                    </span>
                  </div>

                  {/* Title & Issuing Authority */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {cert.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                      <span>Issued by:</span>
                      <strong className="text-slate-900 font-bold">{cert.issuer}</strong>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cert.summary}
                  </p>

                  {/* Metadata Spec Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">
                        Certificate / Licence Number
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-extrabold text-slate-900 text-xs sm:text-sm">
                          {cert.certificateNumber}
                        </span>
                        <button
                          onClick={() => handleCopy(cert.id, cert.certificateNumber)}
                          className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          title="Copy certificate reference"
                        >
                          {copiedId === cert.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">
                        Validity Term
                      </span>
                      <span className="font-bold text-[#204696] mt-0.5 block">
                        {cert.validityTerm}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">
                        Issue &amp; Expiry Dates
                      </span>
                      <span className="font-medium text-slate-700 mt-0.5 block font-mono">
                        {cert.issueDate} &rarr; <strong>{cert.expiryDate}</strong>
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">
                        Official Signatory
                      </span>
                      <span className="font-semibold text-slate-800 mt-0.5 block truncate" title={cert.signatoryTitle}>
                        {cert.signatory} ({cert.signatoryTitle.split(',')[0]})
                      </span>
                    </div>
                  </div>

                  {/* Disciplines & Operational Scope Tags */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Accredited Operational Scope:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.disciplinesOrScopes.map((scope, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[11px] font-semibold text-slate-800"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#204696]" />
                          <span>{scope}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 flex-wrap">
                    <button
                      onClick={() => openLightbox(cert)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Full Document</span>
                    </button>

                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#204696]" />
                        <span>{cert.verificationLabel || 'Verify Online'}</span>
                      </a>
                    )}

                    <a
                      href={cert.image}
                      download={`${cert.id}_certificate_aviance_ghana.jpg`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Copy</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ISAGO 7-DISCIPLINE OPERATIONAL MATRIX */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#204696] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#72BF44]" />
              ISAGO Scope of Accreditation
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Complete Seven-Discipline ISAGO Conformance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under IATA audit criteria, ground handlers are audited against specific operational disciplines. Aviance Ghana has earned accreditation across every discipline defined in the ISAGO program:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ISAGO_DISCIPLINE_CARDS.map((card) => (
              <div
                key={card.code}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-[#204696]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-[#204696] text-white font-mono font-extrabold text-xs">
                    {card.code}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">{card.name}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* FULLSCREEN CERTIFICATE INSPECTION LIGHTBOX MODAL */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Toolbar */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate text-white">
                    {selectedCert.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Ref: {selectedCert.certificateNumber} · {selectedCert.issuer}
                  </p>
                </div>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  title="Zoom Out"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-400 w-12 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  title="Zoom In"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-mono px-2"
                >
                  Reset
                </button>
                <a
                  href={selectedCert.image}
                  download={`${selectedCert.id}_certificate.jpg`}
                  title="Download Certificate"
                  className="p-1.5 rounded-lg bg-[#204696] hover:bg-[#009EE0] text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={closeLightbox}
                  title="Close Inspector"
                  className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Two-Column Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 p-4 sm:p-6 gap-6 bg-slate-100">
              {/* Document Image with Zoom Scaling */}
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 flex items-center justify-center overflow-auto min-h-[380px] sm:min-h-[500px]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease' }}
                  className="max-h-[640px] max-w-full object-contain rounded-lg shadow-2xl block select-none"
                />
              </div>

              {/* Side Breakdown Panel */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-5 overflow-y-auto">
                <div className="space-y-1">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${selectedCert.badgeColor}`}>
                    {selectedCert.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    {selectedCert.issuer}
                  </p>
                </div>

                <div className="space-y-3 text-xs border-y border-slate-200 py-4">
                  <div>
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">
                      Certificate / Reference ID
                    </span>
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {selectedCert.certificateNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">
                      Validity Period
                    </span>
                    <span className="font-bold text-emerald-700">
                      {selectedCert.issueDate} &rarr; {selectedCert.expiryDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">
                      Official Signatory
                    </span>
                    <span className="font-bold text-slate-800 block">
                      {selectedCert.signatory}
                    </span>
                    <span className="text-slate-500 text-[11px] block">
                      {selectedCert.signatoryTitle}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono uppercase text-[10px] block">
                      Governing Legal Directive
                    </span>
                    <span className="text-slate-700 font-medium block">
                      {selectedCert.legalBasis}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    Accredited Scope Details:
                  </span>
                  <div className="space-y-1.5">
                    {selectedCert.disciplinesOrScopes.map((scope, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#204696] hover:bg-[#153170] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{selectedCert.verificationLabel || 'Verify Online'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
