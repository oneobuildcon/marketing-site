import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Short branded link for WhatsApp / SMS review requests. WhatsApp reads the
// OG tags here (with the site logo) and shows a branded preview card, then
// the visitor is bounced straight to the real Google review URL.
const GOOGLE_REVIEW_URL = "https://g.page/r/CQqH7cU9SpacEBM/review";

// Metadata omits `openGraph.images` so this route inherits the site's
// auto-generated 1200x630 branded OG image (app/opengraph-image.tsx),
// which WhatsApp renders as the link preview card.
export const metadata: Metadata = {
  title: "Leave a Review | One O Buildcon",
  description:
    "Share your experience with One O Buildcon on Google. A quick review helps our small business grow — thank you!",
  openGraph: {
    title: "One O Buildcon — Leave a Review",
    description:
      "Share your experience with One O Buildcon on Google. Thank you for helping our small business grow.",
    url: "https://oneobuildcon.com/review",
    siteName: "One O Buildcon",
  },
  twitter: {
    card: "summary_large_image",
    title: "One O Buildcon — Leave a Review",
    description: "Share your experience with One O Buildcon on Google.",
  },
};

export default function ReviewRedirect() {
  redirect(GOOGLE_REVIEW_URL);
}
