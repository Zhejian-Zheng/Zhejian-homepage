/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function BlogPage() {
	return (
		<div className="min-h-screen bg-slate-900 text-white px-4 pb-16 pt-24">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl hover:text-primary transition">
						Homepage
					</Link>
					<div className="flex items-center gap-3 sm:gap-4">
						<Link href="/about" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							About
						</Link>
						<Link href="/blog" className="text-white hover:text-white transition px-3 py-2 rounded-lg bg-white/10">
							Blog
						</Link>
						<Link href="/contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</Link>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-3xl space-y-8">
				<header className="space-y-2">
					<p className="text-sm uppercase tracking-[0.3em] text-slate-400">Build Log</p>
					<h1 className="text-4xl font-bold">Building My Personal Page</h1>
					<p className="text-slate-200">
						A quick write-up on how I assembled this personal homepage with Next.js, Tailwind CSS, and a few simple
						interactions.
					</p>
				</header>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">Stack & Structure</h2>
					<ul className="list-disc list-inside text-slate-200 space-y-1">
						<li>Framework: Next.js (App Router) with TypeScript.</li>
						<li>Styling: Tailwind CSS with a small set of utility helpers (glass, buttons).</li>
						<li>Pages: `app/page.tsx` (Home), `app/about/page.tsx` (About), `app/blog/page.tsx` (this post).</li>
						<li>Assets: served from `public/assets` for easy reference in JSX and CSS.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">Design Choices</h2>
					<ul className="list-disc list-inside text-slate-200 space-y-1">
						<li>Dark base background for contrast; gradients only where they add depth.</li>
						<li>Hero avatar with subtle glow and gradient ring to highlight the profile.</li>
						<li>Quote card with API fetch and local fallback to keep it fresh even offline.</li>
						<li>Optional background toggle on Home to rotate curated landscape images.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">Interactions</h2>
					<ul className="list-disc list-inside text-slate-200 space-y-1">
						<li>Daily quote: fetch from Quotable; fallback rotates local quotes if the API fails.</li>
						<li>Background switcher: preloads a random image before applying to avoid flicker.</li>
						<li>Navigation: simple top bar with anchors/links; buttons keep hover/active feedback.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">Build & Deploy</h2>
					<ul className="list-disc list-inside text-slate-200 space-y-1">
						<li>Lint: `npm run lint` (Next.js ESLint preset + TypeScript rules).</li>
						<li>Dev: `npm run dev` (currently runs on configured port, e.g., 4000 during local checks).</li>
						<li>Deploy: Vercel is the simplest—import the repo, keep defaults, and ship.</li>
					</ul>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">What I’d Improve Next</h2>
					<ul className="list-disc list-inside text-slate-200 space-y-1">
						<li>Add MDX-based posts so content can be edited without touching JSX.</li>
						<li>Introduce a project gallery with filters and tags.</li>
						<li>Lightweight analytics and a contact form with spam protection.</li>
					</ul>
				</section>

				<footer className="text-slate-400 text-sm pt-6">
					Thanks for reading. If you want to inspect the code, it lives in the same repo under the `app/` directory.
				</footer>
			</div>
		</div>
	);
}

