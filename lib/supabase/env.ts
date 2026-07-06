export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
}

export function getSupabaseAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
}

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  const lower = value.toLowerCase();
  return (
    lower.includes("placeholder") ||
    lower.includes("your_supabase") ||
    lower === "ey..." ||
    value === "placeholder_anon_key"
  );
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return Boolean(url && key && !isPlaceholder(url) && !isPlaceholder(key));
}

export function isSupabaseAdminConfigured(): boolean {
  const url = getSupabaseUrl();
  const serviceKey = getSupabaseServiceRoleKey();
  return Boolean(url && serviceKey && !isPlaceholder(url) && !isPlaceholder(serviceKey));
}
