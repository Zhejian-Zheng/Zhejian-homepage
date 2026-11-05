# Content and verification

Add a `.mdx` file in `content/blog`. Export `metadata` as a JSON object containing
`title`, `summary`, `publishedAt` (YYYY-MM-DD), `tags`, `category` (agents/systems/product/archive),
and `zh: { title, summary }`. Use the existing `ArticleLanguage` server component for
one English and one Chinese body. The filename becomes the slug.

Run `npm run content:generate`; `predev` and `prebuild` also run it automatically.
Do not edit generated `app/blog/posts.ts` or `post-info.ts`.

Language URLs are `?lang=en` and `?lang=zh`, each with a self canonical and reciprocal
hreflang. Explicit URL language wins over the preference cookie. Without either, English
is the default. The middleware passes language to server rendering; switching language
uses a full navigation so article content, metadata and the document language agree.
This opts personalized pages into request-time rendering. CJK uses OS fonts; Geist is
bundled locally. Motion is limited to below-the-fold homepage elements.

```sh
npm ci
npm run check
npm run typecheck
npm run start -- --port 3000
# In another terminal:
curl -s 'http://localhost:3000/about?lang=zh'
```

Browser checks: first Tab focuses Skip to main content; Enter focuses main. Internal
navigation focuses main. Check at 390px and 1440px, both languages and reduced motion.
Blog categories show three entries and expand with native details. Contact external
links announce a new window. No email is sent by the checks.

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
