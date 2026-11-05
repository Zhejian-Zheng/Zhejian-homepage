import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "./components/language";
import PageTransition from "./components/PageTransition";
import SiteNav from "./components/SiteNav";
import { getLanguage, siteUrl } from "./site";
import "./globals.css";

const plex = IBM_Plex_Sans({
	subsets: ["latin"],
	variable: "--font-plex",
	weight: ["400", "500", "600"],
	display: "swap"
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
	weight: ["400", "500"],
	display: "swap"
});

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Zhejian Zheng · Software Engineer"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const language = getLanguage();
	return (
		<html lang={language === "zh" ? "zh-CN" : "en"}>
			<body className={`${GeistSans.variable} ${plex.variable} ${jetbrains.variable} min-h-screen bg-field-ink text-field-paper antialiased`}>
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
