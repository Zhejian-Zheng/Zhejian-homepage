# Content and verification

Add a `.mdx` file in `content/blog`. Export `metadata` as a JSON object containing
`title`, `summary`, `publishedAt` (YYYY-MM-DD), `tags`, `category` (agents/systems/product/archive),
and `zh: { title, summary }`. Use the existing `ArticleLanguage` server component for
one English and one Chinese body. The filename becomes the slug.

Run `npm run content:check` before publishing. It fails when a post is missing its
English or Chinese body, has invalid metadata, is too short in either language, contains
placeholder text, or uses an en/em dash. `predev` and `prebuild` run both the check and
`npm run content:generate`; the build also generates `app/blog/posts.ts` and
`post-info.ts`. Do not edit those generated files by hand.

The copy pass follows the `humanize` rules: technical claims, identifiers and links stay
intact; en and em dashes are removed; English avoids LLM stock phrasing; Chinese reads as
native engineering Chinese rather than a literal translation. Do not add facts, numbers,
quotes or sources during a copy edit.

## Front end

The whole site uses IBM Plex Sans for text and JetBrains Mono for navigation, metadata,
code and labels. The shared palette is deep blue-black, cool grey and one signal cyan;
there is no warm beige or violet. Blog pages add the `INDEX.SYS` console and a slower
reading layout; Home, About and Contact use the same header, grid, surfaces and type.

The blog index renders all 27 notes with track anchors and live counts. Article pages
expose reading time, a generated table of contents, and a language switch that stays on
the current article. The Home hero fills the first screen and its featured project card
carries the one moving trace; everything else responds to hover only.

Language URLs are `?lang=en` and `?lang=zh`, each with a self canonical and reciprocal
hreflang. Explicit URL language wins over the preference cookie. Without either, English
is the default. The middleware passes language to server rendering; switching language
uses a full navigation so article content, metadata and the document language agree.
This opts personalized pages into request-time rendering. Motion is limited to the index
console scan, the home project trace, one article-header trace and hover states; all stop
under reduced motion. The old scroll-triggered GSAP reveals are no longer mounted on Home.

```sh
npm ci
npm run content:check
npm run check
npm run typecheck
npm run start -- --port 3000
# In another terminal:
curl -s 'http://localhost:3000/about?lang=zh'
```

Browser checks: first Tab focuses Skip to main content; Enter focuses main. Internal
navigation focuses main. Check at 390px, 768px, 1024px and 1440px, both languages and
reduced motion. Every blog entry is visible rather than hidden in a disclosure. Contact
external links announce a new window. No email is sent by the checks.

Image originals were converted with Sharp (auto orientation, width <=1200, WebP quality
75; About portrait width 1000, quality 70). The About portrait source is 145494 bytes.
Next image optimization further selects responsive sizes. No Lighthouse/CWV claim is
made from file-size or build results alone.

Repeat the browser regression check (Chrome installed, preview on port 3000):

```sh
python3 -m venv /tmp/zhejian-ui-test
/tmp/zhejian-ui-test/bin/pip install playwright
/tmp/zhejian-ui-test/bin/python scripts/check_ui.py
```

The script checks English and Chinese SSR, inactive article text absent from the response,
canonical URLs, cookie persistence, image response size, skip link and navigation focus,
320/390px layouts and reduced motion. Screenshots are saved under `/tmp/site-*.png`.

Use `SITE_TEST_URL=http://localhost:3001` before the browser command when testing an
already-running development server on port 3001. The current motion check verifies
static project cards under reduced motion; mobile navigation also checks Escape focus.
