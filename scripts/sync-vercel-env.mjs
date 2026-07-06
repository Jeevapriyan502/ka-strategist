import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

const names = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "CONTACT_EMAIL",
  "ADMIN_PASSWORD",
  "NEXT_PUBLIC_CONTACT_PHONE",
];

function parseEnv(content) {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    map.set(trimmed.slice(0, i).trim(), trimmed.slice(i + 1).trim());
  }
  return map;
}

const map = parseEnv(readFileSync(envPath, "utf8"));

for (const name of names) {
  const value = map.get(name);
  if (!value) {
    console.log(`Skip ${name} (missing)`);
    continue;
  }
  if (/placeholder|your_|change_me/i.test(value)) {
    console.log(`Skip ${name} (placeholder)`);
    continue;
  }

  console.log(`Adding ${name}...`);
  const result = spawnSync(
    "npx",
    ["vercel", "env", "add", name, "production", "--force"],
    {
      cwd: root,
      input: value,
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    }
  );
  if (result.status !== 0) {
    console.error(result.stderr?.toString() || result.stdout?.toString());
    process.exit(1);
  }
}

console.log("Vercel env sync complete.");
