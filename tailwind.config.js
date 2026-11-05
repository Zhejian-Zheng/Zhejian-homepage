/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#6CE7F5",
				secondary: "#8CEEF8",
				accent: "#6CE7F5",
				field: {
					ink: "#050B0F",
					navy: "#081219",
					paper: "#ECF7F8"
				}
			}
		}
	},
	plugins: []
};
