"use client";

import { Award, Eye, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import ScrollReveal from "@/components/ScrollReveal";
import AboutIntroWithCeo from "@/components/home/AboutIntroWithCeo";
import ConsultationCta from "@/components/home/ConsultationCta";
import { officePhotos } from "@/lib/about-content";

const keyPoints = [
  { text: "Clear monthly reporting + next steps", accent: "bg-site-accent" },
  { text: "Conversion tracking (calls, forms, WhatsApp)", accent: "bg-site-sky" },
  { text: "Creative + performance working together", accent: "bg-site-warm" },
  { text: "Local understanding of TN audiences", accent: "bg-site-accent" },
];

const values = [
  {
    icon: BarChart3,
    title: "Results-Driven",
    description:
      "Every strategy is backed by data and focused on measurable outcomes.",
    gradient: "from-site-accent to-red-400",
    shadow: "shadow-glow",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear reporting and honest communication on every campaign.",
    gradient: "from-site-sky to-blue-400",
    shadow: "shadow-glow-sky",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "High standards in design, development, and marketing.",
    gradient: "from-site-warm to-amber-400",
    shadow: "shadow-glow-warm",
  },
];

export default function HomeAboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-site-surface section-padding">
      <div className="container-max">
        <AboutIntroWithCeo />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ScrollReveal direction="left">
            <h3 className="heading-md mb-4">Our Mission</h3>
            <p className="mb-4 leading-relaxed text-site-muted">
              We empower Tamil Nadu businesses with practical digital marketing —
              SEO, social media, Meta ads, websites, and software that bring real
              enquiries.
            </p>
            <p className="mb-6 leading-relaxed text-site-muted">
              Through our INK Framework — Influence, Nurture, and Keep — we build
              systems that grow your brand long after a single campaign ends.
            </p>
            <div className="mb-7 rounded-2xl border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur-md">
              <p className="text-sm font-semibold text-site-text">What you get with KA</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {keyPoints.map((point, i) => (
                  <motion.li
                    key={point.text}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl bg-white/80 px-3 py-2.5 shadow-soft"
                  >
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${point.accent}`} />
                    <span className="text-sm leading-snug text-site-muted">{point.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <ConsultationCta />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-5">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-soft backdrop-blur-md transition-all duration-300 hover:shadow-card"
                >
                  <div
                    className={`shrink-0 rounded-xl bg-gradient-to-br ${value.gradient} p-3 text-white ${value.shadow} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <value.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-site-text">{value.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-site-muted">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14">
          <h3 className="heading-md mb-2">Based in Gandhipuram, Coimbatore</h3>
          <p className="mb-6 max-w-2xl text-site-muted">
            Our real office on Sathy Road — strategy sessions, team collaboration,
            and client consultations across Tamil Nadu.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {officePhotos.map((photo, i) => (
              <ScrollReveal key={photo.src} delay={i * 0.08}>
                <figure className="group overflow-hidden rounded-2xl bg-white/80 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <MediaImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholderLabel="Office photo"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <figcaption className="px-5 py-3 text-sm font-medium text-site-muted">
                    {photo.caption}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
