/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const highlights = [
	{ title: "Born in Ningbo, China", desc: "Grew up in a coastal city; love tech and design." },
	{ title: "Moved to Sydney at 15", desc: "Multicultural life broadened my perspective." },
	{ title: "Currently at UNSW", desc: "Majoring in CS/Software Engineering." }
];

export default function AboutPage() {
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
									className="btn-primary text-sm px-4 py-3 shadow-lg shadow-primary/20"
								>
									Email Me
								</a>
								<a
									href="https://github.com/Zhejian-Zheng"
									target="_blank"
									rel="noreferrer"
									className="btn-secondary text-sm px-4 py-3 shadow-lg shadow-secondary/20"
								>
									GitHub
								</a>
							</div>
						</div>

						<div className="relative">
							<div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-secondary/30 to-accent/20 blur-3xl" />
							<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur">
								<div className="h-72 sm:h-80 bg-slate-900">
									<img
										src="/assets/images/personalPage.jpg"
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

				{/* Discover section */}
				<section className="bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-12">
					<div className="mx-auto max-w-5xl">
						<div className="relative bg-primary text-white rounded-[28px] p-10 shadow-2xl overflow-hidden">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_40%)]" />
							<div className="relative space-y-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/80">Discover</p>
								<h2 className="text-3xl sm:text-4xl font-bold leading-tight">
									Discover the <span className="text-amber-200">World</span>
								</h2>
								<p className="text-white/90">
									I love blending product experience with travel inspiration—maps, routes, photos, and stories that feel great to use.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Story + skills */}
				<section className="px-4 py-12 bg-white">
					<div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-5">
							<h3 className="text-2xl font-bold text-slate-900">My Journey</h3>
							<div className="grid sm:grid-cols-2 gap-4">
								{highlights.map((item) => (
									<div key={item.title} className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-lg">
										<h4 className="font-semibold text-lg text-white">{item.title}</h4>
										<p className="text-sm text-slate-200 mt-1">{item.desc}</p>
									</div>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-2xl font-bold text-slate-900">Skills Snapshot</h3>
							<div className="glass p-4 bg-white/70 text-slate-900">
								<p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Languages</p>
								<div className="flex flex-wrap gap-2">
									{["C", "C++", "Java", "JavaScript", "TypeScript", "Rust", "Python", "SQL"].map((s) => (
										<span key={s} className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
											{s}
										</span>
									))}
								</div>

								<p className="text-sm uppercase tracking-[0.2em] text-slate-500 my-3">Web</p>
								<div className="flex flex-wrap gap-2">
									{["React", "Next.js", "Tailwind", "Node.js", "Flask", "Vue3"].map((s) => (
										<span key={s} className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
											{s}
										</span>
									))}
								</div>

								<p className="text-sm uppercase tracking-[0.2em] text-slate-500 my-3">Tools</p>
								<div className="flex flex-wrap gap-2">
									{["Git", "Docker", "AWS", "Vercel", "Linux"].map((s) => (
										<span key={s} className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
											{s}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<footer className="site-footer mt-6">&copy; 2024 Zhejian Zheng. Made with ❤️</footer>
			</main>
		</div>
	);
}


