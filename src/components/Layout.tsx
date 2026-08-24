import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Nav } from './Nav'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Nav />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
