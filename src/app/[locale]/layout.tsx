import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/provider/ThemeProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import BodyEventListeners from "@/sharedComponents/DOM/BodyEventListener";
import { ToastContainer } from 'react-toastify';
import SharedModals from "@/sharedComponents/modal/SharedModals";
import InitialDataLoader from "@/sharedComponents/dataLoader/InitialDataLoader";

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
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              {children}
              <InitialDataLoader />
              <SharedModals />
              <ToastContainer
                hideProgressBar={true}
                limit={3}
                newestOnTop
                autoClose={1300}
                className="z-[9999999] hidden lg:block"
              />
            </NextIntlClientProvider>
          </ThemeProvider>
          <BodyEventListeners />
        </ReduxProvider>
      </body>
    </html >
  );
}
