import { Plus_Jakarta_Sans, Syne } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';

import { FormsPopupRenderer } from '@/features/forms';

import { cn } from '@/shared/lib/helpers/styles';
import { CookiePopup, Footer, Header } from '@/shared/ui/components';

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
  title: 'Travellio Global',
  description:
    '',
  openGraph: {
    title: 'Travellio Global',
    description:
      '',
    //images: 'https://travellioglobal.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <GoogleAnalytics gaId="G-8556Y8CBFX" />
      <body className={cn(plusJakartaSans.variable, syne.variable)}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <CookiePopup />
          <FormsPopupRenderer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
