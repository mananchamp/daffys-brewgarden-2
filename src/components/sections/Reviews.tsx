'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const REVIEWS = [
  {
    id: 1,
    name: 'S Menon',
    rating: 5,
    text: "Nice ambience, excellent food and neat choices of brewed beer and service as well. Do remind them about the Zomato offer… we had to get it corrected.",
    platform: "District by Zomato"
  },
  {
    id: 2,
    name: 'Rajeev Krishnapillai',
    rating: 5,
    text: "One small improvement… even with reservations the wait time was more than 30 min despite many people got seated after us.",
    platform: "District by Zomato"
  },
  {
    id: 3,
    name: 'Prahlad Kaulgud',
    rating: 5,
    text: "Good choice of beers, location accessible on Metro line… Neer Dosa with Kerala curry was just finger licking delicious.",
    platform: "District by Zomato"
  },
  {
    id: 4,
    name: 'Shreya Saxena',
    rating: 5,
    text: "Great place on a budget… Christy helped us… one of the sweetest servers I interacted with. Great time.",
    platform: "District by Zomato"
  },
  {
    id: 5,
    name: 'Mithun',
    rating: 5,
    text: "Superb place lowkey and very charming. Good brews and the food needs special mention. Definitely going back again.",
    platform: "District by Zomato"
  },
  {
    id: 6,
    name: 'Mahima Verma',
    rating: 5,
    text: "Kristy was very warm and welcoming… good food and drinks at reasonable prices.",
    platform: "District by Zomato"
  },
  {
    id: 7,
    name: 'Krishnanunni Payyappilly',
    rating: 5,
    text: "Great place, good beer, reasonable prices. Try the whiskey beer… it tastes like bacon.",
    platform: "District by Zomato"
  },
  {
    id: 8,
    name: 'Sang',
    rating: 5,
    text: "The food was great as well as the drinks. Had a great time there. A must visit place.",
    platform: "District by Zomato"
  },
  {
    id: 9,
    name: 'Bharath Kashyap',
    rating: 5,
    text: "Seems to be an undiscovered little gem. Good food, retro music, and amazing staff… really sweet and attentive.",
    platform: "Restaurant Guru"
  }
];

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);

  // We duplicate the reviews array to create a seamless infinite marquee
  const marqueeItems = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)' }}
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20 mix-blend-screen"
        style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col xl:flex-row items-center gap-12">
        {/* Left Column: Title */}
        <div className="w-full xl:w-1/3 flex-shrink-0">
          <AnimatedSection className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#d4af37] opacity-70" />
              <span
                className="label-text text-[0.6rem] uppercase tracking-[0.3em]"
                style={{ color: '#d4af37' }}
              >
                Guest Experiences
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] text-white leading-none mb-4 uppercase tracking-tighter">
              Loved by <br />
              <span
                className="font-display-italic text-[#d4af37]"
                style={{
                  textShadow: '0 0 40px rgba(212,175,55,0.3)',
                }}
              >
                Our Patrons.
              </span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Right Column: Marquee Container */}
        <div className="w-full xl:w-2/3 relative overflow-hidden flex py-4 pb-12">
          {/* Left/Right Fade Masks for smooth entry/exit */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
            {marqueeItems.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[320px] md:w-[400px] flex-shrink-0 relative group p-8 rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm transition-all duration-500 hover:border-[#d4af37]/50 hover:bg-[#111] shadow-2xl"
              >
                {/* Quote Icon */}
                <div className="mb-6 text-[#d4af37] opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Review Text */}
                <p className="text-[var(--text-primary)] font-sans text-sm md:text-base leading-relaxed mb-8 h-28 overflow-hidden text-ellipsis">
                  "{review.text}"
                </p>

                {/* Bottom Section */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-white font-display text-lg mb-1">{review.name}</h4>
                    <p className="text-[var(--text-muted)] text-xs font-mono">{review.platform}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
