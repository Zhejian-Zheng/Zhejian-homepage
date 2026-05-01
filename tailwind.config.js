/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#667eea",
				secondary: "#764ba2",
				accent: "#f093fb"
			}
		}
	},
	plugins: []
};

