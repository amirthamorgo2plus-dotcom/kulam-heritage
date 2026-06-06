import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kulam: {
          DEFAULT: "#DC143C", // Crimson — modern red (primary)
          dark: "#A30E2C", // deep crimson — nav background / hover
          // Emerald — modern green accent. (Token kept named "gold" so all
          // existing `kulam-gold` classes pick it up; it now renders emerald.)
          gold: "#50C878",
          emerald: "#50C878",
          cream: "#fbf6ec",
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
