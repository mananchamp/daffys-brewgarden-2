'use client';

import { useState } from 'react';
import CocktailCard from '@/components/ui/CocktailCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CTAButton from '@/components/ui/CTAButton';
import cocktailsData from '@/data/cocktails.json';

/**
 * Cocktails Section — "The Art"
 * 6-card responsive grid with 3D flip cards
 */
export default function Cocktails() {
  const [activeTab, setActiveTab] = useState<'cocktails' | 'food'>('cocktails');

  // Data for Food items (From our Tandoor menu)
  const foodData = [
    {
      id: 'food-mutton-rogan',
      name: 'MUTTON ROGAN JOSH',
      tagline: 'Slow-cooked perfection',
      notes: ['Tender Mutton', 'Kashmiri Chillies', 'Aromatic Spices'],
      story: 'A signature delicacy, slow-braised to achieve a melt-in-the-mouth texture with deep, robust flavors.',
      badge: 'TANDOOR',
      color: '#8b0000',
      image: '/mutton_rogan_premium.webp'
    },
    {
      id: 'food-mutton-seekh',
      name: 'MAKHMALI SEEKH KEBAB',
      tagline: 'Silken mutton delicacy',
      notes: ['Minced Mutton', 'Fresh Coriander', 'Secret Spices'],
      story: 'Finely minced mutton infused with aromatic herbs, skewered and roasted to a velvety finish.',
      badge: 'TANDOOR',
      color: '#8b4513',
      image: '/food_mutton_seekh.webp'
    },
    {
      id: 'food-tandoori-chicken',
      name: "DAFFY'S TANDOORI CHICKEN",
      tagline: 'Our signature roast',
      notes: ['Charred Ends', 'Smoked Paprika', 'Hung Curd'],
      story: 'Marinated in our house-special blend and roasted in the clay oven for an unforgettable smoky char.',
      badge: 'SIGNATURE',
      color: '#d2691e',
      image: '/food_tandoori_chicken.webp'
    },
    {
      id: 'food-paneer-butter',
      name: 'PANEER BUTTER MASALA',
      tagline: 'Rich & creamy indulgence',
      notes: ['Fresh Cottage Cheese', 'Tomato Butter Gravy', 'Dried Fenugreek'],
      story: 'Cubes of fresh paneer simmered in a luscious, velvety tomato and butter emulsion.',
      badge: 'VEGETARIAN',
      color: '#ff8c00',
      image: '/food_paneer_butter.webp'
    },
    {
      id: 'food-chandni-mushroom',
      name: 'CHANDNI MUSHROOM',
      tagline: 'Stuffed with cheese & nuts',
      notes: ['Button Mushrooms', 'Cream Cheese', 'Toasted Cashews'],
      story: 'Delicate mushrooms generously stuffed with a rich blend of cheese and nuts, finished with a gentle char.',
      badge: 'VEGETARIAN',
      color: '#d3d3d3',
      image: '/food_chandni_mushroom.webp'
    },
    {
      id: 'food-ajwaini-fish',
      name: 'AJWAINI TANDOORI FISH',
      tagline: 'Carom seed infused catch',
      notes: ['Fresh Fish Tikka', 'Carom Seeds', 'Mustard Oil'],
      story: 'Premium fish chunks marinated in a pungent mustard oil and carom seed blend, seared perfectly.',
      badge: 'SEAFOOD',
      color: '#ff4500',
      image: '/food_ajwaini_fish.webp'
    }
  ];

  const currentData = activeTab === 'cocktails' ? cocktailsData : foodData;

  return (
    <section
      id="cocktails"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #070707 0%, #050505 50%, #070707 100%)' }}
    >
      {/* Ambient gold top */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />
      {/* Ambient emerald bottom */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(13,43,30,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <AnimatedSection className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
            <span className="label-text text-[0.6rem] text-[var(--gold)]">The Menu</span>
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
          </div>
          
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none mb-4 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span 
              onClick={() => setActiveTab('cocktails')}
              className={`cursor-pointer transition-all duration-300 ${
                activeTab === 'cocktails' 
                  ? 'text-[var(--text-primary)]' 
                  : 'font-display-italic gold-text opacity-50 hover:opacity-100'
              }`}
            >
              Cocktail
            </span>
            <span className="text-2xl md:text-4xl text-[var(--gold)] opacity-30 font-sans font-light hidden md:block">|</span>
            <span 
              onClick={() => setActiveTab('food')}
              className={`cursor-pointer transition-all duration-300 ${
                activeTab === 'food' 
                  ? 'text-[var(--text-primary)]' 
                  : 'font-display-italic gold-text opacity-50 hover:opacity-100'
              }`}
            >
              Food
            </span>
          </h2>
          
          <p className="text-sm text-[var(--text-muted)] font-sans max-w-sm mx-auto leading-relaxed mt-4">
            {activeTab === 'cocktails' 
              ? 'Each drink is a chapter. Hover the cards to read the story within.' 
              : 'Our culinary offerings. Awaiting input for dishes and photos.'}
          </p>
        </AnimatedSection>

        {/* ── Card Grid ── */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {currentData.map((item, i) => (
              <CocktailCard key={item.id} cocktail={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <AnimatedSection className="text-center">
          <CTAButton href="#reservation" variant="outline" size="md" id="cocktails-cta-btn">
            {activeTab === 'cocktails' ? 'View Full Drink Menu' : 'View Full Food Menu'}
          </CTAButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
