import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-4396480398414680";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fivebazi.com"),
  title: {
    default: "Free BaZi Chart Calculator — Chinese Astrology in English | FiveBaZi",
    template: "%s | FiveBaZi",
  },
  description:
    "Generate your free BaZi chart in seconds. See your Four Pillars of Destiny, Day Master, and Five Elements balance — Chinese astrology decoded into plain English.",
  keywords: [
    "bazi chart",
    "bazi calculator",
    "chinese astrology calculator",
    "four pillars of destiny",
    "free bazi reading",
    "day master",
    "five elements bazi",
    "chinese fortune telling",
  ],
  openGraph: {
    title: "Free BaZi Chart Calculator — Chinese Astrology in English",
    description:
      "Generate your free BaZi chart in seconds. Discover your Day Master, Four Pillars, and Five Element balance.",
    url: "https://fivebazi.com",
    siteName: "FiveBaZi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BaZi Chart Calculator — Chinese Astrology in English",
    description:
      "Generate your free BaZi chart in seconds. Discover your Day Master, Four Pillars, and Five Element balance.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="adsbygoogle"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
