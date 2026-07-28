import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { getServiceArea } from "@/lib/serviceAreas";

const area = getServiceArea("rcc-contractor-pune")!;

export const metadata: Metadata = {
  title: area.metaTitle,
  description: area.metaDescription,
  alternates: { canonical: "https://oneobuildcon.com/rcc-contractor-pune" },
  openGraph: { title: area.metaTitle, description: area.metaDescription, url: "https://oneobuildcon.com/rcc-contractor-pune" },
};

export default function Page() {
  return <ServiceAreaPage area={area} />;
}
