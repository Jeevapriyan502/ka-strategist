"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  Target,
  PenTool,
  Rocket,
  LineChart,
} from "lucide-react";

const ease4 = [0.22, 1, 0.36, 1] as [number, number, number, number];
const stageViewport = { once: true, amount: 0.55 as const, margin: "-80px" as const };

const branches = [
  {
    letter: "I",
    title: "Influence",
    subtitle: "Get found",
    detail: "SEO, Google & Meta ads, content — bring the right people to you.",
    accent: "#E53935",
    leaves: ["SEO", "Meta Ads", "Content", "Google Ads"],
  },
  {
    letter: "N",
    title: "Nurture",
    subtitle: "Stay connected",
    detail: "WhatsApp, email, CRM — follow up fast so leads don't go cold.",
    accent: "#1E88E5",
    leaves: ["WhatsApp", "Email", "CRM", "Follow-up"],
  },
  {
    letter: "K",
    title: "Keep",
    subtitle: "Grow loyalty",
    detail: "Reviews, referrals, repeat buyers — long-term brand growth.",
    accent: "#F57C00",
    leaves: ["Reviews", "Referrals", "Retention", "Growth"],
  },
];

const processSteps = [
  { step: "01", icon: Search, title: "Discovery", desc: "Understand your business, customers, competitors, and goals.", accent: "#E53935" },
  { step: "02", icon: Target, title: "Strategy", desc: "Pick channels, map the funnel, and define weekly actions.", accent: "#1E88E5" },
  { step: "03", icon: PenTool, title: "Design & Build", desc: "Creatives, landing pages, tracking, and campaign setup.", accent: "#F57C00" },
  { step: "04", icon: Rocket, title: "Launch", desc: "Go live with controlled tests and clear success metrics.", accent: "#43A047" },
  { step: "05", icon: LineChart, title: "Optimize", desc: "Measure CPL/ROAS, improve creatives, and scale winners.", accent: "#1565C0" },
];

