import type { Metadata } from "next";
import AboutContent from "./content";

export const metadata: Metadata = {
	title: "About – Zhejian Zheng",
	description: "Learn about Zhejian Zheng, a full-stack developer based in Sydney, Australia. Originally from Ningbo, China, graduated from UNSW with distinction.",
	openGraph: {
		title: "About – Zhejian Zheng",
		description: "Learn about Zhejian Zheng, a full-stack developer based in Sydney, Australia. Originally from Ningbo, China, graduated from UNSW with distinction.",
		type: "profile",
	},
	twitter: {
		card: "summary",
		title: "About – Zhejian Zheng",
		description: "Learn about Zhejian Zheng, a full-stack developer based in Sydney, Australia.",
	},
};

export default function AboutPage() {
	return <AboutContent />;
}
