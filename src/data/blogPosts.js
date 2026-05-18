import LaneyLa30blPost from "../posts/LaneyLa30blPost";
import Custom4x12Veteran30CreambackWiringPost from "../posts/Custom4x12Veteran30CreambackWiringPost";
import { blogPostMeta } from "./blogPostMeta.mjs";

export const blogCategories = [
  "Software Engineering",
  "Guitar Tech",
  "Music",
  "Backpacking",
];

const sortByDateDescending = (firstPost, secondPost) =>
  secondPost.date.localeCompare(firstPost.date);

const postComponents = {
  "laney-la30bl-black-sabbath-tone-review": LaneyLa30blPost,
  "custom-4x12-wgs-veteran-30-creamback-wiring":
    Custom4x12Veteran30CreambackWiringPost,
};

export const blogPosts = blogPostMeta.map((post) => ({
  ...post,
  Component: postComponents[post.slug],
}));

export const getSortedBlogPosts = () =>
  [...blogPosts].sort(sortByDateDescending);

export const getPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export const getPostsGroupedByCategory = () => {
  const sortedPosts = getSortedBlogPosts();

  return blogCategories
    .map((category) => ({
      category,
      posts: sortedPosts.filter((post) => post.category === category),
    }))
    .filter(({ posts }) => posts.length > 0);
};
