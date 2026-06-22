import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Cost Calculator | One O Buildcon Pune",
  description:
    "Estimate your home construction cost in Pune instantly. Free online calculator for bungalows, row houses and residential buildings — get a transparent per-sq-ft estimate by floor and package.",
  openGraph: {
    title: "Construction Cost Calculator | One O Buildcon Pune",
    description:
      "Free online construction cost calculator for Pune — transparent per-sq-ft estimates for bungalows, row houses and residential buildings.",
    url: "https://oneobuildcon.com/calculator",
  },
  twitter: {
    title: "Construction Cost Calculator | One O Buildcon Pune",
    description:
      "Free online construction cost calculator for Pune — transparent per-sq-ft estimates by floor and package.",
  },
  alternates: { canonical: "/calculator" },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
