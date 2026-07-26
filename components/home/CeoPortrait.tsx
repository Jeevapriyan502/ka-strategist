"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import MediaImage from "@/components/MediaImage";
import { mastermind } from "@/lib/about-content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CeoPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none ${className}`}>
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
            <p className="text-lg font-bold text-white">{mastermind.name}</p>
            <p className="text-sm font-medium text-white/85">{mastermind.role}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 top-8 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-site-accent shadow-soft backdrop-blur-sm"
      >
        <Sparkles size={12} />
        Our Mastermind
      </motion.div>
    </div>
  );
}
