import React, { useState } from 'react';
import {
  Plane,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Compass,
  Radio,
  Navigation2,
  ShieldCheck,
  Building2,
  Layers,
  Info
} from 'lucide-react';
import { LocationItem } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  GHANA_REGIONS,
  GHANA_MAP_DIMENSIONS,
  LAKE_VOLTA_PATH,
  AIRPORT_COORDINATES,
  RegionGeoData
} from '../../constants/ghanaRegionsGeo';

// Authentic Aviance Station Imagery
import ACC_IMG from '../../assets/aviance_images/1791968160594.jpg'; // Kotoka T3 airside turnaround
import KMS_IMG from '../../assets/aviance_images/image_show/1759758700331.jpg'; // Prempeh I Kumasi ramp handling & ULD transfer
import TML_IMG from '../../assets/aviance_images/1788350257403.jpg'; // Tamale International charter & passenger handling

interface GhanaMapProps {
  locations: LocationItem[];
  onSelectStation?: (code: string) => void;
}

export const GhanaMap: React.FC<GhanaMapProps> = ({ locations, onSelectStation }) => {
  const { isLight } = useTheme();
  const { t } = useLanguage();
  const [activeCode, setActiveCode] = useState<string>('ACC');
  const [hoveredRegion, setHoveredRegion] = useState<RegionGeoData | null>(null);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);

  const activeLocation = locations.find((l) => l.code === activeCode) || locations[0];

  const handleStationClick = (code: string) => {
    setActiveCode(code);
    if (onSelectStation) {
      onSelectStation(code);
    }
  };

  const getStationVisual = (code: string) => {
    switch (code) {
      case 'ACC':
        return {
          img: ACC_IMG,
          label: 'Kotoka International Airport (ACC) · Terminal 3 & Cargo Village',
          role: 'National Headquarters & Primary Wide-Body Hub',
          region: 'Greater Accra Region',
          runways: 'Runway 03/21 · 3,403m Asphalt (Cat 4E Widebody)',
          traffic: '24/7 International & Domestic Operations · ISAGO Station Base'
        };
      case 'KMS':
        return {
          img: KMS_IMG,
          label: 'Prempeh I International Airport (KMS) · Ashanti Regional Hub',
          role: 'Ashanti Commercial Hub & Domestic Airbridge',
          region: 'Ashanti Region',
          runways: 'Runway 02/20 · 1,981m Asphalt (Boeing 737 / A320 Ready)',
          traffic: 'Scheduled Domestic Commercial & VIP Regional Flights'
        };
      case 'TML':
        return {
          img: TML_IMG,
          label: 'Tamale International Airport (TML) · Northern Gateway',
          role: 'Northern Regional Hub & Annual Hajj Pilgrimage Operations',
          region: 'Northern Region',
          runways: 'Runway 05/23 · 3,400m Asphalt (Wide-Body Capable)',
          traffic: 'Domestic Schedule, Hajj Wide-Body Charters & UN/Relief Cargo'
        };
      default:
        return {
          img: ACC_IMG,
          label: 'Aviance Ghana Operational Station',
          role: 'ISAGO Certified Ground Handling Base',
          region: 'Greater Accra Region',
          runways: 'Category 4E Certified Airside',
          traffic: '24/7 Operations Control'
        };
    }
  };

  const stationVisual = getStationVisual(activeCode);

  const accPos = AIRPORT_COORDINATES.ACC;
  const kmsPos = AIRPORT_COORDINATES.KMS;
  const tmlPos = AIRPORT_COORDINATES.TML;

  return (
    <div
      className={`border rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 transition-all ${
        isLight
          ? 'bg-gradient-to-b from-white via-slate-50 to-blue-50/20 border-slate-200/90 shadow-slate-200/70'
          : 'bg-gradient-to-b from-[#0C1933] via-[#091427] to-[#060D1A] border-[#204696]/40 shadow-[#204696]/10'
      }`}
    >
      {/* Top Telemetry Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 mb-8 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest ${
                isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
              }`}
            >
              Official 16 Administrative Regions & Air Corridor Telemetry
            </span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {t('map.operationalCoverage', 'Operational Coverage Across Ghana')}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Explore Ghana's 16 official administrative regions, Lake Volta, and Aviance's primary operational flight corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              showCorridors
                ? isLight
                  ? 'bg-[#204696] text-white border-[#204696] shadow-sm'
                  : 'bg-[#009EE0] text-slate-950 font-bold border-[#009EE0] shadow-sm'
                : isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showCorridors ? 'Corridors: ON' : 'Corridors: OFF'}</span>
          </button>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
              isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-950/80 border-[#204696]/40 text-slate-300'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#009EE0] animate-pulse" />
            <span>3 AIRPORT BASES</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: Authentic Regional Map & Air Corridor Telemetry */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            className={`relative w-full aspect-[52/74] max-w-lg rounded-2xl border overflow-hidden p-2 shadow-inner select-none ${
              isLight
                ? 'bg-sky-50/40 border-slate-300/80 bg-[radial-gradient(#204696_0.5px,transparent_0.5px)] [background-size:20px_20px]'
                : 'bg-[#050B14] border-[#204696]/40 bg-[radial-gradient(#009EE0_0.6px,transparent_0.6px)] [background-size:20px_20px]'
            }`}
          >
            {/* Compass Rose */}
            <div className="absolute top-3 right-3 z-20 flex flex-col items-center pointer-events-none opacity-85">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center backdrop-blur-xs ${
                  isLight
                    ? 'bg-white/90 border-slate-300 text-[#204696]'
                    : 'bg-slate-900/90 border-[#204696]/50 text-[#58C1EB]'
                }`}
              >
                <Compass className="w-4 h-4 animate-[spin_40s_linear_infinite]" />
              </div>
              <span className={`text-[9px] font-mono font-bold mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                N
              </span>
            </div>

            {/* Scale Bar */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
              <div className={`h-1.5 w-16 border rounded-xs ${isLight ? 'bg-slate-800 border-slate-900' : 'bg-white border-slate-200'}`} />
              <span className={`text-[9px] font-mono font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                150 KM
              </span>
            </div>

            {/* Hovered Region Badge */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              {hoveredRegion ? (
                <div
                  className={`px-2.5 py-1 rounded-lg border shadow-md text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-all ${
                    isLight ? 'bg-white/95 border-slate-300 text-slate-800' : 'bg-slate-900/95 border-[#009EE0]/60 text-white'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-[#009EE0]" />
                  <span className="font-bold">{hoveredRegion.name}</span>
                  <span className="text-[10px] opacity-70">({hoveredRegion.capital})</span>
                  {hoveredRegion.hasStation && (
                    <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                      {hoveredRegion.stationCode} HUB
                    </span>
                  )}
                </div>
              ) : (
                <div
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono flex items-center gap-1 opacity-75 backdrop-blur-xs ${
                    isLight ? 'bg-white/80 border-slate-200 text-slate-500' : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <Info className="w-3 h-3 text-[#009EE0]" />
                  <span>Hover region or select airport</span>
                </div>
              )}
            </div>

            {/* SVG Render: 16 Regions, Lake Volta, and Telemetry */}
            <svg
              viewBox={`0 0 ${GHANA_MAP_DIMENSIONS.width} ${GHANA_MAP_DIMENSIONS.height}`}
              className="w-full h-full relative z-10"
              style={{ filter: isLight ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.06))' : 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))' }}
            >
              <defs>
                {/* Lake Volta Gradient */}
                <linearGradient id="lakeVoltaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
                </linearGradient>

                {/* Ocean Wave Gradient */}
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0.28" />
                </linearGradient>

                {/* Pulse Glow Filters */}
                <filter id="glowAccra" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Surrounding Maritime / Gulf of Guinea at the South */}
              <path
                d="M 30 635 Q 120 670 200 645 T 380 625 T 500 610 L 500 730 L 20 730 Z"
                fill="url(#oceanGrad)"
                className="opacity-60"
              />
              <text
                x="280"
                y="695"
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold tracking-[0.25em] select-none ${
                  isLight ? 'fill-sky-700/60' : 'fill-sky-400/40'
                }`}
              >
                GULF OF GUINEA · ATLANTIC OCEAN
              </text>

              {/* Neighboring Country Labels */}
              <text
                x="465"
                y="350"
                textAnchor="middle"
                transform="rotate(90 465 350)"
                className={`text-[9px] font-mono tracking-widest font-semibold select-none ${
                  isLight ? 'fill-slate-400' : 'fill-slate-600'
                }`}
              >
                TOGO
              </text>
              <text
                x="35"
                y="360"
                textAnchor="middle"
                transform="rotate(-90 35 360)"
                className={`text-[9px] font-mono tracking-widest font-semibold select-none ${
                  isLight ? 'fill-slate-400' : 'fill-slate-600'
                }`}
              >
                CÔTE D'IVOIRE
              </text>
              <text
                x="240"
                y="22"
                textAnchor="middle"
                className={`text-[9px] font-mono tracking-widest font-semibold select-none ${
                  isLight ? 'fill-slate-400' : 'fill-slate-600'
                }`}
              >
                BURKINA FASO
              </text>

              {/* Prime Meridian Line (0° Longitude passing through Tema / Greater Accra) */}
              <line
                x1="335.5"
                y1="35"
                x2="335.5"
                y2="660"
                stroke={isLight ? '#204696' : '#009EE0'}
                strokeWidth="1"
                strokeDasharray="4 4"
                className="opacity-25"
              />
              <text
                x="340"
                y="50"
                className={`text-[8px] font-mono font-bold select-none ${
                  isLight ? 'fill-[#204696]/60' : 'fill-[#009EE0]/60'
                }`}
              >
                0° MERIDIAN
              </text>

              {/* ======================================================== */}
              {/* 16 ADMINISTRATIVE REGIONS OF GHANA                       */}
              {/* ======================================================== */}
              <g id="ghana-regions">
                {GHANA_REGIONS.map((region) => {
                  const isStationHub = region.hasStation;
                  const isCurrentlyActive = region.stationCode === activeCode;
                  const isHovered = hoveredRegion?.id === region.id;

                  // Dynamic fill color according to light/dark mode and hover state
                  let fillColor = isLight ? region.colorLight : region.colorDark;
                  let strokeColor = isLight ? '#94A3B8' : '#334155';
                  let strokeWidth = '1';

                  if (isStationHub) {
                    if (isLight) {
                      fillColor = isCurrentlyActive ? '#DBEAFE' : region.colorLight;
                      strokeColor = isCurrentlyActive ? '#204696' : '#64748B';
                    } else {
                      fillColor = isCurrentlyActive ? '#1E3A8A' : region.colorDark;
                      strokeColor = isCurrentlyActive ? '#009EE0' : '#475569';
                    }
                    strokeWidth = isCurrentlyActive ? '2' : '1.4';
                  }

                  if (isHovered) {
                    strokeColor = isLight ? '#009EE0' : '#38BDF8';
                    strokeWidth = '2';
                  }

                  return (
                    <g key={region.id} className="cursor-pointer transition-all duration-150">
                      <path
                        d={region.path}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        className="transition-all duration-200 hover:opacity-90"
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => {
                          if (region.stationCode) {
                            handleStationClick(region.stationCode);
                          }
                        }}
                      />

                      {/* Region Name Label */}
                      <text
                        x={region.cx}
                        y={region.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        pointerEvents="none"
                        className={`font-sans font-bold select-none transition-all ${
                          region.id === 'GA' || region.id === 'AR'
                            ? 'text-[7.5px]'
                            : 'text-[9px]'
                        } ${
                          isCurrentlyActive
                            ? isLight
                              ? 'fill-[#204696] font-black'
                              : 'fill-sky-300 font-black'
                            : isLight
                            ? 'fill-slate-700/85'
                            : 'fill-slate-200/80'
                        }`}
                      >
                        {region.name.toUpperCase()}
                      </text>

                      {/* Region Capital Dot */}
                      <circle
                        cx={region.cx}
                        cy={region.cy + 10}
                        r="1.8"
                        className={isLight ? 'fill-slate-400' : 'fill-slate-500'}
                        pointerEvents="none"
                      />
                      <text
                        x={region.cx}
                        y={region.cy + 17}
                        textAnchor="middle"
                        pointerEvents="none"
                        className={`text-[6.5px] font-sans font-medium select-none ${
                          isLight ? 'fill-slate-500' : 'fill-slate-400'
                        }`}
                      >
                        {region.capital}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* ======================================================== */}
              {/* LAKE VOLTA (Official Cartography & Water Basin)          */}
              {/* ======================================================== */}
              <g id="lake-volta" pointerEvents="none">
                <path
                  d={LAKE_VOLTA_PATH}
                  fill="url(#lakeVoltaGrad)"
                  stroke="#0284C7"
                  strokeWidth="0.75"
                  className="opacity-90"
                />
                <text
                  x="386"
                  y="460"
                  textAnchor="middle"
                  className="text-[8.5px] font-mono font-bold fill-sky-950 tracking-wider select-none drop-shadow-xs"
                >
                  LAKE VOLTA
                </text>
              </g>

              {/* ======================================================== */}
              {/* AVIANCE FLIGHT CORRIDORS                                 */}
              {/* ======================================================== */}
              {showCorridors && (
                <g id="flight-corridors">
                  {/* Accra (ACC) to Kumasi (KMS) - Arc Corridor */}
                  <path
                    d={`M ${accPos.x} ${accPos.y} Q 285 575 ${kmsPos.x} ${kmsPos.y}`}
                    fill="none"
                    stroke={activeCode === 'ACC' || activeCode === 'KMS' ? '#009EE0' : '#64748B'}
                    strokeWidth={activeCode === 'ACC' || activeCode === 'KMS' ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                    className="opacity-80 animate-[dash_30s_linear_infinite]"
                  />
                  {/* Accra to Tamale (TML) - Long Haul Spine */}
                  <path
                    d={`M ${accPos.x} ${accPos.y} Q 330 390 ${tmlPos.x} ${tmlPos.y}`}
                    fill="none"
                    stroke={activeCode === 'ACC' || activeCode === 'TML' ? '#009EE0' : '#64748B'}
                    strokeWidth={activeCode === 'ACC' || activeCode === 'TML' ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                    className="opacity-80"
                  />
                  {/* Kumasi (KMS) to Tamale (TML) - Northern Airbridge */}
                  <path
                    d={`M ${kmsPos.x} ${kmsPos.y} Q 230 340 ${tmlPos.x} ${tmlPos.y}`}
                    fill="none"
                    stroke={activeCode === 'KMS' || activeCode === 'TML' ? '#009EE0' : '#64748B'}
                    strokeWidth={activeCode === 'KMS' || activeCode === 'TML' ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                    className="opacity-80"
                  />

                  {/* Corridor Distance Badges */}
                  <g pointerEvents="none">
                    <rect x="255" y="555" width="46" height="15" rx="4" fill={isLight ? '#FFFFFF' : '#0B192C'} stroke="#009EE0" strokeWidth="0.75" />
                    <text x="278" y="566" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-[#009EE0]">
                      200 KM
                    </text>

                    <rect x="315" y="380" width="46" height="15" rx="4" fill={isLight ? '#FFFFFF' : '#0B192C'} stroke="#009EE0" strokeWidth="0.75" />
                    <text x="338" y="391" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-[#009EE0]">
                      435 KM
                    </text>

                    <rect x="215" y="335" width="46" height="15" rx="4" fill={isLight ? '#FFFFFF' : '#0B192C'} stroke="#009EE0" strokeWidth="0.75" />
                    <text x="238" y="346" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-[#009EE0]">
                      320 KM
                    </text>
                  </g>
                </g>
              )}

              {/* ======================================================== */}
              {/* AVIANCE OPERATIONAL STATION HUBS                         */}
              {/* ======================================================== */}
              <g id="airport-nodes">
                {/* 1. KOTOKA (ACC) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleStationClick('ACC')}
                >
                  <circle cx={accPos.x} cy={accPos.y} r="18" fill="#204696" fillOpacity="0.2" className="animate-ping" />
                  <circle cx={accPos.x} cy={accPos.y} r="11" fill="#204696" stroke="#FFFFFF" strokeWidth="2" filter="url(#glowAccra)" />
                  <circle cx={accPos.x} cy={accPos.y} r="4.5" fill="#58C1EB" />
                  <g transform={`translate(${accPos.x - 7}, ${accPos.y - 7})`}>
                    <Plane className="w-3.5 h-3.5 text-white" />
                  </g>
                  <rect
                    x={accPos.x - 48}
                    y={accPos.y + 14}
                    width="96"
                    height="19"
                    rx="6"
                    fill={activeCode === 'ACC' ? '#204696' : isLight ? '#FFFFFF' : '#0F172A'}
                    stroke={activeCode === 'ACC' ? '#58C1EB' : isLight ? '#CBD5E1' : '#334155'}
                    strokeWidth="1.5"
                    className="shadow-sm transition-all"
                  />
                  <text
                    x={accPos.x}
                    y={accPos.y + 27}
                    textAnchor="middle"
                    className={`text-[8.5px] font-mono font-black ${
                      activeCode === 'ACC' ? 'fill-white' : isLight ? 'fill-slate-900' : 'fill-slate-200'
                    }`}
                  >
                    ACCRA (ACC) ★ HQ
                  </text>
                </g>

                {/* 2. KUMASI (KMS) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleStationClick('KMS')}
                >
                  <circle cx={kmsPos.x} cy={kmsPos.y} r="15" fill="#009EE0" fillOpacity="0.2" className="animate-ping" />
                  <circle cx={kmsPos.x} cy={kmsPos.y} r="9.5" fill="#009EE0" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx={kmsPos.x} cy={kmsPos.y} r="3.5" fill="#FFFFFF" />
                  <rect
                    x={kmsPos.x - 44}
                    y={kmsPos.y - 30}
                    width="88"
                    height="19"
                    rx="6"
                    fill={activeCode === 'KMS' ? '#009EE0' : isLight ? '#FFFFFF' : '#0F172A'}
                    stroke={activeCode === 'KMS' ? '#204696' : isLight ? '#CBD5E1' : '#334155'}
                    strokeWidth="1.5"
                    className="shadow-sm transition-all"
                  />
                  <text
                    x={kmsPos.x}
                    y={kmsPos.y - 17}
                    textAnchor="middle"
                    className={`text-[8.5px] font-mono font-black ${
                      activeCode === 'KMS' ? 'fill-white' : isLight ? 'fill-slate-900' : 'fill-slate-200'
                    }`}
                  >
                    KUMASI (KMS)
                  </text>
                </g>

                {/* 3. TAMALE (TML) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleStationClick('TML')}
                >
                  <circle cx={tmlPos.x} cy={tmlPos.y} r="15" fill="#72BF44" fillOpacity="0.2" className="animate-ping" />
                  <circle cx={tmlPos.x} cy={tmlPos.y} r="9.5" fill="#72BF44" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx={tmlPos.x} cy={tmlPos.y} r="3.5" fill="#FFFFFF" />
                  <rect
                    x={tmlPos.x - 44}
                    y={tmlPos.y - 30}
                    width="88"
                    height="19"
                    rx="6"
                    fill={activeCode === 'TML' ? '#72BF44' : isLight ? '#FFFFFF' : '#0F172A'}
                    stroke={activeCode === 'TML' ? '#204696' : isLight ? '#CBD5E1' : '#334155'}
                    strokeWidth="1.5"
                    className="shadow-sm transition-all"
                  />
                  <text
                    x={tmlPos.x}
                    y={tmlPos.y - 17}
                    textAnchor="middle"
                    className={`text-[8.5px] font-mono font-black ${
                      activeCode === 'TML' ? 'fill-white' : isLight ? 'fill-slate-900' : 'fill-slate-200'
                    }`}
                  >
                    TAMALE (TML)
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Quick Station Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 w-full">
            {locations.map((loc) => {
              const isActive = loc.code === activeCode;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleStationClick(loc.code)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#204696] text-white shadow-md shadow-[#204696]/20 ring-2 ring-[#009EE0]/40'
                      : isLight
                      ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Plane className={`w-3 h-3 ${isActive ? 'text-[#58C1EB]' : 'text-slate-400'}`} />
                  <span>{AIRPORT_COORDINATES[loc.code]?.city || loc.name} ({loc.code})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Operational Station Intelligence Card */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div
            className={`rounded-2xl border p-6 transition-all ${
              isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900/90 border-[#204696]/40 shadow-xl'
            }`}
          >
            {/* Station Photographic Header */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-slate-200/50 shadow-inner group">
              <img
                src={stationVisual.img}
                alt={stationVisual.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-[#204696] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-[#58C1EB]/30 backdrop-blur-md">
                  ICAO: {activeLocation.icaoCode} · IATA: {activeLocation.code}
                </span>
                <span className="bg-emerald-600/90 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                  <CheckCircle2 className="w-3 h-3" />
                  OPERATIONAL 24/7
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#58C1EB] font-bold">
                  {stationVisual.region} · Aviance Ground Operations
                </div>
                <div className="text-white font-bold text-sm sm:text-base line-clamp-1">
                  {stationVisual.label}
                </div>
              </div>
            </div>

            {/* Station Title & Role */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#009EE0] mb-1">
                <Navigation2 className="w-3.5 h-3.5" />
                <span>{stationVisual.role}</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activeLocation.name}
              </h3>
              <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {activeLocation.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs font-mono">
              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#009EE0]" />
                  <span className="font-bold">Airside Facility</span>
                </div>
                <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {stationVisual.runways}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-bold">Dispatch Operations</span>
                </div>
                <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {stationVisual.traffic}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-[#204696] dark:text-[#58C1EB]" />
                  <span className="font-bold">Physical Station</span>
                </div>
                <div className={`font-semibold truncate ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {activeLocation.address}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-bold">Direct Dispatch</span>
                </div>
                <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {activeLocation.contactPhone}
                </div>
              </div>
            </div>

            {/* Email Contact Callout */}
            <div
              className={`mt-4 p-3 rounded-xl border flex items-center justify-between gap-3 ${
                isLight ? 'bg-blue-50/50 border-blue-100 text-slate-700' : 'bg-blue-950/20 border-[#204696]/40 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <Mail className="w-4 h-4 text-[#009EE0]" />
                <span className="font-semibold">Station Dispatch Email:</span>
                <span className="font-mono text-[#204696] dark:text-[#58C1EB]">{activeLocation.contactEmail}</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
