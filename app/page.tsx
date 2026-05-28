"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import SiteNav from "./components/SiteNav";
import { useLanguage, type Language } from "./components/language";
import profileImg from "@/app/images/profile image.jpg";
import bgBerlin from "@/app/images/backgrounds/berlin-6755246.jpg";
import bgYosemite from "@/app/images/backgrounds/yosemite-8177850.jpg";
import bgBerchtesgaden from "@/app/images/backgrounds/berchtesgaden-2928711.jpg";
import bgBall from "@/app/images/backgrounds/ball-63527.jpg";
import bgCityscape from "@/app/images/backgrounds/cityscape-6942013.jpg";

type Quote = { content: string; author: string };
type BgImage = StaticImageData;

const BG_IMAGES: BgImage[] = [bgBerlin, bgYosemite, bgBerchtesgaden, bgBall, bgCityscape];

const localQuotes: Record<Language, Quote[]> = {
	en: [
		{ content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
		{ content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
		{ content: "Ship early, ship often.", author: "Product wisdom" },
		{ content: "Design is not just what it looks like. Design is how it works.", author: "Steve Jobs" },
		{ content: "Programs must be written for people to read.", author: "Harold Abelson" },
		{ content: "Move fast, but don’t break everything.", author: "Pragmatic dev" }
	],
	zh: [
		{ content: "预测未来最好的方式，就是亲手创造它。", author: "Peter Drucker" },
		{ content: "好的体验来自清晰的逻辑，也来自对人的理解。", author: "郑哲坚" },
		{ content: "先把东西做出来，再把它打磨得更好。", author: "Product wisdom" },
		{ content: "设计不只是看起来如何，更是使用起来如何。", author: "Steve Jobs" },
		{ content: "代码首先是写给人读的，其次才是给机器执行的。", author: "Harold Abelson" },
		{ content: "保持速度，也保持判断。", author: "Pragmatic dev" }
	]
};

const homeCopy = {
	en: {
		displayName: "Zhejian Zheng",
		role: "Software Engineer & Developer",
		intro: "Passionate about full-stack development, data-driven solutions, web design, and human-computer interaction, with a focus on building intuitive user-centered digital experiences.",
		readBlogs: "Read Blogs",
		contactMe: "Contact Me",
		loadingQuote: "Loading daily quote...",
		quoteFallbackAuthor: "Quote",
		changeBackground: "Change background",
		refreshQuote: "click to refresh daily quote",
		footer: "Established in 2024 by Zhejian Zheng. Continuously updated.",
		builtWith: "Built with React, Next.js, and Tailwind CSS."
	},
	zh: {
		role: "软件工程师与开发者",
		intro: "专注于全栈开发、数据驱动方案、网页设计与人机交互，喜欢构建直观、以用户体验为中心的数字产品。",
		readBlogs: "阅读博客",
		contactMe: "联系我",
		loadingQuote: "正在加载今日灵感...",
		quoteFallbackAuthor: "语录",
		changeBackground: "更换背景",
		refreshQuote: "点击刷新今日灵感",
		displayName: "郑哲坚",
		footer: "由郑哲坚于 2024 年建立，并持续更新。",
		builtWith: "使用 React、Next.js 与 Tailwind CSS 构建。"
	}
} as const;

export default function HomePage() {
	const { language } = useLanguage();
	const copy = homeCopy[language];
	const [quote, setQuote] = useState<Quote | null>(null);
	const [loading, setLoading] = useState(false);
	const [bgLoading, setBgLoading] = useState(false);
	const [currentBg, setCurrentBg] = useState<BgImage>(BG_IMAGES[0]);

	const loadQuote = useCallback(async () => {
		try {
			setLoading(true);
			if (language === "zh") {
				const fallback = localQuotes.zh[Math.floor(Math.random() * localQuotes.zh.length)];
				setQuote(fallback);
				return;
			}
			const ts = Date.now();
			const resp = await fetch(`https://api.quotable.io/random?t=${ts}`, { cache: "no-store" });
			if (!resp.ok) {
				throw new Error(`status ${resp.status}`);
			}
			const data = await resp.json();
			setQuote({ content: data.content, author: data.author });
		} catch {
			// Ensure it still changes even if API fails
			const fallback = localQuotes[language][Math.floor(Math.random() * localQuotes[language].length)];
			setQuote(fallback);
		} finally {
			setLoading(false);
		}
	}, [language]);

	const changeBackground = () => {
		try {
			setBgLoading(true);
			const imgUrl = BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)];
			const preload = new window.Image();
			preload.onload = () => {
				setCurrentBg(imgUrl);
				setBgLoading(false);
			};
			preload.onerror = () => setBgLoading(false);
			preload.src = imgUrl.src;
		} catch {
			setBgLoading(false);
		}
	};

	useEffect(() => {
		loadQuote();
	}, [loadQuote]);

	return (
		<div className="min-h-screen w-full bg-slate-950 text-white">
			<SiteNav active="home">
				<button
					onClick={changeBackground}
					className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg shadow-secondary/20 transition hover:border-primary/50 hover:bg-primary/25 disabled:opacity-60"
					disabled={bgLoading}
					aria-label={copy.changeBackground}
					title={copy.changeBackground}
				>
					<svg
						viewBox="0 0 24 24"
						className={`h-5 w-5 ${bgLoading ? "animate-spin" : ""}`}
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						aria-hidden="true"
					>
						<path d="M21 12a9 9 0 0 1-15.3 6.4" />
						<path d="M3 12A9 9 0 0 1 18.3 5.6" />
						<path d="M18 2v4h-4" />
						<path d="M6 22v-4h4" />
					</svg>
				</button>
			</SiteNav>

			<main className="relative isolate overflow-hidden bg-slate-950">
				<div className="absolute inset-0 -z-10">
					<div
						className="absolute inset-0 bg-cover bg-center transition-all duration-500"
						style={{ backgroundImage: `url('${currentBg.src}')` }}
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/80 to-slate-900/90" />
				</div>

				<section className="flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-24 text-center">
					<div className="relative mb-6">
						<div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary animate-[pulse_3s_ease-in-out_infinite] opacity-70" />
						<Image
							src={profileImg}
							alt={language === "zh" ? "郑哲坚" : "Zhejian Zheng"}
							className="relative h-40 w-40 rounded-full object-cover ring-2 ring-white/30 sm:h-44 sm:w-44"
							width={176}
							height={176}
							priority
						/>
					</div>

					<div className="space-y-3">
						<h1 className="text-4xl font-bold drop-shadow sm:text-5xl">{copy.displayName}</h1>
						<p className="text-lg text-white/90 sm:text-xl">{copy.role}</p>
						<p className="mx-auto max-w-xl text-white/80">
							{copy.intro}
						</p>
					</div>

					<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
						<Link href="/blog" className="glass rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
							{copy.readBlogs}
						</Link>
						<Link href="/contact" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/85">
							{copy.contactMe}
						</Link>
					</div>

					<button
						onClick={loadQuote}
						className="glass mt-6 w-full max-w-2xl px-5 py-4 text-left transition hover:bg-white/15 disabled:opacity-60"
						aria-label={copy.refreshQuote}
						title={copy.refreshQuote}
						disabled={loading}
					>
						<p className="text-base italic sm:text-lg">{quote?.content ?? copy.loadingQuote}</p>
						<p className="mt-1 text-sm opacity-80">— {quote?.author ?? copy.quoteFallbackAuthor}</p>
					</button>

					<div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
						<a
							className="btn-circle glass transition hover:scale-105"
							href="https://github.com/Zhejian-Zheng"
							target="_blank"
							rel="noreferrer"
							aria-label="GitHub"
							title="GitHub"
						>
							<svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
								<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
							</svg>
						</a>
						<a
							className="btn-circle glass transition hover:scale-105"
							href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/"
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn"
							title="LinkedIn"
						>
							<svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
								<path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.96 0-1.73-.78-1.73-1.73s.77-1.73 1.73-1.73 1.73.78 1.73 1.73-.77 1.73-1.73 1.73zm13.5 11.27h-3v-5.6c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.98v5.69h-3v-10h2.88v1.37h.04c.4-.75 1.39-1.54 2.86-1.54 3.06 0 3.63 2.02 3.63 4.65v5.52z" />
							</svg>
						</a>
					</div>
				</section>

				<footer className="site-footer relative z-10 border-t border-white/10 bg-slate-950/90">
					<p>{copy.footer}</p>
					<p className="mt-1 text-xs text-white/60">{copy.builtWith}</p>
				</footer>
			</main>
		</div>
	);
}
