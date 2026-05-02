'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

/**
 * Hero Section — "The Secret Door"
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typed, setTyped] = useState('');
  const [doorOpen, setDoorOpen] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = 'Not all bars are easy to find.';

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setCursorVisible(false), 2000);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!cursorVisible) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, [cursorVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animId: number;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; gold: boolean;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.05,
        gold: Math.random() > 0.7,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createRadialGradient(w / 2, h * 0.55, 0, w / 2, h * 0.55, Math.min(w, h) * 0.55);
      grad.addColorStop(0, 'rgba(30, 15, 5, 0.0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201, 168, 76, ${p.alpha})`
          : `rgba(245, 240, 232, ${p.alpha * 0.5})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleEnter = () => {
    setDoorOpen(true);
    setTimeout(() => {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #1a0d05 0%, #050505 60%)' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="h-px w-12 bg-[rgba(201,168,76,0.5)]" />
          <span className="label-text text-[0.6rem] text-[var(--gold)]">Est. 2024 — Indiranagar’s 100 ft. Road, Bengaluru</span>
          <div className="h-px w-12 bg-[rgba(201,168,76,0.5)]" />
        </motion.div>

        <motion.h1
          className="font-display text-[clamp(3.5rem,10vw,9rem)] text-[var(--text-primary)] leading-none mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Daffy's
        </motion.h1>
        <motion.p
          className="font-display-italic text-[clamp(1rem,3vw,2rem)] gold-shimmer mb-12 tracking-[0.15em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Brewgarden
        </motion.p>

        <motion.div
          className="relative mb-12 cursor-none"
          animate={doorOpen ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <DoorSVG />
        </motion.div>

        <motion.div
          className="h-8 mb-8 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="font-display-italic text-[clamp(0.9rem,2vw,1.25rem)] text-[var(--text-muted)]">
            {typed}
            <span
              className="inline-block w-0.5 h-4 bg-[var(--gold)] ml-0.5 align-middle"
              style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <CTAButton
            onClick={handleEnter}
            variant="primary"
            size="lg"
            id="hero-enter-btn"
          >
            <span>Enter Paradiso</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CTAButton>
        </motion.div>

        <motion.div
          className="absolute bottom-[-35vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="label-text text-[0.55rem]">Scroll to discover</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[var(--gold)] to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DoorSVG() {
  return (
    <svg
      width="80"
      height="120"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.5)) drop-shadow(0 0 40px rgba(201,168,76,0.2))',
      }}
    >
      <path
        d="M8 110 V50 Q8 10 40 10 Q72 10 72 50 V110 Z"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="rgba(5,5,5,0.9)"
      />
      <path
        d="M16 108 V53 Q16 22 40 22 Q64 22 64 53 V108 Z"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.8"
        fill="rgba(201,168,76,0.03)"
      />
      <circle cx="40" cy="75" r="4" stroke="#c9a84c" strokeWidth="1" fill="none" />
      <path d="M38 79 L38 88 L42 88 L42 79" stroke="#c9a84c" strokeWidth="1" fill="rgba(201,168,76,0.15)" />
      <circle cx="40" cy="10" r="2" fill="#c9a84c" opacity="0.6" />
      <path d="M4 110 H76" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" />
      <path d="M0 114 H80" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
      <ellipse cx="40" cy="80" rx="18" ry="22" fill="rgba(212,105,42,0.05)" />
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1;1.01;1"
        dur="3s"
        repeatCount="indefinite"
        additive="sum"
      />
    </svg>
  );
}
