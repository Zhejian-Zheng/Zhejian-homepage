import type { Metadata } from "next";
import { Barlow_Condensed, Noto_Sans_SC } from "next/font/google";
import { LanguageProvider } from "./components/language";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const displayFont = Barlow_Condensed({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-display"
});

const bodyFont = Noto_Sans_SC({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-body"
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kzheng.asia"),
	title: "Zhejian Zheng – Software Engineer",
	description: "Software Engineer & Developer passionate about full-stack development, data-driven solutions, web design, and human-computer interaction.",
	openGraph: {
		type: "website",
		siteName: "Zhejian Zheng",
		locale: "en_US",
	},
	twitter: {
		card: "summary",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-field-ink text-field-paper antialiased`}>
				<LanguageProvider>
					<PageTransition>{children}</PageTransition>
				</LanguageProvider>
			</body>
		</html>
	);
}
