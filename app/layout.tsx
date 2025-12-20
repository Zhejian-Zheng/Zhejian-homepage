import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Zhejian - Personal Homepage",
	description: "Software Engineer & Developer passionate about programming and user experience design."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gradient-hero text-white antialiased">{children}</body>
		</html>
	);
}


