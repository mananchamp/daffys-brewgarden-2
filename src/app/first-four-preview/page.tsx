import type { Metadata } from 'next';
import FirstFourBeers from './FirstFourBeers';

export const metadata: Metadata = {
  title: "First Four Beers — Preview | Daffy's Brewgarden",
  description: 'Preview of the first four beers animation: Hefeweizen, Wit Bier, Lager & Whisky Ale.',
};

export default function FirstFourPreviewPage() {
  return <FirstFourBeers />;
}
