export const band = {
  name: 'Swagger',
  tagline: 'Celtic Americana Rock',
  location: 'Park City, Utah',
  formed: 2007,
  email: 'texasrick63@msn.com',
  phone: '(801) 550-1140',
  social: {
    facebook: 'https://www.facebook.com/swaggertheband',
    instagram: 'https://www.instagram.com/rockwithswagger/',
    youtube: 'https://www.youtube.com/@SwaggerTheBand',
    spotify: 'https://open.spotify.com/artist/7tPoZvl7OYT2rQDdzCQpfR',
  },
  spotifyEmbed:
    'https://open.spotify.com/embed/artist/7tPoZvl7OYT2rQDdzCQpfR?utm_source=generator&theme=0&si=2bdf0432fd974ba9',
  spotifyFeaturedTrack:
    'https://open.spotify.com/embed/track/3QCwKFVW9IetwlR4z5nZ2P?utm_source=generator&theme=0&si=824fb1a97bde42e2',
  albums: [
    { title: 'Trouble on the Green', year: 2008 },
    { title: 'The Grave', year: 2010 },
    { title: 'America Land', year: 2013 },
    { title: 'Gypsy Road', year: 2017 },
  ],
  members: [
    {
      name: 'Rick Butler',
      role: 'Manager, Lead Vocals, Guitar, Mandolin & Banjo',
    },
    { name: 'Dennis Harrington', role: 'Fiddle & Vocals' },
    { name: 'Trip Marshall', role: 'Lead Guitar & Mandolin' },
    { name: 'Manny Slack', role: 'Bass & Vocals' },
    { name: 'Mike Bailey', role: 'Drums' },
    { name: 'Eric Slaymaker', role: 'Vocals, Tin Whistle & Mandolin' },
  ],
  sharedStage: [
    'The Young Dubliners',
    'The English Beat',
    'The Clumsy Lovers',
    'Howard Jones',
    'Brother',
    'Albanach',
    'Andy Frasco',
  ],
  bio: `Swagger is a Premier Irish Rock band based out of Park City, Utah. The band has been honing their original brand of Celtic music at festivals and concert halls across the United States since 2007. Well known for their high-energy stage performances and catchy original lyrics, the band has amassed loyal fans eager to hear more. Swagger's music is the expected Irish celebration of drink, mischief, and music, which also dares to explore oppression and take an emigrant's perspective on the virtues and vices of the Irish-American culture.

Swagger has released 4 studio albums, Trouble on the Green (2008), The Grave (2010), America Land (2013) and Gypsy Road in (2017). The band has shared stages with The Young Dubliners, Brother, Carlos Jones, The English Beat, Andy Frasco, Eric Dodge and Howard Jones, just to name a few.

Swagger's line up is as varied in their influences as they are in their origins. Calling on their musical backgrounds in rock, ska, funk, jazz, classical, blues, and country, the band is constantly writing new material and changing up their offerings from festival to festival. Their songs depict the struggles of the Irish, Welsh, Scotts & Italian Gypsies who came to America to start a new life. Their musicianship and live performances give their audiences a truly complete entertaining experience to remember. Don't miss an opportunity to see this amazing band Live ! ! !`,
  shortBio: `High-energy Celtic rock from Park City — drink, mischief, and music with an emigrant's eye on Irish-American life.`,
  epkBio: `Swagger is a Celtic Americana rock band from Park City, Utah, formed in 2007 by Rick Butler and fiddler Dennis Harrington. Known for high-energy stage shows and original songs that celebrate Irish drink, mischief, and music — while taking an emigrant's view of Irish-American life. They've shared stages with The Young Dubliners, The English Beat, Howard Jones, Brother, and Andy Frasco, and have released four studio albums: Trouble on the Green, The Grave, America Land, and Gypsy Road.`,
  epkBlurb: `Swagger is a premier Irish rock band based out of Park City, Utah. Since 2007 they have brought high-energy Celtic Americana to festivals and concert halls across the United States. Their songs depict the struggles of the Irish, Welsh, Scots, and Italian Gypsies who came to America to start a new life.`,
  spotifyEmbedCompact:
    'https://open.spotify.com/embed/artist/7tPoZvl7OYT2rQDdzCQpfR?utm_source=generator&theme=0&si=2bdf0432fd974ba9',
}

export type Show = {
  id: string
  event: string
  venue: string
  city: string
  state: string
  date: string
  time: string
  upcoming: boolean
}

