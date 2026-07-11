import { Link } from 'react-router-dom'
import { band } from '../data/band'

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__glow" aria-hidden="true" />
        <div className="home-hero__ornament" aria-hidden="true" />
        <div className="home-hero__content">
          <h1 className="home-hero__brand">{band.name}</h1>
          <hr className="gold-rule gold-rule--center" />
          <p className="home-hero__tag">{band.tagline}</p>
          <p className="home-hero__lede">{band.shortBio}</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link to="/shows" className="btn btn-solid">
              Tour Dates
            </Link>
            <Link to="/epk" className="btn">
              Press Kit
            </Link>
          </div>
        </div>
        <div className="home-hero__scroll">Scroll</div>
      </section>

      <section className="section">
        <div className="section-inner home-about">
          <div className="home-about__visual">
            <img
              src={`${import.meta.env.BASE_URL}band-photo.png`}
              alt="Swagger the Band"
              className="home-about__photo"
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
