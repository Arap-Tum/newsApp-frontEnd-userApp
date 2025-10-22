import { useQuery } from "@tanstack/react-query";
import { fetchArticleById, fetchArticles } from "../api/articles";

export function useAllTheAricles(token) {
  return useQuery({
    queryKey: [" articles"],
    queryFn: () => fetchArticles(token),
  });
}

export function useArticle(articleId) {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleById(articleId),
    enabled: !!articleId,
  });
}
