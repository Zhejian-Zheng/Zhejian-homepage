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
		eyebrow: "Transmission line · Open",
		title: "Open Channel",
		intro: "A direct line for thoughtful technical work, collaboration, and conversations that benefit from concrete context.",
		reasonsTitle: "Good reasons to write",
		reasons: ["Agent systems and LLM application engineering", "Backend or full-stack product collaboration", "Technical writing, code review, and engineering discussion"],
		channelsTitle: "Direct channels",
		email: "Email",
		github: "GitHub",
		linkedin: "LinkedIn",
		location: "Sydney, Australia · Ningbo, China",
		workMode: "Remote and hybrid collaboration",
		formCode: "MSG-01",
		formTitle: "Send a field message",
		formIntro: "Include the problem, intended outcome, and any useful links. Clear context makes the first reply more useful.",
		name: "Name",
		namePlaceholder: "Your name",
		emailPlaceholder: "you@example.com",
		message: "Message",
		messagePlaceholder: "What are you building, investigating, or deciding?",
		formNotConfigured: "This form is not connected yet. Email me directly while the channel is being configured.",
		formNotConfiguredStatus: "The contact form is not configured. Use the email link instead.",
		success: "Message delivered. I will reply as soon as I can.",
		fallbackError: "The message could not be delivered. Please use the email link instead.",
		sending: "Sending...",
		submit: "Send message",
		response: "Typical response · 1–2 business days",
		footer: "Channel remains open for useful work and clear questions"
	},
	zh: {
		eyebrow: "通信线路 · 开放",
		title: "保持联系",
		intro: "这里适合讨论具体的技术工作、合作机会，以及那些带着清楚背景信息的问题。",
		reasonsTitle: "适合联系我的事项",
		reasons: ["Agent 系统与 LLM 应用工程", "后端或全栈产品合作", "技术写作、代码审查与工程讨论"],
		channelsTitle: "直接联系方式",
		email: "邮箱",
		github: "GitHub",
		linkedin: "LinkedIn",
		location: "澳大利亚悉尼 · 中国宁波",
		workMode: "支持远程与混合协作",
		formCode: "消息-01",
		formTitle: "发送一条现场消息",
		formIntro: "请说明问题、希望达成的结果，以及有帮助的链接。背景越清楚，第一次回复就越有价值。",
		name: "姓名",
		namePlaceholder: "你的名字",
		emailPlaceholder: "you@example.com",
		message: "消息",
		messagePlaceholder: "你正在构建、调查或决定什么？",
		formNotConfigured: "表单暂未连接。配置完成前，请直接通过邮箱联系我。",
		formNotConfiguredStatus: "联系表单尚未配置，请使用邮箱链接。",
		success: "消息已送达，我会尽快回复。",
		fallbackError: "消息未能送达，请改用邮箱联系。",
		sending: "发送中...",
		submit: "发送消息",
		response: "通常回复时间 · 1–2 个工作日",
		footer: "欢迎有明确背景的问题与值得投入的合作"
	}
} as const;

