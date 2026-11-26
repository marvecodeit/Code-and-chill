# Implementation guide

## Overview

The app is a multi-page event website for Code & Chill Lagos. It uses React 19 and TypeScript, bundled by Vite. Tailwind CSS 4 is loaded from `src/index.css`; the page's art direction and responsive layout live in `src/App.css`.

## Page sections

`src/App.tsx` provides shared navigation and imports the footer component, then selects an imported page by URL path. The page content enters with a short slide and fade animation. The pages are:

1. `/` — Home hero, event introduction, experience cards, links to other pages, and a final RSVP call to action.
2. `/day` — Event information and five schedule sessions.
3. `/speakers` — Three speaker profiles.
4. `/rsvp` — RSVP form with Regular and VIP ticket options.

The shared schedule and speaker data live in `src/data/event.ts`. Update those arrays to change the displayed items. Shared navigation, `SiteFooter`, `Arrow`, and `FeatureCard` components are imported where they are used. Shared navigation includes the theme toggle and appears on each route.

## Styling and responsive behavior

`src/index.css` imports Tailwind and sets global typography, rendering defaults, and reduced-motion behavior. `src/App.css` defines the visual system, layout, breakpoints, interactions, and theme variables. The design uses a warm paper background, restrained olive tones, a lime accent, orange details, and italic display type.

The layout shifts from two-column hero and RSVP arrangements on wide screens to stacked content on narrow screens. The schedule hides its category label on small screens to preserve room for session names. Speaker cards switch from a three-column row to a single column on phones. Navigation links load independent paths instead of scrolling to section anchors.

The theme button toggles the `.dark` class on the root `.site` element. Theme colors are CSS custom properties, so both modes share the same component styles.

## RSVP behavior

The form uses React state and a submit handler. It checks that the full name contains at least two characters and that the email has a basic valid format. Invalid entries receive a clear inline message and focus moves to the relevant field. A valid submission displays a friendly confirmation and resets the fields.

The form does not send or persist data. To collect real RSVPs, connect the handler to an approved API or form service, then add loading and server-error states. Avoid logging personal data to the browser console.

## Accessibility details

- Navigation and form controls use semantic elements and labels.
- Form messages are announced through a live status region.
- The theme control has a descriptive accessible label.
- Images have speaker-specific alternative text; decorative SVG arrows are hidden from assistive technology.
- Reduced-motion preferences disable nonessential animation and smooth scrolling.

## External assets

The hero and speaker photography is loaded from Unsplash URLs. Google Fonts are loaded in `src/index.css`. These assets need an internet connection. For an offline or production deployment with fixed assets, download licensed image/font files into `src/assets` and update the references.

## Development commands

```bash
npm install
npm run dev
npm run build
npm run lint
```
