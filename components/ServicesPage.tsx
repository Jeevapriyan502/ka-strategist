"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Palette,
  Search,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const serviceSections = [
  {
    id: "branding",
    icon: Palette,
    title: "Branding",
    color: "text-site-accent",
    bg: "bg-site-accent/10",
    dot: "bg-site-accent",
    description:
      "Your brand is more than a logo — it's the promise you make to your customers. We craft cohesive brand identities that communicate your values, differentiate you from competitors, and build emotional connections with your audience.",
    features: [
      "Brand Strategy & Positioning",
      "Logo & Visual Identity Design",
      "Brand Guidelines & Style Guides",
      "Social Media Branding",
      "Packaging & Print Design",
    ],
  },
  {
    id: "lead-generation",
    icon: TrendingUp,
    title: "Lead Generation",
    color: "text-site-sky",
    bg: "bg-site-sky/10",
    dot: "bg-site-sky",
    description:
      "Stop chasing leads and start attracting them. Our data-driven lead generation strategies combine SEO, paid advertising, content marketing, and conversion optimization to fill your pipeline with qualified prospects.",
    features: [
      "Search Engine Optimization (SEO)",
      "Google & Social Media Ads (PPC)",
      "Content Marketing & Blogging",
      "Email Marketing Campaigns",
      "Landing Page Optimization",
    ],
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    color: "text-site-warm",
    bg: "bg-site-warm/10",
    dot: "bg-site-warm",
    description:
      "Your website is your most powerful sales tool. We build fast, responsive, and conversion-optimized websites using modern technologies that deliver exceptional user experiences across all devices.",
    features: [
      "Custom Website Design & Development",
      "E-Commerce Solutions",
      "WordPress & CMS Development",
      "Performance Optimization",
      "Website Maintenance & Support",
    ],
  },
  {
    id: "software-development",
    icon: Code2,
    title: "Software Development",
    color: "text-site-accent",
    bg: "bg-site-accent/10",
    dot: "bg-site-accent",
    description:
      "Off-the-shelf software doesn't always fit. We design and develop custom software solutions — from CRMs and dashboards to mobile apps — that streamline your operations and give you a competitive edge.",
    features: [
      "Custom Web Applications",
      "Mobile App Development",
      "API Development & Integration",
      "CRM & ERP Solutions",
      "Cloud Infrastructure & DevOps",
    ],
  },
];

const highlights = [
  { icon: Search, label: "SEO Optimized" },
  { icon: Smartphone, label: "Mobile First" },
  { icon: TrendingUp, label: "ROI Focused" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-max">
          <ScrollReveal className="mb-16 text-center">
            <span className="badge-accent mb-4">Our Expertise</span>
            <h1 className="heading-lg mb-4">
              Services That{" "}
              <span className="gradient-text">Drive Growth</span>
            </h1>
            <p className="mx-auto max-w-2xl text-site-muted">
              End-to-end digital solutions designed to help your business attract,
              convert, and retain customers at every stage of the journey.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {highlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 rounded-full border border-site-border px-4 py-2 text-sm text-site-muted"
                >
                  <h.icon size={16} className="text-site-accent" />
                  {h.label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-20">
            {serviceSections.map((section, i) => (
              <ScrollReveal key={section.id} delay={i * 0.1}>
                <div
                  id={section.id}
                  className="scroll-mt-24 grid gap-8 lg:grid-cols-2 lg:items-center"
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className={`mb-4 inline-flex rounded-xl ${section.bg} p-3 ${section.color}`}
                    >
                      <section.icon size={28} />
                    </div>
                    <h2 className="heading-md mb-4">{section.title}</h2>
                    <p className="mb-6 leading-relaxed text-site-muted">
                      {section.description}
                    </p>
                    <Link href="/contact-us" className="btn-ghost">
                      Get a Quote
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <motion.div whileHover={{ scale: 1.02 }} className="card">
                      <h3 className="mb-4 font-semibold text-site-accent">
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-3">
                        {section.features.map((feature, j) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.05 }}
                            className="flex items-center gap-3 text-sm text-site-muted"
                          >
                            <span
                              className={`h-2 w-2 shrink-0 rounded-full ${section.dot}`}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-site-surface">
        <div className="container-max text-center">
          <ScrollReveal>
            <h2 className="heading-md mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-site-muted">
              Book a free consultation and we&apos;ll help you identify the best
              strategy for your business goals.
            </p>
            <Link href="/contact-us" className="btn-primary">
              Book Free Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
