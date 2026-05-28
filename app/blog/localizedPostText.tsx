"use client";

import { useLanguage, type Language } from "../components/language";

type PostTranslation = {
	title: string;
	summary: string;
};

const postTranslations: Record<string, PostTranslation> = {
	"code-with-codex": {
		title: "Code with Codex",
		summary: "关于我如何把 Codex 当作编程伙伴：用它加快实现速度，同时保留自己的产品判断、验证习惯和个人表达。"
	},
	"solana-orderflow-event-driven-escrow": {
		title: "Solana OrderFlow：使用 Anchor 与 Kafka 构建事件驱动托管系统",
		summary: "一个 Solana 托管项目，将 Anchor 智能合约、Kafka 消费者、Postgres 投影、风险规则和通知系统连接起来。"
	},
	"safe-rl-supervised-shield": {
		title: "带监督保护层的安全强化学习",
		summary: "一个网格世界实验，将 Q-learning 与监督式安全分类器结合，减少智能体进入危险状态的次数。"
	},
	"legal-youth-prototype-web": {
		title: "Legal Youth 原型：面向法律引导的全栈 Web 产品",
		summary: "一个 React 与 Express 原型，用于组织法律资源、搜索、地图、交互工具和面向用户的引导流程。"
	},
	"balatro-rust-scoring-engine": {
		title: "Balatro Rust：构建确定性的卡牌计分引擎",
		summary: "一个 Rust 计分引擎练习，关注状态建模、规则顺序、可测试性和确定性游戏逻辑。"
	},
	"tcp-udp-simulator": {
		title: "TCP/UDP 模拟器：心跳、认证与 P2P 文件共享",
		summary: "一个 Python 网络模拟器，将 UDP 控制消息与 TCP 点对点文件传输分离，展示协议设计取舍。"
	},
	"shell-script-automarking-system": {
		title: "Shell Script 自动评分系统：构建基于文件的 Autograder",
		summary: "一个 Shell 自动评分系统，围绕测试发现、输出对比、评分规则和文件结构展开。"
	},
	"mongodb-postgresql-practical-takeaways": {
		title: "MongoDB 与 PostgreSQL：实践心得",
		summary: "关于什么时候选择 PostgreSQL 的结构与一致性，以及什么时候选择 MongoDB 的灵活文档模型。"
	},
	"building-my-personal-page": {
		title: "构建我的个人主页",
		summary: "关于这个 portfolio 的一次复盘：信息架构、视觉系统、交互细节、部署和持续打磨。"
	}
};

const tagTranslations: Record<string, string> = {
	"AI Agent": "AI Agent",
	Algorithms: "算法",
	Automation: "自动化",
	Bash: "Bash",
	Codex: "Codex",
	Data: "数据",
	Database: "数据库",
	Design: "设计",
	Documentation: "文档",
	Express: "Express",
	Kafka: "Kafka",
	LaTeX: "LaTeX",
	MDX: "MDX",
	MongoDB: "MongoDB",
	Networking: "网络",
	"Next.js": "Next.js",
	Portfolio: "作品集",
	Postgres: "Postgres",
	PostgreSQL: "PostgreSQL",
	Prototype: "原型",
	Python: "Python",
	React: "React",
	"Reinforcement Learning": "强化学习",
	Resume: "简历",
	Rust: "Rust",
	Safety: "安全",
	Shell: "Shell",
	Solana: "Solana",
	"Supervised Learning": "监督学习",
	TCP: "TCP",
	Testing: "测试",
	TypeScript: "TypeScript",
	UDP: "UDP",
	UX: "用户体验",
	Vue: "Vue",
	Workflow: "工作流"
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
