import { createResendClient } from "@/lib/resend/client";
import {
  getContactEmail,
  getResendFromEmail,
  isResendConfigured,
} from "@/lib/resend/env";

export type ResendHealth = {
  configured: boolean;
  connected: boolean;
  from: string;
  to: string;
  message: string;
};

export async function checkResendHealth(): Promise<ResendHealth> {
  const from = getResendFromEmail();
  const to = getContactEmail();

  if (!isResendConfigured()) {
    return {
      configured: false,
      connected: false,
      from,
      to,
      message: "Add RESEND_API_KEY to .env.local (from resend.com → API Keys)",
    };
  }

  const resend = createResendClient();
  if (!resend) {
    return {
      configured: false,
      connected: false,
      from,
      to,
      message: "Could not create Resend client",
    };
  }

  // Lightweight API check — list domains validates the key without sending mail
  const { error } = await resend.domains.list();

  if (error) {
    return {
      configured: true,
      connected: false,
      from,
      to,
      message: error.message,
    };
  }

  return {
    configured: true,
    connected: true,
    from,
    to,
    message:
      from.includes("onboarding@resend.dev")
        ? "Connected. Using Resend test sender — verify kastrategist.com domain to send from your own address."
        : "Connected and ready to send contact form emails",
  };
}
