import { useCallback, useMemo } from "react";
import { Button } from "@/components/Button";
import { TimerBoard } from "@/components/TimerBoard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressBar } from "@/components/ProgressBar";
import { StatsCard } from "@/components/StatsCard";
import { LogEntry } from "@/components/LogEntry";
import { DurationSelector } from "@/components/DurationSelector";
import { ErrorBanner } from "@/components/ErrorBanner";
import { useTheme } from "@/hooks/useTheme";
import { useTimer } from "@/hooks/useTimer";
import { useSessionLog } from "@/hooks/useSessionLog";
import { DURATIONS, getDuration } from "@/utils/constants";
import { formatDuration } from "@/utils/time";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const timer = useTimer();
  const { log, stats, saving, saveError, saveSession, retry } = useSessionLog();

  const activeDuration = getDuration(timer.durationIndex);

  const heading = timer.complete
    ? "Sprint complete"
    : timer.running
      ? "In progress"
      : "Ready when you are";

  const primaryLabel = timer.running
    ? "Pause"
    : timer.secondsLeft === timer.totalSeconds
      ? `Start ${activeDuration.label.toLowerCase()}`
      : "Resume";

  const handleSave = useCallback(() => {
    saveSession(`${activeDuration.label} — untitled task`, activeDuration.minutes, timer.reset);
  }, [saveSession, activeDuration, timer.reset]);

  const resetDisabled = timer.secondsLeft === timer.totalSeconds && !timer.running;

  const statCards = useMemo(
    () => [
      { label: "Today", value: formatDuration(stats.focusMinutesToday), tone: "primary" as const },
      { label: "Streak", value: `${stats.currentStreakDays} days`, tone: "secondary" as const },
      { label: "Sprints", value: String(stats.completedSprints), tone: "ink" as const },
    ],
    [stats],
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-lg focus:px-4 focus:py-2"
        style={{ background: "var(--surface)", color: "var(--ink)" }}
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-8 sm:py-12 font-sans">
        <header className="flex items-center justify-between mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--primary)" }}
            />
            <span
              className="text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--ink-soft)" }}
            >
              Study Sprint
            </span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <main id="main-content">
          <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 sm:gap-8 mb-10">
            <div className="rounded-2xl p-6 sm:p-9" style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }}>
              <h1
                className="mb-1 font-display"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {heading}
              </h1>
              <p className="text-sm mb-6 sm:mb-8" style={{ color: "var(--ink-soft)" }}>
                {activeDuration.label} · {activeDuration.minutes} minutes, heads down.
              </p>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <TimerBoard secondsLeft={timer.secondsLeft} />
                <ProgressBar percentComplete={timer.percentComplete} complete={timer.complete} />
              </div>

              <DurationSelector
                durations={DURATIONS}
                activeIndex={timer.durationIndex}
                disabled={timer.running}
                onSelect={timer.selectDuration}
              />

              <div className="flex flex-wrap items-center gap-3">
                {!timer.complete ? (
                  <>
                    <Button variant="primary" size="lg" onClick={timer.toggle}>
                      {primaryLabel}
                    </Button>
                    <Button variant="ghost" onClick={timer.reset} disabled={resetDisabled}>
                      Reset
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" size="lg" loading={saving} onClick={handleSave}>
                      {saving ? "Saving session…" : "Save to log"}
                    </Button>
                    <Button variant="ghost" onClick={timer.reset}>
                      Discard
                    </Button>
                  </>
                )}
              </div>

              {saveError && <ErrorBanner onRetry={retry} />}
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl p-5 sm:p-6 flex flex-wrap gap-3"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }}
              >
                {statCards.map((card) => (
                  <StatsCard key={card.label} label={card.label} value={card.value} tone={card.tone} />
                ))}
              </div>
              <div
                className="rounded-2xl p-5 sm:p-6 text-sm leading-relaxed"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow)", color: "var(--ink-soft)" }}
              >
                <p style={{ color: "var(--ink)" }} className="font-medium mb-1.5">
                  Board tip
                </p>
                Sprints under 30 minutes save automatically to today&rsquo;s log — no need to name them until you
                review.
              </div>
            </div>
          </section>

          <section
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }}
            aria-labelledby="log-heading"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 id="log-heading" className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ink)" }}>
                Today&rsquo;s log
              </h2>
              <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
                {log.length} {log.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <ul>
              {log.map((entry) => (
                <LogEntry key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
