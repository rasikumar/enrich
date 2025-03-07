/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screen: {
      ra: {
        max: "639px",
      },
    },
    theme: {
      16: "4rem",
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "custom-white": "rgba(255, 255, 255, 1)",
        "custom-border": "rgba(255, 255, 255, 0.3)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "neon-green": "#39FF14",
        "neon-yellow": "#FFD700",
        "neon-pink": "#FF1493",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        Hero: "url('/src/assets/hero/heroBg.png')", // ✅ Use double quotes outside
        formback: "url('/src/assets/formBack.png')", // ✅ Use double quotes outside
        "custom-gradient":
          "linear-gradient(220deg, hsla(38, 67%, 58%, 1) 15%, hsl(225, 60%, 39%) 10%)",
      },
      fontFamily: {
        reggae: ["Reggae One", "system-ui"],
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
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
    require("tailwindcss-animate"),
  ],
};
