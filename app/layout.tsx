import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileQuoteBar from "@/components/MobileQuoteBar";
import { LanguageProvider } from "@/lib/LanguageContext";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "One O Buildcon | Construction Company in Pune",
    template: "%s | One O Buildcon Pune",
  },
  description:
    "Trusted construction company in Pune building premium bungalows, row houses, residential buildings & farmhouses. Expert RCC contractors. Free consultation.",
  keywords: [
    "construction company Pune",
    "bungalow builder Pune",
    "row house construction Pune",
    "residential building contractor Pune",
    "farmhouse builder Pune",
    "RCC contractor Pune",
    "home construction Pune",
    "building contractor Pune",
    "One O Buildcon",
    "construction company Maharashtra",
    "new home construction Pune",
    "premium bungalow construction Pune",
  ],
  authors: [{ name: "One O Buildcon", url: "https://oneobuildcon.com" }],
  creator: "One O Buildcon",
  metadataBase: new URL("https://oneobuildcon.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://oneobuildcon.com",
    siteName: "One O Buildcon",
    title: "One O Buildcon | Construction Company in Pune",
    description:
      "Premium bungalows, row houses, residential buildings and farmhouses built by trusted RCC contractors in Pune, Maharashtra.",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "One O Buildcon – Construction Company Pune" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One O Buildcon | Construction Company in Pune",
    description: "Premium bungalows, row houses & residential buildings by trusted RCC contractors in Pune.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://oneobuildcon.com",
    name: "One O Buildcon",
    description:
      "One O Buildcon is a trusted construction company in Pune specialising in premium bungalows, row houses, residential buildings and farmhouses.",
    url: "https://oneobuildcon.com",
    telephone: "+918806029907",
    email: "oneobuildcon@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 18.5204, longitude: 73.8567 },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "18:00" },
    ],
    sameAs: ["https://wa.me/918806029907"],
    priceRange: "₹₹₹",
    areaServed: { "@type": "State", name: "Maharashtra" },
    knowsAbout: ["Bungalow Construction","Row House Construction","Residential Building","Farmhouse Construction","RCC Contractors","Home Construction Pune"],
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${sourceSans.variable} ${lexend.variable} font-sans antialiased text-navy`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <MobileQuoteBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
