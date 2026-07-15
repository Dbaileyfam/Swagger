/** Animated Celtic triquetra — left gutter beside Oct 11. */
export function CelticMark() {
  return (
    <div className="celtic-mark" aria-hidden="true">
      <svg
        className="celtic-mark__art"
        viewBox="0 0 120 120"
        width="120"
        height="120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="celtic-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0d078" />
            <stop offset="55%" stopColor="#c9a84a" />
            <stop offset="100%" stopColor="#8a7340" />
          </linearGradient>
          <linearGradient id="celtic-green" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f9a52" />
            <stop offset="100%" stopColor="#7ed99a" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle
          className="celtic-mark__ring"
          cx="60"
          cy="60"
          r="54"
          stroke="url(#celtic-gold)"
          strokeWidth="3.2"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          stroke="#f3ead6"
          strokeWidth="1.2"
          opacity="0.55"
        />

        {/* Triquetra (trinity knot) */}
        <g className="celtic-mark__knot">
          <path
            d="M60 22
               C78 22 92 36 92 54
               C92 66 86 76 76 82
               C86 88 92 98 92 110
               C92 92 78 78 60 78
               C42 78 28 92 28 110
               C28 98 34 88 44 82
               C34 76 28 66 28 54
               C28 36 42 22 60 22 Z"
            fill="none"
            stroke="url(#celtic-green)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
          <path
            d="M60 28
               C74 28 86 40 86 54
               C86 64 81 72 73 77
               C81 82 86 90 86 100
               C86 86 74 76 60 76
               C46 76 34 86 34 100
               C34 90 39 82 47 77
               C39 72 34 64 34 54
               C34 40 46 28 60 28 Z"
            fill="none"
            stroke="url(#celtic-gold)"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Interlace arcs */}
          <path
            d="M44 54 C44 42 52 34 60 34 C68 34 76 42 76 54"
            stroke="#f3ead6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M47 78 C40 84 36 92 38 100"
            stroke="#f3ead6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M73 78 C80 84 84 92 82 100"
            stroke="#f3ead6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Center diamond spark */}
        <circle cx="60" cy="58" r="5" fill="url(#celtic-gold)" />
        <circle cx="60" cy="58" r="2.2" fill="#f3ead6" />
      </svg>
    </div>
  )
}
