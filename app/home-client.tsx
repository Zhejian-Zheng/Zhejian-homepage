"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import { useLanguage } from "./components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "./blog/localizedPostText";
import profileImg from "@/app/images/profile image.jpg";
import bgBerlin from "@/app/images/backgrounds/berlin-6755246.webp";
import bgYosemite from "@/app/images/backgrounds/yosemite-8177850.webp";
import bgBerchtesgaden from "@/app/images/backgrounds/berchtesgaden-2928711.webp";
import bgBall from "@/app/images/backgrounds/ball-63527.webp";
import bgCityscape from "@/app/images/backgrounds/cityscape-6942013.webp";

type BgImage = StaticImageData;

export type HomePostPreview = {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	tags: string[];
};

export const selectedBuildSlugs = [
	"solana-orderflow-event-driven-escrow",
	"safe-rl-supervised-shield",
	"github-repo-review-agent"
] as const;

const BG_IMAGES: BgImage[] = [bgBerlin, bgYosemite, bgBerchtesgaden, bgBall, bgCityscape];

const homeCopy = {
	en: {
		name: "Zhejian Zheng",
		role: "Software engineer · Technical writer",
		thesis: "I build reliable agents, backend systems, and digital products between Sydney and Ningbo.",
		intro: "My work connects engineering depth with clear product decisions—from recoverable AI agents and event-driven systems to interfaces people can understand.",
		projectsAction: "View selected builds",
		notesAction: "Read technical notes",
		changeBackground: "Change field background",
		fieldRecord: "Field record",
		location: "Sydney, NSW",
		coordinates: "33.8688° S / 151.2093° E",
		focus: "Agent engineering · Backend systems · Product interfaces",
		selectedBuilds: "Selected builds",
		selectedBuildsIntro: "Three projects that show how I reason about systems, safety, and useful AI.",
		latestNotes: "Latest notes",
		latestNotesIntro: "Recent source-level writing for engineers choosing and building agent systems.",
		openRecord: "Open record",
		currentFocus: "Current focus",
		focusBody: "Recoverable agents, explicit permissions, long-term memory, and dependable product infrastructure.",
		route: "Route",
		routeStops: ["Ningbo", "Sydney", "UNSW", "Engineering practice"],
		footer: "Field notes maintained by Zhejian Zheng · Since 2024"
	},
	zh: {
		name: "郑哲坚",
		role: "软件工程师 · 技术写作者",
		thesis: "往返于悉尼与宁波之间，我专注构建可靠的 Agent、后端系统与数字产品。",
		intro: "我的工作把工程深度和清晰的产品判断连接起来：从可恢复的 AI Agent、事件驱动系统，到真正让人看得懂、用得顺的界面。",
		projectsAction: "查看代表项目",
		notesAction: "阅读技术笔记",
		changeBackground: "更换现场背景",
		fieldRecord: "现场记录",
		location: "澳大利亚 · 悉尼",
		coordinates: "南纬 33.8688° / 东经 151.2093°",
		focus: "Agent 工程 · 后端系统 · 产品界面",
		selectedBuilds: "代表项目",
		selectedBuildsIntro: "三个项目，展示我如何处理系统架构、安全边界和真正可用的 AI。",
		latestNotes: "最新技术笔记",
		latestNotesIntro: "面向工程师的源码分析、Agent 开发实践与框架选型记录。",
		openRecord: "打开记录",
		currentFocus: "当前关注",
		focusBody: "可恢复 Agent、明确的权限边界、长期记忆，以及可靠的产品基础设施。",
		route: "经历路线",
		routeStops: ["宁波", "悉尼", "UNSW", "工程实践"],
		footer: "郑哲坚的工程现场笔记 · 始于 2024"
	}
} as const;

const buildCodes = ["BUILD-01", "BUILD-02", "BUILD-03"] as const;

function RecordList({ posts, build }: { posts: HomePostPreview[]; build?: boolean }) {
	const { language } = useLanguage();
	const copy = homeCopy[language];

	return (
		<div className="divide-y divide-white/10 border-b border-white/10">
			{posts.map((post, index) => (
				<Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-4 px-1 py-6 transition hover:bg-white/[0.025] sm:grid-cols-[110px_minmax(0,1fr)_24px] sm:px-4">
					<div className="field-meta pt-1 text-accent">
						{build ? buildCodes[index] : <LocalizedDate date={post.publishedAt} />}
					</div>
					<div>
						<h3 className="text-lg font-semibold leading-snug text-field-paper transition group-hover:text-primary">
							<LocalizedPostTitle slug={post.slug} title={post.title} />
						</h3>
						<p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
							<LocalizedPostSummary slug={post.slug} summary={post.summary} />
						</p>
						<div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate-500">
							{post.tags.slice(0, 3).map((tag) => (
								<span key={tag}><LocalizedTag tag={tag} /></span>
							))}
						</div>
					</div>
					<span className="field-arrow hidden sm:block" aria-label={copy.openRecord}>↗</span>
				</Link>
			))}
		</div>
	);
}

