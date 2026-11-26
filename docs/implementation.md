# Implementation guide

## Overview

The experience is built with React, TypeScript, Vite, Tailwind CSS, GSAP, and vanilla Three.js. `src/App.tsx` mounts the experience controller. The active experience is a fixed viewport; users move through scenes without native document scrolling.

## Architecture

- `src/experience/ImmersiveExperience.tsx` owns active-scene state, navigation, touch/wheel/keyboard input, reduced-motion-aware text reveals, and the transition lock.
- `src/experience/SceneWorld.ts` creates and disposes the Three.js renderer, camera, lights, particles, scene groups, pointer parallax, and GSAP camera/object transitions. It is dynamically imported so Three.js loads after the interactive shell.
- `src/experience/SceneContent.tsx` renders the accessible React content for each scene.
- `src/experience/sceneConfig.ts` contains labels, event-format placeholders, activity content, and the community invitation URL configuration.
- `src/components/Arrow.tsx` supplies the shared directional icon.
- `src/experience/Experience.css` styles the dark editorial scene UI and mobile adaptations. `src/index.css` sets global viewport, font, and Tailwind rules.

## Navigation and transitions

Wheel and trackpad input move one scene at a time. Arrow keys, Page Up/Down, Home/End, touch swipes, the fixed navigation, and previous/next controls are also supported. A transition lock prevents overlapping animations. GSAP moves the previous content out, animates a staggered tile shutter, reveals new copy, and moves the camera between distinct Three.js scene groups.

The event gallery, activity list, and RSVP form are intentional inner scroll regions. Wheel input can scroll those areas before advancing the scene. On touch screens they retain their own scroll behavior.

## Three.js environment

The five scene groups use a torus knot and wireframe shell, a connected-node network, floating event panels, a linked activity structure, and a set of closing rings. A restrained particle field, ambient and point lighting, pointer parallax, and small continuous object motion provide depth. Geometry and materials are disposed on unmount. Pixel ratio and particle count are lower on narrow screens. The canvas has no pointer events, so React controls remain interactive.

The Three.js module is loaded dynamically. If WebGL initialization fails, the experience retains all scene content and input controls with a CSS visual fallback.

## Content and external links

The next listed gathering uses the project event details: 12 December 2026 at Landmark Centre, Lagos. Other event cards are explicitly marked as format ideas with dates to come. The community invite URL is intentionally empty until the organizers provide a real destination; configure `COMMUNITY_INVITE_URL` in `sceneConfig.ts`.

The RSVP form checks name and email and displays an inline confirmation. It does not contact a server. No member counts or social profiles are invented.

## Accessibility and motion

- Scene navigation uses native buttons and announces the active scene.
- Keyboard controls include arrow keys, Page Up/Down, Home, and End.
- A skip link focuses the active scene heading.
- Form fields have labels and status messages use a polite live region.
- The Three.js canvas is hidden from assistive technology; the scene content remains in semantic HTML.
- Reduced-motion settings stop ambient 3D movement and make scene transitions immediate.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```
