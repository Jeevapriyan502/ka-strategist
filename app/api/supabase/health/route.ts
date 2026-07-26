import { checkSupabaseHealth } from "@/lib/supabase/health";
import { NextResponse } from "next/server";

/** GET /api/supabase/health — verify env vars and database tables */
export async function GET() {
  const health = await checkSupabaseHealth();
  const status = health.connected ? 200 : health.configured ? 503 : 200;

  return NextResponse.json(health, { status });
}
