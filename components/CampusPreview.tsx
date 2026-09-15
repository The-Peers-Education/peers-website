"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";
import { galleryItems } from "@/lib/content";

export function CampusPreview() {
  const items = galleryItems.slice(0, 6);
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item, itemIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(itemIndex)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[12px]"
            aria-label={`Open photograph: ${item.alt}`}
          >
            <Image
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
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
