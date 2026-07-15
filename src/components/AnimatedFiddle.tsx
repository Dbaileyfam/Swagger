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
          width={178}
          height={252}
        />
        {/* Bow: hair rides across the strings near the bridge */}
        <svg
          className="show-fiddle__bow"
          viewBox="0 0 120 24"
          width="120"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12 H114"
            stroke="#d8b45a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M8 12 H112"
            stroke="#f3ead6"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* frog */}
          <rect x="2" y="7" width="10" height="10" rx="2" fill="#f3ead6" />
          {/* tip */}
          <path d="M110 7 L118 12 L110 17 Z" fill="#e4c76b" />
        </svg>
      </div>
    </div>
  )
}
