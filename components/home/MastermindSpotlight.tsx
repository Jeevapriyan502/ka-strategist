"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import MediaImage from "@/components/MediaImage";
import ScrollReveal from "@/components/ScrollReveal";
import { mastermind } from "@/lib/about-content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function MastermindSpotlight({
  className = "mt-14",
  imageFirst = false,
}: {
  className?: string;
  imageFirst?: boolean;
}) {
  const imageBlock = (
    <ScrollReveal direction="left" delay={0.1}>
      <div className={`relative mx-auto ${imageFirst ? "max-w-sm sm:max-w-md" : "max-w-sm lg:mx-0"}`}>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-site-accent/25 via-site-sky/20 to-site-warm/25 blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-card-hover"
        >
          <div className="relative aspect-[3/4] w-full">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <MediaImage
                src={mastermind.image}
                alt={mastermind.imageAlt}
                fill
                icon="person"
                placeholderLabel="CEO photo"
                className="object-cover object-[center_20%]"
              />
            </motion.div>

            <motion.div
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5 }}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-5 pt-16">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6, ease }}
                className="text-lg font-bold text-white"
              >
                {mastermind.name}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6, ease }}
                className="text-sm font-medium text-white/85"
              >
                {mastermind.role}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-3 top-8 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-site-accent shadow-soft backdrop-blur-sm"
        >
          <Sparkles size={12} />
          Vision
        </motion.div>
      </div>
    </ScrollReveal>
  );

  const textBlock = (
    <ScrollReveal direction="right" delay={0.2}>
      <div className="space-y-5">
        <p className="text-lg font-semibold leading-relaxed text-site-text">
          {mastermind.headline}
        </p>
        <p className="leading-relaxed text-site-muted">{mastermind.bio}</p>

        <blockquote className="relative rounded-2xl border-l-4 border-site-accent bg-white/80 p-5 shadow-soft backdrop-blur-md">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-4 top-3 text-3xl leading-none text-site-accent/20"
          >
            &ldquo;
          </motion.span>
          <p className="text-sm italic leading-relaxed text-site-muted">
            {mastermind.quote}
          </p>
        </blockquote>

        <ul className="grid gap-3 sm:grid-cols-2">
          {mastermind.highlights.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
              className="flex items-start gap-2 rounded-xl bg-white/70 px-3 py-2.5 text-sm text-site-muted shadow-soft"
            >
              <span className="mt-0.5 text-site-accent">◆</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );

  return (
    <div className={className}>
      {imageFirst ? (
        <>
          {imageBlock}
          <ScrollReveal>
            <div className="mt-8 mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-sky to-site-warm text-white shadow-glow">
                <Brain size={20} />
              </div>
              <div>
                <p className="section-label">Leadership</p>
                <h3 className="heading-md">
                  Our <span className="gradient-text">Mastermind</span>
                </h3>
              </div>
            </div>
          </ScrollReveal>
          {textBlock}
        </>
      ) : (
        <>
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-sky to-site-warm text-white shadow-glow">
                <Brain size={20} />
              </div>
              <div>
                <p className="section-label">Leadership</p>
                <h3 className="heading-md">
                  Our <span className="gradient-text">Mastermind</span>
                </h3>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {imageBlock}
            {textBlock}
          </div>
        </>
      )}
    </div>
  );
}
