'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiquidLegacyPreview from '@/app/liquid-legacy-preview/LiquidLegacyPreview';
import About from '@/components/sections/About';

// Lazy-load non-critical client components
const CursorEffect = dynamic(() => import('@/components/ui/CursorEffect'), { ssr: false });
const LenisProvider = dynamic(() => import('@/components/ui/LenisProvider'), { ssr: false });

// Lazy-load below-fold sections to reduce initial JS bundle
const Cocktails = dynamic(() => import('@/components/sections/Cocktails'));
const Experience = dynamic(() => import('@/components/sections/Experience'));
const Reviews = dynamic(() => import('@/components/sections/Reviews'));
const Reservation = dynamic(() => import('@/components/sections/Reservation'));

export default function Home() {
  return (
    <>
      {/* Global experience providers */}
      <LenisProvider />
      <CursorEffect />

      {/* Layout */}
      <Navbar />

      <main>
        <LiquidLegacyPreview />
        <About />
        <Cocktails />
        <Experience />
        <Reviews />
        <Reservation />
      </main>

      <Footer />
    </>
  );
}
