/* eslint-disable @next/next/no-img-element */
/**
 * Tower crane (jib faces right, away from text), placed on the right
 * side of the hero. Gently floats and slews back and forth so it
 * feels like it's working on site.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-end ${className}`}>
      {/* Crane flipped so jib faces right; sways from its base */}
      <img
        src="/crane.png"
        alt="Tower crane"
        className="crane-sway h-full w-auto object-contain drop-shadow-xl"
      />
    </div>
  );
}
