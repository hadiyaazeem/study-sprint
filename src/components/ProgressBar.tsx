import { memo } from "react";

interface ProgressBarProps {
  percentComplete: number;
  complete: boolean;
}

/**
 * Animated horizontal progress indicator for the active session. Hidden
 * from assistive tech (the timer's own aria-live label already announces
 * progress) and hidden below `sm` to match the mock's compact mobile view.
 */
function ProgressBarBase({ percentComplete, complete }: ProgressBarProps) {
  return (
    <div className="hidden sm:flex flex-col items-end gap-1 min-w-[6rem]" aria-hidden="true">
      <div
        className="w-28 h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--surface-2)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentComplete}%`,
            background: complete ? "var(--secondary)" : "var(--primary)",
            transition: "width 900ms linear",
          }}
        />
      </div>
      <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
        {percentComplete}% through
      </span>
    </div>
  );
}

export const ProgressBar = memo(ProgressBarBase);
