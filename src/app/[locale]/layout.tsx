import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/provider/ThemeProvider";
import ReduxProvider from "@/provider/ReduxProvider";
import BodyEventListeners from "@/sharedComponents/DOM/BodyEventListener";
import DevToolIndicator from "@/sharedComponents/DOM/DevToolIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Garden",
  description: "An online food delivery platform bringing fresh and delicious meals to your doorstep.",
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

  // console.log('params locale:', params);

  // const locale = 'en'

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
          <BodyEventListeners />
        </ReduxProvider>
      </body>
    </html >
  );
}
