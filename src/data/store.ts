import { band } from './band'

export const CD_PRICE = 18
export const MP3_PRICE = 1.99
/** Discounted full-album digital download (vs buying every track). */
export const ALBUM_MP3_PRICE = 12.99

export type AlbumId =
  | 'trouble-on-the-green'
  | 'the-grave'
  | 'america-land'
  | 'gypsy-road'

export type StoreAlbum = {
  id: AlbumId
  title: string
  year: number
  cover: string
  tracks: string[]
}

export type CartLine =
  | { key: string; kind: 'cd'; albumId: AlbumId; qty: number }
  | { key: string; kind: 'mp3-album'; albumId: AlbumId; qty: number }
  | { key: string; kind: 'mp3'; albumId: AlbumId; trackIndex: number; qty: number }

export const storeAlbums: StoreAlbum[] = [
  {
    id: 'trouble-on-the-green',
    title: 'Trouble on the Green',
    year: 2008,
    cover: 'store/covers/trouble-on-the-green-v3.jpg',
    tracks: [
      'Piper Down',
      'Black Velvet Band',
      'Tito',
      'Dirty Old Town',
      'Trouble on the Green',
      'Fisherman Blues',
      "Miner's Code",
      'Skye',
      'Next Time I See Her',
      'Blame',
      'I Will Love You',
    ],
  },
  {
    id: 'the-grave',
    title: 'The Grave',
    year: 2010,
    cover: 'store/covers/the-grave-v3.jpg',
    tracks: [
      "Mrs. Myrtle's Daughter",
      'Drowsy Maggie / Drunken Sailor',
      'Whiskey in the Jar',
      "Paddy's in America",
      'The Old Grey Wall',
      'The Grave',
      "Morrison's Jig",
      'Whiskety on the Floor',
      'Black and Tans',
      'I Will Love You',
    ],
  },
  {
    id: 'america-land',
    title: 'America Land',
    year: 2013,
    cover: 'store/covers/america-land-v3.jpg',
    tracks: [
      'Bodie McGee',
      'Track 2',
      'Come In',
      'The Ferryman',
      'America Land',
      "John Ryan's Polka",
      'Moonshiner',
      'Star of the County Down',
      "Sam's Song",
      "Whiskey You're the Devil",
    ],
  },
  {
    id: 'gypsy-road',
    title: 'Gypsy Road',
    year: 2017,
    cover: 'store/covers/gypsy-road-v3.jpg',
    tracks: [
      'Goodbye Mick',
      'Spanish Lady',
      'Raggle Taggle Gypsy',
      'Fisherman Blues',
      'Musical Priest',
      'I Had to Say Farewell',
      'Kesh Jig / Swallowtail',
      'Merry Mac',
      'Black Velvet Band',
      'Whiskey Before Breakfast',
      "I'll Tell Me Ma",
      "Mari's Wedding",
      'Fields of Athenry',
      'Leanor Plunkett / Butterfly',
    ],
  },
]

export function getAlbum(id: AlbumId): StoreAlbum | undefined {
  return storeAlbums.find((album) => album.id === id)
}

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function albumDigitalTotal(_album: StoreAlbum): number {
  return ALBUM_MP3_PRICE
}

export function lineUnitPrice(line: CartLine): number {
  if (line.kind === 'cd') return CD_PRICE
  if (line.kind === 'mp3-album') return ALBUM_MP3_PRICE
  return MP3_PRICE
}

export function lineLabel(line: CartLine): string {
  const album = getAlbum(line.albumId)
  if (!album) return 'Unknown item'
  if (line.kind === 'cd') return `${album.title} — CD (free shipping)`
  if (line.kind === 'mp3-album') return `${album.title} — Digital download`
  const track = album.tracks[line.trackIndex] ?? `Track ${line.trackIndex + 1}`
  return `${album.title} — ${track} (digital download)`
}

export function cartSubtotal(lines: CartLine[]): number {
  return Number(
    lines
      .reduce((sum, line) => sum + lineUnitPrice(line) * line.qty, 0)
      .toFixed(2),
  )
}

export function cartHasCd(lines: CartLine[]): boolean {
  return lines.some((line) => line.kind === 'cd')
}

export type StripeSku =
  | 'trouble-cd'
  | 'trouble-album'
  | 'grave-cd'
  | 'grave-album'
  | 'america-land-cd'
  | 'america-land-album'
  | 'gypsy-road-cd'
  | 'gypsy-road-album'

export type StripeCheckoutItem = {
  sku: StripeSku
  quantity: number
}

export type StripeCheckoutPayload = {
  items: StripeCheckoutItem[]
}

const STRIPE_SKU_BY_ALBUM: Record<
  AlbumId,
  { cd: StripeSku; album: StripeSku }
> = {
  'trouble-on-the-green': { cd: 'trouble-cd', album: 'trouble-album' },
  'the-grave': { cd: 'grave-cd', album: 'grave-album' },
  'america-land': { cd: 'america-land-cd', album: 'america-land-album' },
  'gypsy-road': { cd: 'gypsy-road-cd', album: 'gypsy-road-album' },
}

function stripeSkuForLine(line: CartLine): StripeSku | null {
  const skus = STRIPE_SKU_BY_ALBUM[line.albumId]
  if (!skus || line.qty < 1) return null
  if (line.kind === 'cd') return skus.cd
  if (line.kind === 'mp3-album') return skus.album
  return null
}

/** Stripe checkout for one or more CDs / full-album digital downloads. */
export function getStripeCheckoutPayload(lines: CartLine[]): StripeCheckoutPayload | null {
  if (lines.length < 1) return null
  const items: StripeCheckoutItem[] = []
  for (const line of lines) {
    const sku = stripeSkuForLine(line)
    if (!sku) return null
    items.push({ sku, quantity: line.qty })
  }
  return { items }
}

export function isStripeEligibleCart(lines: CartLine[]): boolean {
  return getStripeCheckoutPayload(lines) !== null
}

export function cdLineKey(albumId: AlbumId): string {
  return `cd:${albumId}`
}

export function mp3AlbumLineKey(albumId: AlbumId): string {
  return `mp3-album:${albumId}`
}

export function mp3LineKey(albumId: AlbumId, trackIndex: number): string {
  return `mp3:${albumId}:${trackIndex}`
}

export type CheckoutDetails = {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  notes: string
}

export function buildOrderMailto(lines: CartLine[], details: CheckoutDetails): string {
  const items = lines
    .map((line) => {
      const unit = lineUnitPrice(line)
      const total = unit * line.qty
      return `• ${lineLabel(line)} × ${line.qty} — ${formatMoney(total)}`
    })
    .join('\n')

  const needsShipping = cartHasCd(lines)
  const shipping = needsShipping
    ? `\nShip CD(s) to (free shipping):\n${details.address}\n${details.city}, ${details.state} ${details.zip}\n`
    : '\n(Digital only — no shipping needed)\n'

  const body = [
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    '',
    'Order:',
    items,
    '',
    `Total: ${formatMoney(cartSubtotal(lines))}`,
    needsShipping ? 'Shipping: FREE\n' : '',
    shipping,
    details.notes ? `Notes:\n${details.notes}\n` : '',
    'Payment details to follow — this order was submitted from the Swagger website store.',
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${band.email}?subject=${encodeURIComponent(
    'Swagger store order',
  )}&body=${encodeURIComponent(body)}`
}
