/* eslint-disable @next/next/no-img-element */
/**
 * Construction site scene using real transparent PNGs: a tower crane
 * lifting a load beside a concrete site mixer. Both images gently
 * float/bob to give the scene life (respects reduced-motion).
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-end justify-center gap-2 ${className}`}>
      <img
        src="/crane.png"
        alt="Tower crane"
        className="crane-float h-full w-auto object-contain drop-shadow-xl"
      />
      <img
        src="/mixer.png"
        alt="Concrete site mixer"
        className="crane-float-slow w-auto self-end object-contain drop-shadow-xl"
        style={{ height: "38%" }}
      />
    </div>
  );
}
