/* eslint-disable @next/next/no-img-element */
/**
 * Tower crane (jib faces right, away from text) on the right of the hero.
 * The whole crane gently sways/floats from its base, and the hook cable
 * swings left-right like a pendulum from the jib tip.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end justify-end ${className}`}>
      {/* Wrapper carries the flip + base sway so the cable rides along */}
      <div className="crane-sway relative h-full">
        <img
          src="/crane.png"
          alt="Tower crane"
          className="h-full w-auto object-contain drop-shadow-xl"
        />
        {/* Hook cable: swings as a pendulum from its top attach point.
            Positioned in the crane image's own (un-flipped) coordinates. */}
        <img
          src="/cable.png"
          alt=""
          aria-hidden="true"
          className="crane-cable absolute w-auto"
          style={{ left: "60.2%", top: "17.6%", height: "34.1%" }}
        />
      </div>
    </div>
  );
}
