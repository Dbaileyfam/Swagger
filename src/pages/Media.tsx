import { useState } from 'react'
import { band, mediaItems } from '../data/band'
import type { MediaItem } from '../data/band'

type Filter = 'all' | 'video' | 'music'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Videos' },
  { id: 'music', label: 'Music' },
]

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
        <p className="media-tile__desc">{item.description}</p>
      </div>
    </article>
  )
}

function MusicTile({ item }: { item: MediaItem }) {
  return (
    <article className="media-tile media-tile--music">
      <div className="media-tile__body">
        <span className="media-tile__type">music</span>
        <h2 className="media-tile__title">{item.title}</h2>
        <p className="media-tile__desc">{item.description}</p>
      </div>
    </article>
  )
}

export function Media() {
  const [filter, setFilter] = useState<Filter>('all')
  const items =
    filter === 'all' ? mediaItems : mediaItems.filter((item) => item.type === filter)

  return (
    <>
      <header className="page-hero">
        <p className="section-label">Gallery</p>
        <h1 className="section-title">Media</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Live videos and studio albums from nearly two decades on the road.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner">
          <div className="media-filters" role="tablist" aria-label="Media filters">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`chip${filter === f.id ? ' active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="media-grid">
            {items.map((item) =>
              item.type === 'video' && item.youtubeId ? (
                <VideoTile key={item.id} item={item} />
              ) : (
                <MusicTile key={item.id} item={item} />
              ),
            )}
          </div>

          <div className="btn-row" style={{ marginTop: '2.5rem' }}>
            <a
              className="btn"
              href={band.social.youtube}
              target="_blank"
              rel="noreferrer"
            >
              YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
