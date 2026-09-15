import { cn } from "@/lib/cn";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  light = false,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      {kicker ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.18em]",
            light ? "text-marigold-bright" : "text-leaf",
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2.5 font-display text-[1.75rem] font-bold leading-[1.2] sm:text-4xl lg:text-[2.6rem]",
          light ? "text-white" : "text-deep-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base leading-relaxed",
            light ? "text-white" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
