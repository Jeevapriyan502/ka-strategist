export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";
import { getBlogPosts } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Daily digital marketing insights from KA Strategist — Tamil Nadu's growth partner for SEO, social media, and lead generation.",
};

export default async function Blog() {
  const posts = await getBlogPosts();
  return <BlogPage posts={posts} />;
}
