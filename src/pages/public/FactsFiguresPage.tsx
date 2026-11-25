import React, { useState, useEffect } from 'react';
import {
  PlaneTakeoff,
  Globe2,
  Route,
  Boxes,
  Users,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  MapPin,
  Clock,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FactsFiguresPageProps {
  onNavigate: (path: string) => void;
}

/**
 * High-performance smooth counter animation running at 60/120fps with ease-out curve
 */
const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
  triggerKey?: number;
}> = ({ target, suffix = '+', duration = 1600, triggerKey = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth cubic ease-out curve
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, triggerKey]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const FactsFiguresPage: React.FC<FactsFiguresPageProps> = ({ onNavigate }) => {
  const { isLight } = useTheme();
  const [animationCycle, setAnimationCycle] = useState(0);

  // Official 2025 Figures matching avianceghana.com/facts-figures with exact metrics and factual details
  const officialFigures = [
    {
      id: 'total-flights',
      target: 15000,
      suffix: '+',
      label: 'Total Flights',
      icon: PlaneTakeoff,
      badge: 'Turnaround SLA',
      podTheme: isLight
        ? 'bg-blue-50/90 text-[#204696] border-blue-100 group-hover:bg-[#204696] group-hover:text-white group-hover:border-[#204696] group-hover:shadow-lg group-hover:shadow-[#204696]/25'
        : 'bg-blue-950/40 text-[#58C1EB] border-blue-900/60 group-hover:bg-[#204696] group-hover:text-white group-hover:border-[#58C1EB] group-hover:shadow-lg group-hover:shadow-blue-950/60',
      fact: 'Coordinating scheduled commercial, freighter, and private charter turnarounds across Accra, Kumasi, and Tamale.',
    },
    {
      id: 'intl-flights',
      target: 8000,
      suffix: '+',
      label: 'International Flights',
      icon: Globe2,
      badge: 'Terminal 3 Hub',
      podTheme: isLight
        ? 'bg-sky-50/90 text-[#009EE0] border-sky-100 group-hover:bg-[#009EE0] group-hover:text-white group-hover:border-[#009EE0] group-hover:shadow-lg group-hover:shadow-[#009EE0]/25'
        : 'bg-sky-950/40 text-[#38BDF8] border-sky-900/60 group-hover:bg-[#009EE0] group-hover:text-white group-hover:border-[#38BDF8] group-hover:shadow-lg group-hover:shadow-sky-950/60',
      fact: 'Serving premier global airlines connecting Ghana to destinations across Europe, North America, the Middle East, and Africa.',
    },
    {
      id: 'domestic-flights',
      target: 7000,
      suffix: '+',
      label: 'Domestic Flights',
      icon: Route,
      badge: 'Regional Network',
      podTheme: isLight
        ? 'bg-emerald-50/90 text-[#3B7A1C] border-emerald-100 group-hover:bg-[#72BF44] group-hover:text-white group-hover:border-[#72BF44] group-hover:shadow-lg group-hover:shadow-[#72BF44]/25'
        : 'bg-emerald-950/40 text-[#72BF44] border-emerald-900/60 group-hover:bg-[#72BF44] group-hover:text-white group-hover:border-[#72BF44] group-hover:shadow-lg group-hover:shadow-emerald-950/60',
      fact: 'Powering high-frequency domestic flights linking Kotoka (ACC), Prempeh I (KMS), and Tamale International (TML).',
    },
    {
      id: 'cargo',
      target: 12000,
      suffix: '+',
      label: 'Tonnes of Air Cargo',
      icon: Boxes,
      badge: '~60% Market Share',
      podTheme: isLight
        ? 'bg-indigo-50/90 text-[#0F2E53] border-indigo-100 group-hover:bg-[#0F2E53] group-hover:text-white group-hover:border-[#0F2E53] group-hover:shadow-lg group-hover:shadow-[#0F2E53]/25'
        : 'bg-indigo-950/40 text-indigo-300 border-indigo-900/60 group-hover:bg-[#0F2E53] group-hover:text-white group-hover:border-indigo-400 group-hover:shadow-lg group-hover:shadow-indigo-950/60',
      fact: 'Handling over 60% of Ghana air freight through our EU RA3-certified bonded warehouse and cold-chain vaults.',
    },
    {
      id: 'employees',
      target: 1000,
      suffix: '+',
      label: 'Certified Employees',
      icon: Users,
      badge: '100% Certified',
      podTheme: isLight
        ? 'bg-slate-100/90 text-[#204696] border-slate-200 group-hover:bg-[#204696] group-hover:text-white group-hover:border-[#204696] group-hover:shadow-lg group-hover:shadow-[#204696]/25'
        : 'bg-slate-800/70 text-sky-300 border-slate-700 group-hover:bg-[#204696] group-hover:text-white group-hover:border-[#58C1EB] group-hover:shadow-lg group-hover:shadow-blue-950/60',
      fact: '1,000+ IATA and GCAA-certified ramp technicians, passenger agents, OCC flight dispatchers, and GSE engineers.',
    },
  ];

  const keyFacts = [
    {
      title: 'Heritage & Experience',
      fact: 'Established in October 1994, Aviance Ghana is Ghana’s premier ground service provider with over 30 years of operational excellence.',
    },
    {
      title: 'Safety & Accreditations',
      fact: 'Fully accredited under the IATA ISAGO safety registry, EU Cargo RA3 security validation, and GCAA Ground Handling Operator licensing.',
    },
    {
      title: 'Airside Fleet Modernization',
      fact: 'Over $1,000,000 invested in electric and eco-friendly Ground Support Equipment (GSE) to minimize apron carbon emissions.',
    },
  ];

  const handleReplayAnimation = () => {
    setAnimationCycle((prev) => prev + 1);
  };

  return (
    <div className={`min-h-[75vh] flex flex-col justify-between transition-colors duration-200 ${
      isLight ? 'bg-white text-slate-800' : 'bg-[#060D1A] text-slate-100'
    }`}>
      {/* Keyframe Styles for Staggered Entrance */}
      <style>{`
        @keyframes factsFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Hero Header in Signature Aviance Blue Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#11244C] via-[#1A3670] to-[#204696] text-white py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.028em] text-white leading-[1.14]">
              Facts and Figures 2025
            </h1>
            <button
              onClick={handleReplayAnimation}
              title="Replay counter animation"
              aria-label="Replay counter animation"
              className="p-2 rounded-full text-blue-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer hover:rotate-180 duration-500"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl leading-relaxed font-normal">
            Official operational performance, cargo volumes, and workforce metrics across Aviance Ghana's national airport network.
          </p>
        </div>
      </section>

      {/* Main Facts and Figures Content Area */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:py-16 lg:py-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full space-y-16 sm:space-y-20">
          
          {/* 5 Animated Metric Cards with Themed Micro-Hover and Staggered Entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-5 items-stretch">
            {officialFigures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${animationCycle}`}
                  style={{
                    animation: 'factsFadeInUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both',
                    animationDelay: `${index * 100}ms`,
                  }}
                  className={`group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 select-none ${
                    isLight
                      ? 'bg-white border-slate-200/90 hover:border-[#204696]/60 hover:shadow-xl hover:shadow-[#204696]/10'
                      : 'bg-[#0D182E] border-slate-800 hover:border-[#58C1EB]/60 hover:shadow-xl hover:shadow-sky-950/40'
                  }`}
                >
                  {/* Subtle Top Card Accent on Hover */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#204696] via-[#009EE0] to-[#72BF44] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                  {/* Executive Squircle Badge Pod */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 border transition-all duration-300 shadow-2xs group-hover:scale-105 group-hover:-translate-y-1 ${item.podTheme}`}>
                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Animated Counter Telemetry Number */}
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-heading transition-colors duration-200 group-hover:text-[#204696] ${
                    isLight ? 'text-slate-900' : 'text-white group-hover:text-[#58C1EB]'
                  }`}>
                    <AnimatedCounter
                      target={item.target}
                      suffix={item.suffix}
                      duration={1400 + index * 100}
                      triggerKey={animationCycle}
                    />
                  </div>

                  {/* Official Label */}
                  <div className={`text-xs sm:text-sm mt-1 font-bold ${
                    isLight ? 'text-[#204696]' : 'text-[#58C1EB]'
                  }`}>
                    {item.label}
                  </div>

                  {/* Factual Information Blurb */}
                  <p className={`text-[11px] leading-relaxed mt-2.5 pt-2.5 border-t w-full ${
                    isLight ? 'text-slate-600 border-slate-100' : 'text-slate-400 border-slate-800'
                  }`}>
                    {item.fact}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Quick Factual Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {keyFacts.map((kf, i) => (
              <div
                key={i}
                className="pt-5 border-t border-slate-200 dark:border-slate-800 text-left space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 rounded-full bg-[#204696]" />
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-[#204696]' : 'text-sky-300'
                  }`}>
                    {kf.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed font-normal">
                  {kf.fact}
                </p>
              </div>
            ))}
          </div>

          {/* Stations & Network Overview Bar */}
          <div className={`pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'
          }`}>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Operational Stations:
              </span>
              <span>Kotoka Int'l Airport (ACC)</span>
              <span>·</span>
              <span>Prempeh I Int'l Kumasi (KMS)</span>
              <span>·</span>
              <span>Tamale Int'l (TML)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full font-semibold border ${
                isLight
                  ? 'bg-[#72BF44]/15 border-[#72BF44]/30 text-[#3B7A1C]'
                  : 'bg-[#72BF44]/15 border-[#72BF44]/30 text-[#72BF44]'
              }`}>
                IATA ISAGO & EU RA3 Certified
              </span>
            </div>
          </div>

          {/* Quick Links to Other About Pages */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <button
              onClick={() => onNavigate('/about')}
              className={`px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
                isLight
                  ? 'bg-slate-50 hover:bg-white hover:border-[#204696] hover:text-[#204696] text-slate-700 border-slate-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Who We Are
            </button>
            <button
              onClick={() => onNavigate('/management')}
              className={`px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
                isLight
                  ? 'bg-slate-50 hover:bg-white hover:border-[#204696] hover:text-[#204696] text-slate-700 border-slate-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Management Team
            </button>
            <button
              onClick={() => onNavigate('/customers')}
              className={`px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
                isLight
                  ? 'bg-slate-50 hover:bg-white hover:border-[#204696] hover:text-[#204696] text-slate-700 border-slate-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => onNavigate('/code-of-conduct')}
              className={`px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
                isLight
                  ? 'bg-slate-50 hover:bg-white hover:border-[#204696] hover:text-[#204696] text-slate-700 border-slate-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Code of Conduct
            </button>
            <button
              onClick={() => onNavigate('/certifications')}
              className={`px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-2xs ${
                isLight
                  ? 'bg-slate-50 hover:bg-white hover:border-[#204696] hover:text-[#204696] text-slate-700 border-slate-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              Certifications & Licenses
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
