import { useState, type FormEvent } from 'react'
import { Arrow } from '../components/Arrow'

export default function RsvpPage() {
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (name.length < 2) {
      setFormError(true)
      setFormMessage('Add your full name so we know who to save a seat for.')
      ;(form.elements.namedItem('name') as HTMLInputElement | null)?.focus()
      return
    }
    if (!emailOk) {
      setFormError(true)
      setFormMessage('That email doesn’t look quite right. Give it another check.')
      ;(form.elements.namedItem('email') as HTMLInputElement | null)?.focus()
      return
    }
    setFormError(false)
    setSubmitted(true)
    setFormMessage(`You’re on the list, ${name.split(' ')[0]}! We can’t wait to see you.`)
    form.reset()
  }

  return <section className="rsvp-section section-pad page-pad page-content"><div className="rsvp-copy"><p className="eyebrow">YOUR PEOPLE ARE HERE <span className="eyebrow-slash">/ 03</span></p><h1 className="page-title">Save a seat.<br /><span className="serif-italic">Bring your curiosity.</span></h1><p className="rsvp-blurb">Good conversations. A proper lunch. Things you didn’t know you needed to know. Your Saturday plans are sorted.</p><div className="ticket-note"><span className="ticket-icon">✳</span><div><strong>Small room, good energy.</strong><p>Tickets are limited so everyone gets a chance to join in.</p></div></div></div><form className="rsvp-form" onSubmit={handleSubmit} noValidate><div className="form-top"><span>YOUR RSVP</span><span>12.12.26&nbsp; ↗</span></div><label htmlFor="name">Full name</label><input id="name" name="name" type="text" placeholder="What should we call you?" autoComplete="name" required minLength={2} /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@somewhere.com" autoComplete="email" required /><label htmlFor="ticket">Pick your ticket</label><div className="select-wrap"><select id="ticket" name="ticket" defaultValue="regular"><option value="regular">Regular — ₦5,000</option><option value="vip">VIP — ₦12,000</option></select><span>⌄</span></div><button className="button button-lime submit-button" type="submit">Count me in <Arrow /></button>{formMessage && <p className={formError ? 'form-message error' : 'form-message success'} role="status" aria-live="polite">{submitted && <span>✳&nbsp; </span>}{formMessage}</p>}<p className="form-fineprint">No spam. Just the details you need before the day.</p></form></section>
}
