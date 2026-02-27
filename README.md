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
- `npm run generate:resume-pdf`: use Playwright + headless Chromium to render `/print-resume?mode=pdf` into `dist/Kellen-Stuart-Resume.pdf` (requires `dist/` to exist)

### Deploy

- `npm run predeploy`: run the production build and generate `dist/Kellen-Stuart-Resume.pdf`
- `npm run deploy`: publish `dist/` using `gh-pages` (runs `predeploy` automatically)

## Install

```bash
npm install
```

## Notes

- Static assets are served from `public/`.
- Routing is handled client-side with `react-router-dom`.
- The build includes a `404.html` copy for static hosting fallback behavior.
- If Playwright browser binaries are missing in your environment, run `npx playwright install chromium`.
- On Linux runners/workstations missing shared libraries, run `npx playwright install --with-deps chromium`.

## Local PDF Download Testing

To make the `Download PDF` button return a real PDF locally:

1. Install Playwright Chromium: `npx playwright install chromium`
2. Build + generate the PDF artifact: `npm run predeploy`
3. Serve from `dist/`: `npm run preview`
4. Test `Download PDF` in the preview app

`npm run dev` is not sufficient for this test because it does not serve the generated `dist/Kellen-Stuart-Resume.pdf` artifact.
