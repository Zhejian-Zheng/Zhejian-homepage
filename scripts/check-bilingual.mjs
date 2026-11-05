import { readdir, readFile } from "node:fs/promises";

const BANNED_DASHES = /[\u2013\u2014]/;
const MIN_EN_WORDS = 100;
const MIN_ZH_CHARS = 200;

function words(value) {
	return value.replace(/```[\s\S]*?```/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function characters(value) {
	return value.replace(/```[\s\S]*?```/g, " ").replace(/\s/g, "").length;
}

function readLanguageBody(source, language) {
	const marker = `<ArticleLanguage language="${language}">`;
	const closing = "</ArticleLanguage>";
	const start = source.indexOf(marker);
	if (start === -1) return "";
	const bodyStart = start + marker.length;
	const end = source.indexOf(closing, bodyStart);
	return end === -1 ? "" : source.slice(bodyStart, end);
}

const files = (await readdir("content/blog")).filter(file => file.endsWith(".mdx")).sort();
const failures = [];

for (const file of files) {
	const path = `content/blog/${file}`;
	const source = await readFile(path, "utf8");
	const raw = source.match(/export const metadata = (\{[\s\S]*?\n\});/);

	if (!raw) {
		failures.push(`${file}: missing JSON metadata`);
		continue;
	}

	let metadata;
	try {
		metadata = JSON.parse(raw[1]);
	} catch (error) {
		failures.push(`${file}: metadata is not valid JSON (${error.message})`);
		continue;
	}

	for (const [field, value, minimum] of [
		["title", metadata.title, 6],
		["summary", metadata.summary, 20],
		["zh.title", metadata.zh?.title, 4],
		["zh.summary", metadata.zh?.summary, 10]
	]) {
		if (typeof value !== "string" || value.trim().length < minimum) {
			failures.push(`${file}: ${field} is missing, empty, or too short`);
		}
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.publishedAt ?? "")) {
		failures.push(`${file}: publishedAt must be YYYY-MM-DD`);
	}

	if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
		failures.push(`${file}: tags must be a non-empty array`);
	}

	for (const language of ["en", "zh"]) {
		const opens = (source.match(new RegExp(`<ArticleLanguage language="${language}">`, "g")) ?? []).length;
		if (opens !== 1) failures.push(`${file}: expected exactly one ${language} ArticleLanguage block, found ${opens}`);
	}

	const closes = (source.match(/<\/ArticleLanguage>/g) ?? []).length;
	if (closes !== 2) failures.push(`${file}: expected two closing ArticleLanguage tags, found ${closes}`);

	const en = readLanguageBody(source, "en");
	const zh = readLanguageBody(source, "zh");
	if (words(en) < MIN_EN_WORDS) failures.push(`${file}: English body is too short (${words(en)} words)`);
	if (characters(zh) < MIN_ZH_CHARS) failures.push(`${file}: Chinese body is too short (${characters(zh)} characters)`);

	if (!/^##\s+/m.test(en)) failures.push(`${file}: English body has no section heading`);
	if (!/^##\s+/m.test(zh)) failures.push(`${file}: Chinese body has no section heading`);

	for (const [language, body] of [["en", en], ["zh", zh]]) {
		if (BANNED_DASHES.test(body)) failures.push(`${file}: ${language} body contains an en dash or em dash`);
		if (/\bTODO\b|\[placeholder\]|lorem ipsum/i.test(body)) failures.push(`${file}: ${language} body contains placeholder text`);
	}
}

if (failures.length) {
	console.error("Bilingual content check failed:\n");
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

console.log(`Bilingual content check passed: ${files.length} posts, each with English and Chinese bodies and metadata.`);
