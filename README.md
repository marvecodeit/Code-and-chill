# Code & Chill Lagos

The community website for **Code & Chill Lagos** — a place for developers, designers, builders and people interested in technology to connect, learn, share ideas and take part in community events.

This repository contains the frontend application and its Cloudflare Workers deployment configuration. The site is designed as a responsive, photography-led website with straightforward navigation and a focus on the people and activities behind the community.

## Project at a glance

- **Frontend:** React 19, TypeScript and Vite 8
- **Styling:** Tailwind CSS 4 and application CSS
- **Package manager:** npm
- **Hosting:** Cloudflare Workers (static assets)
- **Build output:** `dist/`
- **Worker name:** `code-and-chill`

The application uses normal page scrolling and responsive layouts. It does not depend on GSAP, Three.js or a WebGL scene.

## Getting started

### Requirements

- Node.js 22.16.0 (the repository includes an `.nvmrc`)
- npm

If you use nvm, select the project Node version:

```bash
nvm install
nvm use
```

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Vite prints the local development URL in your terminal. Open that URL in your browser.

> Use `npm ci` when setting up from the committed lockfile. If you intentionally change dependencies, use `npm install` and commit the updated lockfile.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run lint` | Runs Oxlint |
| `npm run build` | Type-checks the project and creates the production build |
| `npm run preview` | Serves the generated Vite build locally |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

The production build is written to `dist/`. This directory is generated output; do not commit it.

## Repository structure

```text
.
├── public/                 # Static files copied to the build output
├── src/
│   ├── assets/             # Assets imported by the application
│   ├── App.tsx             # Main page composition and UI state
│   ├── index.css           # Global styles and responsive design rules
│   └── main.tsx            # React entry point
├── index.html              # Vite HTML entry
├── package.json            # Scripts and dependencies
├── package-lock.json       # Reproducible npm dependency lockfile
├── tsconfig*.json          # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
└── .nvmrc                  # Node.js version
```

Some UI sections and content are currently composed in `src/App.tsx`. When making larger changes, keep the page readable and extract reusable components or data into focused files rather than allowing the main component to become difficult to maintain.

## How the Cloudflare deployment works

This project is configured as a **Cloudflare Worker serving static assets**, not as a Cloudflare Pages project.

The root `wrangler.jsonc` tells Wrangler:

- which Worker to deploy (`code-and-chill`);
- where Vite writes the built site (`./dist`);
- to use SPA fallback handling so client-side routes can resolve to `index.html`.

The deployment sequence is:

1. Cloudflare checks out the configured Git branch.
2. It installs dependencies.
3. It runs `npm run build`.
4. Vite generates the `dist/` directory.
5. Wrangler deploys the Worker and its static assets.

For a local production-build check:

```bash
npm run build
npm run preview
```

For local testing through the Workers runtime, build first and then run:

```bash
npx wrangler dev
```

The production deployment command configured in Cloudflare Workers Builds is:

```bash
npx wrangler deploy
```

Do not use `wrangler pages deploy` for this Worker configuration. Do not add a committed `dist/` folder; Cloudflare generates it during the build.

### Cloudflare environment and credentials

Cloudflare build settings should use:

- **Build command:** `npm run build`
- **Production deploy command:** `npx wrangler deploy`
- **Node.js:** `22.16.0`

Keep Cloudflare credentials in the Cloudflare dashboard's secure build settings or environment variables. Never commit API tokens, account secrets or other credentials to this repository.

If a build reports an expired or deleted build token, update the token selected in Workers Builds settings. If Wrangler reports an API authentication or permission error, check the API token used by the deployment and confirm it has the required permissions for the target account and Worker.

## Working on the website

A few guidelines for contributors:

- Keep the experience responsive across mobile, tablet and desktop.
- Prefer semantic HTML and accessible controls.
- Ensure interactive elements work with a keyboard and have visible focus states.
- Respect reduced-motion preferences; avoid adding motion that makes the site harder to use.
- Use appropriately sized, optimized images. Confirm that community photos are approved for public use.
- Keep content factual. Do not invent event dates, venues, attendance figures, testimonials or official social accounts.
- Do not add large animation or 3D dependencies unless there is a clear product need.
- Keep secrets and private configuration out of source control.

Before submitting UI changes, check the affected sections at narrow and wide viewport sizes and test navigation, links and interactive states.

## Content and launch checks

Before a public release, confirm:

- Community join links point to the official destination.
- Event names, dates, venues and registration links are approved by the organizers.
- Social links point to official community profiles.
- Images are licensed or approved for publication.
- Any forms, analytics or external integrations have an agreed provider and appropriate privacy information.

## Contributing

1. Start from the latest agreed base branch and create a focused feature branch.
2. Make changes that solve one clear problem at a time.
3. Run `npm run lint` and `npm run build`.
4. Test the relevant desktop and mobile layouts.
5. Open a pull request describing what changed, why it changed and how it was tested. Include screenshots for visual changes and note any known limitations.

Avoid committing generated build output, local environment files, credentials or unrelated formatting changes.

## License

No license is currently declared for this repository. Please contact the project owner before reusing, modifying or redistributing this code.
