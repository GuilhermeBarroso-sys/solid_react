const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				brand: {
					500: "#8257e6"
				}
			}
		},
	},
	plugins: [],
};
