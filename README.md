# Kellen Stuart Portfolio

This repository contains a React 19 single-page portfolio/resume app built with Vite.

## Requirements

- Node.js `20.11.1` (see `.nvmrc`)
- npm

## Scripts

- `npm run dev` (or `npm start`): start the local Vite dev server
- `npm run build`: produce a production build in `dist/` and copy `dist/index.html` to `dist/404.html`
- `npm run preview`: preview the production build locally
- `npm run deploy`: deploy `dist/` using `gh-pages`

## Install

```bash
npm install
```

## Notes

- Static assets are served from `public/`.
- Routing is handled client-side with `react-router-dom`.
- The build includes a `404.html` copy for static hosting fallback behavior.
