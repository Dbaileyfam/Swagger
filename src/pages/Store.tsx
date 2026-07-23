import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CelticButton } from '../components/CelticButton'
import {
  ALBUM_MP3_PRICE,
  albumDigitalTotal,
  buildOrderMailto,
  cartHasCd,
  cartSubtotal,
  CD_PRICE,
  cdLineKey,
  formatMoney,
  lineLabel,
  lineUnitPrice,
  MP3_PRICE,
  mp3AlbumLineKey,
  mp3LineKey,
  storeAlbums,
  type AlbumId,
  type CartLine,
  type StoreAlbum,
} from '../data/store'

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function addOrBump(lines: CartLine[], next: CartLine): CartLine[] {
  const existing = lines.find((line) => line.key === next.key)
  if (!existing) return [...lines, next]
  return lines.map((line) =>
    line.key === next.key ? { ...line, qty: line.qty + next.qty } : line,
  )
}

function AlbumCard({
  album,
  onAddCd,
  onAddTrack,
  onAddAllTracks,
}: {
  album: StoreAlbum
  onAddCd: () => void
  onAddTrack: (trackIndex: number) => void
  onAddAllTracks: () => void
}) {
  const [open, setOpen] = useState(false)
  const digitalTotal = albumDigitalTotal(album)

  return (
    <article className="store-card">
      <div className="store-card__cover">
        <img src={assetUrl(album.cover)} alt={`${album.title} album cover`} loading="lazy" />
      </div>
      <div className="store-card__body">
        <p className="store-card__year">{album.year}</p>
        <h2 className="store-card__title">{album.title}</h2>
        <p className="store-card__price">
          CD {formatMoney(CD_PRICE)} (free shipping)
          <br />
          Full album MP3 {formatMoney(ALBUM_MP3_PRICE)} · Single MP3 {formatMoney(MP3_PRICE)}
        </p>
        <div className="store-card__actions">
          <button type="button" className="store-btn" onClick={onAddCd}>
            Add CD
          </button>
          <button type="button" className="store-btn store-btn--ghost" onClick={onAddAllTracks}>
            Add all MP3 tracks ({formatMoney(digitalTotal)})
          </button>
        </div>
        <button
          type="button"
          className="store-tracks-toggle"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide all MP3 tracklist' : `All MP3 tracklist (${album.tracks.length})`}
        </button>
        {open ? (
          <ol className="store-tracklist">
            {album.tracks.map((track, index) => (
              <li key={`${album.id}-${track}-${index}`}>
                <span>
                  <span className="store-tracklist__num">{index + 1}.</span> {track}
                </span>
                <button
                  type="button"
                  className="store-btn store-btn--small"
                  onClick={() => onAddTrack(index)}
                >
                  Add MP3
                </button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </article>
  )
}

export function Store() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [sent, setSent] = useState(false)
  const needsShipping = cartHasCd(cart)
  const total = useMemo(() => cartSubtotal(cart), [cart])

  function addCd(albumId: AlbumId) {
    setCart((lines) =>
      addOrBump(lines, { key: cdLineKey(albumId), kind: 'cd', albumId, qty: 1 }),
    )
    setSent(false)
  }

  function addTrack(albumId: AlbumId, trackIndex: number) {
    setCart((lines) =>
      addOrBump(lines, {
        key: mp3LineKey(albumId, trackIndex),
        kind: 'mp3',
        albumId,
        trackIndex,
        qty: 1,
      }),
    )
    setSent(false)
  }

  function addAllTracks(album: StoreAlbum) {
    setCart((lines) => {
      const withoutAlbumTracks = lines.filter(
        (line) =>
          !(line.kind === 'mp3' && line.albumId === album.id) &&
          !(line.kind === 'mp3-album' && line.albumId === album.id),
      )
      return addOrBump(withoutAlbumTracks, {
        key: mp3AlbumLineKey(album.id),
        kind: 'mp3-album',
        albumId: album.id,
        qty: 1,
      })
    })
    setSent(false)
  }

  function setQty(key: string, qty: number) {
    setCart((lines) =>
      lines
        .map((line) => (line.key === key ? { ...line, qty } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function removeLine(key: string) {
    setCart((lines) => lines.filter((line) => line.key !== key))
  }

  function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (cart.length === 0) return
    const form = e.currentTarget
    const data = new FormData(form)
    const details = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      address: String(data.get('address') || ''),
      city: String(data.get('city') || ''),
      state: String(data.get('state') || ''),
      zip: String(data.get('zip') || ''),
      notes: String(data.get('notes') || ''),
    }
    window.location.href = buildOrderMailto(cart, details)
    setSent(true)
  }

  return (
    <div className="store-page">
      <header className="page-hero">
        <h1 className="section-title">Store</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Order physical CDs ({formatMoney(CD_PRICE)}, free shipping) or digital downloads — full
          album MP3s {formatMoney(ALBUM_MP3_PRICE)}, or single tracks {formatMoney(MP3_PRICE)}.
          Payment setup is coming soon — checkout sends your order by email.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner store-layout">
          <div className="store-catalog">
            <div className="store-grid">
              {storeAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onAddCd={() => addCd(album.id)}
                  onAddTrack={(trackIndex) => addTrack(album.id, trackIndex)}
                  onAddAllTracks={() => addAllTracks(album)}
                />
              ))}
            </div>
          </div>

          <aside className="store-cart" aria-labelledby="store-cart-heading">
            <h2 id="store-cart-heading" className="store-cart__title">
              Your cart
            </h2>
            {cart.length === 0 ? (
              <p className="store-cart__empty">Add a CD or MP3 to get started.</p>
            ) : (
              <ul className="store-cart__list">
                {cart.map((line) => (
                  <li key={line.key} className="store-cart__item">
                    <div>
                      <p className="store-cart__item-name">{lineLabel(line)}</p>
                      <p className="store-cart__item-meta">
                        {formatMoney(lineUnitPrice(line))} each
                      </p>
                    </div>
                    <div className="store-cart__item-controls">
                      <label className="store-qty">
                        <span className="sr-only">Quantity</span>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={line.qty}
                          onChange={(event) =>
                            setQty(line.key, Math.max(1, Number(event.target.value) || 1))
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className="store-btn store-btn--small store-btn--ghost"
                        onClick={() => removeLine(line.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="store-cart__total">
              <span>Total</span>
              <strong>{formatMoney(total)}</strong>
            </div>

            <form className="store-checkout contact-form" onSubmit={handleCheckout}>
              <div className="field">
                <label htmlFor="store-name">Name</label>
                <input id="store-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="store-email">Email</label>
                <input
                  id="store-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              {needsShipping ? (
                <>
                  <div className="field">
                    <label htmlFor="store-address">Shipping address</label>
                    <input
                      id="store-address"
                      name="address"
                      type="text"
                      required
                      autoComplete="street-address"
                    />
                  </div>
                  <div className="store-checkout__row">
                    <div className="field">
                      <label htmlFor="store-city">City</label>
                      <input
                        id="store-city"
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="store-state">State</label>
                      <input
                        id="store-state"
                        name="state"
                        type="text"
                        required
                        autoComplete="address-level1"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="store-zip">ZIP</label>
                      <input
                        id="store-zip"
                        name="zip"
                        type="text"
                        required
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </>
              ) : null}
              <div className="field">
                <label htmlFor="store-notes">Notes (optional)</label>
                <textarea id="store-notes" name="notes" rows={3} />
              </div>
              <CelticButton type="submit" className="celtic-link--wide">
                Email order
              </CelticButton>
              {sent ? (
                <p className="store-checkout__note">
                  Your email app should open with the order details. If nothing opens, email us
                  directly from Contact.
                </p>
              ) : (
                <p className="store-checkout__note">
                  Online payment coming soon. For now, checkout opens a prefilled email order.
                </p>
              )}
            </form>
          </aside>
        </div>
      </section>
    </div>
  )
}
