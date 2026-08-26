import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ADS_API_URL,
  clearPosterPassword,
  fetchBoardAds,
  getPosterPassword,
  publishBoardAd,
  setPosterPassword,
  type BoardAd,
} from '../data/ads'

export function Poster() {
  const [password, setPassword] = useState('')
  const [href, setHref] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imageKey, setImageKey] = useState(0)
  const [ads, setAds] = useState<BoardAd[]>([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [boardReady, setBoardReady] = useState(false)

  async function loadAds() {
    const next = await fetchBoardAds()
    setAds(next)
    setBoardReady(true)
    return next
  }

  useEffect(() => {
    const saved = getPosterPassword()
    if (saved) setPassword(saved)
    loadAds().catch(() => {
      setBoardReady(false)
      setError('Could not reach the poster board. Try again in a moment.')
    })
  }, [])

  async function handlePublish(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    const nextPassword = password.trim()
    const nextHref = href.trim()
    if (!nextPassword) {
      setError('Enter the poster password.')
      return
    }
    if (!nextHref && !image) {
      setError('Paste a URL or choose a poster image.')
      return
    }
    if (image && image.size > 4.5 * 1024 * 1024) {
      setError('Poster images must be 4.5 MB or smaller.')
      return
    }

    setBusy(true)
    setError('')
    setStatus('')
    try {
      const ad = await publishBoardAd({
        password: nextPassword,
        href: nextHref,
        text: text.trim(),
        image,
      })
      setPosterPassword(nextPassword)
      setAds([ad])
      setHref('')
      setImage(null)
      setImageKey((key) => key + 1)
      setStatus('Posted. On the homepage, tap Full Post to open it.')
      await loadAds().catch(() => {})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post that poster')
    } finally {
      setBusy(false)
    }
  }

  async function handleRemove(id: string) {
    setBusy(true)
    setError('')
    setStatus('')
    try {
      const response = await fetch(ADS_API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim(), id }),
      })
      const payload = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        if (response.status === 401) clearPosterPassword()
        throw new Error(payload.error || 'Could not remove that poster')
      }
      setAds((current) => current.filter((ad) => ad.id !== id))
      setStatus('Removed from the homepage.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not remove that poster')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <header className="page-hero">
        <h1 className="section-title">Band poster</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Paste an Instagram or ad URL, or choose a poster image, then press
          Post. Only one is live at a time; a new post replaces the previous
          one.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner poster-layout">
          <form className="contact-form" onSubmit={handlePublish} noValidate>
            <div className="field">
              <label htmlFor="poster-href">Post or ad URL (optional)</label>
              <input
                id="poster-href"
                name="href"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="https://www.instagram.com/p/…"
                value={href}
                onChange={(event) => setHref(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="poster-image">Or upload a poster image</label>
              <input
                id="poster-image"
                key={imageKey}
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              />
              <p className="form-note">
                JPG, PNG, WebP, or GIF, up to 4.5 MB.
                {image ? ` Selected: ${image.name}` : ''}
              </p>
            </div>
            <div className="field">
              <label htmlFor="poster-text">Caption (optional)</label>
              <input
                id="poster-text"
                name="text"
                type="text"
                placeholder="Heber City: One More Time!"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="poster-password">Poster password</label>
              <input
                id="poster-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {status ? <p className="form-success">{status}</p> : null}
            {error ? (
              <p className="poster-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="button" className="poster-submit" disabled={busy} onClick={() => void handlePublish()}>
              {busy ? 'Posting…' : 'Post'}
            </button>
          </form>

          <div className="poster-current">
            <h2 className="section-label">On the homepage now</h2>
            {ads.length === 0 ? (
              <p className="form-note">
                {boardReady
                  ? 'Nothing live yet. Paste a URL or choose a poster image.'
                  : 'Loading posters…'}
              </p>
            ) : (
              <ul className="poster-list">
                {ads.map((ad) => (
                  <li className="poster-list__item" key={ad.id}>
                    {ad.imageUrl ? (
                      <img src={ad.imageUrl} alt={ad.text || 'Homepage poster'} />
                    ) : null}
                    <div>
                      <p>{ad.text || 'Untitled poster'}</p>
                      {ad.href ? (
                        <a href={ad.href} target="_blank" rel="noreferrer">
                          {ad.href}
                        </a>
                      ) : null}
                      <button
                        type="button"
                        className="poster-list__remove"
                        onClick={() => handleRemove(ad.id)}
                        disabled={busy}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
