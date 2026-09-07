import { AnimatedFiddle } from '../components/AnimatedFiddle'
import { CelticButton } from '../components/CelticButton'
import { CelticMark } from '../components/CelticMark'
import { CheersToast, SlainteMark } from '../components/CheersToast'
import { HighlandCow } from '../components/HighlandCow'
import { SocialCelticLinks } from '../components/SocialCelticLinks'
import { formatShowDate, pastShows, showDirectionsHref, showMapEmbedSrc, upcomingShows, type Show } from '../data/band'

function ShowDate({ dates }: { dates: string[] }) {
  const first = new Date(`${dates[0]}T12:00:00`)
  const last = dates.length > 1 ? new Date(`${dates[dates.length - 1]}T12:00:00`) : null
  const sameMonth =
    last != null &&
    first.getMonth() === last.getMonth() &&
    first.getFullYear() === last.getFullYear()
  const day =
    last && sameMonth
      ? `${first.getDate()}–${last.getDate()}`
      : last
        ? `${first.getDate()}–${last.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : String(first.getDate())

  return (
    <div className="show-card__date-block">
      <div className="show-card__month">
        {first.toLocaleDateString('en-US', { month: 'short' })}
      </div>
      <div className={`show-card__day${last ? ' show-card__day--range' : ''}`}>{day}</div>
      <div className="show-card__year">{first.getFullYear()}</div>
    </div>
  )
}

function showPlace(show: Show) {
  const place = [show.city, show.state].filter(Boolean).join(', ')
  return [show.venue, place].filter(Boolean).join(' · ')
}

function showsByYear(shows: Show[]) {
  const groups: { year: string; shows: Show[] }[] = []
  for (const show of shows) {
    const year = show.date.slice(0, 4)
    const last = groups.at(-1)
    if (last?.year === year) last.shows.push(show)
    else groups.push({ year, shows: [show] })
  }
  return groups
}

function groupConsecutiveShows(shows: Show[]) {
  const groups: Show[][] = []
  for (const show of shows) {
    const previous = groups.at(-1)?.at(-1)
    if (
      previous &&
      previous.event === show.event &&
      previous.venue === show.venue &&
      previous.city === show.city &&
      previous.state === show.state
    ) {
      groups.at(-1)!.push(show)
    } else {
      groups.push([show])
    }
  }
  return groups
}

function formatShowDateRange(dates: string[]) {
  if (dates.length === 1) return formatShowDate(dates[0])

  const first = new Date(`${dates[0]}T12:00:00`)
  const last = new Date(`${dates[dates.length - 1]}T12:00:00`)
  return `${first.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })} – ${last.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`
}

function showGroupTime(shows: Show[]) {
  const times = shows.map((show) => show.time)
  if (times.every((time) => time === 'TBD')) return ''
  if (times.every((time) => time === times[0])) return ` · ${times[0]}`
  return ''
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

function UpcomingShowCard({
  shows,
  showMap,
}: {
  shows: Show[]
  showMap: boolean
}) {
  const show = shows[0]
  const dates = shows.map((item) => item.date)
  const ids = new Set(shows.map((item) => item.id))
  const poster = shows.find((item) => item.poster)?.poster

  return (
    <article
      className={[
        'show-card',
        ids.has('snowbasin-2026') ? 'show-card--slainte' : '',
        ids.has('bitterroot-16-2026') ? 'show-card--fiddle' : '',
        ids.has('longs-peak-13-2026') ? 'show-card--cow' : '',
        ids.has('vegas-11-2026') ? 'show-card--celtic' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {ids.has('bitterroot-16-2026') ? <AnimatedFiddle /> : null}
      {ids.has('vegas-11-2026') ? <CelticMark /> : null}
      <ShowDate dates={dates} />
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
          {showGroupTime(shows)}
        </p>
        <p className="show-card__meta" style={{ marginTop: '0.35rem', opacity: 0.7 }}>
          {formatShowDateRange(dates)}
        </p>
        <ShowLinks show={show} />
        {poster ? (
          <a
            className="show-card__poster"
            href={`${import.meta.env.BASE_URL}${poster}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`${import.meta.env.BASE_URL}${poster}`}
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
      {ids.has('snowbasin-2026') ? <SlainteMark /> : null}
      {ids.has('longs-peak-13-2026') ? <HighlandCow /> : null}
    </article>
  )
}

export function Shows() {
  const upcomingByYear = showsByYear(upcomingShows())
  const pastByYear = showsByYear(pastShows())

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
          {upcomingByYear.map((yearGroup) => (
            <div className="shows-year-block" key={yearGroup.year}>
              <h2 className="show-year">{yearGroup.year}</h2>
              <div className="shows-list">
                {groupConsecutiveShows(yearGroup.shows).map((group, index, groups) => {
                  const previous = groups[index - 1]?.[0]
                  const showMap =
                    !previous || showVenueKey(previous) !== showVenueKey(group[0])
                  return (
                    <UpcomingShowCard
                      key={group[0].id}
                      shows={group}
                      showMap={showMap}
                    />
                  )
                })}
              </div>
            </div>
          ))}

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
                    <ShowDate dates={[show.date]} />
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
