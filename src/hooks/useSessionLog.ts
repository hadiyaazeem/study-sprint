import { useCallback, useMemo, useState } from "react";
import type { LogEntry, Stats } from "@/types";
import { SAVE_DELAY_MS, SAVE_FAILURE_RATE } from "@/utils/constants";
import { formatClockTime } from "@/utils/time";

const INITIAL_LOG: LogEntry[] = [
  {
    id: "seed-1",
    title: "Deep work — Bison grammar",
    duration: 50,
    startTime: "9:10 AM",
    status: "completed",
  },
  {
    id: "seed-2",
    title: "Sprint — SHAP write-up",
    duration: 25,
    startTime: "8:20 AM",
    status: "skipped",
  },
];

interface UseSessionLogResult {
  log: LogEntry[];
  stats: Stats;
  saving: boolean;
  saveError: boolean;
  saveSession: (title: string, minutes: number, onSaved?: () => void) => void;
  retry: () => void;
  dismissError: () => void;
}

/**
 * Owns Today's Log and the derived stats rail, plus the simulated
 * save-to-log flow: a ~1s loading state followed by an occasional
 * (30%) failure that surfaces a retryable error banner.
 */
export function useSessionLog(): UseSessionLogResult {
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [pending, setPending] = useState<{ title: string; minutes: number; onSaved?: () => void } | null>(
    null,
  );

  const commitSave = useCallback(
    (title: string, minutes: number, onSaved?: () => void) => {
      setSaving(true);
      setSaveError(false);
      setPending({ title, minutes, onSaved });

      window.setTimeout(() => {
        setSaving(false);
        const failed = Math.random() < SAVE_FAILURE_RATE;
        if (failed) {
          setSaveError(true);
          return;
        }
        setLog((current) => [
          {
            id: `${Date.now()}`,
            title,
            duration: minutes,
            startTime: formatClockTime(),
            status: "completed",
          },
          ...current,
        ]);
        setPending(null);
        onSaved?.();
      }, SAVE_DELAY_MS);
    },
    [],
  );

  const saveSession = useCallback(
    (title: string, minutes: number, onSaved?: () => void) => commitSave(title, minutes, onSaved),
    [commitSave],
  );

  const retry = useCallback(() => {
    if (!pending) return;
    commitSave(pending.title, pending.minutes, pending.onSaved);
  }, [pending, commitSave]);

  const dismissError = useCallback(() => {
    setSaveError(false);
    setPending(null);
  }, []);

  const stats: Stats = useMemo(() => {
    const completedEntries = log.filter((entry) => entry.status === "completed");
    return {
      focusMinutesToday: completedEntries.reduce((sum, entry) => sum + entry.duration, 0),
      currentStreakDays: 6,
      completedSprints: completedEntries.length,
    };
  }, [log]);

  return { log, stats, saving, saveError, saveSession, retry, dismissError };
}
