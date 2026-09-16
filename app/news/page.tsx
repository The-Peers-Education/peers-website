import type { Metadata } from "next";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { ogImage } from "@/lib/content";
import { newsPageSchema } from "@/lib/schema";
import { Container } from "@/components/Container";
import { NewsGrid } from "@/components/NewsGrid";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "News",
  description:
    "School news and events at The Peers Education System, Shad Bagh.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News | The Peers Education System",
    description:
      "School news and events at The Peers Education System, Shad Bagh.",
    url: "https://the-peers-education.vercel.app/news",
    siteName: "The Peers Education System",
    locale: "en_PK",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "News | The Peers Education System",
    description:
      "School news and events at The Peers Education System, Shad Bagh.",
    images: [ogImage.url],
  },
};

export default function NewsPage() {
  return (
    <>
      <SchemaJsonLd jsonLd={newsPageSchema()} />
      <PageHero
        kicker="News"
        title="What the school has been busy with."
        description="Sports days, assemblies, results, and notes for families. Filter by topic, or open a story to read more."
      />
      <section className="py-16 sm:py-24">
        <Container>
          <NewsGrid />
        </Container>
      </section>
    </>
  );
}
