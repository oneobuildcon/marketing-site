"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

const PHONE = "+918806029907";

export default function MobileQuoteBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-black/10 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <a
        href={`tel:${PHONE}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-navy/15 px-4 py-3 text-sm font-semibold text-navy transition active:scale-95"
        aria-label="Call One O Buildcon"
      >
        <Phone className="h-4 w-4 text-amber" /> Call
      </a>
      <Link
        href="/contact"
        className="flex flex-[1.6] items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold text-navy-dark transition active:scale-95"
      >
        Get a Free Quote <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
