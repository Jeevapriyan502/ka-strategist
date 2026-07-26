"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import CeoPortrait from "@/components/home/CeoPortrait";
import { mastermind } from "@/lib/about-content";

const ease = [0.22, 1, 0.36, 1] as const;

interface AboutIntroWithCeoProps {
  showBadge?: boolean;
}

export default function AboutIntroWithCeo({ showBadge = true }: AboutIntroWithCeoProps) {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
      <ScrollReveal direction="left">
        <div className="space-y-6">
          {showBadge && <span className="badge-accent">Who We Are</span>}
          <h2 className="heading-lg text-balance">
            About <span className="gradient-text">KA Strategist</span>
          </h2>
          <p className="text-lg leading-relaxed text-site-muted">
            A Coimbatore-based digital marketing and IT team helping businesses across
            Tamil Nadu grow online.
          </p>

          <div className="flex items-center gap-3 border-t border-site-border/50 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-sky to-site-warm text-white shadow-glow">
              <Brain size={20} />
            </div>
            <div>
              <p className="section-label">Leadership</p>
              <h3 className="text-lg font-bold text-site-text">
                Our <span className="gradient-text">Mastermind</span>
              </h3>
            </div>
          </div>

          <p className="font-semibold leading-relaxed text-site-text">
            {mastermind.headline}
          </p>
          <p className="leading-relaxed text-site-muted">{mastermind.bio}</p>

          <blockquote className="relative rounded-2xl border-l-4 border-site-accent bg-white/80 p-5 shadow-soft backdrop-blur-md">
            <p className="text-sm italic leading-relaxed text-site-muted">
              &ldquo;{mastermind.quote}&rdquo;
            </p>
          </blockquote>

          <ul className="grid gap-3 sm:grid-cols-2">
            {mastermind.highlights.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2.5 text-sm text-site-muted shadow-soft"
              >
                <span className="mt-0.5 text-site-accent">◆</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.12} className="lg:sticky lg:top-28">
        <CeoPortrait />
      </ScrollReveal>
    </div>
  );
}
