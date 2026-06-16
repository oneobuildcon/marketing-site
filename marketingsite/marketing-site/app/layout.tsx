import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "One O Buildcon | From Blueprint to Brilliance",
  description:
    "One O Buildcon is a full-service construction company delivering residential, commercial, and renovation projects with precision and integrity — from blueprint to brilliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-navy`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
