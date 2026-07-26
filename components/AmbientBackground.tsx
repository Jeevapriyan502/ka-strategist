"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft grid — static, cheap */}
      <div
        className="absolute inset-0 opacity-[0.28] md:opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Noise texture — desktop only (expensive on mobile GPUs) */}
      <div
        className="absolute inset-0 hidden opacity-[0.06] mix-blend-multiply md:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Orbs: static + lighter blur on mobile; float only from md up */}
      <div
        className="absolute -left-[20%] -top-[12%] h-[280px] w-[280px] rounded-full opacity-25 blur-[48px] md:-left-[15%] md:-top-[10%] md:h-[520px] md:w-[520px] md:animate-orb-float-1 md:opacity-30 md:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(229,57,53,0.28) 0%, rgba(198,40,40,0.08) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[18%] top-[18%] h-[240px] w-[240px] rounded-full opacity-20 blur-[48px] md:-right-[10%] md:top-[20%] md:h-[450px] md:w-[450px] md:animate-orb-float-2 md:opacity-25 md:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,136,229,0.22) 0%, rgba(21,101,192,0.06) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[8%] left-[22%] h-[220px] w-[220px] rounded-full opacity-20 blur-[48px] md:-bottom-[5%] md:left-[30%] md:h-[400px] md:w-[400px] md:animate-orb-float-3 md:opacity-25 md:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245,124,0,0.22) 0%, rgba(230,81,0,0.06) 42%, transparent 70%)",
        }}
      />
    </div>
  );
}
