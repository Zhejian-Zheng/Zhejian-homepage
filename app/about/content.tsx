"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { useLanguage, type Language } from "../components/language";
import personalPage from "@/app/images/aboutme/personalPage.jpg";
import imgHome from "@/app/images/world_exploring/home.jpg";
import imgFairlight from "@/app/images/world_exploring/fairlight.jpg";
import imgFujimt from "@/app/images/world_exploring/fujimt.jpg";
import imgTokyo from "@/app/images/world_exploring/tokyo.jpg";

type LocalizedText = Record<Language, string>;
type RouteEntry = {
	code: string;
	period: LocalizedText;
	place: LocalizedText;
	title: LocalizedText;
	body: LocalizedText;
	image: StaticImageData;
	imageAlt: LocalizedText;
	imageCaption: LocalizedText;
};

const routeEntries: RouteEntry[] = [
	{
		code: "ROUTE-01",
		period: { en: "Origin", zh: "起点" },
		place: { en: "Ningbo, China", zh: "中国 · 宁波" },
		title: { en: "A coastal starting point", zh: "从海边城市出发" },
		body: {
			en: "I grew up in Ningbo, where curiosity about technology and visual design became a habit of taking things apart and rebuilding them clearly.",
			zh: "我在宁波长大。对技术与视觉设计的好奇，逐渐变成了拆解问题、再用更清楚的方式把它重新构建起来的习惯。"
		},
		image: imgHome,
		imageAlt: { en: "Two people standing outside a house at night", zh: "两个人夜晚站在一栋房子前" },
		imageCaption: { en: "Home record", zh: "家的记录" }
	},
	{
		code: "ROUTE-02",
		period: { en: "Age 15+", zh: "15 岁以后" },
		place: { en: "Sydney, Australia", zh: "澳大利亚 · 悉尼" },
		title: { en: "Learning across cultures", zh: "在不同文化之间学习" },
		body: {
			en: "Moving to Sydney at 15 changed how I communicate and collaborate. It taught me to make assumptions visible and explain technical ideas without hiding behind jargon.",
			zh: "15 岁来到悉尼，让我重新学习如何沟通与协作。我开始习惯把假设说清楚，也学会不用术语掩盖技术问题。"
		},
		image: imgFairlight,
		imageAlt: { en: "Fairlight coastline in Sydney at dusk", zh: "黄昏时分的悉尼 Fairlight 海岸" },
		imageCaption: { en: "Fairlight · Sydney", zh: "Fairlight · 悉尼" }
	},
	{
		code: "ROUTE-03",
		period: { en: "B. Computer Science", zh: "计算机科学学士" },
		place: { en: "UNSW · Sydney", zh: "UNSW · 悉尼" },
		title: { en: "Computer science, with distinction", zh: "以工程方式学习计算机科学" },
		body: {
			en: "At UNSW I built foundations in algorithms, networks, data, systems, and product development, completing the degree with Distinction.",
			zh: "在 UNSW，我系统学习算法、网络、数据、系统与产品开发，并以 Distinction 完成计算机科学学位。"
		},
		image: imgFujimt,
		imageAlt: { en: "Mount Fuji at sunset across the water", zh: "落日下隔水远望的富士山" },
		imageCaption: { en: "Mount Fuji · Japan", zh: "富士山 · 日本" }
	},
	{
		code: "ROUTE-04",
		period: { en: "Now", zh: "现在" },
		place: { en: "Engineering practice", zh: "工程实践" },
		title: { en: "Building systems people can trust", zh: "构建真正值得信任的系统" },
		body: {
			en: "My current work centres on recoverable agents, permission boundaries, long-term memory, backend reliability, and interfaces that make complex systems understandable.",
			zh: "我目前关注可恢复 Agent、权限边界、长期记忆、可靠后端，以及如何让复杂系统通过界面变得可以理解。"
		},
		image: imgTokyo,
		imageAlt: { en: "Tokyo skyline and Tokyo Tower at night", zh: "东京夜间天际线与东京塔" },
		imageCaption: { en: "Tokyo · Japan", zh: "东京 · 日本" }
	}
];

