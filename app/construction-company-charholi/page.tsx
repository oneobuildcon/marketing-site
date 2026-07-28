import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { getServiceArea } from "@/lib/serviceAreas";

const area = getServiceArea("construction-company-charholi")!;

export const metadata: Metadata = {
  title: area.metaTitle,
  description: area.metaDescription,
  alternates: { canonical: "https://oneobuildcon.com/construction-company-charholi" },
  openGraph: { title: area.metaTitle, description: area.metaDescription, url: "https://oneobuildcon.com/construction-company-charholi" },
};

export default function Page() {
  return <ServiceAreaPage area={area} />;
}
