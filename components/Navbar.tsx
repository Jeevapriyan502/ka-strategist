"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import KALogo from "./KALogo";
import { navSections } from "@/lib/site-sections";
import { isSectionActive, navigateToSection, useActiveSection } from "@/lib/use-hash";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = useActiveSection();

  const closeMenu = () => setIsOpen(false);

  const handleSectionClick = (
    e: React.MouseEvent,
    sectionId: string,
    isPage?: boolean,
  ) => {
    if (isPage) return;
    e.preventDefault();
    closeMenu();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => navigateToSection(sectionId), 100);
    } else {
      navigateToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      <nav className="container-max flex min-h-[96px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <button
          className="shrink-0 transition-opacity hover:opacity-90"
          onClick={(e) => handleSectionClick(e, "home")}
        >
          <KALogo height={76} showWordmark priority />
        </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navSections.map((link) => {
            const isPage = "isPage" in link && link.isPage;
            const active = isPage
              ? pathname.startsWith(link.href)
              : isSectionActive(pathname, activeSection, link.id);

            if (isPage) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-site-accent" : "text-site-muted hover:text-site-text"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill-desktop"
                      className="absolute inset-0 rounded-lg bg-site-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  active ? "text-site-accent" : "text-site-muted hover:text-site-text"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill-desktop"
                    className="absolute inset-0 rounded-lg bg-site-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
          <Link
            href="/contact-us"
            className="ml-4 rounded-lg bg-site-accent px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-site-accent-hover"
          >
            Book Consultation
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-site-muted hover:bg-site-card lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-site-border bg-site-surface lg:hidden"
          >
            <div className="container-max flex flex-col gap-1 px-4 py-4">
              {navSections.map((link) => {
                const isPage = "isPage" in link && link.isPage;
                const active = isPage
                  ? pathname.startsWith(link.href)
                  : isSectionActive(pathname, activeSection, link.id);

                if (isPage) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`rounded-lg px-4 py-3 text-sm font-medium ${
                        active ? "bg-site-accent/10 text-site-accent" : "text-site-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.id)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium cursor-pointer ${
                      active ? "bg-site-accent/10 text-site-accent" : "text-site-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-site-accent py-3 text-center text-sm font-semibold text-white"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
