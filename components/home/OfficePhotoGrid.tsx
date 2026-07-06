"use client";

import { motion } from "framer-motion";
import MediaImage from "@/components/MediaImage";
import ScrollReveal from "@/components/ScrollReveal";
import { officePhotos } from "@/lib/about-content";

const ease = [0.22, 1, 0.36, 1] as const;

function OfficeImageCard({
  photo,
  featured = false,
}: {
  photo: (typeof officePhotos)[number];
  featured?: boolean;
}) {
  return (
    <motion.figure
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease }}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-card ${
        featured
          ? "h-full min-h-[240px] sm:min-h-[300px] lg:min-h-[420px]"
          : "min-h-[180px] sm:min-h-[200px] lg:min-h-[200px]"
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      <figcaption
        className={`absolute bottom-0 left-0 right-0 ${featured ? "p-5" : "p-3.5"}`}
      >
        <p
          className={`font-semibold text-white ${
            featured ? "text-sm sm:text-base" : "text-xs leading-snug sm:text-sm"
          }`}
        >
          {photo.caption}
        </p>
      </figcaption>
    </motion.figure>
  );
}

interface OfficePhotoGridProps {
  showHeader?: boolean;
  className?: string;
}

export default function OfficePhotoGrid({
  showHeader = true,
  className = "",
}: OfficePhotoGridProps) {
  if (!officePhotos.length) return null;

  const [featured, ...rest] = officePhotos;

  return (
    <div className={className}>
      {showHeader && (
        <ScrollReveal>
          <h3 className="heading-md mb-2">Based in Gandhipuram, Coimbatore</h3>
          <p className="mb-6 max-w-2xl text-site-muted">
            Our real office on Sathy Road — strategy sessions, team collaboration,
            and client consultations across Tamil Nadu.
          </p>
        </ScrollReveal>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
        <ScrollReveal className="sm:col-span-2 lg:row-span-2">
          <OfficeImageCard photo={featured} featured />
        </ScrollReveal>

        {rest.map((photo, i) => (
          <ScrollReveal key={photo.src} delay={0.06 + i * 0.06}>
            <OfficeImageCard photo={photo} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
