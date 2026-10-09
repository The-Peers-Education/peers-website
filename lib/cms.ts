export type SiteNews = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  category: string;
};

export type SitePhoto = {
  src: string;
  alt: string;
  category: string;
};

type GalleryRecord = {
  alt: string;
  category: string;
  categoryLabel: string;
  imagePath: string;
};

type NewsRecord = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  imagePath: string;
};

function apiBase() {
  const raw = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1")
    .trim()
    .replace(/\/+$/, "");
  return raw.endsWith("/api/v1") ? raw : `${raw}/api/v1`;
}

function assetUrl(filePath: string) {
  const origin = apiBase().replace(/\/api\/v1$/, "");
  return `${origin}${filePath}`;
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBase()}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    const body = (await response.json()) as { data?: T };
    return body.data ?? null;
  } catch {
    return null;
  }
}

export async function loadGalleryPhotos(): Promise<SitePhoto[] | null> {
  const photos = await getJson<GalleryRecord[]>("/cms/gallery");
  if (!photos) return null;
  const visible = photos.filter((photo) => photo.category !== "RESULTS");
  if (visible.length === 0) return null;
  return visible.map((photo) => ({
    src: assetUrl(photo.imagePath),
    alt: photo.alt,
    category: photo.categoryLabel,
  }));
}

export async function loadNewsStories(): Promise<SiteNews[] | null> {
  const stories = await getJson<NewsRecord[]>("/cms/news");
  if (!stories || stories.length === 0) return null;
  return stories.map((story) => ({
    slug: story.slug,
    title: story.title,
    date: story.date,
    excerpt: story.excerpt,
    body: story.body,
    image: assetUrl(story.imagePath),
    category: story.category,
  }));
}

export async function loadHomepagePhotos(): Promise<{
  album: "RESULTS" | "CAMPUS";
  items: Array<{ src: string; alt: string }>;
}> {
  const [settings, photos] = await Promise.all([
    getJson<{ homepageAlbum?: string }>("/cms/settings"),
    getJson<GalleryRecord[]>("/cms/gallery"),
  ]);
  const album = settings?.homepageAlbum === "CAMPUS" ? "CAMPUS" : "RESULTS";
  const items = (photos ?? [])
    .filter((photo) => photo.category === album)
    .slice(0, 6)
    .map((photo) => ({
      src: assetUrl(photo.imagePath),
      alt: photo.alt,
    }));
  return { album, items };
}
