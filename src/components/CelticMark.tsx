/** Animated green Celtic triquetra knot beside Oct 11. */
export function CelticMark() {
  return (
    <div className="celtic-mark" aria-hidden="true">
      <img
        className="celtic-mark__img"
        src={`${import.meta.env.BASE_URL}celtic-triquetra.png`}
        alt=""
        width={242}
        height={232}
      />
    </div>
  )
}
