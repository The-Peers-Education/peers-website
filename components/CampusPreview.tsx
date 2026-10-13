"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { Photo } from "@/components/Photo";
import "swiper/css";
import "swiper/css/pagination";

export function CampusPreview({
  items,
  pageSize,
}: {
  items: readonly LightboxItem[];
  pageSize?: number;
}) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const paged = Boolean(pageSize && items.length > pageSize);
  const pages = pageSize ? chunk(items, pageSize) : [items];

  function syncEdges(swiper: SwiperInstance) {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  }

  useEffect(() => {
    const swiper = swiperRef.current;
    const pagination = swiper?.params.pagination;
    if (!swiper || !paginationRef.current || !pagination || typeof pagination === "boolean") return;
    pagination.el = paginationRef.current;
    swiper.pagination.destroy();
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  }, [paged, items]);

  return (
    <>
      {paged ? (
        <div className="mt-10">
          <Swiper
            className="results-swiper"
            modules={[Pagination, A11y]}
            speed={700}
            spaceBetween={16}
            pagination={{ clickable: true }}
            watchOverflow
            onBeforeInit={(swiper) => {
              const pagination = swiper.params.pagination;
              if (pagination && typeof pagination !== "boolean") {
                pagination.el = paginationRef.current;
              }
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncEdges(swiper);
            }}
            onSlideChange={syncEdges}
          >
            {pages.map((page, pageIndex) => (
              <SwiperSlide key={page[0]?.src ?? pageIndex}>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {page.map((item) => {
                    const itemIndex = items.findIndex((entry) => entry.src === item.src);
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setIndex(itemIndex)}
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
                    );
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-4 flex items-center justify-center md:justify-between">
            <div ref={paginationRef} className="results-swiper-dots" />
            <div className="hidden items-center gap-2 md:flex">
              <SliderButton
                label="Previous results"
                disabled={atStart}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={20} />
              </SliderButton>
              <SliderButton
                label="Next results"
                disabled={atEnd}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <ChevronRight size={20} />
              </SliderButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(itemIndex)}
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
      )}
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}

function chunk<T>(list: readonly T[], size: number) {
  const pages: T[][] = [];
  for (let index = 0; index < list.length; index += size) {
    pages.push(list.slice(index, index + size));
  }
  return pages;
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
