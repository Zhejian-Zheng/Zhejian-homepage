# Blog technical refresh and bilingual copy pass

Date: 2026-11-05

## Scope

Redesigned the blog index and article template, then ran a bilingual copy pass over
all 27 notes. The technical system introduced here was later extended to Home, About,
Contact and the shared header; see `2026-11-05-sitewide-theme-alignment.md`.

## Visual system

- **Type:** IBM Plex Sans for reading and display, JetBrains Mono for navigation,
  metadata, track codes and code. Chinese falls back to PingFang SC or Microsoft YaHei.
- **Palette:** deep blue-black `#050b0f`, layered panels, cool grey text, and one signal
  cyan `#6ce7f5` for actions, focus, live state and the active track. No violet.
- **Index hero:** one screen at 1440, with the notebook facts (27 notes, 4 tracks,
  2 languages), a language switch, and a live `INDEX.SYS` console that counts the actual
  tracks. The console has one slow scan line; the status dot is the only other moving
  element. Both stop under reduced motion.
- **Featured note:** a full-width record for the Sidecar harness note with track code,
  date, reading metadata and a four-step observe/decide/act/verify rail.
- **Index:** every note is visible. Each track has a jump anchor, count, description and
  numbered rows. Rows lift 2px, draw a left accent and reveal an Open label on hover.
- **Article header:** breadcrumb and trace number, reading time, active track, published
  date, language versions, and an inline language switch that stays on the same article.
  A single slow trace line crosses the article header.
- **Article body:** 72-character measure, numbered section counters, explicit TOC generated
  from the active language, sticky rail on desktop, collapsible TOC on smaller screens,
  restyled code blocks, inline code, tables, lists and focus states.
- **Responsive:** index and article checked at 1440, 1024, 820, 768, 390 and 320. No
  horizontal overflow. The console stacks below the copy at 1024 and below; the article
  rail becomes a disclosure before 1100.

## Bilingual copy

All 27 posts have one English and one Chinese body and paired metadata. A new
`scripts/check-bilingual.mjs` verifies both bodies, metadata, minimum body length, section
headings, placeholder text and en/em dashes. It runs in `predev` and `prebuild`.

The humanize pass changed prose in every post, including both languages where needed.
Technical claims, code blocks, inline identifiers, links, dates, tags and categories were
compared against the previous revision and kept intact. The main changes were:

- plain copulas instead of "serves as" constructions;
- fewer significance claims, formulaic openings, generic conclusions and -ing tails;
- varied paragraph and sentence rhythm instead of uniform short paragraphs;
- removed negative parallelisms and forced triads where they were decorative;
- Chinese rewritten as native engineering Chinese, without padding transitions or
  consultant vocabulary;
- everyday passages in retrospectives made conversational while source-analysis sections
  stayed precise;
- curly English quotes replaced with straight quotes; two Chinese em dashes removed.

No new facts, numbers, benchmarks, quotes, sources or opinions were added. The remaining
copy ambiguity in the Jobgen.ai note (internship versus project) is written as "worked on"
in English and preserves the original "实习项目" in Chinese. The Balatro note's "floating
behavior" is rendered as floating-point arithmetic, which is the likely subject but was
not verified against the original repository.

## Verification

```sh
npm run content:check     # 27 bilingual posts pass
npm run test              # 6 source-invariant tests pass
npm run typecheck         # pass
npm run lint              # pass
npm run build             # pass; blog and article routes 104 kB first load JS
SITE_TEST_URL=http://127.0.0.1:3100 /tmp/zhejian-ui-test/bin/python scripts/check_ui.py
```

The browser script passed English and Chinese Home, About, Blog, Contact and one article;
keyboard skip link; route focus; cookie and language switching; the new in-article
language switch; 1024, 768, 390 and 320 widths; reduced motion; no runtime page errors.
A separate sweep opened all 27 article slugs in both languages: 200 responses, one active
article body, one heading, a language switch, and no horizontal overflow at 390.

Screenshots were read at 1440x900 and 390x844. The first screen contains the hero alone;
the console is visible; the featured card and index headings sit on the same left edge;
code blocks and the article rail remain readable at 1440 and 390.

## Limits

No deployment, Lighthouse, field Core Web Vitals or real contact-form submission was
performed. The article TOC is generated from headings in the active Markdown body, so a
future post should be checked after renaming a heading. The copy pass did not verify the
original technical claims against the linked repositories; it preserved them.
