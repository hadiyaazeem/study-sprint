import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FlapDigitProps {
  char: string;
}

/**
 * A single split-flap departure-board tile. Each character change animates
 * as a vertical flip, echoing a physical flap display.
 */
function FlapDigitBase({ char }: FlapDigitProps) {
  return (
    <span
      className="relative inline-flex items-center justify-center overflow-hidden rounded-md sm:rounded-lg"
      style={{
        background: "var(--board)",
        color: "var(--board-digit)",
        width: "clamp(2.1rem, 6vw, 3.6rem)",
        height: "clamp(2.8rem, 8vw, 4.6rem)",
        boxShadow:
          "inset 0 -2px 0 rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.05)",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="font-mono font-semibold tabular-nums"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 2.6rem)",
            fontWeight: 600,
          }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export const FlapDigit = memo(FlapDigitBase);
