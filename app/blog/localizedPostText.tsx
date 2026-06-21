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
	"github-repo-review-agent": {
		title: "GitHub Repo Review Agent：工程化 AI 代码审查工作流",
		summary: "一篇中英双语工程笔记，介绍如何通过仓库索引、静态分析、本地验证和风险排序构建 GitHub repo review agent。"
	},
	"pilates-health-quiz-progress-recovery": {
		title: "从问卷到可恢复进度：我的 Pilates Health Quiz 开发复盘",
		summary: "一次 Pilates Health Quiz 开发复盘，记录分步保存、进度恢复、HttpOnly cookie session、后端校验和 API 测试覆盖。"
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
	},
	"magic-chess-vue-rules-engine": {
		title: "Magic Chess 原型：探索 Vue 规则引擎",
		summary: "一个基于 Vue 3 和 TypeScript 的进行中浏览器象棋原型，涵盖走法验证、将军检测、计时器、历史记录和自定义棋类规则。"
	},
	"python-automation-s3-mongodb": {
		title: "在 Jobgen.ai 加快交付：Python 自动化与 AWS S3 & MongoDB",
		summary: "Python 自动化、AWS S3 和 MongoDB 如何帮助加快交付速度并让任务制品更容易追踪。"
	},
	"python-automation-projects": {
		title: "Python 自动化项目：连接脚本、存储与交付",
		summary: "关于把 Python 作为胶水代码用于批处理工作流、数据移动、元数据追踪和可重复交付的笔记。"
	},
	"leetcode-algorithm-notes": {
		title: "LeetCode 笔记：把解题记录变成算法手册",
		summary: "一个 Python 解法仓库，记录了数组、字符串、递归、动态规划、排序和哈希等方向的算法练习过程。"
	},
	"github-pages-to-next-portfolio": {
		title: "从 GitHub Pages 到 Next.js Portfolio",
		summary: "关于从早期静态个人页面迁移到具备路由、内容、联系和博客支持的完整 portfolio 系统的思考。"
	},
	"resume-latex-system": {
		title: "用 LaTeX 写简历：把 CV 当作可版本控制的设计",
		summary: "一个 LaTeX 简历项目，用可复用命令、排版、间距和版本控制来保持技术简历的可维护性。"
	},
	"repo-license-info-notes": {
		title: "开源许可证笔记：如何选择合适的许可证",
		summary: "一个学习笔记仓库，比较常见开源许可证，以及宽松型、著佐权和公共域风格条款之间的权衡。"
	}
};

const tagTranslations: Record<string, string> = {
	"AI Agent": "AI Agent",
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
	"Game Logic": "游戏逻辑",
	"GitHub Pages": "GitHub Pages",
	GitHub: "GitHub",
	Kafka: "Kafka",
	LaTeX: "LaTeX",
	Licensing: "许可证",
	MDX: "MDX",
	MongoDB: "MongoDB",
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
	Scoring: "计分",
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
