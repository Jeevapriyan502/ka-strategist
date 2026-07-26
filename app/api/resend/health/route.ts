import { NextResponse } from "next/server";
import { checkResendHealth } from "@/lib/resend/health";

/** GET /api/resend/health — verify Resend API key */
export async function GET() {
  const health = await checkResendHealth();
  const status = health.connected ? 200 : health.configured ? 503 : 200;

  return NextResponse.json(health, { status });
}
