import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const desktopArrowClass =
  "size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1.5";

const desktopMotion =
  "transition-[color,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const variants = {
  primary:
    "bg-marigold text-deep-navy lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#d88d16] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_10px_24px_-10px_rgba(27,58,92,0.45)]",
  navy: "bg-deep-navy text-white focus-visible:ring-marigold lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#142c47] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_10px_24px_-10px_rgba(27,58,92,0.5)]",
  outline:
    "border-2 border-white bg-transparent text-white focus-visible:ring-marigold lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-white lg:[@media(hover:hover)_and_(pointer:fine)]:hover:text-deep-navy",
  ghost:
    "border-2 border-deep-navy bg-transparent text-deep-navy lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-deep-navy lg:[@media(hover:hover)_and_(pointer:fine)]:hover:text-white",
} as const;

type Variant = keyof typeof variants;

const base =
  "group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-base font-normal outline-none focus-visible:ring-2 focus-visible:ring-deep-navy focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function Arrow() {
  return <ArrowRight className={desktopArrowClass} strokeWidth={2} />;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  const classNames = cn(base, desktopMotion, variants[variant], className);
  const external = /^(https?:|tel:|mailto:)/i.test(href);
  const content = (
    <>
      {children}
      {arrow ? <Arrow /> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  arrow = false,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(base, desktopMotion, variants[variant], className)}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-base font-normal text-deep-navy underline decoration-marigold decoration-2 underline-offset-4 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
