export type { Lead, BlogPost } from "@/lib/supabase/types";
export { getPlaceholderPosts } from "@/lib/supabase/placeholders";
export { getBlogPosts, getBlogPostBySlug } from "@/lib/supabase/blog";
export { createSupabaseClient as getSupabaseClient } from "@/lib/supabase/client";
