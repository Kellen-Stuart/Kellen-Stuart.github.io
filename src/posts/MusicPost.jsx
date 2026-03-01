import React from "react";
import BlogPostLayout from "../components/blog/BlogPostLayout";

function MusicPost({ post }) {
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
        I rebuilt my guitar practice routine this year to favor consistency over
        long sessions. Thirty focused minutes has been more effective than waiting
        for a perfect two-hour block.
      </p>
      <p>
        My baseline structure is:
      </p>
      <ul>
        <li>10 minutes of scale and fretboard warmups.</li>
        <li>10 minutes of rhythm and timing drills with a metronome.</li>
        <li>10 minutes on one song I keep in active rotation.</li>
      </ul>
      <p>
        The key is reducing setup friction. I keep one guitar on a stand and a
        short list of drills nearby so I can start quickly instead of deciding what
        to practice.
      </p>
      <p>
        This routine keeps momentum high and makes it easier to notice gradual
        improvements week to week.
      </p>
    </BlogPostLayout>
  );
}

export default MusicPost;
