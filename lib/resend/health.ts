import { createResendClient } from "@/lib/resend/client";
import {
  getContactEmail,
  getResendFromEmail,
  isResendConfigured,
} from "@/lib/resend/env";

export type ResendHealth = {
  configured: boolean;
  connected: boolean;
  canDeliver: boolean;
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
      canDeliver: false,
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
      canDeliver: false,
      from,
      to,
      message: "Could not create Resend client",
    };
  }

  const { data: domains, error } = await resend.domains.list();

  if (error) {
    return {
      configured: true,
      connected: false,
      canDeliver: false,
      from,
      to,
      message: error.message,
    };
  }

  const usingTestSender = from.includes("onboarding@resend.dev");
  const hasVerifiedDomain = (domains?.data ?? []).some(
    (d) => d.status === "verified"
  );

  if (!usingTestSender && hasVerifiedDomain) {
    return {
      configured: true,
      connected: true,
      canDeliver: true,
      from,
      to,
      message: "Connected and ready to send contact form emails",
    };
  }

  if (usingTestSender) {
    return {
      configured: true,
      connected: true,
      canDeliver: true,
      from,
      to,
      message:
        "Connected. Test sender only works when CONTACT_EMAIL matches your Resend signup email. Verify kastrategist.com to email any address.",
    };
  }

  return {
    configured: true,
    connected: true,
    canDeliver: false,
    from,
    to,
    message:
      "API connected. Verify kastrategist.com in Resend and set RESEND_FROM_EMAIL to send notifications.",
  };
}
