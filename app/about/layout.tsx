import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | One O Buildcon – Trusted Construction Company in Pune",
  description: "Learn about One O Buildcon — a trusted construction company based in Pune, Maharashtra. We specialise in premium bungalows, row houses, residential buildings and farmhouses with a commitment to quality and integrity.",
  openGraph: {
    title: "About One O Buildcon | Construction Company Pune",
    description: "Trusted construction company in Pune specialising in bungalows, row houses, residential buildings and farmhouses.",
    url: "https://www.oneobuildcon.com/about",
  },
  twitter: {
    title: "About One O Buildcon | Construction Company Pune",
    description: "Trusted construction company in Pune specialising in bungalows, row houses, residential buildings and farmhouses.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
