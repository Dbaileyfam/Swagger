/** Highland cow decoration — soft sway/bob for the Longs Peak row. */
export function HighlandCow() {
  return (
    <div className="highland-cow" aria-hidden="true">
      <img
        className="highland-cow__img"
        src={`${import.meta.env.BASE_URL}highland-cow.png`}
        alt=""
        width={234}
        height={186}
      />
    </div>
  )
}
