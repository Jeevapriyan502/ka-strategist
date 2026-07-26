"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInUp({
  children,
  delay = 0,
  className,
}: FadeInUpProps) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUpOnLoad({
  children,
  delay = 0,
  className,
}: FadeInUpProps) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
