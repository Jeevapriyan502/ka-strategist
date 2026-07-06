import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseClient } from "@/lib/supabase/client";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

export type SupabaseHealth = {
  configured: boolean;
  adminConfigured: boolean;
  connected: boolean;
  tables: {
    leads: boolean;
    blog_posts: boolean;
  };
  message: string;
};

export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  const configured = isSupabaseConfigured();
  const adminConfigured = isSupabaseAdminConfigured();

  if (!configured) {
    return {
      configured: false,
      adminConfigured,
      connected: false,
      tables: { leads: false, blog_posts: false },
      message:
        "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    };
  }

  const supabase = createSupabaseAdmin() ?? createSupabaseClient();
  if (!supabase) {
    return {
      configured,
      adminConfigured,
      connected: false,
      tables: { leads: false, blog_posts: false },
      message: "Could not create Supabase client",
    };
  }

  const [leads, posts] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
  ]);

  const leadsOk = !leads.error;
  const postsOk = !posts.error;
  const connected = leadsOk && postsOk;

  let message = "Connected to Supabase";
  if (!connected) {
    if (leads.error?.message.includes("does not exist")) {
      message = "Run supabase/schema.sql in your Supabase SQL Editor";
    } else {
      message = leads.error?.message || posts.error?.message || "Connection failed";
    }
  } else if (!adminConfigured) {
    message =
      "Connected. Add SUPABASE_SERVICE_ROLE_KEY for blog admin writes at /admin/blog";
  }

  return {
    configured,
    adminConfigured,
    connected,
    tables: { leads: leadsOk, blog_posts: postsOk },
    message,
  };
}
