import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import { LocalizedText } from "../../components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "../localizedPostText";
import { blogPosts, getBlogPost } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.slug
	}));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const post = getBlogPost(params.slug);

	if (!post) {
		return {
			title: "Blog Post Not Found"
		};
	}

	return {
		title: `${post.title} – Zhejian Blog`,
		description: post.summary,
		openGraph: {
			title: post.title,
			description: post.summary,
			type: "article",
			publishedTime: post.publishedAt,
		},
		twitter: {
			card: "summary",
			title: `${post.title} – Zhejian Blog`,
			description: post.summary,
		},
	};
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
	const post = getBlogPost(params.slug);

	if (!post) {
		notFound();
	}

	const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
	const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined;
	const nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : undefined;
	const Post = post.Component;

	return (
		<div className="field-page">
			<SiteNav active="blog" />

			<div className="field-wrap">
				<Link
					href="/blog"
					className="field-meta inline-flex min-h-10 items-center border-b border-primary text-primary transition hover:border-accent hover:text-accent"
				>
					<LocalizedText en="Back to blog" zh="返回博客" />
				</Link>

				<div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
					<article className="min-w-0">
						<header className="field-panel border-l-2 border-l-accent p-6 sm:p-9">
							<div className="space-y-5">
								<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
									<span className="font-mono text-accent">
										<LocalizedText en="Technical Note" zh="技术笔记" />
									</span>
									<span>
										<LocalizedDate date={post.publishedAt} />
									</span>
								</div>
								<div className="space-y-4">
									<h1 className="field-display text-4xl font-semibold leading-[0.98] text-field-paper sm:text-6xl">
										<LocalizedPostTitle slug={post.slug} title={post.title} />
									</h1>
									<p className="max-w-3xl text-lg leading-8 text-slate-300">
										<LocalizedPostSummary slug={post.slug} summary={post.summary} />
									</p>
								</div>
								<div className="flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="border border-white/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate-400">
											<LocalizedTag tag={tag} />
										</span>
									))}
								</div>
							</div>
						</header>

						<div className="field-panel mt-6 px-6 py-8 text-slate-200 sm:px-9 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-sm [&_code]:border [&_code]:border-white/10 [&_code]:bg-field-ink [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mt-12 [&_h2]:border-l-2 [&_h2]:border-accent [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-field-paper [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_li::marker]:text-accent [&_p]:leading-8 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-field-ink [&_pre]:p-4 [&_ul]:space-y-3">
							<Post />
						</div>

						{previousPost || nextPost ? (
							<nav className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2">
								{previousPost ? (
									<Link
										href={`/blog/${previousPost.slug}`}
										className="bg-field-navy p-4 transition hover:bg-white/[0.05]"
									>
										<p className="text-xs uppercase tracking-[0.22em] text-slate-500">
											<LocalizedText en="Previous" zh="上一篇" />
										</p>
										<p className="mt-2 text-sm font-semibold leading-6 text-white">
											<LocalizedPostTitle slug={previousPost.slug} title={previousPost.title} />
										</p>
									</Link>
								) : (
									<div />
								)}
								{nextPost ? (
									<Link
										href={`/blog/${nextPost.slug}`}
										className="bg-field-navy p-4 text-left transition hover:bg-white/[0.05] sm:text-right"
									>
										<p className="text-xs uppercase tracking-[0.22em] text-slate-500">
											<LocalizedText en="Next" zh="下一篇" />
										</p>
										<p className="mt-2 text-sm font-semibold leading-6 text-white">
											<LocalizedPostTitle slug={nextPost.slug} title={nextPost.title} />
										</p>
									</Link>
								) : null}
							</nav>
						) : null}
					</article>

					<aside className="lg:sticky lg:top-24 lg:self-start">
						<div className="field-panel border-t-2 border-t-secondary p-5">
							<p className="field-meta text-secondary">
								<LocalizedText en="Article Notes" zh="文章信息" />
							</p>
							<div className="mt-5 space-y-5 text-sm text-slate-300">
								<div>
									<p className="text-slate-500">
										<LocalizedText en="Published" zh="发布日期" />
									</p>
									<p className="mt-1 text-white">
										<LocalizedDate date={post.publishedAt} />
									</p>
								</div>
								<div>
									<p className="text-slate-500">
										<LocalizedText en="Topics" zh="主题" />
									</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<span key={tag} className="border border-white/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
												<LocalizedTag tag={tag} />
											</span>
										))}
									</div>
								</div>
								<div className="border-t border-white/10 pt-5">
									<p className="leading-6">
										<LocalizedText
											en="Written as a concise project note: architecture, implementation choices, and reusable technical knowledge."
											zh="以简洁的项目笔记形式记录架构、实现选择和可复用的技术知识。"
										/>
									</p>
								</div>
								<Link href="/blog" className="inline-flex text-sm font-semibold text-primary transition hover:text-accent">
									<LocalizedText en="Browse all notes" zh="浏览全部笔记" />
								</Link>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
