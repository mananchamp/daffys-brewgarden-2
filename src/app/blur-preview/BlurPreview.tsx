'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ─── Only the first four beers ────────────────────────────────────────────────
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const BEERS = [
  {
    id: 'hefeweizen',
    name: 'HEFEWEIZEN',
    glass: `${BASE}/glass_hefeweizen_new.png`,
    bgImage: `${BASE}/bg_hefeweizen_generated.png`,
    tint: '#FDE047',
    notes: 'Banana & Citrus Zest',
    ingredients: ['Wheat Stalks', 'Banana Zest', 'Citrus Peel'],
    composition: 'premium-hefeweizen',
  },
  {
    id: 'wit-bier',
    name: 'WIT BIER',
    glass: `${BASE}/glass_wit_bier_nobg.png`,
    bgImage: `${BASE}/bg_wit_bier.png`,
    tint: '#FDBA74',
    notes: 'Orange Peel & Coriander',
    ingredients: ['Orange Peel', 'Crushed Coriander', 'Creamy Oats'],
    composition: undefined,
  },
  {
    id: 'lager',
    name: 'LAGER',
    glass: `${BASE}/glass_lager_new.png`,
    bgImage: `${BASE}/bg_lager_generated.png`,
    tint: '#d4af37',
    notes: 'Clean Corn, Biscuit Malt, & Floral Hops',
    ingredients: ['Yellow Flowers & Hops', 'Biscuit Malt', 'Clean Corn'],
    composition: 'premium-lager',
  },
  {
    id: 'whisky-ale',
    name: 'WHISKY ALE',
    glass: `${BASE}/glass_whisky_ale_v2.png`,
    bgImage: `${BASE}/bg_whisky_ale_generated.png`,
    tint: '#78350F',
    notes: 'Charred Oak & Campfire Smoke',
    ingredients: ['Charred Oak', 'Glowing Embers', 'Smoke Wisps'],
    composition: 'premium-whisky',
  },
];

const PREMIUM = [
  'premium-lager',
  'premium-whisky',
  'nitro-stout',
  'premium-specialty',
  'premium-mead',
  'premium-hefeweizen',
];

