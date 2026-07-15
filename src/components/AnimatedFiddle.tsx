/** Realistic fiddle with a bow stroking across the strings. */
export function AnimatedFiddle() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="show-fiddle" aria-hidden="true">
      <div className="show-fiddle__stage">
        <img
          className="show-fiddle__img"
          src={`${base}fiddle-clear.png`}
          alt=""
          width={115}
          height={239}
        />
        {/* Violin bow: stick, hair, frog, and tip */}
        <svg
          className="show-fiddle__bow"
          viewBox="0 0 140 28"
          width="140"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stick with gentle camber */}
          <path
            d="M18 11 C48 7, 92 7, 122 11"
            stroke="#b8893a"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M18 10.2 C48 6.4, 92 6.4, 122 10.2"
            stroke="#e8c76a"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Horsehair */}
          <path
            d="M22 18 C50 15.5, 90 15.5, 118 18"
            stroke="#f3ead6"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Hair ribbon fill between stick and hair */}
          <path
            d="M22 12 C50 8.5, 90 8.5, 118 12 L118 18 C90 15.5, 50 15.5, 22 18 Z"
            fill="rgba(243, 234, 214, 0.28)"
          />
          {/* Frog (handle) */}
          <rect x="4" y="8" width="16" height="12" rx="2.2" fill="#f3ead6" />
          <rect x="6" y="10" width="12" height="8" rx="1.4" fill="#c9a84a" />
          <circle cx="8" cy="14" r="1.3" fill="#f3ead6" />
          {/* Tip — classic head, not an arrow */}
          <path
            d="M118 9.5
               L126 8.5
               L130 11.5
               L126 16.5
               L118 17.5
               Z"
            fill="#d4a84a"
          />
          <path
            d="M120 10.5 L125 10 L128 12 L125 15.5 L120 16"
            fill="#f0d078"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  )
}
