import { memo } from "react";
import type { SessionStatus } from "@/types";

interface StatusBadgeProps {
  status: SessionStatus;
}

const STATUS_MAP: Record<SessionStatus, { label: string; bg: string; fg: string }> = {
  completed: { label: "Completed", bg: "var(--secondary-soft)", fg: "var(--secondary)" },
  skipped: { label: "Skipped", bg: "var(--danger-soft)", fg: "var(--danger)" },
  failed: { label: "Failed", bg: "var(--danger-soft)", fg: "var(--danger)" },
};

/** Small rounded pill communicating a log entry's final status. */
function StatusBadgeBase({ status }: StatusBadgeProps) {
  const { label, bg, fg } = STATUS_MAP[status];

  return (
    <span
      className="text-xs font-medium rounded-full px-2.5 py-1 whitespace-nowrap"
      style={{ background: bg, color: fg }}
    >
      {label}
    </span>
  );
}

export const StatusBadge = memo(StatusBadgeBase);
