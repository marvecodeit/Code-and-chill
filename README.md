# Code & Chill Lagos

A responsive website for a fictional Lagos youth tech meetup. It has independent Home, The Day, Speakers, and RSVP pages, with a light/dark theme toggle.

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

## Documentation

- [Documentation index](docs/README.md)
- [Implementation notes](docs/implementation.md)

## Project structure

```text
src/
  App.tsx       Shared site shell and page routing
  App.css       Component layout, responsive styles, and themes
  index.css     Tailwind import and global styles
  pages/        Independent page components
  components/   Shared UI components
  data/         Event schedule and speaker data
docs/
  README.md
  implementation.md
```

Routes: `/`, `/day`, `/speakers`, and `/rsvp`. RSVP submission is currently client-side only; it validates the fields and displays a confirmation on the page without sending data to a server.
