# Implementation guide

## 1. Overview

Code & Chill Lagos is a conventional responsive community website. It is intentionally not a full-screen scene experience: visitors use normal browser scrolling to move through the page and can use the header links to jump to each section.

The current frontend uses React, TypeScript, Vite, Tailwind CSS and custom CSS. GSAP and Three.js were removed from the application's direct dependencies and the old scene-based implementation was deleted.

## 2. Application structure

- `src/main.tsx` creates the React root, wraps the application in React Strict Mode and imports the global stylesheet.
- `src/App.tsx` contains the page composition, section content, event data, image references, navigation links and the mobile navigation state.
- `src/index.css` contains the visual system, typography imports, base styles, layout rules, responsive breakpoints, focus states and reduced-motion handling.
- `index.html` defines the document metadata, page title, theme color and React mount point.
- `public/` contains public static assets such as the favicon and icon sprite.
- `src/assets/` contains local assets retained in the repository.

The page is intentionally kept lightweight rather than split into many one-use components. As the project grows, repeated sections or independently interactive features can be extracted into focused components.

## 3. Page sections

The page is composed in this order:

1. **Header and navigation** — brand, desktop section links, join CTA and a mobile menu toggle.
2. **Hero** — community positioning, headline, supporting copy and primary/secondary actions over a photographic background.
3. **About** — explains the purpose of Code & Chill Lagos and introduces the community.
4. **Events / activities** — visual cards for community gatherings, learning sessions and conversations.
5. **What we do** — describes the practical ways members meet, learn, build and share opportunities.
6. **Community** — welcomes developers, designers, founders, creatives and people exploring technology.
7. **Join CTA** — final invitation to join the community.
8. **Footer** — brand, short description and navigation/social links.

Section IDs are used by in-page anchor links. Keep IDs and their corresponding navigation links in sync when renaming sections.

## 4. Visual direction

The visual language is editorial and photography-led rather than technology-demo-led.

- Dark charcoal sections provide contrast and structure.
- Warm off-white sections create visual breathing room.
- Acid/lime green is reserved for calls to action and selected emphasis.
- Large display typography establishes hierarchy.
- Serif italic display accents soften the otherwise modern sans-serif typography.
- Photography provides human context and makes the community feel approachable.
- Cards, spacing and section changes create rhythm without 3D or scroll hijacking.

Typography is loaded from Google Fonts in the stylesheet. If self-hosting is required, download appropriately licensed font files and update the font-face declarations.

## 5. Responsive behavior

The stylesheet uses responsive breakpoints to adapt the page:

- Desktop: horizontal navigation, multi-column content and three-column event cards.
- Tablet: tighter gutters and adjusted column proportions.
- Mobile: collapsible navigation, single-column content, stacked event cards and larger touch-friendly controls.

When changing the layout, test at narrow phone widths, typical phone widths, tablet widths and desktop widths. Avoid fixed widths that cause horizontal overflow.

## 6. Interaction and accessibility

- The mobile menu is controlled with React state and exposes its expanded state through `aria-expanded`.
- Navigation uses native anchor links so browser history, keyboard use and no-JavaScript fallback behavior remain familiar.
- Images include descriptive alternative text when they convey content; decorative images use empty alternative text.
- Interactive elements are native links and buttons.
- Visible focus styling supports keyboard navigation.
- The stylesheet respects `prefers-reduced-motion` and reduces transition/scroll animation.
- The page uses semantic header, navigation, main, section, article and footer elements.

When adding new interactive UI, preserve keyboard access, meaningful accessible names, focus visibility and adequate touch targets.

## 7. Images and external destinations

The current page references hosted Unsplash image URLs. These are remote assets and therefore require network access. Before production:

- Confirm image licensing/usage rights and retain any required attribution.
- Prefer optimized, project-owned image assets when available.
- Provide meaningful alt text for informative images.
- Use appropriately sized responsive formats and lazy-load below-the-fold images.
- Replace generic social destinations and placeholder community invite URLs with official links.
- Test all links, especially links that open a new tab.

The site should not imply that an unconfigured link is an official community destination.

## 8. Content integrity

Event cards and community statements must reflect information supplied by the organizers. Confirm event dates, venues, registration destinations, social accounts and any claims before release. Do not invent attendance figures, testimonials, sponsors or community statistics.

## 9. Dependencies

The current direct runtime dependencies are React, React DOM, Tailwind CSS and the Vite Tailwind integration. GSAP and Three.js are not used by the current page and have been removed from the root dependency declarations.

If you introduce an animation or visualization library later, first establish a concrete user-facing need and consider bundle size, mobile performance, accessibility and reduced-motion behavior.

## 10. Local development and checks

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

- `npm run dev`: starts the Vite development server.
- `npm run lint`: runs Oxlint.
- `npm run build`: runs TypeScript project builds followed by the Vite production build.
- `npm run preview`: serves the generated production build locally.

Run lint and build before opening or merging a pull request. Record actual command results in the PR; do not mark checks as passed unless they have been run.

## 11. Known launch tasks

- [ ] Set the real WhatsApp/community invite URL.
- [ ] Confirm event content and registration destinations.
- [ ] Add official Instagram and other social links.
- [ ] Confirm photography rights and consider local optimized assets.
- [ ] Verify responsive behavior on real mobile devices.
- [ ] Verify keyboard and reduced-motion behavior.
- [ ] Run lint and production build.
- [ ] Review metadata, favicon and deployment configuration.
- [ ] Confirm analytics, privacy notice and form/backend requirements if those features are added.
