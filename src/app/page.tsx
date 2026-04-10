import { Hero } from "@/components/Hero";
import { getAllPostSlugs, getPostData } from "@/lib/blogs";

export default async function Home() {
  const slugs = getAllPostSlugs();
  const latestPosts = (await Promise.all(slugs.map((slug) => getPostData(slug))))
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return <Hero latestPosts={latestPosts} />;
}
