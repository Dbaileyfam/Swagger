import { AnimatedFiddle } from '../components/AnimatedFiddle'
import { CelticButton } from '../components/CelticButton'
import { CelticMark } from '../components/CelticMark'
import { CheersToast, SlainteMark } from '../components/CheersToast'
import { HighlandCow } from '../components/HighlandCow'
import { SocialCelticLinks } from '../components/SocialCelticLinks'
import { formatShowDate, pastShows, showDirectionsHref, showMapEmbedSrc, upcomingShows, type Show } from '../data/band'

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

function showPlace(show: Show) {
  const place = [show.city, show.state].filter(Boolean).join(', ')
  return [show.venue, place].filter(Boolean).join(' · ')
}

function pastShowsByYear(shows: Show[]) {
  const groups: { year: string; shows: Show[] }[] = []
  for (const show of shows) {
    const year = show.date.slice(0, 4)
    const last = groups.at(-1)
    if (last?.year === year) last.shows.push(show)
    else groups.push({ year, shows: [show] })
  }
  return groups
}

function showVenueKey(show: Show) {
  return show.address || `${show.venue}|${show.city}|${show.state}`
}

function ShowLinks({ show }: { show: Show }) {
  const tickets = show.tickets && show.tickets !== show.href ? show.tickets : null
  const directions = showDirectionsHref(show)

  if (!show.href && !tickets && !show.address && !show.venue) return null

  return (
    <p className="show-card__actions">
      {show.href ? (
        <a href={show.href} target="_blank" rel="noreferrer">
          Event info
        </a>
      ) : null}
      {tickets ? (
        <a href={tickets} target="_blank" rel="noreferrer">
          Tickets
        </a>
      ) : null}
      <a href={directions} target="_blank" rel="noreferrer">
        Directions
      </a>
    </p>
  )
}

export function Shows() {
  const upcoming = upcomingShows()
  const pastByYear = pastShowsByYear(pastShows())

  return (
    <div className="shows-page">
      <header className="page-hero">
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
            {upcoming.map((show, index) => {
              const previous = upcoming[index - 1]
              const showMap = !previous || showVenueKey(previous) !== showVenueKey(show)
              return (
              <article
                className={[
                  'show-card',
                  show.id === 'snowbasin-2026' ? 'show-card--slainte' : '',
                  show.id === 'bitterroot-16-2026' ? 'show-card--fiddle' : '',
                  show.id === 'longs-peak-13-2026' ? 'show-card--cow' : '',
                  show.id === 'vegas-11-2026' ? 'show-card--celtic' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={show.id}
              >
                {show.id === 'bitterroot-16-2026' ? <AnimatedFiddle /> : null}
                {show.id === 'vegas-11-2026' ? <CelticMark /> : null}
                <ShowDate iso={show.date} />
                <div>
                  <h3 className="show-card__event">
                    {show.href ? (
                      <a href={show.href} target="_blank" rel="noreferrer">
                        {show.event}
                      </a>
                    ) : (
                      show.event
                    )}
                  </h3>
                  <p className="show-card__meta">
                    {show.venue}
                    <br />
                    {show.city}, {show.state}
                    {show.time !== 'TBD' ? ` · ${show.time}` : ''}
                  </p>
                  <p className="show-card__meta" style={{ marginTop: '0.35rem', opacity: 0.7 }}>
                    {formatShowDate(show.date)}
                  </p>
                  <ShowLinks show={show} />
                  {show.poster ? (
                    <a
                      className="show-card__poster"
                      href={`${import.meta.env.BASE_URL}${show.poster}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}${show.poster}`}
                        alt={`${show.event} poster`}
                      />
                    </a>
                  ) : null}
                  {showMap ? (
                    <div className="show-card__map">
                      <iframe
                        title={`Map to ${show.venue} in ${show.city}, ${show.state}`}
                        src={showMapEmbedSrc(show)}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : null}
                </div>
                {show.id === 'snowbasin-2026' ? <SlainteMark /> : null}
                {show.id === 'longs-peak-13-2026' ? <HighlandCow /> : null}
              </article>
              )
            })}
          </div>

          <h2
            className="section-title"
            style={{ fontSize: '1.4rem', margin: '3.5rem 0 1.5rem' }}
          >
            Past Shows
          </h2>
          {pastByYear.map((group) => (
            <div key={group.year}>
              <h3 className="show-year">{group.year}</h3>
              <div className="shows-list">
                {group.shows.map((show) => (
                  <article className="show-card show-card--past" key={show.id}>
                    <ShowDate iso={show.date} />
                    <div>
                      <h3 className="show-card__event">{show.event}</h3>
                      <p className="show-card__meta">{showPlace(show)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="btn-row" style={{ marginTop: '2.5rem' }}>
            <CelticButton to="/contact">
              Book a
              <br />
              Show
            </CelticButton>
          </div>

          <SocialCelticLinks className="celtic-links--shows" />
        </div>
      </section>
    </div>
  )
}
