import { ButtonLink } from "@/components/Button";
import { ConfirmBadge } from "@/components/ConfirmBadge";
import { Container } from "@/components/Container";
import { NavyBackdrop } from "@/components/NavyBackdrop";

export function AdmissionsCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <NavyBackdrop />

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-marigold-bright">
            2026–27 session
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Admissions Open for 2026–27
          </h2>
          <p className="mt-3 text-base text-white">
            {/* TODO: confirm with client */}
            Come and walk the campus. We will talk through class availability
            and the first steps of enrollment.
            <ConfirmBadge>Session dates</ConfirmBadge>
          </p>
          <ButtonLink
            href="/admissions"
            variant="primary"
            arrow
            className="mt-8 w-full sm:w-auto"
          >
            Begin an inquiry
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
