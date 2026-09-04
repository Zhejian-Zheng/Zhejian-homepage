# Engineer's Field Notes Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing portfolio as a bilingual Engineer's Field Notes site that gives representative projects and technical writing equal prominence.

**Architecture:** Keep the current Next.js App Router, MDX registry, language context, images, and contact integration. Add a small shared field-note visual vocabulary in global CSS, keep page-specific content in the existing page components, and use one explicit blog category module for predictable editorial grouping.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, MDX

**Spec:** `docs/superpowers/specs/2026-09-04-engineer-field-notes-redesign.md`

## Global Constraints

- Keep Next.js 14, React 18, Tailwind CSS, and the existing MDX pipeline.
- Do not add a component library, animation library, CMS, backend, or search service.
- Reuse `blogPosts`, the language provider, existing imagery, and the current contact submission flow.
- Do not rewrite MDX article bodies or change public URLs.
- All new interface copy must have English and Chinese versions.
- Support 1440px and 390px layouts, visible keyboard focus, and reduced motion.

---

### Task 1: Shared field-note theme and responsive navigation

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.js`
- Modify: `app/components/SiteNav.tsx`

**Interfaces:**
- Consumes: existing `LanguageToggle`, `useLanguage`, `SiteNav({ active, children })` callers.
- Produces: the same `SiteNav` public props, shared `.field-*` style primitives, and bilingual mobile navigation.

- [ ] **Step 1: Add the font and colour foundations**

Use `next/font/google` in `app/layout.tsx` to expose Barlow Condensed and Noto Sans SC variables, then apply them through the body. Replace the Tailwind colour values with the approved palette:

```js
colors: {
  primary: "#4D8DFF",
  secondary: "#8FAF87",
  accent: "#F2A65A",
  field: { ink: "#07111F", navy: "#0E1A2B", paper: "#E9EEF5" }
}
```

- [ ] **Step 2: Add minimal shared primitives**

In `app/globals.css`, define reusable page background, display type, metadata type, field rule, interactive record, and focus styles. Replace shared glass defaults with opaque or lightly transparent notebook surfaces. Preserve route/language transitions and their reduced-motion overrides.

- [ ] **Step 3: Rebuild the navigation**

Keep `SiteNav`'s existing props. Add local `menuOpen` state, an `aria-expanded` mobile menu button, short bilingual branding, active-page text, and close-on-navigation handlers. Desktop links remain inline; mobile links render in a panel below the fixed bar. Keep `children` visible for the homepage background action.

- [ ] **Step 4: Run the first compile check**

Run: `npm run lint`

Expected: no ESLint errors from the font, theme, or navigation changes.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.js app/components/SiteNav.tsx
git commit -m "feat: establish field notes design system"
```

### Task 2: Homepage thesis, projects, and latest notes

**Files:**
- Modify: `app/home-client.tsx`

**Interfaces:**
- Consumes: `blogPosts`, localized post title/summary components, current background images, `SiteNav`.
- Produces: a bilingual hero, three selected project records, three recent technical note records, and the retained background switch.

- [ ] **Step 1: Remove the quote feature**

Delete `Quote`, `localQuotes`, quote timing constants, quote state/ref/effect, `loadQuote`, and the quote card. Keep only background preload, crossfade, and mounted-state protection.

- [ ] **Step 2: Define bilingual homepage records**

Add page-local data for three projects:

```ts
const selectedBuilds = [
  { slug: "solana-orderflow-event-driven-escrow", code: "BUILD-01", status: "Shipped" },
  { slug: "safe-rl-supervised-shield", code: "BUILD-02", status: "Research" },
  { slug: "github-repo-review-agent", code: "BUILD-03", status: "Agent" }
];
```

Use the first three `blogPosts` that are not selected builds as latest notes. Render their existing localized title, summary, date, and tags rather than duplicating article copy.

- [ ] **Step 3: Build the field-note hero**

Create a two-column hero with the bilingual thesis, equal project/blog calls to action, a personal image, and this factual record structure:

```text
FIELD RECORD 2026-09
Sydney, NSW · 33.8688° S / 151.2093° E
Agent engineering · Backend systems · Product interfaces
```

Use the current profile image as the hero image. Keep background photography atmospheric and lower contrast than the content panel.

- [ ] **Step 4: Add equal-weight content columns and route strip**

Render Selected Builds and Latest Notes as adjacent sections at desktop widths and as a deliberate projects-then-notes reading order on mobile. End with Ningbo → Sydney → UNSW → Engineering Practice and a concise current-focus statement.

- [ ] **Step 5: Verify homepage compilation**

Run: `npm run lint`

Expected: no unused quote symbols and no client/server import violations.

- [ ] **Step 6: Commit**

```bash
git add app/home-client.tsx
git commit -m "feat: rebuild homepage as field notes"
```

### Task 3: Blog editorial grouping and article styling

**Files:**
- Create: `app/blog/categories.ts`
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `BlogPost` and `blogPosts` from `app/blog/posts.ts`.
- Produces: `BlogCategoryKey`, `blogCategoryOrder`, `getBlogCategory(slug)`, and grouped blog sections.

- [ ] **Step 1: Add explicit category mapping**

Create `app/blog/categories.ts` with these categories and a slug map:

```ts
export type BlogCategoryKey = "agents" | "systems" | "product" | "archive";

export const blogCategoryOrder: BlogCategoryKey[] = ["agents", "systems", "product", "archive"];

export function getBlogCategory(slug: string): BlogCategoryKey {
  return categoryBySlug[slug] ?? "archive";
}
```

