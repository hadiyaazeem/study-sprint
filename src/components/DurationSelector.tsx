import { memo } from "react";
import type { TimerSession } from "@/types";

interface DurationSelectorProps {
  durations: readonly TimerSession[];
  activeIndex: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}

/**
 * Preset chooser for the timer (Sprint / Deep work / Short break). Disabled
 * while a session is running, since switching mid-sprint would discard
 * progress silently otherwise.
 */
function DurationSelectorBase({ durations, activeIndex, disabled, onSelect }: DurationSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-7 sm:mt-8 mb-6" role="group" aria-label="Session length">
      {durations.map((duration, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={duration.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(index)}
            aria-pressed={active}
            className="text-xs font-medium rounded-full px-3.5 py-1.5 transition-colors duration-150
              disabled:cursor-not-allowed disabled:opacity-40
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: active ? "var(--primary-soft)" : "transparent",
              color: active ? "var(--primary)" : "var(--ink-soft)",
              border: `1px solid ${active ? "var(--primary)" : "var(--line)"}`,
              outlineColor: "var(--focus-ring)",
            }}
          >
            {duration.label} · {duration.minutes}m
          </button>
        );
      })}
    </div>
  );
}

export const DurationSelector = memo(DurationSelectorBase);
