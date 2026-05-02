'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const chapters = [
  {
    id: 'arrival',
    label: 'I. Arrival',
    title: 'The Refrigerator Door',
    description:
      'You find it between a neon sign and a stack of pastrami. A handle. A pull. Cool air. And then — the sound of jazz.',
    items: [
      { name: 'The Initiation', desc: 'Amaro, beeswax, smoked salt', price: '22' },
      { name: 'First Light', desc: 'Citrus vodka, chamomile, morning dew', price: '19' },
      { name: 'The Threshold', desc: 'Rye whiskey, walnut bitters, orange peel', price: '24' },
    ],
  },
  {
    id: 'descent',
    label: 'II. The Descent',
    title: 'Into the Warm Dark',
    description:
      'The stairs curve inward. Carved wood breathes around you. Carrara marble catches candlelight. You are somewhere else now.',
    items: [
      { name: 'Obsidian Hour', desc: 'Cold-brew rum, coconut, black sesame', price: '26' },
      { name: 'The Cave', desc: 'Aged Mezcal, mushroom tincture, pine', price: '28' },
      { name: 'Subterranea', desc: 'Earthy gin, truffle oil, sea salt foam', price: '30' },
    ],
  },
  {
    id: 'revelation',
    label: 'III. Revelation',
    title: 'The Golden Hours',
    description:
      'The night opens like a flower. Conversations bloom. Every sip unlocks a new layer of the cocktail — and of yourself.',
    items: [
      { name: 'Midnight Bloom', desc: 'Jasmine gin, elderflower, violet', price: '25' },
      { name: 'The Golden Veil', desc: '24-year Scotch, saffron, smoke crystal', price: '48' },
      { name: 'Marbled Siren', desc: 'Grappa, white peach, almond foam', price: '32' },
    ],
  },
  {
    id: 'farewell',
    label: 'IV. Farewell',
    title: 'The Last Pour',
    description:
      "Before you leave, one more. The bartender slides it across the marble without a word. You understand.",
    items: [
      { name: 'Nightcap Elegy', desc: 'Cognac, dark chocolate, tobacco leaf', price: '34' },
      { name: 'Last Words', desc: 'Aged Rum, espresso, vanilla char', price: '22' },
      { name: 'The Exit', desc: 'Champagne, rose, edible gold flake', price: '38' },
    ],
  },
];

/**
 * Experience Section — "The Journey"
 * Menu as narrative chapters. Tab-style navigation + prose + items.
 */
export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="experience"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #08060a 50%, #050505 100%)',
      }}
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201,168,76,0.3) 0%, transparent 50%),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
            <span className="label-text text-[0.6rem] text-[var(--gold)]">The Menu</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[var(--text-primary)] leading-none">
            A Journey in<br />
            <span className="font-display-italic gold-text">Four Chapters</span>
          </h2>
        </AnimatedSection>

        {/* ── Chapter Navigation ── */}
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-0 mb-16 border-b border-[rgba(201,168,76,0.12)]">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                id={`chapter-${ch.id}-btn`}
                onClick={() => setActive(i)}
                className={`label-text text-[0.65rem] px-6 py-4 transition-all duration-300 cursor-none relative
                  ${active === i ? 'text-[var(--gold)]' : 'text-[var(--text-faint)] hover:text-[var(--text-muted)]'}`}
              >
                {ch.label}
                {active === i && (
                  <motion.div
                    layoutId="chapter-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Chapter Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
          >
            {/* Left: Story */}
            <div>
              <p className="label-text text-[0.55rem] text-[var(--gold)] mb-4">
                Chapter {active + 1} of {chapters.length}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-6 leading-tight">
                {chapters[active].title}
              </h3>
              <div className="h-px w-16 bg-[rgba(201,168,76,0.3)] mb-8" />
              <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9] italic">
                {chapters[active].description}
              </p>

              {/* Roman numeral decorative */}
              <div
                className="mt-12 font-display text-[8rem] leading-none text-[rgba(201,168,76,0.04)] select-none"
              >
                {['I', 'II', 'III', 'IV'][active]}
              </div>
            </div>

            {/* Right: Menu items */}
            <div className="space-y-0">
              {chapters[active].items.map((item, i) => (
                <motion.div
                  key={item.name}
                  className="group py-6 border-b border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.2)] transition-all duration-300 flex items-start justify-between gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div>
                    <h4 className="font-display text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--gold)] transition-colors duration-300">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[var(--text-faint)] font-sans">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="font-display text-[var(--gold)] text-lg">€{item.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
