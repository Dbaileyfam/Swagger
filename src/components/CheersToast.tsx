/** Decorative toasting pints — cream line art to match the Media ship. */
export function CheersToast() {
  return (
    <div className="shows-cheers" aria-hidden="true">
      <svg
        className="shows-cheers__spark-layer"
        viewBox="0 0 220 160"
        width="220"
        height="160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="shows-cheers__sparks">
          <circle cx="110" cy="52" r="2.2" fill="#f3ead6" />
          <circle cx="98" cy="44" r="1.4" fill="#e4c76b" />
          <circle cx="122" cy="46" r="1.5" fill="#e4c76b" />
          <circle cx="104" cy="58" r="1.1" fill="#b8e0b8" />
          <circle cx="116" cy="60" r="1.1" fill="#b8e0b8" />
          <path
            d="M110 38 L111.2 44 L117 45 L112.4 48.5 L114 54 L110 50.5 L106 54 L107.6 48.5 L103 45 L108.8 44 Z"
            fill="#e4c76b"
            opacity="0.9"
          />
        </g>
      </svg>

      <svg
        className="shows-cheers__pint shows-cheers__pint--left"
        viewBox="0 0 120 160"
        width="120"
        height="160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cheers-beer-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c76a" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#c9a84a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8a7340" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="cheers-foam-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f1e2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e8d9b0" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M42 58 C42 58 44 118 48 128 C52 138 62 142 74 142 C86 142 96 138 100 128 C104 118 106 58 106 58 Z"
          fill="url(#cheers-beer-l)"
        />
        <path
          d="M40 52 C46 42 58 40 68 44 C74 38 86 38 96 44 C104 48 108 54 108 54 L40 54 Z"
          fill="url(#cheers-foam-l)"
        />
        <path
          d="M40 50 L46 128 C48 138 58 146 74 146 C90 146 100 138 102 128 L108 50"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 50 C48 46 64 44 74 44 C84 44 100 46 110 50"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M40 68 C24 72 22 108 40 114"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M54 62 L56 126"
          stroke="#f3ead6"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>

      <svg
        className="shows-cheers__pint shows-cheers__pint--right"
        viewBox="0 0 120 160"
        width="120"
        height="160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cheers-beer-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c76a" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#c9a84a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8a7340" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="cheers-foam-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7f1e2" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e8d9b0" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M14 58 C14 58 16 118 20 128 C24 138 34 142 46 142 C58 142 68 138 72 128 C76 118 78 58 78 58 Z"
          fill="url(#cheers-beer-r)"
        />
        <path
          d="M12 52 C18 42 30 40 40 44 C46 38 58 38 68 44 C76 48 80 54 80 54 L12 54 Z"
          fill="url(#cheers-foam-r)"
        />
        <path
          d="M12 50 L18 128 C20 138 30 146 46 146 C62 146 72 138 74 128 L80 50"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 50 C20 46 36 44 46 44 C56 44 72 46 82 50"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M80 68 C96 72 98 108 80 114"
          stroke="#f3ead6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M64 62 L62 126"
          stroke="#f3ead6"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    </div>
  )
}
