import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ed4c47",
          secondary: "#2da9b7",
          accent: "#62e241",
          neutral: "#1d1e35",
          "base-100": "#ffffff",
          info: "#71d6ea",
          success: "#175e33",
          warning: "#e19819",
          error: "#e8547e",
          body: {
            "background-color": "#ffffff",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

export default config;

// 2nd style
// daisyui: {
//   themes: [
//     {
//       mytheme: {

// "primary": "#67d35d",

// "secondary": "#5ce89d",

// "accent": "#ccccff",

// "neutral": "#2d283e",

// "base-100": "#3e4c56",

// "info": "#60a6f0",

// "success": "#14a966",

// "warning": "#975602",

// "error": "#f24a60",
//       },
//     },
//   ],
// },

// 3rd style
// daisyui: {
//   themes: [
//     {
//       mytheme: {

// "primary": "#22f72d",

// "secondary": "#08934e",

// "accent": "#4f7f06",

// "neutral": "#181c20",

// "base-100": "#384461",

// "info": "#50c3e2",

// "success": "#78e2c1",

// "warning": "#efce6c",

// "error": "#f2685f",
//       },
//     },
//   ],
// },
