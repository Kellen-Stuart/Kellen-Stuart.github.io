# Kellen Stuart Portfolio

This repository contains a React 19 single-page portfolio/resume app built with Vite.

## Requirements

- Node.js 24.x (project pin: `24.16.0` in `.nvmrc`)
- npm
- Git
- Optional: ImageMagick, for stripping image metadata when the media metadata check fails
- Optional: metaflac, for stripping FLAC metadata when the media metadata check fails

## Scripts

### Development

- `npm run dev` (or `npm start`): start the local Vite dev server at `http://localhost:5173`
- `npm run build`: create a production build in `dist/` and copy `dist/index.html` to `dist/404.html`
- `npm run preview`: preview the production build locally
- `npm run check:media-metadata`: check tracked and untracked media files for image and FLAC metadata
- `npm run check:image-metadata`: compatibility alias for `npm run check:media-metadata`
- `npm run setup:hooks`: configure this local clone to use the repo's Git hooks from `.githooks/`
- `npm run generate:resume-pdf`: use Playwright + headless Chromium to render `/print-resume?mode=pdf` into `dist/Kellen-Stuart-Resume.pdf` (requires `dist/` to exist)

### Deploy

- `npm run predeploy`: run the production build and generate `dist/Kellen-Stuart-Resume.pdf`
- `npm run deploy`: publish `dist/` using `gh-pages` (runs `predeploy` automatically)

## Install

```bash
npm install
npm run setup:hooks
npm run check:media-metadata
```

## Notes

- Static assets are served from `public/`.
- Routing is handled client-side with `react-router`.
- The build includes a `404.html` copy for static hosting fallback behavior.
- If Playwright browser binaries are missing in your environment, run `npx playwright install chromium`.
- On Linux runners/workstations missing shared libraries, run `npx playwright install --with-deps chromium`.

## Image Metadata Guard

The repo includes a pre-push hook at `.githooks/pre-push` that checks media metadata before anything is pushed.

Fresh clones need one local Git setting because `core.hooksPath` is not committed with the repo:

```bash
npm run setup:hooks
```

The hook itself only requires Git and Node. ImageMagick is optional but recommended because it is the easiest way to clean an image that fails the check. `metaflac` is optional but recommended for cleaning FLAC files.

Typical cleanup commands:

```bash
magick input.png -strip output.png
magick input.webp -strip output.webp
magick input.jpg -auto-orient -strip output.jpg
metaflac --dont-use-padding --remove-all input.flac
```

On ImageMagick 6, use `convert` instead of `magick`.

## Blog Photos

Blog posts support both hero photos and inline photos.

1. Put image files in `public/blog/<post-slug>/`, for example `public/blog/my-post/trail.webp`.
2. Add an optional `heroImage` object in `src/data/blogPosts.js`:

```js
heroImage: {
  src: "/blog/my-post/trail.webp",
  alt: "Backpacking trail at sunrise",
  caption: "Day 2, near treeline.",
}
```

3. To insert inline photos inside a post component, import and use `BlogImage`:

```jsx
import BlogImage from "../components/blog/BlogImage";

<BlogImage
  src="/blog/my-post/camp.webp"
  alt="Camp setup near an alpine lake"
  caption="Final campsite before summit day."
/>
```

## Blog Updates

Posts can track publish date, last-updated date, and an optional update log.

1. Add `lastUpdated` and `updates` in `src/data/blogPosts.js`:

```js
{
  slug: "my-post",
  title: "My Post",
  date: "2026-03-01",
  lastUpdated: "2026-06-15",
  updates: [
    { date: "2026-04-03", note: "Added new photos." },
    { date: "2026-06-15", note: "Added audio recordings and notes." },
  ],
}
```

2. The blog template will automatically render:
- `Published <date>`
- `Last updated <date>` (when different from publish date)
- an `Updates` section when `updates` has entries

## Blog Recordings

To embed recordings in a post, use `BlogAudio`:

```jsx
import BlogAudio from "../components/blog/BlogAudio";

<BlogAudio
  src="/blog/my-post/riff-demo-1.mp3"
  title="Riff Demo 1"
  caption="LA30BL, Sabbra Cadabra at 18V, C# standard."
/>
```

Store audio files under `public/blog/<post-slug>/` so they are available as static assets.

## Local PDF Download Testing

To make the `Download PDF` button return a real PDF locally:

1. Install Playwright Chromium: `npx playwright install chromium`
2. Build + generate the PDF artifact: `npm run predeploy`
3. Serve from `dist/`: `npm run preview`
4. Test `Download PDF` in the preview app

`npm run dev` is not sufficient for this test because it does not serve the generated `dist/Kellen-Stuart-Resume.pdf` artifact.