const capabilities = [
	{
		title: { en: "Agent engineering", zh: "Agent 工程" },
		body: { en: "Runtime loops, tool use, permissions, recovery, and long-term memory.", zh: "运行循环、工具调用、权限、恢复机制与长期记忆。" },
		href: "/blog/agentscope-java-recoverable-agents"
	},
	{
		title: { en: "Backend systems", zh: "后端系统" },
		body: { en: "Clear service boundaries, state transitions, and failure handling.", zh: "清晰的服务边界、状态流转与失败处理。" },
		href: "/blog/pilates-health-quiz-progress-recovery"
	},
	{
		title: { en: "Full-stack products", zh: "全栈产品" },
		body: { en: "From user workflow and API contracts to production delivery.", zh: "从用户流程、API 契约到生产交付。" },
		href: "/blog/legal-youth-prototype-web"
	},
	{
		title: { en: "Data & databases", zh: "数据与数据库" },
		body: { en: "Relational consistency, document flexibility, and useful data flows.", zh: "关系型一致性、文档模型灵活性与可用的数据流程。" },
		href: "/blog/mongodb-postgresql-practical-takeaways"
	},
	{
		title: { en: "Event-driven architecture", zh: "事件驱动架构" },
		body: { en: "Streams, projections, risk rules, and asynchronous coordination.", zh: "事件流、投影、风险规则与异步协作。" },
		href: "/blog/solana-orderflow-event-driven-escrow"
	},
	{
		title: { en: "Testing & reliability", zh: "测试与可靠性" },
		body: { en: "Deterministic logic, recovery paths, and checks that catch regressions.", zh: "确定性逻辑、恢复路径与能够发现回归的验证。" },
		href: "/blog/balatro-rust-scoring-engine"
	},
	{
		title: { en: "Cloud delivery", zh: "云端交付" },
		body: { en: "Automation, object storage, deployment, and traceable artefacts.", zh: "自动化、对象存储、部署与可追踪制品。" },
		href: "/blog/python-automation-s3-mongodb"
	},
	{
		title: { en: "Interface design", zh: "界面设计" },
		body: { en: "Turning complex behaviour into direct, understandable interactions.", zh: "把复杂行为转化为直接、可以理解的交互。" },
		href: "/blog/building-my-personal-page"
	}
] as const;

const aboutCopy = {
	en: {
		eyebrow: "Route log · Ningbo to Sydney",
		title: "The route behind the work",
		intro: "I am a software engineer and technical writer shaped by two cities, a computer science education, and a preference for systems that explain themselves.",
		portraitAlt: "Zhejian Zheng outdoors in Australia",
		portraitLabel: "Personal field record",
		journey: "Journey log",
		routeLabel: "Route",
		frameLabel: "Frame",
		journeyIntro: "Four points that shaped how I build and communicate.",
		capabilities: "Core capabilities",
		practiceLabel: "Practice",
		capabilitiesIntro: "Eight areas backed by work you can inspect—not a wall of technology logos.",
		openEvidence: "Open evidence",
		footer: "Still learning · Still building · Still recording"
	},
	zh: {
		eyebrow: "经历路线 · 从宁波到悉尼",
		title: "作品背后的经历路线",
		intro: "我是一名软件工程师与技术写作者。两座城市、计算机科学教育，以及对“系统应该能解释自己”的坚持，共同塑造了现在的我。",
		portraitAlt: "郑哲坚在澳大利亚的户外照片",
		portraitLabel: "个人现场记录",
		journey: "经历记录",
		routeLabel: "路线",
		frameLabel: "画面",
		journeyIntro: "四个节点，说明我如何形成现在的工程与沟通方式。",
		capabilities: "核心能力",
		practiceLabel: "实践",
		capabilitiesIntro: "八项可以在实际项目中找到证据的能力，而不是一面技术 Logo 墙。",
		openEvidence: "查看项目证据",
		footer: "持续学习 · 持续构建 · 持续记录"
	}
} as const;

