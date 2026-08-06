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

// Featurable connects to the Business Profile itself, so it returns every
// review rather than the five the Places API is limited to. Preferred when
// configured; the Places API stays as the fallback.
async function fromFeaturable(widgetId: string) {
  const res = await fetch(`https://featurable.com/api/v1/widgets/${widgetId}`, {
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Featurable returned ${res.status}`);
  const d = (await res.json()) as any;
  const reviews: Review[] = (d.reviews ?? [])
    .map((r: any) => ({
      author: r.reviewer?.displayName ?? 'Google user',
      photo: r.reviewer?.profilePhotoUrl,
      rating: typeof r.starRating === 'number' ? r.starRating : Number(r.starRating) || 5,
      text: r.comment ?? '',
      relative: r.relativeTimeDescription ?? r.createTime?.slice(0, 10) ?? '',
    }))
    .filter((r: Review) => r.text.trim().length > 0);
  return {
    configured: true,
    source: 'featurable',
    rating: d.averageRating ?? null,
    total: d.totalReviewCount ?? reviews.length,
    mapsUrl: d.profileUrl ?? null,
    reviews,
  };
}

// Looking up the Place ID by hand is fiddly, so the API does it: one text
// search for the business name, cached like everything else. Set
// GOOGLE_PLACE_ID explicitly to skip this and save a call.
async function findPlaceId(key: string): Promise<string | null> {
  const query = process.env.GOOGLE_PLACE_QUERY || 'ONE O BUILDCON, Charholi, Pune';
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 1 }),
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Place search returned ${res.status}`);
  const d = (await res.json()) as any;
  return d?.places?.[0]?.id ?? null;
}

export async function GET() {
  const widgetId = process.env.FEATURABLE_WIDGET_ID;
  if (widgetId) {
    try {
      return NextResponse.json(await fromFeaturable(widgetId));
    } catch (e: any) {
      // Fall through to the Places API rather than showing nothing.
      console.error('reviews (featurable):', e?.message);
    }
  }

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return NextResponse.json({ configured: false, reviews: [], rating: null, total: 0 });
  }

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(key));
    if (!placeId) {
      return NextResponse.json({ configured: true, reviews: [], rating: null, total: 0, error: 'Business not found' });
    }
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
      source: 'places',
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
