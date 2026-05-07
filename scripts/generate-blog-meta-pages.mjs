#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { blogPostMeta } from "../src/data/blogPostMeta.mjs";

const siteUrl = "https://kellenstuart.com";
const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const baseHtml = fs.readFileSync(indexPath, "utf8");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const absoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
};

const removeExistingSeo = (html) =>
  html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="article:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, "");

const renderMetaTags = (post) => {
  const title = `${post.seo?.title || post.title} | Kellen Stuart`;
  const description = post.seo?.description || post.summary;
  const keywords = post.seo?.keywords || [];
  const url = `${siteUrl}/blog/${post.slug}/`;
  const imageUrl = absoluteUrl(post.heroImage?.src);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    author: {
      "@type": "Person",
      name: "Kellen Stuart",
      url: siteUrl,
    },
    mainEntityOfPage: url,
    image: imageUrl ? [imageUrl] : undefined,
    articleSection: post.category,
    keywords,
  };

  return [
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:site_name" content="Kellen Stuart" />`,
    imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : "",
    `<meta property="article:published_time" content="${escapeHtml(post.date)}" />`,
    `<meta property="article:modified_time" content="${escapeHtml(post.lastUpdated || post.date)}" />`,
    `<meta property="article:section" content="${escapeHtml(post.category)}" />`,
    ...keywords.map((keyword) => `<meta property="article:tag" content="${escapeHtml(keyword)}" />`),
    `<meta name="twitter:card" content="${imageUrl ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    imageUrl ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />` : "",
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
};

for (const post of blogPostMeta) {
  const title = `${post.seo?.title || post.title} | Kellen Stuart`;
  const description = post.seo?.description || post.summary;
  const postDir = path.join(distDir, "blog", post.slug);
  const postHtml = removeExistingSeo(baseHtml)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace("</head>", `    ${renderMetaTags(post)}\n  </head>`);

  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, "index.html"), postHtml);
}

console.log(`Generated ${blogPostMeta.length} static blog meta page${blogPostMeta.length === 1 ? "" : "s"}.`);
