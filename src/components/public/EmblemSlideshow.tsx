import React, { useState, useEffect, useRef, useCallback } from 'react';

// 12 authentic operations images from `homepage image show/image-show/`
import imgCargoVillage from '../../assets/aviance_images/homepage image show/image-show/1780574568846.jpg';
import imgAmbassador from '../../assets/aviance_images/homepage image show/image-show/1791796144202.jpg';
import imgPushback from '../../assets/aviance_images/homepage image show/image-show/1791968160594.jpg';
import imgCargoPallet from '../../assets/aviance_images/homepage image show/image-show/1759758700331.jpg';
import imgEthiopianTeam from '../../assets/aviance_images/homepage image show/image-show/1776164623557.jpg';
import imgSolitairAircraft from '../../assets/aviance_images/homepage image show/image-show/1788350257403.jpg';
import imgGroundSupport from '../../assets/aviance_images/homepage image show/image-show/1f19c5_ground_ops.jpg';
import imgVipLounge from '../../assets/aviance_images/homepage image show/image-show/c0c393c8-9128-4ce5-b464-28d0417a13b5.png';
import imgBaggageHandling from '../../assets/aviance_images/homepage image show/image-show/eb15b6_baggage_handling.jpg';
import imgMaintenanceEng from '../../assets/aviance_images/homepage image show/image-show/ee4669f3-9945-4b97-a86e-d28b9860138a.png';
import imgTrainingAcademy from '../../assets/aviance_images/homepage image show/image-show/1740561240681.jpg';
import imgLoungeGuest from '../../assets/aviance_images/homepage image show/image-show/1791796143012.jpg';

// Authentic, mathematically smooth Aviance logo stroke overlay (1930 x 1361)
import logoStrokeOutline from '../../assets/aviance_images/homepage image show/mask/logo_stroke_outline.png';

export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspectAlign?: string; // Custom SVG preserveAspectRatio for optimal subject framing
}

export const EMBLEM_PHOTOS: PhotoItem[] = [
  {
    id: 'cargo-village',
    src: imgCargoVillage,
    title: 'Cargo Logistics',
    caption: 'Aviance Cargo Village & Warehouse Operations',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'brand-ambassador',
    src: imgAmbassador,
    title: 'VIP Hospitality',
    caption: 'Executive Airport Hospitality & Ambassador Care',
    aspectAlign: 'xMidYMin slice', // Aligns to top so ambassador face & logo sign are in full view
  },
  {
    id: 'pushback-ops',
    src: imgPushback,
    title: 'Ramp Handling',
    caption: 'Certified Pushback Tug & Airside Ground Crew',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'cargo-pallet',
    src: imgCargoPallet,
    title: 'Cold-Chain Freight',
    caption: 'Specialized Air Cargo Handling & Perishables',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'ethiopian-team',
    src: imgEthiopianTeam,
    title: 'Aviation Partnerships',
    caption: 'Turnaround Operations for International Airlines',
    aspectAlign: 'xMidYMin slice', // Aligns to top so entire crew & Ethiopian plane are visible
  },
  {
    id: 'solitair-apron',
    src: imgSolitairAircraft,
    title: 'Apron Operations',
    caption: 'Airside Fleet Coordination & Ramp Safety',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'ground-support',
    src: imgGroundSupport,
    title: 'Ground Fleet',
    caption: 'Modern Motorized & Non-Motorized GSE Fleet',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'vip-lounge',
    src: imgVipLounge,
    title: 'Adinkra Lounge',
    caption: 'Premium Executive Lounge at Terminal 3',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'baggage-handling',
    src: imgBaggageHandling,
    title: 'Baggage Logistics',
    caption: 'High-Speed Baggage Sortation & Ramp Loading',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'maintenance-eng',
    src: imgMaintenanceEng,
    title: 'Line Maintenance',
    caption: 'Licensed Aircraft Technicians & Safety Engineers',
    aspectAlign: 'xMidYMid slice',
  },
  {
    id: 'training-academy',
    src: imgTrainingAcademy,
    title: 'Training & Safety Academy',
    caption: 'Certified Aviation Safety Training & Ramp Operations Crew',
    aspectAlign: 'xMidYMin slice',
  },
  {
    id: 'lounge-hospitality',
    src: imgLoungeGuest,
    title: 'Executive Hospitality',
    caption: 'Adinkra Lounge Comfort & Reliable Passenger Experience',
    aspectAlign: 'xMidYMid slice',
  },
];

