/**
 * Animated tower crane built in pure SVG + CSS.
 * The trolley traverses the jib and the suspended load gently swings,
 * giving a lively "active construction site" feel — no heavy 3D library.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Base */}
      <path d="M170 400 L200 360 L230 400 Z" stroke="currentColor" strokeWidth="3" className="text-white/30" />
      <rect x="150" y="400" width="100" height="8" rx="2" className="fill-white/20" />

      {/* Mast (tower) */}
      <g stroke="currentColor" strokeWidth="3" className="text-white/40">
        <line x1="190" y1="360" x2="190" y2="150" />
        <line x1="210" y1="360" x2="210" y2="150" />
        {/* lattice cross-bracing */}
        <line x1="190" y1="360" x2="210" y2="330" />
        <line x1="210" y1="360" x2="190" y2="330" />
        <line x1="190" y1="330" x2="210" y2="300" />
        <line x1="210" y1="330" x2="190" y2="300" />
        <line x1="190" y1="300" x2="210" y2="270" />
        <line x1="210" y1="300" x2="190" y2="270" />
        <line x1="190" y1="270" x2="210" y2="240" />
        <line x1="210" y1="270" x2="190" y2="240" />
        <line x1="190" y1="240" x2="210" y2="210" />
        <line x1="210" y1="240" x2="190" y2="210" />
        <line x1="190" y1="210" x2="210" y2="180" />
        <line x1="210" y1="210" x2="190" y2="180" />
        <line x1="190" y1="180" x2="210" y2="150" />
        <line x1="210" y1="180" x2="190" y2="150" />
      </g>

      {/* Apex A-frame */}
      <g stroke="currentColor" strokeWidth="3" className="text-amber">
        <line x1="190" y1="150" x2="200" y2="110" />
        <line x1="210" y1="150" x2="200" y2="110" />
      </g>

      {/* Counter-jib (left) + counterweight */}
      <g stroke="currentColor" strokeWidth="3" className="text-white/50">
        <line x1="200" y1="150" x2="90" y2="158" />
        <line x1="200" y1="162" x2="100" y2="166" />
        <line x1="200" y1="110" x2="100" y2="158" />
      </g>
      <rect x="78" y="150" width="24" height="30" rx="2" className="fill-amber/80" />

      {/* Jib (right working arm) */}
      <g stroke="currentColor" strokeWidth="3" className="text-amber">
        <line x1="200" y1="150" x2="380" y2="166" />
        <line x1="200" y1="162" x2="372" y2="172" />
        <line x1="200" y1="110" x2="380" y2="166" />
      </g>
      {/* jib verticals */}
      <g stroke="currentColor" strokeWidth="2" className="text-amber/60">
        <line x1="250" y1="153" x2="250" y2="166" />
        <line x1="300" y1="156" x2="300" y2="169" />
        <line x1="350" y1="160" x2="350" y2="171" />
      </g>

      {/* Trolley + suspended load (animated) */}
      <g className="crane-trolley">
        <rect x="248" y="160" width="18" height="9" rx="2" className="fill-white/80" />
        <g className="crane-load" style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}>
          <line x1="257" y1="169" x2="257" y2="300" stroke="currentColor" strokeWidth="2" className="text-white/60" />
          <path d="M251 300 h12 v4 a6 6 0 0 1 -12 0 Z" className="fill-white/70" />
          <rect x="243" y="304" width="28" height="20" rx="2" className="fill-amber" />
        </g>
      </g>
    </svg>
  );
}
