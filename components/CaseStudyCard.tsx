"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CaseStudy } from "@/lib/portfolio-content";

const categoryEmojis: Record<string, string> = {
  "Branding": "🎨",
  "Branding + Lead Generation": "🎯",
  "Branding + Social Media": "📣",
  "Website Development": "🌐",
  "Software Development": "💻",
  "Lead Generation": "🚀",
  "Meta Ads + Landing Page": "📱",
};

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface CaseStudyCardProps {
  study: CaseStudy;
  index?: number;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CaseStudyCard({
  study,
  index = 0,
  ctaLabel = "Start a Similar Project",
  ctaHref = "/contact-us",
}: CaseStudyCardProps) {
  const emoji = categoryEmojis[study.category] || "✨";
  const fromLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: fromLeft ? -40 : 40,
        y: 30,
        scale: 0.9,
        rotateY: fromLeft ? 8 : -8,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: ease4 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 shadow-card backdrop-blur-md transition-shadow duration-300 hover:shadow-card-hover"
      style={{ perspective: 800 }}
    >
      <div
        className={`bg-gradient-to-br ${study.color} relative flex h-40 flex-col items-center justify-center gap-2 px-4`}
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: "backOut" as const }}
          className="text-4xl"
        >
          {emoji}
        </motion.span>
        <span
          className={`rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold shadow-soft ${study.tagColor}`}
        >
          {study.tag}
        </span>
        {study.location && (
          <span className="text-xs text-site-muted">📍 {study.location}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 text-center">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-site-accent">
          {study.category}
        </p>
        <h3 className="mb-2 text-lg font-bold text-site-text transition-colors group-hover:text-site-accent">
          {study.title}
        </h3>
        {study.client && (
          <p className="mb-2 text-xs text-site-subtle">{study.client}</p>
        )}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-site-muted">{study.description}</p>
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {study.results.map((result) => (
            <motion.span
              key={result}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className={`rounded-full px-3 py-1 text-xs font-medium ${study.badgeBg}`}
            >
              {result}
            </motion.span>
          ))}
        </div>
        <Link
          href={ctaHref}
          className="mx-auto inline-flex items-center gap-1 text-sm font-semibold text-site-accent transition-colors hover:text-site-accent-hover"
        >
          {ctaLabel}
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
