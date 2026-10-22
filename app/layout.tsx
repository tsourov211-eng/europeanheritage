import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.europeanheritage.co.uk')
  ),
  title: 'European Heritage | Porcelain, Ceramic, Stone & Natural Wood',
  description: 'Porcelain, ceramic, stone and natural wood for considered homes.',
  applicationName: 'European Heritage',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/logo.png?v=2', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/logo.png?v=2',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'European Heritage',
    title: 'European Heritage | Porcelain, Ceramic, Stone & Natural Wood',
    description: 'Porcelain, ceramic, stone and natural wood for considered homes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'European Heritage Surfaces Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'European Heritage | Porcelain, Ceramic, Stone & Natural Wood',
    description: 'Porcelain, ceramic, stone and natural wood for considered homes.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/logo.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png?v=2" />
        <meta property="og:title" content="European Heritage | Porcelain, Ceramic, Stone & Natural Wood" />
        <meta property="og:description" content="Porcelain, ceramic, stone and natural wood for considered homes." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="European Heritage | Porcelain, Ceramic, Stone & Natural Wood" />
        <meta name="twitter:description" content="Porcelain, ceramic, stone and natural wood for considered homes." />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

