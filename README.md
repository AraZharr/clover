# AraZhar — Developer & Creator

> Developer & kreator digital Indonesia. Membangun solusi web, bot, dan automation yang berdampak.

---

## Tentang

Saya AraZhar — seorang developer yang fokus pada pengembangan web, bot Telegram, dan berbagai solusi digital lainnya. Filosofi saya sederhana: bangun sesuatu yang fungsional, efisien, dan user-friendly.

Saya percaya teknologi harus bekerja untuk manusia, bukan sebaliknya. Setiap project yang saya bangun dimulai dari satu pertanyaan: *bagaimana cara membuat ini lebih mudah?*

Terbiasa bekerja dengan JavaScript, Next.js, dan ekosistem open source. Senang bereksperimen dengan hal baru dan membangun tools yang menyelesaikan masalah nyata.

---

## Skills

| Teknologi | Level |
|-----------|-------|
| JavaScript / TypeScript | ████████░░ 85% |
| React / Next.js | ████████░░ 80% |
| Tailwind CSS | ████████░░ 85% |
| Node.js | ███████░░░ 75% |
| Python | ██████░░░░ 60% |
| Cloudflare Workers + D1 | ███████░░░ 70% |

**Core stack**: JavaScript fullstack — dari UI sampai backend, dari bot sampai automation.

---

## Projects

### Clover Bot
Bot Telegram multi-provider AI dengan memori dan command routing. Dibangun dengan Node.js, terintegrasi dengan Gemini AI dan Supabase untuk penyimpanan data.

- **Tech**: Node.js, Gemini AI, Supabase
- **Fitur**: Multi-provider AI, memory system, command routing

### Portfolio Website (ini)
Website portfolio multi-halaman dengan admin dashboard, blog engine, dan AI customer service chatbot. Dibangun dengan Next.js 15 dan deployed ke Cloudflare Workers.

- **Tech**: Next.js 15, Tailwind CSS v4, Cloudflare Workers + D1, OpenNext
- **Fitur**: Admin CRUD (pages, blog, social links), blog engine (TipTap editor), AI chatbot (Gemini + Groq auto-fallback), WhatsApp forward, SEO optimized (JSON-LD, sitemap, Open Graph)

### Eksperimen Lainnya
Berbagai project eksperimen dan tools yang sedang dikembangkan — mulai dari automation, bot utilities, sampai web apps. Selalu dalam proses belajar dan iterasi.

---

## Layanan

Saya bisa membantu Anda dalam:

- **Web Development** — Landing page, portfolio, web app, dari concept sampai deployment
- **Telegram Bot** — Bot AI, automation, scheduling, multi-provider
- **Automation & Integration** — API integration, workflow automation, data pipeline
- **Konsultasi Digital** — Review kebutuhan teknologi, rekomendasi solusi, planning

Tertarik kerja sama? Hubungi saya langsung melalui social media yang tersedia di bawah.

---

## Kontak

| Channel | Link |
|---------|------|
| WhatsApp | [Chat langsung](https://wa.me/) |
| Email | [Hubungi via admin](https://github.com/AraZhar) |
| GitHub | [github.com/AraZhar](https://github.com/AraZhar) |
| Instagram | [@arazhar](https://instagram.com/arazhar) |
| TikTok | [@arazhar](https://tiktok.com/@arazhar) |
| Telegram | [@arazhar](https://t.me/arazhar) |

> Social links dikelola via admin dashboard. Login ke `/admin` untuk mengelola link yang aktif.

---

## Website Ini

Portfolio ini dibangun dengan:

- [Next.js 15](https://nextjs.org/) — App Router, React Server Components
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling (PostCSS plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) — Edge deployment
- [Cloudflare D1](https://developers.cloudflare.com/d1/) — SQLite at the edge
- [OpenNext](https://opennext.js.org/cloudflare) — Next.js adapter untuk Cloudflare
- [jose](https://github.com/panva/jose) — JWT authentication
- [TipTap](https://tiptap.dev/) — Rich text editor untuk blog
- [Framer Motion](https://www.framer.com/motion/) — Animasi
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Gemini AI](https://ai.google.dev/) + [Groq](https://groq.com/) — AI chatbot dengan auto-fallback
- [Lucide](https://lucide.dev/) — Icons

**SEO**: JSON-LD structured data, Open Graph, dynamic sitemap, robots.txt, per-page metadata.

**AI Chatbot**: Customer service widget dengan Gemini + Groq auto-fallback, restricted knowledge base, WhatsApp forward.

**Admin Dashboard**: Login, CRUD pages, blog articles (TipTap editor), social links management.

---

## Quick Start

```bash
# Clone
git clone https://github.com/AraZhar/clover.git
cd clover

# Install
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan values yang sesuai

# Development
npm run dev

# Build & Preview (Cloudflare)
npm run preview
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_URL` | Yes | Base URL website |
| `NEXT_PUBLIC_WA_NUMBER` | No | WhatsApp number (format: 628xxx) |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `GROQ_API_KEY` | Yes | Groq API key |
| `GEMINI_MODEL` | No | Gemini model (default: `gemini-2.0-flash`) |
| `GROQ_MODEL` | No | Groq model (default: `llama-3.3-70b-versatile`) |

---

## License

MIT

---

*Built with care by AraZhar.*
