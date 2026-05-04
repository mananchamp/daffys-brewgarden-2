'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
  ScrollTrigger.clearScrollMemory?.("manual");
}

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
    composition: 'premium-hefeweizen'
  },
  {
    id: 'wit-bier',
    name: 'WIT BIER',
    glass: `${BASE}/glass_wit_bier_nobg.png`,
    bgImage: `${BASE}/bg_wit_bier.png`,
    tint: '#FDBA74',
    notes: 'Orange Peel & Coriander',
    ingredients: ['Orange Peel', 'Crushed Coriander', 'Creamy Oats'],
  },
  {
    id: 'lager',
    name: 'LAGER',
    glass: `${BASE}/glass_lager_new.png`,
    bgImage: `${BASE}/bg_lager_generated.png`,
    tint: '#d4af37',
    notes: 'Clean Corn, Biscuit Malt, & Floral Hops',
    ingredients: ['Yellow Flowers & Hops', 'Biscuit Malt', 'Clean Corn'],
    composition: 'premium-lager'
  },
  {
    id: 'whisky-ale',
    name: 'WHISKY ALE',
    glass: `${BASE}/glass_whisky_ale_v2.png`,
    bgImage: `${BASE}/bg_whisky_ale_generated.png`,
    tint: '#78350F',
    notes: 'Charred Oak & Campfire Smoke',
    ingredients: ['Charred Oak', 'Glowing Embers', 'Smoke Wisps'],
    composition: 'premium-whisky'
  },
  {
    id: 'nitro-stout',
    name: 'NITRO STOUT',
    glass: `${BASE}/glass_nitro_stout_nobg.png`,
    bgImage: `${BASE}/bg_nitro_stout_generated.png`,
    tint: '#292524',
    notes: 'Roasted Coffee & Cocoa',
    ingredients: ['Coffee Beans', 'Raw Cocoa', 'Nitro Head'],
    composition: 'nitro-stout'
  },
  {
    id: 'ipa',
    name: 'IPA',
    glass: `${BASE}/glass_ipa_nobg.png`,
    bgImage: `${BASE}/bg_ipa.png`,
    tint: '#166534',
    notes: 'Pine & Grapefruit Zest',
    ingredients: ['Pine Needles', 'Ruby Grapefruit', 'Resin Drops'],
  },
  {
    id: 'mead',
    name: 'MEAD',
    glass: `${BASE}/glass_mead_nobg.png`,
    bgImage: `${BASE}/bg_mead_generated.png`,
    tint: '#D97706',
    notes: 'Local Honey & Wild Herbs',
    ingredients: ['Local Honey', 'Wildflowers', 'Green Herbs'],
    composition: 'premium-mead'
  },
  {
    id: 'specialty',
    name: 'SPECIALTY',
    glass: `${BASE}/glass_specialty_nobg.png`,
    bgImage: `${BASE}/bg_specialty_generated.png`,
    tint: '#BE185D',
    notes: 'Rotating / Fruity & Spiced',
    ingredients: ['Mixed Berries', 'Exotic Spices', 'Star Anise'],
    composition: 'premium-specialty'
  },
];

