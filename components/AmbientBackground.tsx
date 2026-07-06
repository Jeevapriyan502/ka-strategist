"use client";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft grid + noise (prevents empty/flat feel) */}
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute -left-[15%] -top-[10%] h-[280px] w-[280px] animate-orb-float-1 rounded-full opacity-20 blur-[80px] sm:h-[520px] sm:w-[520px] sm:opacity-30 sm:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(229,57,53,0.3) 0%, rgba(198,40,40,0.1) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[10%] top-[20%] h-[240px] w-[240px] animate-orb-float-2 rounded-full opacity-15 blur-[80px] sm:h-[450px] sm:w-[450px] sm:opacity-25 sm:blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,136,229,0.25) 0%, rgba(21,101,192,0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-[5%] left-[30%] hidden h-[400px] w-[400px] animate-orb-float-3 rounded-full opacity-25 blur-[120px] sm:block"
        style={{
          background:
            "radial-gradient(circle, rgba(245,124,0,0.25) 0%, rgba(230,81,0,0.08) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
