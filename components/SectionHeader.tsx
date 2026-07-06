"use client";

import ScrollReveal from "@/components/ScrollReveal";

interface SectionHeaderProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={`mb-14 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <span className="badge-accent mb-4">{badge}</span>
      <h2 className="heading-lg mb-4 text-balance">{title}</h2>
      {description && (
        <p
          className={`text-lg text-site-muted ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"} text-balance`}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
