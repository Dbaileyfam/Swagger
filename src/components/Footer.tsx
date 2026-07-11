import { band } from '../data/band'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{band.name}</div>
          <p className="footer-meta">
            {band.tagline} · {band.location}
          </p>
          <p className="footer-meta">
            © {new Date().getFullYear()} Swagger the Band. All rights reserved.
          </p>
        </div>
        <div className="footer-social">
          <a href={band.social.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={band.social.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={band.social.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  )
}
