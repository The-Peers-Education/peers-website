import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CardIconBg, IconMark } from "@/components/IconMark";
import { NotebookMargin } from "@/components/NotebookMargin";
import { PageHero } from "@/components/PageHero";
import { PrincipalPortraits } from "@/components/PrincipalPortraits";
import { SectionHeading } from "@/components/SectionHeading";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { director, facilities, ogImage, school, values } from "@/lib/content";
import { aboutPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "History, mission, and values of The Peers Education System in Shad Bagh, Lahore.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | The Peers Education System",
    description:
      "History, mission, and values of The Peers Education System in Shad Bagh, Lahore.",
    url: "https://the-peers-education.vercel.app/about",
    siteName: "The Peers Education System",
    locale: "en_PK",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | The Peers Education System",
    description:
      "History, mission, and values of The Peers Education System in Shad Bagh, Lahore.",
    images: [ogImage.url],
  },
};

export default function AboutPage() {
  return (
    <>
      <SchemaJsonLd jsonLd={aboutPageSchema()} />
      <PageHero
        kicker="About Peers"
        title="A school of this street, and of this community."
        description="The Peers Education System sits on Amir Road in Shad Bagh — a neighbourhood campus for families who want a well-run school from Playgroup through Matric."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <NotebookMargin>
            <SectionHeading kicker="Our story" title="How we think about school" />
            <div className="mt-6 max-w-2xl space-y-4 text-muted">
              <p>
                The Peers Education System was founded in {school.foundedYear} as a
                neighbourhood school, not a franchise. The aim has stayed the
                same: a calm campus, teachers who know their children, and a
                curriculum that can carry a student from first letters to board
                exams without a jarring change of culture.
              </p>
              <p>
                Families in Shad Bagh already judge a school by ordinary days —
                how the gate is managed, whether homework comes back, whether a
                child is glad to return after lunch. That is the standard we
                hold ourselves to.
              </p>
            </div>
          </NotebookMargin>
        </Container>
      </section>

      <section className="bg-cloud py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="relative overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_0_rgba(27,58,92,0.08)] ring-1 ring-deep-navy/6 sm:p-8">
              <CardIconBg name="eye" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.16em] text-leaf">
                Vision
              </p>
              <h2 className="relative mt-2 font-display text-xl font-bold text-deep-navy sm:text-2xl">
                Confident learners, rooted in community
              </h2>
              <p className="relative mt-3 text-muted">
                To be the school families on this side of Lahore trust with a
                child&apos;s whole school life — from the first nervous morning
                to the day Matric results arrive.
              </p>
            </article>
            <article className="relative overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_0_rgba(27,58,92,0.08)] ring-1 ring-deep-navy/6 sm:p-8">
              <CardIconBg name="target" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.16em] text-leaf">
                Mission
              </p>
              <h2 className="relative mt-2 font-display text-xl font-bold text-deep-navy sm:text-2xl">
                Teach well. Look after children. Tell parents the truth.
              </h2>
              <p className="relative mt-3 text-muted">
                We keep classes purposeful, campus life orderly, and
                communication with families plain. Academic progress matters.
                So does the way a child is spoken to at 8 a.m.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,auto)_1fr]">
          <PrincipalPortraits />
          <div className="min-w-0">
            <SectionHeading kicker="From the Principals" title="A message to families" />
            <p className="mt-2 text-base text-muted">
              Zeeshan Ahmad and Iftikhar Sadiq, Principals
            </p>
            <div className="mt-6 max-w-2xl space-y-4 text-muted">
              {director.fullMessage.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cloud py-16 sm:py-24">
        <Container>
          <SectionHeading kicker="What we practise" title="Core values" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {values.map((value) => (
              <article
                key={value.title}
                className="relative overflow-hidden rounded-[12px] bg-white p-5 ring-1 ring-deep-navy/6 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)]"
              >
                <CardIconBg name={value.icon} />
                <IconMark name={value.icon} />
                <h3 className="relative mt-4 font-display text-lg font-semibold text-deep-navy">
                  {value.title}
                </h3>
                <p className="relative mt-2 text-base text-muted">{value.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Campus"
            title="Facilities"
            description="What you will find on a working school day — confirm any specialist rooms with the office if they matter to your child."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-4 rounded-[12px] border border-deep-navy/10 bg-white px-4 py-4"
              >
                <IconMark name={item.icon} />
                <span className="font-medium text-deep-navy">{item.name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
