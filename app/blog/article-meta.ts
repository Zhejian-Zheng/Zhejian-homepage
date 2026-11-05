import { readFileSync } from "node:fs";
import path from "node:path";
import type { Language } from "../components/language";
import { headingIdFromText } from "./headings";

export type TocEntry = {
	id: string;
	label: string;
};

export type ArticleReading = {
	toc: TocEntry[];
	minutes: number;
	wordCount: number;
};

function stripInlineMarkdown(value: string): string {
	return value
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/[`*_~]/g, "")
		.replace(/&amp;/g, "&")
		.replace(/\s+/g, " ")
		.trim();
}

function activeLanguageBody(source: string, language: Language): string {
	const marker = `<ArticleLanguage language="${language}">`;
	const start = source.indexOf(marker);
	if (start === -1) return "";
	const from = start + marker.length;
	const end = source.indexOf("</ArticleLanguage>", from);
	return source.slice(from, end === -1 ? undefined : end);
}

function bodyStats(body: string, language: Language) {
	let inFence = false;
	const prose: string[] = [];
	const headings: Array<{ level: number; label: string }> = [];

	for (const line of body.split("\n")) {
		if (line.trimStart().startsWith("```")) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;

		const heading = line.match(/^(#{2,3})\s+(.+?)\s*$/);
		if (heading) {
			headings.push({ level: heading[1].length, label: stripInlineMarkdown(heading[2]) });
			continue;
		}
		prose.push(line);
	}

	const text = stripInlineMarkdown(prose.join(" "));
	const wordCount = language === "zh" ? text.replace(/\s/g, "").length : text.split(/\s+/).filter(Boolean).length;
	const perMinute = language === "zh" ? 420 : 210;

	return {
		headings,
		wordCount,
		minutes: Math.max(1, Math.round(wordCount / perMinute))
	};
}

export function getArticleReading(slug: string, language: Language): ArticleReading {
	const file = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
	let source = "";
	try {
		source = readFileSync(file, "utf8");
	} catch {
		return { toc: [], minutes: 1, wordCount: 0 };
	}

	const body = activeLanguageBody(source, language);
	const stats = bodyStats(body, language);

	const toc = stats.headings
		.filter(heading => heading.level === 2)
		.map(heading => ({
			id: headingIdFromText(heading.label),
			label: heading.label
		}))
		.filter(entry => Boolean(entry.id));

	return { toc, minutes: stats.minutes, wordCount: stats.wordCount };
}
