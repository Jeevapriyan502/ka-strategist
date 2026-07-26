export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  if (!content.trim()) return null;
  return content.split(/\n\n+/).map((paragraph, i) => (
    <p key={i} className="mb-4 leading-relaxed text-site-muted last:mb-0">
      {paragraph.trim()}
    </p>
  ));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="section-padding">
      <div className="container-max mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-6 inline-block text-sm font-medium text-site-accent hover:text-site-accent-hover"
        >
          &larr; Back to Blog
        </Link>

        {post.cover_image && (
          <div className="mb-8 overflow-hidden rounded-xl border border-site-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt=""
              className="h-auto max-h-80 w-full object-cover"
            />
          </div>
        )}

        <span className="mb-2 block text-sm text-site-subtle">
          {new Date(post.published_at).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          &middot; {post.author}
        </span>
        <h1 className="heading-lg mb-4">{post.title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-site-text">{post.excerpt}</p>

        <div className="border-t border-site-border pt-8">
          {post.content ? (
            renderContent(post.content)
          ) : (
            <p className="text-site-muted">
              Full article coming soon.{" "}
              <Link href="/contact-us" className="text-site-accent hover:underline">
                Contact KA Strategist
              </Link>{" "}
              to learn more.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
