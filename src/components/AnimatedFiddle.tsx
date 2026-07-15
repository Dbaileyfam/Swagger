/** Decorative cream line-art fiddle with a soft bowing motion. */
export function AnimatedFiddle() {
  return (
    <div className="show-fiddle" aria-hidden="true">
      <svg
        className="show-fiddle__art"
        viewBox="0 0 64 160"
        width="64"
        height="160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <path
          className="show-fiddle__body"
          d="M22 78
             C14 78 10 86 12 96
             C14 108 22 114 32 114
             C42 114 50 108 52 96
             C54 86 50 78 42 78
             C48 72 50 64 46 58
             C42 52 36 50 32 50
             C28 50 22 52 18 58
             C14 64 16 72 22 78 Z"
          fill="rgba(201, 168, 74, 0.22)"
          stroke="#f3ead6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* F-holes */}
        <path
          d="M24 88 C22 92 24 98 26 100"
          stroke="#f3ead6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M40 88 C42 92 40 98 38 100"
          stroke="#f3ead6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bridge */}
        <path
          d="M26 92 H38"
          stroke="#e4c76b"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Neck */}
        <rect
          x="28"
          y="22"
          width="8"
          height="30"
          rx="1.5"
          fill="rgba(201, 168, 74, 0.28)"
          stroke="#f3ead6"
          strokeWidth="1.6"
        />
        {/* Pegbox / scroll */}
        <path
          d="M28 22
             C26 16 28 10 34 8
             C40 6 44 12 40 16
             C38 18 36 18 36 22"
          fill="rgba(201, 168, 74, 0.25)"
          stroke="#f3ead6"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Pegs */}
        <circle cx="30" cy="14" r="1.6" fill="#e4c76b" />
        <circle cx="38" cy="12" r="1.6" fill="#e4c76b" />
        {/* Strings */}
        <path d="M30 22 V92" stroke="#f3ead6" strokeWidth="0.9" opacity="0.75" />
        <path d="M32.7 22 V92" stroke="#f3ead6" strokeWidth="0.9" opacity="0.75" />
        <path d="M35.3 22 V92" stroke="#f3ead6" strokeWidth="0.9" opacity="0.75" />
        {/* Tailpiece */}
        <path
          d="M28 114 L32 128 L36 114"
          stroke="#f3ead6"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="rgba(201, 168, 74, 0.2)"
        />
        {/* Chin rest hint */}
        <path
          d="M40 108 C46 110 48 116 44 118"
          stroke="#f3ead6"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Bow */}
        <g className="show-fiddle__bow">
          <path
            d="M8 40 L56 100"
            stroke="#e4c76b"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M10 42 L54 98"
            stroke="#f3ead6"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M6 38 L10 42"
            stroke="#f3ead6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M54 98 L58 102"
            stroke="#f3ead6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}
