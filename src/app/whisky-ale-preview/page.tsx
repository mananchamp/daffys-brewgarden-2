'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import Cocktails from '@/components/sections/Cocktails';
import Experience from '@/components/sections/Experience';
import Reviews from '@/components/sections/Reviews';
import Reservation from '@/components/sections/Reservation';
import WhiskyAleHero from '@/app/whisky-ale-preview/WhiskyAleHero';

const CursorEffect = dynamic(() => import('@/components/ui/CursorEffect'), { ssr: false });
const LenisProvider = dynamic(() => import('@/components/ui/LenisProvider'), { ssr: false });

export default function WhiskyAlePreviewPage() {
  return (
    <>
      <LenisProvider />
      <CursorEffect />

      <Navbar />

      <main>
        <WhiskyAleHero />
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
