import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ka_admin_session";

export function getAdminToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`ka-admin:${password}`).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === token;
}

export { COOKIE_NAME };
