/** Toasting Irish pint glasses — cream line art, classic nonic pints. */
function PintGlass({
  id,
  className,
}: {
  id: string
  className: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 170"
      width="90"
      height="170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-beer`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d078" stopOpacity="0.7" />
          <stop offset="40%" stopColor="#d4a84a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9a6e28" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${id}-foam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#e8d9b0" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Beer body — fills most of the pint */}
      <path
        d={`
          M22 48
          C20 58 18 72 20 86
          C22 102 24 118 26 132
          C28 142 34 148 45 148
          C56 148 62 142 64 132
          C66 118 68 102 70 86
          C72 72 70 58 68 48
          Z
        `}
        fill={`url(#${id}-beer)`}
      />

      {/* Bubbles */}
      <circle cx="34" cy="78" r="1.6" fill="#f3ead6" opacity="0.45" />
      <circle cx="42" cy="98" r="1.2" fill="#f3ead6" opacity="0.4" />
      <circle cx="52" cy="70" r="1.4" fill="#f3ead6" opacity="0.35" />
      <circle cx="38" cy="118" r="1.1" fill="#f3ead6" opacity="0.35" />
      <circle cx="56" cy="110" r="1.3" fill="#f3ead6" opacity="0.3" />

      {/* Foam head — thick pub pour, slightly overflowing */}
      <path
        d={`
          M18 42
          C22 30 32 26 40 30
          C46 24 56 24 64 30
          C70 28 76 34 78 40
          C80 46 76 50 70 50
          L20 50
          C16 50 15 46 18 42
          Z
        `}
        fill={`url(#${id}-foam)`}
      />
      {/* Foam drip */}
      <path
        d="M70 48 C74 52 76 60 74 68 C72 62 70 56 68 52"
        fill="#fffaf0"
        opacity="0.75"
      />

      {/* Glass outline — classic nonic pint (bulge under rim) */}
      <path
        d={`
          M20 40
          C18 48 16 56 18 66
          C20 78 26 84 28 92
          C30 102 26 118 28 132
          C30 146 36 156 45 156
          C54 156 60 146 62 132
          C64 118 60 102 62 92
          C64 84 70 78 72 66
          C74 56 72 48 70 40
        `}
        stroke="#f3ead6"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rim */}
      <ellipse
        cx="45"
        cy="40"
        rx="26"
        ry="5.5"
        stroke="#f3ead6"
        strokeWidth="2.15"
      />

      {/* Base foot */}
      <path
        d="M28 156 C34 160 40 162 45 162 C50 162 56 160 62 156"
        stroke="#f3ead6"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="156"
        x2="64"
        y2="156"
        stroke="#f3ead6"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Glass highlight */}
      <path
        d="M30 52 C28 70 30 100 32 130"
        stroke="#f3ead6"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

export function CheersToast() {
  return (
    <div className="shows-cheers" aria-hidden="true">
      <svg
        className="shows-cheers__spark-layer"
        viewBox="0 0 200 180"
        width="200"
        height="180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="shows-cheers__sparks">
          <circle cx="100" cy="36" r="2.4" fill="#f3ead6" />
          <circle cx="88" cy="28" r="1.5" fill="#e4c76b" />
          <circle cx="112" cy="30" r="1.6" fill="#e4c76b" />
          <circle cx="94" cy="44" r="1.2" fill="#b8e0b8" />
          <circle cx="106" cy="46" r="1.2" fill="#b8e0b8" />
          <path
            d="M100 18 L101.4 26 L108 27.2 L102.8 31.2 L104.6 38 L100 33.8 L95.4 38 L97.2 31.2 L92 27.2 L98.6 26 Z"
            fill="#e4c76b"
            opacity="0.95"
          />
        </g>
      </svg>

      <PintGlass id="cheers-l" className="shows-cheers__pint shows-cheers__pint--left" />
      <PintGlass id="cheers-r" className="shows-cheers__pint shows-cheers__pint--right" />
    </div>
  )
}