export const shows: Show[] = [
  {
    id: 'wasatch-2026',
    event: 'Wasatch Music Festival',
    venue: 'Richard Erickson Ranch',
    city: 'Wallsburg',
    state: 'Utah',
    date: '2026-07-17',
    time: '8:00pm',
    upcoming: true,
  },
  {
    id: 'snowbasin-2026',
    event: 'Blues & Brews Concert Series',
    venue: 'Snow Basin Ski Resort',
    city: 'Ogden',
    state: 'Utah',
    date: '2026-08-08',
    time: '1:00pm',
    upcoming: true,
  },
  {
    id: 'heber-2026',
    event: 'Heber Concert Series',
    venue: 'Heber Valley Park',
    city: 'Heber',
    state: 'Utah',
    date: '2026-08-13',
    time: '6:00pm',
    upcoming: true,
  },
  {
    id: 'bitterroot-15-2026',
    event: 'Bitterroot Highland Games',
    venue: 'Daly Mansion',
    city: 'Hamilton',
    state: 'Montana',
    date: '2026-08-15',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'bitterroot-16-2026',
    event: 'Bitterroot Highland Games',
    venue: 'Daly Mansion',
    city: 'Hamilton',
    state: 'Montana',
    date: '2026-08-16',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'longs-peak-11-2026',
    event: 'Longs Peak Scottish Irish Highland Festival',
    venue: 'Estes Park',
    city: 'Estes',
    state: 'Colorado',
    date: '2026-09-11',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'longs-peak-12-2026',
    event: 'Longs Peak Scottish Irish Highland Festival',
    venue: 'Estes Park',
    city: 'Estes',
    state: 'Colorado',
    date: '2026-09-12',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'longs-peak-13-2026',
    event: 'Longs Peak Scottish Irish Highland Festival',
    venue: 'Estes Park',
    city: 'Estes',
    state: 'Colorado',
    date: '2026-09-13',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'vegas-09-2026',
    event: 'Las Vegas Renaissance Fair',
    venue: 'Sunset Park',
    city: 'Las Vegas',
    state: 'Nevada',
    date: '2026-10-09',
    time: '6:00pm',
    upcoming: true,
  },
  {
    id: 'vegas-10-2026',
    event: 'Las Vegas Renaissance Fair',
    venue: 'Sunset Park',
    city: 'Las Vegas',
    state: 'Nevada',
    date: '2026-10-10',
    time: 'TBD',
    upcoming: true,
  },
  {
    id: 'vegas-11-2026',
    event: 'Las Vegas Renaissance Fair',
    venue: 'Sunset Park',
    city: 'Las Vegas',
    state: 'Nevada',
    date: '2026-10-11',
    time: '1:00pm',
    upcoming: true,
  },
  {
    id: 'july4-2026',
    event: '4th of July Concert',
    venue: 'Park City Park',
    city: 'Park City',
    state: 'Utah',
    date: '2026-07-04',
    time: '12:30pm',
    upcoming: false,
  },
  {
    id: 'cortez-2026',
    event: 'Cortez Celtic Festival',
    venue: 'Parque de Vida',
    city: 'Cortez',
    state: 'Colorado',
    date: '2026-06-27',
    time: 'TBD',
    upcoming: false,
  },
  {
    id: 'stpatricks-2026',
    event: "St. Patrick's Day Concert",
    venue: 'Piper Down',
    city: 'Salt Lake City',
    state: 'Utah',
    date: '2026-03-17',
    time: '6:00pm',
    upcoming: false,
  },
]

export type MediaItem = {
  id: string
  type: 'video' | 'photo' | 'music'
  title: string
  description: string
  youtubeId?: string
  image?: string
  year?: string
}

/** Press photos from https://swaggertheband.com/epk-files/ */
export const epkPhotos: MediaItem[] = [
  {
    id: 'epk-1',
    type: 'photo',
    title: 'Band Portrait',
    description: 'Official press photo',
    image: 'epk/epk-1.jpg',
  },
  {
    id: 'epk-2',
    type: 'photo',
    title: 'Stage Ready',
    description: 'Official press photo',
    image: 'epk/epk-2.jpg',
  },
  {
    id: 'epk-3',
    type: 'photo',
    title: 'Live Energy',
    description: 'Official press photo',
    image: 'epk/epk-3.jpg',
  },
]

