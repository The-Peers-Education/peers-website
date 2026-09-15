import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/Button";
import { CampusPreview } from "@/components/CampusPreview";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { IconMark } from "@/components/IconMark";
import { NotebookMargin } from "@/components/NotebookMargin";
import { PrincipalPortraits } from "@/components/PrincipalPortraits";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatStrip } from "@/components/StatStrip";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import {
  director,
  faqs,
  newsItems,
  programs,
  school,
  whyPeers,
} from "@/lib/content";
import { homePageSchema } from "@/lib/schema";

export default function HomePage() {
  const previewNews = newsItems.slice(0, 3);

  return (
    <>
      <SchemaJsonLd jsonLd={homePageSchema()} />
      <section className="home-hero relative overflow-hidden">
        <Image
          src="/images/modern-hero.jpg"
          alt="The Peers Education System campus in Shad Bagh, Lahore"
          fill
          priority
          quality={75}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/55 to-deep-navy/25" />
        <Container className="relative flex flex-col pb-24 pt-28 sm:pb-32 sm:pt-36 lg:h-full lg:min-h-0 lg:justify-end">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marigold-bright">
            Playgroup to Matric
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] font-bold leading-[1.12] text-white sm:text-5xl lg:text-[3.5rem]">
            {school.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white">
            Every child arrives with promise. We give them a calm classroom,
            teachers who notice them, and a clear path from Playgroup to Matric
            — so they leave ready for whatever comes next.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" variant="primary" arrow className="w-full sm:w-auto">
              Schedule a Visit
            </ButtonLink>
            <ButtonLink href="/admissions" variant="outline" className="w-full sm:w-auto">
              Admissions
            </ButtonLink>
          </div>
        </Container>
      </section>

      <StatStrip />

      <section className="py-12 sm:py-16 lg:py-24">
        <Container>
          <NotebookMargin>
            <Reveal>
              <SectionHeading kicker="Our school" title="A neighbourhood school, run with care" />
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                On Amir Road in Shad Bagh, The Peers is a campus parents already
                know by reputation: orderly mornings, teachers who stay, and a
                path that runs from a child&apos;s first classroom through
                Matric. We are not a chain. We are a school of this street.
              </p>
              <TextLink href="/about" className="mt-5">
                Learn more
              </TextLink>
            </Reveal>
          </NotebookMargin>
        </Container>
      </section>

      <section className="bg-cloud py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeading
            kicker="Why families choose us"
            title="Why Peers"
            description="Six things we try to get right, every ordinary Tuesday."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyPeers.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-[12px] bg-white p-5 sm:p-6 shadow-[0_1px_0_rgba(27,58,92,0.08)] ring-1 ring-deep-navy/6 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)]">
                  <IconMark name={item.icon} />
                  <h3 className="mt-4 font-display text-xl font-semibold text-deep-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <Container>
          <SectionHeading
            kicker="From first days to Matric"
            title="Programs"
            description="One campus. Choose a stage to see how the years unfold."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Link
                key={program.slug}
                href={`/academics#${program.slug}`}
                className="group rounded-[12px] border border-deep-navy/10 bg-white p-5 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:border-marigold lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)]"
              >
                <p className="text-sm font-semibold text-marigold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-deep-navy">
                  {program.name}
                </h3>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted">
                  {program.ages}
                </p>
                <p className="mt-3 text-base text-muted">{program.blurb}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cloud py-12 sm:py-16 lg:py-24">
        <Container>
          <NotebookMargin>
            <Reveal>
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,auto)_1fr]">
                <PrincipalPortraits size="sm" />
                <blockquote>
                  <Quote className="text-marigold" size={28} />
                  <p className="mt-3 font-display text-xl font-semibold leading-snug text-deep-navy sm:text-2xl lg:text-[1.75rem]">
                    {director.pullQuote}
                  </p>
                  <footer className="mt-5 text-base text-muted">
                    <span className="font-semibold text-deep-navy">
                      Zeeshan Ahmad &amp; Iftikhar Sadiq
                    </span>
                    <span className="mt-0.5 block">Principals, The Peers Education System</span>
                  </footer>
                  <TextLink href="/about" className="mt-4">
                    Read the full message
                  </TextLink>
                </blockquote>
              </div>
            </Reveal>
          </NotebookMargin>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="On campus" title="Campus life" />
            <TextLink href="/gallery">
              View full gallery
            </TextLink>
          </div>
          <CampusPreview />
        </Container>
      </section>

      <section className="bg-cloud py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              kicker="From the school"
              title="Latest news"
              description="Assemblies, sports days, and notes for families — more on the news page."
            />
            <TextLink href="/news">
              All news
            </TextLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {previewNews.map((item) => (
              <Link
                key={item.slug}
                href={`/news#${item.slug}`}
                className="overflow-hidden rounded-[12px] bg-white ring-1 ring-deep-navy/8 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_12px_28px_-16px_rgba(27,58,92,0.35)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={75}
                    className="object-cover"
                    sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 33vw, 400px"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-deep-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-muted">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            kicker="Questions families ask"
            title="Before you visit"
            description="A few things parents usually want to know. Call the office if your question is not here."
          />
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