// Authentic, sleek vector clip paths matching the true Aviance logo geometry (1926 x 1378)
const CLIP_PATHS = {
  TL: 'M 77 142 L 69 157 L 65 175 L 67 202 L 76 225 L 88 242 L 115 269 L 167 308 L 257 366 L 338 414 L 498 502 L 591 549 L 675 589 L 685 591 L 697 589 L 705 585 L 713 577 L 718 562 L 728 449 L 746 337 L 763 261 L 797 144 L 795 128 L 784 115 L 776 111 L 741 105 L 532 79 L 410 69 L 319 67 L 275 69 L 221 75 L 160 89 L 140 96 L 112 110 L 93 124 Z',
  TR: 'M 732 606 L 744 620 L 757 627 L 959 715 L 1397 895 L 1416 900 L 1430 898 L 1438 894 L 1448 884 L 1529 780 L 1649 620 L 1795 419 L 1848 340 L 1852 325 L 1850 305 L 1835 288 L 1811 279 L 1713 257 L 1566 229 L 1160 163 L 846 119 L 830 121 L 822 125 L 813 134 L 807 146 L 785 221 L 767 299 L 753 375 L 739 474 L 731 563 L 730 596 Z',
  B: 'M 728 659 L 725 676 L 722 765 L 725 904 L 735 994 L 755 1085 L 781 1154 L 796 1183 L 824 1225 L 845 1249 L 869 1271 L 888 1284 L 912 1296 L 952 1306 L 968 1307 L 986 1306 L 1017 1300 L 1063 1283 L 1116 1252 L 1181 1200 L 1247 1135 L 1333 1038 L 1381 980 L 1406 946 L 1408 936 L 1406 919 L 1394 905 L 1383 899 L 1015 749 L 774 644 L 758 640 L 747 642 L 739 646 Z',
};

// Exact bounding box geometries for crisp center-cropping
const FRAME_CONFIGS = [
  {
    name: 'Top-Left Wing',
    clipId: 'clipEmblemTL',
    x: 65,
    y: 67,
    width: 733,
    height: 525,
    cx: 468,
    cy: 273,
  },
  {
    name: 'Top-Right Wing',
    clipId: 'clipEmblemTR',
    x: 730,
    y: 119,
    width: 1123,
    height: 782,
    cx: 1243,
    cy: 471,
  },
  {
    name: 'Bottom Wing',
    clipId: 'clipEmblemB',
    x: 722,
    y: 640,
    width: 687,
    height: 668,
    cx: 1003,
    cy: 984,
  },
];

interface LayerItem {
  src: string;
  aspectAlign: string;
}

interface CompartmentState {
  layerA: LayerItem;
  layerB: LayerItem;
  activeLayer: 'A' | 'B';
}

