export const serviceSections = [
  {
    id: "branding",
    title: "Branding",
    color: "text-site-accent",
    bg: "bg-site-accent/10",
    dot: "bg-site-accent",
    description:
      "Your brand is more than a logo — it’s how people feel when they see your name. We build clear positioning, visual identity, and consistent creative that makes your business instantly recognisable and trusted across Tamil Nadu.",
    features: [
      "Brand strategy & positioning",
      "Logo & visual identity",
      "Social media branding",
      "Ad creatives & shoots",
      "Brand guidelines & templates",
      "Tone of voice & messaging",
    ],
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    color: "text-site-sky",
    bg: "bg-site-sky/10",
    dot: "bg-site-sky",
    description:
      "SEO, Meta ads, Google ads, and conversion-focused landing pages that fill your pipeline with qualified enquiries — not just clicks. We track calls, forms, WhatsApp, and cost-per-lead so you always know what’s working.",
    features: [
      "SEO & local search",
      "Meta & Google ads",
      "Landing pages",
      "Email campaigns",
      "WhatsApp lead flows",
      "Conversion tracking & reporting",
    ],
  },
  {
    id: "web-development",
    title: "Website Development",
    color: "text-site-warm",
    bg: "bg-site-warm/10",
    dot: "bg-site-warm",
    description:
      "Fast, mobile-first websites built to convert visitors into calls, forms, WhatsApp enquiries, and sales. Designed with SEO foundations and performance in mind so your site feels premium on every device.",
    features: [
      "Custom websites",
      "E-commerce",
      "Performance tuning",
      "Maintenance & support",
      "SEO-ready structure",
      "Landing pages for ads",
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    color: "text-site-accent",
    bg: "bg-site-accent/10",
    dot: "bg-site-accent",
    description:
      "Custom dashboards, CRMs, and internal tools that streamline how your team works day-to-day. If you’re managing leads, orders, staff, or reporting in spreadsheets — we can turn it into a reliable system.",
    features: [
      "Web applications",
      "API integrations",
      "CRM tools",
      "Cloud hosting",
      "Admin dashboards",
      "Role-based access",
    ],
  },
] as const;

export const navSections = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "services", label: "Services", href: "/#services" },
  { id: "portfolio", label: "Portfolio", href: "/#portfolio" },
  { id: "process", label: "Process", href: "/#process" },
  { id: "blog", label: "Blog", href: "/blog", isPage: true },
] as const;
