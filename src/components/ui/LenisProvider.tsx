'use client';

import { useEffect, useRef } from 'react';

/**
 * LenisProvider: Initializes @studio-freight/lenis for silky smooth scrolling.
 * Mounted once at the app level. Uses RAF for updating scroll position.
 */
export default function LenisProvider() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let raf: number;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;

      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      const onRaf = (time: number) => {
        lenisRef.current?.raf(time);
        raf = requestAnimationFrame(onRaf);
      };
      raf = requestAnimationFrame(onRaf);
    };

    initLenis();

    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
    };
  }, []);

  return null;
}
