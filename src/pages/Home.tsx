import { Link } from 'react-router-dom'
import { CelticButton } from '../components/CelticButton'
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
            <span className="home-hero__logo-wrap">
              <img
                src={`${import.meta.env.BASE_URL}swagger-mark-crest-v3.png`}
                alt="Swagger"
                className="home-hero__logo"
                width={1952}
                height={768}
              />
              <span className="home-hero__glitter" aria-hidden="true">
                <span className="logo-glint logo-glint--1" />
                <span className="logo-glint logo-glint--2" />
                <span className="logo-glint logo-glint--3" />
                <span className="logo-glint logo-glint--4" />
                <span className="logo-glint logo-glint--5" />
                <span className="logo-glint logo-glint--6" />
                <span className="logo-glint logo-glint--7" />
                <span className="logo-glint logo-glint--8" />
                <span className="logo-glint logo-glint--9" />
                <span className="logo-glint logo-glint--10" />
                <span className="logo-glint logo-glint--11" />
                <span className="logo-glint logo-glint--12" />
                <span className="logo-glint logo-glint--13" />
                <span className="logo-glint logo-glint--14" />
                <span className="logo-glint logo-glint--15" />
                <span className="logo-glint logo-glint--16" />
                <span className="logo-glint logo-glint--17" />
                <span className="logo-glint logo-glint--18" />
              </span>
            </span>
          </h1>
          <hr className="gold-rule gold-rule--center" />
          <p className="home-hero__tag">{band.tagline}</p>
          <p className="home-hero__lede">{band.shortBio}</p>
          <div className="celtic-links" aria-label="Quick links">
            <Link to="/shows" className="celtic-link">
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <span className="celtic-link__label">
                Tour
                <br />
                Dates
              </span>
            </Link>
            <Link to="/epk" className="celtic-link">
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <span className="celtic-link__label">
                Press
                <br />
                Kit
              </span>
            </Link>
            <a
              href={band.social.facebook}
              className="celtic-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <FacebookIcon className="celtic-link__icon" />
            </a>
            <a
              href={band.social.instagram}
              className="celtic-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <InstagramIcon className="celtic-link__icon" />
            </a>
            <a
              href={band.social.youtube}
              className="celtic-link"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <YoutubeIcon className="celtic-link__icon" />
            </a>
            <a
              href={band.social.spotify}
              className="celtic-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Spotify"
            >
              <img
                src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
                alt=""
                className="celtic-link__ring"
                width={320}
                height={320}
              />
              <SpotifyIcon className="celtic-link__icon" />
            </a>
          </div>
        </div>
        <div className="home-hero__scroll">Scroll</div>
      </section>

      <section className="home-listen" aria-label="Featured song">
        <div className="section-inner home-listen__inner">
          <p className="home-listen__cue">
            <span className="home-listen__pulse" aria-hidden="true" />
            Press play
          </p>
          <p className="home-listen__hint">Hit play as you scroll — a taste of Swagger live on the road.</p>
          <div className="home-listen__player">
            <iframe
              data-testid="embed-iframe"
              title="Swagger featured track on Spotify"
              src={band.spotifyFeaturedTrack}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
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
            <h2 className="section-title">{band.tagline}</h2>
            <hr className="gold-rule" />
            {band.bio.split('\n\n').map((para) => (
              <p className="bio-text" key={para.slice(0, 40)}>
                {para}
              </p>
            ))}
            <div className="btn-row">
              <CelticButton to="/shows">
                See
                <br />
                Shows
              </CelticButton>
              <CelticButton to="/media">
                Watch &
                <br />
                Listen
              </CelticButton>
              <CelticButton to="/contact">
                Book the
                <br />
                Band
              </CelticButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-lineup" aria-labelledby="home-lineup-heading">
        <div className="section-inner">
          <h2 id="home-lineup-heading" className="section-title">
            Lineup
          </h2>
          <hr className="gold-rule" />
          <p className="section-lede">
            The faces behind Swagger — click through for more photos of each member.
          </p>
          <div className="lineup-grid">
            {band.members.map((member) => (
              <article className="lineup-card" key={member.slug}>
                <div className="lineup-card__photo">
                  <img
                    src={`${import.meta.env.BASE_URL}${member.photo}`}
                    alt={member.name}
                    loading="lazy"
                  />
                </div>
                <div className="lineup-card__body">
                  <h3 className="lineup-card__name">{member.name}</h3>
                  <p className="lineup-card__role">{member.role}</p>
                  {member.gallery.length > 0 ? (
                    <details className="lineup-card__more">
                      <summary>See more pictures of {member.name.split(' ')[0]}</summary>
                      <div className="lineup-card__gallery">
                        {member.gallery.map((src) => (
                          <img
                            key={src}
                            src={`${import.meta.env.BASE_URL}${src}`}
                            alt={`${member.name} additional photo`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
