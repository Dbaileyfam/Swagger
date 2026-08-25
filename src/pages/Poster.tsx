import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { CelticButton } from '../components/CelticButton'
import {
  ADS_API_URL,
  clearPosterPassword,
  fetchBoardAds,
  getPosterPassword,
  setPosterPassword,
  type BoardAd,
} from '../data/ads'

export function Poster() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [ads, setAds] = useState<BoardAd[]>([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const saved = getPosterPassword()
    if (saved) {
      setPassword(saved)
      setUnlocked(true)
    }
  }, [])

  useEffect(() => {
    if (!unlocked) return
    fetchBoardAds()
      .then(setAds)
      .catch(() => setError('Could not load current posters.'))
  }, [unlocked])

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = password.trim()
    if (!next) {
      setError('Enter the poster password.')
      return
    }
    setPosterPassword(next)
    setUnlocked(true)
    setError('')
  }

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('password', getPosterPassword() || password)

    setBusy(true)
    setError('')
    setStatus('')
    try {
      const response = await fetch(ADS_API_URL, { method: 'POST', body: data })
      const payload = (await response.json()) as { ad?: BoardAd; error?: string }
      if (!response.ok) {
        if (response.status === 401) {
          clearPosterPassword()
          setUnlocked(false)
        }
        throw new Error(payload.error || 'Could not publish that poster')
      }
      if (payload.ad) setAds((current) => [payload.ad!, ...current])
      form.reset()
      setStatus('Posted to the homepage.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish that poster')
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
        body: JSON.stringify({ password: getPosterPassword() || password, id }),
      })
      const payload = (await response.json()) as { error?: string }
      if (!response.ok) {
        if (response.status === 401) {
          clearPosterPassword()
          setUnlocked(false)
        }
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
          Post an Instagram link or any photo ad. It shows on the homepage under the
          Tour Dates buttons.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner poster-layout">
          {!unlocked ? (
            <form className="contact-form" onSubmit={handleUnlock}>
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
              {error ? (
                <p className="store-checkout__note" role="alert">
                  {error}
                </p>
              ) : null}
              <CelticButton type="submit">
                Unlock
                <br />
                Board
              </CelticButton>
            </form>
          ) : (
            <>
              <form className="contact-form" onSubmit={handlePublish}>
                <div className="field">
                  <label htmlFor="poster-href">Instagram or ad link</label>
                  <input
                    id="poster-href"
                    name="href"
                    type="url"
                    placeholder="https://www.instagram.com/p/… or any https:// link"
                  />
                </div>
                <div className="field">
                  <label htmlFor="poster-text">Caption</label>
                  <textarea
                    id="poster-text"
                    name="text"
                    placeholder="Heber City: One More Time!"
                  />
                </div>
                <div className="field">
                  <label htmlFor="poster-image">Photo (required unless the Instagram photo can be pulled)</label>
                  <input
                    id="poster-image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                  />
                </div>
                <p className="form-note">
                  Paste an Instagram post/reel and we will try to pull the photo. For
                  any other ad, upload the image and add the link people should open.
                </p>
                {status ? <p className="form-success">{status}</p> : null}
                {error ? (
                  <p className="store-checkout__note" role="alert">
                    {error}
                  </p>
                ) : null}
                <CelticButton type="submit" disabled={busy}>
                  {busy ? (
                    <>
                      Saving
                      <br />
                      Poster
                    </>
                  ) : (
                    <>
                      Post to
                      <br />
                      Homepage
                    </>
                  )}
                </CelticButton>
              </form>

              <div className="poster-current">
                <h2 className="section-label">On the homepage now</h2>
                {ads.length === 0 ? (
                  <p className="form-note">Nothing live yet — the Heber City photo is the fallback.</p>
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
            </>
          )}
        </div>
      </section>
    </>
  )
}
