import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Short branded link for WhatsApp / SMS review requests. WhatsApp reads the
// OG tags here (with the site logo) and shows a branded preview card, then
// the visitor is bounced straight to the real Google review URL.
const GOOGLE_REVIEW_URL = "https://g.page/r/CQqH7cU9SpacEBM/review";

export const metadata: Metadata = {
  title: "Leave a Review | One O Buildcon",
  description:
    "Share your experience with One O Buildcon on Google. A quick review helps our small business grow — thank you!",
  openGraph: {
    title: "Leave a Review | One O Buildcon",
    description:
      "Share your experience with One O Buildcon on Google. Thank you for helping our small business grow.",
    url: "https://oneobuildcon.com/review",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "One O Buildcon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leave a Review | One O Buildcon",
    description: "Share your experience with One O Buildcon on Google.",
    images: ["/logo.png"],
  },
};

export default function ReviewRedirect() {
  redirect(GOOGLE_REVIEW_URL);
}
