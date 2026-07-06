"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import KALogo from "./KALogo";
import { contactPhoneTel } from "@/lib/contact";
import { navigateToSection } from "@/lib/use-hash";

const footerLinks = {
  company: [
    { sectionId: "about", label: "About Us" },
    { sectionId: "process", label: "Our Process" },
    { sectionId: "portfolio", label: "Portfolio" },
  ],
  services: [
    { sectionId: "services", label: "Branding" },
    { sectionId: "services", label: "Lead Generation" },
    { sectionId: "services", label: "Website Development" },
    { sectionId: "services", label: "Software Development" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const goToSection = (sectionId: string) => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => navigateToSection(sectionId), 100);
    } else {
      navigateToSection(sectionId);
    }
  };

  return (
    <footer className="bg-site-surface">
      <div className="container-max section-padding">
        <div className="mb-10 flex flex-col items-start justify-between gap-8 pb-10 lg:flex-row lg:items-center">
          <div>
            <button
              onClick={() => goToSection("home")}
              className="inline-block transition-opacity hover:opacity-90"
            >
              <KALogo height={60} />
            </button>
            <p className="brand-tagline mt-2">Digital Marketing &middot; Tamil Nadu</p>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-lg bg-site-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-site-accent-hover"
          >
            Book Consultation
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-site-accent">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://facebook.com", bg: "bg-[#1877F2]", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com", bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", label: "Instagram" },
                { Icon: Linkedin, href: "https://linkedin.com", bg: "bg-[#0A66C2]", label: "LinkedIn" },
                { Icon: Twitter, href: "https://twitter.com", bg: "bg-[#1DA1F2]", label: "X / Twitter" },
                { Icon: Youtube, href: "https://youtube.com", bg: "bg-[#FF0000]", label: "YouTube" },
              ].map(({ Icon, href, bg, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${bg} rounded-xl p-2.5 text-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-site-accent">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => goToSection(link.sectionId)}
                    className="text-sm text-site-muted hover:text-site-text"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm text-site-muted hover:text-site-text">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-site-accent">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => goToSection(link.sectionId)}
                    className="text-sm text-site-muted hover:text-site-text"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-site-accent">
              Reach Us
            </h3>
            <ul className="space-y-2.5 text-sm text-site-muted">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-site-sky" />
                No.15, 1st Floor, Sathy Road, Cross 3, Gandhipuram, Coimbatore - 641012
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0 text-site-warm" />
                <a href={`tel:${contactPhoneTel}`} className="hover:text-site-text">
                  Call Now
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-site-accent" />
                <a href="mailto:kastrategist@gmail.com" className="hover:text-site-text">
                  kastrategist@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-sm text-site-subtle">
          &copy; {new Date().getFullYear()} KA Strategist. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
