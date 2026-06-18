/* eslint-disable @next/next/no-img-element */
/**
 * Tower crane (jib faces right, away from text), placed on the right
 * side of the hero with a gentle float to give the scene life.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-end ${className}`}>
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
