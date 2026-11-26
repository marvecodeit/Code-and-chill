import { useState } from 'react'
import { Arrow } from './components/Arrow'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import DayPage from './pages/DayPage'
import SpeakersPage from './pages/SpeakersPage'
import RsvpPage from './pages/RsvpPage'
import './App.css'

const routes = [
  { href: '/', label: 'Home' },
  { href: '/day', label: 'The day' },
  { href: '/speakers', label: 'Speakers' },
]

function App() {
  const [dark, setDark] = useState(false)
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const page = path === '/day' ? <DayPage /> : path === '/speakers' ? <SpeakersPage /> : path === '/rsvp' ? <RsvpPage /> : <HomePage />

  return (
    <main className={dark ? 'site dark' : 'site'}>
      <header className="nav-shell">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="Code and Chill, home"><span className="brand-mark">c<span>·</span></span><span className="brand-name">code & chill<span className="brand-city"> / lagos</span></span></a>
          <div className="nav-links">{routes.map(route => <a key={route.href} className={path === route.href ? 'active' : ''} href={route.href}>{route.label}</a>)}</div>
          <div className="nav-actions"><button className="theme-toggle" type="button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}><span>{dark ? '☼' : '◐'}</span></button><a className="nav-cta" href="/rsvp">Get a ticket <Arrow diagonal /></a></div>
        </nav>
      </header>
      <div className="page-motion" key={path}>{page}</div>
      <SiteFooter />
    </main>
  )
}

export default App
