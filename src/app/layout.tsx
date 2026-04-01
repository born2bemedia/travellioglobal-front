import { Plus_Jakarta_Sans, Syne } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { cn } from '@/shared/lib/helpers/styles';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
}); 

export const metadata: Metadata = {
  title: 'Travellio Global | Tours, Excursions & Seamless Travel Services',
  description:
    'Discover curated tours, global excursions, flights, transfers, and travel services worldwide. Explore smarter and travel effortlessly with Travellio Global.',
  openGraph: {
    title: 'Travellio Global | Tours, Excursions & Seamless Travel Services',
    description:
      'Discover curated tours, global excursions, flights, transfers, and travel services worldwide. Explore smarter and travel effortlessly with Travellio Global.',
    images: 'https://travellioglobal.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-8556Y8CBFX" />
      <body className={cn(plusJakartaSans.variable, syne.variable)}>
        {children}
      </body>
    </html>
  );
}
