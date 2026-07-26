"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ServiceCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ServiceCard({
  children,
  className,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
