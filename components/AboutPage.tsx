"use client";

import { motion } from "framer-motion";
import { Award, Eye, Target } from "lucide-react";
import MediaImage from "@/components/MediaImage";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import AboutIntroWithCeo from "@/components/home/AboutIntroWithCeo";
import ConsultationCta from "@/components/home/ConsultationCta";
import { officePhotos, teamMembers } from "@/lib/about-content";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Every strategy we craft is backed by data and focused on measurable outcomes for your business.",
    iconBg: "bg-site-accent/15 text-site-accent",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in open communication, clear reporting, and honest partnerships with every client.",
    iconBg: "bg-site-sky/15 text-site-sky",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in design, development, and digital marketing.",
    iconBg: "bg-site-warm/15 text-site-warm",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Who We Are"
        title={
          <>
            About <span className="gradient-text">KA Strategist</span>
          </>
        }
        description="A Coimbatore-based digital marketing and IT team helping businesses across Tamil Nadu grow online."
      />

      <section className="section-padding !pt-0 bg-site-surface">
        <div className="container-max">
          <AboutIntroWithCeo showBadge={false} />
        </div>
      </section>

      {/* Office */}
      <section className="section-padding !pt-0">
        <div className="container-max">
          <SectionHeader
            badge="Our Office"
            title="Based in Gandhipuram, Coimbatore"
            description="Visit us on Sathy Road — or book a consultation to talk through your goals."
            align="left"
          />
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
                  </div>
                  <figcaption className="px-4 py-3 text-sm font-medium text-site-muted">
                    {photo.caption}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-site-surface">
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <ScrollReveal direction="left">
              <h2 className="heading-md mb-4">Our Mission</h2>
              <p className="mb-4 leading-relaxed text-site-muted">
                At KA Strategist, our mission is to empower businesses across
                Tamil Nadu with practical digital marketing and technology —
                SEO, social media, Meta ads, websites, and software that bring
                real enquiries.
              </p>
              <p className="mb-6 leading-relaxed text-site-muted">
                Through our INK Framework — Influence, Nurture, and Keep — we
                build systems that grow your brand long after a single campaign
                ends.
              </p>
              <ConsultationCta className="mt-2" />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
              <div className="grid gap-4">
                {values.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card flex items-start gap-4"
                  >
                    <div className={`rounded-xl p-3 ${value.iconBg}`}>
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-site-text">{value.title}</h3>
                      <p className="mt-1 text-sm text-site-muted">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-alt section-padding relative">
        <div className="container-max relative">
          <SectionHeader
            badge="Our Team"
            title={
              <>
                The people behind <span className="gradient-text">KA Strategist</span>
              </>
            }
            description="Replace placeholder names in the site config when you share team details and photos."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.image} delay={i * 0.08}>
                <article className="card overflow-hidden p-0">
                  <div className="relative aspect-[4/5] w-full bg-site-surface">
                    <MediaImage
                      src={member.image}
                      alt={member.name}
                      fill
                      placeholderLabel="Add team photo"
                      icon="person"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-site-text">{member.name}</h3>
                    <p className="text-sm text-site-accent">{member.role}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
