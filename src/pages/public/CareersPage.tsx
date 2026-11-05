import React, { useState } from 'react';
import { Mail, ShieldCheck, Check, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { Vacancy } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface CareersPageProps {
  vacancies?: Vacancy[];
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('employment@avianceghana.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 lg:py-24 pb-24 sm:pb-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* MAIN AUTHENTIC SECTION - Matching https://www.avianceghana.com/careers */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Official Company Content */}
          <div className="lg:col-span-5 space-y-6">

            {/* Official Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#204696]">
                Careers at Aviance Ghana <span className="text-[#009EE0]">·</span> <span className="text-[#3B7A1C]">Talent & Opportunities</span>
              </h2>
            </div>

            {/* Official Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
              {t('pages.careers.title', 'Join Aviance Ghana')}
            </h1>

            {/* Authentic Body Statement */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              {t('pages.careers.desc', 'We are always interested in people who share our commitment to safety, service excellence and teamwork. Current vacancies will be published on this page. Applications should be submitted only through the stated official channel.')}
            </p>

            {/* Official Recruitment Email Block */}
            <div className="p-5 rounded-2xl border transition-all space-y-2.5 bg-slate-50 border-slate-200">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t('pages.careers.enquiriesLabel', 'For any enquiries, please email:')}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href="mailto:employment@avianceghana.com?subject=Enquiry%20regarding%20Career%20Opportunities%20at%20Aviance%20Ghana"
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#204696] hover:text-[#009EE0] underline underline-offset-4 decoration-[#009EE0]/40 hover:decoration-[#009EE0] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#204696] shrink-0" />
                  <span>employment@avianceghana.com</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  title="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#72BF44]" />
                      <span className="text-[#72BF44]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Fraud Protection Notice */}
            <div className="p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 bg-emerald-50/50 border-[#72BF44]/35">
              <ShieldCheck className="w-5 h-5 text-[#72BF44] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
                <strong className="text-slate-900 font-bold">
                  {t('pages.careers.fraudTitle', 'Fraud protection:')}{' '}
                </strong>
                {t('pages.careers.fraudNotice', 'Aviance Ghana does not charge applicants a fee at any stage of recruitment. Confirm the official application method before publication.')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:employment@avianceghana.com?subject=Application%20/%20Expression%20of%20Interest%20-%20Aviance%20Ghana"
                className="px-6 py-3 rounded-xl bg-[#204696] hover:bg-[#183878] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#204696]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{t('pages.careers.emailEnquiries', 'Email Official Enquiries')}</span>
              </a>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                {t('pages.careers.contactHr', 'Contact HR Office')}
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Team Photography */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl shadow-slate-200/50">
              <img
                src="/assets/aviance_images/careers_team.jpg"
                alt="Aviance Ghana Customer Services & Ramp Operations Team"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#58C1EB] block">
                    Our People · Our Pride
                  </span>
                  <p className="text-sm sm:text-base font-bold drop-shadow-sm">
                    Passenger Handling, Ramp Turnaround & Safety Professionals
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-[#204696] backdrop-blur-xs">
                    Kotoka Terminal 3 (ACC)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
