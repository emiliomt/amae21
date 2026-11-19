import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: { 50: "#faf7f2", 100: "#f3ede2", 200: "#e6dcc8", 300: "#d4c3a3", 500: "#a8916a" },
        paper: "#fdfcf9",
        charcoal: { DEFAULT: "#2b2a28", soft: "#55524d" },
        accent: { DEFAULT: "#9c4a2f", dark: "#7d3a24" }, // terracota
      },
      fontFamily: { serif: ["var(--font-serif)", "Georgia", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
