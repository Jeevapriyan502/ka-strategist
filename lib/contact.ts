/** Phone for tel: links — set NEXT_PUBLIC_CONTACT_PHONE in .env.local */
const raw = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "8489180043";

export const contactPhoneTel = raw.startsWith("+")
  ? raw.replace(/\s/g, "")
  : `+91${raw.replace(/\D/g, "")}`;
