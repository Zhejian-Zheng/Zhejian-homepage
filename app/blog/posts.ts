import type { ComponentType } from "react";
import BalatroRustScoringEngine, { metadata as balatroRustScoringEngineMetadata } from "@/content/blog/balatro-rust-scoring-engine.mdx";
import BuildingMyPersonalPage, { metadata as buildingMyPersonalPageMetadata } from "@/content/blog/building-my-personal-page.mdx";
import GithubPagesToNextPortfolio, { metadata as githubPagesToNextPortfolioMetadata } from "@/content/blog/github-pages-to-next-portfolio.mdx";
import LegalYouthPrototypeWeb, { metadata as legalYouthPrototypeWebMetadata } from "@/content/blog/legal-youth-prototype-web.mdx";
import MagicChessVueRulesEngine, { metadata as magicChessVueRulesEngineMetadata } from "@/content/blog/magic-chess-vue-rules-engine.mdx";
import PythonAutomationS3MongoDB, { metadata as pythonAutomationS3MongoDBMetadata } from "@/content/blog/python-automation-s3-mongodb.mdx";
import PythonAutomationProjects, { metadata as pythonAutomationProjectsMetadata } from "@/content/blog/python-automation-projects.mdx";
import RepoLicenseInfoNotes, { metadata as repoLicenseInfoNotesMetadata } from "@/content/blog/repo-license-info-notes.mdx";
import SafeRlSupervisedShield, { metadata as safeRlSupervisedShieldMetadata } from "@/content/blog/safe-rl-supervised-shield.mdx";
import ShellScriptAutomarkingSystem, { metadata as shellScriptAutomarkingSystemMetadata } from "@/content/blog/shell-script-automarking-system.mdx";
import SolanaOrderFlowEventDrivenEscrow, { metadata as solanaOrderFlowEventDrivenEscrowMetadata } from "@/content/blog/solana-orderflow-event-driven-escrow.mdx";
import TcpUdpSimulator, { metadata as tcpUdpSimulatorMetadata } from "@/content/blog/tcp-udp-simulator.mdx";

export type BlogPost = {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	tags: string[];
	Component: ComponentType;
};

export const blogPosts: BlogPost[] = [
	{
		slug: "solana-orderflow-event-driven-escrow",
		...solanaOrderFlowEventDrivenEscrowMetadata,
		Component: SolanaOrderFlowEventDrivenEscrow
	},
	{
		slug: "safe-rl-supervised-shield",
		...safeRlSupervisedShieldMetadata,
		Component: SafeRlSupervisedShield
	},
	{
		slug: "legal-youth-prototype-web",
		...legalYouthPrototypeWebMetadata,
		Component: LegalYouthPrototypeWeb
	},
	{
		slug: "magic-chess-vue-rules-engine",
		...magicChessVueRulesEngineMetadata,
		Component: MagicChessVueRulesEngine
	},
	{
		slug: "balatro-rust-scoring-engine",
		...balatroRustScoringEngineMetadata,
		Component: BalatroRustScoringEngine
	},
	{
		slug: "tcp-udp-simulator",
		...tcpUdpSimulatorMetadata,
		Component: TcpUdpSimulator
	},
	{
		slug: "shell-script-automarking-system",
		...shellScriptAutomarkingSystemMetadata,
		Component: ShellScriptAutomarkingSystem
	},
	{
		slug: "repo-license-info-notes",
		...repoLicenseInfoNotesMetadata,
		Component: RepoLicenseInfoNotes
	},
	{
		slug: "github-pages-to-next-portfolio",
		...githubPagesToNextPortfolioMetadata,
		Component: GithubPagesToNextPortfolio
	},
	{
		slug: "python-automation-s3-mongodb",
		...pythonAutomationS3MongoDBMetadata,
		Component: PythonAutomationS3MongoDB
	},
	{
		slug: "python-automation-projects",
		...pythonAutomationProjectsMetadata,
		Component: PythonAutomationProjects
	},
	{
		slug: "building-my-personal-page",
		...buildingMyPersonalPageMetadata,
		Component: BuildingMyPersonalPage
	}
];

export function getBlogPost(slug: string) {
	return blogPosts.find((post) => post.slug === slug);
}
