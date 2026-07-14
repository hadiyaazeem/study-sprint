import type { TimerSession } from "@/types";

/** The three timer presets available on the board. */
export const DURATIONS: readonly TimerSession[] = [
  { label: "Sprint", minutes: 25 },
  { label: "Deep work", minutes: 50 },
  { label: "Short break", minutes: 5 },
];

/**
 * Safe accessor for a DURATIONS entry. Callers always pass an index derived
 * from DURATIONS itself (state initialized to 0, selection clamped to the
 * array's own indices), so this never actually falls back — the fallback
 * only satisfies `noUncheckedIndexedAccess` for TypeScript.
 */
const FALLBACK_DURATION: TimerSession = DURATIONS[0] as TimerSession;

export function getDuration(index: number): TimerSession {
  return DURATIONS[index] ?? FALLBACK_DURATION;
}

/** How long the simulated "Saving session…" spinner stays up, in ms. */
export const SAVE_DELAY_MS = 1100;

/** Probability that a simulated save fails, to exercise the error state. */
export const SAVE_FAILURE_RATE = 0.3;

export const THEME_STORAGE_KEY = "study-sprint:theme";
