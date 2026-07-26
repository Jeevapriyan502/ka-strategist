"use client";

import Image from "next/image";
import { heroStockImages } from "@/lib/site-media";

const SCROLL_ROWS = [
  { top: "6%", duration: 55, reverse: false },
  { top: "36%", duration: 68, reverse: true },
  { top: "66%", duration: 50, reverse: false },
];

const ICON_CHIPS = ["📱", "📈", "🎯", "✨", "💡", "🚀"];

function ScrollRow({
  images,
  duration,
  reverse,
  top,
}: {
  images: typeof heroStockImages;
  duration: number;
  reverse: boolean;
  top: string;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="celebration-scroll-row" style={{ top }}>
      <div
        className={`celebration-scroll-track ${reverse ? "celebration-scroll-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((img, i) => (
          <div key={`${img.src}-${i}`} className="celebration-scroll-card">
            <Image
              src={img.src}
              alt=""
              width={176}
              height={112}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CelebrationBackdrop() {
  const chips = [...ICON_CHIPS, ...ICON_CHIPS, ...ICON_CHIPS];

  return (
    <div className="celebration-backdrop" aria-hidden>
      {SCROLL_ROWS.map((row) => (
        <ScrollRow
          key={row.top}
          images={heroStockImages}
          duration={row.duration}
          reverse={row.reverse}
          top={row.top}
        />
      ))}

      <div className="celebration-emoji-row" style={{ bottom: "8%" }}>
        <div className="celebration-emoji-track" style={{ animationDuration: "42s" }}>
          {chips.map((chip, i) => (
            <span key={`${chip}-${i}`} className="celebration-emoji-chip">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="celebration-backdrop-vignette" />
    </div>
  );
}
