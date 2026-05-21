'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const pillars = [
  {
    number: '01',
    title: 'Discovery',
    body: 'Enter through an unassuming pastrami shop. Ring the bell. The refrigerator opens.',
  },
  {
    number: '02',
    title: 'Sensation',
    body: 'Every cocktail is a chapter in a story. Smoke, crystal, and sculpture — beyond the glass.',
  },
  {
    number: '03',
    title: 'Ritual',
    body: 'Our bartenders are authors. Each drink is composed, not merely mixed.',
  },
];

/**
 * About Section — "The Story"
 * Split layout: large quote + narrative text + 3 pillars
 */
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yQuote = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #070707 100%)' }}
    >
      {/* Background marble texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -60deg,
              rgba(255,255,255,0.15) 0px,
              rgba(255,255,255,0.08) 1px,
              transparent 1px,
              transparent 60px
            )`,
        }}
      />

      {/* Ambient emerald glow top-left */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(13,43,30,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* ── Label ── */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12 md:mb-20">
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
            <span className="label-text text-[0.6rem] text-[var(--gold)]">Our Story</span>
          </div>
        </AnimatedSection>

        {/* ── Main Split ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          {/* Left: Large italic quote */}
          <AnimatedSection direction="right" delay={100}>
            <motion.div style={{ y: yQuote }}>
              <blockquote
                className="font-display-italic text-[clamp(2rem,5vw,3.5rem)] text-[var(--text-primary)] leading-tight"
                style={{ lineHeight: 1.15 }}
              >
                &quot;Born behind a<br />
                <span className="gold-text">pastrami shop</span>
                <br />on Carrer del Parlament.&quot;
              </blockquote>
              <div className="h-px w-24 bg-[rgba(201,168,76,0.3)] mt-8 mb-6" />
              <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed max-w-xs">
                — Giacomo Giannotti, Founder
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Right: Narrative */}
          <AnimatedSection direction="left" delay={200}>
            <motion.div style={{ y: yImage }} className="space-y-6">
              <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9]">
                Daffy&apos;s Brewgarden was conceived as an act of deliberate mystery. In a world where
                everything is visible, we chose to hide. Not from you — but for you.
              </p>
              <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9]">
                The entrance is a refrigerator door. The bar is a cathedral of carved wood and
                Carrara marble. Every cocktail is a performance, engineered in our subterranean lab
                from ingredients most chefs haven&apos;t heard of.
              </p>
              <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9]">
                We believe a bar should make you feel something. Not just drunk.
              </p>

              {/* Accent stat row */}
              <div className="flex flex-wrap gap-8 pt-4">
                {[
                  { n: '#1', label: 'World\'s Best Bar' },
                  { n: '48+', label: 'Original Cocktails' },
                  { n: '0', label: 'Waste Policy' },
                ].map((s) => (
                  <div key={s.n}>
                    <p className="font-display text-2xl text-[var(--gold)]">{s.n}</p>
                    <p className="label-text text-[0.6rem] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Gold divider */}
        <AnimatedSection>
          <div className="gold-divider mb-20" />
        </AnimatedSection>

        {/* ── Three Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <AnimatedSection key={p.number} delay={i * 120} direction="up">
              <div className="group border border-[rgba(201,168,76,0.08)] p-8 hover:border-[rgba(201,168,76,0.25)] transition-all duration-500 relative overflow-hidden">
                {/* Hover reveal glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)' }}
                />
                <p className="font-display text-5xl text-[rgba(201,168,76,0.15)] mb-6 leading-none">{p.number}</p>
                <h3 className="font-display text-xl text-[var(--text-primary)] mb-3">{p.title}</h3>
                <p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">{p.body}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
