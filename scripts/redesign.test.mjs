import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
	return readFile(new URL(`../${path}`, import.meta.url), "utf8").catch(() => "");
}

test("shared theme and navigation expose the editorial system", async () => {
	const [layout, styles, nav] = await Promise.all([
		source("app/layout.tsx"),
		source("app/globals.css"),
		source("app/components/SiteNav.tsx")
	]);

	assert.match(layout, /IBM_Plex_Sans/);
	assert.match(layout, /JetBrains_Mono/);
	assert.match(styles, /--field-ink: #050b0f/);
	assert.match(styles, /--route-blue: #6ce7f5/);
	assert.match(styles, /\.blog-page,/);
	assert.match(styles, /--tech-accent:/);
	assert.match(styles, /font-family: var\(--font-plex\)/);
	assert.match(nav, /aria-expanded/);
	assert.match(nav, /menuOpen/);
	assert.match(nav, /nav--blog/);
});

test("homepage keeps project and article records", async () => {
	const [home, homeData, page] = await Promise.all([
		source("app/home-client.tsx"),
		source("app/home-data.ts"),
		source("app/page.tsx")
	]);

	assert.doesNotMatch(home, /api\.quotable\.io/);
	assert.match(homeData, /selectedBuildSlugs/);
	assert.match(page, /selectedBuildSlugs/);
	assert.match(home, /latestNotes/);
	assert.match(home, /project-card/);
	assert.doesNotMatch(home, /HomeMotion/);
});

test("blog uses explicit categories and a complete index", async () => {
	const [categories, index, article] = await Promise.all([
		source("app/blog/categories.ts"),
		source("app/blog/page.tsx"),
		source("app/blog/[slug]/page.tsx")
	]);

	assert.match(categories, /getBlogCategory/);
	assert.match(categories, /\?\? "archive"/);
	assert.match(index, /blogCategoryOrder/);
	assert.match(index, /note-record/);
	assert.doesNotMatch(index, /<details/);
	assert.match(article, /getArticleReading/);
	assert.match(article, /article-toc/);
	assert.match(article, /BlogLanguageSwitch/);
});

test("every article is checked for English and Chinese content", async () => {
	const [checker, packageJson, article] = await Promise.all([
		source("scripts/check-bilingual.mjs"),
		source("package.json"),
		source("app/blog/article-meta.ts")
	]);

	assert.match(checker, /ArticleLanguage/);
	assert.match(checker, /BANNED_DASHES/);
	assert.match(packageJson, /content:check/);
	assert.match(packageJson, /prebuild/);
	assert.match(article, /activeLanguageBody/);
	assert.match(article, /headingIdFromText/);
});

test("about page is a static route with evidence-based capabilities", async () => {
	const about = await source("app/about/about-client.tsx");

	assert.doesNotMatch(about, /useEffect|useState/);
	assert.match(about, /routeEntries/);
	assert.match(about, /capabilities/);
});

test("contact keeps its delivery flow inside the open-channel layout", async () => {
	const contact = await source("app/contact/contact-client.tsx");

	assert.match(contact, /Open Channel/);
	assert.match(contact, /保持联系/);
	assert.match(contact, /WEB3FORMS_ENDPOINT/);
	assert.match(contact, /handleSubmit/);
});
