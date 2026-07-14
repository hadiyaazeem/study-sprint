/** The two supported color schemes, driven entirely by CSS custom properties. */
export type Theme = "light" | "dark";

/** A selectable timer preset — Sprint, Deep work, or Short break. */
export interface TimerSession {
  /** Display label, e.g. "Sprint" */
  label: string;
  /** Session length in minutes */
  minutes: number;
}

/** Outcome of a completed or abandoned session. */
export type SessionStatus = "completed" | "skipped" | "failed";

/** A single row in Today's Log. */
export interface LogEntry {
  /** Stable identifier used as the React key and for list animations */
  id: string;
  /** What the person was working on, e.g. "Deep work — Bison grammar" */
  title: string;
  /** Session length in minutes */
  duration: number;
  /** Human-readable clock time the session started, e.g. "9:10 AM" */
  startTime: string;
  /** Final outcome of the session */
  status: SessionStatus;
}

/** Aggregate stats shown in the stats rail. */
export interface Stats {
  /** Total focused minutes accumulated today */
  focusMinutesToday: number;
  /** Consecutive days with at least one completed session */
  currentStreakDays: number;
  /** Number of sprints (any preset) completed today */
  completedSprints: number;
}

/** Visual variants a Button can render. */
export type ButtonVariant = "primary" | "ghost" | "danger";

/** Sizes a Button can render at. */
export type ButtonSize = "sm" | "md" | "lg";

/** Props accepted by the shared Button component. */
export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  /** Accessible name override, for icon-only or ambiguous labels */
  ariaLabel?: string;
  className?: string;
}

/** Live phase of the timer, derived from running/secondsLeft state. */
export type TimerPhase = "idle" | "running" | "paused" | "complete";
