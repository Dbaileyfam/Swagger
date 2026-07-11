export const band = {
  name: 'Swagger',
  tagline: 'Celtic Americana Rock',
  location: 'Park City, Utah',
  formed: 2007,
  email: 'texasrick63@msn.com',
  phone: '(801) 550-1140',
  social: {
    facebook: 'https://www.facebook.com/swaggertheband',
    twitter: 'https://twitter.com/swaggertheband',
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

export const mediaItems = [
  {
    id: 'live-1',
    type: 'video' as const,
    title: 'Live at Piper Down',
    description: 'High-energy Celtic rock from the stage that started it all.',
  },
  {
    id: 'live-2',
    type: 'video' as const,
    title: 'Festival Set Highlights',
    description: 'Fiddle, tin whistle, and full-band fire from the festival circuit.',
  },
  {
    id: 'photo-1',
    type: 'photo' as const,
    title: 'On Stage',
    description: 'Swagger live — Park City and beyond.',
  },
  {
    id: 'photo-2',
    type: 'photo' as const,
    title: 'Highland Games',
    description: 'Celtic festivals across the Mountain West.',
  },
  {
    id: 'album-gypsy',
    type: 'music' as const,
    title: 'Gypsy Road',
    description: 'Studio album · 2017',
  },
  {
    id: 'album-america',
    type: 'music' as const,
    title: 'America Land',
    description: 'Studio album · 2013',
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
