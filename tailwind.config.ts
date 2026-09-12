import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ec",
        blush: "#f7c8cf",
        peach: "#f7d2b8",
        lavender: "#d8c5ee",
        cocoa: "#6f584a",
        ink: "#3e332d",
        paper: "#fffdf7",
        sage: "#c9d8c5",
        butter: "#ffe6a7"
      },
      fontFamily: {
        display: ['"Segoe Print"', '"Bradley Hand"', '"Comic Sans MS"', "cursive"],
        body: ['"Nunito"', '"Segoe UI"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        scrapbook: "0 18px 45px rgba(91, 67, 54, 0.16)",
        polaroid: "0 20px 40px rgba(77, 55, 45, 0.2)"
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 18% 22%, rgba(247, 200, 207, 0.32), transparent 28%), radial-gradient(circle at 78% 18%, rgba(216, 197, 238, 0.32), transparent 26%), radial-gradient(circle at 48% 82%, rgba(247, 210, 184, 0.34), transparent 30%)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-2%, 1%)" },
          "40%": { transform: "translate(1%, -1%)" },
          "60%": { transform: "translate(-1%, -2%)" },
          "80%": { transform: "translate(2%, 1%)" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        grain: "grain 8s steps(6) infinite"
      }
    }
  },
  plugins: []
};

export default config;
