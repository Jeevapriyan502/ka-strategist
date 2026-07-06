"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface ConsultationCtaProps {
  showTrustBadge?: boolean;
  className?: string;
}

export default function ConsultationCta({
  showTrustBadge = true,
  className = "",
}: ConsultationCtaProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 ${className}`}>
      <Link href="/contact-us" className="btn-primary group inline-flex w-fit">
        Book Consultation
        <ArrowRight
          size={16}
          className="ml-2 transition-transform group-hover:translate-x-0.5"
        />
      </Link>

      {showTrustBadge && (
        <div className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-2.5 shadow-soft backdrop-blur-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-site-accent to-site-sky text-white shadow-glow">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-lg font-extrabold leading-none text-site-text">120+</p>
            <p className="text-xs text-site-muted">businesses trust KA</p>
          </div>
        </div>
      )}
    </div>
  );
}
