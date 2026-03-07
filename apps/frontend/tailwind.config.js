/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                accent: "hsl(var(--accent))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 3s ease-in-out infinite",
                "shimmer": "shimmer 2s ease-in-out infinite",
                "bounce-in": "bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "float-up": "float-up 0.5s ease-out forwards",
                "gradient-shift": "gradient-shift 6s ease infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};
