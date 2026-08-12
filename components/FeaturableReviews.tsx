"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_ID = "e1adb55b-e7a7-45c2-a186-baa885d138d1";

/**
 * Featurable's own embed. Their v2 widgets are not served by the public API,
 * so the reviews are rendered by their script rather than by us. Loaded only
 * once the section is near the viewport, so a third-party script on the
 * homepage does not cost anything on first paint.
 */
export default function FeaturableReviews({ onLoaded }: { onLoaded?: (ok: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
    const src = "https://cdn.featurable.com/widget/v2/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) {
      onLoaded?.(true);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    s.charset = "UTF-8";
    s.onload = () => onLoaded?.(true);
    s.onerror = () => onLoaded?.(false);
    document.body.appendChild(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div ref={ref} className="rounded-2xl bg-white/95 p-4 sm:p-6">
      {show && <div id={`featurable-${WIDGET_ID}`} data-featurable-async />}
    </div>
  );
}
