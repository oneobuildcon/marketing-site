/* eslint-disable @next/next/no-img-element */
/**
 * Construction site scene: tower crane (jib faces right, away from text)
 * with concrete mixer beside it. Placed on the right side of the hero.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end ${className}`}>
      {/* Mixer sits beside the crane base */}
      <img
        src="/mixer.png"
        alt="Concrete site mixer"
        className="crane-float-slow w-auto object-contain drop-shadow-xl self-end"
        style={{ height: "32%" }}
      />
      {/* Crane flipped so jib faces right (outward from text) */}
      <img
        src="/crane.png"
        alt="Tower crane"
        className="crane-float h-full w-auto object-contain drop-shadow-xl"
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
  );
}
