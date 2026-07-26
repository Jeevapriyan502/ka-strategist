import { Phone } from "lucide-react";
import { contactPhoneTel } from "@/lib/contact";

interface CallButtonProps {
  className?: string;
  label?: string;
  variant?: "primary" | "secondary";
}

export default function CallButton({
  className = "",
  label = "Call Now",
  variant = "secondary",
}: CallButtonProps) {
  const base =
    variant === "primary"
      ? "btn-primary"
      : "btn-secondary inline-flex items-center justify-center gap-2";

  return (
    <a href={`tel:${contactPhoneTel}`} className={`${base} ${className}`}>
      <Phone size={16} />
      {label}
    </a>
  );
}
