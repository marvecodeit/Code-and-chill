import { Arrow } from '../components/Arrow'
import { FeatureCard } from '../components/FeatureCard'

export default function HomePage() {
  return <>
    <section className="hero page-pad">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot" /> LAGOS, NIGERIA <span className="eyebrow-slash">/</span> A DAY FOR THE CURIOUS</div>
        <h1>Make good<br /><span className="serif-italic">things.</span><span className="hero-period">&nbsp;Meet good people.</span></h1>
        <p className="hero-sub">A little less scrolling. A lot more making.<br />One easygoing day for the people shaping what’s next.</p>
        <div className="hero-actions"><a className="button button-dark" href="/rsvp">Save your spot <Arrow /></a><a className="text-link" href="/day">See what’s on <span>→</span></a></div>
        <div className="hero-meta"><div><span className="meta-label">WHEN</span><span>Sat, 12 December 2026</span></div><span className="meta-rule" /><div><span className="meta-label">WHERE</span><span>Landmark Centre, Lagos</span></div></div>
      </div>
      <div className="hero-art" aria-label="A creative community gathering in Lagos" role="img"><div className="art-stamp"><span>GOOD<br />IDEAS<br />HAPPEN<br /><i>IRL</i></span><span className="stamp-star">✳</span></div><div className="art-photo" /><div className="art-caption"><span>01 — 05</span><span>PEOPLE, IDEAS & A LITTLE SUNSHINE</span></div><div className="art-note">Made for<br />the in-between<br />moments<span>↗</span></div></div>
      <div className="hero-side-note">CURIOSITY LOOKS GOOD ON YOU <span>↘</span></div>
    </section>
    <div className="ticker" aria-label="Come curious, leave connected"><div className="ticker-track">{Array.from({ length: 4 }, (_, i) => <span key={i}>COME CURIOUS <b>✳</b> LEAVE CONNECTED <b>✳</b> MAKE A LITTLE NOISE <b>✳</b>&nbsp;</span>)}</div></div>
    <section className="home-intro page-pad">
      <p className="eyebrow">NOT ANOTHER CONFERENCE <span className="eyebrow-slash">/ JUST A GOOD DAY OUT</span></p>
      <div className="home-intro-grid"><h2>A little room to<br /><span className="serif-italic">try something new.</span></h2><div><p>Code & Chill is a one-day meetup for people who like making things, asking better questions, and meeting the person they didn’t know they needed to meet.</p><p>Come as you are: designer, developer, founder, student, curious friend. There’s no dress code for good ideas, and no one expects you to have it all figured out.</p><a className="text-link" href="/day">Here’s how the day goes <Arrow /></a></div></div>
    </section>
    <section className="home-experience page-pad"><div className="experience-top"><p className="eyebrow">A GOOD MIX OF THINGS <span className="eyebrow-slash">/ 03 WAYS TO JOIN IN</span></p><p className="experience-aside">Bring a question. Leave with a new tab open in your brain.</p></div><div className="feature-grid"><FeatureCard index="01" eyebrow="MAKE" title="Learn by doing" description="Get your hands into a friendly workshop, then make a small thing with a new team." href="/day">✳</FeatureCard><FeatureCard index="02" eyebrow="MEET" title="Find your people" description="Talk shop with thoughtful builders and speakers who remember what starting felt like." href="/speakers">↗</FeatureCard><FeatureCard index="03" eyebrow="UNWIND" title="Stay for the good bit" description="Show what you made, share a meal, and let the best conversations happen in between." href="/day">☼</FeatureCard></div></section>
    <section className="home-bottom page-pad"><div><p className="eyebrow">SATURDAY, 12 DECEMBER · LANDMARK CENTRE</p><h2>Your next good idea<br /><span className="serif-italic">might start here.</span></h2></div><a className="button button-lime" href="/rsvp">Come through <Arrow /></a><span className="bottom-star">✳</span></section>
  </>
}
