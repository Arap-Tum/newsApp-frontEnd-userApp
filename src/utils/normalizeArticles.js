// utils/normalizeArticles.js
export const normalizeDbArticle = (article) => ({
  id: article.id,
  title: article.title,
  description: article.content,
  image: article.imageUrl,
  category: article.category?.name || "General",
  date: article.createdAt,
  source: "local",
});

export const normalizeApiArticle = (article) => ({
  id: article.url, // URL is unique enough
  title: article.title,
  description: article.description,
  image: article.urlToImage,
  category: article.category || "World",
  date: article.publishedAt,
  source: "global",
});

export const normalizeScrapedNews = (article) => ({
  id: article._id, // your scraped articles seem to have _id
  title: article.title,
  description: article.description || article.content?.slice(0, 200) + "...", // fallback if description missing
  image: article.image,
  category: article.category || "General",
  date: article.date || article.createdAt, // prefer published date, fallback to createdAt
  source: article.source || "scraped",
  url: article.url, // keep original link
});
