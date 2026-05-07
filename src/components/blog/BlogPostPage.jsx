import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../data/blogPosts";

const siteUrl = "https://kellenstuart.com";
const defaultTitle = "Kellen Stuart - Home";
const defaultDescription =
  "Kellen Stuart's professional resume and portfolio. Learn about Kellen's skills, experience, and projects.";

const absoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
};

const setMetaTag = (attribute, value, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const clearPostSeoTags = () => {
  [
    'meta[name="keywords"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:url"]',
    'meta[property="og:site_name"]',
    'meta[property="og:image"]',
    'meta[property="article:published_time"]',
    'meta[property="article:modified_time"]',
    'meta[property="article:section"]',
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
  ].forEach((selector) => document.head.querySelector(selector)?.remove());

  document.getElementById("blog-post-json-ld")?.remove();
};

const setJsonLd = (post, title, description, url, imageUrl) => {
  let element = document.getElementById("blog-post-json-ld");
  if (!element) {
    element = document.createElement("script");
    element.id = "blog-post-json-ld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify({
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
    keywords: post.seo?.keywords,
  });
};

const resetSeo = () => {
  document.title = defaultTitle;
  setMetaTag("name", "description", defaultDescription);
  setMetaTag("name", "author", "Kellen Stuart");
  setCanonical(siteUrl);
  clearPostSeoTags();
};

const usePostSeo = (post) => {
  useEffect(() => {
    clearPostSeoTags();

    if (!post) {
      document.title = "Post Not Found | Kellen Stuart";
      setMetaTag("name", "description", "The requested blog post was not found.");
      return resetSeo;
    }

    const title = `${post.seo?.title || post.title} | Kellen Stuart`;
    const description = post.seo?.description || post.summary;
    const keywords = post.seo?.keywords?.join(", ");
    const url = `${siteUrl}/blog/${post.slug}/`;
    const imageUrl = absoluteUrl(post.heroImage?.src);

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("name", "author", "Kellen Stuart");
    setMetaTag("name", "keywords", keywords);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "article");
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:site_name", "Kellen Stuart");
    setMetaTag("property", "article:published_time", post.date);
    setMetaTag("property", "article:modified_time", post.lastUpdated || post.date);
    setMetaTag("property", "article:section", post.category);
    setMetaTag("name", "twitter:card", imageUrl ? "summary_large_image" : "summary");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    if (imageUrl) {
      setMetaTag("property", "og:image", imageUrl);
      setMetaTag("name", "twitter:image", imageUrl);
    }
    setCanonical(url);
    setJsonLd(post, title, description, url, imageUrl);

    return resetSeo;
  }, [post]);
};

function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  usePostSeo(post);

  if (!post) {
    return (
      <div className="container mt-4 mb-5 blog-page">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12">
            <h1 className="h3 mb-3">Post Not Found</h1>
            <p className="mb-3">
              The post you requested does not exist or has not been published yet.
            </p>
            <Link to="/blog" className="link">
              Return to Blog Index
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const PostComponent = post.Component;
  return <PostComponent post={post} />;
}

export default BlogPostPage;
