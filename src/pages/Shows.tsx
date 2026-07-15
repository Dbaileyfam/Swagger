import { AnimatedFiddle } from '../components/AnimatedFiddle'
import { CelticButton } from '../components/CelticButton'
import { CheersToast, SlainteMark } from '../components/CheersToast'
import { HighlandCow } from '../components/HighlandCow'
import { formatShowDate, pastShows, upcomingShows } from '../data/band'

function ShowDate({ iso }: { iso: string }) {
  const d = new Date(`${iso}T12:00:00`)
  return (
    <div className="show-card__date-block">
      <div className="show-card__month">
        {d.toLocaleDateString('en-US', { month: 'short' })}
      </div>
      <div className="show-card__day">{d.getDate()}</div>
      <div className="show-card__year">{d.getFullYear()}</div>
    </div>
  )
}

export function Shows() {
  const upcoming = upcomingShows()
  const past = pastShows()

  return (
    <div className="shows-page">
      <header className="page-hero">
        <p className="section-label">Tour</p>
        <h1 className="section-title">Upcoming Shows</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Festivals, highland games, and concert series across the Mountain West and beyond.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner shows-section">
          <CheersToast />
          <div className="shows-list">
            {upcoming.map((show) => (
              <article
                className={[
                  'show-card',
                  show.id === 'snowbasin-2026' ? 'show-card--slainte' : '',
                  show.id === 'bitterroot-16-2026' ? 'show-card--fiddle' : '',
                  show.id === 'longs-peak-13-2026' ? 'show-card--cow' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={show.id}
              >
                {show.id === 'bitterroot-16-2026' ? <AnimatedFiddle /> : null}
                <ShowDate iso={show.date} />
                <div>
                  <h3 className="show-card__event">{show.event}</h3>
                  <p className="show-card__meta">
                    {show.venue}
                    <br />
                    {show.city}, {show.state}
                    {show.time !== 'TBD' ? ` · ${show.time}` : ''}
                  </p>
                  <p className="show-card__meta" style={{ marginTop: '0.35rem', opacity: 0.7 }}>
                    {formatShowDate(show.date)}
                  </p>
                </div>
                {show.id === 'snowbasin-2026' ? <SlainteMark /> : null}
                {show.id === 'longs-peak-13-2026' ? <HighlandCow /> : null}
              </article>
            ))}
          </div>

          <h2
            className="section-title"
            style={{ fontSize: '1.4rem', margin: '3.5rem 0 1.5rem' }}
          >
            Recently played
          </h2>
          <div className="shows-list">
            {past.map((show) => (
              <article className="show-card" key={show.id} style={{ opacity: 0.7 }}>
                <ShowDate iso={show.date} />
                <div>
                  <h3 className="show-card__event">{show.event}</h3>
                  <p className="show-card__meta">
                    {show.venue} · {show.city}, {show.state}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="btn-row" style={{ marginTop: '2.5rem' }}>
            <CelticButton to="/contact">
              Book a
              <br />
              Show
            </CelticButton>
          </div>
        </div>
      </section>
    </div>
  )
}
