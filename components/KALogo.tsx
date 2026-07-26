"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LOGO_ALT, LOGO_SRC, logoDimensions } from "@/lib/brand";

interface KALogoProps {
  className?: string;
  height?: number;
  logoOnly?: boolean;
  showWordmark?: boolean;
  priority?: boolean;
}

const wordmark = "KA Strategist";
const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.2 },
  },
};

const letterBounce = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0, -5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

export default function KALogo({
  className = "",
  height = 56,
  logoOnly = false,
  showWordmark = false,
  priority = false,
}: KALogoProps) {
  const { width, height: imgHeight } = logoDimensions(height);

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4 ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={width}
        height={imgHeight}
        priority={priority}
        className="block shrink-0 object-contain"
        style={{ height: imgHeight, width: "auto" }}
      />

      {!logoOnly && showWordmark && (
        <div className="hidden min-w-0 flex-col justify-center border-l border-site-border pl-3 sm:flex sm:pl-4">
          <motion.span
            className="brand-name flex items-baseline whitespace-nowrap text-base leading-[1.15] lg:text-lg"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
          >
            {wordmark.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                variants={letterBounce}
                className="inline-block"
                style={{ minWidth: char === " " ? "0.3em" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
          <span className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-site-accent lg:text-xs">
            Digital Marketing Agency
          </span>
          <span className="brand-tagline mt-0.5 text-[10px] italic leading-tight tracking-[0.02em]">
            Clarity in Marketing. Growth in Business.
          </span>
        </div>
      )}
    </div>
  );
}
