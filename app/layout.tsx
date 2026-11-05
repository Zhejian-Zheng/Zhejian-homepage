import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { LanguageProvider } from "./components/language";
import PageTransition from "./components/PageTransition";
import SiteNav from "./components/SiteNav";
import { getLanguage, siteUrl } from "./site";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Zhejian Zheng – Software Engineer"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const language = getLanguage();
	return (
		<html lang={language === "zh" ? "zh-CN" : "en"}>
			<body className={`${GeistSans.variable} min-h-screen bg-field-ink text-field-paper antialiased`}>
				<a className="skip-link" href="#main-content">{language === "zh" ? "跳到主要内容" : "Skip to main content"}</a>
				<LanguageProvider initialLanguage={language}>
					<SiteNav />
					<PageTransition />
					{children}
				</LanguageProvider>
			</body>
		</html>
	);
}
