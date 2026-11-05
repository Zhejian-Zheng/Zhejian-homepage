declare module "*.css";

declare module "*.mdx" {
	import type { ComponentType } from "react";

	export const metadata: {
		title: string;
		summary: string;
		publishedAt: string;
		tags: string[];
		category: "agents" | "systems" | "product" | "archive";
		zh: {
			title: string;
			summary: string;
		};
	};

	const MDXComponent: ComponentType;
	export default MDXComponent;
}
