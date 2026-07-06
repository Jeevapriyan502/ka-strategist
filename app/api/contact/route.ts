import { NextResponse } from "next/server";
import { sendContactLeadEmail } from "@/lib/resend/contact-email";
import { isResendConfigured } from "@/lib/resend/env";
import { getSupabaseForLeads } from "@/lib/supabase/leads";
import { isSupabaseConfigured } from "@/lib/supabase/env";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Form is not connected to the database yet. Add Supabase keys to .env.local and restart the server.",
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseForLeads();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    const { error: dbError } = await supabase.from("leads").insert([
      {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message,
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
      return NextResponse.json(
        {
          error:
            dbError.message.includes("does not exist")
              ? "Leads table missing — run supabase/schema.sql in Supabase SQL Editor."
              : "Failed to save your inquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    if (isResendConfigured()) {
      const result = await sendContactLeadEmail({
        name,
        email,
        phone,
        company,
        service,
        message,
      });

      if (!result.ok) {
        console.error("Resend email error:", result.error);
        // Lead is saved — don't fail the form if only email fails
      }
    }

    return NextResponse.json(
      { message: "Thank you! We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
