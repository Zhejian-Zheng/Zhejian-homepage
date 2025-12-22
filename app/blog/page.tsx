/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type BlogEntry = {
	title: string;
	body: string;
	updatedAt: string;
};

const initialEntry: BlogEntry = {
	title: "Building My Personal Page",
	body: "A quick write-up on how I assembled this personal homepage with Next.js, Tailwind CSS, and a few simple interactions.",
	updatedAt: new Date().toISOString()
};

const jobgenEntry: BlogEntry = {
	title: "Shipping Faster at Jobgen.ai: Python Automation with AWS S3 & MongoDB",
	body: [
		"During my internship/project at Jobgen.ai, I focused on speeding up delivery with Python automation, integrating AWS S3 for object storage and MongoDB for fast metadata/state tracking.",
		"",
		"Highlights:",
		"- Data flow: tasks → Python pre-processing → upload to S3 (bucket/path) → MongoDB records task IDs, file keys, stages, retries, timestamps.",
		"- S3 signed URLs plus batch upload/verify scripts to keep artifacts consistent and safely accessible.",
		"- MongoDB as the quick lookup layer for task status and indexing processed files.",
		"- Python CLI/automation: boto3 + pymongo wrappers, concurrent/resumable batch uploads, validation + write-back to MongoDB, scheduled cleanup/archival, and lightweight retry/alert flows.",
		"- Reliability: logging/metrics, auto-retries with thresholds, flags for manual intervention when needed.",
		"",
		"Takeaways:",
		"- Separate blobs (S3) from metadata (MongoDB) to make debugging and scaling easier.",
		"- Automating repetitive steps reduces human error and speeds up delivery.",
		"- Python is a great glue layer for CLI, batch processing, and API integrations."
	].join("\n"),
	updatedAt: new Date().toISOString()
};

const tcpUdpEntry: BlogEntry = {
	title: "TCP/UDP Simulator: Heartbeats, Auth, and P2P File Sharing",
	body: [
		"Built a TCP/UDP simulator to explore reliable messaging, heartbeat-driven liveness, and peer-to-peer file sharing.",
		"",
		"Highlights",
		"- Dual-protocol flow: UDP handles auth, commands, heartbeats; TCP streams file payloads from publishers.",
		"- Heartbeat + pruning: clients send HEARTBEAT every 2s; server prunes inactive peers after timeout.",
		"- Auth & state: server keeps addr↔username maps, active timestamps, and published file metadata with TCP ports.",
		"- Commands:",
		"  • pub <file>: publish if local file exists; server records publisher TCP port.",
		"  • get <file>: server returns publisher IP/port; client opens TCP to fetch file, streaming in chunks.",
		"  • lap/lpf: list active peers or published files for the caller.",
		"  • sch <substr>: search published files across peers (excluding self).",
		"  • unp <file>: unpublish a file for the current user.",
		"- Client TCP server: each client binds to an ephemeral port (0), advertises it on publish, and serves files in threads.",
		"- Robust file transfer: chunked reads (BUFFER_SIZE), error guard for missing files, and clean close semantics.",
		"",
		"Notes",
		"- Uses Python sockets + threads; UDP for control plane, TCP for data plane.",
		"- Credentials loaded from server/credentials.txt; rejects duplicates, wrong passwords, or unknown users.",
		"- Logging with timestamps to trace PUB/GET/HBT flows and error paths.",
		"- Designed for lab/simulator use; can be extended with TLS, chunk checksums, and retry backoff."
	].join("\n"),
	updatedAt: new Date().toISOString()
};

export default function BlogPage() {
	const [entries] = useState<BlogEntry[]>([tcpUdpEntry, jobgenEntry, initialEntry]);
	const [viewing, setViewing] = useState<BlogEntry | null>(null);

	const lastUpdated = useMemo(() => {
		if (!entries.length) return "";
		const latest = [...entries].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))[0].updatedAt;
		return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(latest));
	}, [entries]);

	return (
		<div className="min-h-screen bg-slate-900 text-white px-4 pb-16 pt-24">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl hover:text-primary transition">
						Homepage
					</Link>
					<div className="flex items-center gap-3 sm:gap-4">
						<Link href="/about" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							About
						</Link>
						<Link href="/blog" className="text-white hover:text-white transition px-3 py-2 rounded-lg bg-white/10">
							Blog
						</Link>
						<Link href="/contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</Link>
					</div>
				</div>
			</nav>

			<div className="mx-auto max-w-3xl space-y-8">
				<header className="space-y-3">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm uppercase tracking-[0.3em] text-slate-400">Build Log</p>
							<h1 className="text-4xl font-bold">Blog</h1>
						</div>
					</div>
					<div className="flex items-center gap-4 text-sm text-slate-300">
						{lastUpdated && <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Last update {lastUpdated}</span>}
						<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{entries.length} posts</span>
					</div>
				</header>

				<section className="grid gap-4">
					{entries.map((entry) => {
						const formatted = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(entry.updatedAt));
						return (
							<article
								key={`${entry.title}-${entry.updatedAt}`}
								className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 p-5 shadow-xl hover:border-primary/50 transition"
							>
								<div className="flex items-start justify-between gap-3">
									<div>
										<h2 className="text-2xl font-semibold text-white">{entry.title}</h2>
										<p className="text-sm text-slate-300 mt-1">Updated: {formatted}</p>
									</div>
									<button
										onClick={() => setViewing(entry)}
										className="btn bg-white/10 hover:bg-white/20 text-sm px-3 py-2"
									>
										View
									</button>
								</div>
								<p className="text-slate-100 mt-3 line-clamp-3">{entry.body}</p>
							</article>
						);
					})}
				</section>

				<footer className="text-slate-400 text-sm pt-6">
					Thanks for reading. If you want to inspect the code, it lives in the same repo under the `app/` directory.
				</footer>
			</div>

			{/* Modal removed */}

			{viewing && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
					onClick={() => setViewing(null)}
				>
					<div
						className="w-full max-w-2xl max-h-[600px] rounded-2xl bg-slate-900 border border-white/10 p-6 space-y-4 shadow-2xl overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Blog Detail</p>
								<h3 className="text-2xl font-semibold text-white">{viewing.title}</h3>
								<p className="text-sm text-slate-300 mt-1">
									Updated: {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(viewing.updatedAt))}
								</p>
							</div>
							<button onClick={() => setViewing(null)} className="btn bg-white/10 hover:bg-white/20">
								Close
							</button>
						</div>
						<div className="text-slate-100 whitespace-pre-wrap leading-relaxed">{viewing.body}</div>
					</div>
				</div>
			)}
		</div>
	);
}

