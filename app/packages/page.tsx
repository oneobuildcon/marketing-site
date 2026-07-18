import { getPackagesData } from "@/lib/site-db";
import PackagesClient from "./_client";

// Always fetch the latest packages on the server so the correct prices/items
// render on first paint (no flash of the bundled defaults).
export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const initial = await getPackagesData();
  return <PackagesClient initial={initial} />;
}
