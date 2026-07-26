"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Palette,
  Search,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { serviceSections } from "@/lib/site-sections";

const iconMap = {
  branding: Palette,
  "lead-generation": TrendingUp,
  "web-development": Globe,
  "software-development": Code2,
} as const;

const serviceAccents = [
  { gradient: "from-site-accent to-red-400", shadow: "shadow-glow", dot: "bg-site-accent" },
  { gradient: "from-site-sky to-blue-400", shadow: "shadow-glow-sky", dot: "bg-site-sky" },
  { gradient: "from-site-warm to-amber-400", shadow: "shadow-glow-warm", dot: "bg-site-warm" },
  { gradient: "from-site-accent to-site-sky", shadow: "shadow-glow", dot: "bg-site-accent" },
];

const highlights = [
  { icon: Search, label: "SEO Optimized" },
  { icon: Smartphone, label: "Mobile First" },
  { icon: TrendingUp, label: "ROI Focused" },
];

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];
const vp = { once: true, margin: "-60px" as const };

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function HomeServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 bg-site-bg section-padding">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="badge-accent mb-4">Our Expertise</span>
          <h2 className="heading-lg mb-4">
            Services that <span className="gradient-text">drive growth</span>
          </h2>
          <p className="mx-auto max-w-2xl text-site-muted">
            End-to-end digital solutions to attract, convert, and retain customers.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {highlights.map((h, i) => (
              <motion.span
                key={h.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-site-muted shadow-soft backdrop-blur-sm"
              >
                <h.icon size={16} className="text-site-accent" />
                {h.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Service blocks */}
        <div className="space-y-16">
          {serviceSections.map((section, i) => {
            const Icon = iconMap[section.id];
            const fromRight = i % 2 === 0;
            const accent = serviceAccents[i % serviceAccents.length];

            return (
              <div key={section.id} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Text side */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: fromRight ? 80 : -80,
                    y: -40,
                    scale: 0.85,
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.7, ease: ease4 }}
                  className={i % 2 === 1 ? "lg:order-2" : ""}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "backOut" as const }}
                    className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${accent.gradient} p-3.5 text-white ${accent.shadow}`}
                  >
                    <Icon size={28} />
                  </motion.div>
                  <h3 className="heading-md mb-4">{section.title}</h3>
                  <p className="leading-relaxed text-site-muted">{section.description}</p>
                </motion.div>

                {/* Features — borderless, tinted background */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: fromRight ? -80 : 80,
                    y: 40,
                    scale: 0.8,
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.7, delay: 0.12, ease: ease4 }}
                  className={i % 2 === 1 ? "lg:order-1" : ""}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl bg-white/80 p-6 shadow-card backdrop-blur-md"
                  >
                    <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-site-muted">
                      What&apos;s included
                    </h4>
                    <motion.ul
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {section.features.map((feature) => (
                        <motion.li
                          key={feature}
                          variants={featureVariants}
                          className="flex items-center gap-3 text-sm text-site-muted"
                        >
                          <span className={`h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
