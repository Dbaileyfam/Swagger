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

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextPassword = password.trim()
    const nextHref = href.trim()
    if (!nextPassword) {
      setError('Enter the poster password.')
      return
    }
    if (!nextHref) {
      setError('Paste the Instagram or ad URL.')
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
      })
      setPosterPassword(nextPassword)
      setAds((current) => [ad, ...current.filter((item) => item.id !== ad.id)])
      setHref('')
      setText('')
      setStatus('Posted to the homepage.')
      await loadAds().catch(() => {})
    } catch (err) {
      if (err instanceof Error && /wrong poster password/i.test(err.message)) {
        clearPosterPassword()
      }
      setError(err instanceof Error ? err.message : 'Could not post that link')
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
          Paste an Instagram or ad URL, then press Post this URL.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner poster-layout">
          <form className="contact-form" onSubmit={handlePublish}>
            <div className="field">
              <label htmlFor="poster-href">Post or ad URL</label>
              <input
                id="poster-href"
                name="href"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="https://www.instagram.com/p/…"
                value={href}
                onChange={(event) => setHref(event.target.value)}
                required
              />
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
                required
              />
            </div>
            {status ? <p className="form-success">{status}</p> : null}
            {error ? (
              <p className="poster-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="poster-submit" disabled={busy}>
              {busy ? 'Posting…' : 'Post this URL'}
            </button>
          </form>

          <div className="poster-current">
            <h2 className="section-label">On the homepage now</h2>
            {ads.length === 0 ? (
              <p className="form-note">
                {boardReady
                  ? 'No posters yet. Paste a URL above and press Post this URL.'
                  : 'Loading posters…'}
              </p>
            ) : (
              <ul className="poster-list">
                {ads.map((ad) => (
                  <li className="poster-list__item" key={ad.id}>
                    <img src={ad.imageUrl} alt={ad.text || 'Homepage poster'} />
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
