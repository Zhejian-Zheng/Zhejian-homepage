/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function ContactPage() {
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
						<Link href="/blog" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Blog
						</Link>
						<Link href="/contact" className="text-white hover:text-white transition px-3 py-2 rounded-lg bg-white/10">
							Contact
						</Link>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-3xl space-y-8">
				<header className="space-y-2">
					<p className="text-sm uppercase tracking-[0.3em] text-slate-400">Contact</p>
					<h1 className="text-4xl font-bold">Get in Touch</h1>
					<p className="text-slate-200">
						If you’d like to collaborate, chat about projects, or just say hi, feel free to reach out through any of the
						channels below.
					</p>
				</header>

				<section className="grid sm:grid-cols-2 gap-4">
					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="mailto:zj.zheng1@gmail.com"
					>
						<div>
							<p className="text-sm text-slate-200">Email</p>
							<p className="text-lg font-semibold text-white">zj.zheng1@gmail.com</p>
						</div>
						<span className="text-sm text-slate-300">Send</span>
					</a>

					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="https://github.com/Zhejian-Zheng"
						target="_blank"
						rel="noreferrer"
					>
						<div>
							<p className="text-sm text-slate-200">GitHub</p>
							<p className="text-lg font-semibold text-white">@Zhejian-Zheng</p>
						</div>
						<span className="text-sm text-slate-300">Open</span>
					</a>

					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/"
						target="_blank"
						rel="noreferrer"
					>
						<div>
							<p className="text-sm text-slate-200">LinkedIn</p>
							<p className="text-lg font-semibold text-white">Zhejian Zheng</p>
						</div>
						<span className="text-sm text-slate-300">Connect</span>
					</a>

					<div className="glass p-4">
						<p className="text-sm text-slate-200">Location</p>
						<p className="text-lg font-semibold text-white">Sydney, Australia · Ningbo, China</p>
						<p className="text-sm text-slate-300 mt-1">Working remotely / hybrid</p>
					</div>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">Quick Note</h2>
					<p className="text-slate-200">
						I usually respond within 1-2 business days. For faster replies, include a short summary of what you’d like to
						collaborate on (scope, timeline, and any links/docs).
					</p>
				</section>

				<footer className="text-slate-400 text-sm pt-6">
					Thanks for reaching out—looking forward to connecting.
				</footer>
			</div>
		</div>
	);
}

