import { useState } from 'react'
import './index.css'

const photos = {
  hero: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2200&q=88',
  people: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',
  workshop: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
  meetup: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85',
  talk: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=85',
}

const events = [
  { number: '01', type: 'MEET PEOPLE', title: 'Developer meetups', copy: 'Good conversations with people building things, figuring things out, and finding their people.', image: photos.meetup },
  { number: '02', type: 'LEARN BY DOING', title: 'Hands-on sessions', copy: 'Bring your laptop, work through a real problem, and pick up something useful along the way.', image: photos.workshop },
  { number: '03', type: 'SHARE IDEAS', title: 'Tech talks & stories', copy: 'Honest lessons from the work: what shipped, what broke, and what we learned.', image: photos.talk },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Brand() {
  return <a className="brand" href="#home" aria-label="Code and Chill Lagos home"><span className="brand-symbol">C<span>+</span></span><span>CODE & CHILL <small>LAGOS</small></span></a>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <main>
    <header className="site-header">
      <Brand />
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {[['About', '#about'], ['Community', '#community'], ['Events', '#events'], ['What we do', '#what-we-do']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Join the community <Arrow diagonal /></a>
      </nav>
    </header>

    <section className="hero" id="home">
      <img className="hero-image" src={photos.hero} alt="Friends and colleagues sharing a meal around a table" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow light"><span /> A COMMUNITY FOR THE CURIOUS</p>
        <h1>Good people.<br /><em>Great ideas.</em><br />No gatekeeping.</h1>
        <p className="hero-copy">A Lagos community for developers, designers, creatives and curious minds. We come together to build, learn, share and enjoy the journey.</p>
        <div className="hero-actions"><a className="button button-lime" href="#community">Get to know us <Arrow diagonal /></a><a className="text-link light-link" href="#events">Explore what’s on <Arrow /></a></div>
      </div>
      <div className="hero-bottom"><span>LAGOS, NIGERIA</span><span>BUILD / LEARN / SHARE / CHILL</span><span>06° 27′ N&nbsp; 03° 23′ E</span></div>
      <span className="hero-stamp">C&amp;C<br /><small>COMMUNITY<br />SINCE DAY ONE</small></span>
    </section>

    <div className="ticker" aria-label="Our values"><div>{Array.from({ length: 2 }, (_, i) => <span key={i}>MAKE THINGS <b>✳</b> MEET PEOPLE <b>✳</b> SHARE KNOWLEDGE <b>✳</b> STAY CURIOUS <b>✳</b> </span>)}</div></div>

    <section className="intro section-pad" id="about">
      <div className="section-index">01 / THE IDEA</div>
      <div className="intro-main"><p className="eyebrow"><span /> MORE THAN A TECH COMMUNITY</p><h2>Technology brings us together. <em>People make it matter.</em></h2></div>
      <div className="intro-bottom"><p>Code &amp; Chill Lagos is a space for people who love technology and the possibilities it creates. Whether you're writing your first line of code or shipping your next big idea, there's room for you here.</p><a className="circle-link" href="#community" aria-label="Discover the community"><Arrow diagonal /></a></div>
    </section>

    <section className="community section-pad" id="community">
      <div className="community-photo"><img src={photos.people} alt="A small team collaborating around a table" loading="lazy" /><span className="photo-caption">REAL PEOPLE. SHARED ENERGY.</span></div>
      <div className="community-copy"><p className="eyebrow"><span /> THE PEOPLE</p><h2>Come as you are.<br /><em>Grow together.</em></h2><p>We're developers, product people, designers, founders, students and lifelong learners. Different backgrounds, different skill levels, one shared curiosity.</p><ul><li><span>01</span> Open to every experience level</li><li><span>02</span> People before titles</li><li><span>03</span> Collaboration over competition</li></ul><a className="underlined-link" href="#contact">Find your people <Arrow /></a></div>
    </section>

    <section className="events section-pad" id="events">
      <div className="section-heading"><div><p className="eyebrow"><span /> GOOD REASONS TO GET TOGETHER</p><h2>Less scrolling.<br /><em>More doing.</em></h2></div><p>We make room for the conversations, shared experiences and unexpected connections that move us forward.</p></div>
      <div className="event-grid">{events.map(event => <article className="event-card" key={event.number}><div className="event-image"><img src={event.image} alt="" loading="lazy" /><span>{event.number}</span></div><div className="event-meta">{event.type}</div><h3>{event.title}</h3><p>{event.copy}</p><a href="#contact" aria-label={`Get involved in ${event.title}`}>Get involved <Arrow diagonal /></a></article>)}</div>
      <p className="events-footnote">Our formats evolve with the community. Follow along for upcoming dates and announcements.</p>
    </section>

    <section className="manifesto" id="what-we-do">
      <div className="manifesto-image"><img src={photos.workshop} alt="A laptop and notebook ready for a collaborative work session" loading="lazy" /></div>
      <div className="manifesto-copy"><p className="eyebrow light"><span /> WHAT WE'RE HERE FOR</p><h2>Learn something.<br />Build something.<br /><em>Meet someone.</em></h2><p>From peer learning and project sessions to mentorship, honest conversations and relaxed hangouts — there's always a reason to show up.</p><a className="button button-outline" href="#contact">Be part of it <Arrow diagonal /></a></div>
    </section>

    <section className="values section-pad"><p className="eyebrow"><span /> THE CODE & CHILL WAY</p><div className="value-grid"><article><span>01</span><h3>Stay curious.</h3><p>Ask questions. Try things. Keep learning.</p></article><article><span>02</span><h3>Share generously.</h3><p>Your experience can help someone else move forward.</p></article><article><span>03</span><h3>Make it together.</h3><p>Great things happen when different minds meet.</p></article></div></section>

    <section className="contact section-pad" id="contact"><p className="eyebrow light"><span /> YOUR PEOPLE ARE OUT THERE</p><h2>Pull up a chair.<br /><em>There's room for you.</em></h2><p>Come curious. Leave connected. Be part of what we're building in Lagos.</p><a className="button button-lime" href="mailto:hello@codeandchill.ng?subject=Code%20%26%20Chill%20Lagos">Say hello <Arrow diagonal /></a><span className="contact-note">Community invite and upcoming event details will be shared here.</span></section>

    <footer className="site-footer"><Brand /><p>Built around people, powered by curiosity.</p><span>© {new Date().getFullYear()} CODE &amp; CHILL LAGOS</span><a href="#home">BACK TO TOP ↑</a></footer>
  </main>
}
