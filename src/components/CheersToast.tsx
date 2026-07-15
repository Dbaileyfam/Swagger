/** Toasting pilsner glasses with SLÁINTE (fada on á). */
export function CheersToast() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="shows-cheers" aria-hidden="true">
      <svg
        className="shows-cheers__label"
        viewBox="0 0 340 78"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <path id="slainte-arc" d="M 24 64 Q 170 6 316 64" fill="none" />
        </defs>
        <text className="shows-cheers__label-outline">
          <textPath href="#slainte-arc" startOffset="50%" textAnchor="middle">
            SLÁINTE
          </textPath>
        </text>
        <text className="shows-cheers__label-fill">
          <textPath href="#slainte-arc" startOffset="50%" textAnchor="middle">
            SLÁINTE
          </textPath>
        </text>
      </svg>

      <div className="shows-cheers__stage">
        <img
          className="shows-cheers__glass shows-cheers__glass--left"
          src={`${base}beer-pint.png`}
          alt=""
          width={125}
          height={227}
        />
        <img
          className="shows-cheers__glass shows-cheers__glass--right"
          src={`${base}beer-pint-flip.png`}
          alt=""
          width={125}
          height={227}
        />
      </div>
    </div>
  )
}
