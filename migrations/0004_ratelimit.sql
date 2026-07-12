CREATE TABLE IF NOT EXISTS RateLimit (
  key TEXT PRIMARY KEY,
  count INTEGER DEFAULT 1,
  reset_at TEXT NOT NULL
);

CREATE INDEX idx_ratelimit_reset ON RateLimit(reset_at);
