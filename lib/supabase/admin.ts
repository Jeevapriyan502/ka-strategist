import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseAdminConfigured,
} from "@/lib/supabase/env";

/** Server-only admin client. Bypasses RLS — never expose to the browser. */
export function createSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseAdminConfigured()) return null;

  return createClient(getSupabaseUrl()!, getSupabaseServiceRoleKey()!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
