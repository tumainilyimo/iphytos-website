import type { Config } from "tailwindcss";

// Import the text-shadow plugin
const textShadowPlugin = require('./src/lib/text-shadow-plugin.js');

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		screens: {
			'xs': '380px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2D5F47', // Earthy green for rice fields
					light: '#3E7F60',
					dark: '#1C4A33',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#F9A826', // Warm yellow for alerts/warnings
					light: '#FABC57',
					dark: '#E89106',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				tertiary: {
					DEFAULT: '#3C8DAD', // Sky blue for technology/science
					light: '#59A7C5',
					dark: '#2A7292',
					foreground: '#FFFFFF',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: '#F5F7FA', // Light gray
					foreground: '#666666',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				neutral: {
					white: '#FFFFFF',
					light: '#F5F7FA',
					dark: '#333333',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'count-up': {
					'0%': { content: '"0"' },
					'100%': { content: 'attr(data-value)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'subtle-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(5deg)' },
				},
				'mosquito-float': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(5px, -5px) rotate(2deg)' },
					'50%': { transform: 'translate(0, -10px) rotate(0deg)' },
					'75%': { transform: 'translate(-5px, -5px) rotate(-2deg)' },
					'100%': { transform: 'translate(0, 0) rotate(0deg)' },
				},
				'zoom-bg': {
					'0%': { transform: 'scale(1.0)' },
					'100%': { transform: 'scale(1.05)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite',
				'subtle-rotate': 'subtle-rotate 3s ease-in-out alternate infinite',
				'mosquito-float': 'mosquito-float 6s ease-in-out infinite',
				'zoom-bg': 'zoom-bg 10s ease forwards',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
			},
			boxShadow: {
				'light': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'medium': '0 4px 20px rgba(0, 0, 0, 0.1)',
				'elevated': '0 10px 30px rgba(0, 0, 0, 0.15)',
				'card-hover': '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), textShadowPlugin],
} satisfies Config;
