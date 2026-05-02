import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: "Daffy's Brewgarden | A Sensory Experience",
  description:
    "A clandestine cocktail sanctuary hidden behind a pastrami shop. Experimental cocktails. Immersive atmosphere. Unforgettable experiences.",
  keywords: ["speakeasy", "cocktail bar", "luxury", "experimental cocktails", "hidden bar"],
  openGraph: {
    title: "Daffy's Brewgarden",
    description: "Not all bars are easy to find.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {/* Film grain overlay for texture */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
