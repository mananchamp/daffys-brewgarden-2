'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'The Bar', href: '#cocktails' },
  { label: 'Experience', href: '#experience' },
  { label: 'The Lab', href: '#lab' },
];

/**
 * Navbar: Transparent on hero → solid dark on scroll.
 * Mobile: hamburger opens a full-screen dark drawer.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      setIsScrolled(y > 80);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        animate={{
          backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5, 0)',
          borderBottomColor: isScrolled ? 'rgba(201, 168, 76, 0.12)' : 'rgba(201, 168, 76, 0)',
          borderBottomWidth: '1px',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ borderBottomStyle: 'solid' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group cursor-none">
          <div className="flex flex-col items-start">
            <span
              className="font-display text-sm tracking-[0.35em] uppercase text-[var(--gold)]"
              style={{ lineHeight: 1, letterSpacing: '0.3em' }}
            >
              Daffy's
            </span>
            <span
              className="font-display text-[0.6rem] tracking-[0.55em] uppercase text-[var(--text-muted)]"
              style={{ lineHeight: 1.4 }}
            >
              Brewgarden
            </span>
          </div>
          {/* Small decorative line */}
          <div className="w-6 h-px bg-[var(--gold)] opacity-40 group-hover:w-10 transition-all duration-300" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="label-text text-[0.65rem] hover:text-[var(--gold)] transition-colors duration-200 cursor-none"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <CTAButton href="#reservation" variant="outline" size="sm" id="nav-reservation-btn">
            Reserve a Table
          </CTAButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px bg-[var(--gold)]"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-4 h-px bg-[var(--gold)]"
            animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px bg-[var(--gold)]"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <motion.div
        className="fixed inset-0 z-40 bg-[var(--bg-void)] flex flex-col items-center justify-center gap-10 md:hidden"
        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 40px)' }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          clipPath: menuOpen
            ? 'circle(150% at calc(100% - 48px) 40px)'
            : 'circle(0% at calc(100% - 48px) 40px)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="font-display text-4xl text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors cursor-none py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
            transition={{ delay: menuOpen ? i * 0.08 + 0.2 : 0 }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <CTAButton href="#reservation" variant="primary" size="md" id="mobile-reservation-btn">
            Reserve a Table
          </CTAButton>
        </motion.div>
      </motion.div>
    </>
  );
}
