"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();

type FormStatus = {
	type: "idle" | "success" | "error";
	message: string;
};

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!WEB3FORMS_ACCESS_KEY) {
			setStatus({
				type: "error",
				message: "The contact form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local."
			});
			return;
		}

		const form = event.currentTarget;
		const formData = new FormData(form);
		formData.append("access_key", WEB3FORMS_ACCESS_KEY);
		formData.append("subject", "New message from Zhejian homepage");
		formData.append("from_name", "Zhejian Homepage Contact Form");
		formData.append("replyto", String(formData.get("email") ?? ""));

		try {
			setIsSubmitting(true);
			setStatus({ type: "idle", message: "" });

			const response = await fetch(WEB3FORMS_ENDPOINT, {
				method: "POST",
				body: formData
			});
			const result = await response.json().catch(() => null);

			if (!response.ok || result?.success === false) {
				throw new Error(result?.message ?? "Unable to send your message right now.");
			}

			form.reset();
			setStatus({
				type: "success",
				message: "Thanks, your message has been sent. I will get back to you soon."
			});
		} catch (error) {
			setStatus({
				type: "error",
				message: error instanceof Error ? error.message : "Unable to send your message right now."
			});
		} finally {
			setIsSubmitting(false);
		}
	};

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

				<section className="glass p-5 sm:p-6 space-y-5">
					<div>
						<h2 className="text-2xl font-semibold">Send a Message</h2>
						<p className="text-slate-200 mt-1">
							Share a quick note and it will be delivered straight to my inbox.
						</p>
					</div>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="checkbox"
							name="botcheck"
							className="hidden"
							tabIndex={-1}
							autoComplete="off"
						/>
						<div className="grid sm:grid-cols-2 gap-4">
							<label className="space-y-2">
								<span className="text-sm text-slate-200">Name</span>
								<input
									name="name"
									type="text"
									required
									className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
									placeholder="Your name"
								/>
							</label>
							<label className="space-y-2">
								<span className="text-sm text-slate-200">Email</span>
								<input
									name="email"
									type="email"
									required
									className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
									placeholder="you@example.com"
								/>
							</label>
						</div>
						<label className="block space-y-2">
							<span className="text-sm text-slate-200">Message</span>
							<textarea
								name="message"
								required
								rows={5}
								className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
								placeholder="Tell me what you would like to build, discuss, or ask."
							/>
						</label>
						{!WEB3FORMS_ACCESS_KEY && (
							<p className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
								Add your Web3Forms access key to .env.local before this form can send messages.
							</p>
						)}
						{status.message && (
							<p
								className={`rounded-xl border px-4 py-3 text-sm ${
									status.type === "success"
										? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
										: "border-rose-300/30 bg-rose-300/10 text-rose-100"
								}`}
							>
								{status.message}
							</p>
						)}
						<button
							type="submit"
							disabled={isSubmitting || !WEB3FORMS_ACCESS_KEY}
							className="btn-primary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSubmitting ? "Sending..." : "Send Message"}
						</button>
					</form>
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
