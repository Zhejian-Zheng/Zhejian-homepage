import type { Metadata } from "next";
import HomeClient, { type HomePostPreview } from "./home-client";
import { selectedBuildSlugs } from "./home-data";
import { blogPosts } from "./blog/posts";

export const metadata: Metadata = {
	title: "Zhejian Zheng – Software Engineer",
	description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney. Passionate about full-stack development, data-driven solutions, web design, and human-computer interaction.",
	openGraph: {
		title: "Zhejian Zheng – Software Engineer",
		description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney. Passionate about full-stack development, data-driven solutions, web design, and human-computer interaction.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Zhejian Zheng – Software Engineer",
		description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney.",
	},
};

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
