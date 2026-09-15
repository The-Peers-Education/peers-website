"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { applyingClasses, school } from "@/lib/content";
import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import { cn } from "@/lib/cn";

const fieldClass =
  "mt-1.5 min-h-12 w-full rounded-[10px] border border-deep-navy/15 bg-white px-4 py-3 text-base text-ink placeholder:text-base placeholder:text-muted outline-none transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:border-deep-navy/40 focus-visible:ring-2 focus-visible:ring-deep-navy focus-visible:ring-offset-2";

const labelClass = "text-base font-medium text-deep-navy";

type Mode = "admissions" | "contact";

export function InquiryForm({ mode }: { mode: Mode }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSending(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${school.formRecipient}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...data,
            form: mode === "admissions" ? "Admission inquiry" : "Contact message",
            school: school.name,
            _subject:
              mode === "admissions"
                ? `Admission inquiry — ${school.shortName}`
                : `Contact message — ${school.shortName}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Send failed");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "The message could not be sent. Please try again, or email the office directly.",
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[12px] border border-leaf/25 bg-leaf/10 px-6 py-10 text-center">
        <CircleCheck className="mx-auto text-leaf" size={36} strokeWidth={1.75} />
        <h3 className="mt-3 font-display text-2xl font-bold text-deep-navy">
          Thank you — we have your message.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Your details have been sent. The office will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-base font-semibold text-deep-navy underline decoration-marigold decoration-2 underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {mode === "admissions" ? (
        <>
          <Field
            label="Student name"
            name="studentName"
            placeholder="Student's full name"
            required
          />
          <Field
            label="Parent / guardian name"
            name="parentName"
            placeholder="Parent or guardian's full name"
            required
          />
          <SelectField
            name="classApplying"
            label="Class applying for"
            placeholder="Select a class"
            options={applyingClasses}
            required
          />
        </>
      ) : (
        <Field
          label="Your name"
          name="name"
          placeholder="Your full name"
          required
          className="sm:col-span-2"
        />
      )}
      <Field
        label="Phone"
        name="phone"
        type="tel"
        placeholder="0300 0000000"
        required
      />
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="name@email.com"
        required
      />
      <div className={mode === "contact" ? "sm:col-span-2" : undefined}>
        <SelectField
          name="preferredContact"
          label="Preferred contact"
          placeholder="Select how we should reach you"
          options={["Phone call", "WhatsApp", "Email"]}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={
            mode === "admissions"
              ? "Tell us about your child, the class you have in mind, and any questions for the office."
              : "How can we help? Share your question or the best time to visit."
          }
          data-lenis-prevent
          data-lenis-prevent-touch
          className={cn(
            fieldClass,
            "min-h-32 max-h-64 resize-y overflow-y-auto overscroll-contain",
          )}
        />
      </div>
      {error ? (
        <p className="sm:col-span-2 text-base text-red-700">{error}</p>
      ) : null}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="navy"
          arrow
          disabled={sending}
          className="w-full sm:w-auto"
        >
          {sending
            ? "Sending…"
            : mode === "admissions"
              ? "Submit inquiry"
              : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(fieldClass, "min-h-12")}
      />
    </div>
  );
}
