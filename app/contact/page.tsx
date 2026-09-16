import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/FacebookIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { CampusMap } from "@/components/CampusMap";
import { InquiryForm } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { ogImage, school } from "@/lib/content";
import { contactPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit The Peers Education System on Amir Road, Shad Bagh, Lahore — or send a message.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | The Peers Education System",
    description:
      "Visit The Peers Education System on Amir Road, Shad Bagh, Lahore — or send a message.",
    url: "https://the-peers-education.vercel.app/contact",
    siteName: "The Peers Education System",
    locale: "en_PK",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | The Peers Education System",
    description:
      "Visit The Peers Education System on Amir Road, Shad Bagh, Lahore — or send a message.",
    images: [ogImage.url],
  },
};

export default function ContactPage() {
  return (
    <>
      <SchemaJsonLd jsonLd={contactPageSchema()} />
      <PageHero
        kicker="Contact"
        title="The office is easier to reach than a form."
        description="Call, WhatsApp, visit, or write. The map pin is the campus plus-code in Shad Bagh."
      />

      <section className="py-12 sm:py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <SectionHeading kicker="Find us" title="Amir Road, Shad Bagh" />
            <p className="mt-4 max-w-md text-base text-muted">
              {school.officeNote}
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={school.phoneHref} variant="navy" arrow className="w-full sm:w-auto">
                Call the office
              </ButtonLink>
              <ButtonLink href={school.whatsappHref} variant="ghost" className="w-full sm:w-auto">
                <WhatsAppIcon size={16} />
                WhatsApp
              </ButtonLink>
            </div>
            <ul className="mt-8 space-y-4 text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-marigold" size={18} />
                <a
                  href={school.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {school.location}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-marigold" size={18} />
                <a href={school.phoneHref} className="link-underline">
                  {school.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-marigold" size={18} />
                <a
                  href={`mailto:${school.email}`}
                  className="link-underline break-all"
                >
                  {school.email}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-marigold">
                  <FacebookIcon size={18} />
                </span>
                <a
                  href={school.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <CampusMap />
            </div>
            <a
              href={school.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-block text-base text-deep-navy"
            >
              Open the campus pin in Google Maps
            </a>
          </div>

          <div className="min-w-0">
            <SectionHeading
              kicker="Write to us"
              title="Send a message"
              description="Send a message and we will reply by phone, WhatsApp, or email."
            />
            <div className="mt-8 rounded-[12px] border border-deep-navy/10 bg-white p-4 sm:p-6 lg:p-8">
              <InquiryForm mode="contact" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
