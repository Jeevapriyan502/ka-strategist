"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Globe,
  Megaphone,
  MessageCircle,
  Palette,
  Search,
  Share2,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Auto-looping INK architecture:
 * channels join → phone appears → hold → reset → repeat.
 * No tap. Sized for mobile (centered) and laptop (neat).
 */

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Phase = "spread" | "join" | "phone" | "exit";

const CYCLE: { phase: Phase; ms: number }[] = [
  { phase: "spread", ms: 2000 },
  { phase: "join", ms: 850 },
  { phase: "phone", ms: 4000 },
  { phase: "exit", ms: 650 },
];

const channels = [
  { id: "seo", icon: Search, label: "SEO", color: "#E53935", x: 50, y: 12 },
  { id: "meta", icon: Megaphone, label: "Meta Ads", color: "#1877F2", x: 82, y: 38 },
  { id: "google", icon: Globe, label: "Google", color: "#F57C00", x: 70, y: 82 },
  { id: "social", icon: Share2, label: "Social", color: "#43A047", x: 30, y: 82 },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "#25D366", x: 18, y: 38 },
] as const;

const phoneServices = [
  {
    title: "Branding",
    icon: Palette,
    color: "#E53935",
    tagline: "Logo, identity & creatives",
  },
  {
    title: "Lead Generation",
    icon: TrendingUp,
    color: "#1E88E5",
    tagline: "SEO, Meta & Google ads",
  },
  {
    title: "Websites",
    icon: Globe,
    color: "#F57C00",
    tagline: "Fast, mobile-first sites",
  },
  {
    title: "Software",
    icon: Code2,
    color: "#43A047",
    tagline: "CRM, dashboards & apps",
  },
] as const;

function useCyclePhase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const { ms } = CYCLE[index];
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % CYCLE.length);
    }, ms);
    return () => window.clearTimeout(t);
  }, [index]);

  return CYCLE[index].phase;
}

