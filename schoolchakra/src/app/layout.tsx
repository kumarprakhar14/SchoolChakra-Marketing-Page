import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import '../index.css';
import { AppProviders } from '../components/providers/AppProviders';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { PilotModal } from '../components/sections/PilotModal';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from '../seo/metadata';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s',
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AppProviders>
          <div className="min-h-screen bg-white text-slate-900 antialiased relative overflow-x-clip flex flex-col">
            <div
              className="pointer-events-none absolute top-0 inset-x-0 h-[720px] transition-colors duration-700"
              style={{
                background:
                  'radial-gradient(65% 55% at 50% 0%, var(--brand-light, #EFF6FF) 0%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PilotModal />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
