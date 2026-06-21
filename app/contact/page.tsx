import type { Metadata } from "next";
import ContactContent from "./content";

export const metadata: Metadata = {
	title: "Contact – Zhejian Zheng",
	description: "Get in touch with Zhejian Zheng for collaboration, projects, or just to say hi.",
	openGraph: {
		title: "Contact – Zhejian Zheng",
		description: "Get in touch with Zhejian Zheng for collaboration, projects, or just to say hi.",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Contact – Zhejian Zheng",
		description: "Get in touch with Zhejian Zheng for collaboration, projects, or just to say hi.",
	},
};

export default function ContactPage() {
	return <ContactContent />;
}
