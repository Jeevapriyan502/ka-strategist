export interface CaseStudy {
  title: string;
  category: string;
  description: string;
  results: string[];
  color: string;
  tag: string;
  tagColor: string;
  badgeBg: string;
  client?: string;
  location?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    title: "TechNova Rebrand & Lead Gen",
    category: "Branding + Lead Generation",
    client: "TechNova Solutions",
    location: "Coimbatore",
    description:
      "Complete brand overhaul and multi-channel lead generation campaign that tripled qualified leads in 6 months.",
    results: ["3x Lead Increase", "45% Lower CPA", "Brand Recognition +200%"],
    color: "from-site-accent/20 to-site-accent/5",
    tag: "Branding",
    tagColor: "text-site-accent",
    badgeBg: "bg-site-accent/10 text-site-accent",
  },
  {
    title: "Bloom Boutique E-Commerce",
    category: "Website Development",
    client: "Bloom Boutique",
    location: "Tiruppur",
    description:
      "Custom e-commerce platform with inventory management, Instagram shop integration, and festival sale landing pages.",
    results: ["200% Sales Growth", "0.8s Load Time", "Mobile-First Design"],
    color: "from-site-sky/20 to-site-sky/5",
    tag: "Web Dev",
    tagColor: "text-site-sky",
    badgeBg: "bg-site-sky/10 text-site-sky",
  },
  {
    title: "GreenHarvest CRM Platform",
    category: "Software Development",
    client: "GreenHarvest Agro",
    location: "Erode",
    description:
      "Bespoke CRM with field agent tracking, order management, and automated reporting for an agro company.",
    results: ["60% Time Saved", "Zero Data Loss", "Real-time Analytics"],
    color: "from-site-warm/20 to-site-warm/5",
    tag: "Software",
    tagColor: "text-site-warm",
    badgeBg: "bg-site-warm/10 text-site-warm",
  },
  {
    title: "EduSpark Digital Campaign",
    category: "Lead Generation",
    client: "EduSpark Academy",
    location: "Chennai",
    description:
      "Full-funnel Meta and Google ads targeting parents and students across Tamil Nadu with Tamil + English creatives.",
    results: ["500+ Enrollments", "40% Lower CPA", "5x ROAS"],
    color: "from-site-accent/20 to-site-sky/5",
    tag: "Lead Gen",
    tagColor: "text-site-accent",
    badgeBg: "bg-site-accent/10 text-site-accent",
  },
  {
    title: "MediCare Portal Redesign",
    category: "Website Development",
    client: "MediCare Clinic",
    location: "Madurai",
    description:
      "Patient portal with appointment booking, WhatsApp enquiry flow, and doctor profile pages optimised for local SEO.",
    results: ["85% User Satisfaction", "50% Fewer Calls", "Local SEO Top 3"],
    color: "from-site-sky/20 to-site-warm/5",
    tag: "Web Dev",
    tagColor: "text-site-sky",
    badgeBg: "bg-site-sky/10 text-site-sky",
  },
  {
    title: "AutoParts Inventory System",
    category: "Software Development",
    client: "AutoParts TN",
    location: "Salem",
    description:
      "Inventory system with barcode scanning, supplier integration, and daily sales dashboards for multi-branch shops.",
    results: ["30% Less Stockouts", "Automated Reorders", "Multi-warehouse"],
    color: "from-site-warm/20 to-site-accent/5",
    tag: "Software",
    tagColor: "text-site-warm",
    badgeBg: "bg-site-warm/10 text-site-warm",
  },
  {
    title: "Royal Tiles Social & Branding",
    category: "Branding + Social Media",
    client: "Royal Tiles & Granites",
    location: "Coimbatore",
    description:
      "Showroom branding, reel content, and Meta ads for walk-in enquiries and dealer network growth.",
    results: ["2x Showroom Visits", "Reels 1M+ Views", "Strong Brand Recall"],
    color: "from-site-accent/15 to-site-warm/10",
    tag: "Branding",
    tagColor: "text-site-accent",
    badgeBg: "bg-site-accent/10 text-site-accent",
  },
  {
    title: "FitLife Gym Lead Funnel",
    category: "Meta Ads + Landing Page",
    client: "FitLife Gym",
    location: "Coimbatore",
    description:
      "Membership offer funnel with ad creatives, landing page, and WhatsApp automation for trial bookings.",
    results: ["300+ Trial Signups", "₹120 Cost Per Lead", "35% Conversion"],
    color: "from-site-sky/15 to-site-accent/10",
    tag: "Meta Ads",
    tagColor: "text-site-sky",
    badgeBg: "bg-site-sky/10 text-site-sky",
  },
];