Map AgentScope, ReMe, Agent Development, Codex, and GitHub review articles to `agents`; database, networking, automation, Solana, and scoring-engine posts to `systems`; portfolio, legal youth, Pilates, resume, and interface posts to `product`; use `archive` as the deliberate fallback.

- [ ] **Step 2: Replace blog statistics with an editorial lead**

Use `blogPosts[0]` as the featured article. Remove Posts/Topics/MDX stat cards. Give the featured article a larger field record with date, summary, tags, and one clear reading link.

- [ ] **Step 3: Render grouped compact records**

Group remaining posts with `blogCategoryOrder`. Give every group an English and Chinese heading/description. Each article record contains date, localized title, short summary, and up to three tags. Make the title link the primary target instead of repeating a blue button on every card.

- [ ] **Step 4: Align article detail pages**

Replace the gradient top rule, glass panels, and `MDX` implementation label with the field-note header, readable notebook body, and metadata sidebar. Preserve previous/next navigation and MDX typography behavior.

- [ ] **Step 5: Add a category coverage check**

Ensure the page derives every non-featured article from `blogPosts` and uses the `archive` fallback, so no new post can disappear when it lacks a mapping. Run `npm run build`; all static article routes must generate.

- [ ] **Step 6: Commit**

```bash
git add app/blog/categories.ts app/blog/page.tsx 'app/blog/[slug]/page.tsx'
git commit -m "feat: organize blog as engineering field notes"
```

### Task 4: About route and evidence-based capabilities

**Files:**
- Modify: `app/about/content.tsx`

**Interfaces:**
- Consumes: existing personal and travel images, language context, `SiteNav`.
- Produces: a static bilingual route, four travel records, and eight core capability records.

- [ ] **Step 1: Remove automatic carousel code**

Delete `useEffect`, `useState`, timer constants, carousel handlers, slide dots, and the 14-image rotating collection. Retain four representative images: Ningbo/home, Sydney/Fairlight, UNSW-era personal image, and Fuji/Kyoto travel perspective.

- [ ] **Step 2: Build the chronological route**

Create four bilingual route entries for Ningbo, Sydney, UNSW, and Engineering Practice. Each entry includes place/time, a plain-language description, and one supporting image where useful.

- [ ] **Step 3: Replace the logo wall**

Render exactly eight capability records: Agent Engineering, Backend Systems, Full-stack Products, Data & Databases, Event-driven Architecture, Testing & Reliability, Cloud Delivery, and Interface Design. Give each a short bilingual evidence statement linked to work described on the site; do not use external CDN icons.

- [ ] **Step 4: Verify static behaviour**

Run: `npm run lint`

Expected: no carousel state/effect remains, no external skill-icon lint exception is required, and all images use `next/image`.

- [ ] **Step 5: Commit**

```bash
git add app/about/content.tsx
git commit -m "feat: turn about page into an engineering route"
```

### Task 5: Contact page as an open channel

**Files:**
- Modify: `app/contact/content.tsx`

**Interfaces:**
- Consumes: existing Web3Forms endpoint/key and `handleSubmit` state machine.
- Produces: the same form behaviour in a two-column field-note layout.

- [ ] **Step 1: Update bilingual contact framing**

Use `Open Channel / 保持联系` as the title. Add concise collaboration types for agent systems, backend/product engineering, and technical discussion. Keep existing response-time guidance.

- [ ] **Step 2: Recompose the layout without changing submission logic**

Place contact reasons, Email, GitHub, LinkedIn, and location in the left column. Place the existing form and status messages in the right notebook panel. Keep native validation, bot field, disabled state, submission status, success reset, and error fallback unchanged.

- [ ] **Step 3: Verify form states by inspection and lint**

Run: `npm run lint`

Expected: no form handler changes beyond copy/layout references; unconfigured-key warning still renders and submit remains disabled without a key.

- [ ] **Step 4: Commit**

```bash
git add app/contact/content.tsx
git commit -m "feat: redesign contact as an open channel"
```

### Task 6: Full verification and visual review

**Files:**
- Modify only files that fail the checks above.

**Interfaces:**
- Consumes: the complete redesigned site.
- Produces: a production-buildable, responsive, bilingual website.

- [ ] **Step 1: Restore dependencies if necessary**

The current `node_modules` tree is incomplete. Run `npm install` only if `next` remains unavailable. Do not change dependency versions intentionally.

- [ ] **Step 2: Run repository checks**

Run: `npm run lint`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 and all blog static paths generated.

- [ ] **Step 3: Review desktop screenshots**

Run the production or development server and capture Home, Blog, About, Contact, and one article at 1440px. Confirm hierarchy, readable wrapping, image crops, active navigation, and equal homepage emphasis.

- [ ] **Step 4: Review mobile screenshots and interactions**

Capture the same pages at 390px. Open and close the menu, navigate through it, switch language, and switch the homepage background. Confirm no horizontal overflow and targets remain usable.

- [ ] **Step 5: Review reduced motion and keyboard focus**

Emulate reduced motion and confirm route, language, background, and menu transitions no longer animate materially. Tab through the nav, homepage links, blog entries, and contact form.

- [ ] **Step 6: Commit verification fixes**

```bash
git add app tailwind.config.js
git commit -m "fix: polish responsive field notes layouts"
```
