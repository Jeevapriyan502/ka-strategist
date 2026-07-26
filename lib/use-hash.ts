"use client";

import { useSyncExternalStore } from "react";

const sections = ["home", "about", "services", "portfolio", "process"] as const;
type Section = (typeof sections)[number];

export function sectionHref(sectionId: string) {
  return sectionId === "home" ? "/" : `/#${sectionId}`;
}

function getSectionFromUrl(): Section {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.replace("#", "");
  if (hash && sections.includes(hash as Section)) {
    return hash as Section;
  }

  const sectionParam = new URLSearchParams(window.location.search).get("section");
  if (sectionParam && sections.includes(sectionParam as Section)) {
    return sectionParam as Section;
  }

  return "home";
}

function normalizeSectionUrl() {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") return;

  const sectionParam = new URLSearchParams(window.location.search).get("section");
  if (!sectionParam || !sections.includes(sectionParam as Section)) return;

  if (sectionParam === "home") {
    window.history.replaceState(null, "", "/");
  } else {
    window.location.hash = sectionParam;
  }
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function notify() {
  listeners.forEach((cb) => cb());
}

if (typeof window !== "undefined") {
  normalizeSectionUrl();
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
}

export function useActiveSection(): string {
  return useSyncExternalStore(subscribe, getSectionFromUrl, () => "home");
}

export function navigateToSection(sectionId: string) {
  if (typeof window === "undefined") return;

  if (sectionId === "home") {
    const url = `${window.location.pathname === "/" ? "" : window.location.pathname}`;
    window.history.pushState(null, "", url || "/");
    notify();
  } else {
    window.location.hash = sectionId;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

export function isSectionActive(
  pathname: string,
  activeSection: string,
  sectionId: string
): boolean {
  if (pathname !== "/") return false;
  return activeSection === sectionId;
}
