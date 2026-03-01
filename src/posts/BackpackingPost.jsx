import React from "react";
import BlogPostLayout from "../components/blog/BlogPostLayout";

function BackpackingPost({ post }) {
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
        I use the same backpacking checklist for every trip, then adjust only what
        changes with weather, distance, and terrain. It is simple, but it prevents
        most avoidable mistakes.
      </p>
      <p>
        A checklist helps me in three ways:
      </p>
      <ul>
        <li>I do not forget critical items like water treatment or layers.</li>
        <li>I avoid packing duplicate gear that adds unnecessary weight.</li>
        <li>I can prep faster because decisions are mostly pre-made.</li>
      </ul>
      <p>
        I also do a final "pack and walk" test around the neighborhood before long
        trips. A 15-minute test usually reveals issues like poor weight balance or
        a missing item before I am on the trail.
      </p>
    </BlogPostLayout>
  );
}

export default BackpackingPost;
