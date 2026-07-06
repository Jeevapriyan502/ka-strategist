export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim();
}

export function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "KA Strategist <onboarding@resend.dev>"
  );
}

export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || "info@kastrategist.com";
}

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  const lower = value.toLowerCase();
  return (
    lower.includes("placeholder") ||
    lower.includes("your_resend") ||
    lower.startsWith("re_placeholder")
  );
}

export function isResendConfigured(): boolean {
  const key = getResendApiKey();
  return Boolean(key && key.startsWith("re_") && !isPlaceholder(key));
}
