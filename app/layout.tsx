import type { Metadata } from "next";
import { LanguageProvider } from "./components/language";
import PageTransition from "./components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zhejian.dev"),
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
			<body className="min-h-screen bg-slate-900 text-white antialiased">
				<LanguageProvider>
					<PageTransition>{children}</PageTransition>
				</LanguageProvider>
			</body>
		</html>
	);
}
