import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        sun: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        soil: {
          100: "#f5efe6",
          300: "#d6bfa3",
          500: "#a97c50",
          700: "#7a5230",
          900: "#4a2f1b",
        },
        ink: {
          500: "#64748b",
          700: "#334155",
          900: "#0f172a",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-rounded", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(20, 83, 45, 0.35)",
        card: "0 8px 24px -10px rgba(15, 23, 42, 0.25)",
      },
      keyframes: {
        "sun-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(0.8)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-90px) scale(1.2)", opacity: "0" },
        },
      },
      animation: {
        "sun-spin": "sun-spin 24s linear infinite",
        "leaf-sway": "leaf-sway 4s ease-in-out infinite",
        "bubble-rise": "bubble-rise 3.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
