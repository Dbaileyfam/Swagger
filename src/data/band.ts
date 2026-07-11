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
  },
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
  bio: `Swagger was formed by Rick Butler in 2007 when he moved from California to Utah bringing his love of Irish music. Along with local fiddler Dennis Harrington from Chicago, he put together a group of local musicians to form the band. Swagger played their first pub show at the Piper Down on April 24th, 2007. The match was lit and the band took off.

Swagger has been honing their original brand of Celtic music at festivals and concert halls across the United States ever since. Well known for their high-energy stage performances and catchy original songs, Swagger's music is the expected Irish celebration of drink, mischief, and music — which also dares to explore oppression and take an emigrant's perspective on the virtues and vices of Irish-American culture.

In 2010 Swagger assembled Utah's first Irish Music Festival at Deer Valley in front of 5,000 new fans. After three years of hosting their own Irish festival, the band hit the road performing at festivals along the west coast.`,
  shortBio: `High-energy Celtic rock from Park City — drink, mischief, and music with an emigrant's eye on Irish-American life.`,
  epkBlurb: `Swagger is a premier Irish rock band based out of Park City, Utah. Since 2007 they have brought high-energy Celtic Americana to festivals and concert halls across the United States. Their songs depict the struggles of the Irish, Welsh, Scots, and Italian Gypsies who came to America to start a new life.`,
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
  year?: string
}

/** Videos from https://www.youtube.com/@SwaggerTheBand */
export const mediaItems: MediaItem[] = [
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
  {
    id: 'album-gypsy',
    type: 'music',
    title: 'Gypsy Road',
    description: 'Studio album · 2017',
    year: '2017',
  },
  {
    id: 'album-america',
    type: 'music',
    title: 'America Land',
    description: 'Studio album · 2013',
    year: '2013',
  },
  {
    id: 'album-grave',
    type: 'music',
    title: 'The Grave',
    description: 'Studio album · 2010',
    year: '2010',
  },
  {
    id: 'album-trouble',
    type: 'music',
    title: 'Trouble on the Green',
    description: 'Studio album · 2008',
    year: '2008',
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
