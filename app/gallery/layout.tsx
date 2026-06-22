import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | One O Buildcon – Construction Projects in Pune",
  description:
    "Browse the full photo gallery of One O Buildcon — bungalows, row houses, residential buildings and farmhouses built across Pune, straight from our Instagram.",
  openGraph: {
    title: "Gallery | One O Buildcon Pune",
    description:
      "Browse our full project gallery — bungalows, row houses and residential builds across Pune.",
    url: "https://oneobuildcon.com/gallery",
  },
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
