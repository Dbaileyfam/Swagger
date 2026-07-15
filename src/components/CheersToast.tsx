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

/** Animated SLÁINTE mark — sits on the Blues & Brews row, far right. */
export function SlainteMark() {
  return (
    <div className="slainte-mark" aria-hidden="true">
      <span className="slainte-mark__text">SLÁINTE</span>
    </div>
  )
}
