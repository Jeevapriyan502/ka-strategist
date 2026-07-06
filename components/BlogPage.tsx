"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { BlogPost } from "@/lib/supabase";

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal className="mb-12 text-center">
          <span className="badge-accent mb-4">Insights & Tips</span>
          <h1 className="heading-lg mb-4">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-site-muted">
            Daily tips on SEO, social media, Meta ads, and growth — from the KA
            Strategist team in Coimbatore.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="card group flex h-full flex-col"
              >
                <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent/10 to-site-warm/10">
                  <span className="text-4xl font-black text-site-accent/20">
                    KA
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-4 text-xs text-site-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.published_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="mb-2 text-lg font-bold text-site-text transition-colors group-hover:text-site-accent">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-site-muted">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-site-accent transition-colors hover:text-site-accent-hover"
                  >
                    Read More
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
