import { useState } from 'react'
import { CelticButton } from '../components/CelticButton'
import { SocialCelticLinks } from '../components/SocialCelticLinks'
import { band, epkLogos, epkPhotos, mediaItems, stagePlots } from '../data/band'
import type { MediaItem } from '../data/band'

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function EpkVideo({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false)
  const id = item.youtubeId!

  return (
    <article className="media-tile media-tile--video">
      <div className="media-embed">
        {playing ? (
          <iframe
            title={item.title}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="media-embed__poster"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
            />
            <span className="media-embed__play" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="media-tile__body">
        <span className="media-tile__type">video</span>
        <h2 className="media-tile__title">{item.title}</h2>
        <p className="media-tile__desc">{item.description}</p>
      </div>
    </article>
  )
}

export function Epk() {
  const topVideos = mediaItems.filter((item) => item.type === 'video').slice(0, 3)
  const [activePlotId, setActivePlotId] = useState(stagePlots[0]?.id ?? 'plot-5')
  const activePlot = stagePlots.find((plot) => plot.id === activePlotId) ?? stagePlots[0]

  return (
    <>
      <header className="page-hero">
        <h1 className="section-title">Electronic Press Kit</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Bio, music, video, photos, and booking details for festivals, venues, and press.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner epk-layout">
          <div>
            <p className="section-label">Biography</p>
            <div className="epk-bio">
              <p>{band.epkBio}</p>
            </div>
          </div>

          <div className="epk-media">
            <p className="section-label">Listen</p>
            <div className="spotify-embed spotify-embed--compact">
              <div className="spotify-embed__frame spotify-embed__frame--compact">
                <iframe
                  data-testid="embed-iframe"
                  title="Swagger on Spotify"
                  src={band.spotifyEmbedCompact}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="section-label" style={{ marginTop: '2rem' }}>
              Press Photos
            </p>
            <div className="photo-grid">
              {epkPhotos.map((photo) => (
                <figure className="photo-tile" key={photo.id}>
                  <img
                    src={assetUrl(photo.image!)}
                    alt="Swagger press photo"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>

            <p className="section-label" style={{ marginTop: '2rem' }}>
              Logos &amp; Brand
            </p>
            <div className="photo-grid epk-logo-grid">
              {epkLogos.map((logo) => (
                <figure className="photo-tile epk-logo-tile" key={logo.id}>
                  <a
                    className="epk-logo-tile__link"
                    href={assetUrl(logo.image)}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    <span className="epk-logo-tile__frame">
                      <img
                        src={assetUrl(logo.image)}
                        alt={logo.title}
                        loading="lazy"
                      />
                    </span>
                    <figcaption>
                      <strong>{logo.title}</strong>
                      {logo.description}
                    </figcaption>
                  </a>
                </figure>
              ))}
            </div>

            <p className="section-label" style={{ marginTop: '2rem' }}>
              Featured Video
            </p>
            <div className="media-grid">
              {topVideos.map((item) => (
                <EpkVideo key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="epk-tech">
            <p className="section-label">Stage Plots &amp; Input Lists</p>
            <p className="epk-tech__lede">
              Download the PDF stage plot that matches the booked lineup, then use the matching
              input list below for FOH.
            </p>

            <div className="stage-plot-grid">
              {stagePlots.map((plot) => (
                <a
                  key={plot.id}
                  className={`stage-plot-card${activePlotId === plot.id ? ' stage-plot-card--active' : ''}`}
                  href={assetUrl(plot.file)}
                  target="_blank"
                  rel="noreferrer"
                  download
                  onClick={() => setActivePlotId(plot.id)}
                >
                  <span className="stage-plot-card__pieces">{plot.pieces}</span>
                  <strong className="stage-plot-card__title">{plot.title}</strong>
                  <span className="stage-plot-card__desc">{plot.description}</span>
                  <span className="stage-plot-card__action">Download PDF</span>
                </a>
              ))}
            </div>

            {activePlot && (
              <div className="input-list">
                <div className="input-list__header">
                  <h3>
                    Input List — {activePlot.title}
                    <span>{activePlot.pieces}</span>
                  </h3>
                  <div className="input-list__tabs" role="tablist" aria-label="Choose stage plot">
                    {stagePlots.map((plot) => (
                      <button
                        key={plot.id}
                        type="button"
                        role="tab"
                        aria-selected={activePlotId === plot.id}
                        className={`input-list__tab${activePlotId === plot.id ? ' input-list__tab--active' : ''}`}
                        onClick={() => setActivePlotId(plot.id)}
                      >
                        {plot.title.replace('Stage Plot ', 'Plot ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-list__table-wrap">
                  <table className="input-list__table">
                    <thead>
                      <tr>
                        <th scope="col">Ch</th>
                        <th scope="col">Source</th>
                        <th scope="col">Mic / DI</th>
                        <th scope="col">Stand</th>
                        <th scope="col">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePlot.inputs.map((row) => (
                        <tr key={`${activePlot.id}-${row.ch}`}>
                          <td>{row.ch}</td>
                          <td>{row.source}</td>
                          <td>{row.micDi}</td>
                          <td>{row.stand}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="input-list__notes">
                  {activePlot.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="epk-grid">
            <div className="epk-block">
              <h3>Lineup</h3>
              <ul>
                {band.members.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}</strong>
                    {m.role}
                  </li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Discography</h3>
              <ul>
                {band.albums.map((a) => (
                  <li key={a.title}>
                    <strong>{a.title}</strong>
                    {a.year}
                  </li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Shared the Stage With</h3>
              <ul>
                {band.sharedStage.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Booking</h3>
              <ul>
                <li>
                  <strong>Rick Butler</strong>
                  Manager
                </li>
                <li>
                  <a href={`mailto:${band.email}`}>{band.email}</a>
                </li>
                <li>
                  <a href={`tel:${band.phone.replace(/\D/g, '')}`}>{band.phone}</a>
                </li>
                <li>{band.location}</li>
              </ul>
            </div>
          </div>

          <div className="epk-actions">
            <CelticButton to="/contact">
              Contact
              <br />
              Booking
            </CelticButton>
            <CelticButton to="/media">
              More
              <br />
              Media
            </CelticButton>
          </div>

          <div className="epk-social">
            <p className="section-label">Follow Swagger</p>
            <SocialCelticLinks className="celtic-links--epk" />
          </div>
        </div>
      </section>
    </>
  )
}
