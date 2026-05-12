import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
