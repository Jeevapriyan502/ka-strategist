import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseClient } from "@/lib/supabase/client";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/env";

export function getSupabaseForLeads() {
  if (isSupabaseAdminConfigured()) {
    return createSupabaseAdmin();
  }
  if (isSupabaseConfigured()) {
    return createSupabaseClient();
  }
  return null;
}
