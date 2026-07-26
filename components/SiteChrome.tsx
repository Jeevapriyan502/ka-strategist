"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ClientErrorBoundary label="main">{children}</ClientErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
