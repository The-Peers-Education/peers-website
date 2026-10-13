import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { galleryItems, ogImage, resultItems, school } from "@/lib/content";
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
  const photos = [...((await loadGalleryPhotos()) ?? galleryItems), ...resultItems];

  return (
    <>
      <SchemaJsonLd jsonLd={galleryPageSchema()} />
      <PageHero
        kicker="Gallery"
        title={`Life at ${school.name}.`}
        description="Campus mornings, assemblies, sports days, classroom work, and results. Click a photograph to open it."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <GalleryGrid photos={photos} />
        </Container>
      </section>
    </>
  );
}
