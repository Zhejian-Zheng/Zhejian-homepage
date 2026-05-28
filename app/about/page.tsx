/* eslint-disable @next/next/no-img-element */
"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import SiteNav from "../components/SiteNav";
import { useLanguage, type Language } from "../components/language";
import personalPage from "@/app/images/aboutme/personalPage.jpg";
import imgFujimt from "@/app/images/world_exploring/fujimt.jpg";
import imgKyoto from "@/app/images/world_exploring/kyoto.jpg";
import imgTokyo from "@/app/images/world_exploring/tokyo.jpg";
import imgNara2 from "@/app/images/world_exploring/nara2.jpg";
import imgBrisbane from "@/app/images/world_exploring/brisbane.jpg";
import imgYiwu from "@/app/images/world_exploring/yiwu.jpg";
import imgYandang from "@/app/images/world_exploring/yandang.jpg";
import imgKyoto2 from "@/app/images/world_exploring/kyoto2.jpg";
import imgNara from "@/app/images/world_exploring/nara.jpg";
import imgSuzhou from "@/app/images/world_exploring/suzhou.jpg";
import imgPark from "@/app/images/world_exploring/park.jpg";
import imgHome from "@/app/images/world_exploring/home.jpg";
import imgFairlight from "@/app/images/world_exploring/fairlight.jpg";
import imgGuangzhou from "@/app/images/world_exploring/guangzhou.jpg";

type WorldShot = { image: StaticImageData; title: string; caption: string };
type SkillIcon = { label: string; src?: string; text?: string };
type Highlight = { title: string; desc: string };

