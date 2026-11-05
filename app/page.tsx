import { siteMetadata } from "./site";
import type { Metadata } from "next";
import HomeClient, { type HomePostPreview } from "./home-client";
import { selectedBuildSlugs } from "./home-data";
import { blogPosts } from "./blog/posts";

export function generateMetadata(): Metadata { return siteMetadata("Zhejian Zheng \u2013 Software Engineer", "Recoverable agents, reliable backend systems, and clear product interfaces. Engineering notes by Zhejian Zheng.", "郑哲坚的工程实践：可恢复 Agent、可靠后端与清晰的产品界面。"); }

export default function Page() {
	const selectedBuildSet = new Set<string>(selectedBuildSlugs);
	const toPreview = ({ slug, title, summary, publishedAt, tags }: (typeof blogPosts)[number]): HomePostPreview => ({
		slug,
		title,
		summary,
		publishedAt,
		tags
	});
	const selectedBuilds = selectedBuildSlugs
		.map((slug) => blogPosts.find((post) => post.slug === slug))
		.filter((post): post is (typeof blogPosts)[number] => Boolean(post))
		.map(toPreview);
	const latestNotes = blogPosts.filter((post) => !selectedBuildSet.has(post.slug)).slice(0, 3).map(toPreview);

	return <HomeClient selectedBuilds={selectedBuilds} latestNotes={latestNotes} />;
}
