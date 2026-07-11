import { Link } from 'react-router-dom'
import { CelticKnot } from '../components/CelticKnot'
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
            <CelticKnot className="celtic-knot" />
          </div>
          <div className="home-about__copy">
            <p className="section-label">The Band</p>
            <h2 className="section-title">Celtic fire from the Mountain West</h2>
            <hr className="gold-rule" />
            <p>
              Formed in {band.formed} at Salt Lake City&apos;s Piper Down, Swagger has spent nearly
              two decades bringing original Celtic rock to festivals and halls across the United
              States.
            </p>
            <p>
              Drink, mischief, and music — with an emigrant&apos;s eye on Irish-American life.
            </p>
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
