/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      ra: { max: "639px" },
    },
    theme: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },
    extend: {
      boxShadow: {
        custom: "4px 4px 30px rgba(0, 0, 0, 0.1)",
        drop: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
        empose:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      },
      backdropBlur: {
        custom: "2px",
      },
      borderRadius: {
        custom: "16px",
      },
      colors: {
        "custom-white": "rgba(255, 255, 255, 1)",
        "custom-border": "rgba(255, 255, 255, 0.3)",
        primary: "#203B93",
        secondary: "#DCA74B",
        "neon-green": "#39FF14",
        "neon-yellow": "#FFD700",
        "neon-pink": "#FF1493",
        
      },
      backgroundImage: {
        Hero: "url('/src/assets/hero/heroBg.png')",
        formback: "url('/src/assets/formBack.png')",
      },
      fontFamily: {
        reggae: ["Reggae One", "system-ui"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      scale: ["hover"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".backdrop-filter": {
          "backdrop-filter": "blur(5px)",
          "-webkit-backdrop-filter": "blur(5px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
