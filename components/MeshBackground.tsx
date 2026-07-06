"use client";

export default function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark" />
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-site-accent/6 blur-[100px]" />
      <div className="absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-site-sky/5 blur-[90px]" />
    </div>
  );
}
