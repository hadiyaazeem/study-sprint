import { memo } from "react";
import { motion } from "framer-motion";
import type { LogEntry as LogEntryType } from "@/types";
import { StatusBadge } from "@/components/StatusBadge";

interface LogEntryProps {
  entry: LogEntryType;
}

/** A single row in Today's Log: title, start time, duration, and status. */
function LogEntryBase({ entry }: LogEntryProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      className="flex items-center justify-between gap-3 py-3"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate" style={{ color: "var(--ink)" }}>
          {entry.title}
        </span>
        <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
          {entry.startTime} · {entry.duration} min
        </span>
      </div>
      <StatusBadge status={entry.status} />
    </motion.li>
  );
}

export const LogEntry = memo(LogEntryBase);
