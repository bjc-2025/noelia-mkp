import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import JsonLd from "./schema";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Noelia Makeup | Professional Makeup Artist & Beauty Services",
  description: "Award-winning makeup artist specializing in bridal, special occasion, and editorial makeup. Transform your look with personalized beauty services. Book your consultation today!",
  keywords: "makeup artist, bridal makeup, wedding makeup, professional makeup artist, beauty services, special occasion makeup, makeup consultation, mobile makeup artist",
  authors: [{ name: "Noelia Makeup" }],
  creator: "Noelia Makeup",
  publisher: "Noelia Makeup",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Noelia Makeup | Professional Makeup Artist & Beauty Services",
    description: "Award-winning makeup artist specializing in bridal, special occasion, and editorial makeup. Transform your look with personalized beauty services.",
    url: "https://noeliamakeup.com",
    siteName: "Noelia Makeup",
    images: [
      {
        url: "/images/hero/girl1.jpg",
        width: 1200,
        height: 630,
        alt: "Noelia Makeup - Professional Makeup Artist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noelia Makeup | Professional Makeup Artist",
    description: "Award-winning makeup artist specializing in bridal & special occasion makeup. Book your consultation today!",
    images: ["/images/hero/girl1.jpg"],
    creator: "@noeliamakeup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code",
    yandex: "add-your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://noeliamakeup.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <link rel="icon" href="/images/hero/fav.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/hero/fav.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
