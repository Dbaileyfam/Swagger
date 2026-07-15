/** Toasting pilsner glasses — top-left decoration on Shows. */
export function CheersToast() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="shows-cheers" aria-hidden="true">
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

/** Spinning circular SLÁINTE — far right of Blues & Brews, past the content line. */
export function SlainteMark() {
  const base = import.meta.env.BASE_URL

  return (
    <div className="slainte-mark" aria-hidden="true">
      <div className="slainte-mark__spin">
        <img
          className="slainte-mark__ring"
          src={`${base}celtic-ring-weave.png`}
          alt=""
          width={320}
          height={320}
        />
        <span className="slainte-mark__text">
          SLÁ
          <br />
          INTE
        </span>
      </div>
    </div>
  )
}
