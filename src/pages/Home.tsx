import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YoutubeIcon,
} from '../components/SocialIcons'
import { band } from '../data/band'

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__glow" aria-hidden="true" />
        <div className="home-hero__sparkles" aria-hidden="true">
          <span className="spark spark--a" />
          <span className="spark spark--b" />
          <span className="spark spark--c" />
          <span className="spark spark--d" />
          <span className="spark spark--e" />
          <span className="spark spark--f" />
          <span className="spark spark--g" />
          <span className="spark spark--h" />
          <span className="spark spark--i" />
          <span className="spark spark--j" />
          <span className="spark spark--k" />
          <span className="spark spark--l" />
        </div>
        <div className="home-hero__ornament" aria-hidden="true" />
        <div className="home-hero__content">
          <h1 className="home-hero__brand">
            <img
              src={`${import.meta.env.BASE_URL}swagger-mark-crest.png`}
              alt="Swagger"
              className="home-hero__logo"
              width={1952}
              height={768}
            />
          </h1>
          <hr className="gold-rule gold-rule--center" />
          <p className="home-hero__tag">{band.tagline}</p>
          <p className="home-hero__lede">{band.shortBio}</p>
          <div className="gold-coins" aria-label="Quick links">
            <Link to="/shows" className="gold-coin gold-coin--tour">
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <span className="gold-coin__label">
                Tour
                <br />
                Dates
              </span>
            </Link>
            <Link to="/epk" className="gold-coin gold-coin--press">
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <span className="gold-coin__label">
                Press
                <br />
                Kit
              </span>
            </Link>
            <a
              href={band.social.facebook}
              className="gold-coin gold-coin--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <FacebookIcon className="gold-coin__icon" />
            </a>
            <a
              href={band.social.instagram}
              className="gold-coin gold-coin--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <InstagramIcon className="gold-coin__icon" />
            </a>
            <a
              href={band.social.youtube}
              className="gold-coin gold-coin--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <YoutubeIcon className="gold-coin__icon" />
            </a>
            <a
              href={band.social.spotify}
              className="gold-coin gold-coin--icon"
              target="_blank"
              rel="noreferrer"
              aria-label="Spotify"
            >
              <span className="gold-coin__rim" aria-hidden="true" />
              <span className="gold-coin__shine" aria-hidden="true" />
              <SpotifyIcon className="gold-coin__icon" />
            </a>
          </div>
        </div>
        <div className="home-hero__scroll">Scroll</div>
      </section>

      <section className="section">
        <div className="section-inner home-about">
          <div className="home-about__visual">
            <div className="home-about__photo-frame">
              <img
                src={`${import.meta.env.BASE_URL}band-photo.png`}
                alt="Swagger the Band"
                className="home-about__photo"
              />
            </div>
            <img
              src={`${import.meta.env.BASE_URL}swagger-crest.png`}
              alt=""
              className="home-about__crest"
              width={509}
              height={485}
            />
          </div>
          <div className="home-about__copy">
            <p className="section-label">Biography</p>
            <h2 className="section-title">{band.tagline}</h2>
            <hr className="gold-rule" />
            {band.bio.split('\n\n').map((para) => (
              <p className="bio-text" key={para.slice(0, 40)}>
                {para}
              </p>
            ))}
            <div className="btn-row">
              <Link to="/shows" className="btn">
                See Shows
              </Link>
              <Link to="/media" className="btn">
                Watch & Listen
              </Link>
              <Link to="/contact" className="btn">
                Book the Band
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
