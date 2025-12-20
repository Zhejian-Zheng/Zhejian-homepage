/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				primary: "#667eea",
				secondary: "#764ba2",
				accent: "#f093fb"
			},
			backgroundImage: {
				"gradient-hero": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
			}
		}
	},
	plugins: []
};

