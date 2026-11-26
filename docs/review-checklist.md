# Pull request review checklist

Use this checklist before submitting the Code & Chill Lagos website for review or merging it into the target branch.

## Functionality
- [ ] Header links navigate to the correct section.
- [ ] Mobile menu opens, closes and updates its expanded state.
- [ ] Primary and secondary calls to action point to valid destinations.
- [ ] Event and social links are verified with the organizers.
- [ ] No placeholder destination is presented as an official link.

## Visual and responsive quality
- [ ] Hero image and text remain legible at all tested widths.
- [ ] Desktop, tablet and mobile layouts have been checked.
- [ ] No horizontal overflow appears on narrow screens.
- [ ] Images load, crop appropriately and have suitable alternative text.
- [ ] Typography, spacing, contrast and section rhythm are consistent.
- [ ] Interactive controls have comfortable touch targets.

## Accessibility
- [ ] All interactive elements are reachable by keyboard.
- [ ] Focus indicators are visible.
- [ ] Navigation and buttons have meaningful accessible names.
- [ ] Informative images have useful alt text.
- [ ] Reduced-motion preferences are respected.
- [ ] Heading levels and landmarks are logical.

## Engineering checks
- [ ] No unused GSAP or Three.js imports remain.
- [ ] No console errors or failed network requests remain.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Production preview has been smoke-tested.
- [ ] New dependencies are justified and documented.

## Content and release readiness
- [ ] Event dates, venues and descriptions are confirmed.
- [ ] Community invite and social URLs are official.
- [ ] Image usage rights are confirmed.
- [ ] No fabricated statistics, testimonials or claims appear.
- [ ] Metadata and favicon are correct.
- [ ] Known limitations and outstanding tasks are documented.

## Review summary

When submitting a review, include:
1. What changed and why.
2. Which pages, sections and viewport sizes were tested.
3. Actual lint/build results.
4. Screenshots or a short screen recording for visual changes.
5. Known issues, placeholder content and follow-up work.

Do not approve or merge solely because the page looks correct in one desktop screenshot. Verify the mobile experience and production build as well.
