'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const footerLinks = {
  explore: [
    { label: 'Our Story', href: '#about' },
    { label: 'The Bar', href: '#cocktails' },
    { label: 'Experience', href: '#experience' },
    { label: 'The Lab', href: '#lab' },
    { label: 'Reserve', href: '#reservation' },
  ],
  connect: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative py-20 px-6 md:px-12 border-t border-[rgba(201,168,76,0.1)]"
      style={{ background: 'linear-gradient(180deg, var(--bg-void) 0%, #020202 100%)' }}
    >
      {/* Top ambient gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      <AnimatedSection>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div>
              <p className="font-display text-xl text-[var(--gold)] tracking-[0.25em] uppercase">
                Daffy's
              </p>
              <p className="label-text text-[0.6rem] tracking-[0.5em] text-[var(--text-faint)]">
                Brewgarden
              </p>
            </div>
            <div className="h-px w-12 bg-[rgba(201,168,76,0.3)]" />
            <p className="text-xs text-[var(--text-faint)] font-sans leading-relaxed max-w-[200px]">
              A clandestine experience. Hidden in plain sight since 2024.
            </p>
            <p className="label-text text-[0.6rem]">
              Est. 2024 · Indiranagar’s 100 ft. Road, Bengaluru
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <p className="label-text text-[0.6rem] text-[var(--gold)] mb-5">Explore</p>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-[var(--text-muted)] font-sans hover:text-[var(--gold)] transition-colors duration-200 cursor-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="label-text text-[0.6rem] text-[var(--gold)] mb-5">Connect</p>
            <ul className="space-y-3 mb-8">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-[var(--text-muted)] font-sans hover:text-[var(--gold)] transition-colors duration-200 cursor-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="label-text text-[0.6rem] text-[var(--gold)] mb-3">Hours</p>
            <p className="text-xs text-[var(--text-faint)] font-sans leading-relaxed">
              Tue – Sun<br />
              6:00 PM — 2:00 AM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[rgba(201,168,76,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label-text text-[0.55rem]">
            © 2024 Daffy's Brewgarden. All rights reserved.
          </p>
          <p className="label-text text-[0.55rem] italic font-[var(--font-playfair)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            "Not all bars are easy to find."
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
