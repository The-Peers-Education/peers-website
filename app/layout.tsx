import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { QuickContact } from "@/components/QuickContact";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { SkipLink } from "@/components/SkipLink";
import { SmoothScroll } from "@/components/SmoothScroll";
import { school, ogImage } from "@/lib/content";
import { schoolOrganizationSchema, siteUrl } from "@/lib/schema";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: school.name,
    template: `%s | ${school.name}`,
  },
  description:
    "The Peers Education System — a modern school in Shad Bagh, Lahore, from Playgroup through Matric.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: school.name,
    description:
      "The Peers Education System — a modern school in Shad Bagh, Lahore, from Playgroup through Matric.",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: school.name,
    description:
      "The Peers Education System — a modern school in Shad Bagh, Lahore, from Playgroup through Matric.",
    images: [ogImage.url],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-paper font-sans text-ink"
        suppressHydrationWarning
      >
        <SchemaJsonLd jsonLd={schoolOrganizationSchema()} />
        <SmoothScroll>
          <SkipLink />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <AdmissionsCta />
          <Footer />
          <QuickContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
