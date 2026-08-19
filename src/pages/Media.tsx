import { useState, type KeyboardEvent } from 'react'
import { CelticButton } from '../components/CelticButton'
import { SocialCelticLinks } from '../components/SocialCelticLinks'
import { band, mediaItems } from '../data/band'
import type { MediaItem } from '../data/band'

type MediaTab = 'video' | 'photo' | 'music'

const tabs: { id: MediaTab; label: string; panelId: string }[] = [
  { id: 'video', label: 'Videos', panelId: 'media-panel-videos' },
  { id: 'photo', label: 'Photos', panelId: 'media-panel-photos' },
  { id: 'music', label: 'Music', panelId: 'media-panel-music' },
]

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function VideoTile({ item }: { item: MediaItem }) {
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
      </div>
    </article>
  )
}

function PhotoTile({ item }: { item: MediaItem }) {
  return (
    <article className="media-tile media-tile--photo">
      <div className="photo-tile__image">
        <img src={assetUrl(item.image!)} alt="Swagger press photo" loading="lazy" />
      </div>
    </article>
  )
}

function SpotifyEmbed() {
  return (
    <section className="media-section spotify-embed" aria-labelledby="media-music-heading">
      <h2 id="media-music-heading" className="media-section__title">
        Music
      </h2>
      <p className="section-label">Listen on Spotify</p>
      <div className="spotify-embed__frame">
        <iframe
          data-testid="embed-iframe"
          title="Swagger on Spotify"
          src={band.spotifyEmbed}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export function Media() {
  const [tab, setTab] = useState<MediaTab>('video')
  const photos = mediaItems.filter((item) => item.type === 'photo')
  const videos = mediaItems.filter((item) => item.type === 'video')
  const activeTab = tabs.find((t) => t.id === tab) ?? tabs[0]

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(event.key)) return

    event.preventDefault()
    const last = tabs.length - 1
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? last
          : event.key === 'ArrowRight'
            ? (index + 1) % tabs.length
            : (index - 1 + tabs.length) % tabs.length
    const next = tabs[nextIndex]
    setTab(next.id)
    const tablist = event.currentTarget.parentElement
    const nextButton = tablist?.querySelector<HTMLElement>(`#media-tab-${next.id}`)
    nextButton?.focus()
  }

  return (
    <div className="media-page">
      <div className="media-ship" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}tall-ship-fwd.png`}
          alt=""
          className="media-ship__img"
          width={288}
          height={265}
        />
      </div>

      <header className="page-hero">
        <h1 className="section-title">Media</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Press photos, live videos, and streaming music from nearly two decades on the road.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="media-filters" role="tablist" aria-label="Media">
            {tabs.map((t, index) => (
              <CelticButton
                key={t.id}
                id={`media-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={t.panelId}
                tabIndex={tab === t.id ? 0 : -1}
                className={`celtic-link--sm${tab === t.id ? ' celtic-link--active' : ''}`}
                aria-label={t.label}
                onClick={() => setTab(t.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {t.label}
              </CelticButton>
            ))}
          </div>

          <div
            id={activeTab.panelId}
            role="tabpanel"
            aria-labelledby={`media-tab-${activeTab.id}`}
            className="media-tabpanel"
          >
            {tab === 'music' && <SpotifyEmbed />}

            {tab === 'photo' && (
              <section className="media-section" aria-labelledby="media-photos-heading">
                <h2 id="media-photos-heading" className="media-section__title">
                  Photos
                </h2>
                <div className="media-grid">
                  {photos.map((item) => (
                    <PhotoTile key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {tab === 'video' && (
              <section className="media-section" aria-labelledby="media-videos-heading">
                <h2 id="media-videos-heading" className="media-section__title">
                  Videos
                </h2>
                <div className="media-grid">
                  {videos.map((item) => (
                    <VideoTile key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <SocialCelticLinks className="celtic-links--media" />
        </div>
      </section>
    </div>
  )
}
