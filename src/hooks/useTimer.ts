import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TimerPhase } from "@/types";
import { getDuration } from "@/utils/constants";

interface UseTimerResult {
  durationIndex: number;
  secondsLeft: number;
  totalSeconds: number;
  running: boolean;
  complete: boolean;
  phase: TimerPhase;
  percentComplete: number;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: () => void;
  selectDuration: (index: number) => void;
}

/**
 * Encapsulates all countdown state and behavior for the timer board:
 * which preset is active, seconds remaining, and start/pause/reset controls.
 * Ticks once per second while running and stops cleanly at zero.
 */
export function useTimer(): UseTimerResult {
  const [durationIndex, setDurationIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(getDuration(0).minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((current) => {
          if (current <= 1) {
            window.clearInterval(intervalRef.current ?? undefined);
            setRunning(false);
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [running, secondsLeft > 0]);

  const totalSeconds = getDuration(durationIndex).minutes * 60;
  const complete = secondsLeft === 0;
  const percentComplete = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

  const phase: TimerPhase = complete
    ? "complete"
    : running
      ? "running"
      : secondsLeft === totalSeconds
        ? "idle"
        : "paused";

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const toggle = useCallback(() => setRunning((current) => !current), []);

  const reset = useCallback(() => {
    setRunning(false);
    setSecondsLeft(getDuration(durationIndex).minutes * 60);
  }, [durationIndex]);

  const selectDuration = useCallback(
    (index: number) => {
      if (running) return;
      setDurationIndex(index);
      setSecondsLeft(getDuration(index).minutes * 60);
    },
    [running],
  );

  return useMemo(
    () => ({
      durationIndex,
      secondsLeft,
      totalSeconds,
      running,
      complete,
      phase,
      percentComplete,
      start,
      pause,
      toggle,
      reset,
      selectDuration,
    }),
    [
      durationIndex,
      secondsLeft,
      totalSeconds,
      running,
      complete,
      phase,
      percentComplete,
      start,
      pause,
      toggle,
      reset,
      selectDuration,
    ],
  );
}
