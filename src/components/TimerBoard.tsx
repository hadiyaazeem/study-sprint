import { memo, useMemo } from "react";
import { FlapDigit } from "@/components/FlapDigit";
import { formatMMSS, pad } from "@/utils/time";

interface TimerBoardProps {
  secondsLeft: number;
}

/**
 * Renders the MM:SS countdown as a row of split-flap tiles. The whole board
 * carries a single `role="timer"` live region so screen readers announce
 * updates without re-reading every individual digit.
 */
function TimerBoardBase({ secondsLeft }: TimerBoardProps) {
  const minutes = pad(Math.floor(secondsLeft / 60));
  const seconds = pad(secondsLeft % 60);
  const chars = useMemo(() => [...minutes, ":", ...seconds], [minutes, seconds]);

  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5"
      role="timer"
      aria-live="polite"
      aria-label={`${formatMMSS(secondsLeft)} remaining, ${minutes} minutes ${seconds} seconds`}
    >
      {chars.map((char, index) =>
        char === ":" ? (
          <span
            key={`colon-${index}`}
            aria-hidden="true"
            style={{
              color: "var(--ink-soft)",
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              fontWeight: 700,
            }}
          >
            :
          </span>
        ) : (
          <FlapDigit key={`digit-${index}`} char={char} />
        ),
      )}
    </div>
  );
}

export const TimerBoard = memo(TimerBoardBase);
