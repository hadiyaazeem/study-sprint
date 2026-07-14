import { memo } from "react";

type Tone = "ink" | "secondary" | "primary";

interface StatsCardProps {
  label: string;
  value: string;
  tone?: Tone;
}

const TONE_STYLE: Record<Tone, { bg: string; fg: string }> = {
  ink: { bg: "var(--surface-2)", fg: "var(--ink)" },
  secondary: { bg: "var(--secondary-soft)", fg: "var(--secondary)" },
  primary: { bg: "var(--primary-soft)", fg: "var(--primary)" },
};

/** A single stat tile (label + big mono value) used in the stats rail. */
function StatsCardBase({ label, value, tone = "ink" }: StatsCardProps) {
  const { bg, fg } = TONE_STYLE[tone];

  return (
    <div className="flex flex-col gap-0.5 rounded-xl px-4 py-3 min-w-[7.5rem]" style={{ background: bg }}>
      <span
        className="text-[0.7rem] uppercase tracking-wider"
        style={{ color: "var(--ink-soft)" }}
      >
        {label}
      </span>
      <span
        className="text-xl font-semibold font-mono tabular-nums"
        style={{ color: fg }}
      >
        {value}
      </span>
    </div>
  );
}

export const StatsCard = memo(StatsCardBase);
