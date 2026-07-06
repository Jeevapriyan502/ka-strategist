"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  BarChart3,
  Headphones,
  MapPinned,
} from "lucide-react";
import AmbientBackground from "@/components/AmbientBackground";
import CaseStudyCard from "@/components/CaseStudyCard";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import HomeServicesSection from "@/components/home/HomeServicesSection";
import HeroStatsStrip from "@/components/home/HeroStatsStrip";
import ConsultationCta from "@/components/home/ConsultationCta";
import HomeOfficePreview from "@/components/home/HomeOfficePreview";
import InkFlowchart from "@/components/InkFlowchart";
import MarketingHeroVisual from "@/components/MarketingHeroVisual";
import Link from "next/link";
import MemoryGallery, { type MemoryGalleryItem } from "@/components/MemoryGallery";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import { officePhotos, teamMembers } from "@/lib/about-content";
import { caseStudies } from "@/lib/portfolio-content";
import { heroStockImages } from "@/lib/site-media";
import { navigateToSection, useActiveSection } from "@/lib/use-hash";

type HomeSection = "home" | "about" | "services" | "portfolio" | "process";

const whyChoose = [
  {
    icon: MapPinned,
    title: "Coimbatore-based",
    text: "Local team on Sathy Road — not a distant call centre.",
  },
  {
    icon: BarChart3,
    title: "Clear reporting",
    text: "Monthly numbers you can read and act on.",
  },
  {
    icon: Users,
    title: "One dedicated contact",
    text: "Same people from strategy through delivery.",
  },
  {
    icon: Headphones,
    title: "Full-service",
    text: "Branding, SEO, ads, social, web, and software.",
  },
  {
    icon: Target,
    title: "Tamil Nadu focus",
    text: "Campaigns tuned for local search and audiences.",
  },
];

const sectionCards = [
  { id: "about", title: "About", description: "Mission, team, and our story." },
  { id: "services", title: "Services", description: "Full-service digital marketing." },
  { id: "portfolio", title: "Portfolio", description: "Case studies and results." },
  { id: "process", title: "Process", description: "How we plan and deliver." },
] as const;

const workGalleryItems: MemoryGalleryItem[] = caseStudies.slice(0, 8).map((study, i) => ({
  src: heroStockImages[i % heroStockImages.length].src,
  alt: study.title,
  title: study.title,
  subtitle: study.client ? `${study.client} · ${study.location}` : study.category,
}));

const teamGalleryItems: MemoryGalleryItem[] = [
  ...officePhotos.map((p) => ({
    src: p.src,
    alt: p.alt,
    title: p.alt,
    subtitle: "KA Strategist office",
    local: true,
  })),
  ...teamMembers.map((m) => ({
    src: m.image,
    alt: m.name,
    title: m.name,
    subtitle: m.role,
    local: true,
  })),
];

