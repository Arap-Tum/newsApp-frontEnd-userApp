import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

export function normalizeScrapedArticle(scraped) {
  return {
    id: uuidv4(),
    slug: slugify(scraped.title || "untitled", { lower: true, strict: true }),
    title: scraped.title || "Untitled",
    subtitle: null,
    content: scraped.content || scraped.description || "",
    excerpt: scraped.description || scraped.content?.slice(0, 180) || "",
    imageUrl: scraped.image || null,
    category: scraped.category ? { name: scraped.category } : null,
    verificationStatus: "VERIFIED", // you can change this logic if needed
    verifiedAt: new Date(),
    isTrending: false,
    isFeatured: false,
    createdAt: scraped.date ? new Date(scraped.date) : new Date(),
    updatedAt: new Date(),
    sourceUrl: scraped.url || null,
    sourceName: scraped.source || "Scraped Source",
  };
}

export function normalizeNewsApiArticle(article) {
  return {
    id: uuidv4(),
    slug: slugify(article.title || "untitled", { lower: true, strict: true }),
    title: article.title || "Untitled",
    subtitle: null,
    content: article.content || article.description || "",
    excerpt: article.description || "",
    imageUrl: article.urlToImage || null,
    category: null,
    verificationStatus: "VERIFIED",
    verifiedAt: new Date(),
    isTrending: false,
    isFeatured: false,
    createdAt: new Date(article.publishedAt || Date.now()),
    updatedAt: new Date(),
    sourceUrl: article.url || null,
    sourceName: article.source?.name || "NewsAPI",
  };
}

export function normalizeLocalArticle(article) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle || null,
    content: article.content,
    excerpt: article.excerpt || "",
    imageUrl: article.imageUrl || null,
    category: article.category ? { name: article.category.name } : null,
    verificationStatus: article.verificationStatus,
    author: article.author ? { name: article.author.name } : null,
    verifiedAt: article.verifiedAt || null,
    isTrending: article.isTrending,
    isFeatured: article.isFeatured,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
    sourceUrl: null,
    sourceName: "Rift News",
  };
}
