import { useState } from 'react'
import { mediaItems } from '../data/band'

type Filter = 'all' | 'video' | 'photo' | 'music'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Videos' },
  { id: 'photo', label: 'Photos' },
  { id: 'music', label: 'Music' },
]

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
          Live videos, stage photos, and studio albums from nearly two decades on the road.
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
            {items.map((item) => (
              <article className="media-tile" key={item.id}>
                <span className="media-tile__type">{item.type}</span>
                <h2 className="media-tile__title">{item.title}</h2>
                <p className="media-tile__desc">{item.description}</p>
              </article>
            ))}
          </div>

          <p className="form-note" style={{ marginTop: '2rem' }}>
            Drop in real video embeds, photo files, and streaming links when assets are ready —
            this layout is wired for them.
          </p>
        </div>
      </section>
    </>
  )
}
