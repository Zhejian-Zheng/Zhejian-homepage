"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageToggle, useLanguage } from "./language";

type NavKey = "home" | "about" | "blog" | "contact";

const navCopy = {
	en: {
		brand: "ZHEJIAN / FIELD NOTES",
		shortBrand: "ZZ / FIELD NOTES",
		about: "About",
		blog: "Blog",
		contact: "Contact",
		openMenu: "Open navigation",
		closeMenu: "Close navigation"
	},
	zh: {
		brand: "郑哲坚 / 工程现场笔记",
		shortBrand: "ZZ / 现场笔记",
		about: "关于",
		blog: "博客",
		contact: "联系",
		openMenu: "打开导航",
		closeMenu: "关闭导航"
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
	const [menuOpen, setMenuOpen] = useState(false);
	const closeMenu = () => setMenuOpen(false);

	return (
		<nav className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-field-ink/95 backdrop-blur-lg">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
				<Link href="/" onClick={closeMenu} className="field-display text-base font-semibold text-field-paper transition hover:text-accent sm:text-lg">
					<span className="hidden sm:inline">{copy.brand}</span>
					<span className="sm:hidden">{copy.shortBrand}</span>
				</Link>

				<div className="flex items-center gap-2">
					<div className="hidden items-center gap-1 md:flex">
						{navItems.map((item) => (
							<Link
								key={item.key}
								href={item.href}
								aria-current={active === item.key ? "page" : undefined}
								className={`min-h-10 border-b px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition ${
									active === item.key
										? "border-accent text-field-paper"
										: "border-transparent text-slate-400 hover:border-primary hover:text-field-paper"
								}`}
							>
								{copy[item.key]}
							</Link>
						))}
					</div>
					<LanguageToggle />
					{children}
					<button
						type="button"
						className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-field-paper transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
						onClick={() => setMenuOpen((open) => !open)}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
					>
						<span className="sr-only">{menuOpen ? copy.closeMenu : copy.openMenu}</span>
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
							{menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
						</svg>
					</button>
				</div>
			</div>

			<div
				id="mobile-navigation"
				className={`border-t border-white/10 bg-field-navy px-4 transition-[max-height,opacity] duration-200 md:hidden ${
					menuOpen ? "max-h-64 opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0"
				}`}
			>
				<div className="mx-auto grid max-w-6xl py-2">
					{navItems.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							onClick={closeMenu}
							aria-current={active === item.key ? "page" : undefined}
							className={`flex min-h-12 items-center justify-between border-b border-white/10 font-mono text-xs uppercase tracking-[0.16em] ${
								active === item.key ? "text-accent" : "text-slate-300"
							}`}
						>
							{copy[item.key]}
							<span aria-hidden="true">↗</span>
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
