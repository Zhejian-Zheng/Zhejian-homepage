export type BlogCategoryKey = "agents" | "systems" | "product" | "archive";

export const blogCategoryOrder: BlogCategoryKey[] = ["agents", "systems", "product", "archive"];

const categoryBySlug: Partial<Record<string, BlogCategoryKey>> = {
	"agentscope-java-recoverable-agents": "agents",
	"agentscope-java-permissions-and-sandbox": "agents",
	"reme-long-term-memory": "agents",
	"agent-development-guide": "agents",
	"agentscope-2-vs-langchain": "agents",
	"code-with-codex": "agents",
	"github-repo-review-agent": "agents",
	"solana-orderflow-event-driven-escrow": "systems",
	"safe-rl-supervised-shield": "systems",
	"balatro-rust-scoring-engine": "systems",
	"tcp-udp-simulator": "systems",
	"shell-script-automarking-system": "systems",
	"mongodb-postgresql-practical-takeaways": "systems",
	"magic-chess-vue-rules-engine": "systems",
	"python-automation-s3-mongodb": "systems",
	"python-automation-projects": "systems",
	"leetcode-algorithm-notes": "systems",
	"pilates-health-quiz-progress-recovery": "product",
	"legal-youth-prototype-web": "product",
	"github-pages-to-next-portfolio": "product",
	"resume-latex-system": "product",
	"building-my-personal-page": "product"
};

export function getBlogCategory(slug: string): BlogCategoryKey {
	return categoryBySlug[slug] ?? "archive";
}
