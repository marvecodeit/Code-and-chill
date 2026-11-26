import { useState, type FormEvent } from 'react'
import { Arrow } from '../components/Arrow'
import { activities, COMMUNITY_INVITE_URL, eventFormats, type SceneId } from './sceneConfig'

function SceneTag({ index, label }: { index: string; label: string }) {
  return <p className="scene-kicker" data-reveal><span>{index}</span><i />{label}</p>
}

export function SceneContent({ scene, onNavigate }: { scene: SceneId; onNavigate: (index: number) => void }) {
  const [inviteMessage, setInviteMessage] = useState('')
  const [showRsvp, setShowRsvp] = useState(false)
  const [rsvpMessage, setRsvpMessage] = useState('')

  function handleRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('rsvp-name') ?? '').trim()
    const email = String(formData.get('rsvp-email') ?? '').trim()
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRsvpMessage('Add your name and a valid email to reserve a spot.')
      return
    }
    setRsvpMessage(`Thanks, ${name.split(' ')[0]} — your RSVP is noted. Event registration is a demo and is not sent to a server.`)
    form.reset()
  }

  if (scene === 'home') return <section className="scene-copy hero-scene" aria-labelledby="scene-title">
    <SceneTag index="01 / 05" label="A COMMUNITY FOR THE CURIOUS" />
    <h1 className="scene-heading" id="scene-title" tabIndex={-1}><span data-reveal>CODE</span><span data-reveal>AND CHILL<span className="lime-period">.</span></span><span className="city-title" data-reveal>LAGOS<span className="lime-period">.</span></span></h1>
    <p className="scene-lede" data-reveal>A community of builders, developers, creatives and tech enthusiasts. We come together to build, learn, share ideas and chill.</p>
    <div className="scene-actions" data-reveal><button className="solid-action" onClick={() => onNavigate(4)}>Join the community <Arrow diagonal /></button><button className="quiet-action" onClick={() => onNavigate(2)}>Explore our events <Arrow /></button></div>
    <p className="scene-location" data-reveal><span>12 DECEMBER 2026</span><i />LANDMARK CENTRE, LAGOS</p>
    <div className="hero-object-label" aria-hidden="true"><span>FIG. 01</span><span>COMMUNITY / IN MOTION</span></div>
  </section>

  if (scene === 'community') return <section className="scene-copy community-scene" aria-labelledby="scene-title">
    <SceneTag index="02 / 05" label="THE COMMUNITY" />
    <h1 className="scene-heading scene-heading-medium" id="scene-title" tabIndex={-1}><span data-reveal>BUILT BY PEOPLE.</span><span className="scene-serif" data-reveal>CONNECTED BY CODE.</span></h1>
    <div className="community-copy" data-reveal><p>Code and Chill Lagos is a community for developers, designers, tech enthusiasts and people curious about technology.</p><p>We create space for conversations, collaboration, learning and friendships beyond the screen.</p></div>
    <div className="community-values" data-reveal><span>OPEN TO EVERY LEVEL</span><span>PEOPLE BEFORE TITLES</span><span>BUILT IN LAGOS</span></div>
    <button className="text-action" onClick={() => onNavigate(3)} data-reveal>See what we do <Arrow /></button>
  </section>

  if (scene === 'events') return <section className="scene-copy events-scene" aria-labelledby="scene-title">
    <SceneTag index="03 / 05" label="GATHERINGS, NOT JUST CALENDAR INVITES" />
    <div className="scene-heading-row"><h1 className="scene-heading scene-heading-medium" id="scene-title" tabIndex={-1}><span data-reveal>MEET.</span><span data-reveal>BUILD.</span><span className="scene-serif" data-reveal>CHILL.</span></h1><p className="events-intro" data-reveal>Different ways to show up, learn something, and leave with a few more names in your phone.</p></div>
    <div className="event-gallery" data-scene-scroll aria-label="Event formats">{eventFormats.map((event, index) => <article className={`event-card event-card-${index + 1}`} key={event.title} data-reveal><span className="event-number">0{index + 1}</span><span className="event-card-mark" aria-hidden="true">{['◈', '⌘', '✳', '↗', '▦', '◌'][index]}</span><span className="event-kind">{event.kind}</span><h2>{event.title}</h2><p>{event.note}</p><span className="placeholder-note">FORMAT IDEA · DATES TO COME</span><button className="event-rsvp" onClick={() => onNavigate(4)}>Next gathering · RSVP <Arrow diagonal /></button></article>)}</div>
    <p className="event-data-note" data-reveal>These are community event formats, not confirmed dates. The next listed gathering is <strong>12 December 2026 at Landmark Centre, Lagos.</strong></p>
  </section>

  if (scene === 'activities') return <section className="scene-copy activities-scene" aria-labelledby="scene-title">
    <SceneTag index="04 / 05" label="OUR SHARED PRACTICE" />
    <h1 className="scene-heading scene-heading-medium" id="scene-title" tabIndex={-1}><span data-reveal>MORE THAN</span><span className="scene-serif" data-reveal>JUST CODE.</span></h1>
    <div className="activity-list" data-scene-scroll>{activities.map((activity, index) => <article className={`activity-item activity-item-${index + 1}`} data-reveal key={activity.number}><span>{activity.number}</span><div><h2>{activity.title}</h2><p>{activity.note}</p></div><i aria-hidden="true">{['+', '↗', '⌁', '✳', '◈', '○'][index]}</i></article>)}</div>
  </section>

  return <section className="scene-copy join-scene" aria-labelledby="scene-title">
    <SceneTag index="05 / 05" label="YOUR PEOPLE ARE HERE" />
    <h1 className="scene-heading join-heading" id="scene-title" tabIndex={-1}><span data-reveal>YOUR NEXT</span><span className="scene-serif" data-reveal>CONNECTION</span><span data-reveal>COULD CHANGE</span><span className="city-title" data-reveal>EVERYTHING.</span></h1>
    <p className="scene-lede" data-reveal>Meet people who build, learn, share and grow together. Start with a conversation; see where it takes you.</p>
    {COMMUNITY_INVITE_URL ? <a className="solid-action" href={COMMUNITY_INVITE_URL} target="_blank" rel="noreferrer" data-reveal>Join Code and Chill Lagos <Arrow diagonal /></a> : <button className="solid-action" data-reveal onClick={() => setInviteMessage('The community invite link is being prepared. Check back soon.')}>Join Code and Chill Lagos <Arrow diagonal /></button>}
    {inviteMessage && <p className="invite-notice" role="status" aria-live="polite">{inviteMessage}</p>}
    <p className="join-note" data-reveal>We’ll share the community invite as soon as the next door opens.</p>
    <div className="join-rsvp-wrap" data-reveal><button className="text-action" onClick={() => setShowRsvp(!showRsvp)} aria-expanded={showRsvp}>{showRsvp ? 'Close event RSVP' : 'RSVP for 12 December meetup'} <Arrow /></button>{showRsvp && <form className="join-rsvp-form" onSubmit={handleRsvp} data-scene-scroll><label htmlFor="rsvp-name">Full name</label><input id="rsvp-name" name="rsvp-name" autoComplete="name" required minLength={2} placeholder="Your name" /><label htmlFor="rsvp-email">Email address</label><input id="rsvp-email" name="rsvp-email" type="email" autoComplete="email" required placeholder="you@example.com" /><label htmlFor="rsvp-ticket">Ticket type</label><select id="rsvp-ticket" name="rsvp-ticket" defaultValue="regular"><option value="regular">Regular — ₦5,000</option><option value="vip">VIP — ₦12,000</option></select><button className="solid-action" type="submit">Reserve a spot <Arrow /></button>{rsvpMessage && <p role="status" aria-live="polite" className="rsvp-status">{rsvpMessage}</p>}</form>}</div>
  </section>
}
