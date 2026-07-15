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
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M18 10.2 C48 6.4, 92 6.4, 122 10.2"
            stroke="#e8c76a"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Horsehair */}
          <path
            d="M22 19 C50 16.2, 90 16.2, 118 19"
            stroke="#f3ead6"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.92"
          />
          {/* Hair ribbon fill between stick and hair */}
          <path
            d="M22 12.5 C50 8.8, 90 8.8, 118 12.5 L118 19 C90 16.2, 50 16.2, 22 19 Z"
            fill="rgba(243, 234, 214, 0.32)"
          />
          {/* Frog (handle) */}
          <rect x="2" y="7" width="18" height="14" rx="2.4" fill="#f3ead6" />
          <rect x="5" y="9.5" width="13" height="9" rx="1.5" fill="#c9a84a" />
          <circle cx="8" cy="14" r="1.5" fill="#f3ead6" />
          {/* Tip — classic head, not an arrow */}
          <path
            d="M118 9
               L128 7.5
               L133 12
               L128 18
               L118 18.5
               Z"
            fill="#d4a84a"
          />
          <path
            d="M120 10.5 L126 9.5 L130 12.5 L126 16.5 L120 17"
            fill="#f0d078"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  )
}
