import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify, type BlogPostInput } from "@/lib/blog";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as BlogPostInput;

  if (!body.title?.trim() || !body.excerpt?.trim() || !body.content?.trim()) {
    return NextResponse.json(
      { error: "Title, excerpt, and content are required" },
      { status: 400 }
    );
  }

  const slug = body.slug?.trim() || slugify(body.title);

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author?.trim() || "KA Strategist Team",
      cover_image: body.cover_image?.trim() || null,
      published_at: body.published_at || new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ post: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { id } = await context.params;

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);

  return NextResponse.json({ success: true });
}
