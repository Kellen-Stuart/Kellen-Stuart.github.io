import LaneyLa30blPost from "../posts/LaneyLa30blPost";

export const blogCategories = ["Software Engineering", "Music", "Backpacking"];

const sortByDateDescending = (firstPost, secondPost) =>
  secondPost.date.localeCompare(firstPost.date);

export const blogPosts = [
  {
    slug: "laney-la30bl-black-sabbath-tone-review",
    title: "Laney LA30BL: Chasing Early Sabbath Tone",
    summary:
      "My real-world experience with the LA30BL: volume, attenuator setup, pedals, cabs, and how close it gets to early Black Sabbath.",
    date: "2026-03-01",
    lastUpdated: "2026-03-01",
    category: "Music",
    readTime: "9 min read",
    heroImage: {
      src: "/blog/music/guitar/laney-la30bl-half-stack.jpg",
      alt: "Laney LA30BL half stack setup",
      caption: "Laney LA30BL with my current cab and pedalboard setup.",
    },
    updates: [
      {
        date: "2026-03-01",
        note: "Initial publication.",
      },
    ],
    Component: LaneyLa30blPost,
  },
];

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
