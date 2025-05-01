import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const spacing = Object.fromEntries(Array.from({ length: 501 }, (_, i) => [i.toString(), `${i}px`]));

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing,
      width: spacing,
      height: spacing,
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    }),
  ],
};

export default config;
