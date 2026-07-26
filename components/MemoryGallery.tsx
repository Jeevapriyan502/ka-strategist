"use client";

import Image from "next/image";
import MediaImage from "@/components/MediaImage";

export interface MemoryGalleryItem {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  local?: boolean;
}

interface MemoryGalleryProps {
  items: MemoryGalleryItem[];
  reverse?: boolean;
  duration?: number;
  hint?: string;
}

function GalleryCard({ item }: { item: MemoryGalleryItem }) {
  return (
    <article className="memory-gallery-card group">
      <div className="relative aspect-[4/3] h-full w-full bg-site-surface">
        {item.local ? (
          <MediaImage
            src={item.src}
            alt={item.alt}
            fill
            placeholderLabel={item.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 70vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="memory-gallery-card-shine" aria-hidden />
      <div className="memory-gallery-card-overlay">
        <h3 className="text-sm font-semibold tracking-wide text-white">{item.title}</h3>
        {item.subtitle && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">
            {item.subtitle}
          </p>
        )}
      </div>
    </article>
  );
}

export default function MemoryGallery({
  items,
  reverse = false,
  duration = 45,
  hint = "Hover to pause · scrolls automatically",
}: MemoryGalleryProps) {
  const track = [...items, ...items];

  return (
    <div className="memory-gallery-stage">
      <div className="memory-gallery-fade memory-gallery-fade-left" />
      <div className="memory-gallery-fade memory-gallery-fade-right" />
      <div className="memory-gallery-row">
        <div
          className={`memory-gallery-track ${reverse ? "memory-gallery-track-reverse" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {track.map((item, i) => (
            <GalleryCard key={`${item.src}-${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
      <p className="memory-gallery-hint">{hint}</p>
    </div>
  );
}