export default function HomeClient({ selectedBuilds, latestNotes }: { selectedBuilds: HomePostPreview[]; latestNotes: HomePostPreview[] }) {
	const { language } = useLanguage();
	const copy = homeCopy[language];
	const [bgLoading, setBgLoading] = useState(false);
	const [currentBg, setCurrentBg] = useState<BgImage>(BG_IMAGES[0]);
	const [loadedBgs, setLoadedBgs] = useState<BgImage[]>([BG_IMAGES[0]]);
	const mountedRef = useRef(true);
	const fieldRecord = { code: "FR-2026-09", place: copy.location, coordinates: copy.coordinates };

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const changeBackground = () => {
		setBgLoading(true);
		const pool = BG_IMAGES.filter((image) => image !== currentBg);
		const next = pool[Math.floor(Math.random() * pool.length)];
		const preload = new window.Image();

		preload.onload = () => {
			if (!mountedRef.current) return;
			setLoadedBgs((images) => (images.includes(next) ? images : [...images, next]));
			requestAnimationFrame(() => {
				if (!mountedRef.current) return;
				setCurrentBg(next);
				setBgLoading(false);
			});
		};
		preload.onerror = () => mountedRef.current && setBgLoading(false);
		preload.src = next.src;
	};

	return (
		<div className="min-h-screen bg-field-ink text-field-paper">
			<SiteNav active="home">
				<button
					type="button"
					onClick={changeBackground}
					disabled={bgLoading}
					className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-400 transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
					aria-label={copy.changeBackground}
					title={copy.changeBackground}
				>
					<svg viewBox="0 0 24 24" className={`h-4 w-4 ${bgLoading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
						<path d="M20 11a8 8 0 0 0-14.9-4M4 13a8 8 0 0 0 14.9 4" />
						<path d="M5 3v4h4M19 21v-4h-4" />
					</svg>
				</button>
			</SiteNav>

			<main className="relative isolate overflow-hidden px-4 pb-20 pt-24">
				<div className="fixed inset-0 -z-20">
					{loadedBgs.map((image) => (
						<div
							key={image.src}
							className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 motion-reduce:transition-none ${image === currentBg ? "opacity-30" : "opacity-0"}`}
							style={{ backgroundImage: `url('${image.src}')` }}
							aria-hidden="true"
						/>
					))}
					<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.88)_46%,rgba(7,17,31,0.76)_100%)]" />
				</div>

				<div className="field-wrap">
					<section className="grid min-h-[calc(100vh-6rem)] items-center gap-10 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.75fr)] lg:py-16">
						<div>
							<p className="field-meta text-accent">{copy.role}</p>
							<h1 className="field-display mt-5 max-w-3xl text-6xl font-semibold leading-[0.9] text-field-paper sm:text-7xl lg:text-[6.5rem]">
								{copy.name}
							</h1>
							<p className="mt-7 max-w-3xl text-2xl font-medium leading-tight text-field-paper sm:text-3xl lg:text-4xl">
								{copy.thesis}
							</p>
							<p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{copy.intro}</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<a href="#selected-builds" className="btn-primary justify-between gap-8 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em]">
									{copy.projectsAction}<span aria-hidden="true">↓</span>
								</a>
								<a href="#latest-notes" className="btn-secondary justify-between gap-8 px-5 py-3 font-mono text-xs uppercase tracking-[0.12em]">
									{copy.notesAction}<span aria-hidden="true">↓</span>
								</a>
							</div>
						</div>

						<figure className="relative border border-white/15 bg-field-navy p-3 lg:rotate-1">
							<div className="relative aspect-[4/5] overflow-hidden bg-field-ink">
								<Image src={profileImg} alt={copy.name} fill priority className="object-cover object-center saturate-[0.85]" sizes="(max-width: 1024px) 100vw, 420px" />
								<div className="absolute inset-0 bg-gradient-to-t from-field-ink via-transparent to-transparent" />
							</div>
							<figcaption className="grid gap-4 border-t border-white/15 px-2 py-4 sm:grid-cols-2">
								<div>
									<p className="field-meta text-accent">{copy.fieldRecord} · {fieldRecord.code}</p>
									<p className="mt-2 text-sm text-field-paper">{fieldRecord.place}</p>
								</div>
								<div className="sm:text-right">
									<p className="field-meta">{fieldRecord.coordinates}</p>
									<p className="mt-2 text-xs leading-5 text-slate-400">{copy.focus}</p>
								</div>
							</figcaption>
						</figure>
					</section>

					<section className="grid border-y border-white/15 bg-field-ink/80 lg:grid-cols-2">
						<div id="selected-builds" className="scroll-mt-24 p-6 sm:p-8 lg:border-r lg:border-white/15">
							<p className="field-meta text-accent">Portfolio / 03</p>
							<h2 className="field-display mt-3 text-4xl font-semibold">{copy.selectedBuilds}</h2>
							<p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{copy.selectedBuildsIntro}</p>
							<div className="mt-7"><RecordList posts={selectedBuilds} build /></div>
						</div>
						<div id="latest-notes" className="scroll-mt-24 border-t border-white/15 p-6 sm:p-8 lg:border-t-0">
							<p className="field-meta text-secondary">Notebook / 03</p>
							<h2 className="field-display mt-3 text-4xl font-semibold">{copy.latestNotes}</h2>
							<p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{copy.latestNotesIntro}</p>
							<div className="mt-7"><RecordList posts={latestNotes} /></div>
						</div>
					</section>

					<section className="grid gap-8 border-b border-white/15 py-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
						<div>
							<p className="field-meta text-accent">{copy.route}</p>
							<div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-slate-300">
								{copy.routeStops.map((stop, index) => (
									<span key={stop} className="flex items-center gap-2">
										<span>{stop}</span>{index < copy.routeStops.length - 1 ? <span className="text-accent">→</span> : null}
									</span>
								))}
							</div>
						</div>
						<div>
							<p className="field-meta text-secondary">{copy.currentFocus}</p>
							<p className="mt-4 text-xl leading-8 text-field-paper sm:text-2xl">{copy.focusBody}</p>
						</div>
					</section>

					<footer className="site-footer">{copy.footer}</footer>
				</div>
			</main>
		</div>
	);
}
