/** Left-pads a number to two digits, e.g. 5 -> "05". */
export function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** Formats a seconds count as MM:SS. */
export function formatMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

/** Formats the current time as e.g. "9:41 AM" for log entries. */
export function formatClockTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/** Converts a minutes count into a "Xh Ym" / "Ym" display string. */
export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}
