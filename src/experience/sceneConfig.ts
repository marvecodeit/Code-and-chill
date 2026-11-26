export type SceneId = 'home' | 'community' | 'events' | 'activities' | 'join'

export const scenes: { id: SceneId; label: string; index: string }[] = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'community', label: 'Community', index: '02' },
  { id: 'events', label: 'Events', index: '03' },
  { id: 'activities', label: 'What we do', index: '04' },
  { id: 'join', label: 'Join us', index: '05' },
]

// Add the real invite URL here when one is available.
export const COMMUNITY_INVITE_URL = ''

export const eventFormats = [
  { title: 'Developer meetups', kind: 'PEOPLE + CONVERSATION', note: 'A room full of people who get what you are building.' },
  { title: 'Coding sessions', kind: 'LEARN BY MAKING', note: 'Bring a laptop, leave with a little more confidence.' },
  { title: 'Tech talks', kind: 'IDEAS TO TAKE HOME', note: 'Practical stories from people working in the field.' },
  { title: 'Networking', kind: 'MEET YOUR PEOPLE', note: 'No awkward scripts. Just good conversation.' },
  { title: 'Hackathons', kind: 'MAKE IT TOGETHER', note: 'Small teams, open minds, something new by the end.' },
  { title: 'Community hangouts', kind: 'OFF THE CLOCK', note: 'Come for the company. Stay as long as you like.' },
]

export const activities = [
  { number: '01', title: 'Learn together', note: 'Trade notes, ask questions, and make the hard things feel doable.' },
  { number: '02', title: 'Build projects', note: 'Turn a rough idea into something you can show someone.' },
  { number: '03', title: 'Meet developers', note: 'Find collaborators, peers, and new perspectives.' },
  { number: '04', title: 'Share experience', note: 'Make room for honest stories about the work and the learning.' },
  { number: '05', title: 'Make space for mentorship', note: 'Help someone a step behind, or learn from someone a step ahead.' },
  { number: '06', title: 'Hang out', note: 'Let the best ideas arrive in the breaks between everything else.' },
]
