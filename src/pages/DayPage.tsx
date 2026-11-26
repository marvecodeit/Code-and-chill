import { Arrow } from '../components/Arrow'
import { sessions } from '../data/event'

export default function DayPage() {
  return <section className="day-section page-pad section-pad page-content">
    <p className="eyebrow">A DAY WELL SPENT <span className="eyebrow-slash">/ 01</span></p>
    <div className="section-heading"><div><h1 className="page-title">Room for ideas.<br /><span className="serif-italic">And everything after.</span></h1></div><p className="section-intro">Part workshop, part happy accident. Come to pick up a new skill, find your people, or just see where the day takes you.</p></div>
    <div className="day-details"><span>12 DECEMBER 2026</span><span>LANDMARK CENTRE · LAGOS</span><a href="/rsvp">Join us <Arrow /></a></div>
    <div className="schedule-list">{sessions.map((session, index) => <article className="schedule-row" key={session.time}><span className="schedule-index">0{index + 1}</span><span className="schedule-time">{session.time}</span><div className="schedule-main"><h3>{session.title}</h3><p>{session.note}</p></div><span className="schedule-tag">{session.tag}</span><span className="row-arrow"><Arrow diagonal /></span></article>)}</div>
  </section>
}
