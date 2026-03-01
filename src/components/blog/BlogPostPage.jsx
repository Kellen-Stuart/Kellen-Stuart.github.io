import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../data/blogPosts";

function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

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
