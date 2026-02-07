import { routing } from "@/i18n/routing";
import ReduxProvider from "@/provider/ReduxProvider";
import { ThemeProvider } from "@/provider/ThemeProvider";
import BodyEventListeners from "@/sharedComponents/DOM/BodyEventListener";
import SharedModals from "@/sharedComponents/modal/SharedModals";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import requestConfig from "@/i18n/request";

export const dynamic = 'force-static';
export const revalidate = 600  // revalidate in every 10 minutes

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// app/[locale]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://foodgardencafe.com'),
  title: {
    default: 'Food Garden – Fresh & Delicious',
    template: '%s | Food Garden'
  },
  description: 'An online food delivery platform bringing fresh and delicious meals to your doorstep.',
  alternates: {
    canonical: 'https://foodgardencafe.com',
  },
  openGraph: {
    type: 'website',
    siteName: 'Food Garden',
    locale: 'bn_BD',
    images: ['/og-layout.png']
  },
  twitter: {
    card: 'summary_large_image'
  },

  //  we will remove this once we get our final version
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};


export async function generateStaticParams() {
  // Pre-generate for both locales
  const locales = ['bn', 'en'];
  return locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}>) {

  const { locale } = await params;

  // const  = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages using your request.ts helper
  const { messages } = await requestConfig({ requestLocale: Promise.resolve(locale) });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1023px] mx-auto`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages} >
              {children}
              <SharedModals />
            </NextIntlClientProvider>
          </ThemeProvider>
          <BodyEventListeners />
        </ReduxProvider>
      </body>
    </html >
  );
}
