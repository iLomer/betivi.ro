import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf8ec",
          100: "#f9edcc",
          200: "#f0d48a",
          300: "#e0bc52",
          400: "#d4a634",
          500: "#c9a227",
          600: "#a8841f",
          700: "#876618",
          800: "#664d11",
          900: "#453309",
        },
        surface: {
          50:  "#f9f3e8",
          100: "#f0e6cc",
          200: "#e0c88a",
          300: "#c4a265",
          400: "#9c7a45",
          500: "#6b4c23",
          600: "#3d2c15",
          700: "#2a1e0f",
          800: "#1c1508",
          900: "#100d08",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
