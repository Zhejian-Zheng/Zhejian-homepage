"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type RoutePhase = "idle" | "exiting" | "entering";

const ROUTE_FADE_OUT_MS = 360;
const ROUTE_SWAP_PAUSE_MS = 40;

function isSamePageUrl(url: URL) {
	return url.pathname === window.location.pathname && url.search === window.location.search;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const [phase, setPhase] = useState<RoutePhase>("idle");
	const pendingUrl = useRef<string | null>(null);
	const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hasMounted = useRef(false);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
				return;
			}

			const target = event.target as HTMLElement | null;
			const anchor = target?.closest("a[href]");

			if (!anchor) {
				return;
			}

			const href = anchor.getAttribute("href");
			const targetAttr = anchor.getAttribute("target");

			if (!href || href.startsWith("#") || targetAttr === "_blank" || anchor.hasAttribute("download")) {
				return;
			}

			const nextUrl = new URL(href, window.location.href);

			if (nextUrl.origin !== window.location.origin || isSamePageUrl(nextUrl)) {
				return;
			}

			event.preventDefault();
			pendingUrl.current = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
			setPhase("exiting");

			if (fadeOutTimer.current) {
				clearTimeout(fadeOutTimer.current);
			}

			fadeOutTimer.current = setTimeout(() => {
				if (pendingUrl.current) {
					router.push(pendingUrl.current);
				}
			}, ROUTE_FADE_OUT_MS);
		};

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [router]);

	useLayoutEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}

		pendingUrl.current = null;
		setPhase("entering");

		if (fadeInTimer.current) {
			clearTimeout(fadeInTimer.current);
		}

		fadeInTimer.current = setTimeout(() => {
			setPhase("idle");
		}, ROUTE_SWAP_PAUSE_MS);
	}, [pathname]);

	useEffect(() => {
		return () => {
			if (fadeOutTimer.current) {
				clearTimeout(fadeOutTimer.current);
			}
			if (fadeInTimer.current) {
				clearTimeout(fadeInTimer.current);
			}
		};
	}, []);

	return (
		<div className="page-transition-root" data-route-phase={phase}>
			{children}
		</div>
	);
}
