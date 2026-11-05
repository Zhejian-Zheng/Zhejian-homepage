# Visual refinement — 2026-11-05

Skill routing: read ask-matt, redesign-existing-projects, high-end-visual-design and
minimalist-ui. Applied redesign-existing-projects to the existing Next 14 / Tailwind 3
implementation. No new library was added.

The final palette follows user feedback: neutral charcoal #191a1b, surface #222426,
warm white #f1efe9 and restrained stone #d4c7b4. The large Sidecar diagram uses neutral
paper #d8d5cd. The initial sage-dominant experiment was replaced.

Changes: bilingual typographic hero with real portrait; Sidecar as primary project with
an execution-loop diagram; two supporting projects; compact article rows; personal
photo section; direct contact CTA and footer links. Shared navigation, form surfaces,
About, Blog, article typography, OG image and favicon use the same visual direction.
Blog category anchors give direct access to the existing archive groups. Mobile menu
supports Escape and returns focus to its trigger. Reduced motion keeps cards static.

Checks: lint, typecheck, production build and browser regression script. Production
build runs in /tmp/zhejian-ui-review with the same source snapshot and installed
node_modules so the user's existing port 3001 dev server is not interrupted.
Browser checks target http://localhost:3001: English/Chinese page combinations,
canonical, single main, inactive article language absent, cookie language persistence,
skip link, route focus, 320/390px widths, reduced motion, mobile menu Escape and no page
errors. About portrait response remains 64723 bytes in the checked viewport.

No deployment or Lighthouse/CWV measurement. No dependency version upgrades.

Reproduce browser checks against the user's development server:

```sh
SITE_TEST_URL=http://localhost:3001 /tmp/zhejian-ui-test/bin/python scripts/check_ui.py
```

Run `npm run check` with the development server stopped to avoid sharing .next between
Next's production builder and dev server. `npm run typecheck` checks TypeScript.
