'use client';

import { useEffect, useRef } from 'react';

export default function BeerLoadingScreen({ progress, visible }: { progress: number; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const waveOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      waveOffsetRef.current += 0.03;
      const off = waveOffsetRef.current;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#0a0805';
      ctx.fillRect(0, 0, W, H);

      const fillFraction = Math.max(0, Math.min(1, progress / 100));
      const liquidTop = H * (1 - fillFraction);

      if (fillFraction > 0.01) {
        // Wave path
        const waveH = 18;
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(0, liquidTop + waveH * Math.sin(off));

        for (let x = 0; x <= W; x += 4) {
          const y = liquidTop + waveH * Math.sin(off + x * 0.012) + (waveH * 0.5) * Math.sin(off * 1.3 + x * 0.008);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        // Beer gradient
        const grad = ctx.createLinearGradient(0, liquidTop, 0, H);
        grad.addColorStop(0, 'rgba(240, 180, 60, 0.92)');
        grad.addColorStop(0.4, 'rgba(201, 140, 40, 0.96)');
        grad.addColorStop(1, 'rgba(120, 70, 10, 1)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Foam layer
        const foamH = Math.min(40, 8 + fillFraction * 35);
        ctx.beginPath();
        ctx.moveTo(0, H);
        ctx.lineTo(0, liquidTop + waveH * Math.sin(off));
        for (let x = 0; x <= W; x += 4) {
          const y = liquidTop + waveH * Math.sin(off + x * 0.012) + (waveH * 0.5) * Math.sin(off * 1.3 + x * 0.008);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        // Foam gradient (top of liquid)
        const foamGrad = ctx.createLinearGradient(0, liquidTop - foamH, 0, liquidTop + 20);
        foamGrad.addColorStop(0, 'rgba(255,255,255,0)');
        foamGrad.addColorStop(0.3, 'rgba(255,252,245,0.85)');
        foamGrad.addColorStop(1, 'rgba(240,220,160,0.1)');
        ctx.fillStyle = foamGrad;
        ctx.fill();

        // Micro-bubbles
        ctx.save();
        ctx.globalAlpha = 0.25;
        for (let b = 0; b < 30; b++) {
          const bx = (Math.sin(off * 0.7 + b * 137.5) * 0.5 + 0.5) * W;
          const by = liquidTop + 20 + ((off * 30 * (0.3 + (b % 5) * 0.15) + b * 40) % (H - liquidTop - 20));
          const br = 1.5 + (b % 4) * 0.8;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,230,150,0.6)`;
          ctx.fill();
        }
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [progress]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Text overlay — always on top */}
      <div className="relative z-10 flex flex-col items-center select-none" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,1)' }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
            lineHeight: 1,
          }}
        >
          Daffy's Brewgarden
        </h1>
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.04em',
          }}
        >
          {progress}%
        </p>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', textTransform: 'uppercase' }}>
          Crafted, not rushed.
        </p>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');`}</style>
    </div>
  );
}
