import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { LocalizedText } from "../components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "./localizedPostText";
import { blogCategoryOrder, getBlogCategory, type BlogCategoryKey } from "./categories";
import { blogPosts, type BlogPost } from "./posts";

export const metadata: Metadata = {
	title: "Blog – Zhejian Zheng",
	description: "Field notes on agent engineering, backend systems, data workflows, product interfaces, and the decisions behind real projects.",
	openGraph: {
		title: "Blog – Zhejian Zheng",
		description: "Engineering field notes on agents, systems, data, and product decisions.",
		type: "website"
	},
	twitter: {
		card: "summary",
		title: "Blog – Zhejian Zheng",
		description: "Engineering field notes on agents, systems, data, and product decisions."
	}
};

const categoryCopy: Record<BlogCategoryKey, { index: string; titleEn: string; titleZh: string; bodyEn: string; bodyZh: string }> = {
	agents: {
		index: "01",
		titleEn: "Agent Engineering",
		titleZh: "Agent 工程",
		bodyEn: "Source-level notes on runtimes, memory, permissions, recovery, and framework choices.",
		bodyZh: "从源码出发，记录运行时、记忆、权限、恢复机制与框架选型。"
	},
	systems: {
		index: "02",
		titleEn: "Systems & Data",
		titleZh: "系统与数据",
		bodyEn: "Backend architecture, protocols, automation, databases, and deterministic system design.",
		bodyZh: "后端架构、网络协议、自动化、数据库与确定性系统设计。"
	},
	product: {
		index: "03",
		titleEn: "Product & Interface",
		titleZh: "产品与界面",
		bodyEn: "How technical decisions become understandable workflows and maintainable products.",
		bodyZh: "技术决策如何转化为清晰的流程、界面与可维护的产品。"
	},
	archive: {
		index: "04",
		titleEn: "Project Archive",
		titleZh: "项目档案",
		bodyEn: "Earlier experiments, references, and practical engineering records.",
		bodyZh: "早期实验、工程参考与实践记录。"
	}
};

function ArticleRecord({ post }: { post: BlogPost }) {
	return (
		<Link href={`/blog/${post.slug}`} className="group field-record-link grid gap-4 border-t border-white/15 px-1 py-6 sm:grid-cols-[120px_minmax(0,1fr)_24px] sm:px-4">
			<p className="field-meta pt-1 text-accent"><LocalizedDate date={post.publishedAt} /></p>
			<div>
				<h3 className="text-xl font-semibold leading-snug text-field-paper transition group-hover:text-primary">
					<LocalizedPostTitle slug={post.slug} title={post.title} />
				</h3>
				<p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
					<LocalizedPostSummary slug={post.slug} summary={post.summary} />
				</p>
				<div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate-500">
					{post.tags.slice(0, 3).map((tag) => <span key={tag}><LocalizedTag tag={tag} /></span>)}
				</div>
			</div>
			<span className="field-arrow hidden sm:block" aria-hidden="true">↗</span>
		</Link>
	);
}

export default function BlogPage() {
	const featured = blogPosts[0];
	const remaining = blogPosts.slice(1);
	const grouped = Object.fromEntries(
		blogCategoryOrder.map((category) => [category, remaining.filter((post) => getBlogCategory(post.slug) === category)])
	) as Record<BlogCategoryKey, BlogPost[]>;

	return (
		<div className="field-page">
			<SiteNav active="blog" />

			<main className="field-wrap">
				<header className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
					<div>
						<p className="field-meta text-accent"><LocalizedText en="Notebook index · 2024—2026" zh="笔记索引 · 2024—2026" /></p>
						<h1 className="field-display mt-4 text-6xl font-semibold leading-none sm:text-8xl">
							<LocalizedText en="Engineering field notes" zh="工程现场笔记" />
						</h1>
					</div>
					<p className="text-base leading-7 text-slate-300">
						<LocalizedText
							en="Detailed records of how I build agent systems, backend infrastructure, and product interfaces—and where the trade-offs actually appear."
							zh="详细记录我如何构建 Agent 系统、后端基础设施和产品界面，以及工程取舍真正出现在哪里。"
						/>
					</p>
				</header>

				<section className="grid border-b border-white/15 bg-field-navy/80 lg:grid-cols-[260px_minmax(0,1fr)]">
					<div className="border-b border-white/15 p-6 lg:border-b-0 lg:border-r lg:p-8">
						<p className="field-meta text-secondary"><LocalizedText en="Featured record" zh="重点记录" /></p>
						<p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-slate-500"><LocalizedDate date={featured.publishedAt} /></p>
					</div>
					<Link href={`/blog/${featured.slug}`} className="group field-record-link p-6 lg:p-8">
						<div className="flex items-start justify-between gap-5">
							<h2 className="max-w-3xl text-3xl font-semibold leading-tight text-field-paper transition group-hover:text-primary sm:text-5xl">
								<LocalizedPostTitle slug={featured.slug} title={featured.title} />
							</h2>
							<span className="field-arrow" aria-hidden="true">↗</span>
						</div>
						<p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
							<LocalizedPostSummary slug={featured.slug} summary={featured.summary} />
						</p>
						<div className="mt-6 flex flex-wrap gap-3">
							{featured.tags.map((tag) => (
								<span key={tag} className="border border-white/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate-400">
									<LocalizedTag tag={tag} />
								</span>
							))}
						</div>
					</Link>
				</section>

				<div className="space-y-16 py-14">
					{blogCategoryOrder.map((category) => {
						const copy = categoryCopy[category];
						const posts = grouped[category];
						if (posts.length === 0) return null;

						return (
							<section key={category} className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
								<header>
									<p className="field-meta text-accent">Section / {copy.index}</p>
									<h2 className="field-display mt-3 text-4xl font-semibold">
										<LocalizedText en={copy.titleEn} zh={copy.titleZh} />
									</h2>
									<p className="mt-4 text-sm leading-6 text-slate-400">
										<LocalizedText en={copy.bodyEn} zh={copy.bodyZh} />
									</p>
								</header>
								<div className="border-b border-white/15">
									{posts.map((post) => <ArticleRecord key={post.slug} post={post} />)}
								</div>
							</section>
						);
					})}
				</div>

				<footer className="site-footer border-t border-white/15">
					<LocalizedText en="End of index · New records added continuously" zh="索引结束 · 持续更新新记录" />
				</footer>
			</main>
		</div>
	);
}
