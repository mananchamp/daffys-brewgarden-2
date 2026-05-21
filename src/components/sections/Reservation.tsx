'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CTAButton from '@/components/ui/CTAButton';

/**
 * Reservation Section — "The Invitation"
 * Premium minimal form with floating labels, spotlight ambience.
 * Submit triggers door-crack confirmation animation.
 */
export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', guests: '2', date: '', note: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase = `
    w-full bg-transparent border-b border-[rgba(201,168,76,0.2)] py-3 px-0
    text-sm text-[var(--text-primary)] font-sans
    focus:outline-none focus:border-[var(--gold)]
    transition-colors duration-300
    placeholder-transparent cursor-none
  `;

  const fields = [
    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Your Name' },
    { id: 'guests', label: 'Number of Guests', type: 'number', placeholder: 'Guests', min: '1', max: '20' },
    { id: 'date', label: 'Preferred Date', type: 'date', placeholder: 'Date' },
  ];

  return (
    <section
      id="reservation"
      className="relative py-20 md:py-56 px-6 md:px-12 overflow-hidden min-h-screen flex items-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0d0a05 0%, #050505 60%)' }}
    >
      {/* Soft spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      {/* Subtle horizontal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* ── Left: Copy ── */}
          <AnimatedSection direction="right">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
              <span className="label-text text-[0.6rem] text-[var(--gold)]">Reservation</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--text-primary)] leading-none mb-6">
              Join the<br />
              <span className="font-display-italic gold-text">Experience</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-sans leading-[1.9] mb-8 max-w-sm">
              Seats are limited. The door is real. The experience is singular.
              Reserve your place in the story.
            </p>

            {/* Info cards */}
            <div className="space-y-4">
              {[
                { label: 'Location', value: 'Indiranagar’s 100 ft. Road, Bengaluru' },
                { label: 'Hours', value: 'Tue – Sun · 6PM – 2AM' },
                { label: 'Dress Code', value: 'Smart casual. Be comfortable in mystery.' },
              ].map((info) => (
                <div key={info.label} className="flex gap-4">
                  <span className="label-text text-[0.6rem] text-[var(--gold)] w-20 flex-shrink-0 pt-0.5">
                    {info.label}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── Right: Form ── */}
          <AnimatedSection direction="left" delay={150}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  {fields.map((field) => (
                    <div key={field.id} className="relative">
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        onFocus={() => setFocused(field.id)}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                        required
                        {...(field.min ? { min: field.min } : {})}
                        {...(field.max ? { max: field.max } : {})}
                        style={{ colorScheme: 'dark' }}
                      />
                      <label
                        htmlFor={field.id}
                        className="absolute left-0 transition-all duration-200 font-sans pointer-events-none"
                        style={{
                          top: focused === field.id || form[field.id as keyof typeof form]
                            ? '-16px' : '12px',
                          fontSize: focused === field.id || form[field.id as keyof typeof form]
                            ? '0.6rem' : '0.8rem',
                          letterSpacing: focused === field.id || form[field.id as keyof typeof form]
                            ? '0.15em' : '0',
                          textTransform: 'uppercase',
                          color: focused === field.id ? 'var(--gold)' : 'var(--text-faint)',
                        }}
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}

                  {/* Note */}
                  <div className="relative">
                    <textarea
                      id="note"
                      placeholder="Special requests"
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      onFocus={() => setFocused('note')}
                      onBlur={() => setFocused(null)}
                      rows={2}
                      className={`${inputBase} resize-none`}
                    />
                    <label
                      htmlFor="note"
                      className="absolute left-0 transition-all duration-200 font-sans pointer-events-none"
                      style={{
                        top: focused === 'note' || form.note ? '-16px' : '12px',
                        fontSize: focused === 'note' || form.note ? '0.6rem' : '0.8rem',
                        letterSpacing: focused === 'note' || form.note ? '0.15em' : '0',
                        textTransform: 'uppercase',
                        color: focused === 'note' ? 'var(--gold)' : 'var(--text-faint)',
                      }}
                    >
                      Special Requests
                    </label>
                  </div>

                  <CTAButton variant="primary" size="lg" id="reservation-submit-btn">
                    Reserve My Table
                  </CTAButton>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  className="flex flex-col items-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Door crack animation */}
                  <div className="relative mb-8">
                    <svg width="60" height="90" viewBox="0 0 60 90" fill="none"
                      style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.5))' }}>
                      <path d="M6 82 V38 Q6 8 30 8 Q54 8 54 38 V82 Z"
                        stroke="#c9a84c" strokeWidth="1" fill="rgba(201,168,76,0.05)" />
                      {/* Door opening line */}
                      <motion.line
                        x1="30" y1="8" x2="30" y2="82"
                        stroke="#c9a84c" strokeWidth="0.5" opacity={0.4}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      <circle cx="30" cy="52" r="3" stroke="#c9a84c" strokeWidth="1" fill="none" />
                    </svg>
                    {/* Glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.2), transparent)' }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <p className="label-text text-[0.6rem] text-[var(--gold)] mb-4">Reservation Confirmed</p>
                  <h3 className="font-display text-3xl text-[var(--text-primary)] mb-4">
                    The door awaits, {form.name || 'guest'}.
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed max-w-xs">
                    We&apos;ve sent the details to your email. Arrive with curiosity. Leave your expectations at the pastrami shop.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
