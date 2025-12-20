/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	images: {
		unoptimized: true
	},
	async redirects() {
		return [
			// Redirect old static pages without .html suffix
			{ source: "/pages/:path*.html", destination: "/pages/:path*", permanent: true },
			// Redirect legacy /pages/index(.html) to new home
			{ source: "/pages", destination: "/", permanent: true },
			{ source: "/pages/index", destination: "/", permanent: true },
			{ source: "/pages/index.html", destination: "/", permanent: true }
		];
	}
};

export default nextConfig;

