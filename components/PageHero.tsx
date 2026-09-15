import { Container } from "@/components/Container";
import { NavyBackdrop } from "@/components/NavyBackdrop";

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-12 text-white sm:pt-36 sm:pb-16 lg:pb-20">
      <NavyBackdrop />
      <Container className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marigold-bright">
          {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] font-bold leading-[1.15] sm:text-5xl lg:text-[3rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white">
          {description}
        </p>
      </Container>
    </section>
  );
}
