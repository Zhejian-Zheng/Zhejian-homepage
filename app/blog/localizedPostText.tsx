"use client";

import { useLanguage, type Language } from "../components/language";

import { postInfo } from "./post-info";
const postTranslations = Object.fromEntries(postInfo.map(post => [post.slug, post.zh]));

const tagTranslations: Record<string, string> = {
	"AI Agent": "AI Agent",
	AgentScope: "AgentScope",
	Algorithms: "算法",
	"AWS S3": "AWS S3",
	Automation: "自动化",
	Bash: "Bash",
	CLI: "命令行",
	"Code Review": "代码审查",
	Codex: "Codex",
	Data: "数据",
	"Data Structures": "数据结构",
	Database: "数据库",
	Design: "设计",
	Documentation: "文档",
	Express: "Express",
	"Event Streaming": "事件流",
	"Game Logic": "游戏逻辑",
	"GitHub Pages": "GitHub Pages",
	GitHub: "GitHub",
	HITL: "人工确认",
	Java: "Java",
	"Knowledge Base": "知识库",
	Kafka: "Kafka",
	LaTeX: "LaTeX",
	"LLM Wiki": "LLM Wiki",
	Licensing: "许可证",
	MDX: "MDX",
	MongoDB: "MongoDB",
	Memory: "记忆",
	Networking: "网络",
	"Next.js": "Next.js",
	"Open Source": "开源",
	Portfolio: "作品集",
	Postgres: "Postgres",
	PostgreSQL: "PostgreSQL",
	Practice: "练习",
	Prisma: "Prisma",
	Prototype: "原型",
	Python: "Python",
	React: "React",
	"Reinforcement Learning": "强化学习",
	Resume: "简历",
	Rust: "Rust",
	Safety: "安全",
	Sandbox: "沙箱",
	Scoring: "计分",
	Security: "安全",
	Shell: "Shell",
	Solana: "Solana",
	"Static Analysis": "静态分析",
	"Supervised Learning": "监督学习",
	"Tailwind CSS": "Tailwind CSS",
	TCP: "TCP",
	Testing: "测试",
	TypeScript: "TypeScript",
	UDP: "UDP",
	UX: "用户体验",
	Vue: "Vue",
	"Web Design": "网页设计",
	Workflow: "工作流",
	Zod: "Zod"
};

export function getLocalizedPostTitle(slug: string, fallback: string, language: Language) {
	return language === "zh" ? postTranslations[slug]?.title ?? fallback : fallback;
}

export function getLocalizedPostSummary(slug: string, fallback: string, language: Language) {
	return language === "zh" ? postTranslations[slug]?.summary ?? fallback : fallback;
}

export function getLocalizedTag(tag: string, language: Language) {
	return language === "zh" ? tagTranslations[tag] ?? tag : tag;
}

export function LocalizedPostTitle({ slug, title }: { slug: string; title: string }) {
	const { language } = useLanguage();
	return <>{getLocalizedPostTitle(slug, title, language)}</>;
}

export function LocalizedPostSummary({ slug, summary }: { slug: string; summary: string }) {
	const { language } = useLanguage();
	return <>{getLocalizedPostSummary(slug, summary, language)}</>;
}

export function LocalizedTag({ tag }: { tag: string }) {
	const { language } = useLanguage();
	return <>{getLocalizedTag(tag, language)}</>;
}

export function LocalizedDate({ date }: { date: string }) {
	const { language } = useLanguage();
	const formatter = new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});

	return <>{formatter.format(new Date(date))}</>;
}
