import React from "react";
import BlogPostLayout from "../components/blog/BlogPostLayout";

function SoftwareEngineeringPost({ post }) {
  return (
    <BlogPostLayout
      title={post.title}
      date={post.date}
      lastUpdated={post.lastUpdated}
      category={post.category}
      readTime={post.readTime}
      heroImage={post.heroImage}
      updates={post.updates}
    >
      <p>
        The most valuable engineering work I have done in production was not flashy.
        It was reducing failure paths, tightening deployment checks, and eliminating
        random behavior that only appears at scale.
      </p>
      <p>
        I think of reliability as a product feature. If users cannot trust a feature
        to behave predictably, then the feature is incomplete no matter how polished
        the UI looks.
      </p>
      <p>
        A practical pattern that works for me is simple:
      </p>
      <ul>
        <li>Observe actual production failures.</li>
        <li>Patch the root issue and add a guardrail.</li>
        <li>Track whether the same class of issue reappears.</li>
      </ul>
      <p>
        Over time, this compounds. Teams spend less time firefighting and more time
        building useful features on top of stable foundations.
      </p>
    </BlogPostLayout>
  );
}

export default SoftwareEngineeringPost;
