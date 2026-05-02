'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

/**
 * GlassCard: Frosted glass container with optional hover lift + glow.
 * Uses backdrop-filter blur for the glass effect.
 */
export default function GlassCard({
  children,
  className = '',
  hover = false,
  glow = false,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`glass-card rounded-sm relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={
        hover
          ? {
              y: isHovered ? -6 : 0,
              boxShadow: isHovered
                ? glow
                  ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.15)'
                  : '0 20px 60px rgba(0,0,0,0.5)'
                : '0 4px 24px rgba(0,0,0,0.3)',
            }
          : {}
      }
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Inner shimmer border */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          background: isHovered && glow
            ? 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)'
            : 'transparent',
          transition: 'background 0.35s ease',
        }}
      />
      {children}
    </motion.div>
  );
}