export default function ContactContent() {
	const { language } = useLanguage();
	const copy = contactCopy[language];
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!WEB3FORMS_ACCESS_KEY) {
			setStatus({ type: "error", message: copy.formNotConfiguredStatus });
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
			const response = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: formData });
			const result = await response.json().catch(() => null);

			if (!response.ok || result?.success === false) {
				throw new Error(result?.message ?? copy.fallbackError);
			}

			form.reset();
			setStatus({ type: "success", message: copy.success });
		} catch (error) {
			setStatus({ type: "error", message: error instanceof Error ? error.message : copy.fallbackError });
		} finally {
			setIsSubmitting(false);
		}
	};

	const channels = [
		{ label: copy.email, value: "zj.zheng1@gmail.com", href: "mailto:zj.zheng1@gmail.com", external: false },
		{ label: copy.github, value: "@Zhejian-Zheng", href: "https://github.com/Zhejian-Zheng", external: true },
		{ label: copy.linkedin, value: language === "zh" ? "郑哲坚" : "Zhejian Zheng", href: "https://www.linkedin.com/in/zhejian-zheng-9a5563312/", external: true }
	];

	return (
		<div className="field-page">
			<SiteNav active="contact" />

			<main className="field-wrap">
				<header className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
					<div>
						<p className="field-meta text-accent">{copy.eyebrow}</p>
						<h1 className="field-display mt-4 text-6xl font-semibold leading-none sm:text-8xl">{copy.title}</h1>
					</div>
					<p className="text-base leading-7 text-slate-300">{copy.intro}</p>
				</header>

				<div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
					<div className="space-y-10">
						<section>
							<p className="field-meta text-secondary">{copy.reasonsTitle}</p>
							<ul className="mt-5 border-b border-white/15">
								{copy.reasons.map((reason, index) => (
									<li key={reason} className="grid grid-cols-[36px_1fr] border-t border-white/15 py-4 text-sm leading-6 text-slate-300">
										<span className="font-mono text-xs text-accent">0{index + 1}</span>
										{reason}
									</li>
								))}
							</ul>
						</section>

						<section>
							<p className="field-meta text-secondary">{copy.channelsTitle}</p>
							<div className="mt-5 border-b border-white/15">
								{channels.map((channel) => (
									<a
										key={channel.label}
										href={channel.href}
										target={channel.external ? "_blank" : undefined}
										rel={channel.external ? "noreferrer" : undefined}
										className="group field-record-link flex items-center justify-between gap-4 border-t border-white/15 py-4"
									>
										<div>
											<p className="field-meta">{channel.label}</p>
											<p className="mt-1 break-all text-sm text-field-paper">{channel.value}</p>
										</div>
										<span className="field-arrow" aria-hidden="true">↗</span>
									</a>
								))}
							</div>
							<div className="mt-5 border-l-2 border-accent pl-4">
								<p className="text-sm text-field-paper">{copy.location}</p>
								<p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-slate-500">{copy.workMode}</p>
							</div>
						</section>
					</div>

					<section className="field-panel border-t-2 border-t-primary p-6 sm:p-8">
						<p className="field-meta text-primary">{copy.formCode}</p>
						<h2 className="field-display mt-3 text-4xl font-semibold">{copy.formTitle}</h2>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{copy.formIntro}</p>

						<form onSubmit={handleSubmit} className="mt-8 space-y-5">
							<input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
							<div className="grid gap-5 sm:grid-cols-2">
								<label className="space-y-2">
									<span className="field-meta text-slate-300">{copy.name}</span>
									<input name="name" type="text" required className="field-input" placeholder={copy.namePlaceholder} />
								</label>
								<label className="space-y-2">
									<span className="field-meta text-slate-300">{copy.email}</span>
									<input name="email" type="email" required className="field-input" placeholder={copy.emailPlaceholder} />
								</label>
							</div>
							<label className="block space-y-2">
								<span className="field-meta text-slate-300">{copy.message}</span>
								<textarea name="message" required rows={7} className="field-input resize-none" placeholder={copy.messagePlaceholder} />
							</label>

							{!WEB3FORMS_ACCESS_KEY && (
								<p className="border-l-2 border-accent bg-accent/10 px-4 py-3 text-sm text-amber-100">{copy.formNotConfigured}</p>
							)}
							{status.message && (
								<p className={`border-l-2 px-4 py-3 text-sm ${status.type === "success" ? "border-secondary bg-secondary/10 text-green-100" : "border-rose-400 bg-rose-400/10 text-rose-100"}`} role="status">
									{status.message}
								</p>
							)}

							<div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
								<button type="submit" disabled={isSubmitting || !WEB3FORMS_ACCESS_KEY} className="btn-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40">
									{isSubmitting ? copy.sending : copy.submit}
								</button>
								<p className="field-meta">{copy.response}</p>
							</div>
						</form>
					</section>
				</div>

				<footer className="site-footer border-t border-white/15">{copy.footer}</footer>
			</main>
		</div>
	);
}
