import type { Metadata } from "next";
import ReviewRedirect from "./ReviewRedirect";

// Short branded link for WhatsApp review requests. IMPORTANT: this must
// render HTML (not do a server redirect) so WhatsApp/Facebook crawlers can
// read the OG tags and show the branded preview card. Real users are
// bounced to Google by the client component below.
const GOOGLE_REVIEW_URL = "https://g.page/r/CQqH7cU9SpacEBM/review";

// Explicit absolute image URL so WhatsApp/Facebook crawlers always find it.
const OG_IMAGE = "https://oneobuildcon.com/logo.png";

export const metadata: Metadata = {
  title: "Leave a Review | One O Buildcon",
  description:
    "Share your experience with One O Buildcon on Google. A quick review helps our small business grow — thank you!",
  openGraph: {
    title: "One O Buildcon — Leave a Review",
    description:
      "Share your experience with One O Buildcon on Google. Thank you for helping our small business grow.",
    url: "https://oneobuildcon.com/review-us",
    siteName: "One O Buildcon",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: "One O Buildcon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One O Buildcon — Leave a Review",
    description: "Share your experience with One O Buildcon on Google.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <ReviewRedirect url={GOOGLE_REVIEW_URL} />;
}
