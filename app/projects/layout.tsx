import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | Bungalows, Row Houses & Residential Buildings in Pune",
  description: "Browse One O Buildcon's completed and ongoing construction projects in Pune — premium bungalows, row houses, residential buildings and farmhouses built with quality craftsmanship.",
  openGraph: {
    title: "Our Projects | One O Buildcon Pune",
    description: "Browse completed bungalows, row houses, residential buildings and farmhouses built by One O Buildcon in Pune, Maharashtra.",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "One O Buildcon Projects" }],
    url: "https://www.oneobuildcon.com/projects",
  },
  twitter: {
    title: "Our Projects | One O Buildcon Pune",
    description: "Browse completed bungalows, row houses, residential buildings and farmhouses built by One O Buildcon in Pune.",
    images: ["/logo.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
