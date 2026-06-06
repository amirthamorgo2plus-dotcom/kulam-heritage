import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mild-rich, Gen-Z palette: grape/violet primary + coral + teal-mint.
        kulam: {
          DEFAULT: "#7C5CBF", // grape / digital-lavender (primary)
          dark: "#4C3A77", // deep indigo-violet (nav / hover)
          // Warm coral accent. (Token still named "gold" so existing
          // `kulam-gold` classes pick it up; it now renders coral.)
          gold: "#EC8B73",
          emerald: "#2DB39A", // teal-mint — positive / "match" accent
          cream: "#F7F4FB", // soft lavender-tinted off-white
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
