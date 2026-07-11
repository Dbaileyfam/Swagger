import { useState } from 'react'
import { Link } from 'react-router-dom'
import { band, epkPhotos, mediaItems } from '../data/band'
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

  return (
    <>
      <header className="page-hero">
        <p className="section-label">For Promoters</p>
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
                    alt={photo.title}
                    loading="lazy"
                  />
                  <figcaption>{photo.title}</figcaption>
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
            <Link to="/contact" className="btn btn-solid">
              Contact for Booking
            </Link>
            <Link to="/media" className="btn">
              More Media
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
