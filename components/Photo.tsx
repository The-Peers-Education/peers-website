import Image from "next/image";

export function Photo({
  src,
  alt,
  className,
  sizes,
  priority,
  fill,
  width,
  height,
  quality,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
}) {
  const remote = src.startsWith("http://") || src.startsWith("https://");

  if (remote) {
    return (
      // Remote CMS photos are served by the school API, not the website host.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={fill ? `absolute inset-0 size-full object-cover ${className ?? ""}` : className}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className={className}
        sizes={sizes ?? "100vw"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 533}
      quality={quality}
      className={className}
      sizes={sizes}
    />
  );
}
