# TROPS IMMO

Marketing website for TROPS IMMO, a luxury real estate developer — showcasing residential projects, apartment floor plans, and a contact channel for private consultations.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router, and Motion.

## Getting started

**Prerequisites:** Node.js

```
npm install
```

Copy `.env.example` to `.env` and fill in the values:

- `VITE_SITE_URL` — the production domain (used for canonical URLs and Open Graph tags)
- `VITE_WEB3FORMS_ACCESS_KEY` — access key from [web3forms.com](https://web3forms.com), required for the contact form to actually send messages

```
npm run dev
```

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — TypeScript type check

## Deployment

Static build output in `dist/` can be hosted anywhere that serves static files. `public/_redirects` (Netlify) and `public/.htaccess` (Apache) are included so client-side routes work correctly on page refresh.

Remember to set `VITE_WEB3FORMS_ACCESS_KEY` (and `VITE_SITE_URL`) as environment variables on the hosting platform if it runs the build itself — Vite bakes them into the bundle at build time.
