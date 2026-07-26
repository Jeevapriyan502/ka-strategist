# Supabase Setup Guide — KA Strategist

Follow these steps to connect your Next.js site to Supabase for **contact form leads** and **blog posts**.

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up / log in.
2. Click **New Project**.
3. Choose an organization, set:
   - **Project name:** `ka-strategist`
   - **Database password:** (save this somewhere safe)
   - **Region:** closest to your users (e.g. South Asia)
4. Click **Create new project** and wait ~2 minutes.

---

## Step 2: Run the Database Schema

1. In your Supabase dashboard, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Copy the entire contents of `supabase/schema.sql` from this project and paste it in.
4. Click **Run**.

This creates:
- `leads` table — stores contact form submissions
- `blog_posts` table — stores blog articles
- Row Level Security policies for safe public access

---

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Project Settings** → **API**.
2. Copy these two values:

| Key | Where to find | Use in `.env.local` |
|-----|---------------|---------------------|
| **Project URL** | Under "Project URL" | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon public** | Under "Project API keys" | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role** | Under "Project API keys" (secret) | `SUPABASE_SERVICE_ROLE_KEY` |

> Use **anon** in the browser. Use **service_role** only in `.env.local` on the server (for `/admin/blog`).

---

## Step 4: Add Keys to Your Project

1. Open `.env.local` in the project root (copy from `.env.example` if needed).
2. Paste your real values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_PASSWORD=your_strong_password

RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=info@kastrategist.com
```

3. Save the file.
4. Restart the dev server:

```bash
npm run dev
```

5. Check connection: open [http://localhost:3000/api/supabase/health](http://localhost:3000/api/supabase/health)  
   You should see `"connected": true` and both tables `true`.

---

## Step 5: Test the Contact Form

1. Open [http://localhost:3000/contact-us](http://localhost:3000/contact-us)
2. Submit a test message.
3. In Supabase dashboard → **Table Editor** → **leads** — your submission should appear.

---

## Step 6: Add Blog Posts (Optional)

In **Table Editor** → **blog_posts**, click **Insert row** and fill:

| Column | Example |
|--------|---------|
| title | 5 Digital Marketing Trends for 2026 |
| slug | digital-marketing-trends-2026 |
| excerpt | Short summary shown on the blog grid |
| content | Full article HTML or markdown |
| author | KA Strategist Team |
| published_at | Today's date |

Posts appear automatically at `/blog`.

---

## Step 7: Deploy to Vercel with Supabase

1. Push your code to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Under **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Redeploy.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form saves but no row in Supabase | Check RLS policy ran in Step 2 |
| `fetch failed` on blog page | Verify URL and anon key in `.env.local` |
| Build works, form fails in production | Add env vars in Vercel dashboard |
| Placeholder posts still showing | Add real rows to `blog_posts` table |

---

## Files That Use Supabase

- `lib/supabase/` — client, admin, health check
- `app/api/supabase/health/route.ts` — connection test endpoint
- `app/api/contact/route.ts` — saves leads on form submit
- `app/api/admin/blog/` — blog CRUD (service role)
- `app/blog/page.tsx` — fetches posts from `blog_posts`
