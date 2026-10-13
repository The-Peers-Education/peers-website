"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { Photo } from "@/components/Photo";
import { cn } from "@/lib/cn";

export function CampusPreview({
  items,
  pageSize,
}: {
  items: readonly LightboxItem[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const pages = pageSize ? Math.max(1, Math.ceil(items.length / pageSize)) : 1;
  const safePage = Math.min(page, pages - 1);
  const start = pageSize ? safePage * pageSize : 0;
  const visible = pageSize ? items.slice(start, start + pageSize) : items;

  return (
    <>
      <div className="mt-10">
        {pages > 1 ? (
          <div className="mb-4 flex items-center justify-end gap-2">
            <SliderButton
              label="Previous results"
              disabled={safePage === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            >
              <ChevronLeft size={20} />
            </SliderButton>
            <SliderButton
              label="Next results"
              disabled={safePage === pages - 1}
              onClick={() => setPage((current) => Math.min(pages - 1, current + 1))}
            >
              <ChevronRight size={20} />
            </SliderButton>
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {visible.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(start + itemIndex)}
              className="group relative aspect-[4/3] overflow-hidden rounded-[12px]"
              aria-label={`Open photograph: ${item.alt}`}
            >
              <Photo
                src={item.src}
                alt={item.alt}
                fill
                quality={75}
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 400px"
              />
            </button>
          ))}
        </div>
        {pages > 1 ? (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show results ${dot + 1} of ${pages}`}
                aria-current={dot === safePage}
                onClick={() => setPage(dot)}
                className={cn(
                  "size-2.5 rounded-full",
                  dot === safePage ? "bg-deep-navy" : "bg-deep-navy/25",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}

function SliderButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-deep-navy/15 text-deep-navy disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