function PhoneScreen() {
  const [svc, setSvc] = useState(0);
  const service = phoneServices[svc];

  useEffect(() => {
    const t = window.setInterval(() => {
      setSvc((i) => (i + 1) % phoneServices.length);
    }, 1600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#f0f2f5]">
      <div className="flex items-center justify-between bg-white px-2.5 py-1">
        <span className="text-[8px] font-semibold text-site-text">9:41</span>
        <span className="text-[7px] font-bold text-site-muted">KA Services</span>
        <span className="h-1.5 w-3 rounded-sm bg-site-text/20" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease }}
          className="flex flex-1 flex-col p-2"
        >
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: service.color }}
              >
                <service.icon size={14} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold leading-tight text-site-text">
                  {service.title}
                </p>
                <p className="text-[7px] text-site-subtle">KA Strategist</p>
              </div>
            </div>

            <div
              className="mx-2 mb-2 flex flex-1 items-center justify-center rounded-md"
              style={{
                background: `linear-gradient(135deg, ${service.color}33, ${service.color}0a)`,
              }}
            >
              <service.icon size={28} style={{ color: service.color }} strokeWidth={1.7} />
            </div>

            <p className="px-2 pb-1 text-[8px] leading-snug text-site-muted">
              {service.tagline}
            </p>

            <div
              className="mx-2 mb-2 rounded-md py-1.5 text-center text-[8px] font-bold text-white"
              style={{ backgroundColor: service.color }}
            >
              Learn more
            </div>
          </div>

          <div className="mt-1.5 flex justify-center gap-1">
            {phoneServices.map((s, i) => (
              <span
                key={s.title}
                className={`h-1 rounded-full transition-all ${
                  i === svc ? "w-3 bg-site-accent" : "w-1 bg-site-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function MarketingHeroVisual() {
  const phase = useCyclePhase();
  const joined = phase === "join" || phase === "phone";
  const showPhone = phase === "phone";
  const showHub = phase === "spread" || phase === "join" || phase === "exit";

  return (
    <div className="relative mx-auto w-full max-w-[300px] overflow-x-clip sm:max-w-[340px] lg:max-w-[380px]">
      <p className="mb-2 px-1 text-center text-[11px] font-medium text-site-muted sm:mb-3">
        {showPhone
          ? "All services running on mobile"
          : joined
            ? "Channels connecting…"
            : "INK architecture — channels join into one hub"}
      </p>

      {/* Fixed height stage — phone fits fully, everything centered */}
      <div className="relative mx-auto h-[330px] w-full sm:h-[380px] md:h-[400px]">
        {/* Soft hub ring — only while channels visible */}
        <AnimatePresence>
          {showHub && !showPhone && (
            <motion.div
              key="ring"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.08, 1] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.25 },
                scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-site-accent/20 sm:h-28 sm:w-28"
            />
          )}
        </AnimatePresence>

        {/* Connector lines (fade when joining) */}
        <svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {channels.map((ch, i) => (
            <motion.line
              key={ch.id}
              x1="50"
              y1="50"
              x2={ch.x}
              y2={ch.y}
              stroke={ch.color}
              strokeWidth="0.5"
              strokeDasharray="2.2 2.2"
              animate={{
                opacity: joined || phase === "exit" ? 0 : [0.25, 0.5, 0.25],
              }}
              transition={
                joined || phase === "exit"
                  ? { duration: 0.35 }
                  : { duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }
              }
            />
          ))}
        </svg>

        {/* Center INK hub */}
        <AnimatePresence>
          {showHub && !showPhone && (
            <motion.div
              key="hub"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: phase === "join" ? 0.35 : 1,
                scale: phase === "join" ? 0.9 : 1,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease }}
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            >
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-dashed border-site-accent/40 bg-white shadow-card sm:h-20 sm:w-20">
                <span className="gradient-text text-xl font-black leading-none sm:text-2xl">
                  INK
                </span>
                <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-site-muted sm:text-[8px]">
                  One Hub
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Channels — join to center via left/top + Framer x/y centering */}
        {channels.map((ch, i) => (
          <motion.div
            key={ch.id}
            className="absolute z-20 flex flex-col items-center gap-0.5"
            initial={false}
            animate={{
              left: joined ? "50%" : `${ch.x}%`,
              top: joined ? "50%" : `${ch.y}%`,
              x: "-50%",
              y: "-50%",
              opacity: showPhone || phase === "exit" ? 0 : 1,
              scale: joined ? 0.35 : 1,
            }}
            transition={{
              duration: phase === "join" ? 0.7 : phase === "exit" ? 0.45 : 0.55,
              delay: phase === "join" ? i * 0.06 : phase === "spread" ? i * 0.05 : 0,
              ease,
            }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md ring-2 ring-white sm:h-9 sm:w-9"
              style={{ backgroundColor: ch.color }}
            >
              <ch.icon size={16} strokeWidth={2.2} />
            </div>
            <span
              className={`hidden rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-semibold text-site-text shadow-soft sm:inline sm:text-[9px] ${
                joined ? "sm:opacity-0" : "sm:opacity-100"
              }`}
            >
              {ch.label}
            </span>
          </motion.div>
        ))}

        {/* Phone — fully visible, centered in stage */}
        <AnimatePresence>
          {showPhone && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <div className="relative h-[230px] w-[120px] rounded-[1.4rem] border-[3px] border-gray-900 bg-gray-900 shadow-card-hover sm:h-[270px] sm:w-[142px] sm:rounded-[1.6rem] sm:border-[4px] md:h-[290px] md:w-[152px]">
                  <div className="absolute left-1/2 top-1.5 z-10 h-1 w-9 -translate-x-1/2 rounded-full bg-gray-800 sm:w-10" />
                  <div className="absolute inset-[5px] overflow-hidden rounded-[1.1rem] bg-white sm:inset-[6px] sm:rounded-[1.25rem]">
                    <PhoneScreen />
                  </div>
                </div>
                <p className="mt-2.5 flex items-center gap-1 text-[9px] font-semibold text-site-muted sm:mt-3 sm:text-[10px]">
                  <Smartphone size={11} />
                  Branding · Leads · Web · Software
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
