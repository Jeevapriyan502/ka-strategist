export {
  getContactEmail,
  getResendApiKey,
  getResendFromEmail,
  isResendConfigured,
} from "@/lib/resend/env";
export { createResendClient } from "@/lib/resend/client";
export { checkResendHealth, type ResendHealth } from "@/lib/resend/health";
