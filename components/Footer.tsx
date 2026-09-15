import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/FacebookIcon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { CampusMap } from "@/components/CampusMap";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { navLinks, school } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0e2238] text-white">
      <Container className="relative grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_auto_minmax(16rem,20rem)] lg:items-start lg:gap-12">
        <div>
          <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
            <Logo className="h-14 sm:h-16" />
          </div>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-white">
            A neighbourhood school on Amir Road, Shad Bagh — shaping confident
            learners from Playgroup through Matric.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
            Explore
          </p>
          <ul className="mt-6 flex flex-col gap-2 text-base">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
            Contact
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-base text-white">
            <li className="flex gap-3">
              <Phone size={16} className="mt-1 shrink-0 text-marigold" />
              <a
                href={school.phoneHref}
                className="link-underline w-fit"
              >
                {school.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-1 shrink-0 text-marigold" />
              <a
                href={`mailto:${school.email}`}
                className="link-underline w-fit break-all"
              >
                {school.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-marigold" />
              <a
                href={school.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline w-fit"
              >
                {school.location}
              </a>
            </li>
          </ul>
        </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
            Campus map
          </p>
          <div className="mt-6">
            <CampusMap compact />
          </div>
          <a
            href={school.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-4 inline-block text-base text-white"
          >
            Open in Google Maps
          </a>
        </div>
      </Container>

      <div className="relative border-t border-white/15">
        <Container className="flex flex-col items-start gap-4 py-6 text-sm text-white sm:flex-row sm:items-center sm:justify-between sm:text-base">
          <p className="max-w-sm leading-snug sm:max-w-none">
            © {new Date().getFullYear()} {school.name}, Shad Bagh, Lahore.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={school.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-marigold-bright transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
            >
              <FacebookIcon size={32} />
            </a>
            <a
              href={school.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-marigold-bright transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
            >
              <WhatsAppIcon size={32} />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
