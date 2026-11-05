import { getLanguage, siteMetadata } from "../site";
import type { Metadata } from "next";
import Link from "next/link";
import { LocalizedText } from "../components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "./localizedPostText";
import { blogCategoryOrder, getBlogCategory, type BlogCategoryKey } from "./categories";
import { categoryCopy } from "./category-copy";
import { blogPosts, type BlogPost } from "./posts";
import BlogLanguageSwitch from "./BlogLanguageSwitch";

export function generateMetadata(): Metadata {
	return siteMetadata(
		"Notes · Zhejian Zheng",
		"Engineering notes on agents, recovery, memory, systems, and product decisions. Every note is published in English and Chinese.",
		"关于 Agent、恢复机制、记忆、系统与产品决策的工程笔记。每篇笔记都有英文和中文两个版本。"
	);
}

type TrackStat = {
	key: BlogCategoryKey;
	count: number;
};

function Arrow() {
	return <span className="blog-arrow" aria-hidden="true">↗</span>;
}

function ArticleRecord({ post, index }: { post: BlogPost; index: number }) {
	return (
		<Link href={`/blog/${post.slug}`} className="note-record group">
			<span className="note-record__index font-mono" aria-hidden="true">{String(index).padStart(2, "0")}</span>
			<div className="note-record__body">
				<div className="note-record__meta">
					<LocalizedDate date={post.publishedAt} />
					<span className="note-record__sep" aria-hidden="true">/</span>
					<span className="note-record__tags">
						{post.tags.slice(0, 3).map((tag, tagIndex) => (
							<span key={tag}>
								<LocalizedTag tag={tag} />
								{tagIndex < Math.min(post.tags.length, 3) - 1 ? <span aria-hidden="true"> · </span> : null}
							</span>
						))}
					</span>
				</div>
				<h4 className="note-record__title">
					<LocalizedPostTitle slug={post.slug} title={post.title} />
				</h4>
				<p className="note-record__summary">
					<LocalizedPostSummary slug={post.slug} summary={post.summary} />
				</p>
			</div>
			<span className="note-record__action" aria-hidden="true">
				<span className="note-record__open"><LocalizedText en="Open" zh="阅读" /></span>
				<Arrow />
			</span>
		</Link>
	);
}

