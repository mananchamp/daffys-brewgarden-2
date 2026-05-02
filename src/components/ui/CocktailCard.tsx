'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Cocktail {
  id: string;
  name: string;
  tagline: string;
  notes: string[];
  story: string;
  badge: string;
  color: string;
  image: string;
}

interface CocktailCardProps {
  cocktail: Cocktail;
  index: number;
}

/**
 * CocktailCard: 3D flip card with luxury cocktail photography on the front.
 */
export default function CocktailCard({ cocktail, index }: CocktailCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-none"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1200px' }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 rounded-sm overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Image
            src={cocktail.image}
            alt={cocktail.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 50vw, 33vw"
            priority={index < 3}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 20%, ${cocktail.color}55 0%, transparent 65%)`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                rgba(0,0,0,0.92) 0%,
                rgba(0,0,0,0.55) 38%,
                rgba(0,0,0,0.10) 65%,
                transparent 100%
              )`,
            }}
          />

          <div className="absolute inset-0 rounded-sm border border-[rgba(201,168,76,0.18)]" />

          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-block px-2 py-1 border border-[rgba(201,168,76,0.45)] text-[var(--gold)]"
              style={{ fontSize: '0.58rem', letterSpacing: '0.22em', fontFamily: 'var(--font-inter)', textTransform: 'uppercase' }}
            >
              {cocktail.badge}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
            <h3
              className="font-display text-xl text-white mb-1 leading-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            >
              {cocktail.name}
            </h3>
            <p
              className="text-[0.72rem] mb-4 font-sans italic"
              style={{ color: 'rgba(245,240,232,0.65)' }}
            >
              {cocktail.tagline}
            </p>

            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-[rgba(201,168,76,0.25)]" />
              <span
                style={{ fontSize: '0.55rem', letterSpacing: '0.22em', fontFamily: 'var(--font-inter)', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}
              >
                hover to reveal
              </span>
              <div className="h-px flex-1 bg-[rgba(201,168,76,0.25)]" />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-sm flex flex-col justify-between p-6 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(155deg, #0e0e0e 0%, #141414 100%)',
          }}
        >
          <div
            className="absolute top-0 left-6 right-6 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
          />

          <div className="relative z-10">
            <span
              className="inline-block px-2 py-1 border border-[rgba(201,168,76,0.35)] text-[var(--gold)] mb-5"
              style={{ fontSize: '0.58rem', letterSpacing: '0.22em', fontFamily: 'var(--font-inter)', textTransform: 'uppercase' }}
            >
              {cocktail.badge}
            </span>

            <p
              className="mb-3"
              style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', fontFamily: 'var(--font-inter)' }}
            >
              Notes
            </p>
            <ul className="space-y-2">
              {cocktail.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'var(--gold)', opacity: 0.55 }}
                  />
                  <span
                    className="font-sans"
                    style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.55)', lineHeight: 1.55 }}
                  >
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <div className="h-px mb-5" style={{ background: 'rgba(201,168,76,0.12)' }} />
            <p
              className="font-sans italic mb-4"
              style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.75 }}
            >
              "{cocktail.story}"
            </p>
            <h3
              className="font-display text-lg"
              style={{ color: 'var(--gold)' }}
            >
              {cocktail.name}
            </h3>
          </div>

          <div
            className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${cocktail.color}55 50%)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
