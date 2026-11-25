import React, { useState } from 'react';
import { Crown, Wifi, Coffee, ShowerHead, ShieldCheck, ArrowRight, Phone, Mail, MapPin, CheckCircle2, Armchair } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Authentic Aviance Lounge Hospitality Photography
import LOUNGE_OFFICIAL_IMG from '../../assets/aviance_images/services/lounge_official.jpg'; // Official Aviance Lounge Interior
import LOUNGE_RECEPTION_IMG from '../../assets/aviance_images/lounge service/c0c393c8-9128-4ce5-b464-28d0417a13b5.png'; // Hostess at Adinkra Lounge desk
import LOUNGE_SEATING_IMG from '../../assets/aviance_images/services/lounge_services.jpg'; // Adinkra lounge seating
import LOUNGE_BAR_IMG from '../../assets/aviance_images/lounge service/9e1a4c0d-671a-4285-b24e-880e7659369e.png'; // Premium beverage bar
import LOUNGE_GUEST_IMG from '../../assets/aviance_images/1791796145150.jpg'; // Passenger enjoying breakfast/coffee

interface VipLoungePageProps {
  onNavigate: (path: string) => void;
  onOpenVipModal?: () => void;
}

export const VipLoungePage: React.FC<VipLoungePageProps> = ({ onNavigate, onOpenVipModal }) => {
  const { isLight } = useTheme();
  const [passCount, setPassCount] = useState(1);
  const [_selectedLounge, _setSelectedLounge] = useState('u-lounge');

  const lounges = [
    {
      id: 'adinkra-t3',
      name: 'Adinkra Lounge (Terminal 3)',
      airport: 'Kotoka International Airport, Accra',
      tag: 'Flagship International Lounge',
      desc: 'Reserved for First and Business Class passengers, eligible airline frequent flyers, and corporate cardholders. Featuring complimentary hot gourmet dining, premium beverage bar, private executive shower suites, and high-speed Wi-Fi.',
      capacity: '120 Guests',
      price: 'Airline Partner / Card Eligibility',
      badgeColor: 'border-blue-500/30 text-sky-400 bg-sky-500/10',
      image: LOUNGE_SEATING_IMG,
    },
    {
      id: 'u-lounge',
      name: 'The U Lounge (Terminal 3)',
      airport: 'Kotoka International Airport, Accra',
      tag: 'Open to All Walk-in Passengers',
      desc: 'The U Lounge, located at Terminal 3 in Accra, is open to walk-in passengers at a standard rate of USD 25.00 per passenger. Offers comfortable lounge seating, TV entertainment, fresh refreshments, and tranquil workstations before flight departure.',
      capacity: '60 Guests',
      price: 'USD $25.00 / Passenger',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      isWalkInPromo: true,
      image: LOUNGE_BAR_IMG,
    },
    {
      id: 'adinkra-t2',
      name: 'Adinkra Lounge (Terminal 2)',
      airport: 'Kotoka International Airport, Accra',
      tag: 'Domestic Flight Hub',
      desc: 'Dedicated pre-flight comfort for domestic flights departing Accra to Kumasi, Tamale, and regional aerodromes. Refreshments, quiet rest areas, and flight boarding announcements.',
      capacity: '40 Guests',
      price: 'Airline / Domestic Access',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      image: LOUNGE_RECEPTION_IMG,
    },
    {
      id: 'adinkra-kms',
      name: 'Adinkra Lounge (Kumasi)',
      airport: 'Prempeh I International Airport, Kumasi',
      tag: 'Ashanti Regional Hub',
      desc: 'Pre-flight hospitality suite for business travelers and commercial passengers departing the Garden City.',
      capacity: '35 Guests',
      price: 'Partner / Passenger Access',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      image: LOUNGE_GUEST_IMG,
    },
    {
      id: 'cip-kms',
      name: 'CIP Lounge (Kumasi)',
      airport: 'Prempeh I International Airport, Kumasi',
      tag: 'Commercially Important Persons',
      desc: 'Discreet and private VIP accommodation for government delegations, executives, and VIP charter guests in Kumasi.',
      capacity: '20 Guests',
      price: 'VIP / Protocol Reservation',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
      image: LOUNGE_SEATING_IMG,
    },
    {
      id: 'adinkra-tml',
      name: 'Adinkra Lounge (Tamale)',
      airport: 'Tamale International Airport, Northern Region',
      tag: 'Northern Gateway Suite',
      desc: 'Serving scheduled domestic flights, charter operators, and annual Hajj pilgrimage flight operations with dedicated comfort.',
      capacity: '45 Guests',
      price: 'Partner / Passenger Access',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      image: LOUNGE_RECEPTION_IMG,
    },
  ];

  return (
    <div className={`min-h-screen pb-24 sm:pb-32 transition-colors ${isLight ? 'bg-white text-slate-800' : 'bg-[#0B1528] text-slate-100'}`}>
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
            <span className="text-[#204696] font-semibold">Lounge Services</span>
          </div>
        </div>
      </div>

      {/* Hero Header — Aviance Blue Grid Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        {/* Subtle aeronautical blueprint grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
            Adinkra &amp; U Lounge Hospitality
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-3xl">
            Aviance Ghana provides comfortable airport lounge experiences for First and Business Class passengers, premium travellers, lounge programme members, and walk-in guests across Accra, Kumasi, and Tamale.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="tel:+233593816076"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#72BF44]" />
              <span>CONTACT: +233 (0) 59 381 60 76</span>
            </a>
            <a
              href="mailto:loungemanager@avianceghana.com"
              className="px-5 py-3 border border-white/20 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#009EE0]" />
              <span>loungemanager@avianceghana.com</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-24 lg:space-y-32">
        
        {/* Official Scope & Services — Open 2-Column Layout */}
        <section className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Scope & Key Services */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Lounge Services
                </h2>
                <div className={`mt-4 space-y-3 text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  <p>
                    Aviance Ghana operates premium executive lounges designed to provide departing and transit passengers with a relaxing and comfortable atmosphere.
                  </p>
                  <p>
                    With dedicated reception services, refreshments and comfortable seating, our lounges cater to airline customers, commercial partners and eligible travellers seeking convenience before their flight.
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-bold mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Key services
                </h3>
                <ul className={`space-y-2.5 text-sm sm:text-base ${
                  isLight ? 'text-slate-700' : 'text-slate-200'
                }`}>
                  {[
                    'Passenger reception and access verification.',
                    'Comfortable seating and work spaces.',
                    'Complimentary food and beverage services.',
                    'Flight information and boarding announcements.',
                    'Wi-Fi and charging facilities.',
                    'Shower facilities and rest amenities (Adinkra Lounge).'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-slate-400 dark:text-slate-500 font-bold select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold">
                <a href="tel:+233593816076" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Phone className="w-4 h-4 text-[#72BF44]" />
                  <span>CONTACT: +233 (0) 59 381 60 76</span>
                </a>
                <a href="mailto:loungemanager@avianceghana.com" className="inline-flex items-center gap-2 text-[#204696] dark:text-[#58C1EB] hover:underline">
                  <Mail className="w-4 h-4 text-[#009EE0]" />
                  <span className="underline">loungemanager@avianceghana.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Authentic Page Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src={LOUNGE_OFFICIAL_IMG}
                  alt="Aviance Ghana Lounge Services"
                  className="w-full h-auto max-h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WALK-IN PASS ESTIMATOR & PROMO BANNER */}
        <div className="py-8 sm:py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                Kotoka Terminal 3 Walk-In Rate
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Walk In to the U Lounge for Only USD $25.00
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                No airline status or premium class ticket required! The U Lounge is located on the international departure level at Terminal 3 in Accra. Refreshments, high-speed Wi-Fi, comfortable armchairs, and flight departure status updates.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-500 font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant confirmation · Pay online or at the reception desk</span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-700/30 space-y-2">
              <span className={`text-xs font-bold block mb-2 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                Estimate Total Pass Cost
              </span>
              <div className="flex items-center gap-3 mb-4">
                <label className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Passes:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPassCount(Math.max(1, passCount - 1))}
                    className="w-8 h-8 rounded-lg bg-sky-500/10 text-[#0284C7] font-bold flex items-center justify-center hover:bg-sky-500/20"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg px-2 text-slate-800">{passCount}</span>
                  <button
                    onClick={() => setPassCount(passCount + 1)}
                    className="w-8 h-8 rounded-lg bg-sky-500/10 text-[#0284C7] font-bold flex items-center justify-center hover:bg-sky-500/20"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={`flex items-baseline justify-between border-t pt-3 mb-4 ${
                isLight ? 'border-amber-200/60' : 'border-white/10'
              }`}>
                <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Total:</span>
                <span className="text-2xl font-extrabold font-mono text-amber-600">
                  ${passCount * 25}.00 <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>USD</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 LOUNGES DIRECTORY */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className={`text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              The 6 Aviance Lounges in Ghana
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Operating across Kotoka Terminal 3, Terminal 2, Prempeh I Kumasi, and Tamale International.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lounges.map((l) => (
              <div
                key={l.id}
                className="group flex flex-col justify-between space-y-4 transition-all duration-300"
              >
                {l.image && (
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                      {l.airport.split(',')[0]}
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {l.name}
                  </h3>

                  <div className={`flex items-center gap-1.5 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <MapPin className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-[#204696]' : 'text-sky-400'}`} />
                    <span>{l.airport}</span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {l.desc}
                  </p>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between ${
                  isLight ? 'border-slate-100' : 'border-white/5'
                }`}>
                  <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Active Station Lounge
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTHENTIC LOUNGE AMBIANCE GALLERY */}
        <section className="space-y-6">
          <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#204696] via-[#009EE0] to-[#72BF44]" />
                <span className={`text-xs font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                }`}>
                  Lounge Ambiance & Hospitalities
                </span>
              </div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Inside the Adinkra & U Lounges
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`rounded-xl border overflow-hidden shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={LOUNGE_RECEPTION_IMG}
                  alt="Adinkra Lounge reception desk with hostess"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Warm Reception & Check-In</h4>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Official Adinkra Lounge concierge welcoming eligible airline guests and cardholders.</p>
              </div>
            </div>

            <div className={`rounded-xl border overflow-hidden shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={LOUNGE_SEATING_IMG}
                  alt="Adinkra executive seating area and Ghanaian art"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Executive Seating & Peace</h4>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Plush armchairs, reading tables, power outlets, and peaceful atmosphere away from the gate bustle.</p>
              </div>
            </div>

            <div className={`rounded-xl border overflow-hidden shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={LOUNGE_BAR_IMG}
                  alt="Premium beverage bar and television screens"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Premium Bar & TV Lounge</h4>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Complimentary spirits, wines, beers, and live international sports/news broadcasts.</p>
              </div>
            </div>

            <div className={`rounded-xl border overflow-hidden shadow-md ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={LOUNGE_GUEST_IMG}
                  alt="Lounge guest enjoying fresh coffee and pastries"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Gourmet Dining & Coffee</h4>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Fresh pastries, continental hot buffet, espresso coffee, and cold fruit juices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AMENITIES SHOWCASE */}
        <div className="space-y-6">
          <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
            <h2 className={`text-2xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Lounge Amenities & Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Gourmet Dining & Bar</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Chef-prepared hot buffet dishes, continental pastries, snacks, fine wines, spirits, and barista coffees.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696]' : 'bg-sky-500/10 text-sky-400'
              }`}>
                <ShowerHead className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Private Shower Suites</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Private executive shower rooms with luxury towels and amenities to refresh before long-haul international flights.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-blue-50 text-[#204696]' : 'bg-blue-500/10 text-blue-400'
              }`}>
                <Wifi className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Fiber Wi-Fi & Work Pods</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Ultra-fast fiber internet, quiet business workstations, universal charging points, and printing facilities.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0D1829] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>VIP Protocol & Apron Escort</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Personalized tarmac transfer, fast-track diplomatic clearances, and dedicated ramp escort for private flights.
              </p>
            </div>
          </div>
        </div>

        {/* LOUNGE MANAGEMENT CONTACT CARD */}
        <div className={`p-8 rounded-3xl border text-center max-w-xl mx-auto space-y-4 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
        }`}>
          <div className={`font-bold text-sm uppercase tracking-wider font-mono ${
            isLight ? 'text-[#204696]' : 'text-sky-400'
          }`}>
            Lounge Management Desk
          </div>
          <div className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Pearl Darkwah · Lounge Manager
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono">
            <a href="tel:+233557758345" className={`flex items-center gap-1.5 transition-colors ${
              isLight ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'
            }`}>
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              +233 (0) 557 75 8345
            </a>
            <span className={`hidden sm:inline ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>|</span>
            <a href="mailto:loungemanager@avianceghana.com" className={`flex items-center gap-1.5 hover:underline ${
              isLight ? 'text-[#204696] font-semibold' : 'text-sky-400'
            }`}>
              <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#204696]' : 'text-sky-400'}`} />
              loungemanager@avianceghana.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
