/** Clinking beer steins from the Sláinte artwork, labeled with correct fada on á. */
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
          className="shows-cheers__frame shows-cheers__frame--a"
          src={`${base}slainte-cheers-a.png`}
          alt=""
          width={264}
          height={273}
        />
        <img
          className="shows-cheers__frame shows-cheers__frame--b"
          src={`${base}slainte-cheers-b.png`}
          alt=""
          width={268}
          height={273}
        />
      </div>
    </div>
  )
}
