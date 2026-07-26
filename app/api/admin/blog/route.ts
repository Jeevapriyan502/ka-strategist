import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify, type BlogPostInput } from "@/lib/blog";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local" },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body = (await request.json()) as BlogPostInput;
  if (!body.title?.trim() || !body.excerpt?.trim() || !body.content?.trim()) {
    return NextResponse.json(
      { error: "Title, excerpt, and content are required" },
      { status: 400 }
    );
  }

  const slug = body.slug?.trim() || slugify(body.title);
  const publishedAt = body.published_at || new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author?.trim() || "KA Strategist Team",
      cover_image: body.cover_image?.trim() || null,
      published_at: publishedAt,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ post: data }, { status: 201 });
}
