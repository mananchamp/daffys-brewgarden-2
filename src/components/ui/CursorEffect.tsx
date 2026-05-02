'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor: small gold dot + ring follower
 * Uses requestAnimationFrame for smooth 60fps tracking
 */
export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    // Smooth ring follows with lerp
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    // Scale up on interactive elements
    const onEnterLink = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
        dotRef.current.style.opacity = '0.6';
      }
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
        ringRef.current.style.borderColor = 'rgba(201, 168, 76, 0.7)';
      }
    };

    const onLeaveLink = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        ringRef.current.style.borderColor = 'rgba(201, 168, 76, 0.4)';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    
    // Check for touch capability
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
    }

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="cursor-follower" />
    </>
  );
}
