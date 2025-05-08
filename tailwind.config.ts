import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const { heroui } = require("@heroui/react");

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "stone",
  "gray",
  "orange",
  "teal",
  "cyan",
];

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  safelist: colors.map(color => `bg-${color}-500`),
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    }),
    heroui(),
  ],
};

export default config;
