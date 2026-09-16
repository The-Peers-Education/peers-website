import type { Metadata } from "next";
import { ConfirmBadge } from "@/components/ConfirmBadge";
import { ClassExplorer } from "@/components/ClassExplorer";
import { Container } from "@/components/Container";
import { IconMark } from "@/components/IconMark";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { activities, ogImage } from "@/lib/content";
import { academicsPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Class levels, curriculum, and co-curricular life at The Peers Education System.",
  alternates: { canonical: "/academics" },
  openGraph: {
    title: "Academics | The Peers Education System",
    description:
      "Class levels, curriculum, and co-curricular life at The Peers Education System.",
    url: "https://the-peers-education.vercel.app/academics",
    siteName: "The Peers Education System",
    locale: "en_PK",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academics | The Peers Education System",
    description:
      "Class levels, curriculum, and co-curricular life at The Peers Education System.",
    images: [ogImage.url],
  },
};

export default function AcademicsPage() {
  return (
    <>
      <SchemaJsonLd jsonLd={academicsPageSchema()} />
      <PageHero
        kicker="Academics"
        title="From Playgroup to Matric, on one campus."
        description="A clear path through the years — choose a stage below to read how we think about that part of school."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading kicker="Class levels" title="How the years are organised" />
          <p className="mt-3 text-base text-muted">
            Use the buttons to highlight a stage. Typical ages are a guide —
            placement is confirmed in person.
          </p>
          <div className="mt-8">
            <ClassExplorer />
          </div>
        </Container>
      </section>

      <section className="bg-cloud py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading kicker="Curriculum" title="What we teach toward" />
          <p className="mt-5 text-muted">
            Classes follow the Punjab Textbook Board curriculum, with English
            and Urdu as working languages of the campus. Board affiliation for
            Matric years should be confirmed with the office before you enroll.
            <ConfirmBadge>Board affiliation</ConfirmBadge>
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Beyond the timetable"
            title="Co-curricular life"
            description="Sports, competitions, trips, and assemblies — the days families already recognise from our Facebook page."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {activities.map((item) => (
              <article
                key={item.title}
                className="rounded-[12px] bg-white p-5 ring-1 ring-deep-navy/8 sm:p-6 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)]"
              >
                <IconMark name={item.icon} />
                <h3 className="mt-4 font-display text-lg font-semibold text-deep-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
