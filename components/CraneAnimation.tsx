/* eslint-disable @next/next/no-img-element */
/**
 * Construction site scene using real transparent PNGs: a tower crane
 * lifting a load with a concrete site mixer tucked at its base. Both
 * images gently float/bob to give the scene life (respects reduced-motion).
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Crane sets the overall height */}
      <img
        src="/crane.png"
        alt="Tower crane"
        className="crane-float h-full w-auto object-contain drop-shadow-xl"
      />
      {/* Mixer tucked at the bottom-left base of the crane */}
      <img
        src="/mixer.png"
        alt="Concrete site mixer"
        className="crane-float-slow absolute bottom-0 left-[-55%] h-[34%] w-auto object-contain drop-shadow-xl"
      />
    </div>
  );
}
