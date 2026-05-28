"use client";

import { type FormEvent, useState } from "react";
import SiteNav from "../components/SiteNav";
import { useLanguage } from "../components/language";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();

type FormStatus = {
	type: "idle" | "success" | "error";
	message: string;
};

const contactCopy = {
	en: {
		eyebrow: "Contact",
		title: "Get in Touch",
		intro: "If you’d like to collaborate, chat about projects, or just say hi, feel free to reach out through any of the channels below.",
		email: "Email",
		send: "Send",
		github: "GitHub",
		open: "Open",
		linkedin: "LinkedIn",
		linkedinName: "Zhejian Zheng",
		connect: "Connect",
		location: "Location",
		locationValue: "Sydney, Australia · Ningbo, China",
		workMode: "Working remotely / hybrid",
		formTitle: "Send a Message",
		formIntro: "Share a quick note and it will be delivered straight to my inbox.",
		name: "Name",
		namePlaceholder: "Your name",
		emailPlaceholder: "you@example.com",
		message: "Message",
		messagePlaceholder: "Tell me what you would like to build, discuss, or ask.",
		formNotConfigured: "Add your Web3Forms access key to .env.local before this form can send messages.",
		formNotConfiguredStatus: "The contact form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env.local.",
		success: "Thanks, your message has been sent. I will get back to you soon.",
		fallbackError: "Unable to send your message right now.",
		sending: "Sending...",
		submit: "Send Message",
		quickNoteTitle: "Quick Note",
		quickNote: "I usually respond within 1-2 business days. For faster replies, include a short summary of what you’d like to collaborate on (scope, timeline, and any links/docs).",
		footer: "Thanks for reaching out—looking forward to connecting."
	},
	zh: {
		eyebrow: "联系",
		title: "联系我",
		intro: "如果你想合作、交流项目，或者只是打个招呼，可以通过下面的方式联系我。",
		email: "邮箱",
		send: "发送",
		github: "GitHub",
		open: "打开",
		linkedin: "LinkedIn",
		linkedinName: "郑哲坚",
		connect: "连接",
		location: "所在地",
		locationValue: "澳大利亚悉尼 · 中国宁波",
		workMode: "支持远程 / 混合协作",
		formTitle: "发送消息",
		formIntro: "写下一段简短信息，它会直接发送到我的邮箱。",
		name: "姓名",
		namePlaceholder: "你的名字",
		emailPlaceholder: "you@example.com",
		message: "消息",
		messagePlaceholder: "告诉我你想构建、讨论或咨询的内容。",
		formNotConfigured: "请先在 .env.local 中添加 Web3Forms access key，表单才能发送消息。",
		formNotConfiguredStatus: "联系表单还没有配置。请在 .env.local 中添加 NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY。",
		success: "谢谢，你的消息已经发送。我会尽快回复你。",
		fallbackError: "暂时无法发送消息，请稍后再试。",
		sending: "发送中...",
		submit: "发送消息",
		quickNoteTitle: "小提示",
		quickNote: "我通常会在 1-2 个工作日内回复。为了更快沟通，可以附上一段简短说明，比如合作范围、时间线以及相关链接或文档。",
		footer: "感谢联系，期待和你交流。"
	}
} as const;

export default function ContactPage() {
	const { language } = useLanguage();
	const copy = contactCopy[language];
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!WEB3FORMS_ACCESS_KEY) {
			setStatus({
				type: "error",
				message: copy.formNotConfiguredStatus
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
				message: copy.success
			});
		} catch (error) {
			setStatus({
				type: "error",
				message: error instanceof Error ? error.message : copy.fallbackError
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-900 text-white px-4 pb-16 pt-24">
			<SiteNav active="contact" />

			<div className="mx-auto max-w-3xl space-y-8">
				<header className="space-y-2">
					<p className="text-sm uppercase tracking-[0.3em] text-slate-400">{copy.eyebrow}</p>
					<h1 className="text-4xl font-bold">{copy.title}</h1>
					<p className="text-slate-200">
						{copy.intro}
					</p>
				</header>

				<section className="grid sm:grid-cols-2 gap-4">
					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="mailto:zj.zheng1@gmail.com"
					>
						<div>
							<p className="text-sm text-slate-200">{copy.email}</p>
							<p className="text-lg font-semibold text-white">zj.zheng1@gmail.com</p>
						</div>
						<span className="text-sm text-slate-300">{copy.send}</span>
					</a>

					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="https://github.com/Zhejian-Zheng"
						target="_blank"
						rel="noreferrer"
					>
						<div>
							<p className="text-sm text-slate-200">{copy.github}</p>
							<p className="text-lg font-semibold text-white">@Zhejian-Zheng</p>
						</div>
						<span className="text-sm text-slate-300">{copy.open}</span>
					</a>

					<a
						className="glass p-4 flex items-center justify-between hover:bg-white/15 transition"
						href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/"
						target="_blank"
						rel="noreferrer"
					>
						<div>
							<p className="text-sm text-slate-200">{copy.linkedin}</p>
							<p className="text-lg font-semibold text-white">{copy.linkedinName}</p>
						</div>
						<span className="text-sm text-slate-300">{copy.connect}</span>
					</a>

					<div className="glass p-4">
						<p className="text-sm text-slate-200">{copy.location}</p>
						<p className="text-lg font-semibold text-white">{copy.locationValue}</p>
						<p className="text-sm text-slate-300 mt-1">{copy.workMode}</p>
					</div>
				</section>

				<section className="glass p-5 sm:p-6 space-y-5">
					<div>
						<h2 className="text-2xl font-semibold">{copy.formTitle}</h2>
						<p className="text-slate-200 mt-1">
							{copy.formIntro}
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
								<span className="text-sm text-slate-200">{copy.name}</span>
								<input
									name="name"
									type="text"
									required
									className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
									placeholder={copy.namePlaceholder}
								/>
							</label>
							<label className="space-y-2">
								<span className="text-sm text-slate-200">{copy.email}</span>
								<input
									name="email"
									type="email"
									required
									className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
									placeholder={copy.emailPlaceholder}
								/>
							</label>
						</div>
						<label className="block space-y-2">
							<span className="text-sm text-slate-200">{copy.message}</span>
							<textarea
								name="message"
								required
								rows={5}
								className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
								placeholder={copy.messagePlaceholder}
							/>
						</label>
						{!WEB3FORMS_ACCESS_KEY && (
							<p className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
								{copy.formNotConfigured}
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
							{isSubmitting ? copy.sending : copy.submit}
						</button>
					</form>
				</section>

				<section className="space-y-3">
					<h2 className="text-2xl font-semibold">{copy.quickNoteTitle}</h2>
					<p className="text-slate-200">
						{copy.quickNote}
					</p>
				</section>

				<footer className="text-slate-400 text-sm pt-6">
					{copy.footer}
				</footer>
			</div>
		</div>
	);
}
