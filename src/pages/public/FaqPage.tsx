import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { INITIAL_FAQS } from '../../constants/avianceData';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = [
    'All',
    'Passenger',
    'Baggage',
    'Cargo',
    'Lounge',
    'Careers',
    'Corporate',
    'General',
  ];

  const categoryLabels: Record<string, string> = {
    All: t('pages.services.all', 'All'),
    Passenger: t('nav.passenger', 'Passenger'),
    Baggage: t('telemetry.tracing', 'Baggage'),
    Cargo: t('nav.cargo', 'Cargo'),
    Lounge: t('nav.lounge', 'Lounge'),
    Careers: t('nav.careers', 'Careers'),
    Corporate: t('footer.corporateLinks', 'Corporate'),
    General: 'General',
  };

  const filtered = INITIAL_FAQS.filter((faq) => {
    return selectedCategory === 'All' || faq.category === selectedCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`pb-24 sm:pb-32 transition-colors min-h-screen ${isLight ? 'bg-white text-slate-800' : 'bg-[#08101E] text-slate-100'}`}>
      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            {t('pages.faqs.title', 'Frequently Asked Questions')}
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
            {t('pages.faqs.desc', 'Quick answers to common inquiries regarding passenger handling at Kotoka Terminal 3, lost baggage tracing, cargo cold chain storage, and airline recruitment.')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10 sm:space-y-14 animate-in fade-in duration-150">
        {/* Filter Categories */}
      <div className="space-y-4">

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#204696] text-white border border-[#58C1EB]/40 shadow-sm shadow-[#204696]/20'
                  : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs'
                  : 'bg-[#071120] border border-[#204696]/20 text-slate-400 hover:text-white hover:bg-[#0E2042]'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-1 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
        {filtered.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="transition-colors"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div>
                  <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-[#0284C7]' : 'text-[#58C1EB]'
                  }`}>
                    {faq.category}
                  </span>
                  <span className={`text-sm sm:text-base font-bold leading-snug ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? `rotate-180 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}` : 'text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className={`pb-4 pt-1 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-100 ${
                  isLight
                    ? 'text-slate-700'
                    : 'text-slate-300'
                }`}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs text-slate-500">
            {language === 'fr'
              ? 'Aucune question ne correspond à votre recherche. '
              : language === 'tw'
              ? 'Nsɛmmisa biara nni hɔ a ɛne wo nhwehwɛmu hyia. '
              : 'No questions matching your search. '}
            <button
              onClick={() => onNavigate('/contact')}
              className={`hover:underline font-semibold ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`}
            >
              {language === 'fr' ? 'Contactez directement nos équipes.' : language === 'tw' ? 'Frɛ yɛn afotufoɔ ntɛm.' : 'Contact our team directly.'}
            </button>
          </div>
        )}
      </div>

      {/* Still need help callout */}
      <div className="pt-10 sm:pt-14 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {language === 'fr' ? 'Besoin d\'une Assistance Supplémentaire ?' : language === 'tw' ? 'Wohia Mmoa Bi Bio?' : 'Need Further Assistance?'}
          </h3>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {language === 'fr'
              ? 'Notre Centre de Contrôle des Opérations 24h/24 et nos comptoirs au Terminal 3 sont à votre service.'
              : language === 'tw'
              ? 'Yɛn 24/7 Operations Control Centre ne dwumayɛfoɔ wɔ Kotoka Terminal 3 pɛ sɛ wɔboa wo.'
              : 'Our 24/7 Operations Control Centre and customer service desks at Kotoka Terminal 3 are ready to help.'}
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="btn-primary group !py-3 !px-6 shrink-0"
        >
          <span>{t('nav.contact', 'Contact Aviance Ghana')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#58C1EB] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      </div>
    </div>
  );
};
