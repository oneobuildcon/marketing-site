import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { getServiceArea } from "@/lib/serviceAreas";

const area = getServiceArea("bungalow-construction-pimpri-chinchwad")!;

export const metadata: Metadata = {
  title: area.metaTitle,
  description: area.metaDescription,
  alternates: { canonical: "https://oneobuildcon.com/bungalow-construction-pimpri-chinchwad" },
  openGraph: { title: area.metaTitle, description: area.metaDescription, url: "https://oneobuildcon.com/bungalow-construction-pimpri-chinchwad" },
};

export default function Page() {
  return <ServiceAreaPage area={area} />;
}
