import type { Metadata } from 'next';
import NavLayout from './components/NavLayout';

export const metadata: Metadata = {
  title: 'StegCloak - Hide Secret Messages in Plain Text',
  description: 'A modern dark mode frontend for StegCloak, a pure JavaScript steganography library that hides secrets inside text by compressing and encrypting the message.',
  keywords: 'steganography, encryption, hidden messages, stegcloak, security, privacy',
  authors: [{ name: 'StegCloak Frontend' }],
  openGraph: {
    title: 'StegCloak - Hide Secret Messages in Plain Text',
    description: 'A modern dark mode frontend for StegCloak, a pure JavaScript steganography library that hides secrets inside text.',
    url: 'https://stegcloak.vercel.app',
    siteName: 'StegCloak Frontend',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return <NavLayout />;
}
