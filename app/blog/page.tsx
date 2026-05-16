import Link from "next/link";
import { blogPosts } from "./posts";

const dateFormatter = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
	year: "numeric"
});

export default function BlogPage() {
	const featuredPost = blogPosts[0];
	const remainingPosts = blogPosts.slice(1);
	const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).slice(0, 14);

	return (
		<div className="min-h-screen bg-slate-950 text-white px-4 pb-16 pt-24">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-lg hover:text-primary transition sm:text-xl">
						Homepage
					</Link>
					<div className="flex items-center gap-1 sm:gap-4">
						<Link href="/about" className="rounded-lg px-2 py-2 text-sm text-white/90 transition hover:text-white sm:px-3 sm:text-base">
							About
						</Link>
						<Link href="/blog" className="rounded-lg bg-white/10 px-2 py-2 text-sm text-white transition hover:text-white sm:px-3 sm:text-base">
							Blog
						</Link>
						<Link href="/contact" className="rounded-lg px-2 py-2 text-sm text-white/90 transition hover:text-white sm:px-3 sm:text-base">
							Contact
						</Link>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-6xl space-y-12">
				<header className="relative overflow-hidden border-b border-white/10 pb-10">
					<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-secondary to-accent" />
					<div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
						<div className="space-y-5">
							<p className="text-sm uppercase tracking-[0.3em] text-primary">Build Log</p>
							<div className="space-y-4">
								<h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
									Blogs
								</h1>
								<p className="max-w-2xl text-lg leading-8 text-slate-200">
									Short technical writeups about full-stack systems, data workflows, web design, human-computer interaction, and the decisions behind my public repositories.
								</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3 text-center lg:grid-cols-1 lg:text-left">
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">{blogPosts.length}</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Posts</p>
							</div>
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">{allTags.length}</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Topics</p>
							</div>
							<div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
								<p className="text-2xl font-bold text-white">MDX</p>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Format</p>
							</div>
						</div>
					</div>
				</header>

				{featuredPost ? (
					<section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
						<article className="relative overflow-hidden rounded-lg border border-primary/40 bg-slate-900/90 p-6 shadow-2xl shadow-primary/10">
							<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
							<div className="space-y-5 pt-2">
								<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
									<span className="text-primary">Featured</span>
									<span>{dateFormatter.format(new Date(featuredPost.publishedAt))}</span>
								</div>
								<div className="space-y-3">
									<h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
										{featuredPost.title}
									</h2>
									<p className="max-w-3xl text-base leading-8 text-slate-200">{featuredPost.summary}</p>
								</div>
								<div className="flex flex-wrap gap-3">
									{featuredPost.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
											{tag}
										</span>
									))}
								</div>
								<Link
									href={`/blog/${featuredPost.slug}`}
									className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/85"
								>
									Read featured note
								</Link>
							</div>
						</article>

						<div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
							<p className="text-sm uppercase tracking-[0.3em] text-slate-400">Writing System</p>
							<div className="mt-5 space-y-5 text-sm leading-7 text-slate-200">
								<p>
									Each article is written from real code: architecture, implementation decisions, and reusable technical lessons.
								</p>
								<div className="grid gap-3">
									<div className="border-l-2 border-primary pl-4">
										<p className="font-semibold text-white">Code first</p>
										<p className="text-slate-400">Notes are grounded in repository structure and actual implementation.</p>
									</div>
									<div className="border-l-2 border-secondary pl-4">
										<p className="font-semibold text-white">Knowledge focused</p>
										<p className="text-slate-400">Every post has practical concepts that can transfer to new projects.</p>
									</div>
									<div className="border-l-2 border-accent pl-4">
										<p className="font-semibold text-white">Portfolio ready</p>
										<p className="text-slate-400">The blog explains not only what was built, but why it was designed that way.</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				) : null}

				<section className="space-y-5">
					<div className="flex items-end justify-between gap-4">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-slate-400">Project Writeups</p>
							<h2 className="mt-2 text-3xl font-semibold text-white">Technical case notes</h2>
						</div>
						<span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300 sm:inline-flex">
							{remainingPosts.length} more
						</span>
					</div>

					<div className="grid gap-4 lg:grid-cols-2">
						{remainingPosts.map((post) => {
						return (
							<article
								key={post.slug}
								className="group rounded-lg border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-slate-900"
							>
								<div className="space-y-4">
									<div className="flex items-start justify-between gap-4">
										<p className="text-xs uppercase tracking-[0.25em] text-slate-400">
											{dateFormatter.format(new Date(post.publishedAt))}
										</p>
										<span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_20px_rgba(102,126,234,0.8)]" />
									</div>
									<div className="space-y-3">
										<h3 className="text-2xl font-semibold leading-snug text-white group-hover:text-primary transition">
											{post.title}
										</h3>
										<p className="text-sm leading-7 text-slate-300">{post.summary}</p>
									</div>
								</div>
								<div className="mt-5 flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
											{tag}
										</span>
									))}
								</div>
								<Link
									href={`/blog/${post.slug}`}
									className="mt-5 inline-flex rounded-lg border border-primary/40 bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-primary/85 hover:shadow-primary/30"
								>
									Read note
								</Link>
							</article>
						);
						})}
					</div>
				</section>

				<footer className="border-t border-white/10 pt-8 text-sm text-slate-400">
					Thanks for reading. You can visit my{" "}
					<a
						href="https://github.com/Zhejian-Zheng"
						target="_blank"
						rel="noreferrer"
						className="text-primary hover:text-primary/80 underline underline-offset-4"
					>
						GitHub
					</a>{" "}
					to explore my code and projects.
				</footer>
			</div>
		</div>
	);
}
