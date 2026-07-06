"use client";

import { Building2, User } from "lucide-react";
import { useState } from "react";

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  placeholderLabel?: string;
  icon?: "office" | "person";
}

export default function MediaImage({
  src,
  alt,
  className = "",
  fill = false,
  placeholderLabel = "Photo coming soon",
  icon = "office",
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const PlaceholderIcon = icon === "person" ? User : Building2;

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-site-card text-center ${
          fill ? "absolute inset-0 h-full w-full" : "min-h-[160px] w-full"
        } ${className}`}
      >
        <PlaceholderIcon size={40} className="mb-3 text-site-subtle" />
        <p className="px-4 text-xs text-site-subtle">{placeholderLabel}</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={
        fill
          ? `absolute inset-0 h-full w-full object-cover ${className}`
          : className
      }
    />
  );
}
