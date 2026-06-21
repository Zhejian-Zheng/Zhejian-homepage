import type { ComponentType } from "react";
import BalatroRustScoringEngine, { metadata as balatroRustScoringEngineMetadata } from "@/content/blog/balatro-rust-scoring-engine.mdx";
import BuildingMyPersonalPage, { metadata as buildingMyPersonalPageMetadata } from "@/content/blog/building-my-personal-page.mdx";
import CodeWithCodex, { metadata as codeWithCodexMetadata } from "@/content/blog/code-with-codex.mdx";
import GithubPagesToNextPortfolio, { metadata as githubPagesToNextPortfolioMetadata } from "@/content/blog/github-pages-to-next-portfolio.mdx";
import GithubRepoReviewAgent, { metadata as githubRepoReviewAgentMetadata } from "@/content/blog/github-repo-review-agent.mdx";
import LeetcodeAlgorithmNotes, { metadata as leetcodeAlgorithmNotesMetadata } from "@/content/blog/leetcode-algorithm-notes.mdx";
import LegalYouthPrototypeWeb, { metadata as legalYouthPrototypeWebMetadata } from "@/content/blog/legal-youth-prototype-web.mdx";
import MagicChessVueRulesEngine, { metadata as magicChessVueRulesEngineMetadata } from "@/content/blog/magic-chess-vue-rules-engine.mdx";
import MongodbPostgresqlPracticalTakeaways, { metadata as mongodbPostgresqlPracticalTakeawaysMetadata } from "@/content/blog/mongodb-postgresql-practical-takeaways.mdx";
import PilatesHealthQuizProgressRecovery, { metadata as pilatesHealthQuizProgressRecoveryMetadata } from "@/content/blog/pilates-health-quiz-progress-recovery.mdx";
import PythonAutomationProjects, { metadata as pythonAutomationProjectsMetadata } from "@/content/blog/python-automation-projects.mdx";
import PythonAutomationS3Mongodb, { metadata as pythonAutomationS3MongodbMetadata } from "@/content/blog/python-automation-s3-mongodb.mdx";
import RepoLicenseInfoNotes, { metadata as repoLicenseInfoNotesMetadata } from "@/content/blog/repo-license-info-notes.mdx";
import ResumeLatexSystem, { metadata as resumeLatexSystemMetadata } from "@/content/blog/resume-latex-system.mdx";
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
		slug: "code-with-codex",
		...codeWithCodexMetadata,
		Component: CodeWithCodex
	},
	{
		slug: "github-repo-review-agent",
		...githubRepoReviewAgentMetadata,
		Component: GithubRepoReviewAgent
	},
	{
		slug: "pilates-health-quiz-progress-recovery",
		...pilatesHealthQuizProgressRecoveryMetadata,
		Component: PilatesHealthQuizProgressRecovery
	},
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
		slug: "mongodb-postgresql-practical-takeaways",
		...mongodbPostgresqlPracticalTakeawaysMetadata,
		Component: MongodbPostgresqlPracticalTakeaways
	},
	{
		slug: "magic-chess-vue-rules-engine",
		...magicChessVueRulesEngineMetadata,
		Component: MagicChessVueRulesEngine
	},
	{
		slug: "python-automation-s3-mongodb",
		...pythonAutomationS3MongodbMetadata,
		Component: PythonAutomationS3Mongodb
	},
	{
		slug: "python-automation-projects",
		...pythonAutomationProjectsMetadata,
		Component: PythonAutomationProjects
	},
	{
		slug: "leetcode-algorithm-notes",
		...leetcodeAlgorithmNotesMetadata,
		Component: LeetcodeAlgorithmNotes
	},
	{
		slug: "github-pages-to-next-portfolio",
		...githubPagesToNextPortfolioMetadata,
		Component: GithubPagesToNextPortfolio
	},
	{
		slug: "resume-latex-system",
		...resumeLatexSystemMetadata,
		Component: ResumeLatexSystem
	},
	{
		slug: "repo-license-info-notes",
		...repoLicenseInfoNotesMetadata,
		Component: RepoLicenseInfoNotes
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
