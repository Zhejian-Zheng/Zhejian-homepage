import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
	return readFile(new URL(`../${path}`, import.meta.url), "utf8").catch(() => "");
}

test("shared theme and navigation expose the field-notes system", async () => {
	const [layout, styles, nav] = await Promise.all([
		source("app/layout.tsx"),
		source("app/globals.css"),
		source("app/components/SiteNav.tsx")
	]);

	assert.match(layout, /Barlow_Condensed/);
	assert.match(layout, /Noto_Sans_SC/);
	assert.match(styles, /--field-ink:/);
	assert.match(nav, /aria-expanded/);
	assert.match(nav, /menuOpen/);
});

test("homepage replaces quotes with equal project and article records", async () => {
	const home = await source("app/home-client.tsx");

	assert.doesNotMatch(home, /api\.quotable\.io/);
	assert.match(home, /selectedBuildSlugs/);
	assert.match(home, /latestNotes/);
	assert.match(home, /fieldRecord/);
});

test("blog uses explicit categories with an archive fallback", async () => {
	const [categories, index, article] = await Promise.all([
		source("app/blog/categories.ts"),
		source("app/blog/page.tsx"),
		source("app/blog/[slug]/page.tsx")
	]);

	assert.match(categories, /getBlogCategory/);
	assert.match(categories, /\?\? "archive"/);
	assert.match(index, /blogCategoryOrder/);
	assert.doesNotMatch(article, /<span>MDX<\/span>/);
});

test("about page is a static route with evidence-based capabilities", async () => {
	const about = await source("app/about/content.tsx");

	assert.doesNotMatch(about, /useEffect|useState/);
	assert.doesNotMatch(about, /cdn\.jsdelivr\.net/);
	assert.match(about, /routeEntries/);
	assert.match(about, /capabilities/);
});

test("contact keeps its delivery flow inside the open-channel layout", async () => {
	const contact = await source("app/contact/content.tsx");

	assert.match(contact, /Open Channel/);
	assert.match(contact, /保持联系/);
	assert.match(contact, /WEB3FORMS_ENDPOINT/);
	assert.match(contact, /handleSubmit/);
});
