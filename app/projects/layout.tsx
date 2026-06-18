import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | Bungalows, Row Houses & Residential Buildings in Pune",
  description: "Browse One O Buildcon's completed and ongoing construction projects in Pune — premium bungalows, row houses, residential buildings and farmhouses built with quality craftsmanship.",
  openGraph: {
    title: "Our Projects | One O Buildcon Pune",
    description: "Browse completed bungalows, row houses, residential buildings and farmhouses built by One O Buildcon in Pune, Maharashtra.",
    url: "https://www.oneobuildcon.com/projects",
  },
  twitter: {
    title: "Our Projects | One O Buildcon Pune",
    description: "Browse completed bungalows, row houses, residential buildings and farmhouses built by One O Buildcon in Pune.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