export default function HomePage() {
  const activeHash = useActiveSection();

  const activeSection: HomeSection =
    activeHash === "about" ||
    activeHash === "services" ||
    activeHash === "portfolio" ||
    activeHash === "process"
      ? activeHash
      : "home";

  return (
    <>
      {/* ====== HERO (home only) ====== */}
      {activeSection === "home" && (
        <section className="relative overflow-hidden bg-gradient-hero">
          <AmbientBackground />
          <div className="container-max relative z-10 min-h-0 px-4 py-12 sm:min-h-[min(88vh,800px)] sm:py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="section-label text-reveal text-reveal-d1">
                Clarity in Marketing. Growth in Business.
              </p>

              {/* Title + supporting copy left, animation right */}
              <div className="mt-3 grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-x-16 xl:gap-x-24">
                <div className="text-reveal text-reveal-d2">
                  <h1 className="heading-xl text-center lg:text-left">
                    KA <span className="gradient-text">Strategist</span>
                  </h1>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-site-muted lg:text-lg">
                    Your Coimbatore-based digital partner for branding, paid ads,
                    websites, and software — built to bring real enquiries across
                    Tamil Nadu.
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-site-muted">
                    {[
                      { dot: "bg-site-accent", text: "Branding, logos & social creatives" },
                      { dot: "bg-site-sky", text: "SEO, Meta, Google & WhatsApp lead flows" },
                      { dot: "bg-site-warm", text: "Websites, landing pages & e-commerce" },
                      { dot: "bg-site-accent", text: "CRM, dashboards & custom software" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-2.5">
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm font-medium text-site-text">
                    One team. One contact. Clear monthly reporting.
                  </p>
                </div>
                <div className="text-reveal text-reveal-d2 mx-auto w-full max-w-[min(100%,340px)] overflow-hidden sm:max-w-none lg:justify-self-end">
                  <MarketingHeroVisual />
                </div>
              </div>

              <p className="text-reveal text-reveal-d3 mt-6 hidden max-w-xl text-lg leading-relaxed text-site-muted lg:mt-5 lg:block">
                Premium digital marketing for Tamil Nadu — branding, SEO, Meta
                ads, websites, and software built to deliver real leads.
              </p>
              <div className="text-reveal text-reveal-d4 mt-8 flex flex-col gap-4">
                <ConsultationCta />
                <button
                  onClick={() => navigateToSection("about")}
                  className="btn-secondary w-fit"
                >
                  Explore
                </button>
              </div>

              <div className="text-reveal text-reveal-d5">
                <HeroStatsStrip />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== SECTION PICKER (home only) ====== */}
      {activeSection === "home" && (
        <section className="bg-site-surface px-4 py-10 sm:px-6 lg:px-8">
          <div className="container-max grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectionCards.map((card, i) => {
              const accents = [
                { border: "border-l-site-accent", hover: "hover:shadow-glow", text: "text-site-accent" },
                { border: "border-l-site-sky", hover: "hover:shadow-glow-sky", text: "text-site-sky" },
                { border: "border-l-site-warm", hover: "hover:shadow-glow-warm", text: "text-site-warm" },
                { border: "border-l-site-accent", hover: "hover:shadow-glow", text: "text-site-accent" },
              ];
              const a = accents[i];
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <button
                    onClick={() => navigateToSection(card.id)}
                    className={`block w-full rounded-2xl border-l-4 ${a.border} bg-white/80 p-5 text-left shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${a.hover}`}
                  >
                    <p className={`mb-1 text-sm font-bold ${a.text}`}>
                      {card.title}
                    </p>
                    <p className="text-sm leading-relaxed text-site-muted">
                      {card.description}
                    </p>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ====== WHY CHOOSE (home only) ====== */}
      {activeSection === "home" && (
        <section className="bg-site-bg px-4 py-14 sm:px-6 lg:px-8">
          <div className="container-max mb-10 text-center">
            <h2 className="heading-md">
              Why choose <span className="gradient-text">KA Strategist</span>
            </h2>
          </div>
          <div className="container-max grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChoose.map((item, i) => {
              const iconColors = [
                "bg-site-accent text-white shadow-glow",
                "bg-site-sky text-white shadow-glow-sky",
                "bg-site-warm text-white shadow-glow-warm",
                "bg-site-accent text-white shadow-glow",
                "bg-site-sky text-white shadow-glow-sky",
              ];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl bg-white/80 p-5 shadow-soft backdrop-blur-md transition-all duration-300 hover:shadow-card"
                >
                  <div className={`mb-3 inline-flex rounded-xl p-2.5 ${iconColors[i]} transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon size={20} />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-site-text">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-site-muted">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ====== OFFICE PREVIEW (home only) ====== */}
      {activeSection === "home" && <HomeOfficePreview />}

      {/* ====== ABOUT ====== */}
      {activeSection === "about" && (
        <>
          <HomeAboutSection />
          <section className="memory-gallery-section">
            <div className="container-max memory-gallery-header">
              <p className="section-label">Our space & team</p>
              <h2 className="heading-md mt-2">The people behind the work</h2>
            </div>
            <div className="container-max mt-6">
              <MemoryGallery items={teamGalleryItems} reverse duration={55} />
            </div>
          </section>
        </>
      )}

      {/* ====== SERVICES (single section) ====== */}
      {activeSection === "services" && <HomeServicesSection />}

      {/* ====== PORTFOLIO ====== */}
      {activeSection === "portfolio" && (
        <>
          <section className="memory-gallery-section">
            <div className="container-max memory-gallery-header text-center">
              <p className="section-label">Our work</p>
              <h2 className="heading-md mt-2">
                Results that <span className="gradient-text">speak</span>
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-site-muted">
                Real branding, web, ads, and software projects across Tamil Nadu.
              </p>
            </div>
            <div className="container-max mt-6">
              <MemoryGallery items={workGalleryItems} duration={50} />
            </div>
          </section>
          <section className="section-padding bg-site-surface">
            <div className="container-max">
              <SectionHeader
                badge="Case Studies"
                title={
                  <>
                    Tamil Nadu{" "}
                    <span className="gradient-text">success stories</span>
                  </>
                }
                description="Hover cards to explore projects from our portfolio."
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((study, i) => (
                  <CaseStudyCard key={study.title} study={study} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ====== PROCESS ====== */}
      {activeSection === "process" && (
        <section className="section-alt section-padding relative">
          <div className="container-max relative">
            <SectionHeader
              badge="Our Process"
              title="How we deliver every project"
              description="Scroll down to see our step-by-step process and the INK framework that powers it."
            />
            <InkFlowchart />
          </div>
        </section>
      )}

      {/* ====== CTA (always visible) ====== */}
      <section className="relative overflow-hidden bg-gradient-cta px-4 py-16 sm:px-6 lg:px-8">
        <AmbientBackground />
        <div className="container-max relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-lg mb-3">
                Ready to grow online in Tamil Nadu?
              </h2>
              <p className="mb-6 text-site-muted">
                Book a free consultation — branding, ads, and web strategy in one
                call.
              </p>
              <Link href="/contact-us" className="btn-primary">
                Book Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
