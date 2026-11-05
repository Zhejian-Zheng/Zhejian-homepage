"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./components/language";
import { LocalizedDate, LocalizedPostSummary, LocalizedPostTitle, LocalizedTag } from "./blog/localizedPostText";
import profileImg from "@/app/images/profile.webp";
import journeyImg from "@/app/images/world_exploring/mount-fuji.webp";
import HomeMotion from "./components/HomeMotion";

export type HomePostPreview = {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	tags: string[];
};

const homeCopy = {
	en: {
		name: "Zhejian Zheng", role: "Software engineer & technical writer",
		title: "Reliable systems.", titleEnd: "Thoughtful interfaces.",
		intro: "I build recoverable agents, dependable backends, and interfaces that make complex systems feel clear.",
		work: "Explore my work", notes: "Read the notebook", location: "Between Sydney & Ningbo",
		selected: "A few things I’ve built.", selectedIntro: "From an idea to a working system. The decisions, boundaries, and details along the way.",
		allWork: "Explore the archive", caseStudy: "Read the engineering notes",
		latest: "From the notebook.", latestIntro: "Things learned in the code, written down while they’re still fresh.", allNotes: "All notes",
		about: "Beyond the terminal.", aboutBody: "From Ningbo to Sydney, a computer science education at UNSW and a habit of asking how things work. I care as much about making systems understandable as making them run.",
		aboutLink: "A little more about me", contact: "Have something in mind?", contactLink: "Let’s work through it.",
		footer: "Designed, built & written by Zhejian Zheng", photo: "A quiet moment, away from the screen.",
		loop: ["Observe", "Decide", "Act", "Verify"], loopNote: "Fresh observations. Explicit boundaries. Evidence before completion."
	},
	zh: {
		name: "郑哲坚", role: "软件工程师与技术写作者",
		title: "可靠的系统。", titleEnd: "清晰的体验。",
		intro: "我构建可恢复的 Agent、可靠的后端，以及让复杂系统变得清晰易懂的产品界面。",
		work: "看看我的作品", notes: "翻阅工程笔记", location: "在悉尼与宁波之间",
		selected: "把想法，做成作品。", selectedIntro: "从一个念头到可以运行的系统，记录过程中的决策、边界与细节。",
		allWork: "浏览项目档案", caseStudy: "阅读工程记录",
		latest: "写在实践之后。", latestIntro: "从源码里学到的东西，趁记忆还新鲜，把它们记录下来。", allNotes: "全部笔记",
		about: "屏幕之外的我。", aboutBody: "从宁波到悉尼，在 UNSW 学习计算机科学，也一直保留着追问事物如何工作的习惯。我关心系统能否运行，也关心人能否理解它。",
		aboutLink: "多了解我一点", contact: "有个想法，想一起聊聊？", contactLink: "一起把它想清楚。",
		footer: "设计、构建与写作 · 郑哲坚", photo: "离开屏幕，留一点时间给日常。",
		loop: ["观察", "决策", "执行", "核验"], loopNote: "新的观察，明确的边界，以及完成之前的证据。"
	}
} as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
	return <span className="link-arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectCard({ post, featured = false }: { post: HomePostPreview; featured?: boolean }) {
	const { language } = useLanguage();
	const copy = homeCopy[language];
	return (
		<Link href={`/blog/${post.slug}`} className={`project-card group${featured ? " project-featured" : ""}`}>
			{featured && <div className="project-visual" aria-hidden="true">
				<div className="project-wordmark">Sidecar<span>伴行</span></div>
				<div className="agent-loop">{copy.loop.map((step, index) => <span key={step}>{step}{index < 3 && <i>→</i>}</span>)}</div>
				<p>{copy.loopNote}</p>
			</div>}
			<div className="project-description">
				<div className="project-meta"><span>{post.tags[0]}</span><Arrow diagonal /></div>
				<h3>{featured ? (language === "en" ? "An agent that checks its own work." : "一个会核对自己工作的 Agent。") : <LocalizedPostTitle slug={post.slug} title={post.title} />}</h3>
				<p><LocalizedPostSummary slug={post.slug} summary={post.summary} /></p>
				<div className="project-bottom"><span>{copy.caseStudy}</span><span className="project-tags">{post.tags.slice(1, 3).map(tag => <span key={tag}><LocalizedTag tag={tag} /></span>)}</span></div>
			</div>
		</Link>
	);
}

export default function HomeClient({ selectedBuilds, latestNotes }: { selectedBuilds: HomePostPreview[]; latestNotes: HomePostPreview[] }) {
	const { language } = useLanguage();
	const copy = homeCopy[language];
	return (
		<div className="home-page">
			<HomeMotion />
			<main id="main-content" tabIndex={-1} className="home-main">
				<div className="field-wrap">
					<section className="home-hero">
						<div className="hero-copy">
							<p className="hero-byline"><span>{copy.name}</span><span>{copy.role}</span></p>
							<h1 className="hero-title">{copy.title}<em>{copy.titleEnd}</em></h1>
							<p className="hero-intro">{copy.intro}</p>
							<div className="hero-actions"><a href="#selected-builds" className="btn-primary">{copy.work}<Arrow diagonal /></a><Link href="/blog" className="text-link">{copy.notes}<Arrow /></Link></div>
							<p className="hero-location"><span aria-hidden="true">↳</span> {copy.location}</p>
						</div>
						<figure className="hero-portrait">
							<div className="portrait-image"><Image src={profileImg} alt={copy.name} fill priority sizes="(max-width: 767px) 90vw, 440px" className="object-cover" /></div>
							<figcaption><span>{copy.photo}</span><span aria-hidden="true">ZZ.</span></figcaption>
						</figure>
					</section>

					<section id="selected-builds" className="work-section">
						<div className="section-heading"><div><h2>{copy.selected}</h2><p>{copy.selectedIntro}</p></div><Link href="/blog" className="text-link">{copy.allWork}<Arrow /></Link></div>
						<div className="project-grid">{selectedBuilds.map((post, index) => <ProjectCard post={post} featured={index === 0} key={post.slug} />)}</div>
					</section>

					<section id="latest-notes" className="notes-section">
						<div className="section-heading"><div><h2>{copy.latest}</h2><p>{copy.latestIntro}</p></div><Link href="/blog" className="text-link">{copy.allNotes}<Arrow /></Link></div>
						<div className="note-list">{latestNotes.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="note-row group"><span className="field-meta"><LocalizedDate date={post.publishedAt} /></span><div><h3><LocalizedPostTitle slug={post.slug} title={post.title} /></h3><p><LocalizedPostSummary slug={post.slug} summary={post.summary} /></p></div><Arrow diagonal /></Link>)}</div>
					</section>

					<section className="personal-section">
						<div className="personal-image"><Image src={journeyImg} alt={language === "zh" ? "落日下隔水远望的富士山" : "Mount Fuji across the water at sunset"} fill sizes="(max-width: 767px) 90vw, 420px" className="object-cover" /></div>
						<div><h2>{copy.about}</h2><p>{copy.aboutBody}</p><Link href="/about" className="text-link">{copy.aboutLink}<Arrow /></Link></div>
					</section>

					<section className="contact-section"><p>{copy.contact}</p><Link href="/contact" className="contact-cta">{copy.contactLink}<Arrow diagonal /></Link></section>
					<footer className="home-footer"><span>{copy.footer}</span><div><a href="https://github.com/Zhejian-Zheng">GitHub <Arrow diagonal /></a><a href="mailto:zj.zheng1@gmail.com">Email <Arrow diagonal /></a></div></footer>
				</div>
			</main>
		</div>
	);
}
