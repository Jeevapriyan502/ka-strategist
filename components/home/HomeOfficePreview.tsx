"use client";

import { MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import ScrollReveal from "@/components/ScrollReveal";
import { officePhotos } from "@/lib/about-content";
import { navigateToSection } from "@/lib/use-hash";

const ease = [0.22, 1, 0.36, 1] as const;

function OfficeImageCard({
  photo,
  featured = false,
}: {
  photo: (typeof officePhotos)[number];
  featured?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease }}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-card ${
        featured
          ? "h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]"
          : "min-h-[160px] sm:min-h-[180px]"
      }`}
    >
      <div className="relative h-full min-h-[inherit] w-full">
        <MediaImage
          src={photo.src}
          alt={photo.alt}
          fill
          placeholderLabel="Office photo"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className={`absolute bottom-0 left-0 right-0 ${featured ? "p-5" : "p-3"}`}>
        <p
          className={`font-bold text-white ${
            featured ? "text-sm" : "text-xs leading-snug sm:text-sm"
          }`}
        >
          {photo.caption}
        </p>
        {featured && (
          <p className="mt-1 text-xs text-white/80">Gandhipuram, Coimbatore</p>
        )}
      </div>
    </motion.div>
  );
}

export default function HomeOfficePreview() {
  if (!officePhotos.length) return null;

  const [featured, ...rest] = officePhotos;

  return (
    <section className="bg-site-surface px-4 py-14 sm:px-6 lg:px-8">
      <div className="container-max">
        <ScrollReveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Our Office</p>
              <h2 className="heading-md mt-2">
                Real team. Real office in{" "}
                <span className="gradient-text">Coimbatore</span>
              </h2>
              <p className="mt-2 max-w-xl text-site-muted">
                Strategy sessions, campaign planning, and client consultations from
                our Gandhipuram workspace on Sathy Road.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateToSection("about")}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <MapPinned size={16} />
              See our story
            </button>
          </div>
        </ScrollReveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          <ScrollReveal className="sm:col-span-2 lg:row-span-2">
            <OfficeImageCard photo={featured} featured />
          </ScrollReveal>

          {rest.map((photo, i) => (
            <ScrollReveal key={photo.src} delay={0.08 + i * 0.06}>
              <OfficeImageCard photo={photo} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
