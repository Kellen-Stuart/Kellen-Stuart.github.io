// Offline browser validation of the production build. No web server is started;
// every page/asset request is fulfilled from dist or blocked. Browser temporary
// files and screenshots stay inside dist. Run after npm run build.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");
await fs.access(path.join(dist, "index.html"));
const temporary = await fs.mkdtemp(path.join(dist, ".notation-check-"));
const origin = "http://jam.test";
let context;
try {
  context = await chromium.launchPersistentContext(
    path.join(temporary, "profile"),
    {
      headless: true,
      viewport: { width: 1280, height: 900 },
      env: { ...process.env, TMPDIR: temporary, XDG_CACHE_HOME: temporary },
    },
  );
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    const pathname = decodeURIComponent(url.pathname);
    const asset = pathname.startsWith("/assets/");
    const target = asset
      ? path.resolve(dist, `.${pathname}`)
      : path.join(dist, "index.html");
    if (!target.startsWith(`${dist}${path.sep}`)) return route.abort();
    const types = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".woff2": "font/woff2",
      ".svg": "image/svg+xml",
      ".png": "image/png",
    };
    const contentType = types[path.extname(target)];
    if (!contentType) return route.abort();
    try {
      await route.fulfill({ body: await fs.readFile(target), contentType });
    } catch {
      await route.abort();
    }
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${origin}/jam/alice-in-chains-rooster`);
  await page.waitForFunction(
    () => document.querySelectorAll(".jam-rhythm-staff svg").length === 5,
  );
  assert.equal(
    await page
      .locator(".jam-rhythm-staff svg")
      .evaluateAll((svgs) =>
        svgs.every(
          (svg) =>
            Math.abs(
              svg.getBoundingClientRect().height - svg.viewBox.baseVal.height,
            ) < 1,
        ),
      ),
    true,
    "The CSS height must match the fitted notation canvas.",
  );
  const bounds = await page
    .locator(".jam-rhythm-staff svg")
    .evaluateAll((svgs) =>
      svgs.flatMap((svg) => {
        const canvas = document.createElement("canvas").getContext("2d");
        // Music-font SVG text boxes include large blank ascenders/descenders.
        // Check the actual glyph ink independently with browser font metrics.
        return [...svg.querySelectorAll("text, path, rect, line")].map(
          (element) => {
            let box = element.getBBox();
            if (element.tagName === "text") {
              canvas.font = getComputedStyle(element).font;
              const metrics = canvas.measureText(element.textContent);
              box = {
                x:
                  Number(element.getAttribute("x")) -
                  metrics.actualBoundingBoxLeft,
                y:
                  Number(element.getAttribute("y")) -
                  metrics.actualBoundingBoxAscent,
                width:
                  metrics.actualBoundingBoxLeft +
                  metrics.actualBoundingBoxRight,
                height:
                  metrics.actualBoundingBoxAscent +
                  metrics.actualBoundingBoxDescent,
              };
            }
            return {
              x: box.x,
              y: box.y,
              right: box.x + box.width,
              bottom: box.y + box.height,
              width: svg.width.baseVal.value,
              height: svg.height.baseVal.value,
              top: svg.viewBox.baseVal.y,
              invalid: /NaN|Infinity/.test(svg.innerHTML),
            };
          },
        );
      }),
    );
  for (const box of bounds) {
    assert.equal(box.invalid, false, "SVG coordinates must be finite.");
    assert.ok(
      box.x >= -1 &&
        box.y >= box.top - 1 &&
        box.right <= box.width + 1 &&
        box.bottom <= box.top + box.height + 1,
      `Notation must fit its SVG: ${JSON.stringify(box)}`,
    );
  }
  await page.locator(".jam-reference-section").screenshot({
    path: path.join(dist, "jam-notation-desktop.png"),
    style: ".jam-scroll-controls { visibility: hidden; }",
  });
  const view = page.getByRole("group", {
    name: "Rhythm display for Bar 1 strum: F# to F#7add11",
    exact: true,
  });
  await view.getByRole("button", { name: "Count grid", exact: true }).click();
  assert.equal(await page.locator(".jam-strum-grid").count(), 1);
  await view.getByRole("button", { name: "Staff", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelectorAll(".jam-rhythm-staff svg").length === 5,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".jam-staff-scroll")].every(
      (element) => element.clientWidth <= 390,
    ),
  );
  await page.locator("#opening-strum").screenshot({
    path: path.join(dist, "jam-notation-mobile.png"),
    style: ".jam-scroll-controls { visibility: hidden; }",
  });
  assert.equal(
    await page.locator(".jam-rhythm-staff svg").count(),
    5,
    "Resizing must replace, not duplicate, notation.",
  );
  await page.emulateMedia({ media: "print" });
  assert.equal(await page.locator(".jam-reference-section").isVisible(), false);
  assert.equal(await page.locator("#quick-chart").isVisible(), true);
  await page.emulateMedia({ media: "screen" });
  await page.getByRole("link", { name: "Back to Jam", exact: true }).click();
  await page.waitForURL(`${origin}/jam`);
  await page.waitForFunction(
    () => document.querySelectorAll(".jam-rhythm-staff svg").length === 0,
  );
  assert.equal(await page.locator(".jam-rhythm-staff svg").count(), 0);
  assert.deepEqual(errors, []);
  console.log(
    "Passed: all five SVG staffs, glyph bounds, view switching, mobile overflow, resize cleanup, quick-chart-only printing, and navigation cleanup.",
  );
  console.log(
    "Screenshots: dist/jam-notation-desktop.png and dist/jam-notation-mobile.png",
  );
} finally {
  await context?.close();
  await fs.rm(temporary, { recursive: true, force: true });
}
