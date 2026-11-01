const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 5

// In-memory and per-instance: good enough to stop casual abuse. Swap for Upstash Redis for a global limit.
const hits = new Map<string, number[]>()

export function rateLimit(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent)
    return { allowed: false, retryAfter: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) }
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return { allowed: true, retryAfter: 0 }
}
