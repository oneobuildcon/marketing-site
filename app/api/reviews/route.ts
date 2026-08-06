import { NextResponse } from 'next/server';

// Google Places API (New). Needs two environment variables:
//   GOOGLE_PLACES_API_KEY — from Google Cloud, with Places API enabled
//   GOOGLE_PLACE_ID       — the Place ID of the Business Profile
// Without them this returns an empty list rather than failing, so the site
// simply shows nothing extra until they are set.
export const revalidate = 86400; // Google's terms allow caching for a day

type Review = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  relative: string;
  url?: string;
};

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) {
    return NextResponse.json({ configured: false, reviews: [], rating: null, total: 0 });
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`Places API returned ${res.status}`);
    const d = (await res.json()) as any;

    const reviews: Review[] = (d.reviews ?? [])
      .map((r: any) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: r.originalText?.text ?? r.text?.text ?? '',
        relative: r.relativePublishTimeDescription ?? '',
        url: r.googleMapsUri,
      }))
      .filter((r: Review) => r.text.trim().length > 0);

    return NextResponse.json({
      configured: true,
      rating: d.rating ?? null,
      total: d.userRatingCount ?? 0,
      mapsUrl: d.googleMapsUri ?? null,
      reviews,
    });
  } catch (e: any) {
    console.error('reviews: ', e?.message);
    return NextResponse.json({ configured: true, reviews: [], rating: null, total: 0 });
  }
}
