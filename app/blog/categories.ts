import { postInfo } from "./post-info";
export type BlogCategoryKey = "agents" | "systems" | "product" | "archive";
export const blogCategoryOrder: BlogCategoryKey[] = ["agents", "systems", "product", "archive"];
export function getBlogCategory(slug: string): BlogCategoryKey { return postInfo.find(post => post.slug === slug)?.category ?? "archive"; }
