import { memo } from "react";
import { Button } from "@/components/Button";

interface ErrorBannerProps {
  onRetry: () => void;
}

/**
 * Accessible error banner shown when saving a session fails. Uses
 * role="alert" so it's announced immediately, and offers a Retry action
 * rather than just describing the failure.
 */
function ErrorBannerBase({ onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm"
      style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
    >
      <span aria-hidden="true" className="mt-0.5">
        ⚠
      </span>
      <span className="flex-1">
        Couldn&rsquo;t save your session — the connection dropped. Your time isn&rsquo;t lost; try saving again.
      </span>
      <Button variant="danger" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

export const ErrorBanner = memo(ErrorBannerBase);
