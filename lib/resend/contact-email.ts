import { createResendClient } from "@/lib/resend/client";
import { getContactEmail, getResendFromEmail } from "@/lib/resend/env";

export interface ContactLeadEmail {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export async function sendContactLeadEmail(lead: ContactLeadEmail) {
  const resend = createResendClient();
  if (!resend) return { ok: false as const, error: "Resend not configured" };

  const { name, email, phone, company, service, message } = lead;

  const { error } = await resend.emails.send({
    from: getResendFromEmail(),
    to: getContactEmail(),
    replyTo: email,
    subject: `New Lead: ${name} — ${service || "General Inquiry"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A5F; border-bottom: 3px solid #E53935; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A5F;">Name:</td>
            <td style="padding: 8px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A5F;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A5F;">Phone:</td>
            <td style="padding: 8px 0;">${escapeHtml(phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A5F;">Company:</td>
            <td style="padding: 8px 0;">${escapeHtml(company || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #1E3A5F;">Service:</td>
            <td style="padding: 8px 0;">${escapeHtml(service || "Not specified")}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #1E88E5; border-radius: 4px;">
          <p style="font-weight: bold; color: #1E3A5F; margin: 0 0 8px;">Message:</p>
          <p style="margin: 0; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          Submitted via kastrategist.com contact form
        </p>
      </div>
    `,
  });

  if (error) {
    return { ok: false as const, error: error.message };
  }

  return { ok: true as const };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
