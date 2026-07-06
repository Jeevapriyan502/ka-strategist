import type { Metadata } from "next";
import AdminBlogClient from "@/components/AdminBlogClient";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return <AdminBlogClient />;
}
