"use client";

import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { school } from "@/lib/content";
import { cn } from "@/lib/cn";

const actions = [
  { href: school.phoneHref, label: "Call", icon: Phone },
  { href: school.whatsappHref, label: "WhatsApp", icon: MessageCircle },
  { href: `mailto:${school.email}`, label: "Email", icon: Mail },
] as const;

export function QuickContact() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <ul id="quick-contact-options" className="flex flex-col items-end gap-2">
          {actions.map((action) => (
            <li key={action.label}>
              <a
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-base font-medium text-deep-navy shadow-[0_10px_24px_-12px_rgba(27,58,92,0.45)] ring-1 ring-deep-navy/10 focus-visible:outline-none"
              >
                <action.icon size={16} className="text-marigold" />
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="quick-contact-options"
        aria-label={open ? "Close contact options" : "Open contact options"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-10px_rgba(27,58,92,0.55)]",
          open ? "bg-deep-navy" : "bg-marigold text-deep-navy",
        )}
      >
        {open ? <X size={20} /> : <Phone size={20} />}
      </button>
    </div>
  );
}
