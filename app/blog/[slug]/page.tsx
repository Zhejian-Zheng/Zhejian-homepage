import { getLanguage, siteMetadata } from "../../site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocalizedText } from "../../components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "../localizedPostText";
import { blogPosts, getBlogPost } from "../posts";
import { getBlogCategory } from "../categories";
import { categoryCopy } from "../category-copy";
import { getArticleReading } from "../article-meta";
import BlogLanguageSwitch from "../BlogLanguageSwitch";

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

	const title = getLanguage() === "zh" ? post.zh.title : post.title;
	const metadata = siteMetadata(`${title} · Zhejian Blog`, post.summary, post.zh.summary);
	return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.publishedAt } };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
	const post = getBlogPost(params.slug);

	if (!post) {
		notFound();
	}

	const language = getLanguage();
	const category = getBlogCategory(post.slug);
	const categoryLabels = categoryCopy[category];
	const categoryLabel = language === "zh" ? categoryLabels.titleZh : categoryLabels.titleEn;
	const reading = getArticleReading(post.slug, language);
	const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
	const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined;
	const nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : undefined;
	const Post = post.Component;
	const traceNumber = String(currentIndex + 1).padStart(3, "0");

	return (
		<div className="field-page article-page">
			<main id="main-content" tabIndex={-1} className="article-shell">
				<nav className="article-breadcrumb" aria-label={language === "zh" ? "文章导航" : "Article navigation"}>
					<Link href="/blog" className="article-back">
						<span aria-hidden="true">←</span>
						<LocalizedText en="All notes" zh="全部笔记" />
					</Link>
					<span className="article-trace">TRACE / {categoryLabels.code} / {traceNumber}</span>
				</nav>

				<header className="article-hero">
					<div className="article-hero__copy">
						<p className="article-kicker">
							<span className="article-kicker__dot" aria-hidden="true" />
							<LocalizedText en="Technical note" zh="技术笔记" />
							<span aria-hidden="true">/</span>
							<span>{reading.minutes} <LocalizedText en="min read" zh="分钟阅读" /></span>
						</p>
						<h1 className="article-title">
							<LocalizedPostTitle slug={post.slug} title={post.title} />
						</h1>
						<p className="article-summary">
							<LocalizedPostSummary slug={post.slug} summary={post.summary} />
						</p>
						<div className="article-meta-row">
							<div className="article-tags">
								{post.tags.map((tag) => (
									<span key={tag}><LocalizedTag tag={tag} /></span>
								))}
							</div>
							<BlogLanguageSwitch label={language === "zh" ? "阅读语言" : "READ IN"} />
						</div>
					</div>

					<aside className="article-spec" aria-label={language === "zh" ? "文章信息" : "Article details"}>
						<div className="article-spec__row">
							<span><LocalizedText en="Published" zh="发布日期" /></span>
							<strong><LocalizedDate date={post.publishedAt} /></strong>
						</div>
						<div className="article-spec__row">
							<span><LocalizedText en="Track" zh="方向" /></span>
							<strong>{categoryLabel}</strong>
						</div>
						<div className="article-spec__row">
							<span><LocalizedText en="Reading time" zh="阅读时间" /></span>
							<strong>{reading.minutes} <LocalizedText en="min" zh="分钟" /></strong>
						</div>
						<div className="article-spec__row">
							<span><LocalizedText en="Versions" zh="版本" /></span>
							<strong>EN + 中文</strong>
						</div>
						<div className="article-spec__source">
							<span className="article-spec__live"><i aria-hidden="true" />{categoryLabels.code}.LOG</span>
							<span>{traceNumber}</span>
						</div>
					</aside>
				</header>

				<div className="article-frame">
					<article className="article-body">
						{reading.toc.length > 0 ? (
							<details className="toc-mobile">
								<summary><LocalizedText en="In this note" zh="本篇目录" /></summary>
								<ol>
									{reading.toc.map((entry, index) => (
										<li key={entry.id}>
											<a href={`#${entry.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{entry.label}</a>
										</li>
									))}
								</ol>
							</details>
						) : null}

						<div className="prose-tech">
							<Post />
						</div>
					</article>

					<aside className="article-rail">
						{reading.toc.length > 0 ? (
							<nav className="article-toc" aria-label={language === "zh" ? "文章目录" : "Table of contents"}>
								<p className="rail-label"><span aria-hidden="true">{"//"}</span> <LocalizedText en="In this note" zh="本篇目录" /></p>
								<ol>
									{reading.toc.map((entry, index) => (
										<li key={entry.id}>
											<a href={`#${entry.id}`}>
												<span className="article-toc__index">{String(index + 1).padStart(2, "0")}</span>
												<span>{entry.label}</span>
											</a>
										</li>
									))}
								</ol>
							</nav>
						) : null}

						<div className="rail-note">
							<p className="rail-label"><span aria-hidden="true">{"//"}</span> <LocalizedText en="Bilingual note" zh="双语笔记" /></p>
							<p>
								<LocalizedText
									en="This note is published in English and Chinese. Switching language keeps you on the same article."
									zh="这篇笔记同时提供英文和中文版本。切换语言后会停留在当前文章。"
								/>
							</p>
						</div>

						<Link href="/blog" className="rail-back">
							<span aria-hidden="true">←</span>
							<LocalizedText en="Back to the index" zh="返回笔记索引" />
						</Link>
					</aside>
				</div>

				<nav className="article-pagination" aria-label={language === "zh" ? "上一篇和下一篇" : "Previous and next notes"}>
					{previousPost ? (
						<Link href={`/blog/${previousPost.slug}`} className="pagination-card pagination-card--prev group">
							<span className="pagination-card__label">← <LocalizedText en="Previous" zh="上一篇" /></span>
							<span className="pagination-card__title"><LocalizedPostTitle slug={previousPost.slug} title={previousPost.title} /></span>
						</Link>
					) : <span />}
					{nextPost ? (
						<Link href={`/blog/${nextPost.slug}`} className="pagination-card pagination-card--next group">
							<span className="pagination-card__label"><LocalizedText en="Next" zh="下一篇" /> →</span>
							<span className="pagination-card__title"><LocalizedPostTitle slug={nextPost.slug} title={nextPost.title} /></span>
						</Link>
					) : <span />}
				</nav>

				<footer className="article-footer">
					<span className="brand-monogram" aria-hidden="true">z.</span>
					<span><LocalizedText en="End of note" zh="笔记结束" /> · {traceNumber}</span>
					<Link href="/blog"><LocalizedText en="Back to all notes" zh="返回全部笔记" /> ↗</Link>
				</footer>
			</main>
		</div>
	);
}
