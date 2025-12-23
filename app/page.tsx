/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import profileImg from "@/app/images/profile image.jpg";
import bgBerlin from "@/app/images/backgrounds/berlin-6755246.jpg";
import bgYosemite from "@/app/images/backgrounds/yosemite-8177850.jpg";
import bgBerchtesgaden from "@/app/images/backgrounds/berchtesgaden-2928711.jpg";
import bgBall from "@/app/images/backgrounds/ball-63527.jpg";
import bgCityscape from "@/app/images/backgrounds/cityscape-6942013.jpg";

const localQuotes: Quote[] = [
	{ content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
	{ content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
	{ content: "Ship early, ship often.", author: "Product wisdom" },
	{ content: "Design is not just what it looks like. Design is how it works.", author: "Steve Jobs" },
	{ content: "Programs must be written for people to read.", author: "Harold Abelson" },
	{ content: "Move fast, but don’t break everything.", author: "Pragmatic dev" }
];

type Quote = { content: string; author: string };
type BgImage = StaticImageData;

const BG_IMAGES: BgImage[] = [bgBerlin, bgYosemite, bgBerchtesgaden, bgBall, bgCityscape];

export default function HomePage() {
	const [quote, setQuote] = useState<Quote | null>(null);
	const [loading, setLoading] = useState(false);
	const [bgLoading, setBgLoading] = useState(false);
	const [currentBg, setCurrentBg] = useState<BgImage>(BG_IMAGES[0]);

	const loadQuote = async () => {
		try {
			setLoading(true);
			const ts = Date.now();
			const resp = await fetch(`https://api.quotable.io/random?t=${ts}`, { cache: "no-store" });
			if (!resp.ok) {
				throw new Error(`status ${resp.status}`);
			}
			const data = await resp.json();
			setQuote({ content: data.content, author: data.author });
		} catch {
			// Ensure it still changes even if API fails
			const fallback = localQuotes[Math.floor(Math.random() * localQuotes.length)];
			setQuote(fallback);
		} finally {
			setLoading(false);
		}
	};

	const changeBackground = () => {
		try {
			setBgLoading(true);
			const imgUrl = BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)];
			const preload = new window.Image();
			preload.onload = () => {
				setCurrentBg(imgUrl);
				setBgLoading(false);
			};
			preload.onerror = () => setBgLoading(false);
			preload.src = imgUrl.src;
		} catch {
			setBgLoading(false);
		}
	};

	useEffect(() => {
		loadQuote();
	}, []);

	return (
		<div className="container-page">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
				<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl hover:text-primary transition">
						Homepage
					</Link>
					<div className="flex items-center gap-3 sm:gap-4">
						<Link href="/about" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							About
						</Link>
						<Link href="/blog" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Blog
						</Link>
						<Link href="/contact" className="text-white/90 hover:text-white transition px-3 py-2 rounded-lg">
							Contact
						</Link>
						<button
							onClick={changeBackground}
							className="btn-secondary text-xs sm:text-sm px-3 py-2 shadow-lg shadow-secondary/30"
							disabled={bgLoading}
						>
							{bgLoading ? "Loading..." : "Change BG"}
						</button>
					</div>
				</div>
			</nav>

			<main className="content-center pt-24 relative overflow-hidden isolate bg-slate-900">
				<div className="absolute inset-0 -z-10">
					<div
						className="absolute inset-0 bg-cover bg-center transition-all duration-500"
						style={{ backgroundImage: `url('${currentBg.src}')` }}
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/80 to-slate-900/90" />
				</div>
				<div className="relative mb-6">
					<div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary animate-[pulse_3s_ease-in-out_infinite] opacity-70" />
					<div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-2 ring-white/30">
						<Image src={profileImg} alt="Zhejian Zheng" className="object-cover" fill sizes="176px" priority />
					</div>
				</div>

				<div className="text-center space-y-2">
					<h1 className="text-4xl sm:text-5xl font-bold drop-shadow">Zhejian Zheng</h1>
					<p className="text-lg sm:text-xl text-white/90">Software Engineer & Developer</p>
					<p className="max-w-xl text-white/80 mx-auto">
						Passionate about programming, focused on frontend development and user experience design
					</p>
				</div>

				<button
					onClick={loadQuote}
					className="glass mt-6 px-5 py-4 max-w-2xl w-full text-left hover:bg-white/15 transition disabled:opacity-60"
					aria-label="click to refresh daily quote"
					title="click to refresh daily quote"
					disabled={loading}
				>
					<p className="text-base sm:text-lg italic">{quote?.content ?? "Loading daily quote..."}</p>
					<p className="text-sm opacity-80 mt-1">— {quote?.author ?? "Quote"}</p>
				</button>

				<div className="flex items-center justify-center gap-4 sm:gap-6 mt-6">
					<a
						className="btn-circle glass hover:scale-105 transition"
						href="https://github.com/Zhejian-Zheng"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						title="GitHub"
					>
						<svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
							<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
						</svg>
					</a>
					<a
						className="btn-circle glass hover:scale-105 transition"
						href="https://www.linkedin.com/in/zhejian-zheng-9a5563312/"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
						title="LinkedIn"
					>
						<svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
							<path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.96 0-1.73-.78-1.73-1.73s.77-1.73 1.73-1.73 1.73.78 1.73 1.73-.77 1.73-1.73 1.73zm13.5 11.27h-3v-5.6c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.98v5.69h-3v-10h2.88v1.37h.04c.4-.75 1.39-1.54 2.86-1.54 3.06 0 3.63 2.02 3.63 4.65v5.52z" />
						</svg>
					</a>
				</div>

				<footer className="site-footer mt-10">&copy; 2024 Zhejian Zheng. Made with ❤️</footer>
			</main>
		</div>
	);
}


