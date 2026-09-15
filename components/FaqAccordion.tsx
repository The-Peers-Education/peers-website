"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-deep-navy/10 overflow-hidden rounded-[12px] border border-deep-navy/10 bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <li key={item.question}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full min-h-11 items-center justify-between gap-4 px-4 py-4 text-left focus-visible:outline-none sm:px-6"
            >
              <span className="min-w-0 font-display text-base font-semibold leading-snug text-deep-navy sm:text-lg">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                aria-hidden
                className={cn(
                  "shrink-0 text-marigold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-base text-muted sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
