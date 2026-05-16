import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({});

export default withMDX(nextConfig);
