import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YoutubeIcon,
} from './SocialIcons'
import { band } from '../data/band'

const ring = `${import.meta.env.BASE_URL}celtic-ring-weave.png`

type SocialCelticLinksProps = {
  className?: string
  label?: string
}

export function SocialCelticLinks({
  className = '',
  label = 'Social links',
}: SocialCelticLinksProps) {
  const cls = ['celtic-links', className].filter(Boolean).join(' ')

  return (
    <div className={cls} aria-label={label}>
      <a
        href={band.social.facebook}
        className="celtic-link"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <img src={ring} alt="" className="celtic-link__ring" width={320} height={320} />
        <FacebookIcon className="celtic-link__icon" />
      </a>
      <a
        href={band.social.instagram}
        className="celtic-link"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <img src={ring} alt="" className="celtic-link__ring" width={320} height={320} />
        <InstagramIcon className="celtic-link__icon" />
      </a>
      <a
        href={band.social.youtube}
        className="celtic-link"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
      >
        <img src={ring} alt="" className="celtic-link__ring" width={320} height={320} />
        <YoutubeIcon className="celtic-link__icon" />
      </a>
      <a
        href={band.social.spotify}
        className="celtic-link"
        target="_blank"
        rel="noreferrer"
        aria-label="Spotify"
      >
        <img src={ring} alt="" className="celtic-link__ring" width={320} height={320} />
        <SpotifyIcon className="celtic-link__icon" />
      </a>
    </div>
  )
}
