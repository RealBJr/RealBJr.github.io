/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: '15px'
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1200px'
		},
		fontFamily: {
			primary: ["var(--font-playfairDisplay)"],
			secondary: ["var(--font-anton)"],
		},
		extend: {
			colors: {
				primary: '#000814',
				accent: {
					DEFAULT: '#FFD60A',
					hover: '#FFC300'
				},
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				animation: {
					wave: 'wave 6s ease-in-out infinite',
				},
				keyframes: {
					wave: {
						'0%, 100%': { transform: 'translateX(0) scale(1)' },
						'50%': { transform: 'translateX(-10px) scale(1.1)' },
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
