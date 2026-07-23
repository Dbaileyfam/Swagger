import { band } from './band'

export const CD_PRICE = 15
export const MP3_PRICE = 1.99

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
  | { key: string; kind: 'mp3'; albumId: AlbumId; trackIndex: number; qty: number }

export const storeAlbums: StoreAlbum[] = [
  {
    id: 'trouble-on-the-green',
    title: 'Trouble on the Green',
    year: 2008,
    cover: 'store/covers/trouble-on-the-green.jpg',
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
    cover: 'store/covers/the-grave.jpg',
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
    cover: 'store/covers/america-land.jpg',
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
    cover: 'store/covers/gypsy-road.jpg',
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

export function albumDigitalTotal(album: StoreAlbum): number {
  return Number((album.tracks.length * MP3_PRICE).toFixed(2))
}

export function lineUnitPrice(line: CartLine): number {
  return line.kind === 'cd' ? CD_PRICE : MP3_PRICE
}

export function lineLabel(line: CartLine): string {
  const album = getAlbum(line.albumId)
  if (!album) return 'Unknown item'
  if (line.kind === 'cd') return `${album.title} — CD`
  const track = album.tracks[line.trackIndex] ?? `Track ${line.trackIndex + 1}`
  return `${album.title} — ${track} (MP3)`
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

export function cdLineKey(albumId: AlbumId): string {
  return `cd:${albumId}`
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
    ? `\nShip CD(s) to:\n${details.address}\n${details.city}, ${details.state} ${details.zip}\n`
    : '\n(Digital only — no shipping needed)\n'

  const body = [
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    '',
    'Order:',
    items,
    '',
    `Total: ${formatMoney(cartSubtotal(lines))}`,
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
