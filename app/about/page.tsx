/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function AboutPage() {
	return (
		<div className="container-page">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl hover:text-primary transition">
						Homepage
					</Link>
					<div className="flex items-center gap-3 sm:gap-4">
						<Link href="/about" className="text-white hover:text-white transition px-3 py-2 rounded-lg bg-white/10">
							About
						</Link>
						<a href="/#projects" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Project
						</a>
						<a href="/#blog" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Blog
						</a>
						<a href="/#contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</a>
					</div>
				</div>
			</nav>

			<main className="pt-24 px-4 pb-10 mx-auto max-w-6xl w-full">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left column */}
					<div className="space-y-6">
						<div className="glass p-6 text-center">
							<div className="relative mx-auto mb-4 w-28 h-28 rounded-full overflow-hidden ring-2 ring-white/30">
								<img src="/assets/images/profile image.jpg" alt="Zhejian Zheng" className="w-full h-full object-cover" />
							</div>
							<h1 className="text-2xl font-semibold">Zhejian Zheng</h1>
							<p className="text-white/90">Software Engineer & Developer</p>
						</div>

						<div className="glass p-6">
							<h2 className="text-lg font-semibold mb-3">Background</h2>
							<ul className="space-y-3 text-white/90">
								<li>
									<span className="font-medium">Ningbo, China</span> — My hometown
								</li>
								<li>
									<span className="font-medium">Sydney, Australia</span> — My new home since 15
								</li>
								<li>
									<span className="font-medium">UNSW</span> — Currently studying here
								</li>
							</ul>
						</div>
					</div>

					{/* Right column */}
					<div className="lg:col-span-2 space-y-6">
						<section className="glass p-6">
							<h2 className="text-lg font-semibold mb-4">About Me</h2>
							<div className="space-y-4 text-white/90">
								<div>
									<h3 className="font-medium">Born in Ningbo, China</h3>
									<p>Raised in the beautiful coastal city of Ningbo, Zhejiang Province.</p>
								</div>
								<div>
									<h3 className="font-medium">Moved to Sydney at 15</h3>
									<p>Embarked on a life-changing journey to Sydney, Australia.</p>
								</div>
								<div>
									<h3 className="font-medium">Currently at UNSW</h3>
									<p>Pursuing Computer Science/Software Engineering degree.</p>
								</div>
							</div>
						</section>

						<section className="glass p-6">
							<h2 className="text-lg font-semibold mb-4">Skills</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<h3 className="font-medium mb-2">Languages</h3>
									<div className="flex flex-wrap gap-2">
										{["C", "C++", "Java", "JavaScript", "TypeScript", "Rust", "Python", "SQL", "Shell Script"].map((s) => (
											<span key={s} className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-sm">
												{s}
											</span>
										))}
									</div>
								</div>
								<div>
									<h3 className="font-medium mb-2">Web Tech</h3>
									<div className="flex flex-wrap gap-2">
										{["React", "Vue.js", "Node.js", "HTML/CSS"].map((s) => (
											<span key={s} className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-sm">
												{s}
											</span>
										))}
									</div>
								</div>
								<div>
									<h3 className="font-medium mb-2">Tools</h3>
									<div className="flex flex-wrap gap-2">
										{["Git", "Docker", "AWS", "Vercel", "Render", "Linux"].map((s) => (
											<span key={s} className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-sm">
												{s}
											</span>
										))}
									</div>
								</div>
							</div>
						</section>

						<section className="glass p-6">
							<h2 className="text-lg font-semibold mb-4">Education & Interests</h2>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium">UNSW (2023 - Present)</h3>
									<p className="text-white/90">Bachelor of Computer Science / Software Engineering</p>
								</div>
								<div>
									<h3 className="font-medium">High School Sydney (2019 - 2022)</h3>
									<p className="text-white/90">Completed high school education in Sydney</p>
								</div>
								<div>
									<h3 className="font-medium">Early Education Ningbo (2010 - 2019)</h3>
									<p className="text-white/90">Primary and middle school in Ningbo, China</p>
								</div>
							</div>
						</section>
					</div>
				</div>

				<footer className="site-footer mt-10">&copy; 2024 Zhejian Zheng. Made with ❤️</footer>
			</main>
		</div>
	);
}


