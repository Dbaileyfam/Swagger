import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  getStripeCheckoutPayload,
  lineLabel,
  lineUnitPrice,
  mp3AlbumLineKey,
  storeAlbums,
  type AlbumId,
  type CartLine,
  type StoreAlbum,
} from '../data/store'

const STRIPE_CHECKOUT_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/create-checkout-session'
const STRIPE_SESSION_DOWNLOADS_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/session-downloads'

type SessionDownload = {
  sku: string
  name: string
  url: string
}

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
  onAddAllTracks,
}: {
  album: StoreAlbum
  onAddCd: () => void
  onAddAllTracks: () => void
}) {
  const [open, setOpen] = useState(false)
  const digitalTotal = albumDigitalTotal(album)
  const cdAvailable = album.id !== 'trouble-on-the-green'

  return (
    <article className="store-card">
      <div className="store-card__cover">
        <img src={assetUrl(album.cover)} alt={`${album.title} album cover`} loading="lazy" />
      </div>
      <div className="store-card__body">
        <p className="store-card__year">{album.year}</p>
        <h2 className="store-card__title">{album.title}</h2>
        <p className="store-card__price">
          {cdAvailable ? `CD ${formatMoney(CD_PRICE)} (free shipping)` : 'Out of Publication'}
          <br />
          Digital download {formatMoney(ALBUM_MP3_PRICE)}
        </p>
        <div className="store-card__actions">
          {cdAvailable ? (
            <button type="button" className="store-btn" onClick={onAddCd}>
              Add CD
            </button>
          ) : null}
          <button
            type="button"
            className={`store-btn${cdAvailable ? ' store-btn--ghost' : ''}`}
            onClick={onAddAllTracks}
          >
            Digital download ({formatMoney(digitalTotal)})
          </button>
        </div>
        <button
          type="button"
          className="store-tracks-toggle"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide tracklist' : `Tracklist (${album.tracks.length})`}
        </button>
        {open ? (
          <ol className="store-tracklist">
            {album.tracks.map((track, index) => (
              <li key={`${album.id}-${track}-${index}`}>
                <span>
                  <span className="store-tracklist__num">{index + 1}.</span> {track}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </article>
  )
}

export function Store() {
  const [searchParams] = useSearchParams()
  const [cart, setCart] = useState<CartLine[]>([])
  const [sent, setSent] = useState(false)
  const [stripeLoading, setStripeLoading] = useState(false)
  const [stripeError, setStripeError] = useState<string | null>(null)
  const needsShipping = cartHasCd(cart)
  const stripePayload = useMemo(() => getStripeCheckoutPayload(cart), [cart])
  const stripeEligible = stripePayload !== null
  const total = useMemo(() => cartSubtotal(cart), [cart])
  const checkoutState = searchParams.get('checkout')
  const checkoutSessionId = searchParams.get('session_id')
  const [sessionDownloads, setSessionDownloads] = useState<SessionDownload[]>([])

  useEffect(() => {
    if (checkoutState !== 'success' || !checkoutSessionId) {
      setSessionDownloads([])
      return
    }
    let cancelled = false
    void (async () => {
      try {
        const response = await fetch(
          `${STRIPE_SESSION_DOWNLOADS_URL}?session_id=${encodeURIComponent(checkoutSessionId)}`,
        )
        const data = (await response.json()) as { downloads?: SessionDownload[] }
        if (!cancelled) setSessionDownloads(data.downloads ?? [])
      } catch {
        if (!cancelled) setSessionDownloads([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [checkoutState, checkoutSessionId])

  function addCd(albumId: AlbumId) {
    if (albumId === 'trouble-on-the-green') return
    setCart((lines) =>
      addOrBump(lines, { key: cdLineKey(albumId), kind: 'cd', albumId, qty: 1 }),
    )
    setSent(false)
    setStripeError(null)
  }

  function addAllTracks(album: StoreAlbum) {
    setCart((lines) => {
      const withoutAlbumTracks = lines.filter(
        (line) => !(line.kind === 'mp3-album' && line.albumId === album.id),
      )
      return addOrBump(withoutAlbumTracks, {
        key: mp3AlbumLineKey(album.id),
        kind: 'mp3-album',
        albumId: album.id,
        qty: 1,
      })
    })
    setSent(false)
    setStripeError(null)
  }

  function setQty(key: string, qty: number) {
    setCart((lines) =>
      lines
        .map((line) => (line.key === key ? { ...line, qty } : line))
        .filter((line) => line.qty > 0),
    )
    setStripeError(null)
  }

  function removeLine(key: string) {
    setCart((lines) => lines.filter((line) => line.key !== key))
    setStripeError(null)
  }

  function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (cart.length === 0 || stripeEligible) return
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

  async function handleStripeCheckout() {
    if (!stripePayload || stripeLoading) return

    setStripeError(null)
    setStripeLoading(true)
    try {
      const response = await fetch(STRIPE_CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: stripePayload.items }),
      })
      let data: { url?: string; error?: string; message?: string } = {}
      try {
        data = (await response.json()) as typeof data
      } catch {
        throw new Error('Checkout response was not valid JSON.')
      }
      if (!response.ok || !data.url) {
        throw new Error(
          data.error ||
            data.message ||
            `Could not create checkout (status ${response.status}).`,
        )
      }
      window.location.href = data.url
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Could not open Stripe checkout. Please try again.'
      setStripeError(message)
      setStripeLoading(false)
    }
  }

  return (
    <div className="store-page">
      <header className="page-hero">
        <h1 className="section-title">Store</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          CDs ({formatMoney(CD_PRICE)}, free shipping) or full album Digital Download{' '}
          {formatMoney(ALBUM_MP3_PRICE)}.
        </p>
        {checkoutState === 'success' ? (
          <div className="section-lede" style={{ margin: '1rem auto 0' }}>
            <p style={{ margin: 0 }}>Payment received.</p>
            {sessionDownloads.length > 0 ? (
              <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.2rem' }}>
                {sessionDownloads.map((download) => (
                  <li key={download.sku}>
                    <a href={download.url}>Download {download.name}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        {checkoutState === 'cancel' ? (
          <p className="section-lede" style={{ margin: '1rem auto 0' }}>
            Checkout canceled — your cart was not charged.
          </p>
        ) : null}
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
              <p className="store-cart__empty">Add a CD or digital download to get started.</p>
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

            {cart.length === 0 ? (
              <div className="store-checkout">
                <p className="store-checkout__note">
                  Add a CD or digital download to check out with Stripe.
                </p>
              </div>
            ) : stripeEligible ? (
              <div className="store-checkout">
                <p className="store-checkout__note">
                  Secure checkout with Stripe. CDs include free US shipping.
                </p>
                <CelticButton
                  type="button"
                  className="celtic-link--wide"
                  onClick={() => void handleStripeCheckout()}
                  disabled={stripeLoading}
                >
                  {stripeLoading ? 'Opening secure checkout…' : 'Secure Stripe Checkout'}
                </CelticButton>
                {stripeError ? (
                  <p className="store-checkout__note" role="alert">
                    Could not start Stripe checkout: {stripeError}
                  </p>
                ) : null}
              </div>
            ) : (
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
                    This cart uses email checkout. Add a CD or digital download for Stripe
                    checkout.
                  </p>
                )}
              </form>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}
