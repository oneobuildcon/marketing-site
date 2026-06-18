/**
 * Realistic animated tower crane in SVG + CSS.
 * Detailed steel truss, operator cab, counterweight and a hook block that
 * traverses the jib while the suspended concrete load gently swings.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 460" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="craneSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="0.45" stopColor="#ef9b22" />
          <stop offset="1" stopColor="#b56a0c" />
        </linearGradient>
        <linearGradient id="craneConcrete" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aab2bb" />
          <stop offset="1" stopColor="#545b63" />
        </linearGradient>
        <filter id="craneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="220" cy="446" rx="120" ry="9" fill="#000000" opacity="0.25" />

      <g filter="url(#craneShadow)">
      {/* Foundation */}
      <rect x="170" y="424" width="100" height="14" rx="3" fill="url(#craneConcrete)" stroke="#3f454c" strokeWidth="2" />
      <rect x="150" y="438" width="140" height="8" rx="2" fill="#4a5159" />

      {/* ── Tower mast (lattice steel) ── */}
      <g stroke="#9a5e0c" strokeWidth="2">
        {/* side rails */}
        <rect x="192" y="170" width="9" height="254" fill="url(#craneSteel)" />
        <rect x="219" y="170" width="9" height="254" fill="url(#craneSteel)" />
        {/* horizontal + X bracing per segment */}
        {[170, 206, 242, 278, 314, 350, 386].map((y) => (
          <g key={y}>
            <line x1="196" y1={y} x2="224" y2={y} stroke="#c4760f" strokeWidth="5" />
            <line x1="196" y1={y} x2="224" y2={y + 36} stroke="#e8951f" strokeWidth="3" />
            <line x1="224" y1={y} x2="196" y2={y + 36} stroke="#e8951f" strokeWidth="3" />
          </g>
        ))}
      </g>

      {/* ── Operator cab ── */}
      <rect x="226" y="150" width="26" height="24" rx="3" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2" />
      <rect x="230" y="154" width="18" height="11" rx="1.5" fill="#bfe3ef" stroke="#9a5e0c" strokeWidth="1.5" />

      {/* ── Slewing top + apex A-frame ── */}
      <rect x="196" y="150" width="28" height="22" rx="2" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2" />
      <g stroke="url(#craneSteel)" strokeWidth="6" strokeLinecap="round">
        <line x1="200" y1="150" x2="210" y2="104" />
        <line x1="220" y1="150" x2="210" y2="104" />
      </g>
      {/* pendant tie-bars */}
      <g stroke="#caa24a" strokeWidth="2.5">
        <line x1="210" y1="106" x2="404" y2="150" />
        <line x1="210" y1="106" x2="74" y2="150" />
      </g>

      {/* ── Counter-jib + concrete counterweight ── */}
      <g stroke="#9a5e0c" strokeWidth="2">
        <line x1="206" y1="150" x2="74" y2="150" stroke="#c4760f" strokeWidth="5" />
        <line x1="206" y1="166" x2="92" y2="166" stroke="#c4760f" strokeWidth="5" />
        {[100, 130, 160, 190].map((x) => (
          <line key={x} x1={x} y1="150" x2={x + 14} y2="166" stroke="#e8951f" strokeWidth="2.5" />
        ))}
      </g>
      <rect x="72" y="148" width="30" height="34" rx="2" fill="url(#craneConcrete)" stroke="#3f454c" strokeWidth="2" />

      {/* ── Jib (working arm, triangulated truss) ── */}
      <g>
        <line x1="214" y1="150" x2="404" y2="150" stroke="#c4760f" strokeWidth="6" />
        <line x1="214" y1="168" x2="394" y2="160" stroke="#c4760f" strokeWidth="5" />
        {/* truss web */}
        <g stroke="#f0a836" strokeWidth="2.5">
          {[238, 268, 298, 328, 358, 388].map((x, idx) => (
            <g key={x}>
              <line x1={x} y1="150" x2={x} y2={167 - idx * 0.9} />
              <line x1={x} y1={167 - idx * 0.9} x2={x + 30} y2="150" />
            </g>
          ))}
        </g>
      </g>

      {/* ── Trolley + hook block + concrete load (animated) ── */}
      <g className="crane-trolley">
        <rect x="246" y="146" width="22" height="10" rx="2" fill="#4a5159" stroke="#2c3036" strokeWidth="1.5" />
        <circle cx="251" cy="157" r="3" fill="#2c3036" />
        <circle cx="263" cy="157" r="3" fill="#2c3036" />
        <g className="crane-load" style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}>
          <line x1="257" y1="158" x2="257" y2="300" stroke="#3f454c" strokeWidth="2.5" />
          {/* hook block */}
          <rect x="250" y="300" width="14" height="14" rx="2" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="1.5" />
          <path d="M257 314 q-7 6 0 12 q7 -6 0 -12" fill="none" stroke="#3f454c" strokeWidth="2.5" />
          {/* concrete bucket load */}
          <path d="M236 332 h42 l-6 26 h-30 Z" fill="url(#craneConcrete)" stroke="#3f454c" strokeWidth="2" />
          <line x1="236" y1="332" x2="257" y2="326" stroke="#3f454c" strokeWidth="2" />
          <line x1="278" y1="332" x2="257" y2="326" stroke="#3f454c" strokeWidth="2" />
        </g>
      </g>
      </g>
    </svg>
  );
}
