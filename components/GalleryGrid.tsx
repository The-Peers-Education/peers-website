"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems } from "@/lib/content";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/cn";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setFilter(category);
              setIndex(null);
            }}
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
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, itemIndex) => (
          <li key={item.src}>
            <figure className="overflow-hidden rounded-[12px] bg-white ring-1 ring-deep-navy/8">
              <button
                type="button"
                className="block w-full"
                onClick={() => setIndex(itemIndex)}
                aria-label={`Open photograph: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={533}
                  quality={75}
                  sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
                  className="h-auto w-full object-cover"
                />
              </button>
              <figcaption className="flex flex-col gap-1 px-3 py-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <span className="leading-snug">{item.alt}</span>
                <span className="w-fit rounded-md bg-marigold px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-deep-navy">
                  {item.category}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </div>
  );
}
