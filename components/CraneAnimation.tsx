/**
 * Animated construction site scene in SVG + CSS:
 * a portable mini lifting crane holding a concrete bucket beside a
 * single-bag site mixer whose drum spins. Matched scale + style.
 */
export default function CraneAnimation({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 440" className={className} fill="none" aria-hidden="true">
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
        <linearGradient id="rmcChassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5159" />
          <stop offset="1" stopColor="#23272c" />
        </linearGradient>
        <radialGradient id="rmcTyre" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#2a2e33" />
          <stop offset="1" stopColor="#101316" />
        </radialGradient>
        <clipPath id="drumClip"><ellipse cx="0" cy="0" rx="40" ry="30" /></clipPath>
        <filter id="craneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#craneShadow)">

        {/* ═══ MINI LIFTING CRANE (left) ═══ */}
        <ellipse cx="150" cy="430" rx="70" ry="6" fill="#000" opacity="0.2" />

        {/* feet */}
        <rect x="100" y="424" width="100" height="8" rx="2" fill="#3a3f45" />
        {/* mast post */}
        <rect x="144" y="150" width="12" height="276" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2" />
        {/* mast cross-bracing */}
        <g stroke="#c4760f" strokeWidth="2">
          {[180, 220, 260, 300, 340, 380].map((y) => (
            <g key={y}>
              <line x1="146" y1={y} x2="154" y2={y + 20} />
              <line x1="154" y1={y} x2="146" y2={y + 20} />
            </g>
          ))}
        </g>
        {/* angled back stay */}
        <line x1="150" y1="170" x2="108" y2="424" stroke="url(#craneSteel)" strokeWidth="7" strokeLinecap="round" />
        <line x1="120" y1="330" x2="150" y2="300" stroke="#c4760f" strokeWidth="3" />

        {/* king post + pendant ties */}
        <line x1="150" y1="150" x2="150" y2="126" stroke="url(#craneSteel)" strokeWidth="6" strokeLinecap="round" />
        <g stroke="#caa24a" strokeWidth="2.5">
          <line x1="150" y1="128" x2="232" y2="126" />
          <line x1="150" y1="128" x2="304" y2="112" />
        </g>

        {/* jib arm (truss) */}
        <line x1="150" y1="152" x2="306" y2="112" stroke="#c4760f" strokeWidth="6" />
        <line x1="150" y1="166" x2="298" y2="122" stroke="#c4760f" strokeWidth="5" />
        <g stroke="#f0a836" strokeWidth="2.5">
          <line x1="190" y1="146" x2="192" y2="158" />
          <line x1="230" y1="136" x2="232" y2="148" />
          <line x1="270" y1="126" x2="272" y2="138" />
          <line x1="190" y1="146" x2="232" y2="148" />
          <line x1="230" y1="136" x2="272" y2="138" />
        </g>
        {/* tip pulley */}
        <circle cx="305" cy="113" r="5" fill="#5d646d" stroke="#2c3036" strokeWidth="1.5" />

        {/* winch motor at base */}
        <rect x="116" y="386" width="34" height="24" rx="3" fill="url(#rmcChassis)" stroke="#23272c" strokeWidth="1.5" />
        <circle cx="133" cy="398" r="7" fill="#5d646d" stroke="#23272c" strokeWidth="1.5" />
        {/* hoist cable up the mast */}
        <line x1="133" y1="390" x2="150" y2="152" stroke="#6b7178" strokeWidth="1.5" />

        {/* suspended concrete bucket (gently swings) */}
        <g className="crane-load" style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}>
          <line x1="305" y1="115" x2="305" y2="250" stroke="#3f454c" strokeWidth="2" />
          <rect x="299" y="250" width="12" height="12" rx="2" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="1.5" />
          {/* skip bucket */}
          <path d="M285 264 h40 l-6 30 h-28 Z" fill="url(#craneConcrete)" stroke="#3f454c" strokeWidth="2" />
          <line x1="285" y1="264" x2="305" y2="258" stroke="#3f454c" strokeWidth="2" />
          <line x1="325" y1="264" x2="305" y2="258" stroke="#3f454c" strokeWidth="2" />
        </g>

        {/* ═══ SINGLE-BAG SITE MIXER (right) ═══ */}
        <ellipse cx="330" cy="432" rx="76" ry="6" fill="#000" opacity="0.2" />

        {/* two big spoked wheels */}
        {[300, 366].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="408" r="23" fill="url(#rmcTyre)" stroke="#000" strokeWidth="2" />
            <circle cx={cx} cy="408" r="15" fill="none" stroke="#7a818a" strokeWidth="3" />
            <g stroke="#9aa3ad" strokeWidth="2">
              {[0, 45, 90, 135].map((a) => (
                <line key={a}
                  x1={cx - 14 * Math.cos((a * Math.PI) / 180)} y1={408 - 14 * Math.sin((a * Math.PI) / 180)}
                  x2={cx + 14 * Math.cos((a * Math.PI) / 180)} y2={408 + 14 * Math.sin((a * Math.PI) / 180)} />
              ))}
            </g>
            <circle cx={cx} cy="408" r="5" fill="#5d646d" stroke="#2c3036" strokeWidth="1.5" />
          </g>
        ))}

        {/* axle + A-frame stand */}
        <g stroke="url(#rmcChassis)" strokeWidth="7" strokeLinecap="round">
          <line x1="300" y1="408" x2="366" y2="408" />
          <line x1="312" y1="406" x2="330" y2="364" />
          <line x1="356" y1="406" x2="338" y2="364" />
        </g>
        <rect x="322" y="360" width="26" height="10" rx="3" fill="#3a3f45" />

        {/* tilting drum (amber, rotating) */}
        <g transform="translate(334 352) rotate(-24)">
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2.5" />
          <g clipPath="url(#drumClip)">
            <g className="rmc-drum" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path key={a}
                  d={`M0 0 Q ${24 * Math.cos(((a + 22) * Math.PI) / 180)} ${20 * Math.sin(((a + 22) * Math.PI) / 180)} ${40 * Math.cos((a * Math.PI) / 180)} ${30 * Math.sin((a * Math.PI) / 180)}`}
                  fill="none" stroke="#b56a0c" strokeWidth="2.5" />
              ))}
            </g>
          </g>
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="none" stroke="#ffd27a" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx="9" cy="0" rx="29" ry="30" fill="none" stroke="#9a5e0c" strokeWidth="1.5" opacity="0.5" />
          {/* open mouth */}
          <ellipse cx="32" cy="0" rx="10" ry="21" fill="#5a3a0a" stroke="#9a5e0c" strokeWidth="2" />
          <ellipse cx="32" cy="0" rx="5.5" ry="14" fill="#3f2a08" />
        </g>

        {/* tilt hand-wheel */}
        <g transform="translate(366 376)">
          <circle r="12" fill="none" stroke="#5d646d" strokeWidth="3" />
          <g stroke="#5d646d" strokeWidth="2">
            <line x1="-10" y1="0" x2="10" y2="0" />
            <line x1="0" y1="-10" x2="0" y2="10" />
          </g>
          <circle r="3.5" fill="#3a3f45" />
        </g>
      </g>
    </svg>
  );
}
