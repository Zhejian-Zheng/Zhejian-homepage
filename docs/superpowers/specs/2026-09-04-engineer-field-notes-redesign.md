# Engineer's Field Notes Website Redesign

## Goal

Redesign Zhejian Zheng's personal website as an "Engineer's Field Notes" experience that gives equal prominence to professional projects and technical writing. The site must help recruiters, potential collaborators, and experienced technical readers understand who Zhejian is, what he builds, and where to read deeper work.

## Design Direction

The site should feel like a working engineer's record collected across Ningbo, Sydney, university, travel, and software projects. Travel photography supplies the personal character. Dates, locations, disciplines, and short record identifiers provide the field-note structure.

The field-note treatment is the site's one expressive device. Other surfaces remain restrained: no decorative oversized words, repeated glow effects, or stacks of interchangeable glass cards.

## Visual System

### Colour

- Field Ink `#07111F`: primary page background.
- Notebook Navy `#0E1A2B`: raised content areas.
- Route Blue `#4D8DFF`: links and primary actions.
- Signal Amber `#F2A65A`: dates, locations, and priority markers.
- Map Moss `#8FAF87`: statuses and supporting information.
- Paper Mist `#E9EEF5`: primary text.

Colours must be exposed through shared CSS variables or Tailwind theme tokens and reused across every page. Transparent surfaces may support content but must not recreate the current glass-card-heavy appearance.

### Typography

- English display text: Barlow Condensed.
- Chinese display text and body copy: Noto Sans SC.
- Dates, locations, categories, and record identifiers: the system monospace stack.

Display typography is used sparingly for page theses and section titles. Body text prioritises readability in both languages.

### Layout

Desktop layouts use an asymmetric editorial grid. Images and metadata may cross the grid, but reading content stays aligned to a consistent maximum width. Mobile layouts collapse to one column without preserving decorative desktop offsets.

The homepage follows this structure:

```text
┌────────────────────────────────────────────┐
│ ZHEJIAN / FIELD NOTES       Nav  中/EN  ↻  │
├─────────────────────┬──────────────────────┤
│ Identity and thesis │ Personal travel image│
│ Agent / full stack  │ Place · coordinates  │
│ [Projects] [Notes]  │ Record ID · date     │
├─────────────────────┴──────────────────────┤
│ SELECTED BUILDS       LATEST NOTES          │
│ Three projects        Three technical posts │
├────────────────────────────────────────────┤
│ Short route and current focus               │
└────────────────────────────────────────────┘
```

## Shared Navigation

Desktop navigation retains the full brand and page names. At narrow widths, the brand becomes `ZZ / Field Notes` or `ZZ / 现场笔记`, and page links move into an accessible menu.

The navigation must:

- expose the current page;
- keep the language switch visible;
- show the background switch only on the homepage;
- provide `aria-expanded` and an explicit label for the mobile menu;
- close the mobile menu after navigation;
- retain visible keyboard focus.

## Homepage

The hero is the site's thesis. Its bilingual message explains that Zhejian builds reliable agents, backend systems, and digital products between Sydney and Ningbo. The left side contains the identity, thesis, and two equal-priority routes: representative projects and technical notes. The right side contains a personal travel image with a field record showing a real place, coordinates, focus, and record identifier.

The large random-quote card and external quote request are removed. The background switch remains as a quiet icon action. Background changes continue to preload and crossfade.

Below the hero:

- Selected Builds shows three representative projects.
- Latest Notes shows three recent technical articles.
- Both sections receive equal width and visual weight.
- A short route strip connects Ningbo, Sydney, UNSW, and current engineering work.
- The current-focus line names agent engineering, dependable backend systems, and human-centred interfaces.

All homepage content is bilingual.

## Blog

The blog index serves experienced engineers without reading like an internal content system.

- Remove the `MDX Format` statistic and other implementation-facing labels.
- Lead with one featured article.
- Group the remaining posts into `Agent Engineering`, `Systems & Data`, `Product & Interface`, and `Project Archive`.
- Classify posts using an explicit local slug-to-category mapping so editorial choices remain predictable.
- Make each card or list row a clear reading target; avoid repeating a prominent button on every entry.
- Retain bilingual titles, summaries, dates, and tags.
- Use a compact two-column layout on desktop and one column on mobile.

AgentScope, ReMe, agent development, Codex, and repository-review articles belong in Agent Engineering rather than the generic archive.

## About

The About page becomes a chronological route:

1. Ningbo — origin and early interest in technology and design.
2. Sydney — relocation and cross-cultural experience.
3. UNSW — computer science education.
4. Engineering practice — current projects and technical direction.

Remove the decorative `WELCOME / ABOUT` background words. Replace the automatic image carousel with static travel records placed alongside the route. This removes involuntary motion and lets each image carry a meaningful location and caption.

Reduce the skills wall to eight core areas. Each area should be phrased as a capability and connected to work represented on the site; it should not be a grid of unqualified technology logos.

## Contact

The Contact page uses an `Open Channel / 保持联系` framing.

- The left column explains suitable reasons to get in touch and provides compact Email, GitHub, and LinkedIn links.
- The right column retains the current Web3Forms form.
- Existing configured, submitting, success, and failure states remain intact.
- Error messages continue to explain what happened and what the visitor can do.
- Location appears as supporting metadata rather than an equally weighted contact card.

## Interaction and Motion

Motion stays subordinate to content:

- one restrained reveal when a page enters;
- a directional marker or border response on interactive records;
- the existing crossfade when changing the homepage background;
- an explicit mobile-menu transition;
- no automatic carousels;
- no scattered glow or floating effects.

All motion must be disabled or reduced under `prefers-reduced-motion: reduce`.

## Responsive Behaviour

- Primary desktop review width: 1440px.
- Primary mobile review width: 390px.
- The mobile navigation must not overflow at 390px.
- Two-column content collapses into a meaningful reading order rather than merely matching DOM convenience.
- Interactive targets remain at least 40px high where practical.
- Long English and Chinese titles wrap without clipping.

## Technical Boundaries

- Keep Next.js 14, React 18, Tailwind CSS, and the existing MDX pipeline.
- Do not add a component library, animation library, CMS, backend, or search service.
- Reuse `blogPosts`, the language provider, existing imagery, and the current contact submission flow.
- Shared design tokens and repeated primitives belong in `globals.css` or focused shared components.
- Do not rewrite MDX article bodies as part of this redesign.
- Preserve metadata and existing public URLs.

## Accessibility

- Preserve semantic landmarks and heading order.
- Keep visible `focus-visible` styles.
- Mobile navigation exposes its expanded state and can be operated by keyboard.
- Decorative images and record markings are hidden from assistive technology where appropriate.
- Informative images retain meaningful alternative text.
- Colour is not the only indicator of category, status, or active navigation.
- No content advances automatically.

## Validation

The finished redesign must pass:

- `npm run lint`;
- `npm run build`;
- visual review at 1440px and 390px for Home, Blog, About, and Contact;
- English and Chinese language switching on every page;
- keyboard navigation and focus review;
- mobile menu open, close, and navigation behaviour;
- homepage background switch behaviour;
- blog category membership and article links;
- Contact unconfigured, submitting, success, and failure states.

## Out of Scope

- A CMS or content editor.
- Full-text search.
- User accounts, comments, or subscriptions.
- New backend services.
- Rewriting existing articles.
- Adding more decorative animation.
