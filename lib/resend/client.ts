import { Resend } from "resend";
import { isResendConfigured, getResendApiKey } from "@/lib/resend/env";

let client: Resend | null = null;

export function createResendClient(): Resend | null {
  if (!isResendConfigured()) return null;

  const key = getResendApiKey()!;
  if (!client) {
    client = new Resend(key);
  }
  return client;
}
