# Study Sprint

A pixel-perfect, accessible, responsive focus-session timer built in React 18 + TypeScript. Recreates the provided Figma/mock reference exactly: a split-flap departure-board timer, an 8px spacing system, and a full light/dark token system.

## Overview

Study Sprint lets a student run a 25-minute Sprint, a 50-minute Deep Work block, or a 5-minute Short Break, track daily focus stats, and review a running log of today's sessions — complete with a simulated save flow (loading + occasional retryable failure) to demonstrate real async UI states.

## Features

- **Split-flap timer board** — MM:SS countdown rendered as individually animated flap tiles (Framer Motion).
- **Three session presets** — Sprint (25m), Deep work (50m), Short break (5m), swappable only while paused.
- **Start / Pause / Resume / Reset** controls with correct label states at every phase.
- **Animated progress bar** showing percent complete and current session type.
- **Stats rail** — Today's focus time, current streak, completed sprints; recomputed automatically from the log.
- **Today's log** — title, duration, start time, and status (Completed / Skipped / Failed) per entry, with an insertion animation.
- **Simulated save flow** — "Saving session…" spinner for ~1.1s, then a 30% chance of a retryable error via an accessible `role="alert"` banner.
- **Dark mode** — driven entirely by CSS custom properties (`[data-theme]`), persisted to `localStorage`, respects `prefers-color-scheme` on first load.
- **Full interactive states** — hover, focus-visible, active, disabled, and loading are implemented for every interactive element.
- **Accessibility-first markup** — semantic landmarks, `aria-live` timer region, `aria-pressed` toggles, skip link, visible focus rings, `prefers-reduced-motion` support.

## Technologies

- React 18 + TypeScript (strict mode, no `any`)
- Vite
- Tailwind CSS (layout/spacing utilities only — all color comes from CSS variables)
- Framer Motion (flap-digit flip, log-entry insertion)
- CSS Custom Properties for design tokens / theming

## Installation

```bash
npm install
npm run dev       # start local dev server at http://localhost:5173
npm run build     # type-check and produce a production build in dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint, including jsx-a11y rules
```

Requires Node 18+.

## Folder structure

```
src/
  components/
    Button.tsx           Shared pill button (variants, sizes, loading, disabled)
    TimerBoard.tsx        Composes FlapDigit tiles into the MM:SS display
    FlapDigit.tsx          Single animated split-flap tile
    ThemeToggle.tsx        Light/dark switch
    ProgressBar.tsx        Animated session-completion bar
    StatsCard.tsx           Stat tile (label + value + tone)
    LogEntry.tsx            Single row in Today's Log, with insertion animation
    StatusBadge.tsx         Status pill (Completed / Skipped / Failed)
    DurationSelector.tsx    Sprint / Deep work / Short break chooser
    ErrorBanner.tsx         Retryable save-failure alert
  hooks/
    useTimer.ts             Countdown state machine: start/pause/reset/select
    useSessionLog.ts        Log + derived stats + simulated save/retry flow
    useTheme.ts              Theme state, persistence, prefers-color-scheme
  utils/
    time.ts                 pad / formatMMSS / formatClockTime / formatDuration
    constants.ts             DURATIONS presets, save-delay/failure-rate, getDuration()
  types/
    index.ts                 TimerSession, LogEntry, Stats, Theme, ButtonProps, etc.
  styles/
    tokens.css               Light/dark CSS custom properties
  App.tsx
  main.tsx
  index.css
```

Logic (hooks), presentation (components), and utilities are kept in separate folders with no duplicated JSX — every card, badge, and button is a single reusable component.

## Accessibility improvements

- Semantic structure: `<header>`, `<main>`, `<section>` with `aria-labelledby` on the log section.
- Timer uses a single `role="timer"` `aria-live="polite"` region with a full-word label (`"04:32 remaining, 4 minutes 32 seconds"`) instead of forcing screen readers to parse each flap tile.
- All toggle-style controls (theme switch, duration presets) use `aria-pressed` rather than custom roles.
- A visually-hidden "Skip to content" link is the first focusable element.
- `:focus-visible` gets a 2px offset outline app-wide (not just on a few components), using a token (`--focus-ring`) that meets contrast in both themes.
- The save-failure banner uses `role="alert"` so it's announced immediately, and always pairs the error message with a Retry action rather than a dead end.
- All color pairs (text on surface, badges, buttons) were chosen from the provided token set to meet WCAG AA contrast in both light and dark themes.
- `prefers-reduced-motion: reduce` disables/shortens all transitions and animations, including the flap-digit flip and log insertion.

## Responsiveness

Built and tested at 375px (mobile), 768px (tablet), and 1440px (desktop):

- The hero + stats rail is a single column on mobile/tablet and switches to a `1.3fr / 1fr` two-column grid at the `lg` breakpoint — a real reflow, not a scaled-down layout.
- The progress bar is hidden below `sm` (matching the mock) since the timer digits and duration chips already communicate status at narrow widths.
- Flap-tile size and timer typography use `clamp()` so digits scale fluidly between breakpoints instead of jumping.
- Buttons and chips wrap (`flex-wrap`) rather than overflowing on narrow viewports.
- ## 📷 Preview

### Home
<img width="815" height="394" alt="image" src="https://github.com/user-attachments/assets/6502301b-4669-4209-a7dc-d17867afa9b5" />



### Dark Mode

<img width="803" height="384" alt="image" src="https://github.com/user-attachments/assets/caa47b9d-3507-4f92-a8bf-30309c3ac612" />


### Statistics

<img width="355" height="298" alt="image" src="https://github.com/user-attachments/assets/769365f4-8694-4ef3-b8b1-a5034df3e180" />


### Session History

<img width="785" height="211" alt="image" src="https://github.com/user-attachments/assets/20c1301c-4015-4f63-b359-3501ff131b9d" />

## Deployment

Any static host works since this is a standard Vite build:

```bash
npm run build
```

**Vercel:** `vercel --prod` (framework preset: Vite) or connect the repo in the dashboard — build command `npm run build`, output directory `dist`.

**Netlify:** connect the repo — build command `npm run build`, publish directory `dist`. Or drag-and-drop the `dist/` folder in the Netlify dashboard.

## Design decisions where the mock was ambiguous

- The mock's `Button` computed hover styles via inline `onMouseEnter`/`onMouseLeave` handlers; this build moves that to Tailwind's `hover:` classes for the same visual effect with less code and no risk of interfering with framer-motion's own transforms.
- Added a `failed` status to `SessionStatus` (only `done`/`skipped` existed in the mock) since the log's stated purpose includes completion status, and "Failed" is implied by the save-error flow.
- The mock's inline `syncError` banner had no dismiss/retry action beyond copy; this build adds an explicit **Retry** button so the error state is actually recoverable, per the task's error-state requirement.
- Streak count is presented as a static seed value (6 days) since there is no persisted historical data model in scope for this task — the log itself only represents "today."
