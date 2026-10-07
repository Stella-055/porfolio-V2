const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Simple in-memory sliding-window rate limiter, keyed by client IP.
export function rateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 2000) {
    for (const [k, v] of attempts) {
      if (!v.some((t) => now - t < WINDOW_MS)) attempts.delete(k);
    }
  }
  return true;
}
