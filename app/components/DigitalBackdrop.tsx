"use client";

import { useEffect, useRef } from "react";

type Ripple = { x: number; y: number; born: number };
type Cell = { x: number; y: number; speed: number; glyphX: number; glyphY: number; alpha: number };
const glyphs = "01ABCDEF{}[]<>/;";

/** One viewport-sized decorative layer shared by every route. */
export default function DigitalBackdrop() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d", { alpha: true });
		if (!canvas || !context) return;
		const atlas = document.createElement("canvas");
		const ink = atlas.getContext("2d");
		if (!ink) return;
		// Rasterize text once. Animation only copies small cached glyphs.
		const tileWidth = 16;
		const tileHeight = 24;
		const atlasScale = 2;
		atlas.width = glyphs.length * tileWidth * atlasScale;
		atlas.height = tileHeight * 2 * atlasScale;
		ink.scale(atlasScale, atlasScale);
		ink.font = `12px ${getComputedStyle(canvas).fontFamily}`;
		ink.textAlign = "center";
		for (let tint = 0; tint < 2; tint++) {
			ink.fillStyle = tint ? "#6cdafa" : "#6cb9fa";
			for (let i = 0; i < glyphs.length; i++) ink.fillText(glyphs[i], i * tileWidth + 8, tint * tileHeight + 17);
		}

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		const finePointer = window.matchMedia("(pointer: fine)");
		let width = 0;
		let height = 0;
		let frame = 0;
		let lastFrame = 0;
		let time = 0;
		let lastRipple = -1;
		let ripples: Ripple[] = [];
		let cells: Cell[] = [];
		let loopHeight = 0;

		const draw = () => {
			context.clearRect(0, 0, width, height);
			ripples = ripples.filter(ripple => time - ripple.born < 1.8);
			for (const cell of cells) {
				const x = cell.x;
				const y = (cell.y + (reduced.matches ? 0 : time * cell.speed)) % loopHeight - 30;
				let dx = 0;
				let dy = 0;
				let light = 0;
				for (const ripple of ripples) {
					const age = time - ripple.born;
					const radius = age * 170;
					const rx = x - ripple.x;
					const ry = y - ripple.y;
					const distanceSquared = rx * rx + ry * ry;
					// Most cells are outside the wave: no square root or trig needed.
					if (distanceSquared > (radius + 80) ** 2 || (radius > 80 && distanceSquared < (radius - 80) ** 2)) continue;
					const distance = Math.sqrt(distanceSquared);
					const band = distance - radius;
					const envelope = (1 - Math.abs(band) / 80) ** 2 * (1 - age / 1.8);
					const wave = Math.sin(band / 22) * envelope * 13;
					dx += (x - ripple.x) / Math.max(distance, 1) * wave;
					dy += (y - ripple.y) / Math.max(distance, 1) * wave;
					light += envelope * .16;
				}
				context.globalAlpha = Math.min(.42, cell.alpha + light);
				context.drawImage(atlas, cell.glyphX, cell.glyphY, tileWidth * atlasScale, tileHeight * atlasScale, x + dx - 8, y + dy - 17, tileWidth, tileHeight);
			}
			context.globalAlpha = 1;
		};

		const tick = (now: number) => {
			// Follow display refresh (60/120 Hz) with time-based, not frame-based, motion.
			time += Math.min(now - lastFrame, 100) / 1000;
			lastFrame = now;
			draw();
			frame = requestAnimationFrame(tick);
		};
		const sync = () => {
			cancelAnimationFrame(frame);
			ripples = [];
			draw();
			if (!document.hidden && !reduced.matches) {
				lastFrame = performance.now();
				frame = requestAnimationFrame(tick);
			}
		};
		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			// Bound raster cost independently of screen DPR; no WebGL or extra assets.
			const scale = Math.min(window.devicePixelRatio || 1, 1.25, Math.sqrt(1_200_000 / (width * height)));
			canvas.width = Math.round(width * scale);
			canvas.height = Math.round(height * scale);
			context.setTransform(scale, 0, 0, scale, 0, 0);
			cells = [];
			const spacing = width < 768 ? 48 : 40;
			const rows = Math.ceil(height / 30) + 2;
			loopHeight = rows * 30;
			for (let column = 0; column < Math.ceil(width / spacing); column++) {
				for (let row = 0; row < rows; row++) {
					const seed = (column * 73 + row * 31 + 4096) >>> 0;
					if (seed % 5 === 0) continue;
					cells.push({ x: column * spacing + spacing / 2, y: row * 30 + column * 17, speed: 9 + column % 5 * 2, glyphX: seed % glyphs.length * tileWidth * atlasScale, glyphY: (seed % 3 === 0 ? 1 : 0) * tileHeight * atlasScale, alpha: .10 + (seed % 7) * .015 });
				}
			}
			draw();
		};
		const pointerMove = (event: PointerEvent) => {
			if (reduced.matches || !finePointer.matches || event.pointerType === "touch" || time - lastRipple < .12) return;
			lastRipple = time;
			ripples.push({ x: event.clientX, y: event.clientY, born: time });
			if (ripples.length > 5) ripples.shift();
		};

		resize();
		sync();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", pointerMove, { passive: true });
		document.addEventListener("visibilitychange", sync);
		reduced.addEventListener("change", sync);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", pointerMove);
			document.removeEventListener("visibilitychange", sync);
			reduced.removeEventListener("change", sync);
		};
	}, []);

	return <canvas ref={canvasRef} className="digital-backdrop" aria-hidden="true" />;
}
