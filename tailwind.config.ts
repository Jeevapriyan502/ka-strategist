import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ka: {
          red: "#E63946",
          blue: "#2D5AB2",
          green: "#8DC63F",
        },
        site: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          card: "rgba(255,255,255,0.7)",
          "card-hover": "rgba(255,255,255,0.9)",
          border: "rgba(0,0,0,0.07)",
          "border-light": "rgba(0,0,0,0.12)",
          text: "#1A1A1A",
          muted: "#555555",
          subtle: "#999999",
          accent: "#E53935",
          "accent-hover": "#C62828",
          sky: "#1E88E5",
          warm: "#F57C00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(229,57,53,0.12), 0 0 60px -12px rgba(229,57,53,0.08)",
        "card-color": "0 4px 24px rgba(229,57,53,0.10), 0 12px 40px rgba(0,0,0,0.06)",
        soft: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
        glow: "0 0 50px -12px rgba(229, 57, 53, 0.25)",
        "glow-sky": "0 0 50px -12px rgba(30, 136, 229, 0.25)",
        "glow-warm": "0 0 50px -12px rgba(245, 124, 0, 0.25)",
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(at 15% 10%, rgba(229,57,53,0.05) 0%, transparent 50%), radial-gradient(at 85% 20%, rgba(30,136,229,0.04) 0%, transparent 50%), radial-gradient(at 50% 80%, rgba(245,124,0,0.04) 0%, transparent 50%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(229,57,53,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(30,136,229,0.05) 0%, transparent 50%), linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        "gradient-cta":
          "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(229,57,53,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 50%, rgba(245,124,0,0.05) 0%, transparent 50%), linear-gradient(0deg, #FAFAFA 0%, #FFFFFF 100%)",
      },
      animation: {
        "gradient-x": "gradientX 10s ease infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        "marquee-slow": "marquee 50s linear infinite",
        "marquee-fast": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "marquee-reverse-slow": "marquee-reverse 50s linear infinite",
        "marquee-reverse-fast": "marquee-reverse 25s linear infinite",
        "orb-float-1": "orbFloat1 20s ease-in-out infinite",
        "orb-float-2": "orbFloat2 25s ease-in-out infinite",
        "orb-float-3": "orbFloat3 30s ease-in-out infinite",
      },
      keyframes: {
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        orbFloat1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        orbFloat2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(1.08)" },
          "66%": { transform: "translate(25px, -25px) scale(0.92)" },
        },
        orbFloat3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, 35px) scale(0.96)" },
          "66%": { transform: "translate(-30px, -20px) scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
