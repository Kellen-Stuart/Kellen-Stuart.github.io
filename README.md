# Kellen Stuart Portfolio

This repository contains a React 19 single-page portfolio/resume app built with Vite.

## Requirements

- Node.js 20.x (project pin: `20.19.6` in `.nvmrc`)
- npm

## Scripts

### Development

- `npm run dev` (or `npm start`): start the local Vite dev server at `http://localhost:5173`
- `npm run build`: create a production build in `dist/` and copy `dist/index.html` to `dist/404.html`
- `npm run preview`: preview the production build locally

### Deploy

- `npm run predeploy`: run the production build step
- `npm run deploy`: publish `dist/` using `gh-pages` (runs `predeploy` automatically)

## Install

```bash
npm install
```

## Notes

- Static assets are served from `public/`.
- Routing is handled client-side with `react-router-dom`.
- The build includes a `404.html` copy for static hosting fallback behavior.
