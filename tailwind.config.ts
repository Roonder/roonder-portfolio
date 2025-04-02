import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        roonder: {
            green: "#009c49",
            white: "#e4e6c5",
            gunmetal: "#293142",
            gray: "#515052",
        }
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        }
      },
      animation: {
        shine: "shine 5s linear infinite"
      }
    },
  },
  plugins: [],
} satisfies Config;
