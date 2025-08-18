// utils/normalizeArticles.js
export const normalizeApiArticle = (article) => ({
  id: article.url, // since API has no ID, use url as unique key
  title: article.title,
  content: article.description,
  imageUrl: article.urlToImage,
  category: article.category || "General",
  author: article.source?.name || "Unknown",
  createdAt: article.publishedAt,
  isTrending: false,
  isFeatured: false,
  sourceType: "api",
});

export const normalizeDbArticle = (article) => ({
  id: article.id,
  title: article.title,
  content: article.content,
  imageUrl: article.imageUrl,
  category: article.category?.name || "Uncategorized",
  author: article.author?.name || "Admin",
  createdAt: article.createdAt,
  isTrending: article.isTrending,
  isFeatured: article.isFeatured,
  sourceType: "db",
});
