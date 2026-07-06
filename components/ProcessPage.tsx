"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  Headphones,
  Lightbulb,
  Rocket,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Research",
    description:
      "We dive deep into your business, audience, competitors, and goals. Through workshops and audits, we uncover opportunities and define clear success metrics.",
    color: "border-site-accent bg-site-accent/10 text-site-accent",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Planning",
    description:
      "Using our INK Framework, we craft a tailored roadmap that aligns Influence, Nurture, and Keep phases with your business objectives and budget.",
    color: "border-site-sky bg-site-sky/10 text-site-sky",
  },
  {
    number: "03",
    icon: Settings,
    title: "Design & Development",
    description:
      "Our creative and engineering teams bring the strategy to life — from brand assets and websites to custom software — with iterative feedback loops.",
    color: "border-site-warm bg-site-warm/10 text-site-warm",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Execute",
    description:
      "We deploy campaigns, launch products, and activate all channels with precision timing, ensuring every touchpoint is optimized for conversion.",
    color: "border-site-accent bg-site-accent/10 text-site-accent",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Measure & Optimize",
    description:
      "Continuous monitoring, A/B testing, and data analysis drive ongoing improvements. We report transparently and pivot strategies based on real results.",
    color: "border-site-sky bg-site-sky/10 text-site-sky",
  },
  {
    number: "06",
    icon: Headphones,
    title: "Support & Scale",
    description:
      "Our partnership doesn't end at launch. We provide ongoing support, maintenance, and scaling strategies to ensure sustained long-term growth.",
    color: "border-site-warm bg-site-warm/10 text-site-warm",
  },
];

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal className="mb-16 text-center">
          <span className="badge-accent mb-4">How We Work</span>
          <h1 className="heading-lg mb-4">
            Our <span className="gradient-text">Process</span>
          </h1>
          <p className="mx-auto max-w-2xl text-site-muted">
            A proven six-step methodology that takes you from initial discovery
            to sustained growth — with transparency at every stage.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-site-border md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-site-accent via-site-sky to-site-warm"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex gap-6 md:gap-8"
                >
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${step.color}`}
                    >
                      <step.icon size={24} />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ x: 8 }} className="card flex-1">
                    <div className="mb-1 text-xs font-bold uppercase tracking-widest text-site-subtle">
                      Step {step.number}
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-site-text">{step.title}</h2>
                    <p className="text-sm leading-relaxed text-site-muted">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <p className="mb-6 text-site-muted">
            Ready to experience our process firsthand?
          </p>
          <Link href="/contact-us" className="btn-primary">
            Start Your Project
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
