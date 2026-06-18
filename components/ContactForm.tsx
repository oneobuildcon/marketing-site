"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";
type Errors = { name?: string; phone?: string; message?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    // Validate required fields before sending
    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    const digits = phone.replace(/\D/g, "");
    if (!phone) nextErrors.phone = "Please enter your phone number.";
    else if (digits.length < 10) nextErrors.phone = "Please enter a valid phone number.";
    if (!message) nextErrors.message = "Please tell us about your project.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    const leadData = {
      name,
      phone,
      email,
      message,
      source: "Contact Form",
      date: new Date().toLocaleString("en-IN"),
    };

    setStatus("sending");

    // Save to localStorage so it appears in the admin leads page
    try {
      const existing = JSON.parse(localStorage.getItem("oneo_leads") || "[]");
      existing.push(leadData);
      localStorage.setItem("oneo_leads", JSON.stringify(existing));
    } catch {}

    // Save to Google Sheet + email owner (same pipeline as the calculator)
    try {
      await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/15">
          <CheckCircle2 className="h-8 w-8 text-amber" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy">Message sent!</h3>
        <p className="mt-2 text-sm text-navy/70 max-w-xs">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-amber hover:text-amber-light transition cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy">
          Name <span className="text-amber">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-md border border-black/10 px-4 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-navy">
          Phone <span className="text-amber">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="+91 ..."
          className="mt-1 w-full rounded-md border border-black/10 px-4 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy">
          Email <span className="text-navy/40 font-normal">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-black/10 px-4 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy">
          Message <span className="text-amber">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project..."
          className="mt-1 w-full rounded-md border border-black/10 px-4 py-2 text-sm focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-2 rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again, or call us at +91 88060 29907.
        </p>
      )}
    </form>
  );
}
