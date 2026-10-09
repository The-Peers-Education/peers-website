import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/branding/peers-logo.png"
      alt="The Peers Education System"
      width={800}
      height={266}
      priority={priority}
      sizes="(max-width: 640px) 11rem, 14rem"
      className={cn("w-auto object-contain", className ?? "h-12 sm:h-14")}
    />
  );
}
