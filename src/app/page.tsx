'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiquidLegacyPreview from '@/app/liquid-legacy-preview/LiquidLegacyPreview';
import About from '@/components/sections/About';
import Cocktails from '@/components/sections/Cocktails';
import Experience from '@/components/sections/Experience';
import Reviews from '@/components/sections/Reviews';
import Reservation from '@/components/sections/Reservation';

// Lazy-load non-critical client components
const CursorEffect = dynamic(() => import('@/components/ui/CursorEffect'), { ssr: false });
const LenisProvider = dynamic(() => import('@/components/ui/LenisProvider'), { ssr: false });

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