function ScrollStage({
  children,
  className = "",
  fromY = 28,
  fromX = 0,
}: {
  children: React.ReactNode;
  className?: string;
  fromY?: number;
  fromX?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: fromY, x: fromX, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={stageViewport}
      transition={{ duration: 0.65, ease: ease4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function InkFlowchart() {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <p className="mb-10 text-sm text-site-muted">
        Scroll down — each stage unlocks as you move through the flow.
      </p>

      {/* ===== INK Framework ===== */}
      <ScrollStage className="mb-2">
        <p className="mb-3 inline-block rounded-full border border-site-border bg-site-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-site-muted">
          INK Framework
        </p>
        <h3 className="text-xl font-bold tracking-tight text-site-text sm:text-2xl">
          How we grow brands long-term
        </h3>
      </ScrollStage>

      {/* Mind tree — root + trunk */}
      <div className="relative">
        <ScrollStage className="mt-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={stageViewport}
            transition={{ duration: 0.55, ease: "backOut" as const }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-site-accent via-site-sky to-site-warm shadow-lg"
          >
            <span className="text-lg font-black text-white">INK</span>
          </motion.div>
        </ScrollStage>

        <div className="mx-auto flex justify-center">
          <ScrollStage className="mt-0">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={stageViewport}
              transition={{ duration: 0.55, ease: "easeOut" as const }}
              className="h-12 w-[3px] origin-top rounded-full bg-gradient-to-b from-site-accent via-site-sky to-site-warm"
            />
          </ScrollStage>
        </div>

        {/* Branch connectors — spread like a mind tree */}
        <ScrollStage className="mt-0">
          <svg
            className="pointer-events-none mx-auto block h-12 w-full max-w-3xl"
            viewBox="0 0 600 50"
            preserveAspectRatio="none"
            fill="none"
          >
            {branches.map((branch, i) => {
              const startX = 300;
              const endX = i === 0 ? 100 : i === 1 ? 300 : 500;
              return (
                <motion.path
                  key={branch.letter}
                  d={`M${startX},0 C${startX},25 ${endX},25 ${endX},50`}
                  stroke={branch.accent}
                  strokeWidth="2.5"
                  strokeOpacity={0.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={stageViewport}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: "easeInOut" as const }}
                />
              );
            })}
          </svg>
        </ScrollStage>

        {/* Branch cards — 3-way mind tree layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={stageViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
          }}
          className="mt-2 grid gap-5 md:grid-cols-3"
        >
          {branches.map((branch, i) => (
            <motion.div
              key={branch.letter}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 24,
                  x: i === 0 ? -40 : i === 2 ? 40 : 0,
                  scale: 0.88,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: ease4 },
                },
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left shadow-card transition-all duration-300 hover:shadow-lg ${
                i === 1 ? "md:mt-4" : ""
              }`}
              style={{ borderColor: `${branch.accent}30`, backgroundColor: `${branch.accent}05` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${branch.accent}, ${branch.accent}80)` }}
              />
              <div
                className="absolute left-1/2 -top-3 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-site-surface"
                style={{ backgroundColor: branch.accent }}
              />
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl font-black" style={{ color: branch.accent }}>
                  {branch.letter}
                </span>
                <div>
                  <h4 className="font-bold text-site-text">{branch.title}</h4>
                  <p className="text-xs font-semibold" style={{ color: branch.accent }}>
                    {branch.subtitle}
                  </p>
                </div>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-site-muted">{branch.detail}</p>
              <div className="flex flex-wrap gap-2">
                {branch.leaves.map((leaf, j) => (
                  <motion.span
                    key={leaf}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + j * 0.06, ease: "backOut" as const }}
                    className="rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{
                      color: branch.accent,
                      backgroundColor: `${branch.accent}15`,
                      border: `1px solid ${branch.accent}25`,
                    }}
                  >
                    {leaf}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <ScrollStage className="my-12">
        <div className="mx-auto h-[1px] max-w-md bg-gradient-to-r from-transparent via-site-border to-transparent" />
      </ScrollStage>

      {/* Process intro */}
      <ScrollStage>
        <p className="mb-2 inline-block rounded-full border border-site-border bg-site-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-site-muted">
          The Journey
        </p>
        <h3 className="text-xl font-bold tracking-tight text-site-text sm:text-2xl">
          How every project flows
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-site-muted">
          After INK is set, your project moves through five clear stages — each unlocking as you scroll.
        </p>
      </ScrollStage>

      {/* Process steps — one stage per scroll */}
      <div className="relative mx-auto mt-10 max-w-xl">
        {processSteps.map((step, i) => (
          <ScrollStage key={step.step} fromX={48} className="relative mb-10 last:mb-0">
            {i > 0 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={stageViewport}
                transition={{ duration: 0.45, ease: ease4 }}
                className="absolute left-5 -top-10 bottom-[calc(100%-8px)] z-0 w-[2px] origin-top bg-gradient-to-b from-site-border to-transparent sm:left-7"
                style={{ height: "2.5rem" }}
              />
            )}
            <div className="relative flex items-start gap-4 text-left">
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={stageViewport}
                transition={{ duration: 0.5, ease: "backOut" as const }}
                className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-md sm:h-14 sm:w-14"
                style={{ backgroundColor: step.accent }}
              >
                <step.icon size={18} className="text-white sm:h-5 sm:w-5" strokeWidth={2.2} />
              </motion.div>
              <div className="pt-0 sm:pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.accent }}>
                  Step {step.step}
                </span>
                <h4 className="text-sm font-bold text-site-text sm:text-base">{step.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-site-muted sm:text-sm">{step.desc}</p>
              </div>
            </div>
          </ScrollStage>
        ))}
      </div>

      {/* Summary */}
      <ScrollStage className="mt-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-site-border bg-site-card px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-site-muted backdrop-blur-sm">
          <Sparkles size={14} className="text-site-accent" />
          INK Framework × 5 Steps = Real Growth
        </span>
      </ScrollStage>
    </div>
  );
}
