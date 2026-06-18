import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | One O Buildcon – Construction Company Pune",
  description: "Get in touch with One O Buildcon for your construction project in Pune. Call +91 88060 29907 or send us a message. Free consultation for bungalows, row houses, residential buildings and farmhouses.",
  openGraph: {
    title: "Contact One O Buildcon | Construction Company Pune",
    description: "Call +91 88060 29907 or message us for a free consultation. Bungalows, row houses, residential buildings and farmhouses in Pune.",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Contact One O Buildcon" }],
    url: "https://www.oneobuildcon.com/contact",
  },
  twitter: {
    title: "Contact One O Buildcon | Construction Company Pune",
    description: "Call +91 88060 29907 or message us for a free consultation on your construction project in Pune.",
    images: ["/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
