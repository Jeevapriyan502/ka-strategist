"use client";

import { motion } from "framer-motion";
import { Briefcase, IndianRupee, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    value: "120+",
    label: "Clients across TN",
    icon: Users,
    gradient: "from-site-accent to-red-400",
    glow: "shadow-glow",
  },
  {
    value: "100+",
    label: "Projects delivered",
    icon: Briefcase,
    gradient: "from-site-sky to-blue-400",
    glow: "shadow-glow-sky",
  },
  {
    value: "7000+",
    label: "Leads generated",
    icon: TrendingUp,
    gradient: "from-site-warm to-amber-400",
    glow: "shadow-glow-warm",
  },
  {
    value: "₹5L+",
    label: "Ad spend managed",
    icon: IndianRupee,
    gradient: "from-site-accent to-site-sky",
    glow: "shadow-glow",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroStatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.55, ease }}
      className="mt-10 overflow-hidden rounded-2xl border border-white/60 bg-white/55 p-5 shadow-card backdrop-blur-md sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-widest text-site-muted">
          Trusted across Tamil Nadu
        </p>
        <span className="rounded-full bg-site-accent/10 px-3 py-1 text-[10px] font-semibold text-site-accent">
          Real numbers · Real results
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 + i * 0.08, ease }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-xl bg-white/80 p-4 shadow-soft transition-shadow duration-300 hover:shadow-card"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-80`}
            />
            <div
              className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient} text-white ${stat.glow}`}
            >
              <stat.icon size={18} strokeWidth={2.2} />
            </div>
            <div className="font-display text-2xl font-extrabold tracking-tight text-site-text sm:text-3xl">
              {stat.value}
            </div>
            <p className="mt-1 text-xs leading-snug text-site-muted sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
