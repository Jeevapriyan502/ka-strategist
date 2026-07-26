"use client";

import { type ReactNode } from "react";

interface ScrollMarqueeProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

const speedClass = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
};

const reverseClass = {
  slow: "animate-marquee-reverse-slow",
  normal: "animate-marquee-reverse",
  fast: "animate-marquee-reverse-fast",
};

export default function ScrollMarquee({
  children,
  speed = "normal",
  direction = "left",
  className = "",
  pauseOnHover = true,
}: ScrollMarqueeProps) {
  const anim = direction === "right" ? reverseClass[speed] : speedClass[speed];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        className={`flex w-max gap-4 ${anim} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
