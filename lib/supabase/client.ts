import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

let browserClient: SupabaseClient | null = null;

/** Public Supabase client (anon key). Safe for browser + server reads/inserts allowed by RLS. */
export function createSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  const url = getSupabaseUrl()!;
  const key = getSupabaseAnonKey()!;

  if (typeof window !== "undefined") {
    if (!browserClient) {
      browserClient = createClient(url, key);
    }
    return browserClient;
  }

  return createClient(url, key);
}
