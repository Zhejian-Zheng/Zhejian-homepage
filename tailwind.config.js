/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#4D8DFF",
				secondary: "#8FAF87",
				accent: "#F2A65A",
				field: {
					ink: "#07111F",
					navy: "#0E1A2B",
					paper: "#E9EEF5"
				}
			}
		}
	},
	plugins: []
};