export default function BlurPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── GSAP — runs immediately (no loading gate) ────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap.set('.bp-master-glass-viewport', { xPercent: isMobile ? 0 : -22 });

      const sections = BEERS.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${(sections - 1) * 100}%`,
          pin: true,
          scrub: 1.2,
        },
      });

      BEERS.forEach((_, i) => {
        if (i === 0) return;

        const start = i - 1;
        const isEven = i % 2 === 0;

        tl.to(`.bp-bg-layer-${i - 1}`, {
          opacity: 0,
          xPercent: isMobile ? 0 : (isEven ? 10 : -10),
          duration: 0.7,
          ease: 'power1.inOut',
        }, start);

        tl.fromTo(
          `.bp-bg-layer-${i}`,
          { opacity: 0, xPercent: isMobile ? 0 : (isEven ? -10 : 10) },
          { opacity: 1, xPercent: 0, duration: 0.7, ease: 'power1.inOut' },
          start + 0.3,
        );

        tl.to('.bp-master-glass-viewport', {
          xPercent: isMobile ? 0 : (isEven ? -22 : 22),
          duration: 1,
          ease: 'power2.inOut',
        }, start);

        tl.to(`.bp-glass-${i - 1}`, { opacity: 0, scale: 0.8, y: -20, duration: 0.5, ease: 'power2.in' }, start);
        tl.fromTo(`.bp-glass-${i}`, { opacity: 0, scale: 1.1, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);

        tl.to(`.bp-content-${i - 1}`, { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' }, start);
        tl.fromTo(`.bp-content-${i}`, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative bg-[#050505] text-white overflow-hidden font-sans selection:bg-[#d4af37]/30"
      style={{ height: `${BEERS.length * 100}vh` }}
    >
      {/* ─── PINNED EXPERIENCE ───────────────────────────────────────────── */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          {BEERS.map((beer, i) => (
            <div
              key={`bp-bg-${beer.id}`}
              className={`bp-bg-layer-${i} absolute inset-0`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={beer.bgImage}
                alt=""
                fill
                priority={i < 4}
                className="object-cover transition-transform duration-1000 scale-105"
                style={{
                  filter: PREMIUM.includes(beer.composition!)
                    ? 'brightness(0.82) saturate(1.1) contrast(1.05)'
                    : 'brightness(0.6) saturate(1.2)',
                }}
              />

              {/* Vignette */}
              {['premium-lager', 'premium-whisky', 'premium-specialty', 'premium-mead', 'premium-hefeweizen'].includes(beer.composition!) ? (
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
              )}

              {/* ── Whisky Ale: smoke blurs ── */}
              {beer.composition === 'premium-whisky' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f97316]/30 via-transparent to-transparent opacity-50 mix-blend-screen animate-pulse pointer-events-none" />
                  <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-70">
                    <div className="absolute bottom-[10%] left-[35%] w-64 h-96 bg-[#e5e7eb]/10 blur-[60px] rounded-[100%] animate-smoke-1" />
                    <div className="absolute bottom-[10%] right-[35%] w-72 h-96 bg-[#e5e7eb]/10 blur-[70px] rounded-[100%] animate-smoke-2" />
                  </div>
                </>
              )}

              {/* ── Hefeweizen: wheat floating blurs ── */}
              {beer.composition === 'premium-hefeweizen' && (
                <>
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-25"
                    style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #fbbf24 0%, transparent 70%)' }}
                  />
                  <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
                    <div className="absolute top-[25%] left-[25%] w-56 h-56 bg-[#fde047]/20 blur-[70px] rounded-[100%] animate-wheat-1" />
                    <div className="absolute bottom-[30%] right-[20%] w-64 h-64 bg-[#f59e0b]/15 blur-[80px] rounded-[100%] animate-wheat-2" />
                  </div>
                </>
              )}

              {/* Generic tint for non-premium beers */}
              {!PREMIUM.includes(beer.composition!) && (
                <div className="absolute inset-0 opacity-20 mix-blend-color" style={{ background: beer.tint }} />
              )}
            </div>
          ))}
        </div>

        {/* Glass layer */}
        <div className="absolute inset-0 flex items-start md:items-center justify-center z-20 pointer-events-none">
          <div className="bp-master-glass-viewport relative w-[70vw] md:w-[45vw] h-[52vh] md:h-[80vh] flex items-center justify-center will-change-transform mt-[10vh] md:mt-0">
            {BEERS.map((beer, i) => (
              <div
                key={`bp-glass-${beer.id}`}
                className={`bp-glass-${i} absolute inset-0 flex items-center justify-center`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div className="relative w-full h-full">
                  <Image src={beer.glass} alt={beer.name} fill className="object-contain" />
                  {['lager', 'whisky-ale'].includes(beer.id) && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/40 blur-xl rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text content layer */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {BEERS.map((beer, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={`bp-content-${beer.id}`}
                className={`bp-content-${i} absolute inset-0 opacity-0
                  flex flex-col items-center justify-end pb-10 px-5
                  md:flex-row md:items-center md:justify-start md:pb-0 md:px-0
                  ${isEven ? 'md:justify-end md:pr-[12%]' : 'md:justify-start md:pl-[12%]'}`}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div className="w-full max-w-xl text-center md:text-left overflow-hidden">
                  <span className="block text-[9px] md:text-xs font-bold tracking-[0.5em] uppercase mb-3 md:mb-6 text-[#d4af37]">
                    {beer.notes}
                  </span>
                  <h2
                    className="leading-none tracking-tight md:tracking-tighter font-black mb-4 md:mb-10 uppercase text-white w-full md:text-7xl"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      textShadow: '0 10px 30px rgba(0,0,0,0.9)',
                      fontSize: 'clamp(1.5rem, 9vw, 1.95rem)',
                    } as React.CSSProperties}
                  >
                    {beer.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
                    {beer.ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="px-3 md:px-8 py-1.5 md:py-2.5 rounded-full border border-[#d4af37]/20 backdrop-blur-2xl bg-[#1a0f0a]/70 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-[#d4af37]/50 group cursor-default"
                      >
                        <span className="text-[8px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[#d4af37]/90 group-hover:text-[#d4af37] transition-colors duration-300">
                          {ing}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll-progress indicator */}
        <div className="fixed right-6 md:right-16 top-1/2 -translate-y-1/2 h-48 md:h-64 w-px bg-white/10 z-[100]">
          <div id="bp-scroll-progress" className="w-full bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ height: '0%' }} />
        </div>
      </div>

      {/* ─── Keyframe styles (scoped names so they never collide) ─────────── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
        body { background: #050505; margin: 0; overflow-x: hidden; }
        canvas { display: block; }

        @keyframes smoke-1 {
          0%   { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20%  { opacity: 0.5; }
          50%  { transform: translateY(-30vh) scale(1.5) translateX(-5vw); opacity: 0.8; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-60vh) scale(2) translateX(5vw); opacity: 0; }
        }
        @keyframes smoke-2 {
          0%   { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20%  { opacity: 0.4; }
          50%  { transform: translateY(-40vh) scale(1.2) translateX(5vw); opacity: 0.7; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(-80vh) scale(1.8) translateX(-5vw); opacity: 0; }
        }
        .animate-smoke-1 { animation: smoke-1 12s infinite ease-in-out; }
        .animate-smoke-2 { animation: smoke-2 15s infinite ease-in-out 2s; }

        @keyframes wheat-float-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50%       { transform: scale(1.15) translate(4vw, -3vh); opacity: 0.75; }
        }
        @keyframes wheat-float-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.35; }
          50%       { transform: scale(1.1) translate(-3vw, 4vh); opacity: 0.65; }
        }
        .animate-wheat-1 { animation: wheat-float-1 13s infinite ease-in-out; }
        .animate-wheat-2 { animation: wheat-float-2 17s infinite ease-in-out 3s; }
      `}</style>
    </div>
  );
}
