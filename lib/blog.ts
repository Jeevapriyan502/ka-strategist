export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author?: string;
  cover_image?: string | null;
  published_at?: string;
}

export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  author: string;
  created_at?: string;
}
