import LaneyLa30blPost from "../posts/LaneyLa30blPost";
import { blogPostMeta } from "./blogPostMeta.mjs";

export const blogCategories = ["Software Engineering", "Music", "Backpacking"];

const sortByDateDescending = (firstPost, secondPost) =>
  secondPost.date.localeCompare(firstPost.date);

const postComponents = {
  "laney-la30bl-black-sabbath-tone-review": LaneyLa30blPost,
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
