import { createSupabaseClient } from "@/lib/supabase/client";
import { getPlaceholderPosts } from "@/lib/supabase/placeholders";
import type { BlogPost } from "@/lib/supabase/types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return getPlaceholderPosts();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error.message);
    return getPlaceholderPosts();
  }

  return data?.length ? data : getPlaceholderPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createSupabaseClient();
  if (!supabase) {
    return getPlaceholderPosts().find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error.message);
    return getPlaceholderPosts().find((p) => p.slug === slug) ?? null;
  }

  if (data) return data;

  return getPlaceholderPosts().find((p) => p.slug === slug) ?? null;
}
