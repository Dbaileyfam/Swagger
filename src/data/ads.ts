export const ADS_API_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/ads'
export const ADS_IMAGE_URL =
  'https://swagger-stripe-checkout.dbailey-dfe.workers.dev/ad-image'

export type BoardAd = {
  id: string
  text: string
  href: string
  imageUrl: string
  createdAt?: string
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
