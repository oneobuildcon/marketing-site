import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Services in Pune | Bungalow, Row House, Residential Building",
  description: "One O Buildcon offers full construction services in Pune — bungalow construction, row house building, residential buildings, farmhouses, RCC work, interior finishing and more.",
  openGraph: {
    title: "Construction Services in Pune | One O Buildcon",
    description: "Full construction services in Pune — bungalows, row houses, residential buildings, farmhouses and RCC contractors.",
    url: "https://oneobuildcon.com/services",
  },
  twitter: {
    title: "Construction Services in Pune | One O Buildcon",
    description: "Full construction services in Pune — bungalows, row houses, residential buildings, farmhouses and RCC contractors.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
