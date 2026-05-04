'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const BEERS = [
  {
    id: 'hefeweizen',
    name: 'Hefeweizen',
    img: `${BASE}/Hefeweizen.png`,
    color: '#F5C518',
    mugColor: '#e8b820',
    fogColor: 'rgba(253,224,71,0.18)',
    ingredients: ['Wheat Malt', 'Bavarian Hefe Yeast', 'Saaz Hops', 'Banana & Clove Esters', 'Citrus Zest'],
    bg: 'radial-gradient(ellipse at 60% 40%, #fde047 0%, #ca8a04 55%, #78350f 100%)',
    accent: '#FDE047',
    textColor: '#3b1f00',
    overlayEl: 'hefeweizen',
  },
  {
    id: 'wit-bier',
    name: 'Wit Bier',
    img: `${BASE}/Wit Bier.png`,
    color: '#FDBA74',
    mugColor: '#f59e5c',
    fogColor: 'rgba(253,186,116,0.18)',
    ingredients: ['Unmalted Wheat', 'Coriander Seeds', 'Dried Orange Peel', 'Rolled Oats', 'Pilsner Malt'],
    bg: 'radial-gradient(ellipse at 40% 60%, #fdba74 0%, #ea7836 50%, #9a3412 100%)',
    accent: '#FDBA74',
    textColor: '#3b0d00',
    overlayEl: 'wit-bier',
  },
  {
    id: 'lager',
    name: 'Lager',
    img: `${BASE}/Lager.png`,
    color: '#FBBF24',
    mugColor: '#d4a017',
    fogColor: 'rgba(251,191,36,0.18)',
    ingredients: ['Pilsner Malt', 'Corn Adjunct', 'Floral Hops', 'Cold-Fermented Lager Yeast', 'Biscuit Notes'],
    bg: 'linear-gradient(135deg, #fbbf24 0%, #d97706 40%, #92400e 100%)',
    accent: '#FBBF24',
    textColor: '#3b1f00',
    overlayEl: 'lager',
  },
  {
    id: 'whisky-ale',
    name: 'Whisky Ale',
    img: `${BASE}/Whisky Ale.png`,
    color: '#92400e',
    mugColor: '#7c2d12',
    fogColor: 'rgba(120,53,15,0.35)',
    ingredients: ['Charred Oak Chips', 'Crystal Malt', 'Smoked Barley', 'Dark Caramel', 'Campfire Spice'],
    bg: 'radial-gradient(ellipse at 30% 70%, #78350f 0%, #451a03 60%, #1c0a00 100%)',
    accent: '#D97706',
    textColor: '#fde68a',
    overlayEl: 'whisky-ale',
  },
  {
    id: 'nitro-stout',
    name: 'Nitro Stout',
    img: `${BASE}/Nitro Stout.png`,
    color: '#1c1917',
    mugColor: '#0c0a09',
    fogColor: 'rgba(41,37,36,0.6)',
    ingredients: ['Roasted Barley', 'Chocolate Malt', 'Oats', 'Nitro Gas Blend', 'Vanilla Bean'],
    bg: 'radial-gradient(ellipse at 50% 30%, #292524 0%, #1c1917 50%, #0c0a09 100%)',
    accent: '#a8a29e',
    textColor: '#f5f5f4',
    overlayEl: 'nitro-stout',
  },
  {
    id: 'ipa',
    name: 'IPA',
    img: `${BASE}/IPA.png`,
    color: '#166534',
    mugColor: '#14532d',
    fogColor: 'rgba(22,101,52,0.2)',
    ingredients: ['Columbus Hops', 'Centennial Hops', 'Pine Resin', 'Ruby Grapefruit Zest', 'Pale Malt'],
    bg: 'radial-gradient(ellipse at 65% 35%, #166534 0%, #14532d 45%, #052e16 80%, #be123c 100%)',
    accent: '#4ade80',
    textColor: '#f0fdf4',
    overlayEl: 'ipa',
  },
  {
    id: 'mead',
    name: 'Mead',
    img: `${BASE}/Mead.png`,
    color: '#D97706',
    mugColor: '#b45309',
    fogColor: 'rgba(217,119,6,0.2)',
    ingredients: ['Local Wildflower Honey', 'Wild Herbs', 'Rose Petals', 'Lemon Balm', 'Spring Water'],
    bg: 'radial-gradient(ellipse at 50% 40%, #fbbf24 0%, #d97706 40%, #92400e 80%, #451a03 100%)',
    accent: '#fbbf24',
    textColor: '#3b1f00',
    overlayEl: 'mead',
  },
  {
    id: 'specialty',
    name: 'Specialty',
    img: `${BASE}/Specialty.png`,
    color: '#701a75',
    mugColor: '#701a75',
    fogColor: 'rgba(112,26,117,0.3)',
    ingredients: ['Rotating Seasonal Fruits', 'Exotic Spices', 'Star Anise', 'Tart Berry Blend', 'Small-Batch Malts'],
    bg: 'linear-gradient(135deg, #701a75 0%, #be185d 50%, #9d174d 75%, #4a044e 100%)',
    accent: '#e879f9',
    textColor: '#fdf4ff',
    overlayEl: 'specialty',
  },
];

