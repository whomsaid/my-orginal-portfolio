# Hakizimana Xavine Portfolio — Plan

1. **Public portfolio (done)** — React + Vite + Tailwind + Framer Motion site: navbar (theme switch, EN/RW/FR language menu, mobile menu, active indicators), hero with availability, live Africa/Kigali clock, status widget, identity cards, about, skills (7 categories, empty states), projects with screenshot empty states + detail modal, services, research, education, contact (validated form → WhatsApp, both +250 numbers), footer, SEO (meta, OG, favicon, sitemap, robots).
2. **Admin dashboard UI (done, preview workspace)** — /admin with full 17-item sidebar, overview stats, project CRUD/reorder/feature/status with confirm dialogs, image upload with type/size validation and preview, messages inbox, descriptive screens for the other sections. Changes live in memory only.
3. **Backend + database (next)** — Netlify Server (Express) at netlify/server/index.mjs, Netlify Database tables for all content, `/api/public/portfolio` replacing src/data/fixtures.js in usePortfolio().
4. **Auth & security** — admin login (bcrypt, httpOnly session cookie), seeded first admin, auth middleware, rate limiting, validation.
5. **Uploads** — screenshots, covers, CV and photo stored in Netlify Blobs, URLs in the database.
6. **Contact messages** — store form submissions server-side, list/read/delete in dashboard.
7. **Health checks** — scheduled function pinging project URLs, cached results, last-check times on cards.
8. **Remaining editors** — profile, about, skills, services, research, education, socials, CV, appearance, translations, settings.
