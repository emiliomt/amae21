import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yeso: "#EEEDE8", bruma: "#F8F7F4", concreto: "#CFCDC6",
        dusk: { DEFAULT: "#2E2A27", deep: "#1F1C1A", soft: "#5A544F", wall: "#3F3935" },
        luz: { DEFAULT: "#CBB07A", hover: "#D8C08E" },
        error: "#9B2226",
      },
      fontFamily: { display: ["var(--font-display)", "system-ui", "sans-serif"], body: ["var(--font-body)", "Georgia", "serif"] },
    },
  },
  plugins: [],
} satisfies Config;