/** Brand / logo assets that say Swagger — for EPK downloads & press use */
export const epkLogos = [
  {
    id: 'mark-v3',
    title: 'Swagger Wordmark',
    description: 'Primary logo with Celtic knotwork',
    image: 'swagger-mark-crest-v3.png',
  },
  {
    id: 'mark-v2',
    title: 'Swagger Wordmark (Alt)',
    description: 'Alternate crest wordmark',
    image: 'swagger-mark-crest-v2.png',
  },
  {
    id: 'crest',
    title: 'Swagger Crest',
    description: 'Standalone crest mark',
    image: 'swagger-crest.png',
  },
  {
    id: 'cross',
    title: 'Swagger Celtic Cross',
    description: 'Cross mark used in navigation',
    image: 'swagger-cross.png',
  },
] as const

/** Videos from https://www.youtube.com/@SwaggerTheBand */
export const mediaItems: MediaItem[] = [
  ...epkPhotos,
  {
    id: '4Wi3yPjNMbc',
    type: 'video',
    title: "Morrison's Jig — Live",
    description: 'Live in Bozeman, Montana · Summer 2023',
    youtubeId: '4Wi3yPjNMbc',
    year: '2023',
  },
  {
    id: 'BBxbUU0Ui88',
    type: 'video',
    title: 'Bodhran Reel',
    description: 'A reel passed down through generations — with a kick for the dancers.',
    youtubeId: 'BBxbUU0Ui88',
    year: '2017',
  },
  {
    id: 'K7Xb96TnAz0',
    type: 'video',
    title: 'Moonshiner',
    description: 'Originally a waltz — given a Hazard County backwoods twist.',
    youtubeId: 'K7Xb96TnAz0',
    year: '2017',
  },
  {
    id: 'Xz3NpGktfc4',
    type: 'video',
    title: 'Americaland',
    description: 'Irish rock from the Western US.',
    youtubeId: 'Xz3NpGktfc4',
    year: '2017',
  },
  {
    id: 'KiTtR-ytr04',
    type: 'video',
    title: 'Bodie McGee',
    description: 'Irish rock from the Western US.',
    youtubeId: 'KiTtR-ytr04',
    year: '2017',
  },
  {
    id: '5dynW18TBDM',
    type: 'video',
    title: 'Galway Girl',
    description: 'Irish rock from the Western US.',
    youtubeId: '5dynW18TBDM',
    year: '2017',
  },
  {
    id: 'U5_uF97dK8s',
    type: 'video',
    title: 'Kesh Jig',
    description: 'Irish rock from the Western US.',
    youtubeId: 'U5_uF97dK8s',
    year: '2017',
  },
  {
    id: 'LTZGmeRHnuQ',
    type: 'video',
    title: 'Mary Mac',
    description: 'Irish rock from the Western US.',
    youtubeId: 'LTZGmeRHnuQ',
    year: '2017',
  },
  {
    id: 'CuLVKqk1xWQ',
    type: 'video',
    title: 'Piper Down',
    description: 'The song that lit the match at Salt Lake City’s Piper Down.',
    youtubeId: 'CuLVKqk1xWQ',
    year: '2017',
  },
  {
    id: '3YN4kfas5ms',
    type: 'video',
    title: 'Raggle Taggle',
    description: 'Irish rock from the Western US.',
    youtubeId: '3YN4kfas5ms',
    year: '2017',
  },
  {
    id: 'BeDm98fbst4',
    type: 'video',
    title: "Morrison's Jig",
    description: 'Irish rock from the Western US.',
    youtubeId: 'BeDm98fbst4',
    year: '2015',
  },
  {
    id: 'o2Ss1P0o71U',
    type: 'video',
    title: "Mrs Myrtle's Daughter",
    description: 'Music video · Copyright 2010',
    youtubeId: 'o2Ss1P0o71U',
    year: '2011',
  },
  {
    id: 'YPAPdKObol0',
    type: 'video',
    title: "Paddy's in America",
    description: 'Live at The Depot, Salt Lake City — opening for The Young Dubliners.',
    youtubeId: 'YPAPdKObol0',
    year: '2011',
  },
  {
    id: 'EgmyGZJvVsI',
    type: 'video',
    title: 'Tito',
    description: 'Live at The Depot, Salt Lake City — opening for The Young Dubliners.',
    youtubeId: 'EgmyGZJvVsI',
    year: '2011',
  },
  {
    id: 'Q3KP2z3uTd8',
    type: 'video',
    title: "Myrtle's Daughter — Live",
    description: 'Live at The Depot, Salt Lake City.',
    youtubeId: 'Q3KP2z3uTd8',
    year: '2011',
  },
]

export function formatShowDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function upcomingShows() {
  return [...shows]
    .filter((s) => s.upcoming)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function pastShows() {
  return [...shows]
    .filter((s) => !s.upcoming)
    .sort((a, b) => b.date.localeCompare(a.date))
}
