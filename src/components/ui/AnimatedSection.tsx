'use client';

import { useRef, useEffect, type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

/**
 * AnimatedSection: Wraps content in an intersection-observer scroll reveal.
 * Uses CSS transitions for GPU-accelerated performance (no layout thrash).
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      case 'none': return 'none';
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state
    el.style.opacity = '0';
    el.style.transform = getInitialTransform();
    el.style.transition = `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = '0';
            el.style.transform = getInitialTransform();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
