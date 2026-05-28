"use client";

import Link from "next/link";
import { LanguageToggle, useLanguage } from "./language";

type NavKey = "home" | "about" | "blog" | "contact";

const navCopy = {
	en: {
		brand: "Homepage",
		about: "About",
		blog: "Blog",
		contact: "Contact"
	},
	zh: {
		brand: "主页",
		about: "关于",
		blog: "博客",
		contact: "联系"
	}
} as const;

const navItems: Array<{ key: Exclude<NavKey, "home">; href: string }> = [
	{ key: "about", href: "/about" },
	{ key: "blog", href: "/blog" },
	{ key: "contact", href: "/contact" }
];

export default function SiteNav({ active, children }: { active: NavKey; children?: React.ReactNode }) {
	const { language } = useLanguage();
	const copy = navCopy[language];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
				<Link href="/" className="font-bold text-lg hover:text-primary transition sm:text-xl">
					{copy.brand}
				</Link>
				<div className="flex items-center gap-1 sm:gap-4">
					{navItems.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							className={`rounded-lg px-2 py-2 text-sm transition hover:text-white sm:px-3 sm:text-base ${
								active === item.key ? "bg-white/10 text-white" : "text-white/90"
							}`}
						>
							{copy[item.key]}
						</Link>
					))}
					<LanguageToggle />
					{children}
				</div>
			</div>
		</nav>
	);
}
