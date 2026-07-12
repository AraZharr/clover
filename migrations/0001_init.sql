CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT
);

CREATE TABLE IF NOT EXISTS Page (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT DEFAULT '{}',
  published INTEGER DEFAULT 1,
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS BlogArticle (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '{}',
  published INTEGER DEFAULT 0,
  image TEXT,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_blog_published ON BlogArticle(published, createdAt);
CREATE INDEX idx_page_slug ON Page(slug);
CREATE INDEX idx_blog_slug ON BlogArticle(slug);
