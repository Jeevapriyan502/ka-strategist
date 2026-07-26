"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/portfolio-content";

export default function PortfolioPage() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal className="mb-12 text-center">
          <span className="badge-accent mb-4">Our Work</span>
          <h1 className="heading-lg mb-4">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="mx-auto max-w-2xl text-site-muted">
            Real results for Tamil Nadu businesses — branding, lead generation,
            websites, software, and Meta ad campaigns managed by KA Strategist.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} index={i} />
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link href="/contact-us" className="btn-primary">
            Start Your Project
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
