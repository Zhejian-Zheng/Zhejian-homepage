# Sitewide technical theme alignment

Date: 2026-11-05

## Goal

Bring Home, About, Contact and the shared header into the same visual system as the
technical notebook, without changing page copy, routes, form behavior or article content.

## What changed

- **Shared tokens:** `#050b0f` page ground, `#081219` panels, `#ecf7f8` primary text,
  `#93a9b1` secondary text and `#6ce7f5` signal cyan. Tailwind's `primary`, `secondary`,
  `accent`, and `field.*` colours now use the same values.
- **Type:** IBM Plex Sans for display and body text, JetBrains Mono for navigation,
  labels, dates, metadata and buttons. The old Georgia italic display treatment is gone.
- **Header:** the floating warm pill became the blog's full-width 72px technical bar
  (58px on phones). It is opaque, uses one bottom hairline, keeps the same active accent,
  and no longer uses backdrop blur.
- **Home:** the hero fills the first screen and uses the blog's title scale and monospace
  metadata. The portrait is a square technical frame instead of a rotated warm print.
  The featured project card is now a dark grid console with a `TRACE / SIDECAR` bar and a
  slow scan line. Project cards, note rows, personal section and contact close share the
  cyan hairline and hover treatment. The old scroll-triggered GSAP reveal is not mounted;
  motion is the one project scan and hover responses.
- **About:** same header and grid background; the portrait frame is square; route images
  and capability cards use the shared panel, hairline and accent. The footer is left
  aligned on the same line as the content.
- **Contact:** the existing Open Channel layout is unchanged structurally. Fields, panel,
  button, labels and channel rows now use the shared technical surfaces and focus ring.
- **Assets:** favicon and Open Graph image use the new ground and accent.

## Verification

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run test`: 6 source-invariant tests pass, including the shared palette/font and
  no HomeMotion mount.
- `npm run build`: pass. Home first-load JS fell from 158 kB to 113 kB after removing the
  unmounted GSAP reveal; Blog remains 104 kB.
- `SITE_TEST_URL=http://127.0.0.1:3100 python scripts/check_ui.py`: English and Chinese
  Home, About, Blog, Contact and the Sidecar article passed; keyboard skip link, route
  focus, cookie and language switching, in-article language switching, 1024/768/390/320
  widths, reduced motion, and zero runtime page errors.
- Browser screenshots read at 1440x900 and 390x844 for Home, About, Contact and Blog.
- Home first screen ends exactly at `#selected-builds` at 1440x900.
- No horizontal overflow at 1024, 768, 390 or 320 for Home, About, Contact and Blog.
- The blog index and article still render with their own console/trace styles after the
  global overrides.
- Lazy-loaded route and personal photographs were scrolled into view and checked in the
  browser; the empty boxes in an unscrolled full-page screenshot are lazy-loading
  artifacts, not missing assets.

## Limits

No deployment, Lighthouse or field Core Web Vitals measurement was run. The contact form
was not submitted because no Web3Forms key is configured. The About route images remain
personal photographs and were not re-encoded or replaced.
