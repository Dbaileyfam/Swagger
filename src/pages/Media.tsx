import { useState, type ReactNode } from 'react'
import { CelticButton } from '../components/CelticButton'
import { SocialCelticLinks } from '../components/SocialCelticLinks'
import { band, mediaItems } from '../data/band'
import type { MediaItem } from '../data/band'

const PREVIEW_COUNT = 2

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

function MediaGallery({
  title,
  headingId,
  gridId,
  items,
  expanded,
  onToggle,
  moreLabel,
  lessLabel,
  renderItem,
}: {
  title: string
  headingId: string
  gridId: string
  items: MediaItem[]
  expanded: boolean
  onToggle: () => void
  moreLabel: string
  lessLabel: string
  renderItem: (item: MediaItem) => ReactNode
}) {
  const visible = expanded ? items : items.slice(0, PREVIEW_COUNT)
  const canExpand = items.length > PREVIEW_COUNT
  const remaining = items.length - PREVIEW_COUNT

  return (
    <section className="media-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="media-section__title">
        {title}
      </h2>
      <div id={gridId} className="media-grid">
        {visible.map((item) => renderItem(item))}
      </div>
      {canExpand && (
        <div className="media-more">
          <CelticButton
            type="button"
            className={`celtic-link--sm${expanded ? ' celtic-link--active' : ''}`}
            aria-expanded={expanded}
            aria-controls={gridId}
            aria-label={expanded ? lessLabel : `${moreLabel}, ${remaining} more`}
            onClick={onToggle}
          >
            {expanded ? 'Less' : 'More'}
          </CelticButton>
        </div>
      )}
    </section>
  )
}

export function Media() {
  const [photosExpanded, setPhotosExpanded] = useState(false)
  const [videosExpanded, setVideosExpanded] = useState(false)
  const photos = mediaItems.filter((item) => item.type === 'photo')
  const videos = mediaItems.filter((item) => item.type === 'video')

  function togglePhotos() {
    setPhotosExpanded((open) => {
      if (open) {
        document.getElementById('media-photos-heading')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      return !open
    })
  }

  function toggleVideos() {
    setVideosExpanded((open) => {
      if (open) {
        document.getElementById('media-videos-heading')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      return !open
    })
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
          <MediaGallery
            title="Photos"
            headingId="media-photos-heading"
            gridId="media-photos-grid"
            items={photos}
            expanded={photosExpanded}
            onToggle={togglePhotos}
            moreLabel="More photos"
            lessLabel="Fewer photos"
            renderItem={(item) => <PhotoTile key={item.id} item={item} />}
          />

          <MediaGallery
            title="Videos"
            headingId="media-videos-heading"
            gridId="media-videos-grid"
            items={videos}
            expanded={videosExpanded}
            onToggle={toggleVideos}
            moreLabel="More videos"
            lessLabel="Fewer videos"
            renderItem={(item) => <VideoTile key={item.id} item={item} />}
          />

          <SpotifyEmbed />

          <SocialCelticLinks className="celtic-links--media" />
        </div>
      </section>
    </div>
  )
}
