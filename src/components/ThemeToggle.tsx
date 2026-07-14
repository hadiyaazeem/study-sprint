import { memo } from "react";
import type { Theme } from "@/types";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

/**
 * Light/dark switch. Uses aria-pressed rather than a custom role so
 * assistive tech announces it as a standard toggle button.
 */
function ThemeToggleBase({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      className="flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium
        transition-transform duration-200 active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: "var(--surface-2)",
        color: "var(--ink)",
        border: "1px solid var(--line)",
        outlineColor: "var(--focus-ring)",
      }}
    >
      <span
        aria-hidden="true"
        className="h-3.5 w-3.5 rounded-full transition-colors duration-200"
        style={{ background: isDark ? "var(--secondary)" : "var(--primary)" }}
      />
      <span className="sr-only">Toggle theme, currently </span>
      {isDark ? "Dark" : "Light"}
    </button>
  );
}

export const ThemeToggle = memo(ThemeToggleBase);
