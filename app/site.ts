import { headers } from "next/headers";
import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zhejian-homepage.vercel.app";

export function getLanguage(): "en" | "zh" {
	return headers().get("x-site-language") === "zh" ? "zh" : "en";
}

export function siteMetadata(title: string, en: string, zh: string): Metadata {
	const language = getLanguage();
	const path = headers().get("x-site-path") || "/";
	const absolute = (locale: string) => new URL(`${path}?lang=${locale}`, siteUrl).toString();
	const description = language === "zh" ? zh : en;
	const images = [new URL("/opengraph-image", siteUrl).toString()];
	return {
		// Next 14 strips root query strings when resolving against metadataBase.
		// All URLs here are absolute; null preserves the localized homepage URL.
		metadataBase: path === "/" ? null : new URL(siteUrl),
		title,
		description,
		alternates: {
			canonical: absolute(language),
			languages: { en: absolute("en"), "zh-CN": absolute("zh"), "x-default": absolute("en") }
		},
		openGraph: { title, description, url: absolute(language), locale: language === "zh" ? "zh_CN" : "en_US", images },
		twitter: { card: "summary_large_image", title, description, images }
	};
}