const highlightsByLanguage: Record<Language, Highlight[]> = {
	en: [
		{ title: "Born in Ningbo, China", desc: "Grew up in a coastal city with a love for technology and design." },
		{ title: "Moved to Sydney at 15", desc: "Multicultural life broadened my perspective and communication style." },
		{ title: "Completed the NSW Higher School Certificate", desc: "Studied from Year 10 to Year 12 and graduated with the Dux award." },
		{ title: "Graduated from UNSW", desc: "Completed a Bachelor of Computer Science with Distinction." }
	],
	zh: [
		{ title: "出生于中国宁波", desc: "在海滨城市长大，从小对技术和设计保持兴趣。" },
		{ title: "15 岁来到悉尼", desc: "多元文化的生活经历拓宽了我的视野和沟通方式。" },
		{ title: "完成 NSW 高中课程", desc: "完成 10 至 12 年级学习，并以全年级第一名的分数毕业。" },
		{ title: "毕业于 UNSW", desc: "完成计算机科学学士学位，并以卓越毕业生的荣誉毕业。" }
	]
};
const skillIcons: SkillIcon[] = [
	{ label: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
	{ label: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
	{ label: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
	{ label: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
	{ label: "IntelliJ IDEA", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" },
	{ label: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
	{ label: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
	{ label: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
	{ label: "Markdown", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg" },
	{ label: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
	{ label: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
	{ label: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
	{ label: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
	{ label: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
	{ label: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
	{ label: "PyTorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
	{ label: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
	{ label: "Rust", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
	{ label: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
	{ label: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
	{ label: "Vercel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
	{ label: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
	{ label: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
	{ label: "Vue", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
	{ label: "Codex", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
	{ label: "Gemini", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlegemini.svg" },
	{ label: "Cursor", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cursor.svg" },
	{ label: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
	{ label: "Dash", text: "Dash" }
]

const worldShotsByLanguage: Record<Language, WorldShot[]> = {
	en: [
		{ image: imgFujimt, title: "Mt. Fuji", caption: "Morning view over the lake." },
		{ image: imgKyoto, title: "Kyoto", caption: "Temples, alleys, and quiet gardens." },
		{ image: imgTokyo, title: "Tokyo", caption: "Neon nights and fast trains." },
		{ image: imgNara2, title: "Nara", caption: "Deer park and calm vibes." },
		{ image: imgBrisbane, title: "Brisbane", caption: "River walks and sunny days." },
		{ image: imgYiwu, title: "Yiwu", caption: "Markets and bustling streets." },
		{ image: imgYandang, title: "Yandang", caption: "Ridges and misty cliffs." },
		{ image: imgKyoto2, title: "Kyoto (Street)", caption: "Evening street lights and quiet corners." },
		{ image: imgNara, title: "Nara (Park)", caption: "Open fields with deer roaming." },
		{ image: imgSuzhou, title: "Suzhou", caption: "Gardens, canals, and stone bridges." },
		{ image: imgPark, title: "Park", caption: "Green lawns and leisurely strolls." },
		{ image: imgHome, title: "Home", caption: "Cozy corner and familiar view." },
		{ image: imgFairlight, title: "Fairlight", caption: "Coastal walks with sea breeze." },
		{ image: imgGuangzhou, title: "Guangzhou", caption: "City lights and skyline." }
	],
	zh: [
		{ image: imgFujimt, title: "富士山", caption: "湖面之上的清晨景色。" },
		{ image: imgKyoto, title: "京都", caption: "寺院、小巷和安静的庭院。" },
		{ image: imgTokyo, title: "东京", caption: "霓虹夜色与快速列车。" },
		{ image: imgNara2, title: "奈良", caption: "鹿苑和轻松的城市节奏。" },
		{ image: imgBrisbane, title: "布里斯班", caption: "河边步道与晴朗天气。" },
		{ image: imgYiwu, title: "义乌", caption: "市场、人流和热闹街道。" },
		{ image: imgYandang, title: "雁荡山", caption: "山脊、雾气和岩壁。" },
		{ image: imgKyoto2, title: "京都街景", caption: "傍晚灯光与安静转角。" },
		{ image: imgNara, title: "奈良公园", caption: "开阔草地与自由漫步的鹿。" },
		{ image: imgSuzhou, title: "苏州", caption: "园林、运河和石桥。" },
		{ image: imgPark, title: "公园", caption: "草地和慢下来的散步时间。" },
		{ image: imgHome, title: "家", caption: "熟悉、安静的小角落。" },
		{ image: imgFairlight, title: "Fairlight", caption: "带着海风的海岸步道。" },
		{ image: imgGuangzhou, title: "广州", caption: "城市灯光与天际线。" }
	]
};

const aboutCopy = {
	en: {
		heroEyebrow: "Traveller · Developer · Creator",
		heroTitlePrefix: "Hi, I’m",
		heroName: "Zhejian",
		heroBody: "Software Engineer and Full Stack Developer based in Sydney, Australia. Graduated from UNSW with a Bachelor of Computer Science, completing the degree with Distinction. Originally from Ningbo, China, I am passionate about crafting seamless digital experiences that blend technical logic with creative design.",
		livingIn: "Living in",
		discoverEyebrow: "Discover",
		discoverTitlePrefix: "Discover the",
		discoverTitleHighlight: "World",
		discoverBody: "I love blending product experience with travel inspiration—maps, routes, photos, and stories that feel great to use.",
		previous: "Prev",
		next: "Next",
		previousPhoto: "Previous photo",
		nextPhoto: "Next photo",
		goToSlide: "Go to slide",
		journey: "My Journey",
		skills: "skills",
		footer: "Established in 2024 by Zhejian Zheng. Continuously updated.",
		builtWith: "Built with React, Next.js, and Tailwind CSS."
	},
	zh: {
		heroEyebrow: "旅行者 · 开发者 · 创作者",
		heroTitlePrefix: "你好，我是",
		heroName: "哲坚",
		heroBody: "我是一名居住在澳大利亚悉尼的软件工程师与全栈开发者，毕业于 UNSW 计算机科学专业，并以卓越毕业生的荣誉毕业。我来自中国宁波，热衷于把技术逻辑、产品体验和创意设计结合起来，构建顺畅好用的数字体验。",
		livingIn: "现居",
		discoverEyebrow: "探索",
		discoverTitlePrefix: "探索这个",
		discoverTitleHighlight: "世界",
		discoverBody: "我喜欢把产品体验和旅行灵感结合起来：地图、路线、照片和故事，都应该变得清晰、自然、好用。",
		previous: "上一张",
		next: "下一张",
		previousPhoto: "上一张照片",
		nextPhoto: "下一张照片",
		goToSlide: "跳转到第",
		journey: "我的经历",
		skills: "技能",
		footer: "由郑哲坚于 2024 年建立，并持续更新。",
		builtWith: "使用 React、Next.js 与 Tailwind CSS 构建。"
	}
} as const;

const SLIDE_AUTO_ADVANCE_MS = 3500;

export default function AboutPage() {
	const { language } = useLanguage();
	const copy = aboutCopy[language];
	const highlights = highlightsByLanguage[language];
	const worldShots = worldShotsByLanguage[language];
	const [shotIndex, setShotIndex] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShotIndex((i) => (i + 1) % worldShots.length);
		}, SLIDE_AUTO_ADVANCE_MS);
		return () => clearTimeout(timer);
	}, [shotIndex, worldShots.length]);

	const nextShot = () => setShotIndex((i) => (i + 1) % worldShots.length);
	const prevShot = () => setShotIndex((i) => (i - 1 + worldShots.length) % worldShots.length);
	const current = worldShots[shotIndex];

	return (
		<div className="container-page">
			<SiteNav active="about" />

			<main className="pt-24 pb-12">
				{/* Hero */}
				<section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4">
					<div className="absolute inset-0 pointer-events-none select-none">
						<p className="absolute top-8 left-4 text-[110px] sm:text-[140px] font-black tracking-tight text-slate-700/50 leading-none">
							WELCOME
						</p>
						<p className="absolute top-32 right-6 text-4xl sm:text-5xl font-bold text-primary/30">ABOUT</p>
					</div>

					<div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14">
						<div className="space-y-6">
							<p className="uppercase text-sm tracking-[0.3em] text-slate-300">{copy.heroEyebrow}</p>
							<h1 className="text-4xl sm:text-5xl font-extrabold text-white">
								{copy.heroTitlePrefix} <span className="text-primary">{copy.heroName}</span>.
							</h1>
							<p className="text-lg text-slate-200">
								{copy.heroBody}
							</p>
						</div>

						<div className="relative">
							<div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-secondary/30 to-accent/20 blur-3xl" />
							<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur">
								<div className="relative h-72 sm:h-80 bg-slate-900">
									<Image
										src={personalPage}
										alt="Personal homepage preview"
										className="object-cover brightness-90"
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										priority
									/>
								</div>
								<div className="absolute bottom-4 right-4 bg-black/70 text-white rounded-xl px-3 py-2 shadow-lg border border-white/20">
									<p className="text-xs uppercase tracking-widest text-amber-200">{copy.livingIn}</p>
									<p className="text-sm font-semibold">Sydney · NSW</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Discover section with rotating shots */}
				<section className="bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-14">
					<div className="mx-auto max-w-6xl">
						<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 min-h-[360px]">
							<div
								className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105"
								style={{ backgroundImage: `url('${current.image.src}')` }}
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-transparent" />
							<div className="relative p-8 md:p-12 text-white space-y-5 max-w-2xl">
								<p className="text-xs uppercase tracking-[0.35em] text-white/80">{copy.discoverEyebrow}</p>
								<h2 className="text-3xl sm:text-4xl font-bold leading-tight">
									{copy.discoverTitlePrefix} <span className="text-amber-200">{copy.discoverTitleHighlight}</span>
								</h2>
								<p className="text-white/90">
									{copy.discoverBody}
								</p>
								<div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4 inline-flex items-start gap-3 border border-white/15">
									<div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/30 shadow">
										<Image src={current.image} alt={current.title} className="object-cover" fill sizes="48px" />
									</div>
									<div>
										<p className="text-sm font-semibold text-white">{current.title}</p>
										<p className="text-xs text-white/80">{current.caption}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 pt-3">
									<button
										onClick={prevShot}
										className="btn bg-white/10 hover:bg-white/20 text-sm px-3 py-2"
										aria-label={copy.previousPhoto}
									>
										{copy.previous}
									</button>
									<button
										onClick={nextShot}
										className="btn bg-white/10 hover:bg-white/20 text-sm px-3 py-2"
										aria-label={copy.nextPhoto}
									>
										{copy.next}
									</button>
									<div className="flex items-center gap-1">
										{worldShots.map((_, idx) => (
											<button
												key={idx}
												onClick={() => setShotIndex(idx)}
												className={`h-2.5 w-2.5 rounded-full transition ${
													idx === shotIndex ? "bg-amber-300" : "bg-white/30 hover:bg-white/60"
												}`}
												aria-label={`${copy.goToSlide} ${idx + 1}`}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
	

				{/* Journey */}
				<section className="px-4 py-12 text-white" style={{ backgroundColor: "rgb(37, 47, 67)" }}>
					<div className="mx-auto max-w-6xl space-y-6">
						<h3 className="text-2xl font-bold text-white">{copy.journey}</h3>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{highlights.map((item) => (
								<div key={item.title} className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-lg">
									<h4 className="font-semibold text-lg text-white">{item.title}</h4>
									<p className="text-sm text-slate-200 mt-1">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Skills */}
				<section className="px-4 py-14 bg-[#3f526f] text-white">
					<div className="mx-auto max-w-6xl">
						<div className="mb-6 flex items-center">
							<h3 className="text-3xl font-extrabold tracking-tight text-white">{copy.skills}</h3>
						</div>
						<div className="flex flex-wrap gap-2.5 sm:gap-3">
							{skillIcons.map((skill) => (
								<div
									key={skill.label}
									className="group flex h-11 w-11 items-center justify-center rounded-lg bg-white/95 shadow-lg ring-1 ring-slate-900/15 transition hover:-translate-y-1 hover:bg-white hover:ring-sky-300/80 sm:h-12 sm:w-12"
									title={skill.label}
								>
									{skill.src ? (
										<img src={skill.src} alt={skill.label} className="h-7 w-7 object-contain sm:h-8 sm:w-8" loading="lazy" />
									) : (
										<span className="text-xs font-black tracking-tight text-slate-900">{skill.text}</span>
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				<footer className="site-footer mt-6">
	<p>{copy.footer}</p>
	<p className="mt-1 text-xs text-white/60">{copy.builtWith}</p>
</footer>
			</main>
		</div>
	);
}
