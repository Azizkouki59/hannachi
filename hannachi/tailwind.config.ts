import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette
        primary: { DEFAULT: "#1E293B", dark: "#0F172A", light: "#334155" },
        accent:  { DEFAULT: "#0EA5E9", dark: "#0284C7", light: "#38BDF8" },
        surface: { DEFAULT: "#F8FAFC", card: "#FFFFFF", muted: "#F1F5F9" },
        ink:     { DEFAULT: "#1E293B", muted: "#64748B", faint: "#94A3B8" },
        // Legacy aliases
        navy:  { DEFAULT: "#1E293B", dark: "#0F172A" },
        amber: { DEFAULT: "#0EA5E9", deep: "#0284C7" },
        paper: "#F8FAFC",
        slate: { muted: "#64748B" },
      },
      fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
      maxWidth: { page: "76rem" },
      boxShadow: {
        card:       "0 1px 3px 0 rgba(15,23,42,.06), 0 4px 16px -4px rgba(15,23,42,.08)",
        "card-hover": "0 4px 6px -1px rgba(15,23,42,.08), 0 16px 40px -8px rgba(14,165,233,.20)",
        glow:       "0 0 0 3px rgba(14,165,233,.25)",
        "glow-lg":  "0 0 60px 20px rgba(14,165,233,.12)",
        "inner-top":"inset 0 1px 0 rgba(255,255,255,.12)",
      },
      backgroundImage: {
        "hero-gradient":   "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0C3458 100%)",
        "accent-gradient": "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
        "dark-gradient":   "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
        "surface-gradient":"linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