export default function LiquidLegacyPreview() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- LOADING SCREEN ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }

    let animationFrameId: number;
    let progress = 0;
    const canvas = loadingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let offset = 0;
    
    // Bubble state for liquid
    const bubbles: {x: number, y: number, size: number, speedY: number, speedX: number}[] = [];
    for(let i=0; i<80; i++) {
        bubbles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.8
        });
    }

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const fillPercentage = progress / 100;
      const fillHeight = fillPercentage * height;
      const liquidTop = height - fillHeight;
      offset += 0.05;

      const getWaveY = (x: number) => {
        return liquidTop + Math.sin(x * 0.005 + offset) * 20 + Math.sin(x * 0.012 - offset * 1.5) * 15 + Math.cos(x * 0.008 + offset * 2.5) * 25;
      };

      // Base Text (dim)
      const isMobile = width < 768;
      const fontSize = isMobile ? (width < 400 ? 60 : 80) : 250;
      const titleFontSize = isMobile ? 16 : 40;
      const titleY = height / 2 - fontSize/2 - (isMobile ? 20 : 40);
      
      ctx.font = `900 ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillText(`${Math.floor(progress)}%`, width / 2, height / 2);
      
      ctx.font = `700 ${titleFontSize}px "Playfair Display", serif`;
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '8px';
      }
      ctx.fillText(`DAFFY'S BREWGARDEN`, width / 2, titleY);
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '0px';
      }

      // Stream of Beer (Non-laminar, goes behind the liquid)
      if (progress < 100) {
        const streamBaseX = width * 0.4 + Math.sin(offset * 0.5) * 100;
        
        ctx.beginPath();
        for (let y = 0; y <= getWaveY(streamBaseX); y += 10) {
            const streamX = streamBaseX + Math.sin(y * 0.01 - offset * 5) * 15 + Math.cos(y * 0.02 - offset * 3) * 5;
            const streamWidth = 10 + Math.sin(y * 0.05 - offset * 10) * 8 + Math.random() * 6;
            if (y === 0) ctx.moveTo(streamX - streamWidth/2, y);
            else ctx.lineTo(streamX - streamWidth/2, y);
        }
        for (let y = getWaveY(streamBaseX); y >= 0; y -= 10) {
            const streamX = streamBaseX + Math.sin(y * 0.01 - offset * 5) * 15 + Math.cos(y * 0.02 - offset * 3) * 5;
            const streamWidth = 10 + Math.sin(y * 0.05 - offset * 10) * 8 + Math.random() * 6;
            ctx.lineTo(streamX + streamWidth/2, y);
        }
        ctx.closePath();
        ctx.fillStyle = '#eab308';
        ctx.fill();

        // Splashes / droplets
        for(let i=0; i<8; i++) {
            const dy = (offset * 200 + i * 50) % getWaveY(streamBaseX);
            const dx = streamBaseX + Math.sin(dy * 0.01 - offset * 5) * 15 + (Math.random() - 0.5) * 40;
            ctx.beginPath();
            ctx.arc(dx, dy, Math.random() * 4 + 1, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.fill();
        }
      }

      // Liquid Path
      const liquidPath = new Path2D();
      liquidPath.moveTo(0, height);
      liquidPath.lineTo(0, getWaveY(0));
      for (let x = 0; x <= width; x += 4) {
        liquidPath.lineTo(x, getWaveY(x));
      }
      liquidPath.lineTo(width, height);
      liquidPath.closePath();

      // Liquid Gradient
      const beerGrad = ctx.createLinearGradient(0, liquidTop - 50, 0, height);
      beerGrad.addColorStop(0, '#eab308'); 
      beerGrad.addColorStop(0.5, '#b45309'); 
      beerGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = beerGrad; 
      ctx.fill(liquidPath);

      // Bubbles inside liquid
      ctx.save();
      ctx.clip(liquidPath);
      bubbles.forEach(b => {
          b.y -= b.speedY;
          b.x += b.speedX;
          if (b.y < liquidTop - 50) {
              b.y = height + 10;
              b.x = Math.random() * width;
          }
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
      });
      ctx.restore();

      // Foam Path - aligned to liquid wave
      const foamHeight = (fillPercentage * 50) + 20;
      const foamPath = new Path2D();
      foamPath.moveTo(0, getWaveY(0));
      // Bottom edge perfectly traces the liquid wave
      for (let x = 0; x <= width; x += 4) {
        foamPath.lineTo(x, getWaveY(x));
      }
      // Right edge
      foamPath.lineTo(width, getWaveY(width) - foamHeight + Math.sin(width * 0.02 + offset * 0.8) * 15);
      // Top edge
      for (let x = width; x >= 0; x -= 10) {
        foamPath.lineTo(x, getWaveY(x) - foamHeight + Math.sin(x * 0.02 + offset * 0.8) * 15 + Math.cos(x * 0.05 + offset) * 10);
      }
      foamPath.closePath();
      
      const foamGrad = ctx.createLinearGradient(0, liquidTop - foamHeight - 20, 0, liquidTop + 20);
      foamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      foamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
      ctx.fillStyle = foamGrad;
      ctx.fill(foamPath);

      // Foam Texture (bubbles inside foam)
      ctx.save();
      ctx.clip(foamPath);
      for(let i=0; i<150; i++) {
         const bx = (i * 137.5) % width;
         const by = getWaveY(bx) - ((i * 93.1) % (foamHeight + 10));
         const bSize = (i * 17.3) % 5 + 1;
         ctx.beginPath();
         ctx.arc(bx, by, bSize, 0, Math.PI * 2);
         ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
         ctx.lineWidth = 1;
         ctx.stroke();
      }
      ctx.restore();

      // Filled Text Masked by Liquid
      ctx.save();
      ctx.clip(liquidPath);
      ctx.font = `900 ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.fillText(`${Math.floor(progress)}%`, width / 2, height / 2);
      
      ctx.font = `700 ${titleFontSize}px "Playfair Display", serif`;
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '8px';
      }
      ctx.fillText(`DAFFY'S BREWGARDEN`, width / 2, titleY);
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '0px';
      }
      ctx.restore();

      if (progress < 100) { 
        progress += 0.5; 
        setLoadingProgress(Math.floor(progress)); 
        animationFrameId = requestAnimationFrame(draw); 
      }
      else { 
        setTimeout(() => setIsLoaded(true), 1000); 
      }
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  // --- GSAP ORCHESTRATION ---
  useEffect(() => {
    if (!isLoaded) return;
    
    // Unlock scrolling and force scroll to top right after content renders
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory?.();
    
    const ctx = gsap.context(() => {
      const sections = BEERS.length;
      let mm = gsap.matchMedia();

      // Mobile Animation (no horizontal panning)
      mm.add("(max-width: 767px)", () => {
        gsap.set('.master-glass-viewport', { xPercent: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top top', end: `+=${(sections - 1) * 100}%`, pin: true, scrub: 1.2 } });
        
        BEERS.forEach((beer, i) => {
          if (i === 0) return;
          const start = i - 1;
          
          tl.to(`.bg-layer-${i-1}`, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, start);
          tl.fromTo(`.bg-layer-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power1.inOut' }, start + 0.3);
          
          tl.to(`.glass-${i-1}`, { opacity: 0, scale: 0.8, y: -20, duration: 0.5, ease: 'power2.in' }, start);
          tl.fromTo(`.glass-${i}`, { opacity: 0, scale: 1.1, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);
          
          tl.to(`.content-${i-1}`, { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' }, start);
          tl.fromTo(`.content-${i}`, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);
        });
      });

      // Desktop Animation (with horizontal panning)
      mm.add("(min-width: 768px)", () => {
        gsap.set('.master-glass-viewport', { xPercent: -22 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top top', end: `+=${(sections - 1) * 100}%`, pin: true, scrub: 1.2 } });
        
        BEERS.forEach((beer, i) => {
          if (i === 0) return;
          const start = i - 1;
          const isEven = i % 2 === 0;
          
          tl.to(`.bg-layer-${i-1}`, { opacity: 0, xPercent: isEven ? 10 : -10, duration: 0.7, ease: 'power1.inOut' }, start);
          tl.fromTo(`.bg-layer-${i}`, { opacity: 0, xPercent: isEven ? -10 : 10 }, { opacity: 1, xPercent: 0, duration: 0.7, ease: 'power1.inOut' }, start + 0.3);
          
          tl.to('.master-glass-viewport', { xPercent: isEven ? -22 : 22, duration: 1, ease: 'power2.inOut' }, start);
          
          tl.to(`.glass-${i-1}`, { opacity: 0, scale: 0.8, y: -20, duration: 0.5, ease: 'power2.in' }, start);
          tl.fromTo(`.glass-${i}`, { opacity: 0, scale: 1.1, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);
          
          tl.to(`.content-${i-1}`, { opacity: 0, y: -40, duration: 0.5, ease: 'power2.in' }, start);
          tl.fromTo(`.content-${i}`, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + 0.5);
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div className="relative bg-[#050505] text-white overflow-hidden font-sans selection:bg-[#d4af37]/30">
      
      {/* LOADING SCREEN */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[2000] bg-[#050505]">
          <canvas ref={loadingCanvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      )}

      {/* PINNED EXPERIENCE */}
      {isLoaded && (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
          
          <div className="absolute inset-0 z-0 bg-[#050505] w-full h-full">
            {BEERS.map((beer, i) => (
              <div key={`bg-${beer.id}`} className={`bg-layer-${i} absolute inset-0 w-full h-full opacity-0`} style={{ opacity: i === 0 ? 1 : 0 }}>
                
                {/* All beers use their bgImage — premium beers get lighter filter to let the photo breathe */}
                <Image
                  src={beer.bgImage}
                  alt=""
                  fill
                  priority={i < 4}
                  className="object-cover transition-transform duration-1000 scale-105"
                  style={{
                    filter: ['premium-lager', 'premium-whisky', 'nitro-stout', 'premium-specialty', 'premium-mead', 'premium-hefeweizen'].includes(beer.composition!)
                      ? 'brightness(0.82) saturate(1.1) contrast(1.05)'
                      : 'brightness(0.6) saturate(1.2)'
                  }}
                />

                {/* Vignette: Premium beers get a warm edge, others get dark cinematic fade */}
                {['premium-lager', 'premium-whisky', 'premium-specialty', 'premium-mead', 'premium-hefeweizen'].includes(beer.composition!) ? (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                ) : beer.composition === 'nitro-stout' ? (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
                )}

                {beer.composition === 'premium-whisky' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f97316]/30 via-transparent to-transparent opacity-50 mix-blend-screen animate-pulse pointer-events-none" />
                    {/* Procedural Smoke Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-70">
                      <div className="absolute bottom-[10%] left-[35%] w-64 h-96 bg-[#e5e7eb]/10 blur-[60px] rounded-[100%] animate-smoke-1" />
                      <div className="absolute bottom-[10%] right-[35%] w-72 h-96 bg-[#e5e7eb]/10 blur-[70px] rounded-[100%] animate-smoke-2" />
                    </div>
                  </>
                )}

                {beer.composition === 'nitro-stout' && (
                  <>
                    {/* Deep espresso radial glow from center */}
                    <div className="absolute inset-0 bg-radial-nitro pointer-events-none mix-blend-screen opacity-40" />
                    {/* Nitro cascade shimmer — rising micro-bubble effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
                      <div className="absolute bottom-0 left-[20%] w-1 h-full bg-white/5 blur-[2px] animate-nitro-1" />
                      <div className="absolute bottom-0 left-[40%] w-0.5 h-full bg-white/5 blur-[2px] animate-nitro-2" />
                      <div className="absolute bottom-0 left-[60%] w-1 h-full bg-white/5 blur-[2px] animate-nitro-3" />
                      <div className="absolute bottom-0 left-[75%] w-0.5 h-full bg-white/5 blur-[2px] animate-nitro-1" />
                    </div>
                  </>
                )}

                {beer.composition === 'premium-specialty' && (
                  <>
                    {/* Berry-magenta radial bloom from center-right */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30" style={{ background: 'radial-gradient(ellipse 70% 60% at 65% 55%, #be185d 0%, transparent 70%)' }} />
                    {/* Subtle violet shimmer wisps */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
                      <div className="absolute bottom-[15%] left-[30%] w-72 h-80 bg-[#701a75]/20 blur-[70px] rounded-[100%] animate-berry-1" />
                      <div className="absolute top-[20%] right-[25%] w-56 h-64 bg-[#be185d]/15 blur-[60px] rounded-[100%] animate-berry-2" />
                    </div>
                  </>
                )}

                {beer.composition === 'premium-mead' && (
                  <>
                    {/* Golden sunlight rays from top */}
                    <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-[#fde047]/20 via-[#d97706]/10 to-transparent mix-blend-screen pointer-events-none" />
                    {/* Subtle golden floating dust/pollen */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-60">
                      <div className="absolute top-[30%] left-[20%] w-64 h-64 bg-[#fef08a]/20 blur-[80px] rounded-[100%] animate-pollen-1" />
                      <div className="absolute bottom-[40%] right-[30%] w-72 h-72 bg-[#f59e0b]/15 blur-[90px] rounded-[100%] animate-pollen-2" />
                    </div>
                  </>
                )}

                {beer.composition === 'premium-hefeweizen' && (
                  <>
                    {/* Warm amber swirl glow from center */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-25" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #fbbf24 0%, transparent 70%)' }} />
                    {/* Floating wheat dust particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
                      <div className="absolute top-[25%] left-[25%] w-56 h-56 bg-[#fde047]/20 blur-[70px] rounded-[100%] animate-wheat-1" />
                      <div className="absolute bottom-[30%] right-[20%] w-64 h-64 bg-[#f59e0b]/15 blur-[80px] rounded-[100%] animate-wheat-2" />
                    </div>
                  </>
                )}

                {/* Subtle tint on all except premium ones (already rich from photo) */}
                {!['premium-lager', 'premium-whisky', 'nitro-stout', 'premium-specialty', 'premium-mead', 'premium-hefeweizen'].includes(beer.composition!) && (
                  <div className="absolute inset-0 opacity-20 mix-blend-color" style={{ background: beer.tint }} />
                )}
              </div>
            ))}
          </div>

          {/* Glass layer — on mobile: top-anchored; on desktop: centered with horizontal GSAP pan */}
          <div className="absolute inset-0 flex items-start md:items-center justify-center z-20 pointer-events-none">
            <div className="master-glass-viewport relative w-[70vw] md:w-[45vw] h-[52vh] md:h-[80vh] flex items-center justify-center will-change-transform mt-[10vh] md:mt-0">
              {BEERS.map((beer, i) => (
                <div key={`glass-${beer.id}`} className={`glass-${i} absolute inset-0 flex items-center justify-center`} style={{ opacity: i === 0 ? 1 : 0 }}>
                  <div className="relative w-full h-full">
                    <Image src={beer.glass} alt={beer.name} fill className="object-contain" />
                    {['lager', 'whisky-ale'].includes(beer.id) && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/40 blur-xl rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 z-30 pointer-events-none">
            {BEERS.map((beer, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={`content-${beer.id}`}
                  className={`content-${i} absolute inset-0 opacity-0
                    flex flex-col items-center justify-end pb-[8vh]
                    md:grid md:grid-cols-2 md:items-center md:pb-0`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {isEven ? (
                    <>
                      <div className="hidden md:block"></div>
                      <div className="w-full px-5 md:pr-10 lg:pr-[15%] flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-40 relative">
                        <span className="block text-[9px] md:text-xs font-bold tracking-[0.5em] uppercase mb-3 md:mb-6 text-[#d4af37]">{beer.notes}</span>
                        <h2
                          className="leading-none tracking-tight md:tracking-tighter font-black mb-4 md:mb-8 uppercase text-white w-full"
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            textShadow: '0 10px 30px rgba(0,0,0,0.9)',
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                          } as React.CSSProperties}
                        >
                          {beer.name}
                        </h2>
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                          {beer.ingredients.map((ing, idx) => (
                            <div key={idx} className="px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-[#d4af37]/20 backdrop-blur-2xl bg-[#1a0f0a]/70 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-[#d4af37]/50 group cursor-default">
                              <span className="text-[8px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#d4af37]/90 group-hover:text-[#d4af37] transition-colors duration-300 whitespace-nowrap">{ing}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full px-5 md:pl-10 lg:pl-[15%] flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto z-40 relative">
                        <span className="block text-[9px] md:text-xs font-bold tracking-[0.5em] uppercase mb-3 md:mb-6 text-[#d4af37]">{beer.notes}</span>
                        <h2
                          className="leading-none tracking-tight md:tracking-tighter font-black mb-4 md:mb-8 uppercase text-white w-full"
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            textShadow: '0 10px 30px rgba(0,0,0,0.9)',
                            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                          } as React.CSSProperties}
                        >
                          {beer.name}
                        </h2>
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                          {beer.ingredients.map((ing, idx) => (
                            <div key={idx} className="px-3 md:px-6 py-1.5 md:py-2 rounded-full border border-[#d4af37]/20 backdrop-blur-2xl bg-[#1a0f0a]/70 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 hover:border-[#d4af37]/50 group cursor-default">
                              <span className="text-[8px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#d4af37]/90 group-hover:text-[#d4af37] transition-colors duration-300 whitespace-nowrap">{ing}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="hidden md:block"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Duplicate DAFFY'S BREWGARDEN header removed since we have the Navbar */}
          <div className="fixed right-6 md:right-16 top-1/2 -translate-y-1/2 h-48 md:h-64 w-px bg-white/10 z-[100]">
            <div id="scroll-progress" className="w-full bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ height: '0%' }} />
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
        body { background: #050505; margin: 0; overflow-x: hidden; }
        .font-serif { font-family: 'Playfair Display', serif; }
        canvas { display: block; }

        @keyframes smoke-1 {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20% { opacity: 0.5; }
          50% { transform: translateY(-30vh) scale(1.5) translateX(-5vw); opacity: 0.8; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-60vh) scale(2) translateX(5vw); opacity: 0; }
        }
        @keyframes smoke-2 {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20% { opacity: 0.4; }
          50% { transform: translateY(-40vh) scale(1.2) translateX(5vw); opacity: 0.7; }
          80% { opacity: 0.2; }
          100% { transform: translateY(-80vh) scale(1.8) translateX(-5vw); opacity: 0; }
        }
        .animate-smoke-1 {
          animation: smoke-1 12s infinite ease-in-out;
        }
        .animate-smoke-2 {
          animation: smoke-2 15s infinite ease-in-out 2s;
        }

        @keyframes nitro-rise-1 {
          0%   { transform: scaleY(0) translateY(0); opacity: 0; transform-origin: bottom; }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { transform: scaleY(1) translateY(-100%); opacity: 0; transform-origin: bottom; }
        }
        @keyframes nitro-rise-2 {
          0%   { transform: scaleY(0) translateY(0); opacity: 0; transform-origin: bottom; }
          15%  { opacity: 0.5; }
          85%  { opacity: 0.2; }
          100% { transform: scaleY(1) translateY(-100%); opacity: 0; transform-origin: bottom; }
        }
        @keyframes nitro-rise-3 {
          0%   { transform: scaleY(0) translateY(0); opacity: 0; transform-origin: bottom; }
          25%  { opacity: 0.7; }
          75%  { opacity: 0.2; }
          100% { transform: scaleY(1) translateY(-100%); opacity: 0; transform-origin: bottom; }
        }
        .animate-nitro-1 { animation: nitro-rise-1 8s infinite ease-in; }
        .animate-nitro-2 { animation: nitro-rise-2 11s infinite ease-in 2s; }
        .animate-nitro-3 { animation: nitro-rise-3 9s infinite ease-in 4s; }

        @keyframes berry-pulse-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          50% { transform: scale(1.15) translate(-3vw, -4vh); opacity: 0.8; }
        }
        @keyframes berry-pulse-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.2) translate(4vw, 3vh); opacity: 0.7; }
        }
        .animate-berry-1 { animation: berry-pulse-1 14s infinite ease-in-out; }
        .animate-berry-2 { animation: berry-pulse-2 18s infinite ease-in-out 3s; }

        @keyframes pollen-drift-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.2) translate(5vw, -5vh); opacity: 0.7; }
        }
        @keyframes pollen-drift-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          50% { transform: scale(1.1) translate(-4vw, -6vh); opacity: 0.6; }
        }
        .animate-pollen-1 { animation: pollen-drift-1 15s infinite ease-in-out; }
        .animate-pollen-2 { animation: pollen-drift-2 19s infinite ease-in-out 4s; }

        @keyframes wheat-float-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.15) translate(4vw, -3vh); opacity: 0.75; }
        }
        @keyframes wheat-float-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.35; }
          50% { transform: scale(1.1) translate(-3vw, 4vh); opacity: 0.65; }
        }
        .animate-wheat-1 { animation: wheat-float-1 13s infinite ease-in-out; }
        .animate-wheat-2 { animation: wheat-float-2 17s infinite ease-in-out 3s; }
      `}</style>
    </div>
  );
}
