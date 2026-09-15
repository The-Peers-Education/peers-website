"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuLinks = navLinks.filter((link) => link.href !== "/contact");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-deep-navy/8 bg-white">
      <div className="mx-auto flex min-h-16 max-w-[80rem] items-center justify-between gap-3 px-4 py-2 sm:min-h-20 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          aria-label="The Peers Education System home"
          className="flex min-w-0 items-center rounded-[10px] focus-visible:outline-none"
          onClick={() => setOpen(false)}
        >
          <Logo
            priority
            className="h-10 w-auto max-w-[11rem] object-contain object-left sm:h-12 sm:max-w-[14rem] lg:h-14 lg:max-w-none"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 lg:gap-4">
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {menuLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-base font-medium text-muted focus-visible:outline-none",
                    active && "text-deep-navy",
                  )}
                >
                  <span
                    className={cn(
                      "link-underline",
                      active && "link-underline-active",
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <ButtonLink href="/contact" variant="primary">
              <Phone size={16} strokeWidth={2} />
              Contact Us
            </ButtonLink>
            <ButtonLink href="/admissions" variant="navy" arrow>
              Apply Now
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-deep-navy/10 text-deep-navy focus-visible:outline-none lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "grid lg:hidden",
          "transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div
          data-lenis-prevent
          className={cn(
            "min-h-0 overflow-hidden bg-white",
            open && "border-t border-deep-navy/10",
          )}
        >
          <nav aria-label="Mobile" className="flex max-h-[calc(100svh-4.5rem)] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-12 items-center rounded-[10px] px-4 text-base font-medium",
                  pathname === link.href
                    ? "bg-cloud text-deep-navy"
                    : "text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-deep-navy/10 pt-4">
              <ButtonLink href="/contact" variant="primary" className="w-full">
                <Phone size={16} strokeWidth={2} />
                Contact Us
              </ButtonLink>
              <ButtonLink
                href="/admissions"
                variant="navy"
                arrow
                className="w-full"
              >
                Apply Now
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