export const EmblemSlideshow: React.FC = () => {
  // Dual-layer alternating buffer for each compartment:
  // Layer A and Layer B alternate persistently. Images are ONLY swapped on the invisible layer (opacity 0).
  // This physically eliminates both the initial brightness spike and the end-of-transition unmount flash.
  const [compartments, setCompartments] = useState<[CompartmentState, CompartmentState, CompartmentState]>([
    {
      layerA: { src: EMBLEM_PHOTOS[0].src, aspectAlign: EMBLEM_PHOTOS[0].aspectAlign || 'xMidYMid slice' },
      layerB: { src: '', aspectAlign: 'xMidYMid slice' },
      activeLayer: 'A',
    },
    {
      layerA: { src: EMBLEM_PHOTOS[1].src, aspectAlign: EMBLEM_PHOTOS[1].aspectAlign || 'xMidYMin slice' },
      layerB: { src: '', aspectAlign: 'xMidYMin slice' },
      activeLayer: 'A',
    },
    {
      layerA: { src: EMBLEM_PHOTOS[2].src, aspectAlign: EMBLEM_PHOTOS[2].aspectAlign || 'xMidYMid slice' },
      layerB: { src: '', aspectAlign: 'xMidYMid slice' },
      activeLayer: 'A',
    },
  ]);

  // Tracks the currently displayed photo indices across the 3 frames to strictly prevent duplicate images
  const displayedIndices = useRef<[number, number, number]>([0, 1, 2]);

  /**
   * Smoothly crossfades a SINGLE compartment using the alternating dual-layer buffer:
   * 1. Loads new photo onto the currently HIDDEN layer (opacity: 0)
   * 2. On next frame, smoothly transitions opacity (0 -> 1 on incoming, 1 -> 0 on outgoing)
   * 3. No abrupt unmounting, no filter brightness spikes, NO FLASH!
   */
  const triggerCompartmentChange = useCallback((targetIndex: number) => {
    const currentShown = displayedIndices.current;

    // Available photos that are NOT currently showing in any of the 3 frames
    const available = Array.from({ length: EMBLEM_PHOTOS.length }, (_, i) => i).filter(
      idx => !currentShown.includes(idx)
    );

    if (available.length === 0) return;

    // Pick a random available photo
    const nextPhotoIdx = available[Math.floor(Math.random() * available.length)];
    const nextPhoto = EMBLEM_PHOTOS[nextPhotoIdx];
    displayedIndices.current[targetIndex] = nextPhotoIdx;

    // Step 1: Pre-load the new image into the INVISIBLE layer while it is 100% hidden
    setCompartments(prev => {
      const next = [...prev] as [CompartmentState, CompartmentState, CompartmentState];
      const comp = next[targetIndex];
      if (comp.activeLayer === 'A') {
        next[targetIndex] = {
          ...comp,
          layerB: { src: nextPhoto.src, aspectAlign: nextPhoto.aspectAlign || 'xMidYMid slice' },
        };
      } else {
        next[targetIndex] = {
          ...comp,
          layerA: { src: nextPhoto.src, aspectAlign: nextPhoto.aspectAlign || 'xMidYMid slice' },
        };
      }
      return next;
    });

    // Step 2: Smoothly crossfade by toggling activeLayer on the next animation tick
    requestAnimationFrame(() => {
      setCompartments(prev => {
        const next = [...prev] as [CompartmentState, CompartmentState, CompartmentState];
        const comp = next[targetIndex];
        next[targetIndex] = {
          ...comp,
          activeLayer: comp.activeLayer === 'A' ? 'B' : 'A',
        };
        return next;
      });
    });
  }, []);

  /**
   * Automated asynchronous rotation:
   * Rotates ONE frame at a time every 3.5 seconds in a continuous rhythm (TL -> TR -> B -> TL -> ...)
   * Purely automatic and hands-free.
   */
  useEffect(() => {
    let currentTurn = 0;

    const interval = setInterval(() => {
      currentTurn = (currentTurn + 1) % 3;
      triggerCompartmentChange(currentTurn);
    }, 3500);

    return () => clearInterval(interval);
  }, [triggerCompartmentChange]);

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      {/* Dynamic Aviance Emblem Showcase with True Aerodynamic Curves & Gentle Flight Levitation */}
      <div className="relative w-[98%] xs:w-[95%] sm:w-[88%] md:w-[82%] lg:w-full max-w-[440px] xs:max-w-[480px] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[640px] xl:max-w-[700px] 2xl:max-w-[750px] animate-gentle-float hover:[animation-play-state:paused] transition-transform duration-700 ease-out">
        <svg
          viewBox="0 0 1926 1378"
          className="w-full h-auto drop-shadow-[0_22px_55px_rgba(4,36,156,0.18)] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Radial Backlight Aura behind the Emblem */}
            <radialGradient id="emblemAura" cx="62%" cy="46%" r="58%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.14" />
              <stop offset="55%" stopColor="#0047C4" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Smooth Top-Left Wing Vector Clip */}
            <clipPath id="clipEmblemTL">
              <path d={CLIP_PATHS.TL} />
            </clipPath>

            {/* Smooth Top-Right Wing Vector Clip */}
            <clipPath id="clipEmblemTR">
              <path d={CLIP_PATHS.TR} />
            </clipPath>

            {/* Smooth Bottom Wing Vector Clip */}
            <clipPath id="clipEmblemB">
              <path d={CLIP_PATHS.B} />
            </clipPath>
          </defs>

          {/* 0. Soft Ambient Luminous Halo with Gentle Breathing Glow */}
          <circle cx="1060" cy="650" r="780" fill="url(#emblemAura)" className="pointer-events-none animate-halo-pulse" />

          {/* RENDER THE 3 COMPARTMENTS WITH FLICKER-FREE DUAL-LAYER CROSSFADE */}
          {FRAME_CONFIGS.map((cfg, idx) => {
            const comp = compartments[idx];

            return (
              <g
                key={cfg.clipId}
                clipPath={`url(#${cfg.clipId})`}
                className="transition-opacity duration-300"
              >
                {/* Layer A (Persistent Buffer Layer) */}
                {comp.layerA.src && (
                  <image
                    href={comp.layerA.src}
                    x={cfg.x}
                    y={cfg.y}
                    width={cfg.width}
                    height={cfg.height}
                    preserveAspectRatio={comp.layerA.aspectAlign}
                    style={{
                      transformOrigin: `${cfg.cx}px ${cfg.cy}px`,
                      opacity: comp.activeLayer === 'A' ? 1 : 0,
                      transform: comp.activeLayer === 'A' ? 'scale(1.0)' : 'scale(1.04)',
                      transition:
                        'opacity 1200ms cubic-bezier(0.25, 1, 0.5, 1), transform 1400ms cubic-bezier(0.25, 1, 0.5, 1)',
                      willChange: 'opacity, transform',
                    }}
                  />
                )}

                {/* Layer B (Persistent Buffer Layer) */}
                {comp.layerB.src && (
                  <image
                    href={comp.layerB.src}
                    x={cfg.x}
                    y={cfg.y}
                    width={cfg.width}
                    height={cfg.height}
                    preserveAspectRatio={comp.layerB.aspectAlign}
                    style={{
                      transformOrigin: `${cfg.cx}px ${cfg.cy}px`,
                      opacity: comp.activeLayer === 'B' ? 1 : 0,
                      transform: comp.activeLayer === 'B' ? 'scale(1.0)' : 'scale(1.04)',
                      transition:
                        'opacity 1200ms cubic-bezier(0.25, 1, 0.5, 1), transform 1400ms cubic-bezier(0.25, 1, 0.5, 1)',
                      willChange: 'opacity, transform',
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* AUTHENTIC SLEEK COBALT BLUE LOGO OUTLINE OVERLAY */}
          {/* Beautifully curved, smooth, and aerodynamic official Aviance geometry */}
          <image
            href={logoStrokeOutline}
            x="0"
            y="0"
            width="1926"
            height="1378"
            className="pointer-events-none select-none z-10"
          />
        </svg>
      </div>
    </div>
  );
};
