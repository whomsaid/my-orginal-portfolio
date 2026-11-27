# Agent notes

- SPA: React + Vite, `.jsx` only (no TypeScript). Routes in `src/App.jsx`; admin routes are lazy-loaded.
- `src/components/site/` public sections, `src/components/ui/` shared bits, `src/admin/` dashboard (layout, `nav.js`, `ui.jsx` kit, `pages/`).
- All content comes from `usePortfolio()` (`src/data/usePortfolio.js`), currently backed by `src/data/fixtures.js`. Only real facts the owner supplied belong there — never invent email, socials, education, skills or screenshots; UI shows empty states instead.
- Translatable content uses `{ en, rw, fr }`; read with `p()` from `useI18n()`. UI strings live in `src/i18n/{en,rw,fr}.js`.
- Theme via `data-theme` on `<html>`, CSS variables in `src/styles/index.css`, saved in localStorage `hx-theme`.
- Manual project status always wins; health checks may only downgrade `live` → `unavailable` (`resolveStatus`).
- Dashboard edits are in-memory (AdminLayout outlet context) until the backend exists.
- Backend must use Netlify Server + Netlify Database + Blobs (not MySQL). Next steps: see PLAN.md.
