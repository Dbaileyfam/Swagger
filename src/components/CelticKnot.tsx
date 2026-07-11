export function CelticKnot({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="78" stroke="#c9a84a" strokeWidth="1.2" opacity="0.5" />
      <circle cx="100" cy="100" r="58" stroke="#c9a84a" strokeWidth="0.8" opacity="0.35" />
      <path
        d="M100 22 C140 55 140 145 100 178 C60 145 60 55 100 22 Z"
        stroke="#e4c76b"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path
        d="M22 100 C55 60 145 60 178 100 C145 140 55 140 22 100 Z"
        stroke="#e4c76b"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path
        d="M48 48 C90 70 110 130 152 152 C110 130 90 70 48 48 Z"
        stroke="#c9a84a"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        d="M152 48 C110 70 90 130 48 152 C90 130 110 70 152 48 Z"
        stroke="#c9a84a"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="100" cy="100" r="8" fill="#c9a84a" opacity="0.85" />
    </svg>
  )
}
