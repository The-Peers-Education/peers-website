"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const triggerClass =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-[10px] border border-deep-navy/15 bg-white px-4 py-3 text-left text-base text-ink outline-none transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:border-deep-navy/40 focus-visible:ring-2 focus-visible:ring-deep-navy focus-visible:ring-offset-2";

export function SelectField({
  id,
  name,
  label,
  options,
  placeholder = "Select an option",
  defaultValue = "",
  required,
}: {
  id?: string;
  name: string;
  label: string;
  options: readonly string[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const listId = `${fieldId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option === defaultValue)),
  );

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, []);

  function selectOption(option: string) {
    setValue(option);
    setOpen(false);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((current) => {
        const next =
          event.key === "ArrowDown"
            ? Math.min(options.length - 1, current + 1)
            : Math.max(0, current - 1);
        return next;
      });
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(options.length - 1);
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) selectOption(option);
    }
  }

  const activeId = open ? `${fieldId}-option-${activeIndex}` : undefined;

  return (
    <div ref={rootRef} className="relative">
      <label id={`${fieldId}-label`} className="text-base font-medium text-deep-navy">
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        onChange={() => {}}
        className="sr-only"
        aria-hidden
      />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${fieldId}-label`}
        aria-activedescendant={activeId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKeyDown}
        className={cn(triggerClass, "mt-1.5", !value && "text-muted")}
      >
        <span className="min-w-0 truncate">{value || placeholder}</span>
        <ChevronDown
          size={20}
          aria-hidden
          className={cn(
            "shrink-0 text-deep-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        data-lenis-prevent
        data-lenis-prevent-touch
        className={cn(
          "absolute z-20 mt-1 w-full overflow-hidden rounded-[10px] bg-white shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)] ring-1 ring-deep-navy/10 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "grid",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${fieldId}-label`}
          hidden={!open}
          data-lenis-prevent
          data-lenis-prevent-touch
          className="min-h-0 max-h-60 overflow-y-auto overscroll-contain py-1"
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return (
              <li key={option}>
                <button
                  type="button"
                  id={`${fieldId}-option-${index}`}
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex min-h-11 w-full px-4 py-2.5 text-left text-base transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    selected || active
                      ? "bg-cloud text-deep-navy"
                      : "text-ink lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-cloud/70",
                  )}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
