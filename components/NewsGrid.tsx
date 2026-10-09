"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SiteNews } from "@/lib/cms";
import { Photo } from "@/components/Photo";

export function NewsGrid({ items: stories }: { items: readonly SiteNews[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(stories.map((item) => item.category)))],
    [stories],
  );
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (stories.some((item) => item.slug === hash)) {
      setOpen(hash);
    }
  }, [stories]);

  const items = useMemo(
    () => (filter === "All" ? stories : stories.filter((item) => item.category === filter)),
    [filter, stories],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={cn(
              "min-h-11 rounded-full px-4 py-2 text-base font-medium transition-[color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              filter === category
                ? "bg-deep-navy text-white"
                : "bg-white text-deep-navy ring-1 ring-deep-navy/10 lg:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-deep-navy lg:[@media(hover:hover)_and_(pointer:fine)]:hover:text-white",
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((item) => {
          const expanded = open === item.slug;
          return (
            <li
              key={item.slug}
              id={item.slug}
              className="scroll-mt-32 overflow-hidden rounded-[12px] border border-deep-navy/10 bg-white"
            >
              <div className="relative aspect-[16/9]">
                <Photo
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={75}
                  className="object-cover"
                  sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 50vw, 38rem"
                />
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
                  {item.category} · {item.date}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-deep-navy sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-muted">{item.excerpt}</p>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : item.slug)}
                  className="mt-4 text-base font-medium text-deep-navy"
                >
                  <span className="link-underline">
                    {expanded ? "Show less" : "Read more"}
                  </span>
                </button>
                {expanded ? (
                  <p className="mt-3 whitespace-pre-line text-base text-muted">{item.body}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
