import type { BlogCategoryKey } from "./categories";

export type CategoryCopy = {
	index: string;
	code: string;
	titleEn: string;
	titleZh: string;
	bodyEn: string;
	bodyZh: string;
};

export const categoryCopy: Record<BlogCategoryKey, CategoryCopy> = {
	agents: {
		index: "01",
		code: "AGT",
		titleEn: "Agent Engineering",
		titleZh: "Agent 工程",
		bodyEn: "Runtime loops, memory, permissions, recovery, and the framework choices behind dependable agents.",
		bodyZh: "运行循环、记忆、权限、恢复机制，以及决定 Agent 是否可靠的框架选择。"
	},
	systems: {
		index: "02",
		code: "SYS",
		titleEn: "Systems & Data",
		titleZh: "系统与数据",
		bodyEn: "Backend architecture, protocols, automation, databases, and deterministic system design.",
		bodyZh: "后端架构、网络协议、自动化、数据库与确定性系统设计。"
	},
	product: {
		index: "03",
		code: "PRD",
		titleEn: "Product & Interface",
		titleZh: "产品与界面",
		bodyEn: "How technical decisions turn into clear workflows, interfaces, and maintainable products.",
		bodyZh: "技术决策如何转化为清晰的流程、界面与可维护的产品。"
	},
	archive: {
		index: "04",
		code: "ARC",
		titleEn: "Project Archive",
		titleZh: "项目档案",
		bodyEn: "Earlier experiments, reference notes, and practical engineering records.",
		bodyZh: "早期实验、工程参考与实践记录。"
	}
};
