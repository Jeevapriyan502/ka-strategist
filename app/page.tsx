import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "KA Strategist | Digital Marketing Agency in Tamil Nadu",
  description:
    "KA Strategist is a Coimbatore-based digital marketing agency serving Tamil Nadu — branding, SEO, Meta ads, social media, websites, and software development.",
  openGraph: {
    title: "Digital Marketing Agency in Tamil Nadu | KA Strategist",
    description:
      "Expert Branding, Lead Generation, and Web Development services in Tamil Nadu.",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
