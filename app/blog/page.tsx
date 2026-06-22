import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
	title: "Blog – Zhejian Zheng",
	description: "Technical writeups about full-stack systems, data workflows, web design, human-computer interaction, and the decisions behind my public repositories.",
	openGraph: {
		title: "Blog – Zhejian Zheng",
		description: "Technical writeups about full-stack systems, data workflows, web design, and engineering decisions.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Blog – Zhejian Zheng",
		description: "Technical writeups about full-stack systems, data workflows, web design, and engineering decisions.",
	},
};
import { LocalizedText } from "../components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "./localizedPostText";
import { blogPosts } from "./posts";

export default function BlogPage() {
	const aiAgentSlugs = new Set(["code-with-codex"]);
	const aiAgentPosts = blogPosts.filter((post) => aiAgentSlugs.has(post.slug));
	const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).slice(0, 14);
	const selectedProjectSlugs = new Set([
		"solana-orderflow-event-driven-escrow",
		"safe-rl-supervised-shield",
		"legal-youth-prototype-web",
		"tcp-udp-simulator"
	]);
	const selectedProjectPosts = blogPosts.filter((post) => selectedProjectSlugs.has(post.slug));
	const remainingPosts = blogPosts.filter((post) => !aiAgentSlugs.has(post.slug) && !selectedProjectSlugs.has(post.slug));
	const countedPosts = blogPosts.length;

	return (
		<div className="min-h-screen bg-slate-950 text-white px-4 pb-16 pt-24">
			<SiteNav active="blog" />

			<div className="mx-auto max-w-6xl space-y-12">
				<header className="relative overflow-hidden border-b border-white/10 pb-10">
					<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-secondary to-accent" />
					<div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
						<div className="space-y-5">
							<p className="text-sm uppercase tracking-[0.3em] text-primary">
								<LocalizedText en="Build Log" zh="构建日志" />
							</p>
							<div className="space-y-4">
								<h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
									<LocalizedText en="Blogs" zh="博客" />
								</h1>
								<p className="max-w-2xl text-lg leading-8 text-slate-200">
									<LocalizedText
										en="Short technical writeups about full-stack systems, data workflows, web design, human-computer interaction, and the decisions behind my public repositories."
										zh="这里记录我在全栈系统、数据流程、网页设计、人机交互和公开项目中的技术思考与实现决策。"
									/>
								</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3 text-center lg:grid-cols-1 lg:text-left">
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">{countedPosts}</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
									<LocalizedText en="Posts" zh="文章" />
								</p>
							</div>
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">{allTags.length}</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
									<LocalizedText en="Topics" zh="主题" />
								</p>
							</div>
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">MDX</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">
									<LocalizedText en="Format" zh="格式" />
								</p>
							</div>
						</div>
					</div>
				</header>

				<section className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 sm:p-6">
					<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-primary">
								<LocalizedText en="Selected Work" zh="精选作品" />
							</p>
							<h2 className="mt-2 text-3xl font-bold text-white">
								<LocalizedText en="Featured Projects" zh="代表项目" />
							</h2>
						</div>
						<p className="max-w-md text-sm leading-6 text-slate-400">
							<LocalizedText
								en="Project-focused notes that best represent my work across full-stack systems, data, UX, and engineering architecture."
								zh="这些项目笔记最能代表我在全栈系统、数据、用户体验和工程架构上的实践。"
							/>
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{selectedProjectPosts.map((post) => (
							<article
								key={post.slug}
								className="rounded-lg border border-white/10 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-slate-900 hover:shadow-lg hover:shadow-primary/15"
							>
								<div className="flex items-start justify-between gap-4">
									<h3 className="text-2xl font-semibold leading-snug text-white">
										<LocalizedPostTitle slug={post.slug} title={post.title} />
									</h3>
									<span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
								</div>
								<p className="mt-3 text-sm leading-7 text-slate-300">
									<LocalizedPostSummary slug={post.slug} summary={post.summary} />
								</p>
								<div className="mt-5 flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
											<LocalizedTag tag={tag} />
										</span>
									))}
								</div>
								<Link
									href={`/blog/${post.slug}`}
									className="mt-5 inline-flex rounded-lg border border-primary/40 bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/85"
								>
									<LocalizedText en="Read case note" zh="阅读项目笔记" />
								</Link>
							</article>
						))}
					</div>
				</section>

				<section className="space-y-5">
					<div className="flex items-end justify-between gap-4">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-primary">
								<LocalizedText en="Reflection" zh="思考" />
							</p>
							<h2 className="mt-2 text-3xl font-bold text-white">
								<LocalizedText en="AI Agent Inspiration" zh="AI Agent 灵感" />
							</h2>
						</div>
						<span className="hidden rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-slate-200 sm:inline-flex">
							{aiAgentPosts.length} <LocalizedText en="post" zh="篇" />
						</span>
					</div>
					<p className="max-w-3xl text-sm leading-7 text-slate-400">
						<LocalizedText
							en="Notes on building with AI agents, from implementation speed to product judgment, verification habits, and keeping the final work personal."
							zh="记录我如何与 AI agent 一起构建项目：从实现速度、产品判断、验证习惯，到如何保持作品的个人表达。"
						/>
					</p>

					<div className="grid gap-4 lg:grid-cols-2">
						{aiAgentPosts.map((post) => (
							<article
								key={post.slug}
								className="group rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 via-slate-900/80 to-accent/10 p-5 shadow-xl shadow-primary/10 transition hover:-translate-y-1 hover:border-accent/70 hover:shadow-lg hover:shadow-accent/15"
							>
								<div className="space-y-4">
									<div className="flex items-start justify-between gap-4">
										<p className="text-xs uppercase tracking-[0.25em] text-primary">
											<LocalizedDate date={post.publishedAt} />
										</p>
										<span className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_20px_rgba(245,158,11,0.8)]" />
									</div>
									<div className="space-y-3">
										<h3 className="text-2xl font-semibold leading-snug text-white group-hover:text-accent transition">
											<LocalizedPostTitle slug={post.slug} title={post.title} />
										</h3>
										<p className="text-sm leading-7 text-slate-300">
											<LocalizedPostSummary slug={post.slug} summary={post.summary} />
										</p>
									</div>
								</div>
								<div className="mt-5 flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
											<LocalizedTag tag={tag} />
										</span>
									))}
								</div>
								<Link
									href={`/blog/${post.slug}`}
									className="mt-5 inline-flex rounded-lg border border-accent/40 bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/85"
								>
									<LocalizedText en="Read note" zh="阅读笔记" />
								</Link>
							</article>
						))}
					</div>
				</section>

				<section className="space-y-5">
					<div className="flex items-end justify-between gap-4">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
								<LocalizedText en="Project Writeups" zh="项目复盘" />
							</p>
							<h2 className="mt-2 text-3xl font-semibold text-white">
								<LocalizedText en="Technical case notes" zh="技术案例笔记" />
							</h2>
						</div>
						<span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300 sm:inline-flex">
							{remainingPosts.length} <LocalizedText en="posts" zh="篇" />
						</span>
					</div>

					<div className="grid gap-4 lg:grid-cols-2">
						{remainingPosts.map((post) => {
						return (
							<article
								key={post.slug}
								className="group rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-primary/60 hover:bg-slate-900 hover:shadow-lg hover:shadow-primary/15"
							>
								<div className="space-y-4">
									<div className="flex items-start justify-between gap-4">
										<p className="text-xs uppercase tracking-[0.25em] text-slate-400">
											<LocalizedDate date={post.publishedAt} />
										</p>
										<span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
									</div>
									<div className="space-y-3">
										<h3 className="text-2xl font-semibold leading-snug text-white group-hover:text-primary transition">
											<LocalizedPostTitle slug={post.slug} title={post.title} />
										</h3>
										<p className="text-sm leading-7 text-slate-300">
											<LocalizedPostSummary slug={post.slug} summary={post.summary} />
										</p>
									</div>
								</div>
								<div className="mt-5 flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
											<LocalizedTag tag={tag} />
										</span>
									))}
								</div>
								<Link
									href={`/blog/${post.slug}`}
									className="mt-5 inline-flex rounded-lg border border-primary/40 bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-primary/85 hover:shadow-primary/30"
								>
									<LocalizedText en="Read note" zh="阅读笔记" />
								</Link>
							</article>
						);
						})}
					</div>
				</section>

				<footer className="border-t border-white/10 pt-8 text-sm text-slate-400">
					<LocalizedText en="Thanks for reading. You can visit my " zh="感谢阅读。你也可以访问我的 " />
					<a
						href="https://github.com/Zhejian-Zheng"
						target="_blank"
						rel="noreferrer"
						className="text-primary hover:text-primary/80 underline underline-offset-4"
					>
						GitHub
					</a>{" "}
					<LocalizedText en="to explore my code and projects." zh="查看我的代码和项目。" />
				</footer>
			</div>
		</div>
	);
}
