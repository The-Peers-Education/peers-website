"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "lenis/react";

export type LightboxItem = {
  src: string;
  alt: string;
};

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: readonly LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onIndexChange(((index ?? 0) + 1) % items.length);
      }
      if (event.key === "ArrowLeft") {
        onIndexChange(((index ?? 0) - 1 + items.length) % items.length);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button"),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onIndexChange]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (index === null || !item) return null;

  const currentIndex = index;

  function onDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) {
    if (items.length < 2) return;
    const { offset, velocity } = info;
    if (offset.x < -70 || velocity.x < -500) {
      onIndexChange((currentIndex + 1) % items.length);
    } else if (offset.x > 70 || velocity.x > 500) {
      onIndexChange((currentIndex - 1 + items.length) % items.length);
    }
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-deep-navy/88 px-2 py-16 sm:p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close photograph"
        className="absolute top-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-white text-deep-navy"
        onClick={onClose}
      >
        <X size={20} />
      </button>
      <div
        className="flex w-full max-w-5xl cursor-default items-center gap-1 sm:gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        {items.length > 1 ? (
          <button
            type="button"
            aria-label="Previous photograph"
            className="relative z-20 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-deep-navy"
            onClick={() =>
              onIndexChange((currentIndex - 1 + items.length) % items.length)
            }
          >
            <ChevronLeft size={22} />
          </button>
        ) : null}
        <figure className="min-w-0 flex-1">
          <motion.div
            key={item.src}
            drag={items.length > 1 ? "x" : false}
            dragElastic={0.18}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            className={
              items.length > 1
                ? "relative aspect-[4/3] cursor-grab overflow-hidden rounded-[12px] bg-black/20 active:cursor-grabbing"
                : "relative aspect-[4/3] overflow-hidden rounded-[12px] bg-black/20"
            }
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              draggable={false}
              quality={75}
              className="pointer-events-none object-contain"
              sizes="(max-width: 640px) 90vw, 64rem"
              priority
            />
          </motion.div>
          <figcaption className="mt-3 text-center text-base text-white">
            {item.alt}
          </figcaption>
        </figure>
        {items.length > 1 ? (
          <button
            type="button"
            aria-label="Next photograph"
            className="relative z-20 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-deep-navy"
            onClick={() => onIndexChange((currentIndex + 1) % items.length)}
          >
            <ChevronRight size={22} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
