'use client';

import { type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

/**
 * CTAButton: Luxury glow button with magnetic hover effect.
 * Primary: gold border + subtle fill
 * Outline: transparent with gold border
 * Ghost: no border, text-only with underline
 */
export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  id,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-xs tracking-[0.2em]',
    md: 'px-8 py-3.5 text-xs tracking-[0.25em]',
    lg: 'px-12 py-5 text-sm tracking-[0.3em]',
  };

  const variantClasses = {
    primary: 'border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black',
    outline: 'border border-[rgba(201,168,76,0.4)] text-[var(--text-primary)] hover:border-[var(--gold)] hover:text-[var(--gold)]',
    ghost: 'text-[var(--text-muted)] hover:text-[var(--gold)] underline-offset-4 hover:underline',
  };

  const base = `
    inline-flex items-center justify-center gap-2
    font-sans uppercase
    transition-all duration-300 ease-out
    glow-btn cursor-none relative
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const content = (
    <motion.span
      className={base}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <a href={href} id={id} className="inline-block">{content}</a>;
  }

  return (
    <button id={id} onClick={onClick} className="inline-block bg-transparent border-none p-0">
      {content}
    </button>
  );
}
