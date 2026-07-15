# Standalone Invite App

This project is now set up as a normal Vite + React app that can be hosted on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel as a Vite project.
3. Use the default build command: `npm run build`.
4. Use the default output directory: `dist`.

A `vercel.json` rewrite is included so direct visits to routes like `/celebration`, `/login`, and `/reset-password` still load correctly.

## What changed

- Removed the Base44 Vite plugin.
- Replaced the Base44 auth layer with a local browser-only auth simulation so the existing login/register/reset pages still function without a backend.
- Kept the invite and celebration experience intact.
