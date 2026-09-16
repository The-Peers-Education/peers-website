import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/schema";

const paths = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/gallery",
  "/news",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/news" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
