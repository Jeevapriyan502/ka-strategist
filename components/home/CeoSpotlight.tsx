"use client";

import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import CeoPortrait from "@/components/home/CeoPortrait";
import { mastermind } from "@/lib/about-content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CeoSpotlight() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      <ScrollReveal direction="left" className="flex justify-center lg:justify-start">
        <CeoPortrait className="max-w-[220px] sm:max-w-[260px] lg:max-w-[280px]" />
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.1}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-sky to-site-warm text-white shadow-glow">
              <Brain size={20} />
            </div>
            <div>
              <p className="section-label">Leadership</p>
              <h3 className="text-xl font-bold text-site-text sm:text-2xl">
                Our <span className="gradient-text">Mastermind</span>
              </h3>
            </div>
          </div>

          <p className="text-lg font-semibold leading-relaxed text-site-text">
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
    </div>
  );
}
