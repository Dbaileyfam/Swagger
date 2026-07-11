import { Link } from 'react-router-dom'
import { band } from '../data/band'

export function Epk() {
  return (
    <>
      <header className="page-hero">
        <p className="section-label">For Promoters</p>
        <h1 className="section-title">Electronic Press Kit</h1>
        <hr className="gold-rule gold-rule--center" />
        <p className="section-lede" style={{ margin: '0 auto' }}>
          Bio, lineup, discography, and booking details for festivals, venues, and press.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-inner epk-layout">
          <div>
            <p className="section-label">Biography</p>
            <div className="epk-bio">
              {band.bio.split('\n\n').map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              <p>{band.epkBlurb}</p>
            </div>
          </div>

          <div className="epk-grid">
            <div className="epk-block">
              <h3>Lineup</h3>
              <ul>
                {band.members.map((m) => (
                  <li key={m.name}>
                    <strong>{m.name}</strong>
                    {m.role}
                  </li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Discography</h3>
              <ul>
                {band.albums.map((a) => (
                  <li key={a.title}>
                    <strong>{a.title}</strong>
                    {a.year}
                  </li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Shared the Stage With</h3>
              <ul>
                {band.sharedStage.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="epk-block">
              <h3>Booking</h3>
              <ul>
                <li>
                  <strong>Rick Butler</strong>
                  Manager
                </li>
                <li>
                  <a href={`mailto:${band.email}`}>{band.email}</a>
                </li>
                <li>
                  <a href={`tel:${band.phone.replace(/\D/g, '')}`}>{band.phone}</a>
                </li>
                <li>{band.location}</li>
              </ul>
            </div>
          </div>

          <div className="epk-actions">
            <Link to="/contact" className="btn btn-solid">
              Contact for Booking
            </Link>
            <Link to="/media" className="btn">
              Photos & Video
            </Link>
            <a
              className="btn"
              href="https://swaggertheband.com/epk-files/"
              target="_blank"
              rel="noreferrer"
            >
              Legacy EPK Photos
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
