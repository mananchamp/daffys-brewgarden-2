'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const WHISKY_ALE = {
  id: 'whisky-ale',
  name: 'WHISKY ALE',
  glass: `${BASE}/glass_whisky_ale_v2.png`,
  bgImage: `${BASE}/bg_whisky_ale_generated.png`,
  tint: '#78350F',
  notes: 'Charred Oak & Campfire Smoke',
  ingredients: ['Charred Oak', 'Glowing Embers', 'Smoke Wisps'],
  composition: 'premium-whisky',
};

export default function WhiskyAleHero() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- LOADING SCREEN (same amber beer animation as the original) ---
  useEffect(() => {
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
    const bubbles: { x: number; y: number; size: number; speedY: number; speedX: number }[] = [];
    for (let i = 0; i < 80; i++) {
      bubbles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedY: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
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

      const getWaveY = (x: number) =>
        liquidTop +
        Math.sin(x * 0.005 + offset) * 20 +
        Math.sin(x * 0.012 - offset * 1.5) * 15 +
        Math.cos(x * 0.008 + offset * 2.5) * 25;

      const isMobile = width < 768;
      const fontSize = isMobile ? (width < 400 ? 60 : 80) : 250;
      const titleFontSize = isMobile ? 16 : 40;
      const titleY = height / 2 - fontSize / 2 - (isMobile ? 20 : 40);

      ctx.font = `900 ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillText(`${Math.floor(progress)}%`, width / 2, height / 2);

      ctx.font = `700 ${titleFontSize}px "Playfair Display", serif`;
      if ('letterSpacing' in ctx) (ctx as any).letterSpacing = '8px';
      ctx.fillText(`DAFFY'S BREWGARDEN`, width / 2, titleY);
      if ('letterSpacing' in ctx) (ctx as any).letterSpacing = '0px';

      // Beer stream
      if (progress < 100) {
        const streamBaseX = width * 0.4 + Math.sin(offset * 0.5) * 100;
        ctx.beginPath();
        for (let y = 0; y <= getWaveY(streamBaseX); y += 10) {
          const streamX = streamBaseX + Math.sin(y * 0.01 - offset * 5) * 15 + Math.cos(y * 0.02 - offset * 3) * 5;
          const streamWidth = 10 + Math.sin(y * 0.05 - offset * 10) * 8 + Math.random() * 6;
          if (y === 0) ctx.moveTo(streamX - streamWidth / 2, y);
          else ctx.lineTo(streamX - streamWidth / 2, y);
        }
        for (let y = getWaveY(streamBaseX); y >= 0; y -= 10) {
          const streamX = streamBaseX + Math.sin(y * 0.01 - offset * 5) * 15 + Math.cos(y * 0.02 - offset * 3) * 5;
          const streamWidth = 10 + Math.sin(y * 0.05 - offset * 10) * 8 + Math.random() * 6;
          ctx.lineTo(streamX + streamWidth / 2, y);
        }
        ctx.closePath();
        ctx.fillStyle = '#eab308';
        ctx.fill();

        for (let i = 0; i < 8; i++) {
          const dy = (offset * 200 + i * 50) % getWaveY(streamBaseX);
          const dx = streamBaseX + Math.sin(dy * 0.01 - offset * 5) * 15 + (Math.random() - 0.5) * 40;
          ctx.beginPath();
          ctx.arc(dx, dy, Math.random() * 4 + 1, 0, Math.PI * 2);
          ctx.fillStyle = '#fde047';
          ctx.fill();
        }
      }

      const liquidPath = new Path2D();
      liquidPath.moveTo(0, height);
      liquidPath.lineTo(0, getWaveY(0));
      for (let x = 0; x <= width; x += 4) liquidPath.lineTo(x, getWaveY(x));
      liquidPath.lineTo(width, height);
      liquidPath.closePath();

      const beerGrad = ctx.createLinearGradient(0, liquidTop - 50, 0, height);
      beerGrad.addColorStop(0, '#eab308');
      beerGrad.addColorStop(0.5, '#b45309');
      beerGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = beerGrad;
      ctx.fill(liquidPath);

      ctx.save();
      ctx.clip(liquidPath);
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.x += b.speedX;
        if (b.y < liquidTop - 50) { b.y = height + 10; b.x = Math.random() * width; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });
      ctx.restore();

      const foamHeight = fillPercentage * 50 + 20;
      const foamPath = new Path2D();
      foamPath.moveTo(0, getWaveY(0));
      for (let x = 0; x <= width; x += 4) foamPath.lineTo(x, getWaveY(x));
      foamPath.lineTo(width, getWaveY(width) - foamHeight + Math.sin(width * 0.02 + offset * 0.8) * 15);
      for (let x = width; x >= 0; x -= 10)
        foamPath.lineTo(x, getWaveY(x) - foamHeight + Math.sin(x * 0.02 + offset * 0.8) * 15 + Math.cos(x * 0.05 + offset) * 10);
      foamPath.closePath();

      const foamGrad = ctx.createLinearGradient(0, liquidTop - foamHeight - 20, 0, liquidTop + 20);
      foamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      foamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
      ctx.fillStyle = foamGrad;
      ctx.fill(foamPath);

      ctx.save();
      ctx.clip(foamPath);
      for (let i = 0; i < 150; i++) {
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

      ctx.save();
      ctx.clip(liquidPath);
      ctx.font = `900 ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#d4af37';
      ctx.fillText(`${Math.floor(progress)}%`, width / 2, height / 2);
      ctx.font = `700 ${titleFontSize}px "Playfair Display", serif`;
      if ('letterSpacing' in ctx) (ctx as any).letterSpacing = '8px';
      ctx.fillText(`DAFFY'S BREWGARDEN`, width / 2, titleY);
      if ('letterSpacing' in ctx) (ctx as any).letterSpacing = '0px';
      ctx.restore();

      if (progress < 100) {
        progress += 0.5;
        setLoadingProgress(Math.floor(progress));
        animationFrameId = requestAnimationFrame(draw);
      } else {
        setTimeout(() => setIsLoaded(true), 1000);
      }
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  // --- Minimal GSAP setup (no scrolling needed for single beer) ---
  useEffect(() => {
    if (!isLoaded) return;
    // Just a subtle entrance animation for the single beer
    const ctx = gsap.context(() => {
      gsap.fromTo('.wa-glass', { opacity: 0, scale: 1.08, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' });
      gsap.fromTo('.wa-content', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 });

      // Scroll-driven parallax for the bg
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set('.wa-bg-img', { y: `${self.progress * 60}px` });
        },
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

      {/* HERO — full viewport single-beer showcase */}
      {isLoaded && (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="wa-bg-img absolute inset-0 will-change-transform">
              <Image
                src={WHISKY_ALE.bgImage}
                alt=""
                fill
                priority
                className="object-cover scale-110"
                style={{ filter: 'brightness(0.82) saturate(1.1) contrast(1.05)' }}
              />
            </div>

            {/* Warm vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* Whisky smoke effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f97316]/30 via-transparent to-transparent opacity-50 mix-blend-screen animate-pulse pointer-events-none" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-70">
              <div className="absolute bottom-[10%] left-[35%] w-64 h-96 bg-[#e5e7eb]/10 blur-[60px] rounded-[100%] animate-wa-smoke-1" />
              <div className="absolute bottom-[10%] right-[35%] w-72 h-96 bg-[#e5e7eb]/10 blur-[70px] rounded-[100%] animate-wa-smoke-2" />
            </div>
          </div>

          {/* Glass — left-anchored on desktop */}
          <div className="wa-glass absolute inset-0 flex items-end justify-center md:items-center md:justify-start md:pl-[8%] z-20 pointer-events-none pb-8 md:pb-0" style={{ opacity: 0 }}>
            <div className="relative w-[70vw] md:w-[38vw] h-[52vh] md:h-[80vh]">
              <Image src={WHISKY_ALE.glass} alt={WHISKY_ALE.name} fill className="object-contain" />
              {/* Ground shadow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/40 blur-xl rounded-full" />
            </div>
          </div>

          {/* Text content — right-anchored on desktop */}
          <div
            className="wa-content absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-end pb-56 px-6 md:flex-row md:items-center md:justify-end md:pb-0 md:pr-[10%] md:pl-[48%]"
            style={{ opacity: 0 }}
          >
            <div className="w-full max-w-xl text-center md:text-left overflow-hidden">
              <span className="block text-[9px] md:text-xs font-bold tracking-[0.5em] uppercase mb-3 md:mb-6 text-[#d4af37]">
                {WHISKY_ALE.notes}
              </span>
              <h1
                className="leading-none tracking-tight md:tracking-tighter font-black mb-4 md:mb-10 uppercase text-white"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  textShadow: '0 10px 30px rgba(0,0,0,0.9)',
                  fontSize: 'clamp(2.5rem, 9vw, 5rem)',
                }}
              >
                {WHISKY_ALE.name}
              </h1>
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
                {WHISKY_ALE.ingredients.map((ing, idx) => (
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

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
            <div className="w-px h-10 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
            <span className="text-[8px] tracking-[0.4em] uppercase text-[#d4af37]/50 font-bold">Scroll</span>
          </div>
        </div>
      )}

      {/* Detailed Whisky Ale info strip — appears below the hero */}
      {isLoaded && (
        <section
          className="relative py-24 px-6 md:px-12 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #050505 0%, #0d0805 50%, #050505 100%)' }}
        >
          {/* Warm ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top, rgba(120,53,15,0.25) 0%, transparent 70%)' }}
          />

          <div className="max-w-4xl mx-auto">
            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-8 bg-[#d4af37] opacity-50" />
              <span className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-[#d4af37]">The Brew</span>
              <div className="h-px flex-1 bg-[#d4af37] opacity-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Left: story copy */}
              <div className="space-y-6">
                <h2
                  className="font-black uppercase leading-tight text-white"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                  }}
                >
                  Charred Oak &<br />
                  <span style={{ color: '#d4af37' }}>Campfire Smoke</span>
                </h2>
                <p className="text-sm text-[rgba(255,255,255,0.5)] font-sans leading-[1.9]">
                  Daffy&apos;s Whisky Ale is a bold marriage of two worlds — the smooth warmth of single-malt whisky and
                  the rich, toasty depth of a craft ale. Each pour carries notes of charred oak, glowing embers, and
                  a whisper of campfire smoke that lingers long after the last sip.
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.5)] font-sans leading-[1.9]">
                  Aged in ex-bourbon barrels sourced from the Scottish Highlands, this is not merely a beer — it is an
                  experience bottled in amber.
                </p>

                {/* Tasting stats */}
                <div className="flex gap-10 pt-4 border-t border-[#d4af37]/10">
                  {[
                    { n: '7.2%', label: 'ABV' },
                    { n: '28 IBU', label: 'Bitterness' },
                    { n: 'Amber', label: 'Colour' },
                  ].map((s) => (
                    <div key={s.n}>
                      <p className="font-black text-2xl text-[#d4af37]" style={{ fontFamily: 'Playfair Display, serif' }}>{s.n}</p>
                      <p className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-[rgba(255,255,255,0.4)] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: ingredient chips vertical */}
              <div className="space-y-4">
                <p className="text-[0.6rem] font-bold tracking-[0.5em] uppercase text-[#d4af37] mb-6">Taste Notes</p>
                {[
                  { label: 'Charred Oak', desc: 'Deep barrel character from bourbon-seasoned casks' },
                  { label: 'Glowing Embers', desc: 'Toasted malt backbone with a warm, smoky finish' },
                  { label: 'Smoke Wisps', desc: 'Delicate peat smoke woven through every sip' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 p-5 border border-[#d4af37]/08 hover:border-[#d4af37]/25 transition-all duration-500 group"
                    style={{ background: 'rgba(120,53,15,0.04)' }}
                  >
                    <div className="w-px self-stretch bg-[#d4af37]/30 group-hover:bg-[#d4af37]/60 transition-colors duration-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-1">{item.label}</p>
                      <p className="text-xs text-[rgba(255,255,255,0.4)] font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
        body { background: #050505; margin: 0; overflow-x: hidden; }
        canvas { display: block; }

        @keyframes wa-smoke-1 {
          0%   { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20%  { opacity: 0.5; }
          50%  { transform: translateY(-30vh) scale(1.5) translateX(-5vw); opacity: 0.8; }
          80%  { opacity: 0.3; }
          100% { transform: translateY(-60vh) scale(2) translateX(5vw); opacity: 0; }
        }
        @keyframes wa-smoke-2 {
          0%   { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20%  { opacity: 0.4; }
          50%  { transform: translateY(-40vh) scale(1.2) translateX(5vw); opacity: 0.7; }
          80%  { opacity: 0.2; }
          100% { transform: translateY(-80vh) scale(1.8) translateX(-5vw); opacity: 0; }
        }
        .animate-wa-smoke-1 { animation: wa-smoke-1 12s infinite ease-in-out; }
        .animate-wa-smoke-2 { animation: wa-smoke-2 15s infinite ease-in-out 2s; }
      `}</style>
    </div>
  );
}
