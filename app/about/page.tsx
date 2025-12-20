/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const destinations = [
	{ name: "Ningbo", label: "China" },
	{ name: "Sydney", label: "Australia" },
	{ name: "UNSW", label: "Study" },
	{ name: "Tokyo", label: "Explore" },
	{ name: "Seoul", label: "Food" },
	{ name: "Bangkok", label: "Travel" },
	{ name: "Bali", label: "Surf" }
];

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
						<a href="/#projects" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Project
						</a>
						<a href="/#blog" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Blog
						</a>
						<a href="/#contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</a>
					</div>
				</div>
			</nav>

			<main className="pt-24 pb-12">
				{/* Hero */}
				<section className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 to-white text-slate-900 px-4">
					<div className="absolute inset-0 pointer-events-none select-none">
						<p className="absolute top-8 left-4 text-[110px] sm:text-[140px] font-black tracking-tight text-slate-300/60 leading-none">
							WELCOME
						</p>
						<p className="absolute top-32 right-6 text-4xl sm:text-5xl font-bold text-primary/20">ABOUT</p>
					</div>

					<div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14">
						<div className="space-y-6">
							<p className="uppercase text-sm tracking-[0.3em] text-slate-500">Traveller · Developer · Creator</p>
							<h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
								Hi, I’m <span className="text-primary">Zhejian</span>.
							</h1>
							<p className="text-lg text-slate-600">
								Software engineer who loves frontend and UX. Grew up in Ningbo, live in Sydney, and study CS/SE at
								UNSW—building experiences with code and design.
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
							<div className="absolute -inset-6 bg-gradient-to-tr from-primary/15 via-secondary/20 to-accent/15 blur-3xl" />
							<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white/70 backdrop-blur">
								<div className="h-72 sm:h-80 bg-slate-900/90">
									<img
										src="/assets/images/profile image.jpg"
										alt="Zhejian Zheng"
										className="h-full w-full object-cover mix-blend-luminosity"
									/>
								</div>
								<div className="absolute bottom-4 right-4 bg-white/90 text-slate-900 rounded-xl px-3 py-2 shadow-lg">
									<p className="text-xs uppercase tracking-widest text-primary">Current</p>
									<p className="text-sm font-semibold">Sydney · UNSW</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Destinations strip */}
				<section className="bg-white px-4 py-10 border-b border-slate-200">
					<div className="mx-auto max-w-6xl text-center space-y-6">
						<p className="text-sm uppercase tracking-[0.3em] text-slate-500">Where do you want to go?</p>
						<div className="flex flex-wrap justify-center gap-6 sm:gap-8">
							{destinations.map((item) => (
								<div
									key={item.name}
									className="flex flex-col items-center gap-1 text-slate-700 hover:text-primary transition"
								>
									<span className="text-2xl">✈️</span>
									<span className="text-sm font-semibold">{item.name}</span>
									<span className="text-xs uppercase tracking-wide text-slate-500">{item.label}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Discover section */}
				<section className="bg-gradient-to-b from-white to-slate-100 px-4 py-12">
					<div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<div className="relative bg-primary/90 text-white rounded-[28px] p-8 shadow-2xl overflow-hidden">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_40%)]" />
							<div className="relative space-y-4">
								<p className="text-xs uppercase tracking-[0.35em] text-white/70">Discover</p>
								<h2 className="text-3xl sm:text-4xl font-bold leading-tight">
									Discover the <span className="text-amber-200">World</span>
								</h2>
								<p className="text-white/80">
									I love blending product experience with travel inspiration—maps, routes, photos, and stories that feel great to use.
								</p>
								<button className="btn bg-white text-primary font-semibold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition">
									Explore Destinations
								</button>
							</div>
						</div>

						<div className="relative w-full">
							<div className="aspect-[4/3] rounded-[28px] bg-white shadow-xl border border-slate-200 overflow-hidden flex items-center justify-center">
								<div className="relative w-[90%] h-[80%] bg-slate-50 border border-slate-200 rounded-2xl">
									{[
										{ left: "30%", top: "48%", label: "Ningbo" },
										{ left: "65%", top: "60%", label: "Sydney" },
										{ left: "62%", top: "55%", label: "UNSW" }
									].map((p) => (
										<div key={p.label} className="absolute" style={{ left: p.left, top: p.top }}>
											<span className="flex h-8 w-8">
												<span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-primary/30" />
												<span className="relative inline-flex h-8 w-8 rounded-full bg-primary" />
											</span>
											<p className="mt-1 text-xs text-slate-600 bg-white/80 px-2 py-1 rounded-full border border-slate-200 shadow">
												{p.label}
											</p>
										</div>
									))}
									<p className="absolute bottom-3 right-4 text-xs text-slate-400">Exploring · Building</p>
								</div>
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
									<div key={item.title} className="glass p-4 text-slate-100 bg-slate-900/80 border-slate-800">
										<h4 className="font-semibold text-lg text-white">{item.title}</h4>
										<p className="text-sm text-slate-200/80 mt-1">{item.desc}</p>
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
									{["React", "Next.js", "Tailwind", "Node.js"].map((s) => (
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


