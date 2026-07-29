"use client";

import { useEffect } from "react";

export default function ReviewRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4 text-center text-white">
      <div>
        <p className="text-lg font-semibold">Redirecting to Google Reviews…</p>
        <p className="mt-2 text-sm text-white/70">
          If it doesn&apos;t open,{" "}
          <a href={url} className="font-semibold text-amber underline">
            tap here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