function BeerMug({ color, mugColor, fogColor, size = 280 }: { color: string; mugColor: string; fogColor: string; size?: number }) {
  const s = size;
  const h = s * 1.4;
  return (
    <svg width={s} height={h} viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}>
      {/* Mug body */}
      <path d="M40 60 L30 370 Q30 385 45 385 L235 385 Q250 385 250 370 L240 60 Z" fill={`${mugColor}cc`} />
      {/* Beer liquid */}
      <path d="M43 90 L33 370 Q33 382 45 382 L235 382 Q247 382 247 370 L237 90 Z" fill={color} />
      {/* Beer gradient overlay */}
      <path d="M43 90 L33 370 Q33 382 45 382 L235 382 Q247 382 247 370 L237 90 Z" fill="url(#beerGrad)" />
      {/* Foam */}
      <ellipse cx="140" cy="88" rx="100" ry="28" fill="rgba(255,252,245,0.95)" />
      <ellipse cx="100" cy="82" rx="28" ry="16" fill="rgba(255,252,245,0.85)" />
      <ellipse cx="180" cy="80" rx="22" ry="14" fill="rgba(255,252,245,0.8)" />
      <ellipse cx="140" cy="75" rx="15" ry="10" fill="rgba(255,255,255,0.9)" />
      {/* Glass body overlay (transparency) */}
      <path d="M40 60 L30 370 Q30 385 45 385 L235 385 Q250 385 250 370 L240 60 Z" fill="rgba(255,255,255,0.04)" />
      {/* Left highlight */}
      <path d="M55 80 L48 340" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />
      {/* Right shadow */}
      <path d="M230 80 L225 340" stroke="rgba(0,0,0,0.15)" strokeWidth="5" strokeLinecap="round" />
      {/* Handle */}
      <path d="M248 130 Q310 130 310 200 Q310 270 248 270" stroke={`${mugColor}dd`} strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M248 130 Q305 130 305 200 Q305 270 248 270" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* Top rim */}
      <ellipse cx="140" cy="60" rx="102" ry="20" fill={`${mugColor}bb`} />
      <ellipse cx="140" cy="60" rx="98" ry="16" fill="rgba(255,255,255,0.06)" />
      {/* Bubble details */}
      <circle cx="80" cy="200" r="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="110" cy="270" r="3" fill="rgba(255,255,255,0.1)" />
      <circle cx="160" cy="180" r="5" fill="rgba(255,255,255,0.08)" />
      <circle cx="195" cy="300" r="3" fill="rgba(255,255,255,0.1)" />
      <defs>
        <linearGradient id="beerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function BeerShowcase() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const mug = el.querySelector('.showcase-mug') as HTMLElement;
      const text = el.querySelector('.showcase-text') as HTMLElement;

      if (mug) { mug.style.opacity = '0'; mug.style.transform = i % 2 === 0 ? 'translateX(-80px)' : 'translateX(80px)'; }
      if (text) { text.style.opacity = '0'; text.style.transform = i % 2 === 0 ? 'translateX(80px)' : 'translateX(-80px)'; }

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (mug) { mug.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)'; mug.style.opacity = '1'; mug.style.transform = 'translateX(0)'; }
              if (text) { text.style.transition = 'opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s'; text.style.opacity = '1'; text.style.transform = 'translateX(0)'; }
            } else {
              if (mug) { mug.style.transition = 'none'; mug.style.opacity = '0'; mug.style.transform = i % 2 === 0 ? 'translateX(-80px)' : 'translateX(80px)'; }
              if (text) { text.style.transition = 'none'; text.style.opacity = '0'; text.style.transform = i % 2 === 0 ? 'translateX(80px)' : 'translateX(-80px)'; }
            }
          });
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative">
      {BEERS.map((beer, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={beer.id}
            id={`showcase-${beer.id}`}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: beer.bg }}
          >
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={beer.img}
                alt={beer.name}
                fill
                className="object-cover opacity-25 mix-blend-overlay"
                style={{ objectPosition: 'center' }}
              />
            </div>
            {/* Vignette */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

            {/* Content */}
            <div className={`relative z-10 flex w-full max-w-6xl mx-auto px-8 lg:px-16 items-center gap-12 lg:gap-24 ${isEven ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

              {/* Mug */}
              <div className="showcase-mug flex-shrink-0 flex items-center justify-center" style={{ filter: `drop-shadow(0 0 60px ${beer.fogColor})` }}>
                <BeerMug color={beer.color} mugColor={beer.mugColor} fogColor={beer.fogColor} size={260} />
              </div>

              {/* Text */}
              <div className="showcase-text flex flex-col max-w-lg">
                <span className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: beer.accent, opacity: 0.7 }}>
                  Daffy's Brewgarden
                </span>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                    fontWeight: 700,
                    color: beer.textColor,
                    lineHeight: 1.05,
                    textShadow: '0 4px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  {beer.name}
                </h2>
                <div className="h-px w-16 mb-6" style={{ background: beer.accent, opacity: 0.6 }} />
                <ul className="space-y-2">
                  {beer.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-3 text-base" style={{ color: beer.textColor, opacity: 0.85 }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: beer.accent }} />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');`}</style>
    </div>
  );
}