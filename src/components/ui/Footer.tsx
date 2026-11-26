import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { AvianceLogo } from './AvianceLogo';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { cookieConsentService } from '../../services/cookieConsentService';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const { t, language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <footer className={`relative border-t overflow-hidden transition-colors ${
      isLight
        ? 'bg-white border-slate-200 text-slate-600'
        : 'bg-[#060D1A] border-[#204696]/30 text-slate-300'
    }`}>
      {/* Signature Aviance Tri-Color Top Accent Line */}
      <div className="h-[3.5px] w-full bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="py-1">
              <AvianceLogo variant={isLight ? 'on-light' : 'on-dark'} size="lg" />
            </div>
            <p className={`text-sm leading-relaxed max-w-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {isFr
                ? "Premier prestataire de services complets d'assistance en escale au Ghana depuis 1994. Services passagers certifiés, rotations en piste, logistique fret sous chaîne du froid et salons exécutifs à Accra, Kumasi et Tamale."
                : "Ghana's premier full-service aviation ground handling provider since 1994. Operating certified passenger services, ramp turnaround, cold-chain cargo, and executive lounge hospitality across Accra, Kumasi, and Tamale."}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                isLight ? 'bg-blue-50 text-[#204696]' : 'bg-[#204696]/20 text-[#58C1EB]'
              }`}>
                IATA ISAGO
              </span>
              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-950/40 text-emerald-400'
              }`}>
                {isFr ? 'Certifié UE RA3' : 'EU RA3 Certified'}
              </span>
              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
              }`}>
                {isFr ? 'Agréé GCAA' : 'GCAA Licensed'}
              </span>
            </div>
          </div>

          {/* Column 2: Aviation Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('footer.aviationServices', isFr ? 'Services Aéronautiques' : 'Aviation Services')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/passenger-services')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.paxHandling', isFr ? 'Assistance Passagers & PMR' : 'Passenger Handling & PRM')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/ramp-handling')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.rampTurnaround', isFr ? 'Rotations d\'Aéronefs en Piste' : 'Aircraft Ramp Turnaround')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cargo')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.cargoVillage', isFr ? 'Fret Aérien & Chaîne du Froid' : 'Air Cargo Logistics & Cold Chain')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/lounge')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.adinkraLounge', isFr ? 'Salons VIP & Hospitalité' : 'Executive Lounge Hospitality')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/vip-charter')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.vipCharter', isFr ? 'Assistance VIP & Vols Charters' : 'VIP & Charter Assistance')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/operations')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {isFr ? 'Opérations de Vol & OCC' : 'Flight Operations & OCC'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isFr ? 'Entreprise' : 'Company'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/about')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.aboutAviance', isFr ? 'À Propos d\'Aviance Ghana' : 'About Aviance Ghana')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/management')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.leadership', isFr ? 'Équipe de Direction' : 'Management Team')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/certifications')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.safetyCerts', isFr ? 'Sécurité & Certifications' : 'Safety & Certifications')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/news')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.newsPress', isFr ? 'Actualités & Presse' : 'News & Media')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/csr')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {isFr ? 'RSE & Communauté' : 'CSR & Community'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/careers')} className={`transition-colors text-left cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-[#204696]' : 'text-slate-300 hover:text-[#58C1EB]'
                }`}>
                  {t('footer.careersNss', isFr ? 'Carrières' : 'Careers')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Head Office Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {t('footer.headOffice', isFr ? 'Contact Siège Social' : 'Head Office Contact')}
            </h4>
            <div className={`space-y-3 text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <div className="flex items-start gap-2.5">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <div>
                  <span className={`block font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    {isFr ? 'Aéroport International Kotoka (ACC)' : 'Kotoka International Airport (ACC)'}
                  </span>
                  {isFr ? 'Village Fret, P.M.B. 33, Accra, Ghana' : 'Cargo Village, P.M.B. 33, Accra, Ghana'}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <a href="tel:+233302778025" className={`transition-colors ${
                  isLight ? 'hover:text-[#204696] text-slate-700' : 'hover:text-white text-slate-300'
                }`}>
                  +233 (0) 30 277 8025 / +233 (0) 59 381 6076
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <a href="mailto:info@avianceghana.com" className={`transition-colors ${
                  isLight ? 'hover:text-[#204696] text-slate-700' : 'hover:text-white text-slate-300'
                }`}>
                  info@avianceghana.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#204696]' : 'text-[#58C1EB]'}`} />
                <span>{isFr ? 'Lun–Ven 08h00–17h00 · Opérations de vol 24/7' : 'Mon–Fri 08:00–17:00 · 24/7 Flight Operations'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Official Copyright & Legal Links */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} Aviance Ghana Limited. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onNavigate('/code-of-conduct')} className={`transition-colors cursor-pointer ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {isFr ? 'Code de Conduite' : 'Code of Conduct'}
            </button>
            <button onClick={() => onNavigate('/privacy-policy')} className={`transition-colors cursor-pointer ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {t('footer.privacy', isFr ? 'Politique de Confidentialité' : 'Privacy Policy')}
            </button>
            <button onClick={() => onNavigate('/terms')} className={`transition-colors cursor-pointer ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {t('footer.terms', isFr ? 'Conditions d\'Utilisation' : 'Terms of Use')}
            </button>
            <button onClick={() => cookieConsentService.openPreferencesModal()} className={`transition-colors cursor-pointer ${
              isLight ? 'hover:text-[#204696]' : 'hover:text-white'
            }`}>
              {isFr ? 'Gestion des Cookies' : 'Cookie Settings'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
