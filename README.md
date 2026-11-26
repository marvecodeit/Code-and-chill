# Code & Chill Lagos

A responsive, editorial-style website for the Code & Chill Lagos tech community. The experience is built around real community photography, clear storytelling, event discovery and a straightforward invitation to join.

**Current implementation:** React + TypeScript + Vite + Tailwind CSS. The site uses normal document scrolling and responsive layouts. GSAP and Three.js are not part of the application's runtime dependencies.

## Preview

- Repository: https://github.com/marvecodeit/Code-and-chill
- Working branch: `update`

## Features

- Responsive header with mobile navigation.
- Photographic hero section and prominent community call to action.
- About and community introduction.
- Event/activity cards.
- What-we-do and community value sections.
- Join/community invitation section and footer.
- Semantic page sections, keyboard-visible focus styles and reduced-motion support.
- Responsive layouts for desktop, tablet and mobile.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React | Component-based UI |
| TypeScript | Static typing |
| Vite | Local development and production bundling |
| Tailwind CSS | CSS tooling |
| CSS | Layout, responsive behavior, typography and interaction states |

No animation framework or WebGL/3D renderer is required for the current website.

## Getting started

### Requirements

- Node.js compatible with the Vite version in `package.json`
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

Run the build and lint commands before submitting changes. A successful local build has not been claimed by this documentation update; run the checks in your environment or CI before merging.

## Project structure

```text
.
├── docs/
│   ├── README.md
│   └── implementation.md
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.tsx          # Page sections, content and mobile menu state
│   ├── index.css        # Global styles, design system and responsive rules
│   ├── main.tsx         # React application entry point
│   └── assets/          # Local image and starter assets
├── index.html
├── package.json
└── vite.config.ts
```

## Content and launch checklist

Before publishing the site, confirm and replace any sample or placeholder content:

- Add the official WhatsApp/community invite URL to the join CTA.
- Confirm event names, dates, venues and registration links with the organizers.
- Replace generic social links with the community's official profiles.
- Confirm that the selected photographs are approved for public use and add locally hosted optimized versions if required.
- Add analytics, form handling or an RSVP backend only when the project has a real provider and privacy requirements.
- Check all external links, image loading, mobile navigation and keyboard interactions.

Do not publish invented event details, member counts, testimonials or official social handles.

## Documentation

- [Documentation index](docs/README.md)
- [Implementation guide](docs/implementation.md)
- [Pull request review checklist](docs/review-checklist.md)

## Contributing

1. Create a feature branch from the agreed base branch.
2. Keep changes focused and follow the existing TypeScript/React conventions.
3. Run `npm run lint` and `npm run build`.
4. Test desktop and mobile layouts, keyboard navigation and reduced-motion behavior.
5. Open a pull request with a summary, screenshots and any known limitations.

## License

No license is specified in this repository yet. Ask the project owner before reusing or redistributing the source.
