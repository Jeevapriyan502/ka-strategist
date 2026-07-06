"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Code2,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Palette,
  Search,
  Share2,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Flex-centered hub — works on every screen size (no left/% drift). */
function HubLayer({
  children,
  className = "",
  z = "z-20",
}: {
  children: React.ReactNode;
  className?: string;
  z?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${z} ${className}`}
    >
      <div className="pointer-events-auto flex flex-col items-center">{children}</div>
    </div>
  );
}

function getChannelPosition(ch: (typeof channels)[number], isMobile: boolean) {
  if (!isMobile) return { x: ch.x, y: ch.y };
  // Tight symmetric ring — visual centroid stays on the stage center
  const mobile: Record<string, { x: number; y: number }> = {
    seo: { x: 50, y: 16 },
    meta: { x: 20, y: 36 },
    google: { x: 80, y: 36 },
    social: { x: 20, y: 64 },
    whatsapp: { x: 80, y: 64 },
  };
  return mobile[ch.id] ?? { x: ch.x, y: ch.y };
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

const channels = [
  { id: "seo", icon: Search, label: "SEO", color: "#E53935", x: 8, y: 12 },
  { id: "meta", icon: Megaphone, label: "Meta Ads", color: "#1877F2", x: 78, y: 6 },
  { id: "google", icon: Globe, label: "Google", color: "#F57C00", x: 84, y: 52 },
  { id: "social", icon: Share2, label: "Social", color: "#43A047", x: 12, y: 58 },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "#25D366", x: 46, y: 82 },
] as const;

const orbitBrands = [
  { id: "ka", label: "KA", color: "bg-gradient-to-br from-site-accent via-site-sky to-site-warm", text: true },
  {
    id: "instagram",
    label: "Instagram",
    color: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)",
    icon: Instagram,
  },
  { id: "facebook", label: "Facebook", color: "#1877F2", icon: Facebook },
  { id: "whatsapp", label: "WhatsApp", color: "#25D366", icon: MessageCircle },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", icon: Linkedin },
  { id: "meta", label: "Meta", color: "#1877F2", icon: Megaphone },
  { id: "youtube", label: "YouTube", color: "#FF0000", icon: Youtube },
  { id: "google", label: "Google", color: "#F57C00", icon: Globe },
] as const;

const phoneServices = [
  {
    title: "Branding",
    icon: Palette,
    color: "#E53935",
    gradient: "from-site-accent/30 to-site-accent/5",
    tagline: "Logo, identity & ad creatives",
    cta: "Build Your Brand",
  },
  {
    title: "Lead Generation",
    icon: TrendingUp,
    color: "#1E88E5",
    gradient: "from-site-sky/30 to-site-sky/5",
    tagline: "SEO, Meta & Google ads",
    cta: "Get More Leads",
  },
  {
    title: "Website Development",
    icon: Globe,
    color: "#F57C00",
    gradient: "from-site-warm/30 to-site-warm/5",
    tagline: "Fast, mobile-first websites",
    cta: "Launch Your Site",
  },
  {
    title: "Software Development",
    icon: Code2,
    color: "#E53935",
    gradient: "from-site-accent/25 to-site-sky/10",
    tagline: "CRM, dashboards & apps",
    cta: "Automate Your Work",
  },
] as const;

function RotatingBrandRing({ compact = false }: { compact?: boolean }) {
  const radius = compact ? 78 : 108;
  const size = compact ? 190 : 250;
  const center = size / 2;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-2 rounded-full border border-dashed border-site-border/40" />

      {orbitBrands.map((brand, i) => {
        const angle = (i / orbitBrands.length) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const cx = center + radius * Math.cos(rad);
        const cy = center + radius * Math.sin(rad);
        const Icon = "icon" in brand ? brand.icon : null;

        return (
          <motion.div
            key={brand.id}
            animate={{ rotate: -360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute flex flex-col items-center gap-0.5"
            style={{ left: cx, top: cy, transform: "translate(-50%, -50%)" }}
          >
            {"text" in brand ? (
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-black text-white shadow-md ring-2 ring-white ${brand.color}`}
              >
                KA
              </div>
            ) : (
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md ring-2 ring-white"
                style={{ background: brand.color }}
              >
                {Icon && <Icon size={16} strokeWidth={2.2} />}
              </div>
            )}
            <span className="rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-site-muted shadow-soft">
              {brand.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ServicesPhoneScreen() {
  const [index, setIndex] = useState(0);
  const service = phoneServices[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % phoneServices.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[260px] overflow-hidden bg-[#f0f2f5] sm:h-[300px] md:h-[320px]">
      <div className="flex items-center justify-between bg-white px-3 py-1.5">
        <span className="text-[9px] font-semibold text-site-text">9:41</span>
        <p className="text-[8px] font-bold text-site-muted">KA Services</p>
        <div className="flex gap-0.5">
          <span className="h-1.5 w-3 rounded-sm bg-site-text/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-site-text/20" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={service.title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: ease4 }}
          className="p-2.5"
        >
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-2 px-2.5 py-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm"
                style={{ backgroundColor: service.color }}
              >
                <service.icon size={16} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-site-text">{service.title}</p>
                <p className="text-[7px] text-site-subtle">KA Strategist · Tamil Nadu</p>
              </div>
            </div>

            <div className={`relative mx-2 mb-2 flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${service.gradient}`}>
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              />
              <motion.div
                animate={{ scale: [1, 1.12, 1], rotate: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <service.icon size={32} style={{ color: service.color }} strokeWidth={1.8} />
              </motion.div>
            </div>

            <p className="px-2.5 pb-2 text-[9px] leading-relaxed text-site-muted">{service.tagline}</p>

            <motion.button
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="mx-2 mb-2 w-[calc(100%-16px)] rounded-lg py-1.5 text-[9px] font-bold text-white"
              style={{ backgroundColor: service.color }}
            >
              {service.cta}
            </motion.button>

            <div className="flex items-center justify-between border-t border-site-border/40 px-2.5 py-1.5">
              <div className="flex gap-2">
                <Share2 size={11} className="text-site-muted" />
                <Megaphone size={11} className="text-site-muted" />
              </div>
              <span className="text-[7px] font-semibold text-site-subtle">Sponsored</span>
            </div>
          </div>

          <div className="mt-2 flex justify-center gap-1">
            {phoneServices.map((s, i) => (
              <span
                key={s.title}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-site-accent" : "w-1 bg-site-border"
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
  const [activated, setActivated] = useState(false);
  const isMobile = useIsMobile();

  const activateAll = useCallback(() => {
    if (activated) return;
    setActivated(true);
  }, [activated]);

  const phoneLeft = "50%";
  const phoneTop = "50%";

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[420px]">
      <p className="mb-3 text-center text-[11px] font-medium text-site-muted">
        {activated ? "All services running on mobile" : "Tap once — all channels connect"}
      </p>

      <div
        className="relative mx-auto aspect-square w-full max-w-[300px] sm:aspect-auto sm:h-[360px] sm:max-w-[320px] md:h-[380px] md:max-w-none"
        onClick={!activated ? activateAll : undefined}
        onKeyDown={(e) => {
          if (!activated && (e.key === "Enter" || e.key === " ")) activateAll();
        }}
        role={!activated ? "button" : undefined}
        tabIndex={!activated ? 0 : undefined}
      >
        <RotatingBrandRing compact={isMobile} />

        <BrandingBackdrop activated={activated} isMobile={isMobile} />
        <MarketingFloaters activated={activated} isMobile={isMobile} />
        <PhoneProximityEffects activated={activated} isMobile={isMobile} />

        <AnimatePresence>
          {activated && (
            <HubLayer className="max-lg:!translate-x-0 lg:translate-x-[-2.5rem]">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: ease4 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-[148px] rounded-[1.75rem] border-[4px] border-gray-900 bg-gray-900 shadow-card-hover sm:w-[162px] md:w-[180px]">
                  <div className="absolute left-1/2 top-1.5 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-gray-800" />
                  <div className="m-1 overflow-hidden rounded-[1.5rem] bg-white">
                    <ServicesPhoneScreen />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] font-semibold text-site-muted"
                >
                  <Smartphone size={11} />
                  Branding · Leads · Web · Software
                </motion.p>
              </motion.div>
            </HubLayer>
          )}
        </AnimatePresence>

        {!activated && (
          <HubLayer z="z-10">
            <motion.button
              type="button"
              onClick={activateAll}
              animate={isMobile ? { scale: 1 } : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: isMobile ? 0 : Infinity }}
              className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-dashed border-site-accent/50 bg-white/90 shadow-soft backdrop-blur-sm sm:h-16 sm:w-16"
            >
              <span className="gradient-text text-lg font-black">INK</span>
              <span className="mt-0.5 text-[8px] font-bold text-site-muted">Tap</span>
            </motion.button>
          </HubLayer>
        )}

        {channels.map((ch, i) => {
          const pos = getChannelPosition(ch, isMobile);
          return (
          <motion.button
            key={ch.id}
            type="button"
            onClick={activateAll}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: activated ? 0 : 1,
              scale: activated ? 0.15 : isMobile ? 0.9 : 1,
              left: activated ? phoneLeft : `${pos.x}%`,
              top: activated ? phoneTop : `${pos.y}%`,
            }}
            transition={{
              duration: 0.6,
              delay: activated ? i * 0.07 : 0.3 + i * 0.08,
              ease: ease4,
            }}
            whileHover={!activated ? { scale: 1.1 } : undefined}
            whileTap={!activated ? { scale: 0.92 } : undefined}
            className={`absolute z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 ${
              activated ? "pointer-events-none" : "cursor-pointer"
            }`}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-md ring-2 ring-white sm:h-9 sm:w-9 md:h-10 md:w-10"
              style={{ backgroundColor: ch.color }}
            >
              <ch.icon size={isMobile ? 15 : 17} strokeWidth={2.2} />
            </div>
            <span className="hidden rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-semibold text-site-text shadow-soft sm:inline sm:text-[9px]">
              {ch.label}
            </span>
          </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function PhoneProximityEffects({
  activated,
  isMobile,
}: {
  activated: boolean;
  isMobile: boolean;
}) {
  const phoneAnchor = "absolute inset-0 flex items-center justify-center";

  const reactions = [
    { icon: Heart, color: "#E53935", x: -52, delay: 0 },
    { icon: Zap, color: "#F57C00", x: 48, delay: 0.6 },
    { icon: Target, color: "#1E88E5", x: -38, delay: 1.2 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[18]">
      <motion.div
        animate={{
          scale: activated ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: activated ? [0.3, 0.08, 0.3] : [0.15, 0.05, 0.15],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        className={`${phoneAnchor} pointer-events-none`}
      >
        <div className="h-[160px] w-[160px] rounded-full border-2 border-site-accent/30 sm:h-[200px] sm:w-[200px]" />
      </motion.div>

      {!isMobile &&
        activated &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.4],
              left: ["72%", "50%", "50%"],
              top: ["28%", "50%", "50%"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.45,
              ease: ease4,
            }}
            className="absolute z-[19] h-2 w-2 -translate-x-1/2 rounded-full bg-site-sky shadow-glow-sky"
          />
        ))}

      {!isMobile &&
        reactions.map(({ icon: Icon, color, x, delay }) => (
          <motion.div
            key={x}
            animate={{
              y: activated ? [-8, -52, -8] : [-4, -28, -4],
              opacity: activated ? [0.4, 1, 0.4] : [0.25, 0.7, 0.25],
              x: [0, x > 0 ? 6 : -6, 0],
            }}
            transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
            className={`${phoneAnchor} flex h-6 w-6 items-center justify-center rounded-full bg-white/95 shadow-soft`}
            style={{ marginLeft: x }}
          >
            <Icon size={11} style={{ color }} fill={Icon === Heart ? color : undefined} />
          </motion.div>
        ))}

      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: activated ? 1 : 0.7, scale: 1, y: activated ? [0, -4, 0] : 0 }}
            transition={{
              opacity: { duration: 0.4, delay: activated ? 0.5 : 0 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`${phoneAnchor} -mt-[118px] ml-[72px] rounded-xl bg-white/95 px-2 py-1.5 shadow-card backdrop-blur-sm sm:ml-[80px]`}
          >
            <div className="flex items-center gap-1.5">
              <MousePointerClick size={11} className="text-site-accent" />
              <div>
                <motion.p
                  key={activated ? "on" : "off"}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-[9px] font-extrabold text-site-text"
                >
                  {activated ? "127 clicks" : "Live tracking"}
                </motion.p>
                <p className="text-[7px] text-site-subtle">This week</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: activated ? [0, -12, 12, -8, 0] : [0, -6, 6, 0] }}
            transition={{ duration: activated ? 2.5 : 4, repeat: Infinity, repeatDelay: 1.5 }}
            className={`${phoneAnchor} -mt-[100px] -ml-[78px] flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-soft sm:-ml-[88px]`}
          >
            <Bell size={13} className="text-site-sky" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-site-accent text-[7px] font-bold text-white"
            >
              3
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: activated ? 1 : 0.65, x: 0, y: activated ? [0, 5, 0] : 0 }}
            transition={{
              opacity: { duration: 0.45, delay: activated ? 0.7 : 0.2 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
            }}
            className={`${phoneAnchor} mt-[108px] ml-[64px] w-[76px] rounded-xl bg-white/95 p-2 shadow-soft backdrop-blur-sm sm:ml-[72px]`}
          >
            <p className="mb-1 text-[7px] font-semibold text-site-muted">Funnel</p>
            {[
              { label: "Views", w: "100%", c: "#1E88E5" },
              { label: "Clicks", w: "68%", c: "#F57C00" },
              { label: "Leads", w: "34%", c: "#E53935" },
            ].map((step, i) => (
              <div key={step.label} className="mb-0.5">
                <div className="h-1 overflow-hidden rounded-full bg-site-border/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: step.w }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: ease4 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: step.c }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}

      {activated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: isMobile ? 0 : [0, -3, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.85 },
            y: isMobile ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className={
            isMobile
              ? "absolute bottom-[6%] left-1/2 z-[19] flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#25D366]/12 px-2.5 py-1"
              : `${phoneAnchor} mt-[88px] flex items-center gap-1.5 rounded-full bg-[#25D366]/12 px-2.5 py-1 sm:mt-[96px]`
          }
        >
          <MessageCircle size={10} className="text-[#25D366]" />
          <span className="text-[8px] font-bold text-[#128C7E]">New inquiry!</span>
        </motion.div>
      )}
    </div>
  );
}

function MarketingFloaters({
  activated,
  isMobile,
}: {
  activated: boolean;
  isMobile: boolean;
}) {
  const bars = [35, 52, 44, 68, 58, 80, 72];

  return (
    <div className="pointer-events-none absolute inset-0 z-[15]">
      {!isMobile && (
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{
          opacity: activated ? 1 : 0.85,
          x: 0,
          y: isMobile ? 0 : activated ? [0, -6, 0] : [0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: activated ? 0.4 : 0 },
          y: isMobile ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.5 },
        }}
        className="absolute right-[6%] top-[8%] rounded-xl bg-white/95 px-2 py-1.5 shadow-card backdrop-blur-sm sm:right-[8%] sm:top-[14%] sm:px-2.5 sm:py-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-site-sky/15">
            <Users size={13} className="text-site-sky" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-site-text">New Lead</p>
            <p className="text-[8px] text-site-muted">WhatsApp · Coimbatore</p>
          </div>
        </div>
      </motion.div>
      )}

      {!isMobile && (
        <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: activated ? 1 : 0.8,
          x: 0,
          y: activated ? [0, 5, 0] : [0, 3, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: activated ? 0.55 : 0.1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          x: { duration: 0.5 },
        }}
        className="absolute left-[2%] top-[38%] rounded-xl bg-white/95 px-2.5 py-1.5 shadow-soft backdrop-blur-sm sm:left-[6%]"
      >
        <div className="flex items-center gap-1.5">
          <TrendingUp size={12} className="text-site-accent" />
          <div>
            <p className="text-[10px] font-extrabold text-site-accent">4.2× ROAS</p>
            <p className="text-[7px] text-site-subtle">Meta campaign</p>
          </div>
        </div>
      </motion.div>

      {/* Mini performance chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: activated ? 1 : 0.75, y: 0 }}
        transition={{ duration: 0.55, delay: activated ? 0.65 : 0.15 }}
        className="absolute bottom-[14%] right-[6%] w-[88px] rounded-xl bg-white/95 p-2 shadow-soft backdrop-blur-sm sm:right-[10%]"
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[7px] font-semibold text-site-muted">Weekly</span>
          <BarChart3 size={10} className="text-site-sky" />
        </div>
        <div className="flex h-7 items-end justify-between gap-0.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: ease4 }}
              className="w-full origin-bottom rounded-sm bg-gradient-to-t from-site-sky to-site-sky/40"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Ad live badge */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: activated ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute left-[8%] bottom-[22%] flex items-center gap-1 rounded-full bg-site-accent/10 px-2 py-1 backdrop-blur-sm sm:left-[12%]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        <span className="text-[8px] font-bold text-site-accent">Ad Live</span>
      </motion.div>

      {/* Engagement burst */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[18%] bottom-[28%] flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 shadow-soft"
      >
        <Zap size={10} className="text-site-warm" fill="currentColor" />
        <span className="text-[8px] font-bold text-site-warm">+32%</span>
      </motion.div>
        </>
      )}

      {/* Floating ad tags when activated */}
      {activated && !isMobile && (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            className="absolute left-[22%] top-[24%] rounded-full bg-[#1877F2]/15 px-2 py-0.5 text-[7px] font-bold text-[#1877F2]"
          >
            Sponsored
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [0, 6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 0.6 }}
            className="absolute right-[24%] top-[30%] rounded-full bg-site-warm/15 px-2 py-0.5 text-[7px] font-bold text-site-warm"
          >
            1.2K reach
          </motion.span>
        </>
      )}
    </div>
  );
}

function BrandingBackdrop({
  activated,
  isMobile,
}: {
  activated: boolean;
  isMobile: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-[12%] flex -translate-x-1/2 gap-1.5 sm:top-[14%] sm:gap-2"
      >
        {[
          { c: "#E53935", w: "w-8 sm:w-10" },
          { c: "#1E88E5", w: "w-10 sm:w-14" },
          { c: "#F57C00", w: "w-9 sm:w-12" },
          { c: "#43A047", w: "w-8 sm:w-10" },
        ].map((s, i) => (
          <motion.div
            key={s.c}
            animate={{ y: isMobile ? 0 : activated ? [0, -4, 0] : [0, -2, 0] }}
            transition={
              isMobile
                ? undefined
                : { duration: 2.8 + i * 0.35, repeat: Infinity, ease: "easeInOut" }
            }
            className={`h-2 ${s.w} rounded-full shadow-soft sm:h-2.5`}
            style={{ backgroundColor: s.c, opacity: 0.5 }}
          />
        ))}
      </motion.div>

      {!isMobile && (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M10,70 C25,55 35,60 50,46 C64,33 78,30 92,34"
          stroke="rgba(0,0,0,0.16)"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0.0 }}
          animate={{ pathLength: activated ? 1 : 0.55, opacity: activated ? 0.22 : 0.14 }}
          transition={{ duration: 0.9, ease: ease4 }}
        />
        <motion.path
          d="M12,74 C28,58 36,64 50,50 C66,35 78,34 90,38"
          stroke="rgba(229,57,53,0.25)"
          strokeWidth="1.1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.0 }}
          animate={{ pathLength: activated ? 1 : 0.4, opacity: activated ? 0.28 : 0.16 }}
          transition={{ duration: 1.0, ease: ease4, delay: 0.05 }}
        />
        <motion.circle
          cx="50"
          cy="46"
          r="1.6"
          fill="rgba(30,136,229,0.35)"
          initial={{ scale: 0 }}
          animate={{ scale: activated ? 1 : 0.7 }}
          transition={{ duration: 0.5, ease: "backOut" as const }}
        />
      </svg>
      )}
    </div>
  );
}
