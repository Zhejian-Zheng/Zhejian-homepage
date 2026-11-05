/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#D4C7B4",
				secondary: "#D4C7B4",
				accent: "#D4C7B4",
				field: {
					ink: "#191A1B",
					navy: "#222426",
					paper: "#F1EFE9"
				}
			}
		}
	},
	plugins: []
};
