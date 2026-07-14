-- Site Settings (key-value store for admin-configurable branding & SEO)
CREATE TABLE IF NOT EXISTS SiteSetting (
  key TEXT PRIMARY KEY,
  value TEXT,
  updatedAt TEXT DEFAULT (datetime('now'))
);
