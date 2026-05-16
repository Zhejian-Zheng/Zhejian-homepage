import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../posts";

const dateFormatter = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
	year: "numeric"
});

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
		title: `${post.title} - Zhejian Blog`,
		description: post.summary
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

			<div className="mx-auto max-w-6xl">
				<Link
					href="/blog"
					className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition hover:border-primary/60 hover:bg-primary/15"
				>
					Back to blog
				</Link>

				<div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
					<article className="min-w-0">
						<header className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
							<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
							<div className="space-y-5 pt-2">
								<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-400">
									<span className="text-primary">Technical Note</span>
									<span>{dateFormatter.format(new Date(post.publishedAt))}</span>
									<span>MDX</span>
								</div>
								<div className="space-y-4">
									<h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{post.title}</h1>
									<p className="max-w-3xl text-lg leading-8 text-slate-200">{post.summary}</p>
								</div>
								<div className="flex flex-wrap gap-3">
									{post.tags.map((tag) => (
										<span key={tag} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-slate-200">
											{tag}
										</span>
									))}
								</div>
							</div>
						</header>

						<div className="mt-8 rounded-lg border border-white/10 bg-slate-900/70 px-6 py-8 text-slate-100 shadow-xl shadow-black/20 sm:px-8 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:border [&_code]:border-white/10 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mt-12 [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_li::marker]:text-primary [&_p]:leading-8 [&_p]:text-slate-200 [&_ul]:space-y-3">
							<Post />
						</div>

						{previousPost || nextPost ? (
							<nav className="mt-8 grid gap-4 sm:grid-cols-2">
								{previousPost ? (
									<Link
										href={`/blog/${previousPost.slug}`}
										className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-primary/50 hover:bg-white/[0.07]"
									>
										<p className="text-xs uppercase tracking-[0.22em] text-slate-500">Previous</p>
										<p className="mt-2 text-sm font-semibold leading-6 text-white">{previousPost.title}</p>
									</Link>
								) : (
									<div />
								)}
								{nextPost ? (
									<Link
										href={`/blog/${nextPost.slug}`}
										className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-primary/50 hover:bg-white/[0.07] sm:text-right"
									>
										<p className="text-xs uppercase tracking-[0.22em] text-slate-500">Next</p>
										<p className="mt-2 text-sm font-semibold leading-6 text-white">{nextPost.title}</p>
									</Link>
								) : null}
							</nav>
						) : null}
					</article>

					<aside className="lg:sticky lg:top-24 lg:self-start">
						<div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
							<p className="text-xs uppercase tracking-[0.3em] text-primary">Article Notes</p>
							<div className="mt-5 space-y-5 text-sm text-slate-300">
								<div>
									<p className="text-slate-500">Published</p>
									<p className="mt-1 text-white">{dateFormatter.format(new Date(post.publishedAt))}</p>
								</div>
								<div>
									<p className="text-slate-500">Topics</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs">
												{tag}
											</span>
										))}
									</div>
								</div>
								<div className="border-t border-white/10 pt-5">
									<p className="leading-6">
										Written as a concise project note: architecture, implementation choices, and reusable technical knowledge.
									</p>
								</div>
								<Link href="/blog" className="inline-flex text-sm font-semibold text-primary transition hover:text-accent">
									Browse all notes
								</Link>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
