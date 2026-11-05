"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeMotion() {
	useGSAP(() => {
		const media = gsap.matchMedia();
		media.add("(prefers-reduced-motion: no-preference)", () => {
			// Animate below-fold content only; the first screen is visible without JavaScript.
			gsap.utils.toArray<HTMLElement>(".project-card, .personal-section").forEach(element => {
				gsap.from(element, {
					y: 24,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: { trigger: element, start: "top 95%", once: true }
				});
			});
		});
		return () => media.revert();
	});
	return null;
}
