/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const highlights = [
	{ title: "Born in Ningbo, China", desc: "Grew up in a coastal city; love tech and design." },
	{ title: "Moved to Sydney at 15", desc: "Multicultural life broadened my perspective." },
	{ title: "Currently at UNSW", desc: "Majoring in Computer Science." }
];

const worldShots = [
	{ src: "/assets/images/world_exploring/fujimt.jpg", title: "Mt. Fuji", caption: "Morning view over the lake." },
	{ src: "/assets/images/world_exploring/kyoto.jpg", title: "Kyoto", caption: "Temples, alleys, and quiet gardens." },
	{ src: "/assets/images/world_exploring/tokyo.jpg", title: "Tokyo", caption: "Neon nights and fast trains." },
	{ src: "/assets/images/world_exploring/nara2.jpg", title: "Nara", caption: "Deer park and calm vibes." },
	{ src: "/assets/images/world_exploring/brisbane.jpg", title: "Brisbane", caption: "River walks and sunny days." },
	{ src: "/assets/images/world_exploring/yiwu.jpg", title: "Yiwu", caption: "Markets and bustling streets." },
	{ src: "/assets/images/world_exploring/yandang.jpg", title: "Yandang", caption: "Ridges and misty cliffs." },
	{ src: "/assets/images/world_exploring/kyoto2.jpg", title: "Kyoto (Street)", caption: "Evening street lights and quiet corners." },
	{ src: "/assets/images/world_exploring/nara.jpg", title: "Nara (Park)", caption: "Open fields with deer roaming." },
	{ src: "/assets/images/world_exploring/suzhou.jpg", title: "Suzhou", caption: "Gardens, canals, and stone bridges." },
	{ src: "/assets/images/world_exploring/park.jpg", title: "Park", caption: "Green lawns and leisurely strolls." },
	{ src: "/assets/images/world_exploring/home.jpg", title: "Home", caption: "Cozy corner and familiar view." },
	{ src: "/assets/images/world_exploring/fairlight.jpg", title: "Fairlight", caption: "Coastal walks with sea breeze." },
	{ src: "/assets/images/world_exploring/guangzhou.jpg", title: "Guangzhou", caption: "City lights and skyline." }
];

export default function AboutPage() {
	const [shotIndex, setShotIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setShotIndex((i) => (i + 1) % worldShots.length);
		}, 2000);
		return () => clearInterval(timer);
	}, []);

	const nextShot = () => setShotIndex((i) => (i + 1) % worldShots.length);
	const prevShot = () => setShotIndex((i) => (i - 1 + worldShots.length) % worldShots.length);
	const current = worldShots[shotIndex];

	return (
		<div className="container-page">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl hover:text-primary transition">
						Homepage
					</Link>
					<div className="flex items-center gap-3 sm:gap-4">
						<Link href="/about" className="text-white hover:text-white transition px-3 py-2 rounded-lg bg-white/10">
							About
						</Link>
						<Link href="/blog" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Blog
						</Link>
						<Link href="/contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</Link>
					</div>
				</div>
			</nav>

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
							<p className="uppercase text-sm tracking-[0.3em] text-slate-300">Traveller · Developer · Creator</p>
							<h1 className="text-4xl sm:text-5xl font-extrabold text-white">
								Hi, I’m <span className="text-primary">Zhejian</span>.
							</h1>
							<p className="text-lg text-slate-200">
								Software Engineer and Full Stack Developer based in Sydney, Australia. Currently pursuing a Bachelor of Computer Science at UNSW. Originally from Ningbo, China, I am passionate about crafting seamless digital experiences that blend technical logic with creative design.
							</p>
							<div className="flex flex-wrap gap-3">
								<a
									href="mailto:zj.zheng1@gmail.com"
									className="btn-primary text-base px-6 py-3.5 shadow-lg shadow-primary/25 rounded-xl"
								>
									Email Me
								</a>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-secondary/30 to-accent/20 blur-3xl" />
							<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur">
								<div className="h-72 sm:h-80 bg-slate-900">
									<img
										src="/assets/images/aboutme/personalPage.jpg"
										alt="Personal homepage preview"
										className="h-full w-full object-cover brightness-90"
									/>
								</div>
								<div className="absolute bottom-4 right-4 bg-black/70 text-white rounded-xl px-3 py-2 shadow-lg border border-white/20">
									<p className="text-xs uppercase tracking-widest text-amber-200">Current</p>
									<p className="text-sm font-semibold">Sydney · UNSW</p>
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
								style={{ backgroundImage: `url('${current.src}')` }}
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-transparent" />
							<div className="relative p-8 md:p-12 text-white space-y-5 max-w-2xl">
								<p className="text-xs uppercase tracking-[0.35em] text-white/80">Discover</p>
								<h2 className="text-3xl sm:text-4xl font-bold leading-tight">
									Discover the <span className="text-amber-200">World</span>
								</h2>
								<p className="text-white/90">
									I love blending product experience with travel inspiration—maps, routes, photos, and stories that feel great to use.
								</p>
								<div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4 inline-flex items-start gap-3 border border-white/15">
									<div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/30 shadow">
										<img src={current.src} alt={current.title} className="h-full w-full object-cover" />
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
										aria-label="Previous photo"
									>
										Prev
									</button>
									<button
										onClick={nextShot}
										className="btn bg-white/10 hover:bg-white/20 text-sm px-3 py-2"
										aria-label="Next photo"
									>
										Next
									</button>
									<div className="flex items-center gap-1">
										{worldShots.map((_, idx) => (
											<button
												key={idx}
												onClick={() => setShotIndex(idx)}
												className={`h-2.5 w-2.5 rounded-full transition ${
													idx === shotIndex ? "bg-amber-300" : "bg-white/30 hover:bg-white/60"
												}`}
												aria-label={`Go to slide ${idx + 1}`}
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
						<h3 className="text-2xl font-bold text-white">My Journey</h3>
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
				<section className="px-4 py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
					<div className="mx-auto max-w-6xl space-y-6">
						<h3 className="text-3xl sm:text-4xl font-bold text-white">Skills Snapshot</h3>
						<div className="grid gap-4 lg:grid-cols-3">
							{[
								{ title: "Languages", items: ["C", "C++", "Java", "JavaScript", "TypeScript", "Rust", "Python", "SQL"] },
								{ title: "Web", items: ["React", "Next.js", "Tailwind", "Node.js", "Flask", "Vue3"] },
								{ title: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Linux", "MongoDB", "postgreSQL"] }
							].map((group) => (
								<div
									key={group.title}
									className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white shadow-2xl"
								>
									<p className="text-base uppercase tracking-[0.25em] text-slate-200 mb-4">{group.title}</p>
									<div className="flex flex-wrap gap-3">
										{group.items.map((s) => (
											<span
												key={s}
												className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/15 shadow-sm"
											>
												{s}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<footer className="site-footer mt-6">&copy; 2024 Zhejian Zheng. Made with ❤️</footer>
			</main>
		</div>
	);
}


