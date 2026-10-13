import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { galleryItems, ogImage, resultItems, school, videoItems } from "@/lib/content";
import { loadGalleryPhotos } from "@/lib/cms";
import { galleryPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Campus, events, sports, and classroom life at The Peers Education System.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | The Peers Education System",
    description:
      "Campus, events, sports, and classroom life at The Peers Education System.",
    url: "https://the-peers-education.vercel.app/gallery",
    siteName: "The Peers Education System",
    locale: "en_PK",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | The Peers Education System",
    description:
      "Campus, events, sports, and classroom life at The Peers Education System.",
    images: [ogImage.url],
  },
};

export default async function GalleryPage() {
  const photos = [...resultItems, ...((await loadGalleryPhotos()) ?? galleryItems)];

  return (
    <>
      <SchemaJsonLd jsonLd={galleryPageSchema()} />
      <PageHero
        kicker="Gallery"
        title={`Life at ${school.name}.`}
        description="Campus mornings, assemblies, sports days, classroom work, results, alumni, and videos. Click a photograph to open it."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <GalleryGrid photos={photos} />
          <div className="mt-16">
            <h2 className="font-display text-[1.75rem] font-bold leading-[1.2] text-deep-navy sm:text-4xl">
              Videos
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {videoItems.map((video) => (
                <li key={video.src} className="overflow-hidden rounded-[12px] bg-white ring-1 ring-deep-navy/8">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full bg-deep-navy"
                    src={video.src}
                  />
                  <p className="px-3 py-2 text-sm leading-snug text-muted">{video.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
