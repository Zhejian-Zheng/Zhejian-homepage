import { siteMetadata } from "../site";
import type { Metadata } from "next";
import ContactContent from "./contact-client";

export function generateMetadata(): Metadata { return siteMetadata("Contact · Zhejian Zheng", "Let\u2019s build dependable agents and useful products together.", "一起构建可靠的 Agent 与实用的产品。"); }

export default function ContactPage() {
	return <ContactContent />;
}
