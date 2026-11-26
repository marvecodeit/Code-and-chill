# Code & Chill Lagos

An immersive, scene-based experience for a Lagos developer community. Move through five fixed-viewport scenes with wheel, trackpad, touch, keyboard, or the scene navigation. The environment uses Three.js; GSAP coordinates scene, camera, and content transitions.

## Run locally

```bash
npm install
npm run dev
```

## Project checks

```bash
npm run build
npm run lint
```

## Scenes

1. Home — community introduction and event date/location.
2. Community — purpose and values, without invented member counts.
3. Events — replaceable event format ideas and a route to the RSVP flow.
4. What we do — community activities.
5. Join us — configurable invitation CTA and local RSVP form.

The RSVP form is front-end only. It validates and displays a confirmation but does not transmit or store registration data. Set `COMMUNITY_INVITE_URL` in `src/experience/sceneConfig.ts` when the real invite link is available.

See the [documentation index](docs/README.md) and [implementation guide](docs/implementation.md) for architecture, interaction, accessibility, and performance notes.