export default function BlogPage() {
	const language = getLanguage();
	const featured = blogPosts.find(post => post.slug === "sidecar-gui-agent-harness") ?? blogPosts[0];
	const remaining = blogPosts.filter(post => post.slug !== featured.slug);
	const grouped = Object.fromEntries(
		blogCategoryOrder.map((category) => [category, remaining.filter((post) => getBlogCategory(post.slug) === category)])
	) as Record<BlogCategoryKey, BlogPost[]>;
	const tracks: TrackStat[] = blogCategoryOrder.map((key) => ({
		key,
		count: blogPosts.filter(post => getBlogCategory(post.slug) === key).length
	}));
	const maxCount = Math.max(...tracks.map(track => track.count));
	const latest = blogPosts[0];
	const featuredCategory = categoryCopy[getBlogCategory(featured.slug)];

	return (
		<div className="field-page blog-page">
			<main id="main-content" tabIndex={-1} className="blog-shell">
				<section className="blog-hero" aria-labelledby="blog-title">
					<div className="blog-hero__inner">
						<div className="blog-hero__copy">
							<div className="blog-eyebrow">
								<span className="blog-status"><i aria-hidden="true" /><LocalizedText en="Notebook online" zh="笔记系统在线" /></span>
								<span aria-hidden="true">/</span>
								<span>2024-2026</span>
								<span aria-hidden="true">/</span>
								<span>EN + 中文</span>
							</div>
							<h1 id="blog-title" className="blog-title">
								<LocalizedText en="Engineering" zh="工程" />
								<span><LocalizedText en="field notes" zh="现场笔记" /><i aria-hidden="true">.</i></span>
							</h1>
							<p className="blog-lead">
								<LocalizedText
									en="Source-level write-ups on agent runtimes, recovery, databases, and the product decisions that connect them. Every note is available in English and Chinese."
									zh="从源码出发，记录 Agent 运行时、恢复机制、数据库，以及把技术决策落成产品时遇到的问题。每篇笔记都有英文和中文两个版本。"
								/>
							</p>
							<div className="blog-hero__actions">
								<a href="#note-index" className="blog-btn">
									<LocalizedText en="Read the index" zh="翻阅笔记索引" />
									<Arrow />
								</a>
								<BlogLanguageSwitch label="LANG" />
							</div>
							<dl className="blog-facts" aria-label={language === "zh" ? "笔记数据" : "Notebook facts"}>
								<div><dt>{String(blogPosts.length).padStart(2, "0")}</dt><dd><LocalizedText en="notes" zh="篇笔记" /></dd></div>
								<div><dt>04</dt><dd><LocalizedText en="tracks" zh="个方向" /></dd></div>
								<div><dt>02</dt><dd><LocalizedText en="languages" zh="种语言" /></dd></div>
							</dl>
						</div>

						<aside className="index-console" aria-label={language === "zh" ? "笔记索引状态" : "Notebook index status"}>
							<div className="console-bar">
								<span className="console-bar__title"><i aria-hidden="true" />INDEX.SYS</span>
								<span>{blogPosts.length} RECORDS</span>
							</div>
							<div className="console-screen">
								<div className="console-screen__head">
									<span>TRACK</span>
									<span>NOTES</span>
									<span className="console-screen__sync">SYNCED</span>
								</div>
								<div className="console-tracks">
									{tracks.map((track) => {
										const copy = categoryCopy[track.key];
										return (
											<div className="console-track" key={track.key}>
												<span className="console-track__code">{copy.code}</span>
												<span className="console-track__name"><LocalizedText en={copy.titleEn} zh={copy.titleZh} /></span>
												<span className="console-track__count">{String(track.count).padStart(2, "0")}</span>
												<span className="console-track__bar" aria-hidden="true">
													<span style={{ width: `${Math.max(12, (track.count / maxCount) * 100)}%` }} />
												</span>
											</div>
										);
									})}
								</div>
								<div className="console-latest">
									<span className="console-latest__label">LATEST</span>
									<span className="console-latest__value"><LocalizedPostTitle slug={latest.slug} title={latest.title} /></span>
								</div>
							</div>
							<div className="console-foot">
								<span><LocalizedText en="English + Chinese" zh="英文 + 中文" /></span>
								<span className="console-foot__live"><i aria-hidden="true" />LIVE</span>
							</div>
						</aside>
					</div>
					<a className="blog-scroll-cue" href="#featured" aria-label={language === "zh" ? "查看本期重点" : "Jump to the featured note"}>
						<span><LocalizedText en="Scroll to featured" zh="查看本期重点" /></span>
						<span aria-hidden="true">↓</span>
					</a>
				</section>

				<section id="featured" className="featured-section" aria-labelledby="featured-title">
					<header className="section-rule">
						<span className="section-rule__index">01</span>
						<span className="section-rule__label"><LocalizedText en="In focus" zh="本期重点" /></span>
						<span className="section-rule__line" aria-hidden="true" />
						<span className="section-rule__code">{featuredCategory.code} / FEATURED</span>
					</header>
					<Link href={`/blog/${featured.slug}`} className="featured-card group">
						<div className="featured-card__copy">
							<p className="featured-card__kicker">
								<span className="featured-card__dot" aria-hidden="true" />
								<LocalizedText en="Sidecar · agent infrastructure" zh="Sidecar · Agent 基础设施" />
							</p>
							<h2 id="featured-title">
								<LocalizedPostTitle slug={featured.slug} title={featured.title} />
							</h2>
							<p className="featured-card__summary">
								<LocalizedPostSummary slug={featured.slug} summary={featured.summary} />
							</p>
							<div className="featured-card__tags">
								{featured.tags.map(tag => (
									<span key={tag}><LocalizedTag tag={tag} /></span>
								))}
							</div>
							<span className="featured-card__cta">
								<LocalizedText en="Read the note" zh="阅读这篇笔记" />
								<Arrow />
							</span>
						</div>
						<div className="featured-card__side" aria-hidden="true">
							<span className="featured-card__number">01</span>
							<span className="featured-card__route">OBSERVE<br />DECIDE<br />ACT<br />VERIFY</span>
							<span className="featured-card__year">2026</span>
						</div>
					</Link>
				</section>

				<section id="note-index" className="note-index" aria-labelledby="index-title">
					<header className="index-head">
						<div>
							<p className="index-kicker"><span aria-hidden="true">{"//"}</span> <LocalizedText en="The index" zh="笔记索引" /></p>
							<h2 id="index-title"><LocalizedText en={`All ${blogPosts.length} notes`} zh={`全部 ${blogPosts.length} 篇笔记`} /></h2>
						</div>
						<p className="index-head__intro">
							<LocalizedText
								en="Filter by track or read straight through. Every entry opens the full bilingual article."
								zh="可以按方向浏览，也可以从头读到尾。每个条目都会打开完整的中英双语文章。"
							/>
						</p>
						<nav className="index-jump" aria-label={language === "zh" ? "跳到某个方向" : "Jump to a track"}>
							{blogCategoryOrder.map((category) => {
								const copy = categoryCopy[category];
								const count = grouped[category].length + (getBlogCategory(featured.slug) === category ? 1 : 0);
								return (
									<a key={category} href={`#category-${category}`}>
										<span className="index-jump__code">{copy.code}</span>
										<span><LocalizedText en={copy.titleEn} zh={copy.titleZh} /></span>
										<span className="index-jump__count">{String(count).padStart(2, "0")}</span>
									</a>
								);
							})}
						</nav>
					</header>

					<div className="category-stack">
						{blogCategoryOrder.map((category) => {
							const copy = categoryCopy[category];
							const posts = grouped[category];
							if (posts.length === 0) return null;

							return (
								<section id={`category-${category}`} key={category} className="category-block" aria-labelledby={`category-title-${category}`}>
									<header className="category-head">
										<div className="category-head__top">
											<span className="category-head__code">{copy.code} / {copy.index}</span>
											<span className="category-head__count">{String(posts.length).padStart(2, "0")} <LocalizedText en="notes" zh="篇" /></span>
										</div>
										<h3 id={`category-title-${category}`}><LocalizedText en={copy.titleEn} zh={copy.titleZh} /></h3>
										<p><LocalizedText en={copy.bodyEn} zh={copy.bodyZh} /></p>
									</header>
									<div className="note-list">
										{posts.map((post, index) => <ArticleRecord key={post.slug} post={post} index={index + 1} />)}
									</div>
								</section>
							);
						})}
					</div>
				</section>

				<footer className="blog-footer">
					<div className="blog-footer__mark">
						<span className="brand-monogram" aria-hidden="true">z.</span>
						<p><LocalizedText en="Notes end here. New entries go in when a project ships." zh="索引到这里。项目上线后，会继续补上新的记录。" /></p>
					</div>
					<div className="blog-footer__links">
						<Link href="/"><LocalizedText en="Home" zh="首页" /></Link>
						<Link href="/about"><LocalizedText en="About" zh="关于" /></Link>
						<Link href="/contact"><LocalizedText en="Contact" zh="联系" /></Link>
						<span className="blog-footer__year">2026</span>
					</div>
				</footer>
			</main>
		</div>
	);
}
