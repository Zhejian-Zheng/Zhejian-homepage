import { siteMetadata } from "../site";
import type { Metadata } from "next";
import AboutContent from "./about-client";

export function generateMetadata(): Metadata { return siteMetadata("About · Zhejian Zheng", "From Ningbo to Sydney: the person behind recoverable agents and reliable systems.", "从宁波到悉尼：可恢复 Agent 与可靠系统背后的工程经历。"); }

export default function AboutPage() {
	return <AboutContent />;
}
