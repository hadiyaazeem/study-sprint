import React, { memo } from "react";
import type { ButtonProps } from "@/types";

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

const VARIANT_STYLE: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "var(--on-primary)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ink)",
    border: "1px solid var(--line)",
  },
  danger: {
    background: "var(--danger-soft)",
    color: "var(--danger)",
  },
};

/**
 * Shared pill button used for every primary/secondary action in the app.
 * Supports hover, focus-visible, active, disabled, and loading states via
 * CSS classes and a spinner — no per-instance inline event handlers needed.
 */
function ButtonBase({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ariaLabel,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={[
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
        "transition-[filter,transform] duration-200 ease-out",
        "hover:brightness-[1.08] hover:-translate-y-px",
        "active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100 disabled:hover:translate-y-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        SIZE_CLASSES[size],
        className,
      ].join(" ")}
      style={{ ...VARIANT_STYLE[variant], outlineColor: "var(--focus-ring)" }}
    >
      {loading && (
        <span
          className="h-3.5 w-3.5 rounded-full border-2 animate-spin"
          style={{ borderColor: "currentColor", borderTopColor: "transparent" }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export const Button = memo(ButtonBase);
