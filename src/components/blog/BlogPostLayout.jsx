import React from "react";
import { Link } from "react-router-dom";
import BlogImage from "./BlogImage";

const formatIsoDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const safeDate = new Date(year, month - 1, day);

  return safeDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function BlogPostLayout({
  title,
  date,
  lastUpdated,
  category,
  readTime,
  heroImage,
  updates,
  children,
}) {
  const hasUpdates = Array.isArray(updates) && updates.length > 0;
  const showLastUpdated = Boolean(lastUpdated && lastUpdated !== date);

  return (
    <div className="container mt-4 mb-5 blog-page">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-9 col-md-10 col-sm-12 col-12">
          <Link to="/blog" className="link blog-back-link">
            Back to Blog
          </Link>
          <article className="blog-post-shell">
            <header className="mb-4">
              <p className="blog-post-meta mb-2">
                {category}
                {" | "}
                {`Published ${formatIsoDate(date)}`}
                {readTime ? ` | ${readTime}` : ""}
              </p>
              {showLastUpdated && (
                <p className="blog-post-meta blog-post-updated mb-2">
                  {`Last updated ${formatIsoDate(lastUpdated)}`}
                </p>
              )}
              <h1 className="mb-0">{title}</h1>
            </header>
            {hasUpdates && (
              <section className="blog-updates mb-4" aria-label="Post updates">
                <h2 className="h6 blog-updates-heading mb-2">Updates</h2>
                <ul className="blog-updates-list mb-0">
                  {updates.map((updateItem) => (
                    <li key={`${updateItem.date}-${updateItem.note}`}>
                      <span className="blog-updates-date">
                        {formatIsoDate(updateItem.date)}
                      </span>
                      {": "}
                      {updateItem.note}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {heroImage?.src && (
              <BlogImage
                src={heroImage.src}
                alt={heroImage.alt || ""}
                caption={heroImage.caption}
              />
            )}
            <section className="blog-post-content">{children}</section>
          </article>
        </div>
      </div>
    </div>
  );
}

export default BlogPostLayout;
