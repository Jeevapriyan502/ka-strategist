/**
 * Creates leads + blog_posts tables in your Supabase project.
 *
 * 1. Supabase Dashboard → Project Settings → Database
 * 2. Copy "Connection string" (URI) → Session mode
 * 3. Add to .env.local: DATABASE_URL=postgresql://postgres.[ref]:[YOUR-PASSWORD]@...
 * 4. Run: npm run supabase:setup
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes("YOUR-PASSWORD")) {
  console.error(`
Missing DATABASE_URL in environment.

Get it from Supabase:
  Dashboard → Project Settings → Database → Connection string (URI)

Add to .env.local:
  DATABASE_URL=postgresql://postgres.xxxx:YOUR_DB_PASSWORD@aws-0-xx.pooler.supabase.com:6543/postgres

Then run:
  npm run supabase:setup
`);
  process.exit(1);
}

const sql = readFileSync(join(__dirname, "..", "supabase", "schema.sql"), "utf8");

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  console.log("Connected to Supabase database...");
  await client.query(sql);
  console.log("Done! Tables created:");
  console.log("  - leads      (contact / consultation form)");
  console.log("  - blog_posts (blog articles)");
  console.log("\nView them: Supabase Dashboard → Table Editor");
} catch (err) {
  console.error("Setup failed:", err instanceof Error ? err.message : err);
  process.exit(1);
} finally {
  await client.end();
}
