import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
	title: "Zhejian Zheng – Software Engineer",
	description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney. Passionate about full-stack development, data-driven solutions, web design, and human-computer interaction.",
	openGraph: {
		title: "Zhejian Zheng – Software Engineer",
		description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney. Passionate about full-stack development, data-driven solutions, web design, and human-computer interaction.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Zhejian Zheng – Software Engineer",
		description: "Personal homepage of Zhejian Zheng, Software Engineer & Developer based in Sydney.",
	},
};

export default function Page() {
	return <HomeClient />;
}