export default function AboutContent() {
	const { language } = useLanguage();
	const copy = aboutCopy[language];

	return (
		<div className="field-page">
			<SiteNav active="about" />

			<main className="field-wrap">
				<header className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
					<div>
						<p className="field-meta text-accent">{copy.eyebrow}</p>
						<h1 className="field-display mt-5 max-w-3xl text-6xl font-semibold leading-[0.92] sm:text-8xl">{copy.title}</h1>
						<p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{copy.intro}</p>
					</div>
					<figure className="border border-white/15 bg-field-navy p-3 lg:-rotate-1">
						<div className="relative aspect-[16/10] overflow-hidden">
							<Image src={personalPage} alt={copy.portraitAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
						</div>
						<figcaption className="field-meta px-1 pt-3 text-secondary">{copy.portraitLabel} · AU-NSW</figcaption>
					</figure>
				</header>

				<section className="py-14">
					<div className="grid gap-7 border-b border-white/15 pb-8 lg:grid-cols-[260px_minmax(0,1fr)]">
						<div>
							<p className="field-meta text-accent">{copy.routeLabel} / 04</p>
							<h2 className="field-display mt-3 text-4xl font-semibold">{copy.journey}</h2>
						</div>
						<p className="max-w-xl text-base leading-7 text-slate-400">{copy.journeyIntro}</p>
					</div>

					<div className="mt-8 space-y-px bg-white/10">
						{routeEntries.map((entry, index) => (
							<article key={entry.code} className="grid bg-field-ink lg:grid-cols-[150px_minmax(0,1fr)_300px]">
								<div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
									<p className="field-meta text-accent">{entry.code}</p>
									<p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">{entry.period[language]}</p>
								</div>
								<div className="p-5 sm:p-7">
									<p className="field-meta text-secondary">{entry.place[language]}</p>
									<h3 className="mt-3 text-2xl font-semibold text-field-paper">{entry.title[language]}</h3>
									<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{entry.body[language]}</p>
								</div>
								<div className="relative min-h-56 overflow-hidden lg:min-h-0">
									<Image src={entry.image} alt={entry.imageAlt[language]} fill className="object-cover saturate-[0.8] transition duration-500 hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 300px" />
									<div className="absolute bottom-3 right-3 bg-field-ink/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-slate-300">
										{copy.frameLabel} 0{index + 1} · {entry.imageCaption[language]}
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				<section className="border-t border-white/15 py-14">
					<div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
						<div>
							<p className="field-meta text-secondary">{copy.practiceLabel} / 08</p>
							<h2 className="field-display mt-3 text-4xl font-semibold">{copy.capabilities}</h2>
							<p className="mt-4 text-sm leading-6 text-slate-400">{copy.capabilitiesIntro}</p>
						</div>
						<div className="grid gap-px bg-white/10 sm:grid-cols-2">
							{capabilities.map((capability, index) => (
								<Link key={capability.href} href={capability.href} className="group field-record-link bg-field-navy p-5 sm:p-6">
									<div className="flex items-start justify-between gap-4">
										<p className="field-meta text-accent">CAP-{String(index + 1).padStart(2, "0")}</p>
										<span className="field-arrow" aria-hidden="true">↗</span>
									</div>
									<h3 className="mt-5 text-xl font-semibold text-field-paper group-hover:text-primary">{capability.title[language]}</h3>
									<p className="mt-3 text-sm leading-6 text-slate-400">{capability.body[language]}</p>
									<span className="mt-5 inline-block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-primary">{copy.openEvidence}</span>
								</Link>
							))}
						</div>
					</div>
				</section>

				<footer className="site-footer border-t border-white/15">{copy.footer}</footer>
			</main>
		</div>
	);
}
