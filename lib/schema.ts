import {
  galleryItems,
  newsItems,
  programs,
  school,
} from "@/lib/content";

export const siteUrl = "https://the-peers-education.vercel.app";

export const schoolId = `${siteUrl}/#school`;
export const websiteId = `${siteUrl}/#website`;

function abs(path: string) {
  return new URL(path, siteUrl).href;
}

const schoolDescription =
  "The Peers Education System — a modern school in Shad Bagh, Lahore, from Playgroup through Matric.";

export function schoolOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "@id": schoolId,
    name: school.name,
    alternateName: school.shortName,
    description: schoolDescription,
    url: siteUrl,
    logo: abs("/images/branding/peers-logo.png"),
    image: abs("/images/home/home-page.jpg"),
    telephone: "+923004377980",
    email: school.email,
    foundingDate: String(school.foundedYear),
    sameAs: [school.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Amir Road, Shad Bagh",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    hasMap: school.mapsLink,
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Plus code",
      value: school.plusCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+923004377980",
      email: school.email,
      contactType: "customer service",
    },
  };
}

function webPageSchema({
  type,
  path,
  name,
  description,
}: {
  type: string | string[];
  path: string;
  name: string;
  description: string;
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": schoolId },
    publisher: { "@id": schoolId },
    inLanguage: "en",
  };
}

export function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: school.name,
        url: siteUrl,
        description: schoolDescription,
        publisher: { "@id": schoolId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: school.name,
        description: schoolDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": schoolId },
        publisher: { "@id": schoolId },
        inLanguage: "en",
      },
    ],
  };
}

export function aboutPageSchema() {
  return webPageSchema({
    type: "AboutPage",
    path: "/about",
    name: `About | ${school.name}`,
    description:
      "History, mission, and values of The Peers Education System in Shad Bagh, Lahore.",
  });
}

export function academicsPageSchema() {
  return {
    ...webPageSchema({
      type: "CollectionPage",
      path: "/academics",
      name: `Academics | ${school.name}`,
      description:
        "Class levels, curriculum, and co-curricular life at The Peers Education System.",
    }),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: programs.map((program, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "EducationalOccupationalProgram",
          name: program.name,
          description: `${program.ages}. ${program.blurb}`,
          provider: { "@id": schoolId },
        },
      })),
    },
  };
}

export function admissionsPageSchema() {
  return webPageSchema({
    type: "WebPage",
    path: "/admissions",
    name: `Admissions | ${school.name}`,
    description:
      "How to apply to The Peers Education System — inquiry, campus visit, assessment, and enrollment.",
  });
}

export function galleryPageSchema() {
  return {
    ...webPageSchema({
      type: ["CollectionPage", "ImageGallery"],
      path: "/gallery",
      name: `Gallery | ${school.name}`,
      description:
        "Campus, events, sports, and classroom life at The Peers Education System.",
    }),
    associatedMedia: galleryItems.map((item) => ({
      "@type": "ImageObject",
      contentUrl: abs(item.src),
      url: abs(item.src),
      name: item.alt,
      caption: item.alt,
      description: item.alt,
    })),
  };
}

const monthIndex: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

function toIsoDate(displayDate: string) {
  const full = displayDate.match(/^(\d{1,2}) (\w+) (\d{4})$/);
  if (full) {
    const month = monthIndex[full[2]];
    if (!month) return undefined;
    return `${full[3]}-${month}-${full[1].padStart(2, "0")}`;
  }

  const monthYear = displayDate.match(/^(\w+) (\d{4})$/);
  if (monthYear) {
    const month = monthIndex[monthYear[1]];
    if (!month) return undefined;
    return `${monthYear[2]}-${month}`;
  }

  return undefined;
}

export function newsPageSchema() {
  return {
    ...webPageSchema({
      type: ["CollectionPage", "Blog"],
      path: "/news",
      name: `News | ${school.name}`,
      description:
        "School news and events at The Peers Education System, Shad Bagh.",
    }),
    blogPost: newsItems.map((item) => {
      const datePublished = toIsoDate(item.date);
      return {
        "@type": "BlogPosting",
        headline: item.title,
        description: item.excerpt,
        image: abs(item.image),
        url: `${abs("/news")}#${item.slug}`,
        author: { "@id": schoolId },
        publisher: { "@id": schoolId },
        ...(datePublished ? { datePublished } : {}),
      };
    }),
  };
}

export function contactPageSchema() {
  return {
    ...webPageSchema({
      type: "ContactPage",
      path: "/contact",
      name: `Contact | ${school.name}`,
      description:
        "Visit The Peers Education System on Amir Road, Shad Bagh, Lahore — or send a message.",
    }),
    mainEntity: { "@id": schoolId },
  };
}
