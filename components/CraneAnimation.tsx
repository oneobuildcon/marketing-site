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
        <linearGradient id="rmcDrum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset="0.45" stopColor="#d3d9df" />
          <stop offset="1" stopColor="#a3abb4" />
        </linearGradient>
        <linearGradient id="rmcChassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5159" />
          <stop offset="1" stopColor="#23272c" />
        </linearGradient>
        <radialGradient id="rmcTyre" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#2a2e33" />
          <stop offset="1" stopColor="#101316" />
        </radialGradient>
        <clipPath id="drumClip">
          <ellipse cx="0" cy="0" rx="48" ry="29" />
        </clipPath>
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

      {/* ── RMC cement mixer truck (drum spins) ── */}
      <g>
        {/* ground shadow */}
        <ellipse cx="356" cy="444" rx="98" ry="7" fill="#000" opacity="0.22" />

        {/* chassis frame rails */}
        <rect x="280" y="420" width="162" height="9" rx="2" fill="url(#rmcChassis)" />
        <rect x="280" y="412" width="120" height="6" rx="2" fill="#3a3f45" />

        {/* rear mud-guards */}
        <path d="M300 420 a30 18 0 0 1 60 0 Z" fill="#2c3036" />

        {/* cab (front, right) with detail */}
        <path d="M402 420 v-30 a5 5 0 0 1 5 -5 h21 a7 7 0 0 1 6 5 l6 30 Z" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2" />
        <rect x="409" y="390" width="20" height="15" rx="2" fill="#bfe3ef" stroke="#9a5e0c" strokeWidth="1.5" />
        <line x1="420" y1="390" x2="420" y2="405" stroke="#9a5e0c" strokeWidth="1.2" />
        {/* headlight + bumper + mirror */}
        <rect x="438" y="412" width="5" height="7" rx="1.5" fill="#fff4cf" stroke="#9a5e0c" strokeWidth="1" />
        <rect x="436" y="420" width="9" height="5" rx="1.5" fill="#2c3036" />
        <line x1="407" y1="396" x2="401" y2="396" stroke="#3a3f45" strokeWidth="2.5" />
        <rect x="397" y="393" width="4" height="7" rx="1" fill="#2c3036" />
        {/* exhaust stack */}
        <rect x="399" y="378" width="5" height="20" rx="2" fill="#6b7178" stroke="#3a3f45" strokeWidth="1" />

        {/* drum support frame + rollers */}
        <line x1="300" y1="420" x2="314" y2="392" stroke="#3a3f45" strokeWidth="5" />
        <line x1="396" y1="420" x2="392" y2="392" stroke="#3a3f45" strokeWidth="5" />
        <circle cx="312" cy="420" r="5" fill="#5d646d" stroke="#2c3036" strokeWidth="1.5" />
        <circle cx="392" cy="420" r="5" fill="#5d646d" stroke="#2c3036" strokeWidth="1.5" />

        {/* water tank */}
        <ellipse cx="300" cy="400" rx="9" ry="13" fill="#6b7178" stroke="#3a3f45" strokeWidth="1.5" />

        {/* rotating mixer drum (tilted barrel) */}
        <g transform="translate(354 396) rotate(-16)">
          {/* barrel body */}
          <ellipse cx="0" cy="0" rx="48" ry="29" fill="url(#rmcDrum)" stroke="#7a818a" strokeWidth="2" />
          {/* spinning spiral fins (clipped) */}
          <g clipPath="url(#drumClip)">
            <g className="rmc-drum" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path
                  key={a}
                  d={`M0 0 Q ${30 * Math.cos(((a + 20) * Math.PI) / 180)} ${20 * Math.sin(((a + 20) * Math.PI) / 180)} ${48 * Math.cos((a * Math.PI) / 180)} ${29 * Math.sin((a * Math.PI) / 180)}`}
                  fill="none"
                  stroke="#cfd5db"
                  strokeWidth="2.5"
                />
              ))}
            </g>
          </g>
          {/* rim rings for 3D */}
          <ellipse cx="0" cy="0" rx="48" ry="29" fill="none" stroke="#9aa3ad" strokeWidth="1.5" />
          <ellipse cx="-16" cy="0" rx="34" ry="29" fill="none" stroke="#aab2bb" strokeWidth="1.5" opacity="0.7" />
          <ellipse cx="14" cy="0" rx="34" ry="29" fill="none" stroke="#aab2bb" strokeWidth="1.5" opacity="0.7" />
          {/* charging cone (back) */}
          <ellipse cx="-46" cy="0" rx="9" ry="17" fill="#9aa3ad" stroke="#5d646d" strokeWidth="1.5" />
          {/* discharge chute toward the crane bucket */}
          <path d="M-48 8 l-26 18 l5 7 l25 -15 Z" fill="url(#craneSteel)" stroke="#7a4a10" strokeWidth="1.5" />
          <line x1="-74" y1="26" x2="-80" y2="33" stroke="#3a3f45" strokeWidth="2" />
        </g>

        {/* ladder to drum */}
        <g stroke="#6b7178" strokeWidth="1.5">
          <line x1="376" y1="420" x2="382" y2="396" />
          <line x1="382" y1="420" x2="388" y2="396" />
          <line x1="378" y1="414" x2="385" y2="414" />
          <line x1="380" y1="406" x2="386" y2="406" />
        </g>

        {/* wheels — single front, dual rear */}
        {[
          { cx: 300, dual: true },
          { cx: 326, dual: true },
          { cx: 412, dual: false },
        ].map(({ cx, dual }) => (
          <g key={cx}>
            <circle cx={cx} cy="434" r="13" fill="url(#rmcTyre)" stroke="#000" strokeWidth="1.5" />
            <circle cx={cx} cy="434" r="6" fill="#5d646d" stroke="#2c3036" strokeWidth="1" />
            <circle cx={cx} cy="434" r="2" fill="#23272c" />
            {dual && <circle cx={cx + 13} cy="434" r="13" fill="url(#rmcTyre)" stroke="#000" strokeWidth="1.5" />}
          </g>
        ))}
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
