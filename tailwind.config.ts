import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const { heroui } = require("@heroui/theme");

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
      colors: {
        // 메인 배경용
        background: "#353238",

        // 헤더나 카드용 서브 배경
        surface: "#403A45",

        // 포인트 보라색
        primary: {
          DEFAULT: "#8C56D3",
          dark: "#7A41C2", // hover 시 어두운 보라색
          light: "#A774E6", // hover 시 밝은 보라색
          gray: "#999090",
        },
      },
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
