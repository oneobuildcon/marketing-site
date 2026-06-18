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

        {/* feet + pads */}
        <rect x="100" y="424" width="100" height="8" rx="2" fill="url(#rmcChassis)" />
        <rect x="98" y="430" width="22" height="6" rx="2" fill="#23272c" />
        <rect x="180" y="430" width="22" height="6" rx="2" fill="#23272c" />
        {/* mast post + highlight edge */}
        <rect x="144" y="150" width="12" height="276" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2" />
        <rect x="145" y="152" width="2.5" height="272" fill="#ffe1a0" opacity="0.6" />
        {/* mast lattice */}
        <g stroke="#9a5e0c" strokeWidth="2">
          {[176, 208, 240, 272, 304, 336, 368, 400].map((y) => (
            <line key={y} x1="146" y1={y} x2="154" y2={y} />
          ))}
        </g>
        <g stroke="#c4760f" strokeWidth="1.5">
          {[176, 208, 240, 272, 304, 336, 368].map((y) => (
            <g key={y}>
              <line x1="146" y1={y} x2="154" y2={y + 32} />
              <line x1="154" y1={y} x2="146" y2={y + 32} />
            </g>
          ))}
        </g>
        {/* angled back stay (lattice) */}
        <line x1="150" y1="170" x2="106" y2="424" stroke="url(#craneSteel)" strokeWidth="8" strokeLinecap="round" />
        <line x1="151" y1="172" x2="108" y2="420" stroke="#ffe1a0" strokeWidth="2" opacity="0.5" />
        <g stroke="#9a5e0c" strokeWidth="2">
          <line x1="138" y1="318" x2="150" y2="306" />
          <line x1="126" y1="372" x2="150" y2="356" />
        </g>

        {/* king post + pendant ties */}
        <line x1="150" y1="150" x2="150" y2="124" stroke="url(#craneSteel)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="150" cy="124" r="3.5" fill="#9a5e0c" />
        <g stroke="#caa24a" strokeWidth="2.5">
          <line x1="150" y1="126" x2="232" y2="126" />
          <line x1="150" y1="126" x2="304" y2="112" />
        </g>

        {/* jib arm — dense steel truss */}
        <line x1="150" y1="152" x2="306" y2="112" stroke="#c4760f" strokeWidth="6" />
        <line x1="151" y1="151" x2="305" y2="111" stroke="#ffe1a0" strokeWidth="1.5" opacity="0.5" />
        <line x1="150" y1="166" x2="298" y2="122" stroke="#c4760f" strokeWidth="5" />
        <g stroke="#f0a836" strokeWidth="2.5">
          {/* verticals */}
          <line x1="180" y1="144" x2="180" y2="157" />
          <line x1="210" y1="137" x2="210" y2="148" />
          <line x1="240" y1="129" x2="240" y2="139" />
          <line x1="270" y1="121" x2="270" y2="130" />
          {/* zig-zag web */}
          <line x1="150" y1="166" x2="180" y2="144" />
          <line x1="180" y1="157" x2="210" y2="137" />
          <line x1="210" y1="148" x2="240" y2="129" />
          <line x1="240" y1="139" x2="270" y2="121" />
          <line x1="270" y1="130" x2="300" y2="113" />
        </g>
        {/* joint bolt gussets */}
        <g fill="#7a4a10">
          <circle cx="150" cy="152" r="3" />
          <circle cx="150" cy="166" r="3" />
          <circle cx="232" cy="126" r="2.5" />
        </g>
        {/* tip pulley */}
        <circle cx="305" cy="113" r="6" fill="#5d646d" stroke="#2c3036" strokeWidth="1.5" />
        <circle cx="305" cy="113" r="2.5" fill="#23272c" />

        {/* electric winch assembly at base */}
        <rect x="110" y="406" width="48" height="8" rx="2" fill="url(#rmcChassis)" stroke="#23272c" strokeWidth="1" />
        {/* motor housing with cooling ribs */}
        <rect x="112" y="384" width="24" height="23" rx="3" fill="url(#rmcChassis)" stroke="#23272c" strokeWidth="1.5" />
        <g stroke="#23272c" strokeWidth="1">
          <line x1="116" y1="386" x2="116" y2="405" />
          <line x1="120" y1="386" x2="120" y2="405" />
          <line x1="124" y1="386" x2="124" y2="405" />
          <line x1="128" y1="386" x2="128" y2="405" />
        </g>
        {/* cable drum with coil wraps */}
        <circle cx="147" cy="396" r="10" fill="#6b7178" stroke="#23272c" strokeWidth="1.5" />
        <g stroke="#3a3f45" strokeWidth="1" fill="none">
          <circle cx="147" cy="396" r="7" />
          <circle cx="147" cy="396" r="4.5" />
        </g>
        {/* control box */}
        <rect x="150" y="388" width="9" height="13" rx="1.5" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="1" />
        {/* hoist cable up the mast to jib tip */}
        <line x1="147" y1="386" x2="150" y2="152" stroke="#6b7178" strokeWidth="1.5" />

        {/* suspended concrete bucket (gently swings) */}
        <g className="crane-load" style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}>
          <line x1="305" y1="115" x2="305" y2="246" stroke="#3f454c" strokeWidth="2" />
          {/* hook block */}
          <rect x="300" y="246" width="10" height="11" rx="2" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="1.5" />
          <path d="M305 257 q-6 5 0 10 q6 -5 0 -10" fill="none" stroke="#3f454c" strokeWidth="2" />
          {/* rigging slings */}
          <line x1="285" y1="270" x2="305" y2="259" stroke="#3f454c" strokeWidth="1.8" />
          <line x1="325" y1="270" x2="305" y2="259" stroke="#3f454c" strokeWidth="1.8" />
          {/* skip bucket */}
          <path d="M285 270 h40 l-6 30 h-28 Z" fill="url(#craneConcrete)" stroke="#3f454c" strokeWidth="2" />
          <ellipse cx="305" cy="270" rx="20" ry="4" fill="#7a818a" stroke="#3f454c" strokeWidth="1.5" />
          {/* wet concrete inside */}
          <ellipse cx="305" cy="270" rx="15" ry="2.5" fill="#4a5159" />
        </g>

        {/* ═══ SINGLE-BAG SITE MIXER (right) ═══ */}
        <ellipse cx="330" cy="432" rx="76" ry="6" fill="#000" opacity="0.2" />

        {/* two big spoked wheels with tyre tread */}
        {[300, 366].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="408" r="23" fill="url(#rmcTyre)" stroke="#000" strokeWidth="2" />
            {/* tread ticks */}
            <g stroke="#0c0e10" strokeWidth="2">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
                <line key={a}
                  x1={cx + 20 * Math.cos((a * Math.PI) / 180)} y1={408 + 20 * Math.sin((a * Math.PI) / 180)}
                  x2={cx + 23 * Math.cos((a * Math.PI) / 180)} y2={408 + 23 * Math.sin((a * Math.PI) / 180)} />
              ))}
            </g>
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

        {/* axle + A-frame stand + gussets */}
        <g stroke="url(#rmcChassis)" strokeWidth="7" strokeLinecap="round">
          <line x1="300" y1="408" x2="366" y2="408" />
          <line x1="312" y1="406" x2="330" y2="364" />
          <line x1="356" y1="406" x2="338" y2="364" />
        </g>
        <rect x="322" y="360" width="26" height="10" rx="3" fill="#3a3f45" />
        <g fill="#23272c">
          <circle cx="312" cy="406" r="2.5" />
          <circle cx="356" cy="406" r="2.5" />
        </g>
        {/* tow handle */}
        <line x1="290" y1="406" x2="262" y2="418" stroke="url(#rmcChassis)" strokeWidth="5" strokeLinecap="round" />
        <rect x="254" y="414" width="12" height="6" rx="3" fill="#2c3036" />

        {/* diesel engine + belt drive */}
        <rect x="296" y="378" width="24" height="20" rx="3" fill="url(#rmcChassis)" stroke="#23272c" strokeWidth="1.5" />
        <g stroke="#23272c" strokeWidth="1">
          <line x1="300" y1="380" x2="300" y2="396" />
          <line x1="304" y1="380" x2="304" y2="396" />
          <line x1="308" y1="380" x2="308" y2="396" />
        </g>
        <circle cx="316" cy="388" r="5" fill="#6b7178" stroke="#23272c" strokeWidth="1.5" />
        {/* drive belt to drum */}
        <line x1="320" y1="384" x2="330" y2="368" stroke="#23272c" strokeWidth="2" />
        <line x1="320" y1="392" x2="332" y2="372" stroke="#23272c" strokeWidth="2" />

        {/* tilting drum (amber, rotating) */}
        <g transform="translate(334 352) rotate(-24)">
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="url(#craneSteel)" stroke="#9a5e0c" strokeWidth="2.5" />
          {/* highlight sheen */}
          <ellipse cx="-6" cy="-9" rx="20" ry="9" fill="#ffe1a0" opacity="0.35" />
          <g clipPath="url(#drumClip)">
            <g className="rmc-drum" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path key={a}
                  d={`M0 0 Q ${24 * Math.cos(((a + 22) * Math.PI) / 180)} ${20 * Math.sin(((a + 22) * Math.PI) / 180)} ${40 * Math.cos((a * Math.PI) / 180)} ${30 * Math.sin((a * Math.PI) / 180)}`}
                  fill="none" stroke="#b56a0c" strokeWidth="2.5" />
              ))}
            </g>
          </g>
          {/* reinforcing bands */}
          <ellipse cx="0" cy="0" rx="40" ry="30" fill="none" stroke="#ffd27a" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx="-9" cy="0" rx="30" ry="30" fill="none" stroke="#9a5e0c" strokeWidth="2" opacity="0.55" />
          <ellipse cx="9" cy="0" rx="30" ry="30" fill="none" stroke="#9a5e0c" strokeWidth="2" opacity="0.55" />
          {/* rivets around rim */}
          <g fill="#7a4a10">
            {[20, 60, 100, 140, 220, 260, 300, 340].map((a) => (
              <circle key={a} cx={38 * Math.cos((a * Math.PI) / 180)} cy={28 * Math.sin((a * Math.PI) / 180)} r="1.6" />
            ))}
          </g>
          {/* open mouth */}
          <ellipse cx="32" cy="0" rx="10" ry="21" fill="#5a3a0a" stroke="#9a5e0c" strokeWidth="2" />
          <ellipse cx="32" cy="0" rx="5.5" ry="14" fill="#3f2a08" />
        </g>

        {/* tilt hand-wheel */}
        <g transform="translate(368 374)">
          <circle r="12" fill="none" stroke="#5d646d" strokeWidth="3" />
          <g stroke="#5d646d" strokeWidth="2">
            <line x1="-10" y1="0" x2="10" y2="0" />
            <line x1="0" y1="-10" x2="0" y2="10" />
            <line x1="-7" y1="-7" x2="7" y2="7" />
            <line x1="-7" y1="7" x2="7" y2="-7" />
          </g>
          <circle r="3.5" fill="#3a3f45" />
        </g>
      </g>
    </svg>
  );
}
