import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shows', label: 'Shows' },
  { to: '/media', label: 'Media' },
  { to: '/store', label: 'Store' },
  { to: '/epk', label: 'EPK' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <img
          src={`${import.meta.env.BASE_URL}swagger-cross.png`}
          alt="Swagger"
          className="nav-brand__logo"
          width={880}
          height={880}
        />
      </NavLink>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  )
}
