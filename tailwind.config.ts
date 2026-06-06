import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Digital Matcha" palette — matcha green + electric cyan + acid lemon
        // on a clean white canvas with deep-ink text.
        kulam: {
          DEFAULT: "#22C55E", // Hyper Matcha (primary)
          dark: "#0F172A", // Deep Ink (nav bg / headings / hover)
          // Acid Lemon accent. (Token still named "gold" so existing
          // `kulam-gold` classes pick it up; it now renders acid lemon.)
          gold: "#EAB308",
          emerald: "#06B6D4", // Electric Cyan — secondary / "match" accent
          cream: "#FFFFFF", // Pure Minimal canvas
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
