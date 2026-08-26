export const ADS_API_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/ads'
export const ADS_IMAGE_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/ad-image'

export type BoardAd = {
  id: string
  text: string
  href: string
  imageUrl?: string
  createdAt?: string
}

export function youtubeEmbedSrc(url: string): string | null {
  const href = url.includes('://') ? url : `https://${url}`
  try {
    const parsed = new URL(href)
    if (!/(^|\.)youtube\.com$|(^|\.)youtu\.be$/i.test(parsed.hostname)) return null
    if (parsed.hostname.replace(/^www\./, '') === 'youtu.be') {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0]
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    const fromQuery = parsed.searchParams.get('v')
    const fromPath = parsed.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1]
    const id = fromQuery || fromPath
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  } catch {
    return null
  }
}

export function facebookEmbedSrc(url: string): string | null {
  const href = url.includes('://') ? url : `https://${url}`
  try {
    const parsed = new URL(href)
    if (!/(^|\.)facebook\.com$|(^|\.)fb\.com$/i.test(parsed.hostname)) return null
    return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(parsed.toString())}&show_text=true&width=500`
  } catch {
    return null
  }
}

export function instagramPermalink(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null
  const href = trimmed.includes('://') ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(href)
    if (!/(^|\.)instagram\.com$/i.test(parsed.hostname)) return null
    const match = parsed.pathname.match(/\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i)
    if (!match) return null
    const kind = /\/p\//i.test(parsed.pathname)
      ? 'p'
      : /\/tv\//i.test(parsed.pathname)
        ? 'tv'
        : 'reel'
    return `https://www.instagram.com/${kind}/${match[1]}/`
  } catch {
    return null
  }
}

const POSTER_PASSWORD_KEY = 'swagger-poster-password'

export function getPosterPassword() {
  return sessionStorage.getItem(POSTER_PASSWORD_KEY) || ''
}

export function setPosterPassword(password: string) {
  sessionStorage.setItem(POSTER_PASSWORD_KEY, password)
}

export function clearPosterPassword() {
  sessionStorage.removeItem(POSTER_PASSWORD_KEY)
}

export async function fetchBoardAds(): Promise<BoardAd[]> {
  const response = await fetch(ADS_API_URL, { cache: 'no-store' })
  if (!response.ok) throw new Error('Could not load the poster board')
  const data = (await response.json()) as { ads?: BoardAd[] }
  return Array.isArray(data.ads) ? data.ads : []
}

export async function publishBoardAd(input: {
  password: string
  href: string
  text: string
  image?: File | null
}): Promise<BoardAd> {
  const data = new FormData()
  data.set('password', input.password)
  data.set('href', input.href)
  data.set('text', input.text)
  if (input.image) data.set('image', input.image)

  const response = await fetch(ADS_API_URL, { method: 'POST', body: data })
  const payload = (await response.json().catch(() => ({}))) as {
    ad?: BoardAd
    error?: string
  }
  if (!response.ok || !payload.ad) {
    throw new Error(payload.error || 'Could not post that poster')
  }
  return payload.ad
}
