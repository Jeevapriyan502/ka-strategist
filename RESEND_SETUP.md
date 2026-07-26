# Resend Setup Guide — KA Strategist

Resend sends **email notifications** when someone submits the contact form. Leads are still saved in Supabase either way.

---

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com) and sign up.
2. Verify your email address.

---

## Step 2: Get Your API Key

1. Open [Resend Dashboard → API Keys](https://resend.com/api-keys).
2. Click **Create API Key**.
3. Name it `ka-strategist-local` (or similar).
4. Copy the key — it starts with `re_`.

---

## Step 3: Add to `.env.local`

```env
RESEND_API_KEY=re_your_real_key_here
CONTACT_EMAIL=info@kastrategist.com

# Optional — use after you verify your domain (Step 5)
# RESEND_FROM_EMAIL=KA Strategist <hello@kastrategist.com>
```

Restart the dev server after saving.

---

## Step 4: Test the Connection

Open: **http://localhost:3003/api/resend/health**

You should see:

```json
{
  "configured": true,
  "connected": true,
  "from": "KA Strategist <onboarding@resend.dev>",
  "to": "info@kastrategist.com",
  "message": "Connected..."
}
```

---

## Step 5: Test the Contact Form

1. Go to **/contact-us**
2. Submit a test message.
3. Check:
   - **Supabase** → Table Editor → `leads` (new row)
   - **Inbox** at `CONTACT_EMAIL` (notification email)

### Testing sender (`onboarding@resend.dev`)

On the free tier, Resend only delivers test emails **to the email address you signed up with** when using `onboarding@resend.dev`.  
Set `CONTACT_EMAIL` to that address for testing, or verify your domain (Step 6).

---

## Step 6: Use Your Own Domain (Production)

1. Resend Dashboard → **Domains** → **Add Domain**
2. Add `kastrategist.com` (or your domain).
3. Add the DNS records Resend shows (SPF, DKIM) in your domain registrar.
4. Wait for verification (usually a few minutes).
5. Update `.env.local`:

```env
RESEND_FROM_EMAIL=KA Strategist <hello@kastrategist.com>
```

6. Add the same vars in **Vercel → Environment Variables** when you deploy.

---

## Environment Variables (Deploy)

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | API key from Resend |
| `CONTACT_EMAIL` | Yes | Where lead notifications are sent |
| `RESEND_FROM_EMAIL` | No | Sender address (default: test sender) |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `connected: false` on health check | Check API key starts with `re_` and has no extra spaces |
| Lead saved, no email | Using test sender — email only goes to your Resend account email |
| `Domain not verified` | Complete Step 6 or use `onboarding@resend.dev` for testing |
| Works locally, fails on Vercel | Add `RESEND_API_KEY` and `CONTACT_EMAIL` in Vercel env vars |

---

## Files

- `lib/resend/` — client, config, contact email template
- `app/api/contact/route.ts` — form handler (Supabase + Resend)
- `app/api/resend/health/route.ts` — connection test
