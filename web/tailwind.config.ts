import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yeso: "#EEEDE8", bruma: "#F8F7F4", concreto: "#CFCDC6",
        dusk: { DEFAULT: "#1E2B3A", deep: "#141D28", soft: "#4A5663", wall: "#2A3B50" },
        luz: { DEFAULT: "#F0B64A", hover: "#F6C76B" },
        error: "#9B2226",
      },
      fontFamily: { display: ["var(--font-display)", "system-ui", "sans-serif"], body: ["var(--font-body)", "Georgia", "serif"] },
    },
  },
  plugins: [],
} satisfies Config;
