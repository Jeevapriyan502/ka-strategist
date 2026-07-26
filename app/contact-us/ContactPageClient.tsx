"use client";

import CallButton from "@/components/CallButton";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  "Branding",
  "Lead Generation",
  "Website Development",
  "Software Development",
  "Digital Marketing",
  "Other",
];

const EMAIL_PATTERN = "[^@\\s]+@[^@\\s]+\\.[a-zA-Z]{2,}";
const emailRegex = new RegExp(`^${EMAIL_PATTERN}$`);

/** Indian mobile: optional +91/0 prefix, then 10 digits starting 6-9. */
function normalisePhone(value: string) {
  return value.replace(/[\s\-()]/g, "");
}

function isValidPhone(value: string) {
  return /^(?:\+91|0)?[6-9]\d{9}$/.test(normalisePhone(value));
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  const validate = () => {
    const errors: { email?: string; phone?: string } = {};

    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Enter a valid email address (e.g. name@company.com).";
    }

    // Phone is optional, but must be valid when provided
    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" || name === "phone") {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFieldErrors((prev) => ({
        ...prev,
        email:
          value.trim() && !emailRegex.test(value.trim())
            ? "Enter a valid email address (e.g. name@company.com)."
            : undefined,
      }));
    }

    if (name === "phone") {
      setFieldErrors((prev) => ({
        ...prev,
        phone:
          value.trim() && !isValidPhone(value)
            ? "Enter a valid 10-digit mobile number."
            : undefined,
      }));
    }
  };

  return (
    <div className="section-padding">
      <div className="container-max">
        <ScrollReveal className="mb-12 text-center">
          <span className="badge-accent mb-4">Get In Touch</span>
          <h1 className="heading-lg mb-4">
            Book Your{" "}
            <span className="gradient-text">Consultation</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-site-muted">
            Tell us about your business and we&apos;ll get back to you within 24
            hours. Prefer to talk now? Tap below to call — no number needed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallButton variant="primary" label="Call Now" />
            <Link href="#contact-form" className="btn-secondary">
              Send a message
            </Link>
          </div>
        </ScrollReveal>

        <div id="contact-form" className="mx-auto max-w-2xl">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card text-center"
            >
              <CheckCircle className="mx-auto mb-4 text-site-accent" size={48} />
              <h2 className="mb-2 text-2xl font-bold text-site-text">Thank You!</h2>
              <p className="text-site-muted">
                We&apos;ve received your message and will be in touch within 24
                hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-primary mt-6"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      pattern={EMAIL_PATTERN}
                      title="Enter a valid email address, e.g. name@company.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-modern ${
                        fieldErrors.email ? "ring-2 ring-red-400/60" : ""
                      }`}
                      placeholder="john@company.com"
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-500">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      title="Enter a valid 10-digit mobile number"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-modern ${
                        fieldErrors.phone ? "ring-2 ring-red-400/60" : ""
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {fieldErrors.phone && (
                      <p id="phone-error" className="mt-1.5 text-xs text-red-500">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input-modern"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input-modern"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-modern resize-none"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-400"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
