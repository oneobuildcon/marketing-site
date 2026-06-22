import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile | One O Buildcon – Construction Company in Pune",
  description:
    "The official company profile of One O Buildcon — a trusted construction company in Pune, Maharashtra specialising in premium bungalows, row houses, residential buildings and farmhouses.",
  openGraph: {
    title: "Company Profile | One O Buildcon Pune",
    description:
      "Official company profile of One O Buildcon — trusted construction company in Pune building bungalows, row houses and residential projects.",
    url: "https://oneobuildcon.com/company-profile",
  },
  twitter: {
    title: "Company Profile | One O Buildcon Pune",
    description:
      "Official company profile of One O Buildcon — trusted construction company in Pune.",
  },
  alternates: { canonical: "/company-profile" },
};

export default function CompanyProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
