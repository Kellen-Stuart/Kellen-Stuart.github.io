import React from "react";
import { Link } from "react-router-dom";
import { getPostsGroupedByCategory } from "../../data/blogPosts";

const formatIsoDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const safeDate = new Date(year, month - 1, day);

  return safeDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function BlogIndex() {
  const groupedPosts = getPostsGroupedByCategory();

  return (
    <div className="container mt-4 mb-5 blog-page">
      <div className="row justify-content-center">
        <div className="col-xl-9 col-lg-10 col-md-11 col-sm-12 col-12">
          <header className="mb-4">
            <h1 className="mb-2">Personal Blog</h1>
            <p className="text-muted blog-intro mb-0">
              Equal parts software, guitars, and "this seemed smart at 1 a.m."
            </p>
          </header>

          {groupedPosts.map(({ category, posts }) => (
            <section key={category} className="blog-category-section">
              <h2 className="blog-category-heading">{category}</h2>
              <div className="row g-3">
                {posts.map((post) => (
                  <div className="col-md-6" key={post.slug}>
                    <article className="blog-post-card h-100">
                      <p className="blog-post-meta mb-2">
                        {`Published ${formatIsoDate(post.date)}`}
                        {post.lastUpdated && post.lastUpdated !== post.date
                          ? ` | Updated ${formatIsoDate(post.lastUpdated)}`
                          : ""}
                        {" | "}
                        {post.readTime}
                      </p>
                      <h3 className="h5 mb-2">{post.title}</h3>
                      <p className="mb-3">{post.summary}</p>
                      <Link
                        className="link stretched-link blog-read-link"
                        to={`/blog/${post.slug}`}
                        aria-label={`Read post: ${post.title}`}
                      >
                        Read post
                      </Link>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogIndex;
