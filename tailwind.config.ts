import type { Config } from "tailwindcss";

/**
 * Tailwind is used only for layout utilities (flex, grid, gap, radius,
 * spacing scale, typography scale). Every COLOR in this project comes from
 * CSS custom properties defined in src/styles/tokens.css and is consumed via
 * inline `style` bindings or the `var(--token)` arbitrary-value syntax below
 * — never a hardcoded hex value inside a component.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        line: "var(--line)",
        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        secondary: "var(--secondary)",
        "secondary-soft": "var(--secondary-soft)",
        danger: "var(--danger)",
        "danger-soft": "var(--danger-soft)",
        board: "var(--board)",
        "board-digit": "var(--board-digit)",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        card: "var(--shadow)",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      keyframes: {
        "log-enter": {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "log-enter": "log-enter 260ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
