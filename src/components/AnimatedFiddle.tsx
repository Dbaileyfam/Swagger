/** Realistic fiddle with a playing sway + bow stroke. */
export function AnimatedFiddle() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="show-fiddle" aria-hidden="true">
      <img
        className="show-fiddle__img"
        src={`${base}fiddle.png`}
        alt=""
        width={190}
        height={264}
      />
      <svg
        className="show-fiddle__bow"
        viewBox="0 0 40 120"
        width="40"
        height="120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 12 L32 108"
          stroke="#c9a84a"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M10 14 L30 106"
          stroke="#f3ead6"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path d="M6 10 L11 15" stroke="#f3ead6" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M29 105 L34 110" stroke="#f3ead6" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
