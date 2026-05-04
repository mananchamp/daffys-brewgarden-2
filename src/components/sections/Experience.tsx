'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const chapters = [
  {
    id: 'vats',
    label: 'From The Vats',
    title: 'Brewed Right Here.',
    description:
      'Every pint at Daffy\'s carries a story born in copper and patience. Our in-house microbrewery turns grain, hops, and Bengaluru water into something quietly extraordinary. The crowd comes back for a reason — and that reason is usually the Whiskey Beer.',
    items: [
      { name: 'Whiskey Beer', desc: 'House lager aged on whiskey-soaked oak chips — the signature that started it all', price: '420' },
      { name: 'Monsoon Witbier', desc: 'Unfiltered wheat ale with coriander seed & dried orange peel', price: '360' },
      { name: 'Dark Harvest Stout', desc: 'Full-bodied dry stout, notes of roasted barley, bittersweet cocoa & cold brew', price: '390' },
    ],
  },
  {
    id: 'plates',
    label: 'Local Plates',
    title: 'Pub Grub, Done Properly.',
    description:
      'Forget the usual suspects. The kitchen at Daffy\'s draws from the South — Kerala backyards, Coorg hillsides, coastal smoke pits. It\'s honest food, the kind that earns its seat beside a cold pint without apology.',
    items: [
      { name: 'Neer Dosa & Kerala Curry', desc: 'Lacy rice crepes with a slow-cooked coastal chicken curry, tempered in coconut oil', price: '320' },
      { name: 'Coorgi Chilli Pork', desc: 'Rustic hill-country pork tossed in Kodagu spice, ginger & vinegar — a Daffy\'s cult classic', price: '480' },
      { name: 'Brewery Smokehouse Platter', desc: 'Smoked meats, pickled vegetables & sourdough — built to share, gone before you plan to', price: '680' },
    ],
  },
  {
    id: 'deck',
    label: 'The Garden Deck',
    title: 'Under an Open Sky.',
    description:
      'The Garden Deck doesn\'t try to be a venue — it simply is one. Strung lights, breeze off the 100 ft. Road, retro vinyls drifting out from the bar. Time slows here. Conversations lengthen. Even the evenings seem reluctant to end.',
    items: [
      { name: 'Retro Vinyl Evenings', desc: 'Classic rock, Kannada soul & 70s Bollywood — curated, never algorithmic', price: '' },
      { name: 'Open-Sky Seating', desc: 'Shaded canopy tables with garden greenery — the Bengaluru evening doing the rest', price: '' },
      { name: 'Weekend Social Hours', desc: 'Live acoustic sets and weekend happy-hour pours from 4 PM onwards', price: '' },
    ],
  },
  {
    id: 'paws',
    label: 'Paws & Pints',
    title: 'Dogs Welcome. Always.',
    description:
      'Bring them along — no question about it. The Garden Deck at Daffy\'s has been a dog-friendly space since day one, and the regulars wouldn\'t have it any other way. Your furry companion gets water, shade, and all the attention they deserve. You get a cold pint. Everyone wins.',
    items: [
      { name: 'The Usual Suspects', desc: 'Golden retrievers, indie dogs & the occasional dachshund — our most loyal patrons', price: '' },
      { name: 'Shaded Garden Tables', desc: 'Ample space for leashes, lounging & a well-behaved snooze in the evening breeze', price: '' },
      { name: 'Pet-Friendly Sundays', desc: 'Join the weekly meetup — Bengaluru\'s dog lovers, cold brews & good company', price: '' },
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
            <span className="label-text text-[0.6rem] text-[var(--gold)]">The Experience</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[var(--text-primary)] leading-none">
            Four Reasons
            <br />
            <span className="font-display-italic gold-text">to Stay.</span>
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
                {active + 1} of {chapters.length}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-6 leading-tight">
                {chapters[active].title}
              </h3>
              <div className="h-px w-16 bg-[rgba(201,168,76,0.3)] mb-8" />
              <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9] italic">
                {chapters[active].description}
              </p>

              {/* Decorative glyph */}
              <div
                className="mt-12 font-display text-[8rem] leading-none text-[rgba(201,168,76,0.04)] select-none"
              >
                {['⌾', '✦', '❧', '⁜'][active]}
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
                  {item.price && (
                    <div className="flex-shrink-0">
                      <span className="font-display text-[var(--gold)] text-lg">₹{item.price}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
