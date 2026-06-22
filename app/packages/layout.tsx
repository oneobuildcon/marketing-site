import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Packages & Pricing | One O Buildcon Pune",
  description:
    "Transparent construction packages from One O Buildcon, Pune. Compare our Classic, Premium and Luxury home building packages with clear per-sq-ft pricing and included specifications.",
  openGraph: {
    title: "Construction Packages & Pricing | One O Buildcon Pune",
    description:
      "Compare transparent home construction packages in Pune — clear per-sq-ft pricing and included specifications.",
    url: "https://oneobuildcon.com/packages",
  },
  twitter: {
    title: "Construction Packages & Pricing | One O Buildcon Pune",
    description:
      "Compare transparent home construction packages in Pune with clear per-sq-ft pricing.",
  },
  alternates: { canonical: "/packages" },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
