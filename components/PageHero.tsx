"use client";

import AmbientBackground from "@/components/AmbientBackground";
import { FadeInUpOnLoad } from "@/components/FadeInUp";

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
}

export default function PageHero({
  badge,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-site-border bg-gradient-hero">
      <AmbientBackground />
      <div className="container-max px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
        <FadeInUpOnLoad delay={0}>
          <span className="badge-accent mb-5">{badge}</span>
        </FadeInUpOnLoad>
        <FadeInUpOnLoad delay={1}>
          <h1 className="heading-xl mb-5 text-balance">{title}</h1>
        </FadeInUpOnLoad>
        {description && (
          <FadeInUpOnLoad delay={2}>
            <p className="mx-auto max-w-2xl text-lg text-site-muted text-balance">
              {description}
            </p>
          </FadeInUpOnLoad>
        )}
      </div>
    </section>
  );
}
