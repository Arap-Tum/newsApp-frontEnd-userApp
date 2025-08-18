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
  description: article.content || article.description,
  image: article.urlToImage,
  category: article.category || "World",
  date: article.publishedAt,
  source: "global",
});
